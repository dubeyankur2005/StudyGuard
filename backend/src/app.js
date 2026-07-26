const express = require("express");
const cors = require("cors");

const studyModeRoutes = require("./routes/studyModeRoutes");

const videoRoutes = require("./routes/video.routes");
const analyticsRoutes = require("./routes/analytics.routes");
const goalRoutes = require("./routes/goal.routes");
const settingsRoutes = require("./routes/settings.routes");
const reportRoutes = require("./routes/report.routes");

const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "StudyGuard Backend Running 🚀",
  });
});

app.use("/api/videos", videoRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/goals", goalRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/study-mode", studyModeRoutes);

app.use(errorHandler);

module.exports = app;