const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/emailService");
const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const redisClient = require("../utils/redisClient");
const cloudinary = require("../config/cloudinary");
const transporter = require("../utils/emailService");

// 🟢 USER SIGNUP (with email verification)
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already in use" });

    const hashed = await bcrypt.hash(password, 10);

    const verificationToken = crypto.randomInt(100000, 999999).toString();
    const verificationExpires = Date.now() + 10 * 60 * 1000;

    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashed,
      isVerified: false,
      verificationToken,
      verificationExpires,
      role: "user",
    });

    await transporter.sendMail({
      from: `"Vacancy.NG" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email - Vacancy.NG",
      template: "verifyEmail",
      context: {
        firstName,
        code: verificationToken,
        year: new Date().getFullYear(),
      },
    });

    res.status(201).json({
      message: "User registered. Verification email sent.",
      email,
    });
  } catch (err) {
    console.error("User registration error:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

exports.getUsersSettings = async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findById(userId).select(
      "dob gender education experience resumes website bio socialLinks profileImage"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user settings:", error);
    res.status(500).json({ message: "Error fetching user settings" });
  }
};

exports.markPaymentSuccess = async (req, res) => {
  try {
    const { id } = req.params;
    const { hasPaid, amountPaid } = req.body;

    const user = await User.findByIdAndUpdate(
      id,
      { hasPaid, amountPaid },
      { new: true }
    );

    res.status(200).json({ message: "Payment updated", user });
  } catch (err) {
    res.status(500).json({ message: "Error updating payment" });
  }
};

// 🟢 VERIFY EMAIL
exports.verifyEmail = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ verificationToken: token });
  if (!user) return res.status(400).json({ message: "Invalid token" });

  user.isVerified = true;
  user.verificationToken = null;
  await user.save();

  res.json({ message: "Email verified successfully!" });
};

// 🟢 LOGIN (user/admin)
exports.login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body; // include rememberMe if sent from frontend

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    if (!user.isVerified)
      return res
        .status(401)
        .json({ message: "Please verify your email first" });

    // ✅ Use your updated token generator
    const expiresIn = rememberMe ? "7d" : "1h"; // 7 days if remember me checked
    const token = generateToken(
      { id: user._id, role: user.role },
      expiresIn,
      true
    );

    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// 🟢 FORGOT PASSWORD
/*exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ message: "No account with this email" });

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1h
  await user.save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
  await sendEmail(
    email,
    "Password Reset",
    `
    <p>Click below to reset your password:</p>
    <a href="${resetUrl}">${resetUrl}</a>
  `
  );

  res.json({ message: "Password reset link sent to your email" });
}; */

// 🟢 RESET PASSWORD
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() },
  });
  if (!user)
    return res.status(400).json({ message: "Invalid or expired token" });

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = null;
  user.resetPasswordExpires = null;
  await user.save();

  res.json({ message: "Password updated successfully!" });
};

exports.logout = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(400)
        .json({ success: false, message: "No token provided" });
    }

    // Just respond success — JWT will expire automatically
    return res.status(200).json({
      success: true,
      message: "Logged out successfully (token will expire soon)",
    });
  } catch (err) {
    console.error("Logout error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🟢 GOOGLE LOGIN
exports.googleLogin = async (req, res) => {
  const { tokenId } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID,
  });
  const { email, given_name, family_name, sub } = ticket.getPayload();

  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({
      googleId: sub,
      email,
      firstName: given_name,
      lastName: family_name,
      isVerified: true,
    });
  }

  const token = generateToken({ id: user._id, role: user.role });
  res.json({ user, token });
};

exports.getUserSettings = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    // 👇 If user only has old `resume`, map it into `resumes` for UI consistency
    if (user && !user.resumes?.length && user.resume) {
      user.resumes = [
        {
          name: "Default Resume",
          size: "Unknown size",
          url: user.resume,
        },
      ];
    }

    console.log("👤 User settings fetched:", user);

    res.status(200).json(user);
  } catch (error) {
    console.error("❌ Error fetching user settings:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updateUserSettings = async (req, res) => {
  try {
    const updates = req.body;

    // If there's a single resume string (old style), wrap it in new array format
    if (updates.resume && !updates.resumes) {
      updates.resumes = [
        {
          name: "Imported Resume",
          size: "Unknown",
          url: updates.resume,
        },
      ];
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    console.log("✅ User settings updated:", user);

    res.status(200).json({ message: "Settings updated successfully", user });
  } catch (error) {
    console.error("❌ Error updating user settings:", error);
    res.status(500).json({ message: "Error updating settings", error });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword)
      return res.status(400).json({ message: "All fields are required" });

    if (newPassword !== confirmPassword)
      return res.status(400).json({ message: "Passwords do not match" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Current password is incorrect" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("❌ Error changing password:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    // req.file.path already contains the Cloudinary URL
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: req.file.path || req.file.url },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile image uploaded successfully",
      imageUrl: req.file.path,
      user,
    });
  } catch (error) {
    console.error("❌ Error uploading profile image:", error);
    res.status(500).json({ message: "Failed to upload image", error });
  }
};

// controllers/authController.js
exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // multer-storage-cloudinary gives:
    // req.file.path → Cloudinary secure URL
    // req.file.filename → Cloudinary public_id
    const fileData = {
      name: req.file.originalname,
      size: `${(req.file.size / 1024 / 1024).toFixed(2)} MB`,
      url: req.file.path, // public Cloudinary URL for direct download
      public_id: req.file.filename, // Cloudinary public_id (for reference or deletion)
    };

    // Push the resume into the user's resumes array
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { $push: { resumes: fileData } },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Resume uploaded successfully",
      resume: fileData,
      resumes: updatedUser.resumes,
    });
  } catch (error) {
    console.error("🔥 Resume upload error:", error);
    res.status(500).json({ message: "Error uploading resume" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    // req.user is set by authMiddleware (decoded from token)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("🔥 Error fetching user profile:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching profile",
    });
  }
};

// DELETE Resume
exports.deleteResume = async (req, res) => {
  try {
    const userId = req.user.id; // from token (auth middleware)
    const { resumeId } = req.params; // resume ID to delete

    const user = await User.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    // Remove resume by ID or URL
    user.resumes = user.resumes.filter(
      (r) => r._id.toString() !== resumeId && r.url !== resumeId
    );

    await user.save();

    res.json({
      success: true,
      message: "Resume deleted successfully",
      resumes: user.resumes,
    });
  } catch (err) {
    console.error("❌ Error deleting resume:", err);
    res.status(500).json({ success: false, message: "Error deleting resume" });
  }
};
