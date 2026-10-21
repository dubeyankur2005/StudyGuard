const express = require("express");
const router = express.Router();
router.use(require("../middlewares/authMiddleware"));

const {
  getSettings,
  updateSettings
} = require("../controllers/settings.controller");

router.get("/", getSettings);
router.put("/", updateSettings);

module.exports = router;
