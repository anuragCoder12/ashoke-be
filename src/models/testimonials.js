const mongoose  = require("mongoose");

const testimonialSchema = new mongoose.Schema({
    title:{
        type: String,
        // required: true
    },
    description: {
        type: String,
    },
    thumb_image: {
        type: String,
    },
    name:{
        type: String,
        // required: true
    },
    designation:{
        type: String,
    },
    company_name: {
        type: String,
    },
   place:{
    type: String,
   },
   link: {
    type: String
   },
   type: {
    enum: ["text", "file"],
   }

}, { timestamps: true })

module.exports = mongoose.model("Testimonial", testimonialSchema)