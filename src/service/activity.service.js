"use strict";

const activityDA = require('../data-access/activity.js');

exports.getActivitiesFromNextLowerLevel = function(activities, level) {
  // if level's the lowest, return no activity
  if (!activities || !activities.length || !level) {
    return [];
  }
  return activities.filter((activity) => activity.level == (level - 1));
};

exports.getAllActivities = function(id) {
  return activityDA.getAllActivities();
}

exports.getActivityById = function(id) {
  return activityDA.getActivityById(id);
}

exports.getActivitiesById = function(ids) {
  return activityDA.getActivitiesById(ids);
}