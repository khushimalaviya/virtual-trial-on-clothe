const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const axios = require("axios");
const ImageModel = require("../models/ImageModel"); // Ensure you have an ImageModel for MongoDB

const router = express.Router();

// Define storage for Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, "..", "uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir); // Save files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname); // Unique filename
    },
});

// Initialize Multer with the configured storage
const upload = multer({ storage });

// Python API URL
const PYTHON_API_URL = "http://localhost:4000/virtual-trial"; // Adjust if needed

// Upload user image & outfit as files
router.post("/upload-image", upload.fields([{ name: "userImage" }, { name: "outfitImage" }]), async (req, res) => {
    console.log("📥 Incoming Request...");  
  
    try {
        console.log("✅ Received body:", req.body);
        console.log("✅ Received files:", req.files);

        if (!req.files || !req.files.userImage || !req.files.outfitImage) {
            return res.status(400).json({ success: false, message: "Both user image and outfit image are required" });
        }

        const userImagePath = path.resolve(req.files.userImage[0].path);
        const outfitImagePath = path.resolve(req.files.outfitImage[0].path);

        console.log("🔹Processing User Image:", userImagePath);
        console.log("🔹Processing Outfit Image:", outfitImagePath);

        // Send to Python for processing
        const response = await axios.post(PYTHON_API_URL, {
            userImage: userImagePath,
            outfitImage: outfitImagePath,
        });

        if (!response.data.resultImage) throw new Error("Processing failed");

        // Save result in MongoDB
        const newImage = new ImageModel({
            userImage: userImagePath,
            outfitImage: outfitImagePath,
            resultImage: response.data.resultImage,
        });
        await newImage.save();

        res.json({ success: true, resultImage: response.data.resultImage });
    } catch (error) {
        console.error("❌ Upload error:", error);  // Log full error
        res.status(500).json({ success: false, message: "Server error", error: error.toString() });
    }
});

module.exports = router;
