const mongoose = require("mongoose");

const SystemLogSchema = new mongoose.Schema({
    event: { type: String, required: true },
    user_id: { type: String },
    status: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    details: { type: String }
});
module.exports = mongoose.model("SystemLog", SystemLogSchema);