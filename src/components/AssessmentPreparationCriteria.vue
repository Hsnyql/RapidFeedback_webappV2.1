<template>
    <b-container fluid>
        <b-row align-h="center">
            <b-col>
                <b-row>
                    <b-col cols="9"></b-col>
                    <b-col>
                        <b-button v-b-modal.newCriterion variant="primary">Add</b-button>
                    </b-col>
                    <b-modal id="newCriterion"
                             ref="modal"
                             title="Enter New Criterion Name"
                             @show="resetModal"
                             @hidden="resetModal"
                             @ok="recordNewCriterion">
                        <form ref="form" @submit.stop.prevent="handleSubmit">
                            <b-form-group :state="inputState"
                                          label="New Criterion Name:"
                                          label-for="criterionName-input"
                                          invalid-feedback="New Criterion Name is Required">
                                <b-form-input id="criterionName-input"
                                              v-model="newCriterionName"
                                              :state="inputState"
                                              required></b-form-input>
                            </b-form-group>
                        </form>
                       <b-alert :show="dismissCountDown"
                                dismissible variant="warning"
                                @dismissed="dissmissCountDown=0"
                                @dismiss-count-down="countDownChanged">
                           <p>Please enter a VALID New Criterion Name!</p>
                           <b-progress variant="warning"
                                       :max="dismissSecs"
                                       :value="dissmissCountDown"
                                       height="4px"></b-progress>
                       </b-alert>
                       <p v-if="errorFound">Please enter a VALID New Criterion Name!</p>
                    </b-modal>
                </b-row>
                <b-row align-content="center" align-h="center">
            <b-col cols="3" >
                <b-row><b-col><h4>Criteria List</h4><hr></b-col></b-row>
                <b-row>
                    <b-form-group label="select criteria from the list">
                        <b-form-checkbox
                            v-for="criterion in criteria"
                            v-model="selected"
                            :key="criterion.name"
                            :value="criterion"
                            name="criteria pool"
                        >
                            {{ criterion.name }}
                        </b-form-checkbox>
                    </b-form-group>
                </b-row>
            </b-col>
            <b-col cols="3">
                <b-row><b-col><h4>Marking Criteria</h4><hr></b-col></b-row>

                <b-row>
                    <p class="w-100">selected criteria will display below</p>
                    <ul id="selected criteria">
                        <li v-for="criterion in selected" :key="criterion.name">
                            {{ criterion.name }}
                        </li>
                    </ul>
                </b-row>
            </b-col>
            <b-col cols="3">
                <b-row><b-col><h4>Comment Only</h4><hr></b-col></b-row>
                <b-row id="comment-form">
                    <b-form-group id="positive" label="positive" label-for="pos-input">
                        <b-form-input id="pos-input" type="text" required
                            placeholder="Enter comment" v-model="comment"></b-form-input>
                    </b-form-group>
                    <b-form-group id="neutral" label="neutral" label-for="neu-input">
                        <b-form-input id="neu-input" type="text" required
                            placeholder="Enter comment" v-model="comment"></b-form-input>
                    </b-form-group>
                    <b-form-group id="negative" label="negative" label-for="neg-input">
                        <b-form-input id="neg-input" type="text" required
                            placeholder="Enter comment" v-model="comment"></b-form-input>
                    </b-form-group>
                </b-row>
            </b-col>
        </b-row>
                <b-row align-h="between">
                  <b-col cols="2"></b-col>
                    <b-col cols="4">
                        <b-button variant="primary" to="/AssessmentPreparation/About">Back</b-button>
                    </b-col>
                    <b-col cols="4">
                        <b-button variant="primary" @click="saveSelected">Next</b-button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import {store} from '@/store'

export default {
  name: 'AssessmentPreparationCriteria',
  data () {
    return {
      // dismissSecs: 10,
      dismissCountDown: 0,
      errorFound: false,
      newCriterionName: '',
      inputState: null,
      selected: store.state.project.criteria,
      // selected: [{name: 'criterion 1', markIncrement: null, maximunMark: 0, subsectionList: [], weight: 0}], //  must be an array
      // criteria: [
      //   {id: 1, criterionName: 'Criteria 1'},
      //   {id: 2, criterionName: 'Criteria 2'},
      //   {id: 3, criterionName: 'Criteria 3'},
      //   {id: 4, criterionName: 'Criteria 4'}
      // ] //  Sample data for display
      // criteria: store.project.criteriaList
      criteria: [
        {name: 'criterion 1', markIncrement: null, maximunMark: 0, subsectionList: [], weight: 0},
        {name: 'criterion 2', markIncrement: null, maximunMark: 0, subsectionList: [], weight: 0}
      ]
    }
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      console.log('NameState before: ', this.nameState)
      this.nameState = valid
      console.log('NameState after: ', this.nameState)
      // if (this.nameState === 'valid') {
      //   valid = true
      // } else {
      //   valid = false
      // }
      console.log('Valid: ', valid)
      return valid
    },
    resetModal () {
      this.newCriterionName = ''
      this.nameState = null
    },
    recordNewCriterion (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
    },
    handleSubmit () {
      if (!this.checkFormValidity()) {
        // this.errorFound = this.checkFormValidity()
        return
      }
      // let newCriterion = {id: this.criteria.length + 1, criterionName: this.newCriterionName}
      let newCriterion = {name: this.newCriterionName, markIncrement: null, maximunMark: 0, subsectionList: [], weight: 0}
      this.criteria.push(newCriterion)
      // this.selected.push(newCriterion)
      this.$nextTick(() => {
        this.$refs.modal.hide()
      })
    },
    countDownChanged (dissmissCountDown) {
      this.dissmissCountDown = dissmissCountDown
    },
    showAlert () {
      this.dissmissCountDown = this.dismissSecs
    },
    saveSelected () {
      // store.state.project.criteria = this.seleted
      store.state.criteriaList = this.selected
      // store.project.criteriaList = this.selected
      // console.log(store.state.criteriaList)
      this.$router.push('/AssessmentPreparation/Grading')
    }
  },
  // computed: {
  //   criteria1 () {
  //     if (store.project) {
  //       return store.project.criteriaList
  //     } else {
  //       return [
  //         {name: 'criterion 1', markIncrement: null, maximunMark: 0, subsectionList: [], weight: 0},
  //         {name: 'criterion 2', markIncrement: null, maximunMark: 0, subsectionList: [], weight: 0}
  //       ]
  //     }
  //   }
  // }
  created () {
    // if (store.state.project.criteria !== null) {
    //   this.selected = store.state.project.critera
    // }
  }
}
</script>

<style scoped>

</style>
