const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs/promises");
const path = require("node:path");
const { randomBytes } = require("node:crypto");
process.env.JWT_SECRET = "studyguard-test-secret-that-is-long-enough-32";
process.env.JWT_EXPIRE = "1h";

const app = require("../src/app");
const User = require("../src/models/user.model");
const { Video } = require("../src/models/video.model");
let server;
let base;
const originals = {};
const account = { _id: "507f1f77bcf86cd799439011", name: "Test User", email: "test@example.com", password: "secret-hash" };

before(async () => {
  originals.findOne = User.findOne;
  originals.create = User.create;
  originals.findById = User.findById;
  User.findOne = (query) => ({ select: async () => query.email === account.email ? { ...account, comparePassword: async (password) => password === "long-password" } : null, then(resolve, reject) { return Promise.resolve(null).then(resolve, reject); } });
  User.create = async (data) => ({ ...account, name: data.name, email: data.email, _id: account._id });
  User.findById = async (id) => id === account._id ? { ...account } : null;
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  base = `http://127.0.0.1:${server.address().port}/api`;
});

after(async () => {
  User.findOne = originals.findOne;
  User.create = originals.create;
  User.findById = originals.findById;
  await new Promise((resolve) => server.close(resolve));
});

test("registration validates input and omits password hashes", async () => {
  const invalid = await fetch(`${base}/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "bad", password: "x" }) });
  assert.equal(invalid.status, 400);
  const response = await fetch(`${base}/auth/register`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: "Test User", email: "test@example.com", password: "long-password" }) });
  assert.equal(response.status, 201);
  const body = await response.json();
  assert.ok(body.data.token);
  assert.equal(body.data.user.password, undefined);
});

test("login, /me and protected endpoints require valid authentication", async () => {
  const login = await fetch(`${base}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "test@example.com", password: "long-password" }) });
  assert.equal(login.status, 200);
  const { data } = await login.json();
  assert.equal(data.user.password, undefined);
  const me = await fetch(`${base}/auth/me`, { headers: { Authorization: `Bearer ${data.token}` } });
  assert.equal(me.status, 200);
  assert.equal((await me.json()).data.email, account.email);
  assert.equal((await fetch(`${base}/auth/me`, { headers: { Authorization: "Bearer invalid" } })).status, 401);
  assert.equal((await fetch(`${base}/auth/me`)).status, 401);
  assert.equal((await fetch(`${base}/videos`)).status, 401);
  assert.equal((await fetch(`${base}/videos`, { headers: { Authorization: "Bearer garbage" } })).status, 401);
});

test("every private API route rejects requests without a token", async () => {
  const routes = [
    ["GET", "/videos"], ["GET", "/videos/summary"], ["GET", "/videos/507f1f77bcf86cd799439012"],
    ["POST", "/videos"], ["PUT", "/videos/507f1f77bcf86cd799439012"], ["DELETE", "/videos/507f1f77bcf86cd799439012"],
    ...["", "/daily", "/weekly", "/monthly", "/top-subjects"].map((path) => ["GET", `/analytics${path}`]),
    ["GET", "/goals"], ["POST", "/goals"], ["PUT", "/goals/1"], ["DELETE", "/goals/1"],
    ["GET", "/settings"], ["PUT", "/settings"],
    ["GET", "/reports/weekly"], ["GET", "/reports/export/csv"], ["GET", "/reports/export/pdf"],
    ["GET", "/study-mode/status"],
  ];
  for (const [method, route] of routes) {
    const response = await fetch(`${base}${route}`, { method });
    assert.equal(response.status, 401, `${method} ${route} must require a token`);
  }
});

test("goal and settings files remain isolated by owner", async () => {
  const ownerA = randomBytes(12).toString("hex");
  const ownerB = randomBytes(12).toString("hex");
  const dataDir = path.join(__dirname, "../src/data/users");
  const paths = [
    path.join(dataDir, `${ownerA}-goals.json`), path.join(dataDir, `${ownerB}-goals.json`),
    path.join(dataDir, `${ownerA}-settings.json`), path.join(dataDir, `${ownerB}-settings.json`),
  ];
  const goals = require("../src/models/goal.model");
  const settings = require("../src/models/settings.model");
  try {
    await goals.saveGoals(ownerA, [{ id: 1, title: "A private goal" }]);
    await goals.saveGoals(ownerB, [{ id: 1, title: "B private goal" }]);
    await settings.saveSettings(ownerA, { studyMode: true });
    await settings.saveSettings(ownerB, { studyMode: false });
    assert.equal((await goals.getGoals(ownerA))[0].title, "A private goal");
    assert.equal((await goals.getGoals(ownerB))[0].title, "B private goal");
    assert.equal((await settings.getSettings(ownerA)).studyMode, true);
    assert.equal((await settings.getSettings(ownerB)).studyMode, false);
  } finally {
    await Promise.all(paths.map((file) => fs.unlink(file).catch((error) => { if (error.code !== "ENOENT") throw error; })));
  }
});

test("analytics, reports and Study Mode pass the authenticated owner into every data query", async () => {
  const owner = "507f1f77bcf86cd799439011";
  const videoModel = require("../src/models/video.model");
  const analytics = require("../src/services/analytics.service");
  const reports = require("../src/services/report.service");
  const studyMode = require("../src/services/studyModeService");
  const settings = require("../src/services/settings.service");
  const originalVideos = videoModel.getAllVideos;
  const originalSettings = settings.getSettings;
  const owners = [];
  videoModel.getAllVideos = async (requestedOwner) => { owners.push(requestedOwner); return []; };
  settings.getSettings = async (requestedOwner) => { owners.push(requestedOwner); return { studyMode: true }; };
  try {
    await analytics.getDashboardAnalytics(owner);
    await analytics.getDailyAnalytics(owner);
    await analytics.getWeeklyAnalytics(owner);
    await analytics.getMonthlyAnalytics(owner);
    await analytics.getTopSubjects(owner);
    await reports.getWeeklyReport(owner);
    await reports.exportCSV(owner);
    await reports.exportPDF(owner);
    await studyMode.getStudyModeStatusService(owner);
    assert.equal(owners.length, 10);
    assert.ok(owners.every((requestedOwner) => requestedOwner === owner));
  } finally {
    videoModel.getAllVideos = originalVideos;
    settings.getSettings = originalSettings;
  }
});

test("JWT configuration rejects missing-strength secrets and malformed expiry", () => {
  const { validateJwtConfig } = require("../src/utils/generateToken");
  const previousSecret = process.env.JWT_SECRET;
  const previousExpiry = process.env.JWT_EXPIRE;
  process.env.JWT_SECRET = "short";
  assert.throws(() => validateJwtConfig());
  process.env.JWT_SECRET = "studyguard-test-secret-that-is-long-enough-32";
  process.env.JWT_EXPIRE = "forever";
  assert.throws(() => validateJwtConfig());
  process.env.JWT_SECRET = previousSecret;
  process.env.JWT_EXPIRE = previousExpiry;
});

test("video data access is always constrained by authenticated owner", async () => {
  const accountB = "507f1f77bcf86cd799439022";
  const row = { _id: "507f1f77bcf86cd799439012", owner: accountB, title: "Private video" };
  const token = require("../src/utils/generateToken")(account._id);
  const oldList = Video.find;
  Video.find = (query) => ({ sort: async () => query.owner === account._id ? [] : [row] });
  const oldFind = Video.findOne;
  const oldUpdate = Video.findOneAndUpdate;
  const oldDelete = Video.findOneAndDelete;
  Video.findOne = async (query) => query.owner === row.owner ? row : null;
  Video.findOneAndUpdate = async (query) => query.owner === row.owner ? row : null;
  Video.findOneAndDelete = async (query) => query.owner === row.owner ? row : null;
  try {
    const headers = { Authorization: `Bearer ${token}` };
    const list = await fetch(`${base}/videos`, { headers });
    assert.deepEqual((await list.json()).data, []);
    assert.equal((await fetch(`${base}/videos/${row._id}`, { headers })).status, 404);
    assert.equal((await fetch(`${base}/videos/${row._id}`, { method: "PUT", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify({ title: "Changed" }) })).status, 404);
    assert.equal((await fetch(`${base}/videos/${row._id}`, { method: "DELETE", headers })).status, 404);
    assert.equal(row.title, "Private video");
  } finally {
    Video.findOne = oldFind;
    Video.find = oldList;
    Video.findOneAndUpdate = oldUpdate;
    Video.findOneAndDelete = oldDelete;
  }
});
