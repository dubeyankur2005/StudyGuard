const API_BASE_URL = "http://localhost:3000/api";
const TOKEN_KEY = "studyguard_extension_token";
const LEGACY_SETTINGS_KEYS = ["darkMode", "studyMode", "focusMode", "dailyStudyGoal", "weeklyStudyGoal", "reminderTime", "breakReminder", "allowedKeywords", "blockedKeywords", "allowedChannels", "blockedChannels", "trackingEnabled", "updatedAt"];

const storageReady = chrome.storage.local.setAccessLevel
  ? chrome.storage.local.setAccessLevel({ accessLevel: "TRUSTED_CONTEXTS" })
  : Promise.resolve();

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  const handlers = {
    EXTENSION_LOGIN: () => login(message.payload),
    EXTENSION_LOGOUT: logout,
    EXTENSION_SESSION: session,
    VIDEO_TRACKED: () => api("/videos", { method: "POST", body: JSON.stringify(message.payload) }),
    GET_SETTINGS: () => api("/settings"),
    GET_STUDY_MODE: async () => { const result = await api("/settings"); return { ...result, studyMode: result.data?.studyMode }; },
    UPDATE_SETTINGS: async () => {
      const result = await api("/settings", { method: "PUT", body: JSON.stringify(message.payload) });
      if (Object.prototype.hasOwnProperty.call(message.payload || {}, "studyMode")) {
        await broadcastStudyMode(Boolean(result.data?.studyMode));
      }
      return result;
    },
    VIDEO_SUMMARY: () => api("/videos/summary"),
  };
  if (!handlers[message.type]) { sendResponse({ success: false, message: "Unknown request" }); return false; }
  handlers[message.type]().then(sendResponse).catch((error) => sendResponse({ success: false, message: error.message }));
  return true;
});

async function token() {
  await storageReady;
  return (await chrome.storage.local.get(TOKEN_KEY))[TOKEN_KEY];
}
async function logout() {
  await storageReady;
  await chrome.storage.local.remove([TOKEN_KEY, ...LEGACY_SETTINGS_KEYS]);
  return { success: true };
}
async function login(credentials) {
  const result = await request("/auth/login", { method: "POST", body: JSON.stringify(credentials) });
  if (!result.success || !result.data?.token) throw new Error(result.message || "Login failed");
  await storageReady;
  await chrome.storage.local.set({ [TOKEN_KEY]: result.data.token });
  return { success: true, user: result.data.user };
}
async function session() {
  if (!await token()) return { success: true, authenticated: false };
  try { const result = await api("/auth/me"); return { success: true, authenticated: true, user: result.data }; }
  catch { return { success: true, authenticated: false }; }
}
async function api(path, options = {}) {
  const storedToken = await token();
  if (!storedToken) throw new Error("Sign in to your StudyGuard account.");
  try { return await request(path, options, storedToken); }
  catch (error) {
    if (error.status === 401) {
      await logout();
      chrome.runtime.sendMessage({ type: "SESSION_EXPIRED" }, () => void chrome.runtime.lastError);
      throw new Error("Your session expired. Please sign in again.");
    }
    throw error;
  }
}
async function request(path, options = {}, bearer) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(bearer ? { Authorization: `Bearer ${bearer}` } : {}), ...options.headers },
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok || result.success === false) {
    const error = new Error(result.message || `Request failed (${response.status})`);
    error.status = response.status;
    throw error;
  }
  return result;
}

async function broadcastStudyMode(enabled) {
  const tabs = await chrome.tabs.query({ url: "https://www.youtube.com/*" });
  await Promise.all(tabs.map((tab) => tab.id == null ? null : chrome.tabs.sendMessage(
    tab.id,
    { type: "STUDY_MODE_CHANGED", enabled },
  ).catch(() => null)));
}
