// middleware/uploads/aboutUpload.js
const baseUpload = require("./baseUpload");

const aboutUpload = baseUpload.fields([
  { name: "s2_about_img", maxCount: 1 },
  { name: "s3_about_img", maxCount: 1 }
]);

module.exports = aboutUpload;
