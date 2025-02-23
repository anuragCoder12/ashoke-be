const mongoose = require("mongoose");

const contactPageSchema = new mongoose.Schema({
    title: {
        type: String
    },
    desc: {
        type: String
    },
    location: {
        type: String
    },
    email: {
        type: String
    },
    phone_1: {
        type: String
    },
    name_1: {
        type: String
    },
    position_1: {
        type: String
    },
    phone_2: {
        type: String
    },
    name_2: {
        type: String
    },
    position_2: {
        type: String
    },
    twiter: {
        type: String
    },
    facebook: {
        type: String
    },
    instagram: {
        type: String
    },
   
}, {timestamps: true})

module.exports = mongoose.model("ContactPage", contactPageSchema)