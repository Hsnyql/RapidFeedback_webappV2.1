<template>
  <b-container fluid>
    <b-row>
      <b-col cols="6"><h3>Student Management</h3></b-col>
      <b-col cols="2">
        <b-button variant="primary">Group</b-button>
        <b-button variant="primary">UnGroup</b-button>
      </b-col>
      <b-col cols="4">
        <b-button variant="primary">Upload</b-button>
        <b-button variant="primary">Add</b-button>
        <b-button variant="primary">Edit</b-button>
        <b-button variant="primary">Remove</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col><hr><hr></b-col>
    </b-row>
    <b-row align-h="between">
      <b-col cols="4">
        <b-button variant="primary" to="/AssessmentPreparation/Grading">Back</b-button>
      </b-col>
      <b-col cols="4">
        <b-button variant="primary">Save</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'AssessmentPreparationStudent'
}
</script>

<style scoped>

</style>
