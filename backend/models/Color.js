const mongoose = require("mongoose");

const colorSchema = new mongoose.Schema({
  color_id:{
    type: String,
    required: true,
    unique: true
  },
  name: { type: String, required: true }, // Color name
  hex: { type: String, required: true },  // Hex code (e.g., #FF5733)
  rgb: { type: String, required: true },  // RGB format (e.g., "255,87,51")
  createdAt: { type: Date, default: Date.now }, // Timestamp
});

module.exports = mongoose.model("Color", colorSchema);
