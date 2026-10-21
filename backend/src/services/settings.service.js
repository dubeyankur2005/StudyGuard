const settingsModel = require("../models/settings.model");

const defaultSettings = {
  darkMode: false,
  studyMode: false,
  focusMode: false,

  dailyStudyGoal: 180,
  weeklyStudyGoal: 1260,

  reminderTime: "18:00",
  breakReminder: 45,

  allowedKeywords: [
    "java",
    "javascript",
    "react",
    "node",
    "express",
    "mongodb",
    "dsa",
    "python",
    "sql",
    "tutorial",
    "course",
    "lecture"
  ],

  blockedKeywords: [],

  allowedChannels: [],

  blockedChannels: []
};

const getSettings = async (owner) => {
  let settings = await settingsModel.getSettings(owner);

  if (!settings || Object.keys(settings).length === 0) {
    await settingsModel.saveSettings(owner, defaultSettings);
    settings = defaultSettings;
  }

  return settings;
};

const updateSettings = async (owner, updatedSettings) => {
  const currentSettings = await getSettings(owner);
  const safeSettings = { ...updatedSettings };
  delete safeSettings.owner;
  delete safeSettings._id;

  const newSettings = {
    ...currentSettings,
    ...safeSettings,
    updatedAt: new Date().toISOString()
  };

  await settingsModel.saveSettings(owner, newSettings);

  return newSettings;
};

module.exports = {
  getSettings,
  updateSettings
};
