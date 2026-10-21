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
const send = (type, payload) => new Promise((resolve) => chrome.runtime.sendMessage({ type, payload }, resolve));

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
    const result = await send("GET_SETTINGS");
    if (!result?.success && result?.message) { status.textContent = result.message; return; }

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
    const result = await send("UPDATE_SETTINGS", settings);

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
