<template>
  <b-container fluid>
<!--    <b-row><br></b-row>-->
    <b-row>
      <b-col cols="2">
        <b-button variant="primary" to="/MainMenu">Back</b-button>
      </b-col>
    </b-row>
    <b-row><br></b-row>
    <b-row>
      <b-col cols="2">
        <b-table
            sticky-header
            hover
            borderless
            outlined
            head-variant="light"
            :items="projectList"
            :fields="projectField">
          <template v-slot:cell(projectName)="project">
            <b-button block variant="outline-primary" @click="selected(project.item)">{{project.value}}</b-button>
          </template>
        </b-table>
      </b-col>
      <b-col cols="10">
        <b-row>
          <b-table
              hover
              head-variant="light"
              :items="selectedProject.studentInfo"
              :fields="studentFields">
            <template v-slot:cell(action)="student">
                <b-button
                    size="sm"
                    v-if="student.item.totalMark===-999"
                    @click="start(student.item)">
                  Start</b-button>
            </template>
            <template v-slot:cell(middleName)="student">
              {{renderMiddleName(student.item.middleName)}}
            </template>
          </b-table>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {store} from '@/store'

export default {
  name: 'RealTimeAssessmentMain',
  data () {
    return {
      selectedProject: {},
      marker: {
        id: 1,
        firstName: localStorage.getItem('firstName'),
        middleName: 'middleName1',
        lastName: 'lastName1',
        email: 'marker1@email.com'},
      projectList: store.state.projectList,
      projectField: [{key: 'projectName', sortable: true, label: 'Project List:'}],
      studentFields: [
        {key: 'group', sortable: true, label: 'Group No'},
        {key: 'number', sortable: true, label: 'Student No'},
        {key: 'firstName', sortable: true, label: 'First Name'},
        {key: 'middleName', sortable: true, label: 'Middle Name'},
        {key: 'surname', sortable: true, label: 'Last Name'},
        {key: 'email', sortable: true, label: 'Student Email'},
        {key: 'action', label: 'Action'}
      ]
    }
  },
  computed: {
  },
  methods: {
    selected (project) {
      this.selectedProject = {}
      this.selectedProject = project
    },
    // fullName (student) {
    //   let fullName = ''
    //   if (student.firstName !== '') {
    //     if (student.middleName === '' | student.middleName === null) {
    //       fullName = student.firstName + ' ' + student.surname
    //     } else {
    //       fullName = student.firstName + ' ' + student.middleName + ' ' + student.surname
    //     }
    //   }
    //   return fullName
    // },
    renderMiddleName (middleName) {
      if (middleName === '' || middleName === 'null' || middleName === null) {
        return ''
      } else {
        return middleName
      }
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
        if (student.group === -999 || student.group === 0) {
          student.group = null
        }
      })
    })
  }
}
</script>

<style scoped>

</style>
