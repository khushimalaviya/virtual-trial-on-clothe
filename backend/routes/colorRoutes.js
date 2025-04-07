const express = require("express");
const Color = require("../models/Color");

const router = express.Router();

// ✅ Add a new color
router.post("/add", async (req, res) => {
  try {
    const { name, hex, rgb } = req.body;
    const newColor = new Color({ name, hex, rgb });
    await newColor.save();
    res.status(201).json({ message: "Color added successfully", color: newColor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get all colors
router.get("/", async (req, res) => {
  try {
    const colors = await Color.find();
    res.json(colors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Get a single color by ID
router.get("/:id", async (req, res) => {
  try {
    const color = await Color.findById(req.params.id);
    if (!color) return res.status(404).json({ message: "Color not found" });
    res.json(color);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Delete a color by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedColor = await Color.findByIdAndDelete(req.params.id);
    if (!deletedColor) return res.status(404).json({ message: "Color not found" });
    res.json({ message: "Color deleted successfully", color: deletedColor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
