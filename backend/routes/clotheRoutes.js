const express = require("express");
const router = express.Router();
const Clothe = require("../models/ChartMapping");
const mongoose = require("mongoose");

// Add a new Clothe item
router.post("/", async (req, res) => {
    try {
        const { clothe_id, name } = req.body;
        const newClothe = new Clothe({ clothe_id, name });
        await newClothe.save();
        res.status(201).json({ message: "Clothe item added successfully", clothe: newClothe });
    } catch (error) {
        res.status(500).json({ message: "Error adding Clothe item", error });
    }
});

router.get("/", async (req, res) => {
    try {
        const charts = await Clothe.find()
            .populate("brand_id", "brandName")
            .populate("category_id", "cat_name")
            .populate("size_id", "size chest waist fit")
            .populate("color_id", "name hex rgb")
            .populate("clothe_id", "name");

        res.json(charts);
    } catch (error) {
        console.error("Detailed ChartMapping Error:", error);  // 👈 log full error
        res.status(500).json({ message: "Error fetching chart mappings", error: error.message || error });
    }
});



// Get a single Clothe item by ID
router.get("/:id", async (req, res) => {
    try {
        const clotheItem = await Clothe.findOne({ clothe_id: req.params.id });
        if (!clotheItem) {
            return res.status(404).json({ message: "Clothe item not found" });
        }
        res.json(clotheItem);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving Clothe item", error });
    }
});


router.get("/products/:id", async (req, res) => {
    try {
        // console.log("Received request for ID:", req.params.id);

        // Ensure the ID is valid
        if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid product ID format" });
        }

        // Fetch product from database
        const product = await Clothe.findById(req.params.id);
        console.log("Database result:", product);

        if (!product) {
            return res.status(404).json({ message: 'Clothe item not found' });
        }

        // Fix image_url path
        const fixedImagePath = product.image_url.replace(
            "D:\\MCA-Project\\virtual-trial-on-cloth\\frontend\\public",
            ""
        );

        res.json({ ...product.toObject(), image_url: fixedImagePath });
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update a Clothe item by clothe_id
router.put("/:id", async (req, res) => {
    try {
        const updatedClothe = await Clothe.findOneAndUpdate(
            { clothe_id: req.params.id },
            { name: req.body.name },
            { new: true }
        );
        if (!updatedClothe) {
            return res.status(404).json({ message: "Clothe item not found" });
        }
        res.json({ message: "Clothe item updated successfully", clothe: updatedClothe });
    } catch (error) {
        res.status(500).json({ message: "Error updating Clothe item", error });
    }
});

// Delete a Clothe item by clothe_id
router.delete("/:id", async (req, res) => {
    try {
        const deletedClothe = await Clothe.findOneAndDelete({ clothe_id: req.params.id });
        if (!deletedClothe) {
            return res.status(404).json({ message: "Clothe item not found" });
        }
        res.json({ message: "Clothe item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting Clothe item", error });
    }
});

module.exports = router;
