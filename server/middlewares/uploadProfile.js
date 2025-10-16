const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Cloudinary storage for profile images
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profile_images",
    format: (req, file) => file.mimetype.split("/")[1], // safe now
    public_id: (req, file) => "profile-" + Date.now(),
  },
});

const uploadProfile = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!["image/jpeg", "image/png", "image/jpg"].includes(file.mimetype)) {
      return cb(new Error("Only JPG, JPEG, PNG files are allowed"));
    }
    cb(null, true);
  },
});

module.exports = uploadProfile;
