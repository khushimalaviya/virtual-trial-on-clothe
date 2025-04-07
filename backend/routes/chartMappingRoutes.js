const express = require("express");
const router = express.Router();
const ChartMapping = require("../models/ChartMapping");

// GET all chart mappings with populated references
router.get("/", async (req, res) => {
  try {
    const mappings = await ChartMapping.find().populate("brand_id category_id size_id color_id clothe_id");
    res.json(mappings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single mapping by ID
router.get("/:id", async (req, res) => {
  try {
    const mapping = await ChartMapping.findById(req.params.id).populate("brand_id category_id size_id color_id clothe_id");
    if (!mapping) return res.status(404).json({ message: "Mapping not found" });
    res.json(mapping);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE a new chart mapping
router.post("/", async (req, res) => {
  try {
    const newMapping = new ChartMapping(req.body);
    const saved = await newMapping.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a mapping by ID
router.put("/:id", async (req, res) => {
  try {
    const updated = await ChartMapping.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Mapping not found" });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a mapping by ID
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await ChartMapping.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Mapping not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
