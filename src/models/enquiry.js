const mongoose = require("mongoose");

const EnquirySchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
},
    {timestamps: true}
);

const Enquiry = mongoose.model("Enquiry", EnquirySchema);
module.exports = Enquiry;