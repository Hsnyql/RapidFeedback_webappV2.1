import axios from 'axios'

const baseURL = '/api'

axios.defaults.baseURL = baseURL

export const loginCheck = (username, password) => {
  var param = {
    username: username,
    password: password
  }
  return axios.post('/LoginServlet', param).then(res => {
    return res.data
  })
}

export const signupCheck = (email, password, firstName, middleName, lastName) => {
  var param = {
    email: email,
    password: password,
    firstName: firstName,
    middleName: middleName,
    lastName: lastName
  }
  return axios.post('/RegisterServlet', param).then(res => {
    return res.data.id
  })
}

export const addStudent = (token, projectName, studentList) => {
  var param = {
    token: token,
    projectName: projectName,
    studentList: studentList
  }
  // what's in studentList
  //   studentNumber: studentNumber,
  //   firstName: firstName,
  //   middleName: middleName,
  //   lastName: lastName,
  //   email: email// student's email
  return axios.post('/AddStudentServelet', param).then(res => {
    return res.data.updateStudent_ACK
  })
}

export const deleteStudent = (token, projectId, studentId) => {
  var param = {
    token: token,
    projectId: projectId,
    studentId: studentId
  }
  return axios.post('/DeleteStudentServlet', param).then(res => {
    return res.data.updateStudent_ACK
  })
}

export const editStudent = (token, studentId, firstName,
  middleName, lastName, studentNumber, email) => {
  var param = {
    token: token,
    studentId: studentId,
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    studentNumber: studentNumber,
    email: email // student's email
  }
  return axios.post('/EditStudentServlet', param).then(res => {
    return res.data.updateStudent_ACK
  })
}

export const editCriteria = (token, projectId, criteriaList) => {
  var param = {
    token: token,
    projectId: projectId,
    criteriaList: criteriaList
  }
  return axios.post('/CriteriaListServlet', param).then(res => {
    return res.data.updateProject_ACK
  })
}

export const assessmentAbout = (token, projectId, criteriaList) => {
  var param = {
    token: token,
    projectId: projectId,
    criteriaList: criteriaList
  }
  return axios.post('/UpdateProject_About_Servlet', param).then(res => {
    return res.data.updateProject_ACK
  })
}

// export const assessmentTime = param => {
//   return axios.post('/UpdateProject_Time_Servlet', param).then(res => {
//     return res.data
//   })
// }

export const deleteProject = (token, projectId) => {
  var param = {
    token: token,
    projectId: projectId
  }
  return axios.post('/DeleteProjectServlet', param).then(res => {
    return res.data.updateProject_ACK
  })
}

export const groupStudent = (token, projectId, studentId, group) => {
  var param = {
    token: token,
    projectId: projectId,
    studentId: studentId,
    group: group
  }
  return axios.post('/GroupStudentServlet', param).then(res => {
    return res.data.updateStudent_ACK
  })
}

// export const importStudent = param => {
//   return axios.post('/ImportStudentsServlet', param).then(res => {
//     return res.data
//   })
// }

export const inviteAssessor = (token, projectId, markerId) => {
  var param = {
    token: token,
    projectId: projectId,
    markerId: markerId
  }
  return axios.post('/InviteAssessorServlet', param).then(res => {
    return res.data
  })
}

// TODO check axios.delete method
export const deleteAssessor = (token, projectId, markerId) => {
  var param = {
    token: token,
    projectId: projectId,
    markerId: markerId
  }
  return axios.delete('/InviteAssessorServlet', param).then(res => {
    return res.data.invite_ACK
  })
}

export const sendMark = param => {
  return axios.post('/MarkServlet', param).then(res => {
    return res.data
  })
}

export const assessment = (token, projectId, studentId, markerId, remark, assessmentList) => {
  var param = {
    token: token,
    projectId: projectId,
    studentId: studentId,
    markerId: markerId, // actual type: Mark
    remark: remark,
    assessmentList: assessmentList// ArrayList<Assessment>
  }
  return axios.post('/AssessmentServlet', param).then(res => {
    return res.data.mark_ACK
  })
}

export const finalResult = (token, projectId, studentId, finalScore, fianlRemark) => {
  var param = {
    token: token,
    projectId: projectId,
    studentId: studentId,
    finalScore: finalScore,
    finalRemark: fianlRemark
  }
  return axios.post('/FinalResultServlet', param).then(res => {
    return res.data.mark_ACK
  })
}

export const sendEmail = (token, projectId, studentId, sendBoth) => {
  var param = {
    token: token,
    projectId: projectId,
    studentId: studentId,
    sendBoth: sendBoth
  }
  return axios.post('/SendEmailServlet', param).then(res => {
    return res.data.sendMail_ACK
  })
}

export const syncProject = (token, userId) => {
  var param = {
    token: token,
    userId: userId
  }
  return axios.post('/SyncProjectListServlet', param).then(res => {
    return res.data
  })
}
