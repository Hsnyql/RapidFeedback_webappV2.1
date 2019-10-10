<template>
    <b-container fluid>
        <b-row>
            <b-col cols="2">
                <b-row>
                    <b-col>
                        <b-nav vertical>
                            <b-nav-item to="/AssessmentPreparation/About" @click="clear">Add Assessment</b-nav-item>
                        </b-nav>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
                        <b-list-group>
                            <!-- <b-list-group-item>Project 1</b-list-group-item>
                            <b-list-group-item>Project 2</b-list-group-item> -->
                            <b-list-group-item v-for="item in projectList" v-bind:key="item.projectName" @click="choose(item.id)">
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
                    <b-col>
                        <h5>About</h5>
                        <hr>
                        <p>Project Details</p>
                        <p>Subject Name: {{project.subjectName}}</p>
                        <p>Subject Code: {{project.subjectCode}}</p>
                        <p>description: {{project.description}}</p>
                    </b-col>
                </b-row>
                <b-row>
                    <b-col>
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
                    <b-col>
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

export default {
  name: 'AssessmentPreparationMain',
  data () {
    return {
      // eslint-disable-next-line no-eval
      projectList: eval(localStorage.getItem('projectList')),
      // projectList: localStorage.getItem('projectList')
      clicked: false
    }
  },
  methods: {
    choose (id) {
      // console.log(name)
      this.clicked = true
      store.projectId = id
      // console.log('store ' + store.projectName)
      this.projectList.forEach(item => {
        if (item.projectId === id) {
          store.project = item
        }
      })
      console.log('choose: ', id)
      console.log('store.projectid: ', store.projectId)
      // console.log(store.project)
    },
    clear () {
      store.projectId = 0
      store.project = null
      console.log(store.project)
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
    project () {
      if (store.project === null) {
        return ' '
      } else {
        return store.project
      }
    }
  },
  created: function () {
    console.log(localStorage.getItem('projectList'))
    if (store.project === null) {
      if (localStorage.getItem('projectList') != null) {
      // eslint-disable-next-line no-eval
        store.project = eval(localStorage.projectList)[0]
      } else {
        store.project = null
      }
    }
    console.log(store.project)
  }

}
</script>

<style scoped>

</style>
