const mongoose = require("mongoose");

const chartMappingSchema = new mongoose.Schema({
    chart_id: {
        type: String,
        required: true,
        unique: true
    },
    brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Brand",
        required: true
    },
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    size_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Size",
        required: true
    },
    color_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Color",
        required: true
    },
    clothe_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clothe",
        required: true
    },
    image_url: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("ChartMapping", chartMappingSchema);
