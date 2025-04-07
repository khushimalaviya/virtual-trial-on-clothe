const express = require("express");
const router = express.Router();
const Profile = require("../models/Profile");

// Add a new profile
router.post("/", async (req, res) => {
    try {
        const { profileId, userId, height, weight, chest_size, waist_size, hip_size, skin_tone, body_shape } = req.body;
        const newProfile = new Profile({
            profileId,
            userId,
            height,
            weight,
            chest_size,
            waist_size,
            hip_size,
            skin_tone,
            body_shape,
            created_at: new Date(),
            updated_at: new Date()
        });

        await newProfile.save();
        res.status(201).json({ message: "Profile added successfully", profile: newProfile });
    } catch (error) {
        res.status(500).json({ message: "Error adding profile", error });
    }
});

// Get all profiles
router.get("/", async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving profiles", error });
    }
});

// Get a single profile by profileId
// router.get("/:id", async (req, res) => {
//     try {
//         const profile = await Profile.findOne({ profileId: req.params.id });
//         if (!profile) {
//             return res.status(404).json({ message: "Profile not found" });
//         }
//         res.json(profile);
//     } catch (error) {
//         res.status(500).json({ message: "Error retrieving profile", error });
//     }
// });

// Get a single profile by userId
router.get("/:id", async (req, res) => {
    try {
        const profile = await Profile.findOne({ userId: req.params.id });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json(profile);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving profile", error });
    }
});


// Update a profile by profileId
router.put("/:id", async (req, res) => {
    try {
        const updatedProfile = await Profile.findOneAndUpdate(
            { profileId: req.params.id },
            { ...req.body, updated_at: new Date() },
            { new: true }
        );
        if (!updatedProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json({ message: "Profile updated successfully", profile: updatedProfile });
    } catch (error) {
        res.status(500).json({ message: "Error updating profile", error });
    }
});

// Delete a profile by profileId
router.delete("/:id", async (req, res) => {
    try {
        const deletedProfile = await Profile.findOneAndDelete({ profileId: req.params.id });
        if (!deletedProfile) {
            return res.status(404).json({ message: "Profile not found" });
        }
        res.json({ message: "Profile deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting profile", error });
    }
});

module.exports = router;
