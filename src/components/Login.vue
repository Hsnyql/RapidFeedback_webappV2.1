<template>
    <b-container fluid>
        <b-row align-h="center"><h1>Login Page</h1></b-row>
        <b-row align-h="center">
          <b-alert v-model="noEmail" variant="danger" dismissible>Wrong email!</b-alert>
          <b-alert v-model="wrongPassword" variant="danger" dismissible>Wrong password!</b-alert>
        </b-row>
        <b-row align-h="center">
            <b-col cols="6">
                <b-row>
                    <b-col>
                        <b-form @submit="login" @reset="clear">
                            <b-form-group id="account" label="Account:" label-for="account-input">
                                <b-form-input id="account-input" type="email" required placeholder="Enter Email" v-model="email"></b-form-input>
                            </b-form-group>
                            <b-form-group id="password" label="Password:" label-for="password-input">
                                <b-form-input id="password-input" type="password" required placeholder="Enter Password" v-model="password"></b-form-input>
                            </b-form-group>
                            <b-row align-h="center">
                              <b-col cols="3">
                                <b-button type="submit" variant="primary">Submit</b-button>
                              </b-col>
                              <b-col cols="3">
                                <b-button type="reset" variant="danger">Clear</b-button>
                              </b-col>
                            </b-row>
                        </b-form>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import {store} from '@/store.js'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      wrongPassword: null,
      noEmail: null
    }
  },
  props: {
  },
  methods: {
    login () {
      // var url = '/api/login'
      var url = '/api/LoginServlet'
      this.axios.post(url, {
        username: this.email,
        password: this.password
      })
        .then(response => {
          console.log(response.data)
          var ack = response.data.login_ACK
          if (ack > 0) {
            store.token = response.data.token
            store.firstName = response.data.firstName
            store.projectList = response.data.projectList
            // TODO router link
            this.$router.push('/storetest')
          } else if (ack === 0) {
            this.wrongPassword = true
          } else if (ack === -1) {
            this.noEmail = true
          }
        })
        .catch(error => {
          console.log(error)
        })
      console.log(store)
    },
    clear () {
      this.email = ''
      this.password = ''
      this.wrongPassword = null
      this.noEmail = null
    }
  },
  computed: {
  }
}
</script>

<style scoped>

</style>
