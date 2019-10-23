<template>
    <b-container fluid>
      <b-row id="fixedHeader" class="header text-center">
        <b-col>
            <UomHeader></UomHeader>
        </b-col>
      </b-row>
      <b-row id="blankRow"><br></b-row>
<!--      <b-row align-h="center"><Navbar></Navbar></b-row>-->
      <b-row align-h="center" v-if="!loggedIn">
        <b-col cols="6">
          <b-nav pills justified>
            <b-nav-item to="/">Log In</b-nav-item>
            <b-nav-item to="/Signup">Sign Up</b-nav-item>
          </b-nav>
        </b-col>
      </b-row>
      <b-row align-h="center">
        <b-col><router-view></router-view></b-col>
      </b-row>
<!--        <b-row class="footer">-->
<!--          <b-col>-->
<!--            <UomFooter></UomFooter>-->
<!--          </b-col>-->
<!--        </b-row>-->
    </b-container>
</template>

<script>
import Navbar from './components/Navbar.vue'
import UomFooter from './components/UomFooter.vue'
import UomHeader from './components/UomHeader.vue'
import {store} from '@/store'

export default {
  name: 'app',
  components: {UomHeader, Navbar, UomFooter},
  data () {
    return {
    }
  },
  computed: {
    loggedIn () {
      if (store.state.token) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
@import './assets/custom.scss';
@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import './assets/uom_master.css';
@import './assets/uom_header.css';
@import './assets/uom_footer.css';

  .body{
    position: relative;
  }

  .content{
    border-left: 1px solid black;
    height: 100%;
  }

  .footer{
    background: #094183;
  }

  #fixedHeader{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 99;
  }

  #fixedHeader + #blankRow{
    padding-top: 125px;
  }

  // #loginbtn {
  //   background-color: #094183;
  //   color: white;
  // }
</style>
