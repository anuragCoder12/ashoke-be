const cloudinary = require("../../config/cloudinaryConfig");
const { CloudinaryStorage } = require("multer-storage-cloudinary"); 
const multer = require("multer");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
      folder: "videos",
      allowed_formats: ['mp4', 'mov', 'avi', 'wmv'],
      resource_type: "video",
  },
});

const videoUpload = multer({ storage });

module.exports = videoUpload;