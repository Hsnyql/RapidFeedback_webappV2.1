<template>
    <b-container fluid>
        <b-row><b-col><h1>About</h1><hr></b-col></b-row>
        <b-row>
            <b-col>
                <b-form>
                    <b-row>
                        <b-col cols="9">
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
                                              placeholder="Enter Duration" v-model="durationMin"></b-form-input>
                            </b-form-group>
                            <b-form-group id="Warning" label="Warning:" label-for="warning-input">
                                <b-form-input id="warning-input" type="number" required
                                              placeholder="Enter Warning" v-model="warningMin"></b-form-input>
                            </b-form-group>
                            <b-form-group id="ProjectDescription" label="Project Description:"
                                          label-for="projectdescription-input">
                                <b-form-input id="projectdescription-input" type="text"
                                              placeholder="Enter Project Description" v-model="description"></b-form-input>
                            </b-form-group>
                        </b-col>
                        <b-col>
                            <b-row align-h="center">
                                <b-col cols="4">
                                    <b-button variant="primary" to="/AssessmentPreparation/Menu" @click="save">Save</b-button>
                                </b-col>
                                <b-col cols="4">
                                    <b-button variant="primary" to="/AssessmentPreparation/Criteria" @click="save">Next</b-button>
                                </b-col>
                                <b-col></b-col>
                            </b-row>
                        </b-col>
                    </b-row>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {store} from '@/store'
import {assessmentAbout, assessmentTime} from '@/api'

export default {
  name: 'AssessmentPreparationAbout',
  data () {
    return {
      projectName: store.project.projectName,
      subjectName: store.project.subjectName,
      subjectCode: store.project.subjectCode,
      description: store.project.description,
      durationMin: store.project.durationMin,
      durationSec: store.project.durationSec,
      warningMin: store.project.warningMin,
      warningSec: store.project.warningSec
    }
  },
  methods: {
    save () {
      store.project.projectName = this.projectName
      store.project.subjectName = this.subjectName
      store.project.subjectCode = this.subjectCode
      store.project.description = this.description
      store.project.durationMin = this.durationMin
      store.project.durationSec = this.durationSec
      store.project.warningMin = this.warningMin
      store.project.warningSec = this.warningSec
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
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
