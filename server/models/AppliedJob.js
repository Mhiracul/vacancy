// models/AppliedJob.js
const mongoose = require("mongoose");

const appliedJobSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    resume: { type: String }, // e.g., uploaded resume file URL
    resumeId: { type: String },

    coverLetter: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    appliedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Prevent same user applying twice for same job
appliedJobSchema.index({ user: 1, job: 1 }, { unique: true });

module.exports = mongoose.model("AppliedJob", appliedJobSchema);
