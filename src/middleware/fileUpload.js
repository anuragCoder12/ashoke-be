// middleware/uploads/baseUpload.js
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../../config/cloudinaryConfig");
const multer = require("multer");

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    if (file.mimetype.startsWith('image')) {
      return { folder: "images", allowed_formats: ['jpg', 'png', 'jpeg'], resource_type: "image" };
    } else if (file.mimetype.startsWith('video')) {
      return { folder: "videos", allowed_formats: ['mp4', 'mov', 'avi', 'wmv'], resource_type: "video" };
    }
  },
});

const baseUpload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image') && !file.mimetype.startsWith('video')) {
      return cb(new Error('Only images and videos are allowed'), false);
    }
    cb(null, true);
  },
});

module.exports = baseUpload;
