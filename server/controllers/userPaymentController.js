// controllers/paymentController.js
const axios = require("axios");
const User = require("../models/User");

// Initialize Paystack payment
exports.initializePayment = async (req, res) => {
  const { amount } = req.body;

  try {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: req.user.email,
        amount, // amount in kobo
        callback_url: `${process.env.FRONTEND_URL}/pricing/verify`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data.data); // contains authorization_url
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment initialization failed" });
  }
};

// Verify Paystack payment
exports.verifyPayment = async (req, res) => {
  const { reference } = req.params;

  try {
    const verifyResponse = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const { status, amount } = verifyResponse.data.data;

    if (status === "success") {
      await User.findByIdAndUpdate(req.user.id, {
        hasPaid: true,
        amountPaid: amount / 100, // convert kobo to NGN
        paymentReference: reference,
        paymentStatus: status,
        paymentVerifiedAt: new Date(),
      });

      return res.json({ ok: true, message: "Payment verified successfully" });
    }

    res.status(400).json({ ok: false, message: "Payment verification failed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment verification failed" });
  }
};
