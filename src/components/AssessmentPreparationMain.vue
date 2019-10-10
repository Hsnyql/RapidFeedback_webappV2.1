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
                        <b-list-group>
                            <!-- <b-list-group-item>Project 1</b-list-group-item>
                            <b-list-group-item>Project 2</b-list-group-item> -->
                            <b-list-group-item v-for="item in projectList" v-bind:key="item.projectName" @click="choose(item.projectName)">
                            <!-- <b-list-group-item v-for="item in test" :key="item"> -->
                              {{ item.projectName }}
                            </b-list-group-item>
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
      deleting: false
    }
  },
  methods: {
    choose (name) {
      // console.log(name)
      if (this.deleting) {
        this.deletePro(name)
      } else {
        store.projectName = name
        // console.log('store ' + store.projectName)
        this.projectList.forEach(item => {
          if (item.projectName === name) {
            store.project = item
          }
        })
      }
      console.log(store.project)
      console.log(store.projectList)
    },
    clear () {
      store.project = null
      store.projectName = null
      this.deleting = false
      console.log(store.project)
      console.log(store.projectList)
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
          if (store.project === temp) {
            store.project = null
          }
          let i = store.projectList.indexOf(temp)
          store.projectList.splice(i, 1)
          localStorage.setItem('projectList', JSON.stringify(store.projectList))
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
      if (store.project === null) {
        return ' '
      } else {
        return store.project.subjectName
      }
    },
    subjectCode () {
      if (store.project === null) {
        return ' '
      } else {
        return store.project.subjectCode
      }
    },
    description () {
      if (store.project === null) {
        return ' '
      } else {
        return store.project.description
      }
    },
    projectList () {
      return store.projectList
    }
    // project () {
    //   return store.project
    // }
  },
  created: function () {
    console.log(store.project)
    console.log(store.projectList)
    // eslint-disable-next-line no-eval
    store.projectList = eval(localStorage.projectList)
    if (store.projectList.length > 0) {
      store.project = store.projectList[0]
      store.projectName = store.project.projectName
    } else {
      store.project = null
      store.projectName = null
    }
    console.log(store.project)
    console.log(store.projectList)
  }
}
</script>

<style scoped>

</style>
