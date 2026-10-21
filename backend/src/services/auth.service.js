const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

const registerUser = async ({ name, email, password }) => {
  const userExists = await User.findOne({ email });

  if (userExists) {
    throw Object.assign(new Error("An account with this email already exists"), { statusCode: 409 });
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  const token = generateToken(user._id);

  return {
    user: { id: user._id, name: user.name, email: user.email },
    token,
  };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw Object.assign(new Error("Invalid email or password"), { statusCode: 401 });
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw Object.assign(new Error("Invalid email or password"), { statusCode: 401 });
  }

  const token = generateToken(user._id);

  return {
    user: { id: user._id, name: user.name, email: user.email },
    token,
  };
};

module.exports = {
  registerUser,
  loginUser,
};
