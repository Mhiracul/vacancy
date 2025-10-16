const jwt = require("jsonwebtoken");
const User = require("../models/User");
const redisClient = require("../utils/redisClient");

// ✅ Authenticate any logged-in user (user or recruiter)
exports.authenticate = async (req, res, next) => {
  const header = req.headers.authorization;
  console.log("Authorization header:", header); // 👈 log header

  if (!header || !header.startsWith("Bearer ")) {
    console.log("No Bearer token found");
    return res.status(401).json({ message: "No token provided" });
  }

  const token = header.split(" ")[1];
  console.log("Token received:", token); // 👈 log token

  try {
    const isBlacklisted = await redisClient.get(token);
    if (isBlacklisted) {
      return res.status(401).json({ message: "Token is blacklisted" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded); // 👈 log decoded payload

    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) {
      console.log("User not found for decoded ID");
      return res.status(401).json({ message: "User not found" });
    }

    console.log("Authentication successful for user:", req.user.email);
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

// ✅ Authorize specific roles
// Example usage: authorizeRoles('user', 'recruiter')
exports.authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    console.log("Authorizing roles:", roles, "for user role:", req.user.role);
    if (!roles.includes(req.user.role)) {
      console.log("Access denied");
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
