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
import {assessmentAbout} from '@/api'

export default {
  name: 'AssessmentPreparationAbout',
  data () {
    return {
      projectName: '',
      subjectName: '',
      subjectCode: '',
      description: '',
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
        console.log(response.data)
        if (response.data.pdateProject_ACK) {
          this.savetime()
        }
      })
    },
    savetime () {
      this.axios.post('/api/UpdateProject_Time_Servlet', {
        token: localStorage.getItem('token'),
        projectName: this.projectName,
        durationMin: this.durationMin,
        durationSec: this.durationSec,
        warningMin: this.warningMin,
        warningSec: this.warningSec
      })
        .then(response => {
          console.log(response.data)
          if (response.data.updateProject_AC) {
            console.log('success')
          }
        })
    }
  }
}
</script>

<style scoped>

</style>
