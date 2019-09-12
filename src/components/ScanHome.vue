<template>
  <div class="scan-home">
    <b-container fluid class="bv-example-row">
      <!-- <div class="wrapper">
        <div class="message">
          <ChartCard/>
          <h1>Responsive background</h1>
          <p>With thanks to http://sixrevisions.com/css/responsive-background-image/ and 500px</p>
        </div>
      </div> -->
      <router-view/>
    </b-container>
  </div>
</template>

<script>
import ChartCard from '../components/ChartCard.vue'
export default {
  name: 'ScanHome',
  props: {
    msg: String
  },
  components: {
    ChartCard
  },
  mounted () {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.scan-home {
  margin-left: 200px;
  /* background-image: url("./assets/Vbg.jpg"); */
  background-position: center center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  /* background-color: #999; */
  top: 200;
}
.wrapper {
  height: 100%;
  width: 100%;
}

.message {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  height: 45%;
  bottom: 0;
  display: block;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 0.5em;
}
</style>
