const express = require("express");

const router = express.Router();

const {
  getStudyModeStatus,
} = require("../controllers/studyModeController");

router.get(
  "/status",
  getStudyModeStatus
);

module.exports = router;