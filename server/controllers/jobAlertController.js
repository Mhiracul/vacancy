const Job = require("../models/Job");
const JobAlert = require("../models/jobAlert"); // ✅ use consistent uppercase model name

// Save job alert preferences
exports.createJobAlert = async (req, res) => {
  try {
    const { jobRole, industry, location, experience, jobType } = req.body;
    const userId = req.user.id; // from token middleware

    const newAlert = await JobAlert.create({
      user: userId,
      jobRole,
      industry,
      location,
      experience,
      jobType,
    });

    res.json({ success: true, message: "Job alert created", alert: newAlert });
  } catch (err) {
    console.error("Error creating job alert:", err);
    res
      .status(500)
      .json({ success: false, message: "Error creating job alert" });
  }
};

// Get jobs matching user’s alert preferences
exports.getMatchingJobs = async (req, res) => {
  try {
    const alert = await JobAlert.findOne({ user: req.user.id });
    if (!alert) {
      return res.json({ success: true, jobs: [] }); // safer for frontend
    }

    // Match jobs based on alert preferences
    const query = {
      isVisible: true,
      ...(alert.jobRole && { jobRole: alert.jobRole }),
      ...(alert.industry && { industry: alert.industry }),
      ...(alert.location && { location: alert.location }),
      ...(alert.experience && { experience: alert.experience }),
      ...(alert.jobType && { jobType: alert.jobType }),
    };

    const matchingJobs = await Job.find(query).sort({ createdAt: -1 });
    res.json({ success: true, jobs: matchingJobs });
  } catch (err) {
    console.error("Error getting matching jobs:", err);
    res
      .status(500)
      .json({ success: false, message: "Error fetching matching jobs" });
  }
};

// Get count of user's job alerts
exports.getJobAlertCount = async (req, res) => {
  try {
    const count = await JobAlert.countDocuments({ user: req.user.id });
    res.json({ success: true, count });
  } catch (err) {
    console.error("Error getting job alert count:", err);
    res.status(500).json({ success: false, message: "Error fetching count" });
  }
};
