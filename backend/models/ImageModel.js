const mongoose = require("mongoose");

const ImageSchema = new mongoose.Schema({
  userImage: String,
  outfitImage: String,
  resultImage: String,
});

module.exports = mongoose.model("Image", ImageSchema);
