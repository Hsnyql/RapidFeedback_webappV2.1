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
                            :key="criterion.id"
                            :value="criterion.criteriaName">
                        {{criterion.criteriaName}}
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
      selected: [], //  must be an array
      criteria: [
        {id: 1, criteriaName: 'Criteria 1'},
        {id: 2, criteriaName: 'Criteria 2'},
        {id: 3, criteriaName: 'Criteria 3'},
        {id: 4, criteriaName: 'Criteria 4'}
      ] //  Sample data for display
    }
  }
}
</script>

<style scoped>

</style>
