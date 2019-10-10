<template>
  <b-container fluid>
    <b-row>
      <b-col cols="6"><h3>Student Management</h3></b-col>
      <b-col cols="2">
        <b-button variant="primary">Group</b-button>
        <b-button variant="primary">UnGroup</b-button>
      </b-col>
      <b-col cols="4">
        <b-button variant="primary">Upload</b-button>
        <b-button variant="primary">Add</b-button>
        <b-button variant="primary">Edit</b-button>
        <b-button variant="primary">Remove</b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col><hr><hr></b-col>
    </b-row>
    <b-row align-h="between">
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
import {store} from '@/store'
import XLSX from 'xlsx'
// eslint-disable-next-line no-unused-vars
import {addStudent, groupStudent, importStudent, deleteStudent} from '@/api'

export default {
  name: 'AssessmentPreparationStudent',
  data () {
    return {

    }
  },
  methods: {
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
          var param = {
            token: localStorage.getItem('token'),
            projectId: store.projectId,
            studentList: ws
          }
          importStudent(param).then(res => {
            console.log(res)
            if (res.updateStudent_ACK) {
              console.log('succeed')
              // TODO: page after adding student
              this.$router.push('/')
            } else {

            }
          })
          this.list = ws
        } catch (e) {
          return false
        }
      }
      fileReader.readAsBinaryString(this.file)
    },
    addSingle () {
      var param = {

      }
      addStudent(param).then(res => {
        console.log(res)
      })
    },
    group () {
      var param = {

      }
      groupStudent(param).then(res => {
        console.log(res)
      })
    },
    delete () {
      var param = {

      }
      deleteStudent(param).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>

</style>
