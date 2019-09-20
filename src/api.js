import axios from 'axios'

const baseURL = '/api'

axios.defaults.baseURL = baseURL

export const loginCheck = param => {
  return axios.post('/LoginServlet', param).then(res => {
    return res.data
  })
}

export const signupCheck = param => {
  return axios.post('/RegisterServlet', param).then(res => {
    return res.data
  })
}

export const assessmentAbout = param => {
  return axios.post('/UpdateProject_About_Servlet', param).then(res => {
    return res.data
  })
}

export const assessmentTime = param => {
  return axios.post('/UpdateProject_Time_Servlet', param).then(res => {
    return res.data
  })
}
