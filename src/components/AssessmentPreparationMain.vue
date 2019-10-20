<template>
    <b-container fluid>
        <b-row>
            <b-col cols="2">
                <b-row>
                    <b-col>
                        <b-nav vertical>
                          <b-button @click="deleteTrigger">delete</b-button>
                          <b-button @click="clear">Add Assessment</b-button>
                        </b-nav>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <!-- <b-list-group>
                            <b-list-group-item v-for="item in projectList" v-bind:key="item.projectName" @click="choose(item.projectName)">
                              {{ item.projectName }}
                            </b-list-group-item>
                        </b-list-group> -->
                        <b-list-group v-for="project in projectList" v-bind:key="project.projectName">
                          <b-list-group-item button @click="choose(project.projectName)">{{project.projectName}}</b-list-group-item>
                        </b-list-group>
                    </b-col>
                </b-row>
            </b-col>
            <b-col>
                <b-row align-h="center">
                    <h1>Please Select or Add a Project</h1>
                </b-row>
                <b-row>
                    <b-col @click="nextpage('/AssessmentPreparation/About')">
                        <h5>About</h5>
                        <hr>
                        <p>Project Details</p>
                        <p>Subject Name: {{subjectName}}</p>
                        <p>Subject Code: {{subjectCode}}</p>
                        <p>description: {{description}}</p>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col @click="nextpage('/AssessmentPreparation/Criteria')">
                        <h5>Criteria</h5>
                        <hr>
                        <p>Criteria Details</p>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                      <!-- TODO: redirect to marker invitation page -->
                        <h5>Marker Management</h5>
                        <hr>
                        <p>Click the subtitle to manage markers</p>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col @click="nextpage('/AssessmentPreparation/Student')">
                        <h5>Student Management</h5>
                        <hr>
                        <p>Click the subtitle to manage students</p>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {store} from '@/store.js'
import {deleteProject} from '@/api'

export default {
  name: 'AssessmentPreparationMain',
  data () {
    return {
      deleting: false,
      projectList: JSON.parse(localStorage.getItem('projectList'))
    }
  },
  methods: {
    choose (project) {
      // console.log(name)
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
      // console.log(store.state.project)
      // console.log(store.state.projectList)
    },
    clear () {
      store.state.project = {}
      store.state.projectName = null
      this.deleting = false
      // console.log(store.state.project)
      // console.log(store.state.projectList)
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
      if (store.state.project === null) {
        return ' '
      } else {
        return store.state.project.subjectName
      }
    },
    subjectCode () {
      if (store.state.project === null) {
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
    // projectList () {
    //   return store.state.projectList
    // }
    // project () {
    //   return store.project
    // }
  },
  created () {
    // console.log(store.state.project)
    // console.log(store.state.projectList)
    // if (store.state.projectList.length === 0) {
    //   // eslint-disable-next-line no-eval
    //   store.state.projectList = JSON.parse(localStorage.getItem('projectList'))
    // }
    store.state.projectList = this.projectList
    if (store.state.projectList.length > 0) {
      store.state.project = store.state.projectList[0]
      store.state.projectName = store.state.project.projectName
    } else {
      store.state.project = null
      store.state.projectName = null
    }
    // console.log(store.state.project)
    // console.log(store.state.projectList)
    // console.log(this.projectList)
  }

}
</script>

<style scoped>

</style>
