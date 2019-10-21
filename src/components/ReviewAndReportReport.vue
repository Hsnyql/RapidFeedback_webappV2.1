<template>
  <b-container fluid>
    <b-col>
      <b-row>
        <b-col cols="3">
          <b-row align-h="center">
            <h3>Mark: {{totalPercentage()}}%</h3>
          </b-row>
        </b-col>
        <b-col cols="6">
          <b-row align-h="center">
            <h3>Marker: {{lecturerName}}</h3>
          </b-row>
        </b-col>
        <b-col cols="3">
          <b-row>
            <b-button>Eidt</b-button>
            <b-button>Send Report</b-button>
          </b-row>
        </b-col>
      </b-row>
      <hr>
      <b-row>
        <b-col>
          <b-row>
            <b-col>
              <h4>Student Name: {{fullname(student)}}</h4>
              <h5>Student ID: {{student.number}}</h5>
              <h5>Student Email: {{student.email}}</h5>
              <br>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h4>Subject Name: {{project.subjectName}}</h4>
              <h4>Subject Code: {{project.subjectCode}}</h4>
              <br>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h4>Project Name: {{project.projectName}}</h4>
              <h4>Assessor Name: {{project.assistant}}</h4>
              <br>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h4>Marking Details:</h4>
            </b-col>
          </b-row>
          <b-row v-for="criterion in markedCriteria" v-bind:key="criterion.name">
            <b-col>
              <h5>{{criterion.name}} - {{markList[markedCriteria.indexOf(criterion)]}}/{{criterion.maximunMark}}</h5>
              <p>Comments:</p>
              <div v-for="subsection in criterion.subsectionList" v-bind:key="subsection.name">
                <p>{{subsection.name}}:</p>
                <p>{{subsection.shortTextList[0].name}} - {{subsection.shortTextList[0].longtext[0]}}</p>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-col>
  </b-container>
</template>

<script>
import {store} from '@/store'
export default {
  name: 'ReviewAndReportReport',
  data () {
    return {
      // lecturerName: 'Lecturer1',
      // lecturerEmail: 'Lecturer1@email.com',
      // totalMark: 100,
      // criteriaList: [],
      // markList: [20, 15, 18, 10, 8],
      // commentList: ['comment1', 'comment2', 'comment3', 'comment4', 'comment5'],
      // markedCriteria: [],
      // project: {
      //   assessor: 'Assessor1',
      //   description: 'Project Description',
      //   projectName: 'Project1',
      //   subjectCode: 'SUBJ900001',
      //   subjectName: 'Subject1',
      //   students: [{
      //     firstName: 'Student1',
      //     middleName: 'MiddleName1',
      //     lastName: 'LastName1',
      //     number: 1,
      //     email: 'student1@email.com',
      //     group: 0
      //   }]
      // }
      lecturerName: '',
      lecturerEmail: '',
      totalMark: store.state.markList[0].totalMark,
      criteriaList: [],
      markList: [],
      commentList: [],
      markedCriteria: [],
      student: store.state.student,
      project: store.state.project
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
    },
    fullname (student) {
      let fullname = ''
      if (student.middleName) {
        fullname = student.firstName + ' ' + student.middleName + ' ' + student.surname
      } else {
        fullname = student.firstName + ' ' + student.surname
      }
      return fullname
    }
  }
}
</script>

<style scoped>

</style>
