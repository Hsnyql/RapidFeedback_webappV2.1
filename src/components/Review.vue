<template>
    <b-container fluid>
        <b-row>
            <b-col cols="2">
                <b-row><h3>Projects</h3></b-row>
                <b-row>
                    <b-col>
                        <b-list-group v-for="project in projectList" v-bind:key="project.projectName">
                          <b-list-group-item button @click="choose(project.projectName)">{{project.projectName}}</b-list-group-item>
                        </b-list-group>
                    </b-col>
                </b-row>
            </b-col>
            <b-col>
                <b-row align-h="center">
                    <h1>Project Reports</h1>
                </b-row>
                <b-row align-h="center">
                  <h2>{{project.projectName}}</h2>
                </b-row>
                <b-row>
                  <b-col cols="1"><h6>Group No.</h6></b-col>
                  <b-col cols="1"><h6>Student ID</h6></b-col>
                  <b-col cols="4"><h6>Student Name</h6></b-col>
                  <b-col cols="4"><h6>Email</h6></b-col>
                  <b-col cols="2"></b-col>
                </b-row>
                <b-row v-for="student in project.studentInfo" v-bind:key="student.number">
                  <b-col cols="1"><p>{{student.group}}</p></b-col>
                  <b-col cols="1"><p>{{student.number}}</p></b-col>
                  <b-col cols="4"><p>{{fullName(student)}}</p></b-col>
                  <b-col cols="4"><p>{{student.email}}</p></b-col>
                  <b-col cols="2"><b-button v-if='student.number!==null' @click="report(student)">REPORT</b-button></b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import {store} from '@/store'
export default {
  name: 'Review',
  data () {
    return {
      projectList: JSON.parse(localStorage.getItem('projectList')),
      project: {}
    }
  },

  components: {},

  computed: {},

  methods: {
    choose (name) {
      store.state.projectName = name
      // console.log('store ' + store.projectName)
      this.projectList.forEach(item => {
        if (item.projectName === name) {
          store.state.project = item
          this.project = item
        }
      })
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
    report (student) {
      store.state.student = student
      // this.$router.push('/')
    }
  }
}

</script>
