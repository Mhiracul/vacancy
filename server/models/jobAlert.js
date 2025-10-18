const mongoose = require("mongoose");

const jobAlertSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    jobRole: String,
    industry: String,
    location: String,
    experience: String,
    jobType: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("JobAlert", jobAlertSchema);
