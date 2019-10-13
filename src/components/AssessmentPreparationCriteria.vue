<template>
    <b-container fluid>
<!--        <b-row>-->
<!--            <b-col>-->
<!--                <b-row><b-col><h4>Criteria List</h4><hr></b-col></b-row>-->
<!--                <b-row><p>"list of Criteria available for selection"</p></b-row>-->
<!--            </b-col>-->
<!--            <b-col>-->
<!--                <b-row><b-col><h4>Marking Criteria</h4><hr></b-col></b-row>-->
<!--                <b-row><p>"list of Criteria selected for this project"</p></b-row>-->
<!--            </b-col>-->
<!--            <b-col>-->
<!--                <b-row><b-col><h4>Comment Only</h4><hr></b-col></b-row>-->
<!--                <b-row>"list of standalone comments"</b-row>-->
<!--            </b-col>-->
<!--        </b-row>-->
        <b-row align-h="center">
            <b-col cols="9">
                <b-row>
                    <b-col cols="9"><h4>Criteria List</h4><hr></b-col>
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
<!--                        <b-alert :show="dismissCountDown"-->
<!--                                 dismissible variant="warning"-->
<!--                                 @dismissed="dissmissCountDown=0"-->
<!--                                 @dismiss-count-down="countDownChanged">-->
<!--                            <p>Please enter a VALID New Criterion Name!</p>-->
<!--                            <b-progress variant="warning"-->
<!--                                        :max="dismissSecs"-->
<!--                                        :value="dissmissCountDown"-->
<!--                                        height="4px"></b-progress>-->
<!--                        </b-alert>-->
<!--                        <p v-if="errorFound">Please enter a VALID New Criterion Name!</p>-->
                    </b-modal>
                </b-row>
                <b-row>
                    <b-form-group>
                    <b-form-checkbox
                            v-for="criterion in criteria"
                            v-model="selected"
                            :key="criterion.id"
                            :value="criterion.criterionName">
                        {{criterion.criterionName}}
                    </b-form-checkbox>
<!--                        <b-form-checkbox-group-->
<!--                                v-model="selected"-->
<!--                                :options="criteria.value"-->
<!--                                name="availableCriteriaList"-->
<!--                                stacked-->
<!--                        ></b-form-checkbox-group>-->
                    </b-form-group>
                </b-row>
                <div>
                    Test Only: Selected: <strong>{{ selected }}</strong>
                </div>
                <div>
                    Test Only: Current Criteria:
                    <div v-for="criterion in criteria"
                         v-bind:key="criterion.id">
                        ID: {{criterion.id}}, Name: {{criterion.criterionName}}</div>
                </div>
                <b-row align-h="between">
                    <b-col cols="4">
                        <b-button variant="primary" to="/AssessmentPreparation/About">Back</b-button>
                    </b-col>
                    <b-col cols="4">
                        <b-button variant="primary" to="/AssessmentPreparation/Grading">Next</b-button>
                    </b-col>
                </b-row>
            </b-col>
<!--        <b-row align-h="between">-->
<!--            <b-col cols="4">-->
<!--                <b-button variant="primary" to="/AssessmentPreparation/About">Back</b-button>-->
<!--            </b-col>-->
<!--            <b-col cols="4">-->
<!--                <b-button variant="primary" to="/AssessmentPreparation/Grading">Next</b-button>-->
<!--            </b-col>-->
<!--        </b-row>-->
        </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'AssessmentPreparationCriteria',
  data () {
    return {
      // dismissSecs: 10,
      // dismissCountDown: 0,
      errorFound: false,
      newCriterionName: '',
      inputState: null,
      selected: [], //  must be an array
      criteria: [
        {id: 1, criterionName: 'Criteria 1'},
        {id: 2, criterionName: 'Criteria 2'},
        {id: 3, criterionName: 'Criteria 3'},
        {id: 4, criterionName: 'Criteria 4'}
      ] //  Sample data for display
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
      let newCriterion = {id: this.criteria.length + 1, criterionName: this.newCriterionName}
      this.criteria.push(newCriterion)
      this.selected.push(newCriterion)
      this.$nextTick(() => {
        this.$refs.modal.hide()
      })
    },
    countDownChanged (dissmissCountDown) {
      this.dissmissCountDown = dissmissCountDown
    },
    showAlert () {
      this.dissmissCountDown = this.dismissSecs
    }
  }
}
</script>

<style scoped>

</style>
