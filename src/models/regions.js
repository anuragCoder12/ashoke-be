const mongoose = require("mongoose");

const RegionSchema = new mongoose.Schema({
    
        region_name: {
            type: String,
            required: true,
        },
        manager_name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        }
    
});

module.exports = mongoose.model("Region", RegionSchema);