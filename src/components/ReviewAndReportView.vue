<template>
  <b-container fluid>
    <b-row>
      <b-list-group horizontal>
        <b-list-group-item>
          <b-row align-h="center"><h4>{{totalPercentage()}}%</h4></b-row>
          <hr>
          <b-row align-h="center"><h5>{{lecturerName}}</h5></b-row>
          <b-row v-for="criterion in markedCriteria" v-bind:key="criterion.name">
            <b-col>
              <b-row align-h="center"><p>{{criterion.name}}</p></b-row>
              <b-row align-h="center"><p>{{criterion.mark}}/{{criterion.maximumMark}}</p></b-row>
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
export default {
  name: 'ReviewAndReportView',
  data () {
    return {
      lecturerName: 'Lecturer1',
      lecturerEmail: 'Lecturer1@email.com',
      totalMark: 100,
      criteriaList: [],
      markList: [20, 15, 18, 10, 8],
      commentList: ['comment1', 'comment2', 'comment3', 'comment4', 'comment5'],
      markedCriteria: []
    }
  },
  created () {
    this.populate()
    this.integrate()
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
