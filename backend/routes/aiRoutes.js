const express = require("express");
const axios = require("axios");

const router = express.Router();

// **Detect Skin Tone & Body Type**
router.post("/detect-features", async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const response = await axios.post("http://localhost:5001/detect-features", { imageUrl });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Error processing image" });
  }
});

// **Remove Background**
router.post("/remove-bg", async (req, res) => {
  try {
    const { imageUrl } = req.body;
    const response = await axios.post("http://localhost:5001/remove-bg", { imageUrl });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Background removal failed" });
  }
});

// **Get Outfit Recommendations**
router.post("/suggest-outfits", async (req, res) => {
  try {
    const { skinTone, bodyType } = req.body;
    const response = await axios.post("http://localhost:5001/suggest-outfits", { skinTone, bodyType });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Style recommendation failed" });
  }
});

module.exports = router;
