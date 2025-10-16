// routes/recruiterJobRoutes.js
const express = require("express");
const router = express.Router();
const recruiterJobController = require("../controllers/recruiterJobController");
//const { verifyToken } = require("../middleware/authMiddleware");
const { authenticate } = require("../middlewares/auth");

// Recruiter job routes
router.get("/all", recruiterJobController.getAllJobs);

// Recruiter routes (require auth)
router.post("/add", authenticate, recruiterJobController.addJob);
router.get("/recruiter", authenticate, recruiterJobController.getRecruiterJobs);
router.get(
  "/:jobId/applicants",
  authenticate,
  recruiterJobController.getApplicantsByJob
);
router.put("/:jobId", authenticate, recruiterJobController.updateJob);
router.delete("/:id", authenticate, recruiterJobController.deleteJob);
router.get(
  "/recruiter/total",
  authenticate,
  recruiterJobController.getTotalJobsPosted
);
router.patch(
  "/:jobId/visibility",
  authenticate,
  recruiterJobController.toggleJobVisibility
);

// Get all applications for logged-in recruiter
router.get(
  "/applications/recruiter",
  authenticate,
  recruiterJobController.getApplicationsForRecruiter
);

// Accept / Reject an application
router.patch(
  "/applications/:applicationId",
  authenticate,
  recruiterJobController.updateApplicationStatus
);
router.get(
  "/download-resume/:id",
  authenticate,
  recruiterJobController.downloadResume
);

module.exports = router;
