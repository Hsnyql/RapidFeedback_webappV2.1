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
                            <b-form-group :state="nameState"
                                          label="New Criterion Name:"
                                          label-for="criterionName-input"
                                          invalid-feedback="New Criterion Name is Required">
                                <b-form-input id="criterionName-input"
                                              v-model="newCriterionName"
                                              :state="nameState"
                                              required></b-form-input>
                            </b-form-group>
                        </form>
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
      newCriterionName: '',
      nameState: null,
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
      this.nameState = valid ? 'valid' : 'invalid'
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
        return
      }
      let newCriterion = {id: this.criteria.length + 1, criterionName: this.newCriterionName}
      this.criteria.push(newCriterion)
      this.selected.push(newCriterion)
      this.$nextTick(() => {
        this.$refs.modal.hide()
      })
    }
  }
}
</script>

<style scoped>

</style>
