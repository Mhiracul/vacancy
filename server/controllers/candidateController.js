const User = require("../models/User");

// @desc    Get all candidates with filters
// @route   GET /api/candidates
// @access  Public (or restricted to recruiters)
exports.getAllCandidates = async (req, res) => {
  try {
    const { gender, location, experience, education, phone, email, search } =
      req.query;

    const filter = { role: "user" };

    if (gender && gender !== "All") filter.gender = gender;
    if (location) filter.location = { $regex: location, $options: "i" };
    if (experience) filter.experience = { $regex: experience, $options: "i" };
    if (education) filter.education = { $regex: education, $options: "i" };
    if (phone) filter.phone = { $regex: phone, $options: "i" };
    if (email) filter.email = { $regex: email, $options: "i" };

    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { profession: { $regex: search, $options: "i" } },
        { skills: { $regex: search, $options: "i" } },
      ];
    }

    const candidates = await User.find(filter).select(
      "firstName lastName profileImage profession education email phone location experience gender dob bio coverLetter"
    );

    res.status(200).json({
      success: true,
      count: candidates.length,
      data: candidates,
    });
  } catch (error) {
    console.error("Error fetching candidates:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all recruiters
// @route GET /api/recruiters
// @access Public
exports.getAllRecruiters = async (req, res) => {
  try {
    // Fetch users with recruiter role
    const recruiters = await User.find({ role: "recruiter" }).select(
      "firstName lastName email phone location company"
    );

    // Format data to flatten the structure for frontend
    const formatted = recruiters.map((r) => ({
      id: r._id,
      recruiterName: `${r.firstName} ${r.lastName}`,
      email: r.email,
      phone: r.phone,
      location: r.location,
      companyName: r.company?.name,
      companyLogo: r.company?.logo,
      companyBanner: r.company?.banner,
      about: r.company?.about,
      vision: r.company?.vision,
      website: r.company?.website,
      industry: r.company?.industryType || r.company?.industry,
      employees: r.company?.employees,
      notificationEmail: r.company?.notificationEmail,
      socialLinks: r.company?.socialLinks,
    }));

    res.status(200).json({ success: true, data: formatted });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
