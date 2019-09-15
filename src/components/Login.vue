<template>
    <b-container fluid>
        <b-row align-h="center">
            <b-col cols="6">
                <b-row><h1>Login Page</h1></b-row>
                <b-row>
                    <b-col>
                        <b-form>
                            <b-form-group id="account" label="Account:" label-for="account-input">
                                <b-form-input id="account-input" type="email" required placeholder="Enter Email" v-model="email"></b-form-input>
                            </b-form-group>
                            <b-form-group id="password" label="Password:" label-for="password-input">
                                <b-form-input id="password-input" type="password" required placeholder="Enter Password" v-model="password"></b-form-input>
                            </b-form-group>
                        </b-form>
                    </b-col>
                </b-row>
                <b-row align-h="center">
                    <b-col cols="3">
                        <b-button type="submit" variant="primary">Submit</b-button>
                    </b-col>
                    <b-col cols="3">
                        <b-button type="clear" variant="danger">Clear</b-button>
                    </b-col>
                </b-row>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  props: {
  },
  methods: {
  },
  computed: {
  }
}
</script>

<style scoped>

</style>
