const express = require("express");
const router = express.Router();
const SizeRecommendation = require("../models/SizeRecommendation");

// Add a new size recommendation
router.post("/", async (req, res) => {
    try {
        const { user_id, brand, category, recommended_size } = req.body;
        const newSizeRecommendation = new SizeRecommendation({
            user_id,
            brand,
            category,
            recommended_size,
            timestamp: new Date()
        });

        await newSizeRecommendation.save();
        res.status(201).json({ message: "Size recommendation added successfully", recommendation: newSizeRecommendation });
    } catch (error) {
        res.status(500).json({ message: "Error adding size recommendation", error });
    }
});

// Get all size recommendations
router.get("/", async (req, res) => {
    try {
        const recommendations = await SizeRecommendation.find();
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving size recommendations", error });
    }
});

// Get size recommendations by user ID
router.get("/:user_id", async (req, res) => {
    try {
        const recommendations = await SizeRecommendation.find({ user_id: req.params.user_id });
        if (recommendations.length === 0) {
            return res.status(404).json({ message: "No size recommendations found for this user" });
        }
        res.json(recommendations);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving size recommendations", error });
    }
});

// Update a size recommendation by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedRecommendation = await SizeRecommendation.findByIdAndUpdate(
            req.params.id,
            { ...req.body, timestamp: new Date() },
            { new: true }
        );
        if (!updatedRecommendation) {
            return res.status(404).json({ message: "Size recommendation not found" });
        }
        res.json({ message: "Size recommendation updated successfully", recommendation: updatedRecommendation });
    } catch (error) {
        res.status(500).json({ message: "Error updating size recommendation", error });
    }
});

// Delete a size recommendation by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedRecommendation = await SizeRecommendation.findByIdAndDelete(req.params.id);
        if (!deletedRecommendation) {
            return res.status(404).json({ message: "Size recommendation not found" });
        }
        res.json({ message: "Size recommendation deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting size recommendation", error });
    }
});

module.exports = router;
