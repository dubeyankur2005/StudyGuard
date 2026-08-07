const studyModeToggle = document.getElementById("studyMode");
const trackingToggle = document.getElementById("trackingEnabled");

const todayStudyTime = document.getElementById("todayStudyTime");
const todayEntertainmentTime = document.getElementById("todayEntertainmentTime");

const dashboardBtn = document.getElementById("dashboardBtn");
const settingsBtn = document.getElementById("settingsBtn");

// =====================================
// Initial Load
// =====================================

document.addEventListener("DOMContentLoaded", () => {
  loadSettings();
  loadDashboardData();
});

// =====================================
// Load Settings
// =====================================

function loadSettings() {
  chrome.runtime.sendMessage(
    {
      type: "GET_SETTINGS",
    },
    (response) => {
      if (!response || !response.success) return;

      const settings = response.settings;

      studyModeToggle.checked = settings.studyMode ?? false;
      trackingToggle.checked = settings.trackingEnabled ?? true;
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
      trackingEnabled: trackingToggle.checked,
    },
  });
}

studyModeToggle.addEventListener("change", saveSettings);
trackingToggle.addEventListener("change", saveSettings);

// =====================================
// Load Today's Statistics
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
    console.error("Failed to load dashboard data:", error);
  }
}

// =====================================
// Open Dashboard
// =====================================

dashboardBtn.addEventListener("click", () => {
  chrome.tabs.create({
    url: "http://localhost:5173",
  });
});

// =====================================
// Open Settings Page
// =====================================

settingsBtn.addEventListener("click", () => {
  chrome.runtime.openOptionsPage();
});