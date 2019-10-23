<template>
  <b-container fluid>
    <b-row><b-col  cols="8" offset="2"><h1>About</h1><hr></b-col></b-row>
    <b-row>
      <b-col>
        <b-form>
          <b-row>
            <b-col  cols="8" offset="2">
              <b-form-group id="ProjectName" label="Project Name:" label-for="projectname-input">
                <b-form-input id="projectname-input" type="text" required
                              placeholder="Enter Project Name" v-model="projectName"></b-form-input>
              </b-form-group>
              <b-form-group id="SubjectName" label="Subject Name:" label-for="subjectname-input">
                <b-form-input id="subjectname-input" type="text" required
                              placeholder="Enter Subject Name" v-model="subjectName"></b-form-input>
              </b-form-group>
              <b-form-group id="SubjectCode" label="Subject Code:" label-for="subjectcode-input">
                <b-form-input id="subjectcode-input" type="text" required
                              placeholder="Enter Subject Code" v-model="subjectCode"></b-form-input>
              </b-form-group>
              <b-form-group id="Duration" label="Duration:" label-for="duration-input">
                <b-form-input id="duration-input" type="number" required
                              placeholder="Enter Duration In Minutes" v-model="durationMin"></b-form-input>
              </b-form-group>
              <b-form-group id="Warning" label="Warning:" label-for="warning-input">
                <b-form-input id="warning-input" type="number" required
                              placeholder="Enter Warning In Minutes" v-model="warningMin"></b-form-input>
              </b-form-group>
              <b-form-group id="ProjectDescription" label="Project Description:"
                            label-for="projectdescription-input">
                <b-form-input id="projectdescription-input" type="text"
                              placeholder="Enter Project Description" v-model="description"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-form>
      </b-col>
    </b-row>
    <b-row align-h="center">
      <b-col cols="3">
        <b-row align-h="center">
          <b-button variant="primary" to="/AssessmentPreparation/Menu">Back</b-button>
        </b-row>
      </b-col>
      <b-col cols="3">
        <b-row align-h="center">
          <b-button variant="primary" @click="save">Next</b-button>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import {store} from '@/store'
import {assessmentAbout, assessmentTime} from '@/api'

export default {
  name: 'AssessmentPreparationAbout',
  data () {
    return {
      projectName: ' ',
      subjectName: ' ',
      subjectCode: ' ',
      description: ' ',
      durationMin: 0,
      durationSec: 0,
      warningMin: 0,
      warningSec: 0
    }
  },
  methods: {
    save () {
      var param = {
        token: localStorage.getItem('token'),
        projectName: this.projectName,
        subjectName: this.subjectName,
        subjectCode: this.subjectCode,
        description: this.description
      }
      assessmentAbout(param).then(response => {
        console.log(response)
        if (response.updateProject_ACK) {
          this.savetime()
        }
      })
    },
    savetime () {
      assessmentTime({
        token: localStorage.getItem('token'),
        projectName: this.projectName,
        durationMin: this.durationMin,
        durationSec: this.durationSec,
        warningMin: this.warningMin,
        warningSec: this.warningSec
      })
        .then(res => {
          console.log(res)
          if (res.updateProject_ACK) {
            console.log('success')
            store.state.project.projectName = this.projectName
            store.state.project.subjectName = this.subjectName
            store.state.project.subjectCode = this.subjectCode
            store.state.project.description = this.description
            store.state.project.durationMin = this.durationMin
            store.state.project.durationSec = this.durationSec
            store.state.project.warningMin = this.warningMin
            store.state.project.warningSec = this.warningSec
            store.state.projectName = this.projectName
            if (store.state.project.hasOwnProperty('criteria') !== true) {
              store.state.project.criteria = []
            }
            console.log(store.state.project)
            var hasProject = false
            store.state.projectList.forEach(p => {
              if (p.projectName === store.state.projectName) {
                hasProject = true
                p = store.state.project
              }
            })
            if (hasProject === false) {
              store.state.projectList.push(store.state.project)
            }
            localStorage.setItem('projectList', JSON.stringify(store.state.projectList))
          }
        })
      this.$router.push('/AssessmentPreparation/Criteria')
    }
  },
  created () {
    if (store.state.project !== null) {
      this.projectName = store.state.project.projectName
      this.subjectName = store.state.project.subjectName
      this.subjectCode = store.state.project.subjectCode
      this.description = store.state.project.description
      this.durationMin = store.state.project.durationMin
      this.durationSec = store.state.project.durationSec
      this.warningMin = store.state.project.warningMin
      this.warningSec = store.state.project.warningSec
    }
  }
}
</script>

<style scoped>

</style>
