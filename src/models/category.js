const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    image: {
        type: String,
    },
    logo: {
        type: String,
    },
    description: {
        type: String,
    },
    slug: {
        type: String
    },
    regions: [
        {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region"
        }
    ],
}, {timestamps: true});

module.exports = mongoose.model("Category", categorySchema);