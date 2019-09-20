<template>
  <div>
    <h1>token: {{token}}</h1>
    <h1>welcome back, {{firstName}}</h1>
    <ul>
      <li v-for="item in projectList" v-bind:key="item.projectName">
        {{ item}}
      </li>
    </ul>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {store} from '@/store.js'
export default {
  data () {
    return {
      // token: store.token,
      // firstName: store.firstName,
      // // eslint-disable-next-line no-eval
      // projectList: eval(store.projectList)[0]
      token: localStorage.getItem('token'),
      firstName: localStorage.getItem('firstName'),
      // eslint-disable-next-line no-eval
      projectList: eval(localStorage.getItem('projectList'))
    }
  },

  components: {},

  computed: {},

  methods: {}
}

</script>
