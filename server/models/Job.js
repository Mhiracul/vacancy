const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },

    // New fields from AddJob.jsx
    jobRole: { type: String, required: true },
    jobType: { type: String, required: true }, // Full Time, Part Time, etc.
    experience: { type: String, required: true }, // No Experience, Entry Level...
    industry: { type: String, required: true },
    expirationDate: { type: Date, required: true },
    minSalary: { type: Number },
    maxSalary: { type: Number },
    salaryType: {
      type: String,
      enum: ["Monthly", "Yearly", "Hourly", "Negotiable"],
      default: "Negotiable",
    },

    // Keep these for backward compatibility
    category: { type: String },
    location: { type: String, required: true },
    level: { type: String },
    salary: { type: Number },

    isVisible: { type: Boolean, default: true },

    // Recruiter who posted this job
    recruiter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);
