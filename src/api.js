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
  return axios.post('/AddStudentServlet', param).then(res => {
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

export const assessmentTime = param => {
  return axios.post('/UpdateProject_Time_Servlet', param).then(res => {
    return res.data
  })
}

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

// TODO: check axios.delete method
export const deleteAssessor = param => {
  return axios.delete('/InviteAssessorServlet', param).then(res => {
    return res.data
  })
}

// seems to be deleted in api
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

export const assessment = param => {
  return axios.post('/AssessmentServlet', param).then(res => {
    return res.data
  })
}

export const finalResult = param => {
  return axios.post('/FinalResultServlet', param).then(res => {
    return res.data
  })
}

export const syncProject = param => {
  return axios.post('/SyncProjectListServlet', param).then(res => {
    return res.data
  })
}

// {
//   "assistant ": [], // usernames
//   "commentList ": [],
//   "criteria ": [
//        {
//             "markIncrement ": "null",
//             "maximunMark ": 0,
//             "name ": "",
//             "subsectionList ": [],
//             "weighting ": 0
//        }
//   ],
//   "description ": " ",
//   "durationMin ": , // int
//   "durationSec ": , // int
//   "projectName ": "",
//   "studentInfo ": [
//        {
//             "email ": "",
//             "firstName ": "",
//             "group ": , //int
//             "middleName ": "",
//             "number ": "",
//             "sendEmail ": false, boolean
//             "surname ": "",
//             "totalMark ": -999 // int
//        }
//   ],
//   "subjectCode ": "",
//   "subjectName ": "",
//   "username ": "",
//   "warningMin ": 0, // int
//   "warningSec ": 0 // int
// }

// {
//   "commentList  ": [],
//   "criteriaList  ": [
//       {
//           "maximunMark  ": 3,
//           "name  ": "criterion 1  ",
//           "subsectionList  ": [
//               {
//                   "name  ": "test  ",
//                   "shortTextList  ": [
//                       {
//                           "grade  ": 3,
//                           "longtext  ": [
//                               "longtest  "
//                           ],
//                           "name  ": "shorttest  "
//                       }
//                   ]
//               }
//           ],
//           "weighting  ": 0
//       },
//       {
//           "maximunMark  ": 3,
//           "name  ": "Presentation Structure  ",
//           "subsectionList  ": [
//               {
//                   "name  ": "Introduction General  ",
//                   "shortTextList  ": [
//                       {
//                           "grade  ": 2,
//                           "longtext  ": [
//                               "It's important to start any presentation well. You need to speak loudly and clearly and to address the audience. This means facing them and making eye contact when possible.  "
//                           ],
//                           "name  ": "General introductory comment  "
//                       }
//                   ]
//               },
//               {
//                   "name  ": "Introduction  ",
//                   "shortTextList  ": [
//                       {
//                           "grade  ": 2,
//                           "longtext  ": [
//                               "There's no need to apologise for being nervous. People will usually accept that you are and will not think badly of you.  "
//                           ],
//                           "name  ": "Don't apologise for nerves  "
//                       }
//                   ]
//               },
//               {
//                   "name  ": "Main Body of the Presentation  ",
//                   "shortTextList  ": [
//                       {
//                           "grade  ": 3,
//                           "longtext  ": [
//                               "I liked your presentation because it was well structured. It had a definite introduction, main section and a useful set of conclusions.  "
//                           ],
//                           "name  ": "Well structured presentation  "
//                       }
//                   ]
//               },
//               {
//                   "name  ": "Conclusions  ",
//                   "shortTextList  ": [
//                       {
//                           "grade  ": 3,
//                           "longtext  ": [
//                               "You wrapped up the presentation very well.  "
//                           ],
//                           "name  ": "Presentation well wrapped up  "
//                       }
//                   ]
//               },
//               {
//                   "name  ": "Presentation Length  ",
//                   "shortTextList  ": [
//                       {
//                           "grade  ": 3,
//                           "longtext  ": [
//                               "Your presentation ran the right length of time. It can be difficult to judge length like this but you did a good job.  "
//                           ],
//                           "name  ": "Presentation correct length  "
//                       }
//                   ]
//               }
//           ],
//           "weighting  ": 0
//       }
//   ],
//   "lecturerEmail  ": "yuqielu23@gmail.com  ",
//   "lecturerName  ": "??  ?  ",
//   "markList  ": [
//       3,
//       3
//   ],
//   "totalMark  ": 100
// }
