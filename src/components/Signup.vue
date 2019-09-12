<template>
    <div>
      <!-- <div class="container">
      <form class="form-signin">
        <h2 class="form-signin-heading">SIGNUP</h2>
        <label for="inputFirstName" class="sr-only">First Name</label>
        <input type="firstName" id="inputFirstname" class="form-control" placeholder="First Name" required autofocus v-model="firstName">
        <label for="inputMiddleName" class="sr-only">Middle Name</label>
        <input type="middleName" id="inputMiddleName" class="form-control" placeholder="Middle Name" v-model="middleName">
        <label for="inputLastname" class="sr-only">Last Name</label>
        <input type="lastName" id="inputLastName" class="form-control" placeholder="Last Name" required v-model="lastName">
        <label for="inputEmail" class="sr-only">Email</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required v-model="email">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="password">
        <label for="confirmPassword" class="sr-only">Confirm Password</label>
        <input type="password" id="confirmPassword" class="form-control" placeholder="Confirm Password" required v-model="confirmedPassword">
        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> remember me
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit" @click="signup">SIGNUP</button>
      </form>
      </div> -->
      <h1>SIGN UP</h1>
      <b-alert v-model="wrongPassword" variant="warning" dismissible>Passwords are not same!</b-alert>
      <b-form @submit="signup" class="form-signup">
        <b-form-group>
          <b-input v-model="firstName" placeholder="First Name" required autofocus/>
        </b-form-group>
        <b-form-group>
          <b-input v-model="middleName" placeholder="Middle Name"/>
        </b-form-group>
        <b-form-group>
          <b-input v-model="lastName" placeholder="Last Name"/>
        </b-form-group>
        <b-form-group
          id="input-group-1"
          label=""
          label-for="input-1"
        >
          <b-form-input
            id="input-1"
            v-model="email"
            type="email"
            required
            placeholder="Enter Email"
            :formatter="format"
          ></b-form-input>
          <!-- <b-form-invalid-feedback :state="validation">
            Please enter a valid email address.
          </b-form-invalid-feedback> -->
        </b-form-group>
        <b-form-group
          id="input-group-2"
          label=""
          label-for="input-2"
        >
        <b-form-input
          id="input-2"
          v-model="password"
          type="password"
          required
          placeholder="Password"
          ></b-form-input>
        </b-form-group>
        <b-form-group>
          <b-input v-model="confirmedPassword" type="password" placeholder="Confirm Password"/>
        </b-form-group>
        <b-button variant="primary" type="submit">LOGIN</b-button>
      </b-form>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      password: '',
      confirmedPassword: '',
      wrongPassword: null
    }
  },
  methods: {
    signup () {
      // To access address from other domain, we need to add proxyTable in ./config/index.js
      if (this.password !== this.confirmedPassword) {
        this.wrongPassword = true
      } else {
        this.axios.post('/api/SignupServlet', {
          firstName: this.firstName,
          middleName: this.middleName,
          lastName: this.lastName,
          password: this.password,
          email: this.email
        }).then(function (response) {
          console.log(response.data)
        }).catch(function (error) {
          console.log(error)
        })
      }
    },
    format (value, event) {
      return value.toLowerCase()
    }
  },
  computed: {
    validation () {
      var pattern = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
      return pattern.test(this.email)
    }
  }
}
</script>

<style scoped>

.form-signup {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
/* .form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
} */
</style>
