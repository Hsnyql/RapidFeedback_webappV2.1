import Vue from 'vue'

export const store = Vue.observable({
  projectId: null,
  project: null
  // eslint-disable-next-line no-eval
  // project: eval(localStorage.getItem('projectList'))[0]
})
// token, id, firstName, projectList are all stored in localstorage, this store is just for data sharing bwtween components
