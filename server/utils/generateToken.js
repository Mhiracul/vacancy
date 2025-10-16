const jwt = require("jsonwebtoken");

const generateToken = (payload, expiresIn = "1h", isSession = true) => {
  return jwt.sign({ ...payload, isSession }, process.env.JWT_SECRET, {
    expiresIn,
  });
};
module.exports = generateToken;
