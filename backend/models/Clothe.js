const mongoose = require("mongoose");

const ClotheSchema = new mongoose.Schema({
    clothe_id:
    {
        type: String,
        required: true,
        unique: true
    },

    name:
    {
        type: String,
        required: true
        },
    // sizes: 
    // { 
    //     type: [String], required: true },
    // image_url: 
    // { 
    //     type: String, 
    //     required: true 
    // }
});

module.exports = mongoose.model("Clothe", ClotheSchema);