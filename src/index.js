"use strict";

const studentService = require('./service/student.service.js');
const getMostRelevantActivity = studentService.getMostRelevantActivity;
const getStudentSample = studentService.getStudentSample;

var myArgs = process.argv.slice(2);
const level = myArgs[0];

// defines students sample depending on level
let studentSample;
switch (level) {
  case '1':
    studentSample = [0,1,2,3,4];
    break;
  case '2':
    studentSample = [5];
    break;
  case '3':
    studentSample = [6,7];
    break;
  default:
    console.log('Please enter level number between 1 and 5');
}

if (level) {
  const students = getStudentSample(studentSample);
  console.log(`-------Level ${level}-------`);
  students.forEach(student => {
    try {
      console.log(`Student ${student.id} : ${student.description}, expected activity id : ${student.expectedActivityId}`);
      const mostRelevantActivity = getMostRelevantActivity(student);

      console.log(`Most relevant activity id : ${mostRelevantActivity}`);
    } catch(error) {
      console.error(error);
    }
  });
}