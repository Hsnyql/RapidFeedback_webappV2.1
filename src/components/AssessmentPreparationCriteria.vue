<template>
  <b-container fluid>
    <b-row><br></b-row>
    <b-row align-content="center" align-h="center">
      <b-col cols="5">
        <b-row>
          <b-col>
            <h5>Criteria List</h5>
          </b-col>
          <b-col cols="4">
            <b-button variant="primary">Upload</b-button>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="5">
        <b-row>
          <b-col>
            <h5>Marking Criteria</h5>
          </b-col>
          <b-col cols="4">
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
            <p v-if="errorFound">Please enter a VALID New Criterion Name!</p>
          </b-modal>
        </b-row>
      </b-col>
    </b-row>
    <b-row><b-col><hr></b-col></b-row>
    <b-row align-content="center" align-h="center">
      <b-col cols="5">
        <b-row>
          <b-form-group label="Please select criteria from the list below">
            <b-form-checkbox
                v-for="criterion in criteria"
                v-model="selected"
                :key="criterion.name"
                :value="criterion"
                name="criteria pool">
              {{ criterion.name }}
            </b-form-checkbox>
          </b-form-group>
        </b-row>
      </b-col>
      <b-col cols="5">
        <b-row>
          <p class="w-100">Selected criteria will display below</p>
          <ul id="selected criteria">
            <li v-for="criterion in selected" :key="criterion.name">
              {{ criterion.name }}
            </li>
          </ul>
        </b-row>
      </b-col>
    </b-row>
    <b-row><b-col><hr></b-col></b-row>
    <b-row align-h="center">
<!--        <b-col cols="2"></b-col>-->
        <b-col cols="3">
          <b-row align-h="center">
            <b-button variant="primary" to="/AssessmentPreparation/About">Back</b-button>
          </b-row>
        </b-col>
        <b-col cols="3">
          <b-row align-h="center">
            <b-button variant="primary" @click="saveSelected">Next</b-button>
          </b-row>
        </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {store} from '@/store'
import {defaultCriteria} from '@/assets/defaultCriteria'

export default {
  name: 'AssessmentPreparationCriteria',
  data () {
    return {
      dismissCountDown: 0,
      errorFound: false,
      newCriterionName: '',
      inputState: null,
      selected: [],
      criteria: defaultCriteria
    }
  },
  methods: {
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      console.log('NameState before: ', this.nameState)
      this.nameState = valid
      console.log('NameState after: ', this.nameState)
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
        return
      }
      let newCriterion = {name: this.newCriterionName, markIncrement: null, maximunMark: 0, subsectionList: [], weight: 0}
      this.criteria.push(newCriterion)
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
      store.state.criteriaList = this.selected
      this.$router.push('/AssessmentPreparation/Grading')
    }
  },
  computed: {
    hasSelected () {
      if (this.selected) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    if (store.state.project.hasOwnProperty('criteria')) {
      this.selected = store.state.project.criteria
    }
  }
}
</script>

<style scoped>

</style>
