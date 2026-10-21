const studyModeToggle = document.getElementById("studyMode");
const trackingToggle = document.getElementById("trackingEnabled");
const todayStudyTime = document.getElementById("todayStudyTime");
const todayEntertainmentTime = document.getElementById("todayEntertainmentTime");
const dashboardBtn = document.getElementById("dashboardBtn");
const settingsBtn = document.getElementById("settingsBtn");
const authPanel = document.getElementById("authPanel");
const accountPanel = document.getElementById("accountPanel");
const authStatus = document.getElementById("authStatus");
const settingsStatus = document.getElementById("settingsStatus");
const loginBtn = document.getElementById("loginBtn");
const send = (type, payload) => new Promise((resolve) => chrome.runtime.sendMessage({ type, payload }, resolve));

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "SESSION_EXPIRED") {
    authPanel.hidden = false;
    accountPanel.hidden = true;
    studyModeToggle.disabled = true;
    trackingToggle.disabled = true;
    authStatus.textContent = "Your session expired. Sign in again.";
    authStatus.classList.add("is-error");
  }
});

async function refreshSession() {
  const result = await send("EXTENSION_SESSION");
  const authenticated = Boolean(result?.authenticated);
  authPanel.hidden = authenticated;
  accountPanel.hidden = !authenticated;
  studyModeToggle.disabled = !authenticated;
  trackingToggle.disabled = !authenticated;
  if (authenticated) {
    document.getElementById("accountEmail").textContent = result.user.email;
    loadSettings();
    loadDashboardData();
  }
}

document.getElementById("loginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  loginBtn.disabled = true;
  loginBtn.querySelector("span").textContent = "Signing in...";
  authStatus.classList.remove("is-error");
  authStatus.textContent = "";
  try {
    const result = await send("EXTENSION_LOGIN", {
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value,
    });
    if (!result?.success) throw new Error(result?.message || "Unable to sign in. Try again.");
    document.getElementById("loginPassword").value = "";
    authStatus.textContent = "Signed in successfully.";
    await refreshSession();
  } catch (error) {
    authStatus.classList.add("is-error");
    authStatus.textContent = error.message || "Unable to sign in. Try again.";
  } finally {
    loginBtn.disabled = false;
    loginBtn.querySelector("span").textContent = "Sign in";
  }
});

document.getElementById("logoutBtn").addEventListener("click", async () => {
  await send("EXTENSION_LOGOUT");
  authStatus.textContent = "Signed out.";
  await refreshSession();
});

document.addEventListener("DOMContentLoaded", refreshSession);

function loadSettings() {
  chrome.runtime.sendMessage({ type: "GET_SETTINGS" }, (response) => {
    if (chrome.runtime.lastError || !response?.success) return;
    studyModeToggle.checked = response.data.studyMode ?? false;
    trackingToggle.checked = response.data.trackingEnabled ?? true;
  });
}

function saveSettings() {
  chrome.runtime.sendMessage({
    type: "UPDATE_SETTINGS",
    payload: { studyMode: studyModeToggle.checked, trackingEnabled: trackingToggle.checked },
  }, (response) => {
    if (chrome.runtime.lastError || !response?.success) {
      settingsStatus.textContent = response?.message || "Could not save settings.";
      settingsStatus.classList.add("is-error");
      return;
    }
    settingsStatus.classList.remove("is-error");
    settingsStatus.textContent = "Settings synced.";
    setTimeout(() => { settingsStatus.textContent = ""; }, 2200);
  });
}

studyModeToggle.addEventListener("change", saveSettings);
trackingToggle.addEventListener("change", saveSettings);

async function loadDashboardData() {
  try {
    const result = await send("VIDEO_SUMMARY");
    if (!result?.success) return;
    todayStudyTime.textContent = `${Math.floor(result.data.totalStudyTime / 60)} min`;
    todayEntertainmentTime.textContent = `${Math.floor(result.data.totalEntertainmentTime / 60)} min`;
  } catch (error) {
    console.error("Failed to load dashboard data:", error.message);
  }
}

dashboardBtn.addEventListener("click", () => {
  chrome.tabs.create({ url: "http://localhost:5173" });
});

settingsBtn.addEventListener("click", () => chrome.runtime.openOptionsPage());
