const mongoose = require("mongoose");

const aboutSchema = new mongoose.Schema({
    s1_title: {
        type: String
    },
    s1_description: {
        type: String
    },
    since: {
        type: String
    },
    brands: {
        type: String
    },
    products: {
        type: String
    },
    s2_text: {
        type: String
    },
    s2_desc: {
        type: String
    },
    s2_img: {
        type: String
    },
    s3_text: {
        type: String
    },
    s3_desc: {
        type: String
    },
    s3_img: {
        type: String
    },
    mission: {
        type: String
    },
    vision: {
        type: String
    },
    // partners:{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Partner"
    // }
}, {timestamps: true})

module.exports = mongoose.model("About", aboutSchema)