const express = require("express");

const router = express.Router();
router.use(require("../middlewares/authMiddleware"));

const {
  getStudyModeStatus,
} = require("../controllers/studyModeController");

router.get(
  "/status",
  getStudyModeStatus
);

module.exports = router;
