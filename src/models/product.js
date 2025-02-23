const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
  
    image: {
        type: String,
        // required: true,
    },
    
    description: {
        type: String,
        required: true,
    },
    category: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "Category"
    },
    priority:{
        type: Number
    },
    regions: [
        {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Region"
        }
    ],
    flag:{
        type: Boolean,
    
    },
    size: {
        type: String
    },
    length: {
        type: String
    },
    grade: {
        type: String
    },
    type: {
        type: String
    },
    type_slug: {
        type: String
    }
  
}, {timestamps: true});
module.exports = mongoose.model("Product", ProductSchema);