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
    <b-row>
      <b-col>
<!--        <b-list-group-->
<!--            v-for="criterion in selectedProject.criteria"-->
<!--            v-bind:key = criterion.id>-->
<!--          <b-list-group-item button @click="selectedCriterion=criterion">{{criterion.criterionName}}</b-list-group-item>-->
<!--        </b-list-group>-->
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
<!--            <b-row>-->
<!--              <b-card>-->
<!--                <b-tabs pills card vertical v-for="subsection in criterion.subsections" v-bind:key="subsection.id">-->
<!--                  <b-tab :title="subsection.subsectionName">{{subsection.subsectionName}}</b-tab>-->
<!--                </b-tabs>-->
<!--              </b-card>-->
<!--            </b-row>-->
            <b-row>
              <b-col cols="3">
                <b-row>
                  <b-list-group
                      v-for="subsection in criterion.subsections"
                      v-bind:key="subsection.id">
                    <b-list-group-item button @click="selectSubsection(subsection, criterion)">{{subsection.subsectionName}}</b-list-group-item>
                  </b-list-group>
                </b-row>
              </b-col>
              <b-col cols="3">
                <b-row v-if="currentSubsection !== null">
                  <b-list-group
                      v-for="shortText in currentSubsection.shortTexts"
                      v-bind:key="shortText.id">
                    <b-list-group-item button @click="selectShortText(shortText)">{{shortText.shortTextName}}</b-list-group-item>
                  </b-list-group>
                </b-row>
              </b-col>
              <b-col cols="6">
                <b-row v-if="currentShortText !== null">
                  <b-list-group
                      v-for="longText in currentShortText.longTexts"
                      v-bind:key="longText.id">
                    <b-list-group-item button @click="selectLongText(longText)">{{longText.longTextName}}</b-list-group-item>
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
          <!--      <b-col cols="9"></b-col>-->
    </b-row>
    <b-row>
      <b-col>
        <b-row><p>Testing:</p></b-row>
        <b-row><p>Marked Criteria:</p></b-row>
<!--        <b-row>-->
<!--          <b-col>ID</b-col>-->
<!--          <b-col>Name</b-col>-->
<!--          <b-col>Mark</b-col>-->
<!--        </b-row>-->
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
export default {
  name: 'RealTimeAssessmentMarking',
  data () {
    return {
      // maxTime: 360,
      // timeRemaining: 0,
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
            subsections: []},
          {id: 2, criterionName: 'Criteria 2', maxMark: 8, increment: '1/4', mark: 0, subsections: []},
          {id: 3, criterionName: 'Criteria 3', maxMark: 6, increment: '1/2', mark: 0, subsections: []},
          {id: 4, criterionName: 'Criteria 4', maxMark: 3, increment: '1', mark: 0, subsections: []}
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
      markedCriteria: [],
      copyCriteria: [],
      currentCriterion: null,
      currentSubsection: null,
      currentShortText: null,
      currentLongText: null
    }
  },
  // mounted: function () {
  //   this.copyCriteria = this.project.criteria
  // },
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
      for (let i = 0; i < this.selectedProject.criteria.length; i++) {
        let newCopy = {
          id: this.selectedProject.criteria[i].id,
          criteria: this.selectedProject.criteria[i],
          selectedSubsection: null,
          selectedShortText: null,
          selectedLongText: null
        }
        this.copyCriteria.push(newCopy)
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
      for (let i = 0; i < this.copyCriteria.length; i++) {
      }
      this.currentSubsection = subsection
      this.currentCriterion = criterion
    },
    selectShortText (shortText) {
      this.currentShortText = shortText
    },
    selectLongText (longText) {
      this.currentLongText = longText
      let selectedSubsection = this.currentSubsection
      this.currentSubsection = null
      let selectedShortText = this.currentShortText
      this.currentShortText = null
      let selectedLongText = this.currentLongText
      this.currentLongText = null
      let selectedCriterion = this.currentCriterion
      this.currentCriterion = null
      selectedShortText.longTexts = []
      selectedShortText.longTexts.push(selectedLongText)
      selectedSubsection.shortTexts = []
      selectedSubsection.shortTexts.push(selectedShortText)
      if (this.markedCriteria !== []) {
        for (let i = 0; i < this.markedCriteria.length; i++) {
          if (selectedCriterion.id === this.markedCriteria[i].id) {
            for (let j = 0; j < this.markedCriteria[i].subsections.length; j++) {
              if (selectedSubsection.id === this.markedCriteria[i].subsections[j].id) {
                this.markedCriteria[i].subsections[j] = selectedSubsection
                return
              }
            }
            this.markedCriteria[i].subsections.push(selectedSubsection)
            return
          }
        }
        this.markedCriteria.push(selectedCriterion)
      } else {
        this.markedCriteria.push(selectedCriterion)
      }
    }
  }
}
</script>

<style scoped>

</style>
