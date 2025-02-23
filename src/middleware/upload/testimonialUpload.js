// middleware/uploads/testimonialUpload.js
const baseUpload = require("./baseUpload");

const testimonialUpload = baseUpload.fields([
  { name: "thumb_image", maxCount: 1 },

]);

module.exports = testimonialUpload;
