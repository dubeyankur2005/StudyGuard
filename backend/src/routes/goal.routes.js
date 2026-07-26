const express = require("express");
const router = express.Router();

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