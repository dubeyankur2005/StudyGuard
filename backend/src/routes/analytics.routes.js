const express = require("express");
const router = express.Router();
router.use(require("../middlewares/authMiddleware"));

const {
  getDashboardAnalytics,
  getDailyAnalytics,
  getWeeklyAnalytics,
  getMonthlyAnalytics,
  getTopSubjects,
} = require("../controllers/analytics.controller");

router.get("/", getDashboardAnalytics);
router.get("/daily", getDailyAnalytics);
router.get("/weekly", getWeeklyAnalytics);
router.get("/monthly", getMonthlyAnalytics);
router.get("/top-subjects", getTopSubjects);

module.exports = router;
