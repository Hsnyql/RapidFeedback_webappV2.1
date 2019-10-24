<template>
  <b-container fluid>
<!--    <b-row>-->
<!--      <b-col>-->
<!--        <b-row>-->
<!--          <h1>{{selectedProject.projectName}}</h1>-->
<!--           <b-button @click="populate">Populate</b-button>-->
<!--        </b-row>-->
<!--      </b-col>-->
<!--    </b-row>-->
    <hr>
    <b-row>
      <b-col cols="3">{{fullName(selectedStudent)}}</b-col>
      <b-col cols="4">
        <b-row align-h="center">
          <b-col cols="3"><b-button @click="showTimer">Start</b-button></b-col>
          <b-col cols="3"><b-button @click="showTimer">Reset</b-button></b-col>
        </b-row>
      </b-col>
      <b-col cols="3">{{totalPercentage}}%</b-col>
      <b-col cols="2">
        <b-row>
          <b-button variant="primary" to="/RealTimeAssessment/Menu">Back</b-button>
          <b-button variant="primary" @click="save">Finish</b-button>
        </b-row>
      </b-col>
    </b-row>
    <div>
      <b-alert
          :show="dismissCountDown"
          variant="primary"
          dismissible
          @dismissed="resetTimer"
          @dismiss-count-down="countDownChanged">
        <p>Presentation Time Remaining: {{(dismissCountDown - dismissCountDown%60)/60}} min {{dismissCountDown%60}} sec</p>
        <b-progress
          variant="warning"
          :max="selectedProject.time"
          :value="dismissCountDown"
          height="4px"></b-progress>
      </b-alert>
    </div>
    <hr>
    <b-row class="overflow-auto">
      <b-col>
        <b-row
            v-for="criterion in selectedProject.criteria"
            v-bind:key = criterion.name>
          <b-col>
            <b-row><label>{{criterion.name}}</label></b-row>
            <b-row>
              <b-input-group prepend="0" :append="criterion.maximunMark.toString()">
                <b-form-input
                    type="range"
                    v-model="criterion.mark"
                    number
                    min="0"
                    :max="criterion.maximunMark"
                    :step="renderStep(criterion.markIncrement)"></b-form-input>
              </b-input-group>
            </b-row>
            <b-row>
              <b-col cols="3">
                <b-list-group
                    v-for="subsection in criterion.subsectionList"
                    v-bind:key="subsection.name">
                  <b-list-group-item
                      class="text-break"
                      button
                      @click="selectSubsection(subsection, criterion)">
                    {{subsection.name}}
                  </b-list-group-item>
                </b-list-group>
              </b-col>
              <b-col cols="3" v-if="criterion.currentSubsection !== null">
                <b-list-group
                    v-for="shortText in criterion.currentSubsection.shortTextList"
                    v-bind:key="shortText.name">
                  <b-list-group-item
                      class="text-break"
                      button
                      @click="selectShortText(shortText, criterion)">
                      {{shortText.name}}
                  </b-list-group-item>
                </b-list-group>
              </b-col>
              <b-col cols="6" v-if="criterion.currentShortText !== null">
                <b-list-group
                    v-for="long in criterion.currentShortText.longtext"
                    v-bind:key="long">
                  <b-list-group-item
                      class="text-break"
                      button
                      @click="selectLongText(long, criterion)">
                    {{long}}
                  </b-list-group-item>
                </b-list-group>
              </b-col>
            </b-row>
            <!-- <div>
              <p>Testing:</p>
              <p>Selected Mark: {{criterion.mark}} {{typeof(criterion.mark)}}</p>
              <p v-if="criterion.currentSubsection">Selected Subsection: {{criterion.currentSubsection.name}}</p>
              <p v-if="criterion.currentShortText">Selected ShortText: {{criterion.currentShortText.name}}</p>
              <p v-if="criterion.currentLongText">Selected LongText: {{criterion.currentLongText.name}}</p>
            </div> -->
          </b-col>
        </b-row>
      </b-col>
    </b-row>
<!--    <b-row>-->
<!--      <b-col>-->
<!--        <div>-->
<!--          <p>Testing:</p>-->
<!--          <p>Marked Criteria:</p>-->
<!--          <p>{{markedCriteria}}</p>-->
<!--          <div v-if="markedCriteria !== []">-->
<!--            <div v-for="criterion in markedCriteria" v-bind:key="criterion.name">-->
<!--              <hr>-->
<!--              <p> Criterion Name: {{criterion.criterionName}}</p>-->
<!--              <div v-for="subsection in criterion.subsectionList" v-bind:key="subsection.name">-->
<!--                <p>Subsection Name: {{subsection.name}}</p>-->
<!--                <p>ShortText: {{subsection.shortTextList[0].name}}</p>-->
<!--                <p>Long Text: {{subsection.shortTextList[0].longtext[0].name}}</p>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </b-col>-->
<!--    </b-row>-->
<!--    <b-row align-h="between">-->
<!--      <b-col cols="2"></b-col>-->
<!--      <b-col cols="4">-->
<!--        <b-button variant="primary">Back</b-button>-->
<!--      </b-col>-->
<!--      <b-col cols="4">-->
<!--        <b-button variant="primary" @click="save">Save</b-button>-->
<!--      </b-col>-->
<!--    </b-row>-->
  </b-container>
</template>

<script>
import {store} from '@/store'
// eslint-disable-next-line no-unused-vars
import {sendMark} from '@/api'
export default {
  name: 'RealTimeAssessmentMarking',
  data () {
    return {
      dismissCountDown: 0,
      // selectedProject: {
      //   id: 1,
      //   name: 'Project1',
      //   time: 360,
      //   criteria: [
      //     {
      //       id: 1,
      //       criterionName: 'Criteria 1',
      //       maxMark: 10,
      //       increment: '1/2',
      //       mark: 0,
      //       subsections: [],
      //       currentSubsection: null,
      //       currentShortText: null,
      //       currentLongText: null},
      //     {id: 2, criterionName: 'Criteria 2', maxMark: 8, increment: '1/4', mark: 0, subsections: [], currentSubsection: null, currentShortText: null, currentLongText: null},
      //     {id: 3, criterionName: 'Criteria 3', maxMark: 6, increment: '1/2', mark: 0, subsections: [], currentSubsection: null, currentShortText: null, currentLongText: null},
      //     {id: 4, criterionName: 'Criteria 4', maxMark: 3, increment: '1', mark: 0, subsections: [], currentSubsection: null, currentShortText: null, currentLongText: null}
      //   ],
      //   students: [
      //     {id: 1, firstName: 'firstName1', middleName: '', lastName: 'lastName1', email: 'student1@email.com', group: 0},
      //     {id: 2, firstName: 'firstName2', middleName: 'middleName2', lastName: 'lastName2', email: 'student2@email.com', group: 0},
      //     {id: 3, firstName: 'firstName3', middleName: 'middleName3', lastName: 'lastName3', email: 'student3@email.com', group: 0},
      //     {id: 4, firstName: 'firstName4', middleName: '', lastName: 'lastName4', email: 'student4@email.com', group: 0}
      //   ]},
      selectedProject: store.state.project,
      selectedStudent: store.state.student,
      // selectedStudent: {
      //   id: 1,
      //   firstName: 'firstName1',
      //   middleName: '',
      //   lastName: 'lastName1',
      //   email: 'student1@email.com',
      //   group: 0},
      markedCriteria: [],
      markList: []
    }
  },
  created () {
    console.log(store.state.project)
    console.log(store.state.student)
    this.selectedProject = store.state.project
    this.student = store.state.student
    this.populate()
    // console.log('Populated')
    // console.log(this.selectedProject)
    // console.log(this.student)
  },
  computed: {
    totalPercentage () {
      let totalMax = 0
      for (let i = 0; i < this.selectedProject.criteria.length; i++) {
        totalMax = totalMax + this.selectedProject.criteria[i].maximunMark
      }
      let totalMarked = 0
      for (let i = 0; i < this.selectedProject.criteria.length; i++) {
        totalMarked = totalMarked + this.selectedProject.criteria[i].mark
      }
      let percentage = 0.00
      percentage = totalMarked / totalMax
      percentage = (percentage * 100).toFixed(2)
      return percentage
    }

  },
  methods: {
    populate () {
      for (let i = 0; i < this.selectedProject.criteria.length; i++) {
        // this.generateSubsections(this.selectedProject.criteria[i])
        this.selectedProject.criteria[i].currentSubsection = null
        this.selectedProject.criteria[i].currentShortText = null
        this.selectedProject.criteria[i].currentLongText = null
        // console.log('Populate Criteria ' + i + ' DONE')
        if (!this.selectedProject.criteria[i].hasOwnProperty('mark')) {
          this.selectedProject.criteria[i].mark = 0
        }
      }
      // console.log('Complete Populate')
    },
    // generateSubsections (criteria) {
    //   for (let i = 0; i < 5; i++) {
    //     let subsection = {
    //       id: i + 1,
    //       name: 'Criteria' + criteria.id.toString() + 'Subsection' + (i + 1).toString(),
    //       shortTexts: []
    //       // currentShortText: null
    //     }
    //     this.generateShortTexts(subsection)
    //     criteria.subsections.push(subsection)
    //   }
    // },
    // generateShortTexts (subsection) {
    //   for (let i = 0; i < 5; i++) {
    //     let shortText = {
    //       id: i + 1,
    //       name: subsection.name + 'ShortText' + (i + 1).toString(),
    //       longTexts: []
    //       // currentLongText: null
    //     }
    //     this.generateLongTexts(shortText)
    //     subsection.shortTexts.push(shortText)
    //   }
    // },
    // generateLongTexts (shortText) {
    //   for (let i = 0; i < 5; i++) {
    //     let longText = {
    //       id: i + 1,
    //       name: shortText.name + 'LongText' + (i + 1).toString()
    //     }
    //     shortText.longTexts.push(longText)
    //   }
    // },
    fullName (student) {
      let fullName = ''
      if (student.firstName !== '') {
        if (student.middleName === null | student.middleName === '' | student.middleName === 'null') {
          fullName = student.firstName + ' ' + student.surname
        } else {
          fullName = student.firstName + ' ' + student.middleName + ' ' + student.surname
        }
      }
      return fullName
    },
    showTimer () {
      this.dismissCountDown = this.selectedProject.durationMin * 60 + this.selectedProject.durationSec
    },
    resetTimer () {
      this.dismissCountDown = 0
    },
    countDownChanged (dismissCountDown) {
      this.dismissCountDown = dismissCountDown
    },
    renderStep (increment) {
      if (increment === '1') {
        return 1
      } else if (increment === '1/2') {
        return 0.5
      } else if (increment === '1/4') {
        return 0.25
      } else {
        return 0
      }
    },
    selectSubsection (subsection, criterion) {
      criterion.currentSubsection = subsection
      criterion.currentShortText = null
      criterion.currentLongText = null
      this.$forceUpdate()
      console.log(criterion.currentSubsection !== null)
    },
    selectShortText (shortText, criterion) {
      criterion.currentShortText = shortText
      criterion.currentLongText = null
      this.$forceUpdate()
      console.log(criterion.currentShortText !== null)
    },
    selectLongText (longText, criterion) {
      criterion.currentLongText = longText
      this.$forceUpdate()
      this.recordMarking(criterion)
      console.log('Recorded')
      console.log(this.markedCriteria)
    },
    recordMarking (criterion) {
      console.log('Start Recording')
      if (this.markedCriteria.length === 0) {
        console.log('First Entry')
        let markedCriterion = this.createMarkedCriterion(criterion)
        this.markedCriteria.push(markedCriterion)
      } else {
        if (this.findCriterion(criterion, this.markedCriteria) === -1) {
          let markedCriterion = this.createMarkedCriterion(criterion)
          this.markedCriteria.push(markedCriterion)
        } else {
          let index = this.findCriterion(criterion, this.markedCriteria)
          this.updateCriterion(index, criterion)
        }
      }
    },
    createMarkedCriterion (criterion) {
      let markedCriterion = {
        name: criterion.name,
        maximunMark: criterion.maximunMark,
        weighting: criterion.weighting,
        // mark: criterion.mark,
        subsectionList: []
      }
      let markedSubsection = this.reconstructSubsection(criterion)
      markedCriterion.subsectionList.push(markedSubsection)
      return markedCriterion
    },
    updateCriterion (index, criterion) {
      let markedSubsection = this.reconstructSubsection(criterion)
      for (let i = 0; i < this.markedCriteria[index].subsectionList.length; i++) {
        if (this.markedCriteria[index].subsectionList[i].name === markedSubsection.name) {
          this.markedCriteria[index].subsectionList.splice(i, 1)
          this.markedCriteria[index].subsectionList.push(markedSubsection)
          return
        }
      }
      this.markedCriteria[index].subsectionList.push(markedSubsection)
    },
    reconstructSubsection (criterion) {
      let longText = criterion.currentLongText
      let shortText = {
        grade: criterion.currentShortText.grade,
        name: criterion.currentShortText.name,
        longtext: []
      }
      shortText.longtext.push(longText)
      let subsection = {
        name: criterion.currentSubsection.name,
        shortTextList: []
      }
      subsection.shortTextList.push(shortText)
      return subsection
    },
    findCriterion (criterion, criteria) {
      for (let i = 0; i < criteria.length; i++) {
        if (criteria[i].name === criterion.name) {
          return i
        }
      }
      return -1
    },
    save () {
      var markList = []
      for (let i = 0; i < this.selectedProject.criteria.length; i++) {
        markList.push(this.selectedProject.criteria[i].mark)
      }
      var mark = {
        comment: '',
        commentList: [],
        criteriaList: this.markedCriteria,
        lecturerEmail: localStorage.email,
        lecturerName: localStorage.firstName,
        markList: markList,
        totalMark: this.totalPercentage
      }
      var param = {
        token: localStorage.token,
        projectName: this.selectedProject.projectName,
        studentID: this.selectedStudent.number,
        primaryEmail: this.selectedProject.assistant[0],
        // mark: JSON.stringify(mark)
        mark: mark
      }
      console.log(param)
      sendMark(param).then(res => {
        console.log(res)
        if (res.mark_ACK) {
          store.state.markList = markList
          this.$router.push('/ReviewAndReport/View')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
