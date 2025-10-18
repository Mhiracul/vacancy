const express = require("express");
const router = express.Router();
const {
  applyForJob,
  getUserAppliedJobs,
  getAppliedJobsCount,
  getFavoriteJobsCount,
  toggleFavoriteJob,
  getUserFavorites,
  checkIfApplied,
  getExperienceCounts,
  getJobsByExperience,
  getJobsByIndustry,
  getJobsByLocation,
  getJobsByWorkType,
  getFilteredJobs,
} = require("../controllers/jobController");
const { authenticate } = require("../middlewares/auth");

// ✅ Apply for a job
router.post("/:jobId/apply", authenticate, applyForJob);

// ✅ User-specific routes
router.get("/applied", authenticate, getUserAppliedJobs);
router.get("/applied/count", authenticate, getAppliedJobsCount);
router.get("/favorite/count", authenticate, getFavoriteJobsCount);
router.post("/favorites/toggle", authenticate, toggleFavoriteJob);
router.get("/favorites", authenticate, getUserFavorites);

// ✅ Filter and listing routes
router.get("/experience-count", getExperienceCounts);
router.get("/experience/:level", getJobsByExperience);
router.get("/industry/:industry", getJobsByIndustry);
router.get("/location/:location", getJobsByLocation);
router.get("/worktype/:workType", getJobsByWorkType);
router.get("/filter", getFilteredJobs);

// ⚠️ Move this LAST (it matches anything like /something/status)
router.get("/:jobId/status", authenticate, checkIfApplied);

module.exports = router;
