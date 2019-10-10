<template>
    <b-container fluid>
        <!-- <b-row class="header">
            <b-col cols="2" class="headerImg text-center">
                <img alt="uni logo" src="./assets/unimelb-logo-prefered.jpg" width="128" height="128">
            </b-col>
            <b-col class="headerTitle"><h1>Rapid Feedback</h1></b-col>
        </b-row> -->
      <b-row class="header text-center">
        <b-col>
          <UomHeader></UomHeader>
        </b-col>
      </b-row>
        <navbar> </navbar>
        <!-- <b-row align-h="center">
            <b-col>
                <b-nav pills>
                    <b-nav-item to="/">Login</b-nav-item>
                    <b-nav-item to="/Signup">Signup</b-nav-item>
                    <b-nav-item to="/AssessmentPreparation/Menu">Assessment Preparation</b-nav-item>
                    <b-nav-item >Real-Time Assessment</b-nav-item>
                    <b-nav-item >Review</b-nav-item>
                    <b-nav-item >Report</b-nav-item>
                    <b-nav-item to="/file">excel read test</b-nav-item>
                    <b-nav-item @click="signout" to="/">Logout</b-nav-item>
                </b-nav>
            </b-col>
        </b-row> -->
        <b-row align-h="center">
            <b-col><router-view></router-view></b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button @click="test" size="lg">test</b-button>
          </b-col>
        </b-row>
        <b-row class="footer">
          <b-col>
            <UomFooter></UomFooter>
          </b-col>
        </b-row>
    </b-container>
</template>

<script>
import Navbar from './components/Navbar.vue'
import UomFooter from './components/UomFooter.vue'
import UomHeader from './components/UomHeader.vue'
export default {
  name: 'app',
  components: { UomHeader, Navbar, UomFooter

  },
  data () {
    return {

    }
  },
  methods: {
    // changeStatus: function (status) {
    //     this.loginStatus = status
    // }
    test () {
      console.log(localStorage.getItem('projectList'))
    },
    signout () {
      localStorage.clear()
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/custom.scss';
@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import './assets/uom_master.css';
@import './assets/uom_header.css';
@import './assets/uom_footer.css';

/*#app {*/
/*  font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*  }*/
  // .header {
  //   background: #094183;
  // }
  // .headerImg {
  //   padding-left: 20px;
  //   align-content: center;
  // }
  /* .headerTitle{
  } */
  // .headerTitle h1{
  //   position: absolute;
  //   bottom: 10%;
  //   color: white;
  // }
  .body{
    position: relative;
  }
  // .menuBox{
  //   height: 100%;
  //   width: 20%;
  //   border: 4px solid red;
  // }
  // .menu{
  //   float: left;
  //   border: 4px solid black;
  //   width: 100%;
  //   list-style-type: none;
  //   margin: 0;
  //   padding: 0;
  //   text-align: center;
  //   /*height: 100%;*/
  // }
  .content{
    border-left: 1px solid black;
    height: 100%;
  }
  /*.divider{*/
  /*  !*position: absolute;*!*/
  /*  height: 100%;*/
  /*  left: 25%;*/
  /*  border-left: 1px solid black;*/
  /*  padding-left: 10px;*/
  /*}*/
  /*.menu router-link {*/
  /*  display: block;*/
  /*}*/

  .footer{
    background: #094183;
  }
</style>
