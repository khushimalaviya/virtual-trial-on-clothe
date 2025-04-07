const express = require("express");
const router = express.Router();
const ChartMapping = require("../models/ChartMapping");

// ✅ Keep this FIRST
router.get("/by-selection", async (req, res) => {
  try {
    const { brand_id, category_id, size_id, color_id } = req.query;

    if (!brand_id || !category_id || !size_id || !color_id) {
      return res.status(400).json({ error: "All parameters are required." });
    }

    const chart = await ChartMapping.findOne({
      brand_id,
      category_id,
      size_id,
      color_id,
    });

    if (!chart) {
      return res.status(404).json({ error: "No chart mapping found for this selection." });
    }

    res.json({
      image_url: chart.image_url,
      chart_id: chart.chart_id,
      clothe_id: chart.clothe_id,
    });
  } catch (err) {
    console.error("Error in /by-selection:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ⚠️ This should be BELOW the custom route
router.get("/:id", async (req, res) => {
  try {
    const chart = await ChartMapping.findById(req.params.id);
    if (!chart) {
      return res.status(404).json({ error: "Chart mapping not found." });
    }
    res.json(chart);
  } catch (err) {
    console.error("Error in /:id:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
