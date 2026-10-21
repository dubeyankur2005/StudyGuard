const authService = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body || {};
    if (typeof name !== "string" || name.trim().length < 1 || name.trim().length > 80 ||
      typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof password !== "string" || password.length < 8 || password.length > 128) {
      return res.status(400).json({ success: false, message: "Provide a name, valid email, and password of 8–128 characters." });
    }
    const result = await authService.registerUser({ name: name.trim(), email: email.trim().toLowerCase(), password });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body || {};
    if (typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || typeof password !== "string" || password.length < 1 || password.length > 128) {
      return res.status(400).json({ success: false, message: "Provide a valid email and password." });
    }
    const result = await authService.loginUser({ email: email.trim().toLowerCase(), password });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const me = (req, res) => res.json({ success: true, data: { id: req.user._id, name: req.user.name, email: req.user.email } });

module.exports = {
  register,
  login,
  me,
};
