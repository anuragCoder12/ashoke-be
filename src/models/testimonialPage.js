const mongoose = require("mongoose");

const testimonialPageSchema = new mongoose.Schema({
    title: {
        type: String
    },
    video: {
        type: String
    }
}, {timestamps: true})

module.exports = mongoose.model("TestimonialPage", testimonialPageSchema)