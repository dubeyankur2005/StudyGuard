const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !/^Bearer \S+$/.test(authHeader)) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) {
      return res.status(503).json({ success: false, message: "Authentication is unavailable" });
    }
    const token = authHeader.slice(7);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (!decoded || typeof decoded.id !== "string") return res.status(401).json({ success: false, message: "Not authorized" });
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;

    next();

  } catch {
    return res.status(401).json({
      success: false,
      message: "Not authorized, invalid token",
    });

  }
};

module.exports = protect;
