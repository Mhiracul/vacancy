// routes/payment.js
const express = require("express");
const router = express.Router();
const {
  initializePayment,
  verifyPayment,
} = require("../controllers/userPaymentController");
const { authenticate } = require("../middlewares/auth");

router.post("/initialize", authenticate, initializePayment);
router.get("/verify/:reference", authenticate, verifyPayment);

module.exports = router;
