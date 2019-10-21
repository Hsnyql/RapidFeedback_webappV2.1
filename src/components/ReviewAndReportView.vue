<template>
  <b-container fluid>
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
export default {
  name: 'ReviewAndReportView',
  data () {
    return {
      lecturerName: '',
      lecturerEmail: '',
      totalMark: store.state.markList[0].totalMark,
      criteriaList: [],
      markList: [],
      commentList: [],
      markedCriteria: []
    }
  },
  created () {
    // this.populate()
    // this.integrate()
    this.lecturerName = store.state.markList[0].lecturerName
    this.lecturerEmail = store.state.markList[0].lecturerEmail
    this.criteriaList = store.state.markList[0].commentList
    this.markList = store.state.markList[0].markList
    this.commentList = store.state.markList[0].commentList
    this.markedCriteria = store.state.markList[0].criteriaList
    console.log(store.state.markList)
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
    }
  }
}
</script>

<style scoped>

</style>
