const express = require("express");
const router = express.Router();
const SocialSharing = require("../models/SocialSharing");

// Add a new social sharing record
router.post("/", async (req, res) => {
    try {
        const { user_id, try_on_id, shared_link } = req.body;
        const newSocialSharing = new SocialSharing({
            user_id,
            try_on_id,
            shared_link,
            timestamp: new Date()
        });

        await newSocialSharing.save();
        res.status(201).json({ message: "Shared link added successfully", socialSharing: newSocialSharing });
    } catch (error) {
        res.status(500).json({ message: "Error adding shared link", error });
    }
});

// Get all social sharing records
router.get("/", async (req, res) => {
    try {
        const shares = await SocialSharing.find();
        res.json(shares);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving shared links", error });
    }
});

// Get all shared links by user ID
router.get("/:user_id", async (req, res) => {
    try {
        const shares = await SocialSharing.find({ user_id: req.params.user_id });
        if (shares.length === 0) {
            return res.status(404).json({ message: "No shared links found for this user" });
        }
        res.json(shares);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving shared links", error });
    }
});

// Update a shared link by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedSharing = await SocialSharing.findByIdAndUpdate(
            req.params.id,
            { ...req.body, timestamp: new Date() },
            { new: true }
        );
        if (!updatedSharing) {
            return res.status(404).json({ message: "Shared link not found" });
        }
        res.json({ message: "Shared link updated successfully", socialSharing: updatedSharing });
    } catch (error) {
        res.status(500).json({ message: "Error updating shared link", error });
    }
});

// Delete a shared link by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedSharing = await SocialSharing.findByIdAndDelete(req.params.id);
        if (!deletedSharing) {
            return res.status(404).json({ message: "Shared link not found" });
        }
        res.json({ message: "Shared link deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting shared link", error });
    }
});

module.exports = router;
