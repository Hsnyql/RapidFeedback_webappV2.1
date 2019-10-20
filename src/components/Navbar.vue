<template>
  <div class="uomcontent">
    <div class="center" style="margin-bottom:25px; margin-top:15px; padding:0; background-color:#FFFFFF; color:#fff">
      <div style="height:0px">
      </div>
    <b-link style="margin-bottom:10px; padding:1;" class="button-small" to="/" v-show="login">Login</b-link>
        <b-link style="margin-bottom:10px; padding:1;" class="button-small" to="/Signup" v-show="login">Sign Up</b-link>
    <b-link style="margin-bottom:10px; padding:1;" class="button-small" to="/AssessmentPreparation/Menu">Assessment Preparation</b-link>
    <b-link style="margin-bottom:10px; padding:1;" class="button-small" to="/RealTimeAssessment/Menu">Real-Time Assessment</b-link>
    <b-link style="margin-bottom:10px; padding:1;" class="button-small" to="/ReviewAndReport/Menu">Review</b-link>
<!--    <b-link style="margin-bottom:10px; padding:1;" class="button-small" to="/">Report</b-link>-->
    <b-link style="margin-bottom:10px; padding:1;" class="button-small" to="/file">Import Data</b-link>
    <b-link style="margin-bottom:10px; padding:1;" class="button-small" @click="signout" to="/">Logout</b-link>
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
    login () {
      if (store.state.token) {
        return false
      } else {
        return true
      }
    }
  },
  created () {
    if (localStorage.store) {
      // eslint-disable-next-line no-eval
      // store.state = localStorage.store
      store.state = JSON.parse(localStorage.store)
    }
    window.addEventListener('beforeunload', () => {
      // console.log(JSON.stringify(store.state))
      localStorage.setItem('store', JSON.stringify(store.state))
    })
  },
  mounted () {

  }
}
</script>
