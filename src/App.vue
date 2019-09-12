<template>
  <div id="app">
    <Header/>
    <SideNav/>
    <ScanHome/>
  </div>
</template>

<script>
import SideNav from '@/components/nav'
import Header from '@/components/Header'
import ScanHome from '@/components/ScanHome.vue'
import ChartCard from '@/components/ChartCard.vue'
export default {
  name: 'App',
  components: {
    SideNav,
    Header,
    ScanHome,
    ChartCard
  }
}
</script>

<style lang="scss">
@import './assets/custom.scss';
@import '~bootstrap/scss/bootstrap.scss';
@import '~bootstrap-vue/src/index.scss';

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
