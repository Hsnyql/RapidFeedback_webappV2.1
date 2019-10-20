<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <b-row>
          <h1>{{selectedProject.name}}</h1>
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
    <b-row class="overflow-auto">
      <b-col>
        <b-row
            v-for="criterion in selectedProject.criteria"
            v-bind:key = criterion.id>
          <b-col>
            <b-row><label>{{criterion.criterionName}}</label></b-row>
            <b-row>
              <b-input-group prepend="0" :append="criterion.maxMark.toString()">
                <b-form-input
                    type="range"
                    v-model="criterion.mark"
                    number
                    min="0"
                    :max="criterion.maxMark"
                    :step="renderStep(criterion.increment)"></b-form-input>
              </b-input-group>
            </b-row>
            <b-row>
              <b-col cols="3">
                <b-list-group
                    v-for="subsection in criterion.subsections"
                    v-bind:key="subsection.id">
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
                    v-for="shortText in criterion.currentSubsection.shortTexts"
                    v-bind:key="shortText.id">
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
                    v-for="longText in criterion.currentShortText.longTexts"
                    v-bind:key="longText.id">
                  <b-list-group-item
                      class="text-break"
                      button
                      @click="selectLongText(longText, criterion)">
                    {{longText.name}}
                  </b-list-group-item>
                </b-list-group>
              </b-col>
            </b-row>
            <div>
              <p>Testing:</p>
              <p>Selected Mark: {{criterion.mark}} {{typeof(criterion.mark)}}</p>
              <p v-if="criterion.currentSubsection">Selected Subsection: {{criterion.currentSubsection.name}}</p>
              <p v-if="criterion.currentShortText">Selected ShortText: {{criterion.currentShortText.name}}</p>
              <p v-if="criterion.currentLongText">Selected LongText: {{criterion.currentLongText.name}}</p>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <div>
          <p>Testing:</p>
          <p>Marked Criteria:</p>
          <p>{{markedCriteria}}</p>
          <div v-if="markedCriteria !== []">
            <div v-for="criterion in markedCriteria" v-bind:key="criterion.id">
              <hr>
              <p> Criterion Name: {{criterion.criterionName}}</p>
              <div v-for="subsection in criterion.subsections" v-bind:key="subsection.id">
                <p>Subsection Name: {{subsection.name}}</p>
                <p>ShortText: {{subsection.shortTexts[0].name}}</p>
                <p>Long Text: {{subsection.shortTexts[0].longTexts[0].name}}</p>
              </div>
            </div>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'RealTimeAssessmentMarking',
  data () {
    return {
      dismissCountDown: 0,
      selectedProject: {
        id: 1,
        name: 'Project1',
        time: 360,
        criteria: [
          {
            id: 1,
            criterionName: 'Criteria 1',
            maxMark: 10,
            increment: '1/2',
            mark: 0,
            subsections: [],
            currentSubsection: null,
            currentShortText: null,
            currentLongText: null},
          {id: 2, criterionName: 'Criteria 2', maxMark: 8, increment: '1/4', mark: 0, subsections: [], currentSubsection: null, currentShortText: null, currentLongText: null},
          {id: 3, criterionName: 'Criteria 3', maxMark: 6, increment: '1/2', mark: 0, subsections: [], currentSubsection: null, currentShortText: null, currentLongText: null},
          {id: 4, criterionName: 'Criteria 4', maxMark: 3, increment: '1', mark: 0, subsections: [], currentSubsection: null, currentShortText: null, currentLongText: null}
        ],
        students: [
          {id: 1, firstName: 'firstName1', middleName: '', lastName: 'lastName1', email: 'student1@email.com', group: 0},
          {id: 2, firstName: 'firstName2', middleName: 'middleName2', lastName: 'lastName2', email: 'student2@email.com', group: 0},
          {id: 3, firstName: 'firstName3', middleName: 'middleName3', lastName: 'lastName3', email: 'student3@email.com', group: 0},
          {id: 4, firstName: 'firstName4', middleName: '', lastName: 'lastName4', email: 'student4@email.com', group: 0}
        ]},
      selectedStudent: {
        id: 1,
        firstName: 'firstName1',
        middleName: '',
        lastName: 'lastName1',
        email: 'student1@email.com',
        group: 0},
      markedCriteria: []
    }
  },
  created () {
    this.populate()
    console.log('Populated')
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
      for (let i = 0; i < this.selectedProject.criteria.length; i++) {
        this.generateSubsections(this.selectedProject.criteria[i])
        console.log('Populate Criteria ' + i + ' DONE')
      }
      console.log('Complete Populate')
    },
    generateSubsections (criteria) {
      for (let i = 0; i < 5; i++) {
        let subsection = {
          id: i + 1,
          name: 'Criteria' + criteria.id.toString() + 'Subsection' + (i + 1).toString(),
          shortTexts: []
          // currentShortText: null
        }
        this.generateShortTexts(subsection)
        criteria.subsections.push(subsection)
      }
    },
    generateShortTexts (subsection) {
      for (let i = 0; i < 5; i++) {
        let shortText = {
          id: i + 1,
          name: subsection.name + 'ShortText' + (i + 1).toString(),
          longTexts: []
          // currentLongText: null
        }
        this.generateLongTexts(shortText)
        subsection.shortTexts.push(shortText)
      }
    },
    generateLongTexts (shortText) {
      for (let i = 0; i < 5; i++) {
        let longText = {
          id: i + 1,
          name: shortText.name + 'LongText' + (i + 1).toString()
        }
        shortText.longTexts.push(longText)
      }
    },
    fullName (student) {
      let fullName = ''
      if (student.firstName !== '') {
        if (student.middleName === '') {
          fullName = student.firstName + ' ' + student.lastName
        } else {
          fullName = student.firstName + ' ' + student.middleName + ' ' + student.lastName
        }
      }
      return fullName
    },
    showTimer () {
      this.dismissCountDown = this.selectedProject.time
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
      // let index = this.selectedProject.criteria.indexOf(criterion)
      // console.log('Working on Criteria[' + (index + 1) + ']')
      // console.log(this.selectedProject.criteria[index].currentSubsection)
    },
    selectShortText (shortText, criterion) {
      criterion.currentShortText = shortText
      criterion.currentLongText = null
    },
    selectLongText (longText, criterion) {
      criterion.currentLongText = longText
      this.recordMarking(criterion)
      console.log('Recorded')
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
        id: criterion.id,
        criterionName: criterion.criterionName,
        maxMark: criterion.maxMark,
        increment: criterion.increment,
        mark: criterion.mark,
        subsections: []
      }
      let markedSubsection = this.reconstructSubsection(criterion)
      markedCriterion.subsections.push(markedSubsection)
      return markedCriterion
    },
    updateCriterion (index, criterion) {
      let markedSubsection = this.reconstructSubsection(criterion)
      for (let i = 0; i < this.markedCriteria[index].subsections.length; i++) {
        if (this.markedCriteria[index].subsections[i].id === markedSubsection.id) {
          this.markedCriteria[index].subsections.splice(i, 1)
          this.markedCriteria[index].subsections.push(markedSubsection)
          return
        }
      }
      this.markedCriteria[index].subsections.push(markedSubsection)
    },
    reconstructSubsection (criterion) {
      let longText = {
        id: criterion.currentLongText.id,
        name: criterion.currentLongText.name
      }
      let shortText = {
        id: criterion.currentShortText.id,
        name: criterion.currentShortText.name,
        longTexts: []
      }
      shortText.longTexts.push(longText)
      let subsection = {
        id: criterion.currentSubsection.id,
        name: criterion.currentSubsection.name,
        shortTexts: []
      }
      subsection.shortTexts.push(shortText)
      return subsection
    },
    findCriterion (criterion, criteria) {
      for (let i = 0; i < criteria.length; i++) {
        if (criteria[i].id === criterion.id) {
          return i
        }
      }
      return -1
    }
  }
}
</script>

<style scoped>

</style>
