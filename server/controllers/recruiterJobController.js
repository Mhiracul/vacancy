const cloudinary = require("../config/cloudinary");
const AppliedJob = require("../models/AppliedJob");
const Job = require("../models/Job");
const User = require("../models/User");
const axios = require("axios");

// 🟢 Create a new job (only for paid recruiters)
const addJob = async (req, res) => {
  try {
    const recruiterId = req.user.id; // from verifyToken middleware
    const {
      title,
      minSalary,
      maxSalary,
      salaryType,
      jobType,
      experience,
      industry,
      expirationDate,
      jobRole,
      location,
      description,
    } = req.body;

    // 🧠 Basic validation
    if (
      !title ||
      !description ||
      !jobRole ||
      !jobType ||
      !experience ||
      !industry ||
      !expirationDate ||
      !location
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    // 🧩 Create new job
    const newJob = await Job.create({
      recruiter: recruiterId,
      title,
      description,
      jobRole,
      jobType,
      experience,
      industry,
      expirationDate,
      minSalary: minSalary ? Number(minSalary) : undefined,
      maxSalary: maxSalary ? Number(maxSalary) : undefined,
      salaryType: salaryType || "Negotiable",
      location,
      isVisible: true,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: newJob,
    });
  } catch (error) {
    console.error("Error creating job:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while creating job",
    });
  }
};
// 🟣 Get applicants for a specific job
const getApplicantsByJob = async (req, res) => {
  try {
    const job = await Job.findOne({
      _id: req.params.jobId,
      recruiter: req.user._id,
    }).populate("applicants.user", "firstName lastName email resume");

    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    res.json({ success: true, applicants: job.applicants });
  } catch (err) {
    console.error("Get applicants error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const toggleJobVisibility = async (req, res) => {
  try {
    const recruiterId = req.user.id;
    const { jobId } = req.params;
    const { isVisible } = req.body; // boolean

    const job = await Job.findOne({ _id: jobId, recruiter: recruiterId });
    if (!job)
      return res.status(404).json({ success: false, message: "Job not found" });

    job.isVisible = isVisible;
    await job.save();

    res.status(200).json({ success: true, job });
  } catch (err) {
    console.error("Toggle visibility error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
// 🔵 Update job
const updateJob = async (req, res) => {
  try {
    const updated = await Job.findOneAndUpdate(
      { _id: req.params.jobId, recruiter: req.user._id },
      req.body,
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ success: false, message: "Job not found" });

    res.json({ success: true, job: updated });
  } catch (err) {
    console.error("Update job error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// 🔻 Delete job
const deleteJob = async (req, res) => {
  try {
    const recruiterId = req.user.id;
    const job = await Job.findOne({
      _id: req.params.id,
      recruiter: recruiterId,
    });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or not authorized",
      });
    }

    await job.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🌍 Get all jobs (public)
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("recruiter", "name email company")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Error fetching all jobs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🔹 Get recruiter’s jobs
const getRecruiterJobs = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    // Get jobs posted by this recruiter
    const jobs = await Job.find({ recruiter: recruiterId })
      .sort({ createdAt: -1 })
      .lean(); // lean() gives plain JS objects

    // Count applicants for each job
    const jobsWithApplicants = await Promise.all(
      jobs.map(async (job) => {
        const applicantsCount = await AppliedJob.countDocuments({
          job: job._id,
        });
        return { ...job, applicantsCount };
      })
    );

    res.status(200).json({ success: true, jobs: jobsWithApplicants });
  } catch (error) {
    console.error("Error fetching recruiter jobs:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🧮 Get total number of jobs posted by a recruiter
const getTotalJobsPosted = async (req, res) => {
  try {
    const recruiterId = req.user.id; // from verifyToken middleware

    const totalJobs = await Job.countDocuments({ recruiter: recruiterId });

    res.status(200).json({
      success: true,
      total: totalJobs,
    });
  } catch (error) {
    console.error("Error getting total jobs:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ✅ recruiterJobController.js
const getApplicationsForRecruiter = async (req, res) => {
  try {
    const recruiterId = req.user.id;

    const recruiterJobs = await Job.find({ recruiter: recruiterId }, "_id");

    const applications = await AppliedJob.find({
      job: { $in: recruiterJobs.map((j) => j._id) },
    })
      .populate({
        path: "user",
        select: "-password -verificationToken -resetPasswordToken -__v",
      })

      .populate({
        path: "job",
        select: "title location",
      })
      .select("resume coverLetter status user job appliedAt"); // include coverLetter

    console.log("Applications fetched:", applications); // ✅ Add this

    res.status(200).json({ success: true, applications });
  } catch (err) {
    console.error("Error fetching applications:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const recruiterId = req.user.id;
    const { applicationId } = req.params;
    const { action } = req.body; // 'accepted' or 'rejected'

    // Find the job that has this applicant and belongs to the recruiter
    const job = await Job.findOne({
      recruiter: recruiterId,
      "applicants._id": applicationId,
    });

    if (!job)
      return res
        .status(404)
        .json({ success: false, message: "Application not found" });

    // Update the applicant status
    const applicant = job.applicants.id(applicationId);
    applicant.status = action;
    await job.save();

    res.status(200).json({ success: true, job, application: applicant });
  } catch (err) {
    console.error("Error updating application status:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const downloadResume = async (req, res) => {
  try {
    const { id } = req.params;

    // 1️⃣ Find the job application
    const appliedJob = await AppliedJob.findById(id);
    if (!appliedJob)
      return res.status(404).json({ message: "Application not found" });

    if (!appliedJob.resumeId)
      return res.status(400).json({ message: "No resume public_id found" });

    // 2️⃣ Generate a signed private download URL (valid for 5 minutes)
    const signedUrl = cloudinary.utils.private_download_url(
      appliedJob.resumeId, // e.g. "resumes/file-1760607398953"
      "pdf", // file format
      {
        resource_type: "raw", // for PDFs, DOCX, etc.
        expires_at: Math.floor(Date.now() / 1000) + 300, // expires in 5 min
      }
    );

    // 3️⃣ Send the signed URL back to frontend
    return res.status(200).json({ url: signedUrl });
  } catch (error) {
    console.error("🔥 Resume download error:", error.message);
    res.status(500).json({ message: "Error generating signed URL" });
  }
};

module.exports = {
  addJob,
  getRecruiterJobs,
  getAllJobs,
  getApplicantsByJob,
  updateJob,
  deleteJob,
  getTotalJobsPosted,
  toggleJobVisibility,
  getApplicationsForRecruiter,
  updateApplicationStatus,
  downloadResume,
};
