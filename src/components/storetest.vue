<template>
  <div>
    <h1>token: {{token}}</h1>
    <h1>welcome back, {{firstName}}</h1>
    <!-- <p>projectList {{projectList}}</p> -->
    <b-button variant="primary" @click="test">foreach</b-button>
    <ol>
      <li v-for="item in projectList.studentInfo" v-bind:key="item">
        {{ item}}
      </li>
    </ol>
  </div>
</template>

<script>
import {store} from '@/store.js'
export default {
  data () {
    return {
      token: store.token,
      firstName: store.firstName,
      // eslint-disable-next-line no-eval
      projectList: eval(store.projectList)[0]
    }
  },

  components: {},

  computed: {},

  methods: {
    test () {
      this.projectList.forEach(
        item => {
          console.log(item)
        }
      )
    }
  }
}

</script>
