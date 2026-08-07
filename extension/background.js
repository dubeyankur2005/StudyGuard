console.log("StudyGuard Background Service Worker Started");

// ======================================
// API URL
// ======================================

const API_BASE_URL = "http://localhost:3000/api";

// ======================================
// Extension Installed
// ======================================

chrome.runtime.onInstalled.addListener(async () => {

  console.log("StudyGuard Installed");

  await syncSettingsFromBackend();

});

// ======================================
// Message Listener
// ======================================

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

  switch (message.type) {

    case "VIDEO_TRACKED":

      saveVideo(message.payload, sendResponse);

      return true;

    case "GET_SETTINGS":

      getSettings(sendResponse);

      return true;

    case "GET_STUDY_MODE":

      getStudyMode(sendResponse);

      return true;

    case "UPDATE_SETTINGS":

      updateSettings(message.payload, sendResponse);

      return true;

    default:

      sendResponse({
        success: false,
        message: "Unknown message type",
      });

      return true;

  }

});

// ======================================
// Sync Settings From Backend
// ======================================

async function syncSettingsFromBackend() {

  try {

    const response = await fetch(
      `${API_BASE_URL}/settings`
    );

    const result = await response.json();

    if (!result.success) return;

    await chrome.storage.local.set(result.data);

    console.log("Settings Synced From Backend");

  } catch (error) {

    console.error(
      "Settings Sync Failed:",
      error
    );

  }

}

// ======================================
// Get Settings
// ======================================

async function getSettings(sendResponse) {

  try {

    const response = await fetch(
      `${API_BASE_URL}/settings`
    );

    const result = await response.json();

    if (result.success) {

      await chrome.storage.local.set(result.data);

    }

    sendResponse(result);

  } catch (error) {

    sendResponse({
      success: false,
      message: error.message,
    });

  }

}

// ======================================
// Get Study Mode
// ======================================

async function getStudyMode(sendResponse) {

  console.log("GET_STUDY_MODE called");

  try {

    const response = await fetch(
      `${API_BASE_URL}/settings`
    );

    const result = await response.json();

    sendResponse({
      success: true,
      studyMode: result.data.studyMode,
    });

  } catch (error) {

    console.error(error);

    sendResponse({
      success: false,
      message: error.message,
    });

  }

}

// ======================================
// Update Settings
// ======================================

async function updateSettings(settings, sendResponse) {

  try {

    const response = await fetch(
      `${API_BASE_URL}/settings`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(settings),
      }
    );

    const result = await response.json();

    if (result.success) {

      await chrome.storage.local.set(result.data);

      console.log("Settings Updated");

    }

    sendResponse(result);

  } catch (error) {

    sendResponse({
      success: false,
      message: error.message,
    });

  }

}

// ======================================
// Save Video
// ======================================

async function saveVideo(videoData, sendResponse) {

  try {

    const response = await fetch(
      `${API_BASE_URL}/videos`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(videoData),
      }
    );

    const data = await response.json();

    sendResponse({
      success: true,
      data,
    });

  } catch (error) {

    console.error(error);

    sendResponse({
      success: false,
      message: error.message,
    });

  }

}