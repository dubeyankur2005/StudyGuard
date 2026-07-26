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

const getSettings = async () => {
  let settings = await settingsModel.getSettings();

  if (!settings || Object.keys(settings).length === 0) {
    await settingsModel.saveSettings(defaultSettings);
    settings = defaultSettings;
  }

  return settings;
};

const updateSettings = async (updatedSettings) => {
  const currentSettings = await getSettings();

  const newSettings = {
    ...currentSettings,
    ...updatedSettings,
    updatedAt: new Date().toISOString()
  };

  await settingsModel.saveSettings(newSettings);

  return newSettings;
};

module.exports = {
  getSettings,
  updateSettings
};