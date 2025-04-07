const mongoose = require("mongoose");

const VirtualTryonSchema = new mongoose.Schema({
  tryon_id: {
    type: String,
    required: true,
    unique: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // Reference to categories collection
    required: true,
  },
  size_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Size", // Reference to sizes collection
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  preview_image_url: {
    type: String,
    required: true,
  }
}, {
  collection: "VirtualTryon"
});

module.exports = mongoose.model("VirtualTryon", VirtualTryonSchema);
