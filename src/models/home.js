const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema({
    s1_title:{
        type: String
    },
    s1_description: {
        type: String
    },
    s1_trust: {
        type: String
    },
    s1_video: {
        type: String
    },
    featured_products: [
     {   type: mongoose.Schema.Types.ObjectId,
        ref: "Product"}
    ],
    s2_desc: {
        type: String
    },
    s2_image1: {
        type: String
    },
    s2_image2: {
        type: String
    },
    s3_video: {
        type: String
    },
    featured_heading: {
        type: String
    },
    featured_desc: {
        type: String
    },
    s4_icon_title:{
        type: String
    },
    satisfied_title: {
        type: String
    },
    satisfied_video: {
        type: String
    },
    

}, { timestamps: true })

module.exports = mongoose.model("Home", homeSchema)