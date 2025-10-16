const express = require("express");
const {
  registerRecruiter,
  recruiterLogin,
  updateRecruiterProfile,
  verifyEmail,
} = require("../controllers/recruiterController");
const { authenticate } = require("../middlewares/auth");
const uploadCompanyMedia = require("../middlewares/uploadCompanyMedia");
const router = express.Router();

router.post("/register", registerRecruiter);
router.post("/verify-email", verifyEmail);
router.post("/login", recruiterLogin);
router.put(
  "/setup",
  authenticate,
  uploadCompanyMedia.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
  ]),
  updateRecruiterProfile
);

module.exports = router;
