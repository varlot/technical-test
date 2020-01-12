"use strict";

const activityService = require('./activity.service.js');
const studentDA = require('../data-access/student.js');
const getActivityById = activityService.getActivityById;
const getActivitiesFromNextLowerLevel = activityService.getActivitiesFromNextLowerLevel;
const getActivitiesById = activityService.getActivitiesById;
const getAllActivities = activityService.getAllActivities;
const getStudentByIds = studentDA.getStudentByIds;

exports.getStudentSample = function(studentIds) {
  return getStudentByIds(studentIds);
};

const getLastActivity = function(student) {
  if (student.traces && student.traces.length) {
    return student.traces[student.traces.length -1];
  }
};

const getStudentActivities = function(traces) {
  if (!traces || !traces.length) {
    return [];
  }
  const activityIds = traces.map((trace) => trace.activity_id);
  return getActivitiesById(activityIds);
}

const activitiesWithoutAchieved = function(activities, traces) {
  const studentActivities = getStudentActivities(traces);
  const studentActivitiesIds = studentActivities.map((activity) => activity.id);
  return activities.filter((activity) => !studentActivitiesIds.includes(activity.id))
}

const removeReadingActivity = function(activities) {
  const activitiesWithoutReading = activities.filter((activity) => !(activity.exercise_type == 'reading'));
  if (!activitiesWithoutReading.length) {
    throw 'Sorry, no activity available without microphone';
  }
  return activitiesWithoutReading;
}

const getPoolStudentActivities = function(student) {
  let microphoneHandledActivities = getAllActivities();
  // remove reading activity if student has no microphone
  if (!student.hasOwnProperty('microphone') || !student.microphone) {
    microphoneHandledActivities = removeReadingActivity(microphoneHandledActivities);
  }

  // filter activities by student language
  const activitiesByLanguage = microphoneHandledActivities.filter((activity) => activity.language == student.language);
  return activitiesByLanguage;
}

exports.getMostRelevantActivity = function(student) {
  // filter activities by student language
  let poolStudentActivities = getPoolStudentActivities(student);

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
    // remove achieved activities
    poolStudentActivities = activitiesWithoutAchieved(poolStudentActivities, student.traces);
    // if student has never done any activity, take first activity with the lowest level
    const studentLevel = lastActivity ? getActivityById(lastActivity.activity_id).level : 1;
    const activitiesLowerLevel = getActivitiesFromNextLowerLevel(poolStudentActivities, studentLevel);
    if (activitiesLowerLevel && activitiesLowerLevel.length) {
      // activity with a lower level
      return activitiesLowerLevel[0].id;
    }

    // student achieved activities
    const finishedActivityTraces = student.traces.filter((trace) => trace.score == 1);
    const finishedActivities = getStudentActivities(finishedActivityTraces);

    if (finishedActivities.length) {
      // last achieved activity in traces
      return finishedActivities[finishedActivities.length -1].id;
    }
    throw "Sorry, we can't find any activity for you.";
  }
};
