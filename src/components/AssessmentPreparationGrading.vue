<template>
    <b-container fluid>
      <b-row><b-col><h4>Customised Grading Criteria</h4><hr></b-col></b-row>
      <b-row></b-row>
      <b-row align-h="between">
        <b-col cols="4">
          <b-button variant="primary" to="/AssessmentPreparation/Criteria">Back</b-button>
        </b-col>
        <b-col cols="4">
          <b-button variant="primary">Save</b-button>
          <b-button variant="primary" to="/AssessmentPreparation/Student">Next</b-button>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'AssessmentPreparationGrading'
}
</script>

<style scoped>

</style>
