<template>
    <b-container fluid>
        <b-row><b-col><h4>Customised Grading Criteria</h4><hr></b-col></b-row>
        <b-row v-for="criterion in criteria" v-bind:key = "criterion.name">
            <b-col>
                <b-row>
                    <b-col><h4>{{ criterion.name }}</h4><hr></b-col>
                </b-row>
<!--                <b-row>-->
<!--                    <b-form-group id="MaximumMark" label="Maximum Mark:" label-for="maxMark-input">-->
<!--                        <b-form-input id="maxMark-input" type="number" required-->
<!--                                      placeholder="Enter Maximum Mark" v-model="maxMark"></b-form-input>-->
<!--                    </b-form-group>-->
<!--                </b-row>-->
<!--                <b-row>-->
<!--                    <b-form-group id="MarkIncrements" label="Mark Increments:" label-for="markIncre-input">-->
<!--                        <b-form-checkbox id="markIncre-input"-->
<!--                                         v-for="increment in increments"-->
<!--                                         v-model="selected"-->
<!--                                         :key="increment.id"-->
<!--                                         :value="increment.value"-->
<!--                                         inline-->
<!--                        >{{ increment.value }}</b-form-checkbox>-->
<!--                    </b-form-group>-->
<!--                </b-row>-->
                <b-row>
                    <b-col>
                        <b-row><label for="maxMark-input">Maximum Mark:</label></b-row>
                        <b-row><label for="markIncre-input">Mark Increments:</label></b-row>
                    </b-col>
                    <b-col>
                        <b-row>
                            <b-form-input id="maxMark-input"
                                          type="number" required v-model="criterion.maximunMark"></b-form-input>
                        </b-row>
                        <b-row>
                            <b-form-group id="markIncre-input">
                                <b-form-radio-group  v-model="criterion.markIncrement">
                                    <b-form-radio v-for="increment in increments"
                                                  v-bind:key="increment.id"
                                                  :value="increment.value">
                                        {{ increment.value }}</b-form-radio>
                                </b-form-radio-group>
                            </b-form-group>
                        </b-row>
                    </b-col>
                </b-row>
                <div>
                    <p>Test Only:</p>
                    <p><strong>{{ criterion.name}}:</strong></p>
                    <p>Maximum Mark: <strong>{{ criterion.maximunMark }}</strong></p>
                    <p>Selected: <strong>{{ criterion.markIncrement}}</strong></p>
                </div>
            </b-col>
        </b-row>
        <b-row align-h="between">
            <b-col cols="4">
                <b-button variant="primary" to="/AssessmentPreparation/Criteria">Back</b-button>
            </b-col>
            <b-col cols="4">
                <b-button variant="primary" @click="test">Save</b-button>
                <b-button variant="primary" to="/AssessmentPreparation/Student">Next</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {store} from '@/store'
export default {
  name: 'AssessmentPreparationGrading',
  data () {
    return {
      maxMark: '',
      selected: [],
      // increments: ['1/4', '1/2', '1'],
      increments: [{id: 1, value: '1/4'}, {id: 2, value: '1/2'}, {id: 3, value: '1'}],
      // criteria: [
      //   // {id: 1, criterionName: 'Criteria 1', increments: [{id: 1, value: '1/4'}, {id: 2, value: '1/2'}, {id: 3, value: '1'}], criterionParam: [{maxMark: '', markIncre: []}]},
      //   // {id: 2, criterionName: 'Criteria 2', increments: [{id: 1, value: '1/4'}, {id: 2, value: '1/2'}, {id: 3, value: '1'}], criterionParam: [{maxMark: '', markIncre: []}]},
      //   // {id: 3, criterionName: 'Criteria 3', increments: [{id: 1, value: '1/4'}, {id: 2, value: '1/2'}, {id: 3, value: '1'}], criterionParam: [{maxMark: '', markIncre: []}]},
      //   // {id: 4, criterionName: 'Criteria 4', increments: [{id: 1, value: '1/4'}, {id: 2, value: '1/2'}, {id: 3, value: '1'}], criterionParam: [{maxMark: '', markIncre: []}]}
      //   {name: 'test', markIncrement: null, maximunMark: 0, subsectionList: [], weight: 0}
      // ] //  Sample data for display
      criteria: store.criteriaList
    }
  },
  methods: {
    test () {
      console.log(this.criteria)
    }
  }
}
</script>

<style scoped>

</style>
