const mongoose = require("mongoose");

const CareerFormSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
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
    file: {
        type: String,
    },
},
    {timestamps: true}    
);

const CareerForm = mongoose.model("CareerForm", CareerFormSchema);
module.exports = CareerForm;