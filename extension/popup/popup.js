const studyModeToggle = document.getElementById("studyMode");
const focusModeToggle = document.getElementById("focusMode");
const trackingToggle = document.getElementById("trackingEnabled");

const todayStudyTime = document.getElementById("todayStudyTime");
const todayEntertainmentTime = document.getElementById("todayEntertainmentTime");

const dashboardBtn = document.getElementById("dashboardBtn");

// =====================================
// Load Settings
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  loadSettings();
  loadDashboardData();
});

// =====================================
// Get Settings
// =====================================

function loadSettings() {
  chrome.runtime.sendMessage(
    {
      type: "GET_SETTINGS",
    },
    (response) => {
      if (!response.success) return;

      const settings = response.settings;

      studyModeToggle.checked = settings.studyMode;
      focusModeToggle.checked = settings.focusMode;
      trackingToggle.checked = settings.trackingEnabled;
    }
  );
}

// =====================================
// Save Settings
// =====================================

function saveSettings() {
  chrome.runtime.sendMessage({
    type: "UPDATE_SETTINGS",
    payload: {
      studyMode: studyModeToggle.checked,
      focusMode: focusModeToggle.checked,
      trackingEnabled: trackingToggle.checked,
    },
  });
}

studyModeToggle.addEventListener("change", saveSettings);
focusModeToggle.addEventListener("change", saveSettings);
trackingToggle.addEventListener("change", saveSettings);

// =====================================
// Load Today's Stats
// =====================================

async function loadDashboardData() {
  try {
    const response = await fetch(
      "http://localhost:3000/api/videos/summary"
    );

    const result = await response.json();

    if (!result.success) return;

    const data = result.data;

    todayStudyTime.textContent =
      Math.floor(data.totalStudyTime / 60) + " min";

    todayEntertainmentTime.textContent =
      Math.floor(data.totalEntertainmentTime / 60) + " min";
  } catch (error) {
    console.error(error);
  }
}

// =====================================
// Dashboard
// =====================================

dashboardBtn.addEventListener("click", () => {
  chrome.tabs.create({
    url: "http://localhost:5173",
  });
});