const jwt = require("jsonwebtoken");

const generateToken = (payload, expiresIn = "7d", isSession = true) => {
  return jwt.sign({ ...payload, isSession }, process.env.JWT_SECRET, {
    expiresIn,
  });
};

module.exports = generateToken;
