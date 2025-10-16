const express = require("express");
const router = express.Router();
const { authenticate } = require("../middlewares/auth"); // <-- use authenticate
const {
  verifyPayment,
  initiateRecruiterPayment,
  verifyRecruiterPayment,
  getRecruiterPaymentStatus,
} = require("../controllers/paymentController");
// Verify payment route
router.post("/verify", authenticate, verifyPayment);
router.post("/recruiter/initiate", authenticate, initiateRecruiterPayment);

router.get("/recruiter/verify", authenticate, verifyRecruiterPayment);
router.get("/recruiter/status/:id", authenticate, getRecruiterPaymentStatus);

router.get("/test-token", (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
