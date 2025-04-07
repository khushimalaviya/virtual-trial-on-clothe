const mongoose = require("mongoose");

const SizeRecommendationSchema = new mongoose.Schema({
    user_id: 
    { 
        type: String, 
        required: true 
    },

    brand: 
    { 
        type: String, required: true },
    category: { type: String, required: true },
    recommended_size: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model("SizeRecommendation", SizeRecommendationSchema);
