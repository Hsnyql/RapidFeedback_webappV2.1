<template>
  <b-container fluid>
    <b-row><br></b-row>
    <b-row>
      <b-col cols="2">
<!--        <b-row><h3>{{marker.firstName}}'s Project</h3></b-row>-->
        <b-row><h3>Project List:</h3></b-row>
        <b-row>
          <b-col>
            <b-list-group v-for="project in projectList" v-bind:key="project.projectName">
              <b-list-group-item button @click="selected(project)">{{project.projectName}}</b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
      </b-col>
      <b-col cols="10">
        <b-row>
          <b-col cols="1"><h6>Group No.</h6></b-col>
          <b-col cols="1"><h6>Student ID</h6></b-col>
          <b-col cols="4"><h6>Student Name</h6></b-col>
          <b-col cols="4"><h6>Email</h6></b-col>
          <b-col cols="2"></b-col>
        </b-row>
        <b-row v-for="student in selectedProject.studentInfo" v-bind:key="student.number">
          <b-col cols="1"><p>{{student.group}}</p></b-col>
          <b-col cols="1"><p>{{student.number}}</p></b-col>
          <b-col cols="4"><p>{{fullName(student)}}</p></b-col>
          <b-col cols="4"><p>{{student.email}}</p></b-col>
          <b-col cols="2"><b-button v-if='student.totalMark === -999' @click="start(student)">Start</b-button></b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-row>
      <p>Generate testing data:</p>
      <b-button @click="populate">Populate</b-button>
    </b-row>
  </b-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {store} from '@/store'
export default {
  name: 'RealTimeAssessmentMain',
  data () {
    return {
      // selectedProject: {
      //   id: null,
      //   name: null,
      //   criteria: [{id: null, criterionName: null, maxMark: null, markIncre: null}],
      //   students: [{id: null,
      //     firstName: '',
      //     middleName: '',
      //     lastName: '',
      //     email: '',
      //     group: null}]
      // },
      selectedProject: {},
      marker: {
        id: 1,
        firstName: localStorage.getItem('firstName'),
        middleName: 'middleName1',
        lastName: 'lastName1',
        email: 'marker1@email.com'},
      projectList: store.state.projectList
    }
  },
  computed: {
  },
  methods: {
    populate () {
      this.projects = []
      for (let i = 0; i < 10; i++) {
        let project = null
        let id = i + 1
        let name = 'Project' + (i + 1).toString()
        let criteria = this.generateCriteria(i + 1)
        let students = this.generateStudents(i + 1)
        project = {id: id, name: name, criteria: criteria, students: students}
        this.projects.push(project)
      }
    },
    generateCriteria (projectID) {
      let criteria = []
      for (let i = 0; i < 5; i++) {
        let id = i + 1
        let name = 'Project' + projectID.toString() + 'criterion' + (i + 1).toString()
        let maxMark = 5
        let increment = '1/2'
        criteria.push({id: id, criterionName: name, maxMark: maxMark, markIncre: increment})
      }
      return criteria
    },
    generateStudents (projectID) {
      let students = []
      for (let i = 0; i < 10; i++) {
        let newStudent = {id: i + 1,
          firstName: 'Project' + projectID.toString() + 'student' + (i + 1).toString(),
          middleName: 'middleName' + (i + 1).toString(),
          lastName: 'lastName' + (i + 1).toString(),
          email: 'student' + (i + 1).toString() + '@email.com',
          group: Math.round((i + 1) / 2)}
        students.push(newStudent)
      }
      return students
    },
    selected (project) {
      this.init()
      this.selectedProject = project
    },
    init () {
      this.selectedProject = {
        id: null,
        name: null,
        criteria: [{id: null, criterionName: null, maxMark: null, markIncre: null}],
        students: [{id: null,
          firstName: '',
          middleName: '',
          lastName: '',
          email: '',
          group: null}]
      }
    },
    fullName (student) {
      let fullName = ''
      if (student.firstName !== '') {
        if (student.middleName === '') {
          fullName = student.firstName + ' ' + student.surname
        } else {
          fullName = student.firstName + ' ' + student.middleName + ' ' + student.surname
        }
      }
      return fullName
    },
    start (student) {
      store.state.student = student
      store.state.project = this.selectedProject
      this.$router.push('/RealTimeAssessment/Marking')
    }
  },
  mounted () {
    store.state.projectList.forEach(project => {
      project.studentInfo.forEach(student => {
        if (student.group === -999 | student.group === 0) {
          student.group = null
        }
      })
    })
  },
  created () {

  }
}
</script>

<style scoped>

</style>
