<template>
  <b-container fluid>
      <b-row>
        <b-col cols="5"><h3>Student Management</h3></b-col>
        <b-col cols="3">
          <b-button variant="primary" @click="group">Group</b-button>
          <b-button variant="primary" @click="ungroup">UnGroup</b-button>
        </b-col>
        <b-col cols="4">
          <b-button variant="primary">Upload</b-button>
          <b-button v-b-modal.addStudent variant="primary">Add</b-button>
          <b-modal id="addStudent"
                 ref="modal"
                 title="Add a New Student"
                 @show="resetModal"
                 @hidden="resetModal"
                 @ok="recordNewStudent">
            <form ref="form" @submit.stop.prevent="addNewStudent">
              <b-form-group :state="inputState"
                          label="Student Number:"
                          label-for="studentNumber-input"
                          invalid-feedback="Student nimber is Required">
                <b-form-input id="studentNumber-input"
                            v-model="newNumber"
                            :state="inputState"
                            required></b-form-input>
              </b-form-group>
              <b-form-group :state="inputState"
                          label="First Name:"
                          label-for="firstName-input"
                          invalid-feedback="First Name is Required">
                <b-form-input id="firstName-input"
                            v-model="newFirstName"
                            :state="inputState"
                            required></b-form-input>
              </b-form-group>
              <b-form-group :state="inputState"
                          label="Middle Name (optional):"
                          label-for="middleName-input">
                <b-form-input id="middleName-input"
                            v-model="newMiddleName"
                            :state="inputState"></b-form-input>
              </b-form-group>
              <b-form-group :state="inputState"
                          label="Last Name:"
                          label-for="lastName-input"
                          invalid-feedback="Last Name is Required">
                <b-form-input id="lastName-input"
                            v-model="newLastName"
                            :state="inputState"
                            required></b-form-input>
              </b-form-group>
              <b-form-group :state="inputState"
                          label="Email:"
                          label-for="email-input"
                          invalid-feedback="Email is Required">
                <b-form-input id="email-input"
                            v-model="newEmail"
                            :state="inputState"
                            required></b-form-input>
              </b-form-group>
            </form>
          </b-modal>
          <b-button variant="primary" @click="editStudent">Edit</b-button>
          <b-modal id="editStudent"
                 ref="modal"
                 title="Edit a Student"
                 @show="loadSelection"
                 @hidden="resetModal"
                 @ok="editStudentInfo">
            <form ref="form" @submit.stop.prevent="changeStudentInfo">
              <b-form-group :state="inputState"
                          label="First Name:"
                          label-for="firstName-input"
                          invalid-feedback="First Name is Required">
                <b-form-input id="firstName-input"
                            v-model="newFirstName"
                            :state="inputState"
                            required></b-form-input>
              </b-form-group>
              <b-form-group :state="inputState"
                          label="Middle Name (optional):"
                          label-for="middleName-input">
                <b-form-input id="middleName-input"
                            v-model="newMiddleName"
                            :state="inputState"></b-form-input>
              </b-form-group>
              <b-form-group :state="inputState"
                          label="Last Name:"
                          label-for="lastName-input"
                          invalid-feedback="Last Name is Required">
                <b-form-input id="lastName-input"
                            v-model="newLastName"
                            :state="inputState"
                            required></b-form-input>
              </b-form-group>
              <b-form-group :state="inputState"
                          label="Email:"
                          label-for="email-input"
                          invalid-feedback="Email is Required">
                <b-form-input id="email-input"
                            v-model="newEmail"
                            :state="inputState"
                            required></b-form-input>
              </b-form-group>
            </form>
          </b-modal>
          <b-button  variant="primary" @click="remove">Remove</b-button>
          <b-modal id="removeStudent"
                 ref="modal"
                 title="Rapid Feedback"
                 @ok="removeStudent">
            <b-row><p>Please confirm to remove the following students from this project:</p></b-row>
            <b-row v-for="student in selectedStudents" :key="student.number">
              <p>{{fullName(student)}}</p>
            </b-row>
          </b-modal>
        </b-col>
      </b-row>
      <b-row>
        <b-col><hr>
          <b-row v-if="addedStudents.length===0"><p>Please add students!</p></b-row>
          <b-row>
            <b-col cols="1"><h5 v-if="addedStudents.length!==0"> Selection</h5></b-col>
            <b-col cols="1"><h5 v-if="addedStudents.length!==0">Group</h5></b-col>
            <b-col cols="2"><h5 v-if="addedStudents.length!==0">Student Number</h5></b-col>
            <b-col cols="4"><h5 v-if="addedStudents.length!==0">Student Name</h5></b-col>
            <b-col cols="4"><h5 v-if="addedStudents.length!==0">Student Email</h5></b-col>
          </b-row>
          <b-row v-for="student in addedStudents" v-bind:key="student.number">
            <b-col cols="1"><b-form-checkbox
                  v-model="selectedStudents"
                  :value="student"></b-form-checkbox></b-col>
            <b-col cols="1"><p>{{showGroup(student)}}</p></b-col>
            <b-col cols="2"><p>{{student.number}}</p></b-col>
            <b-col cols="4"><p>{{fullName(student)}}</p></b-col>
            <b-col cols="4"><p>{{student.email}}</p></b-col>
          </b-row>
          <hr></b-col>
      </b-row>
    <b-row>
      <b-col>
        <b-button @click="populate">Populate</b-button>
        <b-row><p>Testing:</p></b-row>
        <b-row><p>Selected:</p></b-row>
        <b-row><p>{{selectedStudents}}</p></b-row>
        <b-row v-for="student in selectedStudents" v-bind:key = student.id>
          <p>[ID: {{student.number}},
            firstName: {{student.firstName}},
            middleName: {{student.middleName}},
            lastName: {{student.surname}},
            email: {{student.email}}]</p>
        </b-row>
      </b-col>
    </b-row>
    <b-row align-h="between">
      <b-col cols="2"></b-col>
      <b-col cols="4">
        <b-button variant="primary" to="/AssessmentPreparation/Grading">Back</b-button>
      </b-col>
      <b-col cols="4">
        <b-button variant="primary">Save</b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {store} from '@/store'
import XLSX from 'xlsx'
// eslint-disable-next-line no-unused-vars
import {addStudent, groupStudent, importStudent, deleteStudent} from '@/api'

export default {
  name: 'AssessmentPreparationStudent',
  data () {
    return {
      newFirstName: '',
      newMiddleName: '',
      newLastName: '',
      newNumber: '',
      newEmail: '',
      inputState: null,
      selectedStudents: [],
      addedStudents: [
        // {number: 1, firstName: 'firstName1', middleName: '', surname: 'lastName1', email: 'student1@email.com', group: 0},
        // {number: 2, firstName: 'firstName2', middleName: 'middleName2', surname: 'lastName2', email: 'student2@email.com', group: 0},
        // {number: 3, firstName: 'firstName3', middleName: 'middleName3', surname: 'lastName3', email: 'student3@email.com', group: 0},
        // {number: 4, firstName: 'firstName4', middleName: '', surname: 'surname4', email: 'student4@email.com', group: 0}
      ]
    }
  },
  computed: {
  },
  methods: {
    populate () {
      this.addedStudents = []
      for (let i = 0; i < 10; i++) {
        let newStudent = {number: i + 1,
          firstName: 'firstName' + (i + 1).toString(),
          middleName: 'middleName' + (i + 1).toString(),
          surname: 'lastName' + (i + 1).toString(),
          email: 'firstName' + (i + 1).toString() + '@email.com',
          group: 0}
        this.addedStudents.push(newStudent)
      }
    },
    // clearFiles () {
    //   this.$refs['file-input'].reset()
    // },
    // TODO: this is not a todo, this method is suitable for uploading criteria
    readExcel () {
      const fileReader = new FileReader()
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary'
          })
          const wsname = workbook.SheetNames[0]// 取第一张表
          const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname])// 生成json表格内容
          console.log(ws)
          // var param = {
          //   token: localStorage.getItem('token'),
          //   projectId: store.projectId,
          //   studentList: ws
          // }
          // importStudent(param).then(res => {
          //   console.log(res)
          //   if (res.updateStudent_ACK) {
          //     console.log('succeed')
          //     // TODO: page after adding student
          //     this.$router.push('/')
          //   } else {

          //   }
          // })
          this.addedStudents = this.addedStudents.concat(ws)
          this.list = ws
        } catch (e) {
          return false
        }
      }
      fileReader.readAsBinaryString(this.file)
    },
    addSingle () {
      var param = {
        token: localStorage.token,
        projectName: store.state.projectName,
        studentID: this.newNumber,
        firstName: this.newFirstName,
        middleName: this.newMiddleName,
        lastName: this.newLastName,
        email: this.newEmail
      }
      console.log(store.state.projectName)
      addStudent(param).then(res => {
        console.log(res)
        return res.updateStudent_ACK
      })
    },
    group () {
      if (this.selectedStudents.length < 2) {
        console.log('Select at least TWO student!')
      } else {
        let group = 1
        let usedNum = []
        for (let i = 0; i < this.addedStudents.length; i++) {
          if (this.addedStudents[i].group !== 0) {
            if (usedNum.length === 0) {
              usedNum.push(this.addedStudents[i].group)
            } else {
              let check = usedNum.indexOf(this.addedStudents[i].group)
              if (check === -1) {
                usedNum.push(this.addedStudents[i].group)
              }
            }
          }
        }
        while (usedNum.indexOf(group) !== -1) {
          group++
        }
        for (let i = 0; i < this.selectedStudents.length; i++) {
          let index = this.addedStudents.indexOf(this.selectedStudents[i])
          this.addedStudents[index].group = group
        }
      }
      // var param = {
      //
      // }
      // groupStudent(param).then(res => {
      //   console.log(res)
      // })
    },
    ungroup () {
      if (this.selectedStudents.length < 2) {
        console.log('Select at least TWO student!')
      } else {
        let group = this.selectedStudents[0].group
        for (let i = 1; i < this.selectedStudents.length; i++) {
          if (group !== this.selectedStudents[i].group) {
            console.log('Select only students in the same group!')
            return
          }
        }
        for (let i = 0; i < this.selectedStudents.length; i++) {
          this.selectedStudents[i].group = 0
        }
      }
    },
    delete (index) {
      var param = {
        token: localStorage.token,
        projectName: store.project.projectName,
        studentID: this.selectedStudents[index].number
      }
      console.log('send: ' + param)
      let res = deleteStudent(param)
      console.log(res)
      return res.updateStudent_ACK
    },
    fullName (student) {
      let fullName = null
      if (student.middleName === '') {
        fullName = student.firstName + ' ' + student.lastName
      } else {
        fullName = student.firstName + ' ' + student.middleName + ' ' + student.surname
      }
      return fullName
    },
    showGroup (student) {
      if (student.group <= 0) {
        return ''
      } else {
        return student.group.toString()
      }
    },
    checkFormValidity () {
      const valid = this.$refs.form.checkValidity()
      console.log('NameState before: ', this.nameState)
      this.nameState = valid
      console.log('NameState after: ', this.nameState)
      // if (this.nameState === 'valid') {
      //   valid = true
      // } else {
      //   valid = false
      // }
      console.log('Valid: ', valid)
      return valid
    },
    resetModal () {
      this.newNumber = ''
      this.newFirstName = ''
      this.newMiddleName = ''
      this.newLastName = ''
      this.newEmail = ''
      this.inputState = null
    },
    recordNewStudent (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.addNewStudent()
    },
    addNewStudent () {
      if (!this.checkFormValidity()) {
        // this.errorFound = this.checkFormValidity()
        return
      }
      for (let i = 0; i < this.addedStudents.length; i++) {
        if (this.newEmail === this.addedStudents[i].email) {
          console.log('A student with an email address of ', this.newEmail, ' exits already!')
          return
        }
      }
      if (this.addSingle()) {
        let newStudent = {number: this.newNumber,
          firstName: this.newFirstName,
          middleName: this.newMiddleName,
          surname: this.newLastName,
          email: this.newEmail,
          group: 0}
        // this.students.push(newStudent)
        this.addedStudents.push(newStudent)
        this.$nextTick(() => {
          this.$refs.modal.hide()
        })
      }
    },
    editStudent () {
      switch (this.selectedStudents.length) {
        case 1:
          this.$bvModal.show('editStudent')
          break
        default:
          console.log('Select exactly ONE student!')
      }
    },
    loadSelection () {
      this.newNumber = this.selectedStudents[0].number
      this.newFirstName = this.selectedStudents[0].firstName
      this.newMiddleName = this.selectedStudents[0].middleName
      this.newLastName = this.selectedStudents[0].surname
      this.newEmail = this.selectedStudents[0].email
      this.inputState = null
    },
    editStudentInfo (bvModalEvt) {
      bvModalEvt.preventDefault()
      this.changeStudentInfo()
    },
    changeStudentInfo () {
      if (!this.checkFormValidity()) {
        // this.errorFound = this.checkFormValidity()
        return
      }
      let index = null
      for (let i = 0; i < this.addedStudents.length; i++) {
        if (this.selectedStudents[0].number === this.addedStudents[i].number) {
          index = i
        }
      }
      this.addedStudents[index].number = this.newNumber
      this.addedStudents[index].firstName = this.newFirstName
      this.addedStudents[index].middleName = this.newMiddleName
      this.addedStudents[index].surname = this.newLastName
      this.addedStudents[index].email = this.email
      this.$nextTick(() => {
        this.$refs.modal.hide()
      })
    },
    remove () {
      switch (this.selectedStudents.length) {
        case 0:
          console.log('Select at least ONE student!')
          break
        default:
          this.$bvModal.show('removeStudent')
      }
    },
    removeStudent () {
      let indices = []
      for (let i = 0; i < this.selectedStudents.length; i++) {
        let index = this.addedStudents.indexOf(this.selectedStudents[i])
        indices.push(index)
      }
      indices.sort()
      for (let i = 0; i < indices.length; i++) {
        if (this.delete(indices[i])) {
          this.addedStudents.splice(indices[i] - i, 1)
          this.selectedStudents.splice(i, 1)
        } else {
          return
        }
      }
      this.selectedStudents = []
    }
  },
  created () {
    console.log(store.state.project)
    if (store.state.project !== null) {
      this.addedStudents = store.state.project.studentInfo
    }
  }
}
</script>

<style scoped>

</style>
