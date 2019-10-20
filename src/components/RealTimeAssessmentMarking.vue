<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <b-row>
          <h1>{{selectedProject.projectName}}</h1>
          <b-button @click="populate">Populate</b-button>
        </b-row>
      </b-col>
    </b-row>
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
      <b-col cols="2"><b-button>Finish</b-button></b-col>
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
    <b-row>
      <b-col>
        <b-row
            v-for="criterion in copyCriteria"
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
                    :step="renderStep(criterion.increment)"></b-form-input>
              </b-input-group>
            </b-row>
            <b-row>
              <b-col cols="3">
                <b-row>
                  <b-list-group
                      v-for="subsection in criterion.subsectionList"
                      v-bind:key="subsection.name">
                    <b-list-group-item button @click="selectSubsection(subsection)">{{subsection.name}}</b-list-group-item>
                  </b-list-group>
                </b-row>
              </b-col>
              <b-col cols="3">
                <b-row v-if="selectedSubsection !== null">
                  <b-list-group
                      v-for="shortText in selectedSubsection.shortTextList"
                      v-bind:key="shortText.name">
                    <b-list-group-item button @click="selectShortText(shortText)">{{shortText.name}}</b-list-group-item>
                  </b-list-group>
                </b-row>
              </b-col>
              <b-col cols="6">
                <b-row v-if="selectedShortText !== null">
                  <b-list-group
                      v-for="longText in selectedShortText.longText"
                      v-bind:key="longText">
                    <b-list-group-item button @click="selectLongText(longText, criterion)">{{longText.longTextName}}</b-list-group-item>
                  </b-list-group>
                </b-row>
              </b-col>
            </b-row>
            <div>
              <p>Testing:</p>
              <p>Selected Mark: {{criterion.mark}} {{typeof(criterion.mark)}}</p>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-row><p>Testing:</p></b-row>
        <b-row><p>Marked Criteria:</p></b-row>
        <b-row v-for="criterion in markedCriteria" v-bind:key="criterion.id">
          <b-col>
            <b-row>
              <p>ID: {{criterion.id}}, Name: {{criterion.criterionName}}, Mark: {{criterion.mark}} </p>
              <p>Has Subsections: </p>
            </b-row>
            <b-row v-for="subsection in criterion.subsections" v-bind:key="subsection.id">
              <b-col>
                <b-row>
                  <p>ID: {{subsection.id}}, Name: {{subsection.subsectionName}}, Has ShortTexts:</p>
                </b-row>
                <b-row v-for="shortText in subsection.shortTexts" v-bind:key="shortText.id">
                  <b-col>
                    <b-row>
                      <p>ID: {{shortText.id}}, Name: {{shortText.shortTextName}}, Has LongTexts:</p>
                    </b-row>
                    <b-row v-for="longText in shortText.longTexts" v-bind:key="longText.id">
                      <p>ID: {{longText.id}}, Name: {{longText.longTextName}}</p>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {store} from '@/store'
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
      //     maxMark: 10,
      //     increment: '1/2',
      //     mark: 0,
      //     subsections: []},
      //   {id: 2, criterionName: 'Criteria 2', maxMark: 8, increment: '1/4', mark: 0, subsections: []},
      //   {id: 3, criterionName: 'Criteria 3', maxMark: 6, increment: '1/2', mark: 0, subsections: []},
      //   {id: 4, criterionName: 'Criteria 4', maxMark: 3, increment: '1', mark: 0, subsections: []}
      // ],
      // students: [
      //   {id: 1, firstName: 'firstName1', middleName: '', lastName: 'lastName1', email: 'student1@email.com', group: 0},
      //   {id: 2, firstName: 'firstName2', middleName: 'middleName2', lastName: 'lastName2', email: 'student2@email.com', group: 0},
      //   {id: 3, firstName: 'firstName3', middleName: 'middleName3', lastName: 'lastName3', email: 'student3@email.com', group: 0},
      //   {id: 4, firstName: 'firstName4', middleName: '', lastName: 'lastName4', email: 'student4@email.com', group: 0}
      // ]},
      // selectedStudent: {
      //   id: 1,
      //   firstName: 'firstName1',
      //   middleName: '',
      //   lastName: 'lastName1',
      //   email: 'student1@email.com',
      //   group: 0},
      selectedProject: store.state.project,
      selectedStudent: store.state.student,
      markedCriteria: [],
      copyCriteria: store.state.project.criteria,
      selectedSubsection: store.state.project.criteria[0].subsectionList[0],
      selectedShortText: store.state.project.criteria[0].subsectionList[0].shortTextList,
      currentCriterion: null,
      currentSubsection: null,
      currentShortText: null,
      currentLongText: null
    }
  },
  computed: {
    totalPercentage () {
      let totalMax = 0
      for (let i = 0; i < this.selectedProject.criteria.length; i++) {
        totalMax = totalMax + this.selectedProject.criteria[i].maxMark
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
      for (let h = 0; h < this.selectedProject.criteria.length; h++) {
        let subsections = []
        for (let i = 0; i < 5; i++) {
          let subsection = {
            id: i + 1,
            subsectionName: 'Criterion' + (h + 1).toString() + ' SubSection' + (i + 1).toString(),
            shortTexts: []
          }
          for (let j = 0; j < 5; j++) {
            let shortText = {
              id: j + 1,
              shortTextName: 'Criterion' + (h + 1).toString() + ' SubSection' + (i + 1).toString() + ' ShortText' + (j + 1).toString(),
              longTexts: []
            }
            for (let k = 0; k < 5; k++) {
              let longText = {
                id: k + 1,
                longTextName: 'Criterion' + (h + 1).toString() + ' SubSection' + (i + 1).toString() + ' ShortText' + (j + 1).toString() + ' LongText' + (k + 1).toString()
              }
              shortText.longTexts.push(longText)
            }
            subsection.shortTexts.push(shortText)
          }
          subsections.push(subsection)
        }
        this.selectedProject.criteria[h].subsections = subsections
      }
    },
    fullName (student) {
      let fullName = ''
      if (student.firstName !== '') {
        if (student.middleName === '') {
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
      this.dismissCountDown = this.selectedProject.durationMin * 60 + this.selectedProject.durationSec
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
    selectSubsection (subsection) {
      // for (let i = 0; i < this.copyCriteria.length; i++) {
      //   if (criterion.id === this.copyCriteria[i].id) {
      //     this.copyCriteria[i].selectedSubsection = subsection
      //   }
      // }
      this.selectedSubsection = subsection
    },
    selectShortText (shortText) {
      // for (let i = 0; i < this.copyCriteria.length; i++) {
      //   if (criterion.id === this.copyCriteria[i].id) {
      //     this.copyCriteria[i].selectedShortText = shortText
      //   }
      // }
      this.selectedShortText = shortText
    },
    selectLongText (longText, criterion) {
      for (let i = 0; i < this.copyCriteria.length; i++) {
        if (criterion.id === this.copyCriteria[i].id) {
          this.copyCriteria[i].selectedLongText = longText
          this.copyCriteria[i].selectedShortText.longTexts = []
          this.copyCriteria[i].selectedShortText.longTexts.push(this.copyCriteria[i].selectedLongText)
          this.copyCriteria[i].selectedSubsection.shortTexts = []
          this.copyCriteria[i].selectedSubsection.shortTexts.push(this.copyCriteria[i].selectedShortText)
          for (let j = 0; j < this.copyCriteria[i].subsections.length; j++) {
            if (this.copyCriteria[i].selectedSubsection.id === this.copyCriteria[i].subsections[j].id) {
              this.copyCriteria[i].subsections[j].subsections = this.copyCriteria[i].selectedSubsection
            }
          }
          if (this.markedCriteria === []) {
            this.markedCriteria.push(this.copyCriteria[i])
          } else {
            for (let k = 0; k < this.markedCriteria.length; k++) {
              if (this.copyCriteria[i].id === this.markedCriteria[k].id) {
                this.markedCriteria[k] = this.copyCriteria[i]
              }
            }
          }
        }
      }
    }
  },
  created () {
    console.log(store.state.project)
    console.log(store.state.student)
  }
}
</script>

<style scoped>

</style>
