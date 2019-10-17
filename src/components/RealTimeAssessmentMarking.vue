<template>
  <b-container fluid>
    <b-row>
      <b-col cols="10"><h1>{{selectedProject.name}}</h1></b-col>
      <b-col cols="2"><b-button>Finish</b-button></b-col>
    </b-row>
    <b-row>
      <b-col cols="4">{{fullName(selectedStudent)}}</b-col>
      <b-col cols="4"></b-col>
      <b-col cols="3"></b-col>
      <b-col cols="1"></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'RealTimeAssessmentMarking',
  data () {
    return {
      selectedProject: {
        id: 1,
        name: 'Project1',
        criteria: [
          {id: 1, criterionName: 'Criteria 1'},
          {id: 2, criterionName: 'Criteria 2'},
          {id: 3, criterionName: 'Criteria 3'},
          {id: 4, criterionName: 'Criteria 4'}],
        students: [
          {id: 1, firstName: 'firstName1', middleName: '', lastName: 'lastName1', email: 'student1@email.com', group: 0},
          {id: 2, firstName: 'firstName2', middleName: 'middleName2', lastName: 'lastName2', email: 'student2@email.com', group: 0},
          {id: 3, firstName: 'firstName3', middleName: 'middleName3', lastName: 'lastName3', email: 'student3@email.com', group: 0},
          {id: 4, firstName: 'firstName4', middleName: '', lastName: 'lastName4', email: 'student4@email.com', group: 0}
        ]},
      selectedStudent: {id: 1, firstName: 'firstName1', middleName: '', lastName: 'lastName1', email: 'student1@email.com', group: 0}
    }
  },
  methods: {
    fullName (student) {
      let fullName = ''
      if (student.firstName !== '') {
        if (student.middleName === '') {
          fullName = student.firstName + ' ' + student.lastName
        } else {
          fullName = student.firstName + ' ' + student.middleName + ' ' + student.lastName
        }
      }
      return fullName
    }
  }
}
</script>

<style scoped>

</style>
