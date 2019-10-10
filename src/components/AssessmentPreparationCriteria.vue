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
                        <b-button variant="primary">Add</b-button>
                    </b-col>
                </b-row>
                <b-row>
                    <b-form-group>
                    <b-form-checkbox
                            v-for="criterion in criteria"
                            v-model="selected"
                            :key = "criterion.text"
                            :value="criterion.value"
                            name="availableCriteriaList"
                    >
                        {{criterion.value}}
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
      selected: [], // must be an array
      criteria: [
        {text: 1, value: 'Criteria 1'},
        {text: 2, value: 'Criteria 2'},
        {text: 3, value: 'Criteria 3'},
        {text: 4, value: 'Criteria 4'}
      ]
    }
  }
}
</script>

<style scoped>

</style>
