const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "resumes",
    resource_type: "auto", // allows PDF, DOC, DOCX
    type: "upload", // ✅ change this from "private" to "upload" for public access
    format: async (req, file) => undefined, // keep original format
    public_id: (req, file) => file.fieldname + "-" + Date.now(),
  },
});

const upload = multer({ storage });

module.exports = upload;
