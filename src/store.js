import Vue from 'vue'

export const store = Vue.observable({
  state: {
    token: null,
    firstName: null,
    project: null,
    projectName: null,
    projectList: [],
    criteriaList: []
  },
  token: null,
  firstName: null,
  project: null,
  projectName: null,
  projectList: []
})

export const clear = () => {
  store.state = {
    token: null,
    firstName: null,
    project: null,
    projectName: null,
    projectList: [],
    criteriaList: []
  }
}
