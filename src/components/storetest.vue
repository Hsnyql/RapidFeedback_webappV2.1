<template>
  <div>
    <h1>token: {{token}}</h1>
    <h1>welcome back, {{firstName}}</h1>
    <p>projectList {{projectList}}</p>
  </div>
</template>

<script>
import {store} from '@/store.js'
export default {
  data () {
    return {
      token: store.token,
      firstName: store.firstName,
      projectList: store.projectList
    }
  },

  components: {},

  computed: {},

  methods: {}
}

</script>
