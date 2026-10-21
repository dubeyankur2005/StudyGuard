const express = require("express");

const router = express.Router();

const {
  register,
  login,
  me,
} = require("../controllers/auth.controller");

router.post("/register", register);

router.post("/login", login);
router.get("/me", require("../middlewares/authMiddleware"), me);

module.exports = router;
