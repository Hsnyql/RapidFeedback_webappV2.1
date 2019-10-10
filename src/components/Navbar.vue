<template>
  <div class="uomcontent">
    <div class="center" style="margin-bottom:25px; margin-top:15px; padding:0; background-color:#FFFFFF; color:#fff">
      <div style="height:0px">
      </div>
    <b-link style="margin-bottom:10px; padding:1;" class="button-small" to="/">Home</b-link>
        <b-link style="margin-bottom:10px; padding:1;" class="button-small" to="/Signup">Sign Up</b-link>
    <b-link style="margin-bottom:10px; padding:1;" class="button-small" to="/AssessmentPreparation/Menu">Assessment Preparation</b-link>
    <b-link style="margin-bottom:10px; padding:1;" class="button-small" to="/">Real-Time Assessment</b-link>
    <b-link style="margin-bottom:10px; padding:1;" class="button-small" to="/">Review</b-link>
    <b-link style="margin-bottom:10px; padding:1;" class="button-small" to="/">Report</b-link>
    <b-link style="margin-bottom:10px; padding:1;" class="button-small" to="/file">Import Data</b-link>
    <b-link style="margin-bottom:10px; padding:1;" class="button-small" @click="signout" to="/">Logout</b-link>
    </div>
  </div>
</template>

<script>
import {store} from '@/store'
export default {
  name: 'Navbar',
  methods: {
    signout () {
      localStorage.clear()
      store.projectList = []
      store.projectName = null
      store.token = null
      store.firstName = null
      store.project = null
    }
  }
}
</script>
