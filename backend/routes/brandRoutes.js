const express = require("express");
const router = express.Router();
const Brand = require("../models/Brand");

// Add a new brand
router.post("/", async (req, res) => {
    try {
        const { brand_id, brandName } = req.body;
        const newBrand = new Brand({ brand_id, brandName });
        await newBrand.save();
        res.status(201).json({ message: "Brand added successfully", brand: newBrand });
    } catch (error) {
        res.status(500).json({ message: "Error adding brand", error });
    }
});

// Get all brands
router.get("/", async (req, res) => {
    try {
        const brands = await Brand.find();
        res.json(brands);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving brands", error });
    }
});

// Get a single brand by ID
router.get("/:id", async (req, res) => {
    try {
        const brand = await Brand.findOne({ brand_id: req.params.id });
        if (!brand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        res.json(brand);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving brand", error });
    }
});

// Update a brand by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedBrand = await Brand.findOneAndUpdate(
            { brand_id: req.params.id },
            { brandName: req.body.brandName },
            { new: true }
        );
        if (!updatedBrand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        res.json({ message: "Brand updated successfully", brand: updatedBrand });
    } catch (error) {
        res.status(500).json({ message: "Error updating brand", error });
    }
});

// Delete a brand by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedBrand = await Brand.findOneAndDelete({ brand_id: req.params.id });
        if (!deletedBrand) {
            return res.status(404).json({ message: "Brand not found" });
        }
        res.json({ message: "Brand deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting brand", error });
    }
});

module.exports = router;
