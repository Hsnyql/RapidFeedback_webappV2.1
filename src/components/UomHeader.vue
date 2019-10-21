<template>
<b-row class="header text-center">
    <b-col cols="2" class="headerImg">
      <img alt="uni logo" src="../assets/unimelb-logo-prefered.jpg" width="128" height="128">
    </b-col>
    <b-col cols="8" class="headerTitle"><h1>Rapid Feedback</h1></b-col>
  <b-col cols="2" align-self="end">
    <b-button
        style="margin-bottom:10px; padding:1;"
        class="button-small"
        variant="danger"
        v-if="loggedIn"
        @click="signout">Log Out</b-button>
  </b-col>
</b-row>
</template>

<script>
import {store, clear} from '@/store'

export default {
  name: 'UomHeader',
  computed: {
    loggedIn () {
      if (store.state.token) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    signout () {
      localStorage.clear()
      clear()
      this.$router.push('/')
    }
  }
}
</script>
