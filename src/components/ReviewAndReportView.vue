<template>
  <b-container fluid>
    <b-row>
      <b-col cols="3">
        <b-button variant=primary to="/RealTimeAssessment/Menu">Back to RA</b-button>
        <b-button variant=primary to="/ReviewAndReport/Menu">Back to R&R</b-button>
      </b-col>
      <b-col cols="7"></b-col>
      <b-col cols="2">
        <b-button variant=success @click="view">Refresh</b-button>
      </b-col>
    </b-row>
    <b-row> <br/> </b-row>
    <b-row>
      <b-list-group horizontal>
        <b-list-group-item>
          <b-row align-h="center"><h4>{{totalMark}}%</h4></b-row>
          <hr>
          <b-row align-h="center"><h5>{{lecturerName}}</h5></b-row>
          <b-row v-for="criterion in markedCriteria" v-bind:key="criterion.name">
            <b-col>
              <b-row align-h="center"><p>{{criterion.name}}</p></b-row>
              <b-row align-h="center"><p>{{markList[markedCriteria.indexOf(criterion)]}}/{{criterion.maximunMark}}</p></b-row>
            </b-col>
          </b-row>
          <b-row align-h="center">
            <b-button to="/ReviewAndReport/Report">View Report</b-button>
          </b-row>
        </b-list-group-item>
      </b-list-group>
    </b-row>
  </b-container>
</template>

<script>
import {store} from '@/store'
import {getMark} from '@/api'
export default {
  name: 'ReviewAndReportView',
  data () {
    return {
      lecturerName: store.state.markList[0].lecturerName,
      lecturerEmail: store.state.markList[0].lecturerEmail,
      totalMark: store.state.markList[0].totalMark,
      criteriaList: store.state.markList[0].commentList,
      markList: store.state.markList[0].markList,
      commentList: store.state.markList[0].commentList,
      markedCriteria: store.state.markList[0].criteriaList
    }
  },
  created () {
    // this.populate()
    // this.integrate()
    // this.lecturerName = store.state.markList[0].lecturerName
    // this.lecturerEmail = store.state.markList[0].lecturerEmail
    // this.criteriaList = store.state.markList[0].commentList
    // this.markList = store.state.markList[0].markList
    // this.commentList = store.state.markList[0].commentList
    // this.markedCriteria = store.state.markList[0].criteriaList
    console.log(store.state.markList)
    this.view()
    this.$forceUpdate()
  },
  methods: {
    populate () {
      for (let i = 0; i < 5; i++) {
        let criterion = {
          maximumMark: 20,
          name: 'criterion' + (i + 1).toString(),
          subsectionList: [{
            name: 'subsection' + (i + 1).toString(),
            shortTextList: [{
              grade: 3,
              name: 'shortText' + (i + 1).toString(),
              longText: [('longText' + (i + 1).toString())]
            }]
          }]
        }
        this.criteriaList.push(criterion)
      }
    },
    integrate () {
      for (let i = 0; i < this.criteriaList.length; i++) {
        let markedCriterion = {
          maximumMark: this.criteriaList[i].maximumMark,
          name: this.criteriaList[i].name,
          subsectionList: this.criteriaList[i].subsectionList,
          mark: this.markList[i]
        }
        this.markedCriteria.push(markedCriterion)
      }
    },
    totalPercentage () {
      let totalMax = this.totalMark
      let totalMarked = 0
      for (let i = 0; i < this.markedCriteria.length; i++) {
        totalMarked = totalMarked + this.markedCriteria[i].mark
      }
      let percentage = 0.00
      percentage = totalMarked / totalMax
      percentage = (percentage * 100).toFixed(2)
      return percentage
    },
    view () {
      // store.state.student = student
      // store.state.project = this.selectedProject
      var param = {
        token: localStorage.token,
        projectName: store.state.project.projectName,
        studentNumberList: [store.state.student.number],
        primaryEmail: localStorage.email
      }
      getMark(param).then(res => {
        console.log(res)
        if (res.getMark_ACK) {
          store.state.markList = JSON.parse(res.markList)
          console.log(store.state.markList)
          this.totalMark = store.state.markList[0].totalMark
          this.lecturerName = store.state.markList[0].lecturerName
          this.lecturerEmail = store.state.markList[0].lecturerEmail
          this.criteriaList = store.state.markList[0].commentList
          this.markList = store.state.markList[0].markList
          this.commentList = store.state.markList[0].commentList
          this.markedCriteria = store.state.markList[0].criteriaList
          this.$forceUpdate()
          // this.$router.push('/ReviewAndReport/View')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
