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
        <b-button-group>
          <b-button variant="primary" @click="clear">Add</b-button>
          <b-button variant="danger" @click="deleteTrigger">Delete</b-button>
        </b-button-group>
      </b-col>
      <b-col cols="10">
        <h1>Please Select or Add a Project</h1>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="2">
        <!-- <b-row><h5>Project List:</h5></b-row>
        <b-list-group v-for="project in projectList" v-bind:key="project.projectName">
          <b-list-group-item button @click="choose(project.projectName)">{{project.projectName}}</b-list-group-item>
        </b-list-group> -->
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
      <b-col>
        <b-row>
          <b-col>
            <b-row><b-col><hr></b-col></b-row>
            <b-row>
              <b-col cols="10">
                <h5>About</h5>
              </b-col>
              <b-col cols="2">
                <b-button v-if="selectedProject.length === 0" @click="nextpage('/AssessmentPreparation/About')">Edit</b-button>
              </b-col>
            </b-row>
            <b-row><b-col><hr></b-col></b-row>
            <b-row>
              <b-col>
                <p>Project Details</p>
                <p>Subject Name: {{subjectName}}</p>
                <p>Subject Code: {{subjectCode}}</p>
                <p>description: {{description}}</p>
                <hr>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-row>
              <b-col cols="10">
                <h5>Criteria</h5>
              </b-col>
              <b-col cols="2">
                <b-button v-if="selectedProject.length === 0" @click="nextpage('/AssessmentPreparation/Criteria')">Edit</b-button>
              </b-col>
            </b-row>
            <b-row><b-col><hr></b-col></b-row>
            <b-row>
              <b-col>
                <p>Criteria Details</p>
                <hr>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <h5>Marker Management</h5>
            <hr>
            <p>Click the subtitle to manage markers</p>
            <hr>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-row>
              <b-col cols="10">
                <h5>Student Management</h5>
              </b-col>
              <b-col cols="2">
                <b-button v-if="selectedProject.length === 0" @click="nextpage('/AssessmentPreparation/Student')">Edit</b-button>
              </b-col>
            </b-row>
            <b-row><b-col><hr></b-col></b-row>
            <b-row>
              <b-col>
                <p>Click the subtitle to manage students</p>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {store} from '@/store.js'
import {deleteProject} from '@/api'

export default {
  name: 'AssessmentPreparationMain',
  data () {
    return {
      deleting: false,
      projectList: store.state.projectList,
      selectedProject: {},
      projectField: [{key: 'projectName', sortable: true, label: 'Project List:'}]
    }
  },
  methods: {
    choose (name) {
      if (this.deleting) {
        this.deletePro(name)
      } else {
        store.state.projectName = name
        // console.log('store ' + store.projectName)
        this.projectList.forEach(item => {
          if (item.projectName === name) {
            store.state.project = item
          }
        })
      }
    },
    selected (project) {
      // this.selectedProject = {}
      // this.selectedProject = project
      // store.state.project = project
      if (this.deleting) {
        this.deletePro(project.projectName)
      } else {
        store.state.project = project
        // console.log('store ' + store.projectName)
        this.selectedProject = project
      }
    },
    clear () {
      store.state.project = {}
      store.state.projectName = null
      this.deleting = false
      this.$router.push('/AssessmentPreparation/About')
    },
    nextpage (path) {
      this.$router.push(path)
    },
    deleteTrigger () {
      this.deleting = true
    },
    deletePro (projectName) {
      var param = {
        token: localStorage.token,
        projectName: projectName
      }
      deleteProject(param).then(res => {
        console.log(res)
        if (res.updateProject_ACK) {
          var temp = null
          this.projectList.forEach(item => {
            if (item.projectName === projectName) {
              temp = item
            }
          })
          if (store.state.project === temp) {
            store.state.project = null
          }
          let i = store.state.projectList.indexOf(temp)
          store.state.projectList.splice(i, 1)
          localStorage.setItem('projectList', JSON.stringify(store.state.projectList))
        } else {
          // TODO: failure alert
          console.log('fail')
        }
      })
      this.deleting = false
    }
  },
  computed: {
    subjectName () {
      if (store.state.project.subjectName === 'null') {
        return ' '
      } else {
        return store.state.project.subjectName
      }
    },
    subjectCode () {
      if (store.state.project.subjectCode === 'null') {
        return ' '
      } else {
        return store.state.project.subjectCode
      }
    },
    description () {
      if (store.state.project === null) {
        return ' '
      } else {
        return store.state.project.description
      }
    }
  },
  created () {
    if (store.state.projectList.length > 0) {
      store.state.project = store.state.projectList[0]
      store.state.projectName = store.state.project.projectName
    } else {
      store.state.project = {}
      store.state.projectName = null
    }
  }
}
</script>

<style scoped>

</style>
