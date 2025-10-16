const express = require("express");
const { authenticate } = require("../middlewares/auth");
const {
  verifyUserEmail,
  initiateUserPayment,
  getUserPaymentStatus,
  verifyUserPayment,
} = require("../controllers/userController");
const router = express.Router();

router.post("/verify-email", verifyUserEmail);
router.post("/initiate", authenticate, initiateUserPayment);
router.get("/status/:id", authenticate, getUserPaymentStatus);
router.get("/verify", authenticate, verifyUserPayment);

module.exports = router;
