<template>
<b-row class="header text-center">
    <b-col cols="2" class="headerImg">
      <img alt="uni logo" src="../assets/unimelb-logo-prefered.jpg" width="128" height="128">
    </b-col>
    <b-col cols="8" class="headerTitle"><h1>Rapid Feedback</h1></b-col>
  <b-col cols="2" align-self="end">
    <h4 style="color: white" v-if="loggedIn">Hello, {{name}}</h4>
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
  data () {
    return {
      // name: store.state.firstName
    }
  },
  computed: {
    loggedIn () {
      if (store.state.token) {
        return true
      } else {
        return false
      }
    },
    name () {
      return store.state.firstName
    }
  },
  methods: {
    signout () {
      localStorage.clear()
      clear()
      this.$router.push('/')
    }
  },
  created () {
    // this.name = store.state.firstName
    // this.$forceUpdate()
    if (localStorage.store) {
      store.state = JSON.parse(localStorage.store)
    }
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('store', JSON.stringify(store.state))
    })
  }
}
</script>
