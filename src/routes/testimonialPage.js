const express = require("express");
const router = express.Router();
const { getTestimonialPage, createTestimonialPage, upateTestimonialPage } = require("../controllers/testimonialPage");
const baseUpload = require("../middleware/fileUpload")

router.get("/", getTestimonialPage);
router.post("/create",  baseUpload.fields([{ name: "video", maxCount: 1 }]), createTestimonialPage);router.put("/", upateTestimonialPage);

module.exports = router;