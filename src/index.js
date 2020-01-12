"use strict";

const activityService = require('./service/activity.service.js');
const studentService = require('./service/student.service.js');
const getMostRelevantActivity = activityService.getMostRelevantActivity;
const getStudentSample = studentService.getStudentSample;

var myArgs = process.argv.slice(2);
const level = myArgs[0];

// defines students sample depending on level
let studentSample;
switch (level) {
  case '1':
    studentSample = [];
    break;
  case '2':
    studentSample = [];
    break;
  case '3':
    studentSample = [];
    break;
  default:
    console.log('Please enter level number between 1 and 5');
}

if (level) {
  const students = getStudentSample(studentSample);
  console.log(`-------Level ${level}-------`);
  students.forEach(student => {
    try {
      const mostRelevantActivity = getMostRelevantActivity(student);
      console.log(`Student ${student.id} : ${student.description},
        expected activity id : ${student.expectedActivityId},
        most relevant activity id : ${mostRelevantActivity}`);
    } catch(error) {
      console.error(error);
    }
  });
}