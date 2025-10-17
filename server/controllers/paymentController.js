const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));
const User = require("../models/User");
const axios = require("axios");
require("dotenv").config();

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

exports.verifyPayment = async (req, res) => {
  const { reference } = req.body; // Reference from frontend
  const userId = req.user.id; // From JWT token (set in authenticateToken middleware)

  try {
    // 🔍 Verify payment with Paystack API
    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`, // your secret key
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!data.status) {
      return res
        .status(400)
        .json({ message: "Payment verification failed", data });
    }

    const paymentData = data.data;

    // ✅ Update user payment status
    const user = await User.findByIdAndUpdate(
      userId,
      {
        hasPaid: true,
        amountPaid: paymentData.amount / 100, // convert from kobo
        paymentReference: paymentData.reference,
        paymentStatus: paymentData.status,
        paymentGateway: "Paystack",
        paymentVerifiedAt: new Date(),
      },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      success: true,
      message: "Payment verified successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Error verifying payment", error: err.message });
  }
};

//RECRUITER PAYMENT

exports.initiateRecruiterPayment = async (req, res) => {
  try {
    const { email, amount } = req.body;

    // Use the authenticated user's ID
    const recruiterId = req.user._id;

    if (!email || !amount)
      return res.status(400).json({ message: "Email and amount are required" });

    const paystackRes = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: amount * 100, // convert ₦ → kobo
        callback_url: `${process.env.CLIENT_URL}/payment/verify?recruiterId=${recruiterId}`,
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
      "💥 Paystack Init Error:",
      error.response?.data || error.message
    );
    res.status(500).json({
      message: "Error initializing payment",
      error: error.response?.data || error.message,
    });
  }
};

// ✅ Verify Payment and Update Recruiter
// ✅ Verify Payment and Update Recruiter (JSON-based, no redirects)
// ✅ Verify Recruiter Payment (Improved)
exports.verifyRecruiterPayment = async (req, res) => {
  try {
    const { reference, recruiterId } = req.query;

    if (!reference || !recruiterId) {
      return res.status(400).json({
        success: false,
        message: "Missing payment reference or recruiter ID",
      });
    }

    console.log("🔍 Verifying payment for reference:", reference);

    // ✅ Verify payment with Paystack API
    const verifyRes = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      }
    );

    const data = verifyRes.data.data;

    if (!data || data.status !== "success") {
      console.log("❌ Paystack verification failed:", data);
      return res.status(400).json({
        success: false,
        message: "Payment verification failed",
        data,
      });
    }

    // ✅ Payment succeeded — update recruiter record
    await User.findByIdAndUpdate(recruiterId, {
      "company.paymentStatus": "paid",
      amountPaid: data.amount / 100,
      paymentReference: data.reference,
      paymentVerifiedAt: new Date(),
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (err) {
    console.error(
      "💥 Error verifying payment:",
      err.response?.data || err.message
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.response?.data || err.message,
    });
  }
};

// ✅ Get Recruiter Payment Status
exports.getRecruiterPaymentStatus = async (req, res) => {
  try {
    const recruiter = await User.findById(req.params.id);
    if (!recruiter)
      return res.status(404).json({ message: "Recruiter not found" });

    res.json({ paymentStatus: recruiter.company.paymentStatus });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error checking payment" });
  }
};
