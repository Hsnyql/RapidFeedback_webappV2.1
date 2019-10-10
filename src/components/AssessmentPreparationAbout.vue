<template>
    <b-container fluid>
        <b-row><b-col cols="8" offset="2"><h1>Add a New Project</h1><hr></b-col></b-row>
        <b-row>
            <b-col>
                <b-form>
                    <b-row>
                        <b-col cols="8" offset="2">
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
                            <!-- TODO: time duration in mins and secs -->
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
                    </b-row>
                            <b-row align-h="center">
                                <b-col cols="3">
                                    <b-button variant="primary" to="/AssessmentPreparation/Menu" @click="save">Save</b-button>
                                </b-col>
                                <b-col cols="3">
                                    <b-button variant="primary" to="/AssessmentPreparation/Criteria" @click="save">Next</b-button>
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
        description: this.description,
        durationSec: this.durationSec + 60 * this.durationMin,
        warningSec: this.warningSec + 60 * this.warningMin,
        id: store.projectId,
        principalId: this.principalId
      }
      assessmentAbout(param).then(res => {
        console.log(res)
        if (res.updateProject_ACK) {
          console.log('succeed')
          this.$router.push('/AssessmentPreparation/Criteria')
        }
      })
    }
  },
  computed: {
    // TODO: check if normal marker could edit project
    principalId () {
      if (store.project === null) {
        return localStorage.getItem('id')
      } else {
        return store.project.principalId
      }
    }
  }
}
</script>

<style scoped>

</style>
