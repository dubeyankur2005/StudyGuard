const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");
router.use(protect);

const {
  getAllVideos,
  getVideoById,
  addVideo,
  updateVideo,
  deleteVideo,
  getSummary
} = require("../controllers/video.controller");

router.get("/", getAllVideos);
router.get("/summary", getSummary);
router.get("/:id", getVideoById);

router.post("/", addVideo);

router.put("/:id", updateVideo);

router.delete("/:id", deleteVideo);

module.exports = router;
