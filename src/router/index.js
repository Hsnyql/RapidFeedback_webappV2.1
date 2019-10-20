
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login'
import Signup from '../components/Signup'
// eslint-disable-next-line camelcase
import storetest from '../components/storetest'

import AssessmentPreparationMain from '../components/AssessmentPreparationMain'
import AssessmentPreparationAbout from '../components/AssessmentPreparationAbout'
import AssessmentPreparationCriteria from '../components/AssessmentPreparationCriteria'
import AssessmentPreparationGrading from '../components/AssessmentPreparationGrading'
import AssessmentPreparationStudent from '../components/AssessmentPreparationStudent'
import FirstPage from '@/components/FirstPage'
import RealTimeAssessmentMain from '../components/RealTimeAssessmentMain'
import RealTimeAssessmentMarking from '../components/RealTimeAssessmentMarking'
import Review from '@/components/Review'

Vue.use(VueRouter)

const routes = [
  {path: '/storetest', component: storetest},
  {path: '/', component: Login},
  {path: '/Signup', component: Signup},
  // better to use children in path of AssessmentPreparation
  {path: '/AssessmentPreparation/Menu', component: AssessmentPreparationMain},
  {path: '/AssessmentPreparation/About', component: AssessmentPreparationAbout},
  {path: '/AssessmentPreparation/Criteria', component: AssessmentPreparationCriteria},
  {path: '/AssessmentPreparation/Grading', component: AssessmentPreparationGrading},
  {path: '/AssessmentPreparation/Student', component: AssessmentPreparationStudent},
  {path: '/RealTimeAssessment/Menu', component: RealTimeAssessmentMain},
  {path: '/RealTimeAssessment/Marking', component: RealTimeAssessmentMarking},
  {path: '/firstpage', component: FirstPage},
  {path: '/Review', component: Review}
]

export default new VueRouter({
  routes
})
