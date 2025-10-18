const express = require("express");
const router = express.Router();
const {
  createJobAlert,
  getMatchingJobs,
  getJobAlertCount,
} = require("../controllers/jobAlertController");
const { authenticate } = require("../middlewares/auth");

router.post("/create", authenticate, createJobAlert);
router.get("/matches", authenticate, getMatchingJobs);
router.get("/count", authenticate, getJobAlertCount);

module.exports = router;
