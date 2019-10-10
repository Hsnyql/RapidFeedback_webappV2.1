<template>
    <b-container fluid>
        <b-row>
            <b-col cols="2">
                <b-row>
                    <b-col>
                        <b-nav vertical>
                            <b-nav-item to="/AssessmentPreparation/About">Add Assessment</b-nav-item>
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
      projectList: eval(localStorage.getItem('projectList'))
    }
  },
  methods: {
    choose (name) {
      // console.log(name)
      store.projectName = name
      // console.log('store ' + store.projectName)
      this.projectList.forEach(item => {
        if (item.projectName === name) {
          store.project = item
        }
      })
      // console.log(store.project)
    }
  },
  computed: {
    subjectName () {
      return store.project.subjectName
    },
    subjectCode () {
      return store.project.subjectCode
    },
    description () {
      return store.project.description
    },
    project () {
      return store.project
    }
  },
  created: function () {
    if (store.project === null) {
      if (localStorage.getItem('projectList') != null) {
      // eslint-disable-next-line no-eval
        store.project = eval(localStorage.projectList)[0]
        store.projectName = store.project.projectName
      } else {
        store.project = null
      }
    }
  }
}
</script>

<style scoped>

</style>
