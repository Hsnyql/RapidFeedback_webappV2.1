<template>
  <b-container fluid>
    <b-col>
      <b-row><br></b-row>
      <b-row><br></b-row>
      <b-row align-h="center">
        <b-col cols="6">
          <b-row align-h="center">
            <b-button block pill size="lg" variant="primary" @click="jumpTo('/AssessmentPreparation/Menu')">Assessment Preparation</b-button>
          </b-row>
          <b-row><br></b-row>
          <b-row align-h="center">
            <b-button block pill size="lg" variant="primary" @click="jumpTo('/RealTimeAssessment/Menu')">Real-Time Assessment</b-button>
          </b-row>
          <b-row><br></b-row>
          <b-row align-h="center">
            <b-button block pill size="lg" variant="primary" @click="jumpTo('/ReviewAndReport/Menu')">Review and Report</b-button>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
  </b-container>
</template>

<script>
import {store} from '@/store'
import {syncProject} from '@/api'
export default {
  name: 'MainMenu',
  data () {
    return {
    }
  },
  created () {
    console.log('Main Menu Loaded')
    var param = {
      token: localStorage.token,
      username: localStorage.email
    }
    syncProject(param).then(res => {
      console.log(res)
      if (res.sync_ACK) {
        localStorage.setItem('projectList', res.projectList)
        store.state.projectList = JSON.parse(res.projectList)
      }
    })
  },
  methods: {
    jumpTo (route) {
      this.$router.push(route)
    }
  }
}

</script>

<style scoped>
.part {
  background: #094183;
  color: white;
  height: 300px
}
</style>
