
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login'
import Signup from '../components/Signup'

import AssessmentPreparationMain from '../components/AssessmentPreparationMain'
import AssessmentPreparationAbout from '../components/AssessmentPreparationAbout'
import AssessmentPreparationCriteria from '../components/AssessmentPreparationCriteria'
import AssessmentPreparationGrading from '../components/AssessmentPreparationGrading'
import AssessmentPreparationStudent from '../components/AssessmentPreparationStudent'
import MainMenu from '../components/MainMenu'
import RealTimeAssessmentMain from '../components/RealTimeAssessmentMain'
import RealTimeAssessmentMarking from '../components/RealTimeAssessmentMarking'
import ReviewAndReportMain from '../components/ReviewAndReportMain'
import ReviewAndReportView from '../components/ReviewAndReportView'
import ReviewAndReportReport from '../components/ReviewAndReportReport'

Vue.use(VueRouter)

const routes = [
  {path: '/', redirect: '/Login'},
  {path: '/Login', component: Login},
  {path: '/Signup', component: Signup},
  // better to use children in path of AssessmentPreparation
  {path: '/AssessmentPreparation/Menu', component: AssessmentPreparationMain},
  {path: '/AssessmentPreparation/About', component: AssessmentPreparationAbout},
  {path: '/AssessmentPreparation/Criteria', component: AssessmentPreparationCriteria},
  {path: '/AssessmentPreparation/Grading', component: AssessmentPreparationGrading},
  {path: '/AssessmentPreparation/Student', component: AssessmentPreparationStudent},
  {path: '/RealTimeAssessment/Menu', component: RealTimeAssessmentMain},
  {path: '/RealTimeAssessment/Marking', component: RealTimeAssessmentMarking},
  {path: '/ReviewAndReport/Menu', component: ReviewAndReportMain},
  {path: '/ReviewAndReport/View', component: ReviewAndReportView},
  {path: '/ReviewAndReport/Report', component: ReviewAndReportReport},
  {path: '/MainMenu', component: MainMenu}
]

export default new VueRouter({
  routes
})
