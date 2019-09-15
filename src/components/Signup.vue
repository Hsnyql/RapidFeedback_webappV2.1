<template>
    <b-container fluid>
        <b-row align-h="center"><h1>Signup Page</h1></b-row>
        <b-row align-h="center">
          <b-alert v-model="confirmFail" variant="danger" dismissible>Passwords are not same</b-alert>
          <b-alert v-model="registerFail" variant="danger" dismissible>Email is already used. Please use another email</b-alert>
        </b-row>
        <b-row align-h="center">
            <b-col cols="6">
                <b-form @submit="signup" @reset="clear">
                    <b-form-group id="account" label="Email:" label-for="account-input">
                        <b-form-input id="account-input" type="email" required placeholder="Enter Email" v-model="email"></b-form-input>
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
                    <b-row align-h="center">
            <b-col cols="3">
                <b-row align-h="center">
                    <b-button type="submit" variant="primary">Submit</b-button>
                </b-row>
            </b-col>
            <b-col cols="3">
                <b-row align-h="center">
                    <b-button type="reset" variant="danger" style="width=30px">Clear</b-button>
                </b-row>
            </b-col>
        </b-row>
                </b-form>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
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
      if (this.password !== this.confirmedPassword) {
        this.confirmFail = true
      } else {
        this.axios.post('/api/RegisterServlet', {
          email: this.email,
          password: this.password,
          firstName: this.firstName,
          middleName: this.middleName,
          lastName: this.lastName
        }).then((response) => {
          console.log(response.data)
          if (response.data.register_ACK) {
            // TODO: router
            this.$router.push('/Login')
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
