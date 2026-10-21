const jwt = require("jsonwebtoken");

const validateJwtConfig = () => {
  const secret = process.env.JWT_SECRET;
  if (typeof secret !== "string" || secret.length < 32 || /^(secret|changeme|password)$/i.test(secret)) {
    throw new Error("JWT_SECRET must be a unique secret of at least 32 characters.");
  }
  const expiresIn = process.env.JWT_EXPIRE || "7d";
  if (!/^\d+[smhd]$/.test(expiresIn)) throw new Error("JWT_EXPIRE must be a duration such as 15m, 12h, or 7d.");
  return expiresIn;
};

const generateToken = (userId) => {
  return jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: validateJwtConfig(),
    }
  );
};

module.exports = generateToken;
module.exports.validateJwtConfig = validateJwtConfig;
