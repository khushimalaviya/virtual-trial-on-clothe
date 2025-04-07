const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    profileId: { type: String, required: true, unique: true },
    userId: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    chest_size: { type: Number, required: true },
    waist_size: { type: Number, required: true },
    hip_size: { type: Number, required: true },
    skin_tone: { type: String, required: true },
    body_shape: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model("Profile", ProfileSchema);
