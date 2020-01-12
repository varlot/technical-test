"use strict";

const activityService = require('./activity.service.js');
const studentDA = require('../data-access/student.js');
const getActivityById = activityService.getActivityById;
const getActivitiesByLanguage = activityService.getActivitiesByLanguage;
const getActivitiesFromNextLowerLevel = activityService.getActivitiesFromNextLowerLevel;
const getActivitiesById = activityService.getActivitiesById;
const getStudentByIds = studentDA.getStudentByIds;

exports.getStudentSample = function(studentIds) {
  return getStudentByIds(studentIds);
};

const getLastActivity = function(student) {
  if (student.traces && student.traces.length) {
    return student.traces[student.traces.length -1];
  }
};

exports.getMostRelevantActivity = function(student) {
  // filter activities by student language
  const poolStudentActivities = getActivitiesByLanguage(student.language);

  if (!poolStudentActivities.length) {
    throw 'No activities available for student';
  }

  const lastActivity = getLastActivity(student);

  // if student perfectly achieved last activity
  if (lastActivity && lastActivity.score == 1) {
    const indexLastActivity = poolStudentActivities.findIndex((activity) => { return activity.id == lastActivity.activity_id });
    // check if last activity is not the final activity and take next in line
    if (indexLastActivity < poolStudentActivities.length - 1) {
      return poolStudentActivities[indexLastActivity + 1].id;
    }
    // last activity is the final one
    throw 'You did the final activity of the list, congrats!';
  }
  else {
    // if student has never done any activity, take first activity with the lowest level
    const studentLevel = lastActivity ? getActivityById(lastActivity.activity_id).level : 1;
    const activitiesLowerLevel = getActivitiesFromNextLowerLevel(poolStudentActivities, studentLevel);
    if (activitiesLowerLevel && activitiesLowerLevel.length) {
      // activity with a lower level
      return activitiesLowerLevel[0].id;
    }

    // student achieved activities
    const finishedActivityIds = student.traces
      .filter((trace) => trace.score == 1)
      .map((trace) => trace.activity_id);
    const finishedActivities = getActivitiesById(finishedActivityIds);

    if (finishedActivities.length) {
      // last achieved activity in traces
      return finishedActivities[finishedActivities.length -1].id;
    }
    throw "Sorry, we can't find any activity for you.";
  }
};
