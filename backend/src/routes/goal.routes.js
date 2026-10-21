const express = require("express");
const router = express.Router();
router.use(require("../middlewares/authMiddleware"));

const {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal
} = require("../controllers/goal.controller");

router.get("/", getGoals);
router.post("/", createGoal);
router.put("/:id", updateGoal);
router.delete("/:id", deleteGoal);

module.exports = router;
