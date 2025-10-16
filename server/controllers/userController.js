// controllers/userController.js

const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const User = require("../models/User");
const transporter = require("../utils/emailService");
const axios = require("axios");
const fetch = require("node-fetch");

exports.verifyUserEmail = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res
        .status(400)
        .json({ message: "Missing email or verification code" });
    }

    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.isVerified)
      return res.status(400).json({ message: "Email already verified" });

    if (user.verificationToken !== code)
      return res.status(400).json({ message: "Invalid verification code" });

    if (user.verificationExpires < Date.now())
      return res.status(400).json({ message: "Verification code expired" });

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpires = undefined;

    await user.save();

    res.status(200).json({ message: "✅ Email verified successfully!" });
  } catch (err) {
    console.error("Email verification error:", err);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

//PAYMENT

// ✅ Initiate payment for job seekers (₦1,500)
exports.initiateUserPayment = async (req, res) => {
  try {
    const { email, amount } = req.body;
    const userId = req.user._id;

    if (!email || !amount)
      return res.status(400).json({ message: "Email and amount are required" });

    const paystackRes = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100, // Convert ₦ to kobo
        callback_url: `${process.env.CLIENT_URL}/payment/verify-user?userId=${userId}`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json(paystackRes.data.data);
  } catch (error) {
    console.error(
      "User Paystack Init Error:",
      error.response?.data || error.message
    );
    res.status(500).json({ message: "Error initializing user payment" });
  }
};

// ✅ Verify User Payment
exports.verifyUserPayment = async (req, res) => {
  try {
    const { reference, userId } = req.query;

    if (!reference || !userId) {
      return res
        .status(400)
        .json({ message: "Missing payment reference or user ID" });
    }

    const verifyRes = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      }
    );

    const data = verifyRes.data.data;
    if (data.status !== "success") {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // ✅ Update user payment details
    await User.findByIdAndUpdate(userId, {
      hasPaid: true,
      amountPaid: data.amount / 100, // Paystack returns kobo, so convert to naira
      paymentReference: reference,
      paymentStatus: "success",
      paymentGateway: "paystack",
      paymentVerifiedAt: new Date(),
    });

    res
      .status(200)
      .json({ success: true, message: "User payment verified successfully" });
  } catch (err) {
    console.error("User payment verify error:", err.message);
    res.status(500).json({ message: "Error verifying user payment" });
  }
};

// ✅ Get User Payment Status
exports.getUserPaymentStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select(
      "hasPaid paymentStatus"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ hasPaid: user.hasPaid, paymentStatus: user.paymentStatus });
  } catch (err) {
    console.error("Error checking user payment status:", err);
    res.status(500).json({ message: "Error checking user payment status" });
  }
};
