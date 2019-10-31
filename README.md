# RapidFeedback Webapp

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## What's in localStorage

We save all the response data from backend to the localStorage. They are token, firstName (actually, it's the full name. We have no idea why the previous students using this name) and projectList. Also we store the email/username to the localStorage.

## The structure of the projectList

```json

{
     "assistant ": [],
     "commentList ": [],
     "criteria ": [
          {
               "markIncrement ": "",
               "maximunMark ": 0,
               "name ": "",
               "subsectionList ": [],
               "weighting ": 0
          }
     ],
     "description ": " ",
     "durationMin ": , // int
     "durationSec ": , // int
     "projectName ": "",
     "studentInfo ": [
          {
               "email ": "",
               "firstName ": "",
               "group ": , //int
               "middleName ": "",
               "number ": "",
               "sendEmail ": false, //boolean
               "surname ": "",
               "totalMark ": -999 // int
          }
     ],
     "subjectCode ": "",
     "subjectName ": "",
     "username ": "",
     "warningMin ": 0, // int
     "warningSec ": 0 // int
}

```

## The structure of mark

```json

{
    "commentList  ": [],
    "criteriaList  ": [
        {
            "maximunMark  ": 3,
            "name  ": "criterion 1  ",
            "subsectionList  ": [
                {
                    "name  ": "test  ",
                    "shortTextList  ": [
                        {
                            "grade  ": 3,
                            "longtext  ": [
                                "longtest  "
                            ],
                            "name  ": "shorttest  "
                        }
                    ]
                }
            ],
            "weighting  ": 0
        },
        {
            "maximunMark  ": 3,
            "name  ": "Presentation Structure  ",
            "subsectionList  ": [
                {
                    "name  ": "Introduction General  ",
                    "shortTextList  ": [
                        {
                            "grade  ": 2,
                            "longtext  ": [
                                "It's important to start any presentation well. You need to speak loudly and clearly and to address the audience. This means facing them and making eye contact when possible.  "
                            ],
                            "name  ": "General introductory comment  "
                        }
                    ]
                },
                {
                    "name  ": "Introduction  ",
                    "shortTextList  ": [
                        {
                            "grade  ": 2,
                            "longtext  ": [
                                "There's no need to apologise for being nervous. People will usually accept that you are and will not think badly of you.  "
                            ],
                            "name  ": "Don't apologise for nerves  "
                        }
                    ]
                },
                {
                    "name  ": "Main Body of the Presentation  ",
                    "shortTextList  ": [
                        {
                            "grade  ": 3,
                            "longtext  ": [
                                "I liked your presentation because it was well structured. It had a definite introduction, main section and a useful set of conclusions.  "
                            ],
                            "name  ": "Well structured presentation  "
                        }
                    ]
                },
                {
                    "name  ": "Conclusions  ",
                    "shortTextList  ": [
                        {
                            "grade  ": 3,
                            "longtext  ": [
                                "You wrapped up the presentation very well.  "
                            ],
                            "name  ": "Presentation well wrapped up  "
                        }
                    ]
                },
                {
                    "name  ": "Presentation Length  ",
                    "shortTextList  ": [
                        {
                            "grade  ": 3,
                            "longtext  ": [
                                "Your presentation ran the right length of time. It can be difficult to judge length like this but you did a good job.  "
                            ],
                            "name  ": "Presentation correct length  "
                        }
                    ]
                }
            ],
            "weighting  ": 0
        }
    ],
    "lecturerEmail  ": "yuqielu23@gmail.com  ",
    "lecturerName  ": "??  ?  ",
    "markList  ": [
        3,
        3
    ],
    "totalMark  ": 100
}

```

> The default criteria list is in assets folder

## Build

The production will be stored in the  fold /dist. To connect the back-end server, you can set the ip/url of the server in file "api.js".

```javascript
const instance = axios.create({
  timeout: 10000,
  baseURL: , //set url here
  // baseURL: 'http://localhost:8080/RapidFeedback',
  crossDomain: true,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})
```
