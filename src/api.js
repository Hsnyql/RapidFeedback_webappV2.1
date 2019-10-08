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

export const addStudent = param => {
  return axios.post('/AddStudentServelet', param).then(res => {
    return res.data
  })
}

export const deleteStudent = param => {
  return axios.post('/DeleteStudentServlet', param).then(res => {
    return res.data
  })
}

export const editStudent = param => {
  return axios.post('/EditStudentServlet', param).then(res => {
    return res.data
  })
}

export const editCriteria = param => {
  return axios.post('/CriteriaListServlet', param).then(res => {
    return res.data
  })
}

export const assessmentAbout = param => {
  return axios.post('/UpdateProject_About_Servlet', param).then(res => {
    return res.data
  })
}

// export const assessmentTime = param => {
//   return axios.post('/UpdateProject_Time_Servlet', param).then(res => {
//     return res.data
//   })
// }

export const deleteProject = param => {
  return axios.post('/DeleteProjectServlet', param).then(res => {
    return res.data
  })
}

export const getMark = param => {
  return axios.post('/GetMarkServlet', param).then(res => {
    return res.data
  })
}

export const groupStudent = param => {
  return axios.post('/GroupStudentServlet', param).then(res => {
    return res.data
  })
}

export const importStudent = param => {
  return axios.post('/ImportStudentsServlet', param).then(res => {
    return res.data
  })
}

export const inviteAssessor = param => {
  return axios.post('/InviteAssessorServlet', param).then(res => {
    return res.data
  })
}

// TODO check axios.delete method
export const deleteAssessor = param => {
  return axios.delete('/InviteAssessorServlet', param).then(res => {
    return res.data
  })
}

export const sendMark = param => {
  return axios.post('/MarkServlet', param).then(res => {
    return res.data
  })
}

export const sendEmail = param => {
  return axios.post('/SendEmailServlet', param).then(res => {
    return res.data
  })
}
