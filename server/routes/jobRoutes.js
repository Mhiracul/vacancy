const express = require("express");
const router = express.Router();
const {
  applyForJob,
  getUserAppliedJobs,
  getAppliedJobsCount,
  getFavoriteJobs,
  toggleFavoriteJob,
  getUserFavorites,
  getFavoriteJobsCount,
  checkIfApplied,
} = require("../controllers/jobController");
const { authenticate } = require("../middlewares/auth");

router.post("/:jobId/apply", authenticate, applyForJob);
router.get("/applied", authenticate, getUserAppliedJobs);
router.get("/applied/count", authenticate, getAppliedJobsCount);
router.get("/favorite/count", authenticate, getFavoriteJobsCount);
router.post("/favorites/toggle", authenticate, toggleFavoriteJob);
router.get("/favorites", authenticate, getUserFavorites);
router.get("/:jobId/status", authenticate, checkIfApplied);

module.exports = router;
