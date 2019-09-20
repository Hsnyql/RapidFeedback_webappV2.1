import Vue from 'vue'

export const store = Vue.observable({
  token: null,
  firstName: null,
  projectList: null,
  projectName: null,
  // eslint-disable-next-line no-eval
  project: eval(localStorage.getItem('projectList'))[0]
})
