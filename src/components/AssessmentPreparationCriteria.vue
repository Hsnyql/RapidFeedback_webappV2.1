<template>
    <b-container fluid>
        <b-row>
            <b-col>
                <b-row><b-col><h4>Criteria List</h4><hr></b-col></b-row>
                <b-row></b-row>
            </b-col>
            <b-col>
                <b-row><b-col><h4>Marking Criteria</h4><hr></b-col></b-row>
                <b-row></b-row>
            </b-col>
            <b-col>
                <b-row><b-col><h4>Comment Only</h4><hr></b-col></b-row>
                <b-row></b-row>
            </b-col>
        </b-row>
        <b-row align-h="between">
            <b-col cols="4">
                <b-button variant="primary" to="/AssessmentPreparation/About">Back</b-button>
            </b-col>
            <b-col cols="4">
                <b-button variant="primary">Next</b-button>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'AssessmentPreparationCriteria'
}
</script>

<style scoped>

</style>
