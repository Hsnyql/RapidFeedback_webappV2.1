<template>
  <b-container fluid>
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
                  v-if="student.item.number!==null"
                  @click="view(student.item)">
                View</b-button>
            </template>
            <template v-slot:cell(middleName)="student">
              {{renderMiddleName(student.item.middleName)}}
            </template>
          </b-table>
        </b-row>
      </b-col>
    </b-row>
    <!-- <b-row>
      <p>Generate testing data:</p>
      <b-button @click="populate">Populate</b-button>
    </b-row> -->
  </b-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {store} from '@/store'
import {getMark} from '@/api'
export default {
  name: 'ReviewAndReportMain',
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
      if (middleName === '' | middleName === 'null' | middleName === null) {
        return ''
      } else {
        return middleName
      }
    },
    view (student) {
      store.state.student = student
      store.state.project = this.selectedProject
      var param = {
        token: localStorage.token,
        projectName: this.selectedProject.projectName,
        studentNumberList: [student.number],
        primaryEmail: localStorage.email
      }
      getMark(param).then(res => {
        console.log(res)
        if (res.getMark_ACK) {
          store.state.markList = JSON.parse(res.markList)
          console.log(store.state.markList)
          this.$router.push('/ReviewAndReport/View')
        }
      })
    }
  },
  mounted () {
    store.state.projectList.forEach(project => {
      project.studentInfo.forEach(student => {
        if (student.group === -999) {
          student.group = null
        }
      })
    })
  }
}
</script>

<style scoped>

</style>
