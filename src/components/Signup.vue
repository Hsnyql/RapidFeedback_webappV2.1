<template>
  <b-container fluid>
    <b-row><br></b-row>
<!--  <b-row align-h="center"><h1>Signup Page</h1></b-row>-->
      <b-row align-h="center">
        <b-alert v-model="confirmFail" variant="danger" dismissible>Passwords are not same</b-alert>
        <b-alert v-model="registerFail" variant="danger" dismissible>Email is already used. Please use another email</b-alert>
      </b-row>
      <b-row align-h="center">
        <b-col>
          <b-form>
            <b-form-group id="account" label="Email:" label-for="account-input">
              <b-form-input id="account-input" type="email" required placeholder="Enter Email" v-model="email">
              </b-form-input>
            </b-form-group>
            <b-form-group id="firstname" label="First Name:" label-for="firstname-input">
              <b-form-input id="firstname-input" type="text" required placeholder="Enter First Name" v-model="firstName">
              </b-form-input>
            </b-form-group>
            <b-form-group id="middlename" label="Middle Name:" label-for="middlename-input">
              <b-form-input id="middlename-input" type="text" placeholder="Enter Middle Name" v-model="middleName">
              </b-form-input>
            </b-form-group>
            <b-form-group id="lastname" label="Last Name:" label-for="lastname-input">
              <b-form-input id="lastname-input" type="text" required placeholder="Enter Last Name" v-model="lastName">
              </b-form-input>
            </b-form-group>
            <b-form-group id="password" label="Password:" label-for="password-input-1">
              <b-form-input id="password-input-1" type="password" required placeholder="Enter Password" v-model="password"></b-form-input>
            </b-form-group>
            <b-form-group id="password" label="Confirm Password:" label-for="password-input-2">
              <b-form-input id="password-input-2" type="password" required placeholder="Enter Password" v-model="confirmedPassword"></b-form-input>
            </b-form-group>
            <b-row align-h="around">
            <b-col cols="3">
              <b-row align-h="center">
                <b-button variant="primary" @click="signup">Submit</b-button>
              </b-row>
            </b-col>
            <b-col cols="3">
              <b-row align-h="center">
                <b-button variant="danger" @click="clear">Clear</b-button>
              </b-row>
            </b-col>
          </b-row>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
</template>

<script>
import {signupCheck} from '@/api.js'
export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: '',
      firstName: '',
      middleName: '',
      lastName: '',
      confirmedPassword: '',
      confirmFail: null,
      registerFail: null
    }
  },
  methods: {
    signup () {
      console.log('clicked')
      if (this.password !== this.confirmedPassword) {
        this.confirmFail = true
      } else {
        var param = {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          middleName: this.middleName,
          lastName: this.lastName
        }
        signupCheck(param).then((res) => {
          console.log(res)
          if (res.register_ACK) {
            // TODO: router
            this.$router.push('/')
          } else {
            this.registerFail = true
          }
        })
      }
    },
    clear () {
      this.email = ''
      this.password = ''
      this.firstName = ''
      this.middleName = ''
      this.lastName = ''
      this.confirmedPassword = ''
      this.confirmFail = null
      this.registerFail = null
    }
  }
}
</script>

<style scoped>

</style>
