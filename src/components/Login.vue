<template>
    <div>
      <div class="container">
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
        <!-- <div v-show="isShow">
          <p>email: {{email}}</p>
          <p>password: {{password}}</p> -->
        <!-- </div> -->
      </form>
      </div>
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
      confirmedPassword: ''
    }
  },
  methods: {
    login () {
      // To access address from other domain, we need to add proxyTable in ./config/index.js
      this.axios.post('/api/LoginServlet', {
        password: this.password,
        username: this.email
      }).then(function (response) {
        console.log(response.data)
      }).catch(function (error) {
        console.log(error)
      })
    },
    getdata () {
      this.axios.get('/vue-demo/getdata').then((response) => {
        console.log(response.data)
      }).catch((response) => {
        console.log(response)
      })
    }
  }
}
</script>

<style scoped>

.form-signin {
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
