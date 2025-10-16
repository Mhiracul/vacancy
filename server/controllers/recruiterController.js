const bcrypt = require("bcryptjs");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const crypto = require("crypto");
const transporter = require("../utils/emailService");

// ==========================
// Recruiter Registration
// ==========================
exports.registerRecruiter = async (req, res) => {
  try {
    const { firstName, lastName, email, password, position, phone } = req.body;

    // 1️⃣ Check if user exists
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email already in use" });

    // 2️⃣ Hash password
    const hashed = await bcrypt.hash(password, 10);

    // 3️⃣ Generate verification code & expiry
    const verificationToken = crypto.randomInt(100000, 999999).toString();
    const verificationExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    // 4️⃣ Create recruiter (unverified)
    const recruiter = await User.create({
      firstName,
      lastName,
      email,
      password: hashed,
      phone,
      position,
      role: "recruiter",
      isVerified: false,
      verificationToken,
      verificationExpires,
    });

    // 5️⃣ Send email using handlebars template
    await transporter.sendMail({
      from: `"Miles Edge" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email - Miles Edge",
      template: "verifyEmail",
      context: {
        firstName,
        code: verificationToken,
        year: new Date().getFullYear(),
      },
    });

    res.status(201).json({
      message: "Recruiter registered. Verification email sent.",
      email,
    });
  } catch (err) {
    console.error("Recruiter registration error:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// ==========================
// Verify Email Code
// ==========================
exports.verifyEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.isVerified)
      return res.status(400).json({ message: "Email already verified" });

    // Check code and expiry
    if (user.verificationToken !== code)
      return res.status(400).json({ message: "Invalid verification code" });

    if (user.verificationExpires && user.verificationExpires < Date.now())
      return res.status(400).json({ message: "Verification code expired" });

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationExpires = null;
    await user.save();

    res.status(200).json({ message: "✅ Email verified successfully!" });
  } catch (err) {
    console.error("Email verification error:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
// ==========================
// Recruiter Login
// ==========================
exports.recruiterLogin = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body; // rememberMe boolean

    // 1️⃣ Validate input
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Please enter both email and password" });

    // 2️⃣ Find recruiter
    const recruiter = await User.findOne({ email, role: "recruiter" });
    if (!recruiter)
      return res.status(400).json({ message: "Recruiter not found" });

    // 3️⃣ Verify password
    const valid = await bcrypt.compare(password, recruiter.password);
    if (!valid) return res.status(400).json({ message: "Invalid password" });

    // 4️⃣ Generate token
    // If rememberMe → persistent token (long-lived), else session token (short-lived)
    const payload = { id: recruiter._id, role: recruiter.role };
    const token = generateToken({ id: recruiter._id, role: recruiter.role }); // 7d by default
    // 3rd argument: isSession = !rememberMe

    res.status(200).json({
      message: "Login successful.",
      recruiter,
      token,
      rememberMe: !!rememberMe,
    });
  } catch (err) {
    console.error("Recruiter login error:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Update Recruiter Profile
// ==========================
exports.updateRecruiterProfile = async (req, res) => {
  try {
    const recruiterId = req.user.id;
    const {
      companyName,
      about,
      organizationType,
      noOfEmployees,
      website,
      vision,
      facebook,
      instagram,
      youtube,
      phone,
      notificationEmail,
    } = req.body;

    // Get the Cloudinary URLs
    const logoUrl = req.files?.logo?.[0]?.path;
    const bannerUrl = req.files?.banner?.[0]?.path;

    // Update recruiter info
    const updatedRecruiter = await User.findByIdAndUpdate(
      recruiterId,
      {
        $set: {
          "company.name": companyName,
          "company.about": about,
          ...(logoUrl && { "company.logo": logoUrl }),
          ...(bannerUrl && { "company.banner": bannerUrl }),
          "company.organizationType": organizationType,
          "company.employees": noOfEmployees,
          "company.website": website,
          "company.vision": vision,
          "company.socialLinks.facebook": facebook,
          "company.socialLinks.instagram": instagram,
          "company.socialLinks.youtube": youtube,
          "company.phone": phone,
          "company.notificationEmail": notificationEmail,
        },
      },
      { new: true }
    );

    res.status(200).json({
      message: "Recruiter profile setup completed successfully!",
      recruiter: updatedRecruiter,
    });
  } catch (err) {
    console.error("Recruiter profile setup error:", err);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
