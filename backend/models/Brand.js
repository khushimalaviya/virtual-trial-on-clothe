const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
    brand_id: 
    {
        type: String, 
        required: true, 
        unique: true 
    },

    brandName: 
    { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model("Brand", BrandSchema);