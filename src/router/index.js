
import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/components/Login'
import Signup from '@/components/Signup'
// eslint-disable-next-line camelcase
import AssessmentPreparationMain from '@/components/AssessmentPreparationMain'
import storetest from '@/components/storetest'
import AssessmentPreparationAbout from '../components/AssessmentPreparationAbout'
import AssessmentPreparationCriteria from '../components/AssessmentPreparationCriteria'

Vue.use(VueRouter)

const blank = {template: ''}

const routes = [
  {path: '/', component: blank},
  {path: '/Login', component: Login},
  {path: '/Signup', component: Signup},
  {path: '/AssessmentPreparation/Menu', component: AssessmentPreparationMain},
  {path: '/storetest', component: storetest},
  {path: '/AssessmentPreparation/About', component: AssessmentPreparationAbout},
  {path: '/AssessmentPreparation/Criteria', component: AssessmentPreparationCriteria}
]

export default new VueRouter({
  routes
})
