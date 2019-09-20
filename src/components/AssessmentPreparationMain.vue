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
                        <p>{{description}}</p>
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
                        <p v-bind:to="markerPath">Click the subtitle to manage markers</p>
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
import {store} from '@/store.js'

export default {
  name: 'AssessmentPreparationMain',
  data () {
    return {
      // eslint-disable-next-line no-eval
      projectList: eval(store.projectList),
      description: '',
      markerPath: ''
    }
  },
  methods: {
    choose (name) {
      this.projectList.forEach(project => {
        if (project.projectName === name) {
          this.description = project.description
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
