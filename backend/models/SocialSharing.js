const mongoose = require("mongoose");

const SocialSharingSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    try_on_id: { type: String, required: true },
    shared_link: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model("SocialSharing", SocialSharingSchema);
