// models/FavoriteJob.js
const mongoose = require("mongoose");

const favoriteJobSchema = new mongoose.Schema(
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
  },
  { timestamps: true }
);

// Prevent same job being saved twice by same user
favoriteJobSchema.index({ user: 1, job: 1 }, { unique: true });

module.exports = mongoose.model("FavoriteJob", favoriteJobSchema);
