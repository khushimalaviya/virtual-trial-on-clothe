const mongoose = require("mongoose");

const SizeSchema = new mongoose.Schema({
    size_id: { 
        type: String, 
        required: true,
        unique: true
    },

    size: { 
        type: String, 
        required: true 
    },

    chest: { 
        type: String, 
        required: true 
    },

    waist: { 
        type: String, 
        required: true 
    },

    fit: { 
        type: String, 
        required: true 
    },

    timestamp: { 
        type: Date, 
        default: Date.now 
    }
});

module.exports = mongoose.model("Size", SizeSchema);
