<template>
  <div class="uomcontent">
    <div class="center" style="margin-bottom:25px; margin-top:15px; padding:0; background-color:#FFFFFF; color:#fff">
      <b-link
          style="margin-bottom:10px; padding:1;"
          class="button-small"
          to="/"
          v-if="!loggedIn">Login</b-link>
      <b-link
          style="margin-bottom:10px; padding:1;"
          class="button-small"
          to="/Signup"
          v-if="!loggedIn">Sign Up</b-link>
      <b-link
          style="margin-bottom:10px; padding:1;"
          class="button-small"
          to="/AssessmentPreparation/Menu"
          :disabled="!loggedIn">Assessment Preparation</b-link>
      <b-link
          style="margin-bottom:10px; padding:1;"
          class="button-small"
          to="/RealTimeAssessment/Menu"
          :disabled="!loggedIn">Real-Time Assessment</b-link>
      <b-link
          style="margin-bottom:10px; padding:1;"
          class="button-small"
          to="/ReviewAndReport/Menu"
          :disabled="!loggedIn">Review and Report</b-link>
<!--      <b-link style="margin-bottom:10px; padding:1;" class="button-small" to="/">Report</b-link>-->
<!--      <b-link style="margin-bottom:10px; padding:1;" class="button-small" to="/file">Import Data</b-link> -->
      <b-link
          style="margin-bottom:10px; padding:1;"
          class="button-small"
          @click="signout"
          to="/"
          v-if="loggedIn">Logout</b-link>
    </div>
  </div>
</template>

<script>
import {store, clear} from '@/store'
export default {
  name: 'Navbar',
  data () {
    return {
    }
  },
  methods: {
    signout () {
      localStorage.clear()
      clear()
    }
  },
  computed: {
    loggedIn () {
      if (store.state.token) {
        return true
      } else {
        return false
      }
    }
  },
  created () {
    if (localStorage.store) {
      store.state = JSON.parse(localStorage.store)
    }
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('store', JSON.stringify(store.state))
    })
  }
}
</script>
