const express = require("express");
const {
  registerUser,
  verifyEmail,
  login,
  forgotPassword,
  resetPassword,
  googleLogin,
  markPaymentSuccess,
  logout,
  updateUserSettings,
  getUserSettings,
  changePassword,
  uploadProfileImage,
  uploadResume,
  getUserProfile,
  deleteResume,
} = require("../controllers/authController");
const upload = require("../middlewares/upload");
const { authenticate } = require("../middlewares/auth");
const router = express.Router();
const uploadProfile = require("../middlewares/uploadProfile");

router.post("/register", registerUser);
router.get("/verify/:token", verifyEmail);
router.post("/login", login);
//router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/google", googleLogin);
router.put("/payment-success/:id", markPaymentSuccess);
router.post("/logout", authenticate, logout);
router.get("/settings", authenticate, getUserSettings);
router.put("/settings", authenticate, updateUserSettings);
router.put("/change-password", authenticate, changePassword);
router.post(
  "/upload-profile",
  authenticate,
  uploadProfile.single("image"), // matches FormData.append("image", file)
  uploadProfileImage
);
router.post(
  "/upload-resume",
  authenticate,
  upload.single("file"),
  uploadResume
);
router.get("/profile", authenticate, getUserProfile);
router.delete("/delete-resume/:resumeId", authenticate, deleteResume);

module.exports = router;
