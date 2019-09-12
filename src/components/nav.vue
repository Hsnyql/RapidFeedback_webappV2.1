<template>
  <div class="side-nav">
    <!-- <vue2-sidebar heading="menu" :links="links"></vue2-sidebar> -->
    <div id="sidebar">
      <div class="sb-section">
        <h6>Classes</h6>
      </div>
      <div class="sb-section">
        <b-link to="/helloworld" style="color: white">helloworld</b-link>
      </div>
      <div class="sb-section">
        <router-link to="/test" style="color: white">test</router-link>
      </div>
      <div class="sb-section">
        <router-link to='/' style="color: white">LOGIN</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideNav',
  props: {
    msg: String
  },
  data () {
    return {}
  },
  mounted () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#sidebar {
  /* min-width: 200px; */
  width: 200px;
  background: #094183;
  color: rgb(255, 255, 255);
  position: fixed;
  bottom: 0;
  top: 126px;
}

</style>
