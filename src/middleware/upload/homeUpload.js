// middleware/uploads/homeUpload.js
const baseUpload = require("./baseUpload");

const homeUpload = baseUpload.fields([
  { name: "s2_image1", maxCount: 1 },
  { name: "s2_image2", maxCount: 1 },
  { name: "s3_video", maxCount: 1 },
  { name: "satisfied_video", maxCount: 1 },
  { name: "s1_video", maxCount: 1 }
]);

module.exports = homeUpload;
