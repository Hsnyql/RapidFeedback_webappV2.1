<template>
    <div>
      <!-- <div class="container">
      <form class="form-signin">
        <h2 class="form-signin-heading">LOGIN</h2>
        <label for="inputEmail" class="sr-only">Email</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus v-model="email">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="password">
        <div class="checkbox">
          <label>
            <input type="checkbox" value="remember-me"> remember me
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit" @click="login">LOGIN</button>
        <div class="checkbox">
            <b-link to="/signup" style="color: black">Sign up</b-link>
        </div>
        </form>
        </div> -->
      <h1>LOGIN</h1>
      <b-alert v-model="fail" variant="warning" dismissible="">Wrong email or password!</b-alert>
      <b-form @submit="login" class="form-login">
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
            :state="validation"
          ></b-form-input>
          <b-form-invalid-feedback :state="validation">
            Please enter a valid email address.
          </b-form-invalid-feedback>
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
          placeholder="Passwrod"
          ></b-form-input>
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
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmedPassword: '',
      fail: null
    }
  },
  methods: {
    login () {
      // To access address from other domain, we need to add proxyTable in ./config/index.js
      this.axios.post('/api/LoginServlet', {
        password: this.password,
        username: this.email
      }).then((response) => {
        console.log(response.data)
        if (response.data.login_ACK === -1) {
          this.fail = true
        } else {
          this.$router.push('/helloworld')
        }
      }).catch((error) => {
        console.log(error)
      })
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

 .form-login {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
/*.form-signin .form-signin-heading,
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
} */
/* .form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
} */
</style>
