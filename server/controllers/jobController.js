// controllers/jobController.js
const cloudinary = require("../config/cloudinary");
const AppliedJob = require("../models/AppliedJob");
const FavoriteJob = require("../models/FavoriteJob");
const Job = require("../models/Job");

exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.user._id;
    const { coverLetter } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const alreadyApplied = await AppliedJob.findOne({
      user: userId,
      job: jobId,
    });
    if (alreadyApplied)
      return res
        .status(400)
        .json({ message: "You already applied for this job" });

    // ✅ Upload resume to Cloudinary (public)
    let resumeUrl = req.body.resume;
    let resumeId = req.body.resumeId;

    if (!resumeUrl || !resumeId) {
      // fallback to file upload
      if (!req.file) {
        return res.status(400).json({ message: "Resume file is required" });
      }
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "resumes",
        resource_type: "auto",
        type: "upload",
      });
      resumeUrl = result.secure_url;
      resumeId = result.public_id;
    }

    const applied = new AppliedJob({
      user: userId,
      job: jobId,
      coverLetter,
      resume: resumeUrl,
      resumeId,
    });

    await applied.save();

    res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      appliedJob: applied,
    });
  } catch (error) {
    console.error("🔥 Error applying for job:", error);
    res.status(500).json({ message: "Error applying for job" });
  }
};

exports.getUserAppliedJobs = async (req, res) => {
  try {
    const userId = req.user._id;

    const appliedJobs = await AppliedJob.find({ user: userId })
      .populate({
        path: "job",
        select:
          "title location salary category jobType experience description recruiter minSalary maxSalary",
        populate: {
          path: "recruiter",
          select: "firstName lastName email company",
          populate: {
            path: "company",
            select: "name logo", // 👈 this brings in the company logo and name
          },
        },
      })
      .sort({ appliedAt: -1 });

    res.status(200).json(appliedJobs);
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res.status(500).json({ message: "Error fetching applied jobs" });
  }
};

exports.getAppliedJobsCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const count = await AppliedJob.countDocuments({ user: userId });
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error counting applied jobs:", error);
    res.status(500).json({ message: "Error fetching applied jobs count" });
  }
};

exports.getFavoriteJobsCount = async (req, res) => {
  try {
    const userId = req.user._id;
    const count = await FavoriteJob.countDocuments({ user: userId });
    res.status(200).json({ count });
  } catch (error) {
    console.error("Error counting applied jobs:", error);
    res.status(500).json({ message: "Error fetching favorite jobs count" });
  }
};

//Favorite Jobs

exports.toggleFavoriteJob = async (req, res) => {
  try {
    const userId = req.user._id;
    const { jobId } = req.body;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: "Job not found" });

    const existing = await FavoriteJob.findOne({ user: userId, job: jobId });

    if (existing) {
      await existing.deleteOne();
      return res.status(200).json({ favorite: false });
    } else {
      await FavoriteJob.create({ user: userId, job: jobId });
      return res.status(200).json({ favorite: true });
    }
  } catch (error) {
    console.error("Error toggling favorite:", error);
    res.status(500).json({ message: "Error toggling favorite", error });
  }
};

// Get user favorites
exports.getUserFavorites = async (req, res) => {
  try {
    const userId = req.user._id;
    const favorites = await FavoriteJob.find({ user: userId })
      .populate({
        path: "job",
        populate: {
          path: "recruiter",
          select: "company",
        },
      })
      .lean();
    const jobs = favorites.map((fav) => fav.job);
    res.status(200).json(jobs);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).json({ message: "Error fetching favorites" });
  }
};

exports.checkIfApplied = async (req, res) => {
  try {
    const userId = req.user._id;
    const { jobId } = req.params;

    // Check if job exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    // Check if user has already applied
    const existingApplication = await AppliedJob.findOne({
      user: userId,
      job: jobId,
    });

    const applied = !!existingApplication;

    return res.status(200).json({
      success: true,
      applied,
    });
  } catch (error) {
    console.error("❌ Error checking application status:", error);
    res.status(500).json({
      success: false,
      message: "Error checking application status",
      error,
    });
  }
};

exports.getExperienceCounts = async (req, res) => {
  try {
    const experienceLevels = [
      "No Experience",
      "Entry Level",
      "Internship & Graduate",
      "Mid Level",
      "Senior Level",
      "Executive Level",
    ];

    const counts = {};

    for (const level of experienceLevels) {
      const count = await Job.countDocuments({
        experience: level,
        isVisible: true,
      });
      counts[level] = count;
    }

    res.status(200).json(counts);
  } catch (error) {
    console.error("❌ Error fetching experience counts:", error);
    res.status(500).json({ message: "Failed to fetch experience counts" });
  }
};

// ✅ Get all jobs filtered by experience level
exports.getJobsByExperience = async (req, res) => {
  try {
    const { level } = req.params;

    const jobs = await Job.find({
      experience: level,
      isVisible: true,
    })
      .populate("recruiter", "fullName email company")
      .sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    console.error("❌ Error fetching jobs by experience:", error);
    res.status(500).json({ message: "Failed to fetch jobs by experience" });
  }
};
exports.getExperienceCounts = async (req, res) => {
  try {
    const experienceLevels = [
      "No Experience",
      "Entry Level",
      "Internship & Graduate",
      "Mid Level",
      "Senior Level",
      "Executive Level",
    ];

    const counts = {};

    for (const level of experienceLevels) {
      const count = await Job.countDocuments({
        experience: level,
        isVisible: true,
      });
      counts[level] = count;
    }

    res.status(200).json(counts);
  } catch (error) {
    console.error("❌ Error fetching experience counts:", error);
    res.status(500).json({ message: "Failed to fetch experience counts" });
  }
};

// ✅ Get all jobs filtered by experience level
exports.getJobsByExperience = async (req, res) => {
  try {
    const { level } = req.params;

    const jobs = await Job.find({
      experience: level,
      isVisible: true,
    })
      .populate("recruiter", "fullName email company")
      .sort({ createdAt: -1 });

    res.status(200).json(jobs);
  } catch (error) {
    console.error("❌ Error fetching jobs by experience:", error);
    res.status(500).json({ message: "Failed to fetch jobs by experience" });
  }
};
exports.getJobsByIndustry = async (req, res) => {
  try {
    const { industry } = req.params;
    const jobs = await Job.find({ industry });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Fetch by location
exports.getJobsByLocation = async (req, res) => {
  try {
    const { location } = req.params;
    const jobs = await Job.find({ location });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Fetch by work type
exports.getJobsByWorkType = async (req, res) => {
  try {
    const { jobType } = req.params;
    const jobs = await Job.find({ jobType });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ General filter endpoint (handles combined filters)
exports.getFilteredJobs = async (req, res) => {
  try {
    const { experience, industry, location, jobType } = req.query;

    const query = {};
    if (experience) query.experience = experience;
    if (industry) query.industry = industry;
    if (location) query.location = location;
    if (jobType) query.jobType = jobType;

    const jobs = await Job.find(query);
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
