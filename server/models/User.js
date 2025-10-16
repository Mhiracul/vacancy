const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Core info
    role: {
      type: String,
      enum: ["user", "recruiter", "admin"],
      default: "user",
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    // Auth info
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String }, // for Google login
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    verificationExpires: { type: Date },
    // Contact
    phone: String,
    location: String,

    // ========== USER-SPECIFIC FIELDS ==========
    gender: { type: String, enum: ["Male", "Female", "Other"] },
    dob: Date,
    education: String, // Highest education level
    profession: String, // Profession selected from dropdown
    qualification: String, // e.g., PMP, CPA, etc.
    experience: String, // 0-1 Year, 2-5 Years, etc.
    skills: [String],
    resume: String, // path or cloud URL
    hasPaid: { type: Boolean, default: false },
    amountPaid: { type: Number, default: 0 },
    paymentReference: String,
    paymentStatus: String,
    paymentGateway: String,
    paymentVerifiedAt: Date,
    resumes: [
      {
        name: String, // e.g. “Professional Resume”
        size: String, // e.g. “3.5 MB”
        url: String, // link or path
        public_id: String, // 👈 add this
      },
    ],

    headline: String,
    website: String,
    bio: String,
    profileImage: {
      type: String, // Cloudinary URL
      default: "",
    },

    socialLinks: {
      facebook: String,
      instagram: String,
      youtube: String,
      twitter: String,
    },
    // ========== RECRUITER-SPECIFIC FIELDS ==========
    position: String, // Recruiter's role in the company
    company: {
      // STEP 1: Company Info
      name: String,
      logo: String,
      banner: String,
      about: String,

      // STEP 2: Founding Info
      industryType: {
        type: String,
      },
      employees: String, // e.g. "11-50"
      website: String,
      vision: String,

      // STEP 3: Social Media
      socialLinks: {
        facebook: String,
        instagram: String,
        youtube: String,
      },

      // STEP 4: Contact
      phone: String,
      notificationEmail: String,

      // Optional company info
      industry: String,
      contactPerson: String,
      country: String,
      address: String,

      paymentStatus: {
        type: String,
        enum: ["pending", "paid"],
        default: "pending",
      },
    },

    // Admin fields (optional)
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Pre-save lowercase email
userSchema.pre("save", function (next) {
  if (this.email) this.email = this.email.toLowerCase();
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;
