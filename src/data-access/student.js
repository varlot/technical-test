"use strict";

const students = require('../data/students.json');

const getAllStudents = function() {
  return students;
}

exports.getStudentByIds = function(ids) {
  return getAllStudents().filter((student) => ids.includes(student.id));
}