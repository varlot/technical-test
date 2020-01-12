"use strict";

const activities = require('../data/activities.json');

const getAllActivities = function() {
  return activities;
}

const getActivityById = function(id) {
  return getAllActivities().find((activity) => activity.id == id);
}

exports.getActivityById = getActivityById;

exports.getActivitiesById = function(ids) {
  return ids.map((id) => getActivityById(id))
}

exports.getActivitiesByLanguage = function(language) {
  return getAllActivities().filter((activity) => activity.language == language);
};
