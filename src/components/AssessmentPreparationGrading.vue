<template>
  <b-container fluid>
    <b-row><br></b-row>
    <b-row align-h="center">
      <b-col cols="9">
        <h3>Customised Grading Criteria</h3>
      </b-col>
    </b-row>
    <b-row><b-col><hr></b-col></b-row>
    <b-row align-h="center">
      <b-col cols="9">
        <b-row v-for="criterion in criteria" v-bind:key = "criterion.name">
          <b-col>
            <b-row>
              <b-col><h4>{{ criterion.name }}</h4><hr></b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group
                    label="Maximum Mark: "
                    label-cols="6"
                    id="maxMark-input">
                  <b-form-input type="number" required v-model="criterion.maximunMark"></b-form-input>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-form-group
                    label="Mark Increment: "
                    label-cols="6">
                  <b-form-radio-group v-model="criterion.markIncrement">
                    <b-form-radio v-for="increment in increments"
                                  v-bind:key="increment.id"
                                  :value="increment.value">
                      {{ increment.value }}</b-form-radio>
                  </b-form-radio-group>
                </b-form-group>
              </b-col>
            </b-row>
            <div>
              <!-- <p>Test Only:</p> -->
              <p><strong>{{ criterion.name}}:</strong></p>
              <p>Maximum Mark: <strong>{{ criterion.maximunMark }}</strong></p>
              <p>Selected: <strong>{{ criterion.markIncrement}}</strong></p>
            </div>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row><b-col><hr></b-col></b-row>
    <b-row align-h="center">
      <b-col cols="3">
        <b-row align-h="center">
          <b-button variant="primary" to="/AssessmentPreparation/Criteria">Back</b-button>
        </b-row>
      </b-col>
      <b-col cols="3">
        <b-row align-h="center">
          <b-button variant="primary" @click="saveCriteria">Save</b-button>
          <b-button variant="primary" to="/AssessmentPreparation/Student">Next</b-button>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {store} from '@/store'
import {editCriteria} from '@/api'
export default {
  name: 'AssessmentPreparationGrading',
  data () {
    return {
      maxMark: '',
      selected: [],
      increments: [{id: 1, value: '1/4'}, {id: 2, value: '1/2'}, {id: 3, value: '1'}],
      // criteria: [
      //   // {id: 1, criterionName: 'Criteria 1', increments: [{id: 1, value: '1/4'}, {id: 2, value: '1/2'}, {id: 3, value: '1'}], criterionParam: [{maxMark: '', markIncre: []}]},
      //   // {id: 2, criterionName: 'Criteria 2', increments: [{id: 1, value: '1/4'}, {id: 2, value: '1/2'}, {id: 3, value: '1'}], criterionParam: [{maxMark: '', markIncre: []}]},
      //   // {id: 3, criterionName: 'Criteria 3', increments: [{id: 1, value: '1/4'}, {id: 2, value: '1/2'}, {id: 3, value: '1'}], criterionParam: [{maxMark: '', markIncre: []}]},
      //   // {id: 4, criterionName: 'Criteria 4', increments: [{id: 1, value: '1/4'}, {id: 2, value: '1/2'}, {id: 3, value: '1'}], criterionParam: [{maxMark: '', markIncre: []}]}
      //   {name: 'test', markIncrement: null, maximunMark: 0, subsectionList: [], weight: 0}
      // ] //  Sample data for display
      criteria: []
    }
  },
  methods: {
    test () {
      console.log(this.criteria)
    },
    saveCriteria () {
      var param = {
        token: localStorage.token,
        projectName: store.state.project.projectName,
        markedCriteriaList: this.criteria,
        commentCriteriaList: []
      }
      editCriteria(param).then(res => {
        console.log(res)
        if (res.updateProject_ACK) {
          store.state.project.criteria = this.criteria
          store.state.criteriaList = this.criteria
          store.state.projectList.forEach(p => {
            if (p.projectName === store.state.projectName) {
              p = store.state.project
            }
          })
          localStorage.setItem('projectList', JSON.stringify(store.state.projectList))
        }
        console.log(store.state.project)
      })
    }
  },
  created () {
    console.log(store.state.project)
    console.log(store.state.criteriaList)
    if (store.state.criteriaList.length === 0) {
      this.criteria = store.state.project.criteria
    } else {
      this.criteria = store.state.criteriaList
    }
  }
}
</script>

<style scoped>

</style>
