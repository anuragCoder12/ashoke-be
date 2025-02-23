const express = require("express");
const router = express.Router();
const testimonialUpload = require("../middleware/upload/testimonialUpload")
const { postTestimoanials, getTestimonials, updateTestimonial, deleteTestimonial, getSingleTestimonial } = require("../controllers/testimonial")

router.post("/create", testimonialUpload, postTestimoanials)
  router.get("/", getTestimonials)
  router.get("/:id", getSingleTestimonial)
  router.put("/:id", testimonialUpload, updateTestimonial)
  router.delete("/:id", deleteTestimonial)

  module.exports = router