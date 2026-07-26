const express = require("express");
const router = express.Router();

const {
  getWeeklyReport,
  exportCSV,
  exportPDF
} = require("../controllers/report.controller");

router.get("/weekly", getWeeklyReport);
router.get("/export/csv", exportCSV);
router.get("/export/pdf", exportPDF);

module.exports = router;