<template>
  <b-container fluid>
      <b-row>
        <b-col cols="3">
          <b-button variant=primary to="/RealTimeAssessment/Menu">Back to RA</b-button>
          <b-button variant=primary to="/ReviewAndReport/Menu">Back to R&R</b-button>
        </b-col>
        <b-col cols="6">
        </b-col>
        <b-col cols="3">
          <b-button to="/RealTimeAssessment/Marking">Edit</b-button>
          <b-button variant="success" @click="sendReport(1)">Send Report</b-button>
          <!-- <b-button @click="sendReport(2)">SEND TO ME</b-button> -->
        </b-col>
      </b-row>
      <b-row><br/></b-row>
      <b-row align-h="center">
        <b-col cols="4">
          <b-row align-h="center">
            <h4>Mark: {{totalMark}}%</h4>
          </b-row>
        </b-col>
        <b-col cols="4">
          <b-row align-h="start">
            <h4>Marker: {{lecturerName}}</h4>
          </b-row>
        </b-col>
        <!-- <b-col cols="1">
        </b-col> -->
      </b-row>
      <hr>
      <b-row>
        <b-col>
          <b-row>
            <b-col>
              <h6>Student Name: {{fullname(student)}}</h6>
              <h6>Student ID: {{student.number}}</h6>
              <h6>Student Email: {{student.email}}</h6>
              <br>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h6>Subject Name: {{project.subjectName}}</h6>
              <h6>Subject Code: {{project.subjectCode}}</h6>
              <br/>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h6>Project Name: {{project.projectName}}</h6>
              <h6>Assessor: {{project.assistant[0]}}</h6>
              <br/>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <h6>Marking Details:</h6>
            </b-col>
          </b-row>
          <b-row v-for="criterion in markedCriteria" v-bind:key="criterion.name">
            <b-col>
              <h6>{{criterion.name}} - {{markList[markedCriteria.indexOf(criterion)]}}/{{criterion.maximunMark}}</h6>
              <h6>Comments:</h6>
              <div v-for="subsection in criterion.subsectionList" v-bind:key="subsection.name">
                <p>{{subsection.name}}:</p>
                <p><i>{{subsection.shortTextList[0].name}} - {{subsection.shortTextList[0].longtext[0]}}</i></p>
                <br/>
              </div>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
  </b-container>
</template>

<script>
import {store} from '@/store'
import {sendEmail} from '@/api'
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
    console.log(this.student)
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
      let fullName = ''
      if (student.firstName !== '') {
        if (student.middleName === '' | student.middleName === 'null') {
          fullName = student.firstName + ' ' + student.surname
        } else {
          fullName = student.firstName + ' ' + student.middleName + ' ' + student.surname
        }
      }
      return fullName
    },
    sendReport (sendBoth) {
      var param = {
        token: localStorage.token,
        projectName: store.state.project.projectName,
        studentID: store.state.student.number,
        sendBoth: sendBoth
      }
      console.log(param)
      sendEmail(param).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
