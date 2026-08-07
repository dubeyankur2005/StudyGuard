const studyMode = document.getElementById("studyMode");
const tracking = document.getElementById("tracking");

const dailyGoal = document.getElementById("dailyGoal");
const weeklyGoal = document.getElementById("weeklyGoal");

const allowedKeywords = document.getElementById("allowedKeywords");
const blockedKeywords = document.getElementById("blockedKeywords");

const allowedChannels = document.getElementById("allowedChannels");
const blockedChannels = document.getElementById("blockedChannels");

const saveBtn = document.getElementById("saveBtn");
const status = document.getElementById("status");

// ======================================
// Initial Load
// ======================================

document.addEventListener("DOMContentLoaded", () => {
  loadSettings();
});

// ======================================
// Load Settings
// ======================================

async function loadSettings() {
  try {
    const response = await fetch(
      "http://localhost:3000/api/settings"
    );

    const result = await response.json();

    if (!result.success) return;

    const settings = result.data;

    studyMode.checked = settings.studyMode ?? false;
    tracking.checked = settings.trackingEnabled ?? true;

    dailyGoal.value = settings.dailyStudyGoal ?? "";
    weeklyGoal.value = settings.weeklyStudyGoal ?? "";

    allowedKeywords.value = (settings.allowedKeywords || []).join(", ");

    blockedKeywords.value = (settings.blockedKeywords || []).join(", ");

    allowedChannels.value = (settings.allowedChannels || []).join(", ");

    blockedChannels.value = (settings.blockedChannels || []).join(", ");
  } catch (error) {
    console.error("Failed to load settings:", error);

    status.textContent = "Failed to load settings.";
  }
}

// ======================================
// Save Settings
// ======================================

saveBtn.addEventListener("click", saveSettings);

async function saveSettings() {
  const settings = {
    studyMode: studyMode.checked,

    trackingEnabled: tracking.checked,

    dailyStudyGoal: Number(dailyGoal.value) || 0,

    weeklyStudyGoal: Number(weeklyGoal.value) || 0,

    allowedKeywords: allowedKeywords.value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),

    blockedKeywords: blockedKeywords.value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),

    allowedChannels: allowedChannels.value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),

    blockedChannels: blockedChannels.value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
  };

  try {
    const response = await fetch(
      "http://localhost:3000/api/settings",
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
      status.textContent = "Settings saved successfully.";

      setTimeout(() => {
        status.textContent = "";
      }, 3000);
    } else {
      status.textContent = "Failed to save settings.";
    }
  } catch (error) {
    console.error("Failed to save settings:", error);

    status.textContent = "Failed to save settings.";
  }
}