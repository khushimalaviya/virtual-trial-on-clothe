const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Profile = require("../models/Profile");

// Fetch both account details and body measurements
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId });
    const profile = await Profile.findOne({ userId });

    if (!user || !profile) {
      return res.status(404).json({ message: "User or Profile not found" });
    }

    res.json({ user, profile });
  } catch (error) {
    res.status(500).json({ message: "Error fetching data", error });
  }
});

// Update account details
router.put("/update-account/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedUser = await User.findOneAndUpdate({ userId }, req.body, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Account details updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error updating account details", error });
  }
});

// Update body measurement details
router.put("/update-profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedProfile = await Profile.findOneAndUpdate({ userId }, req.body, { new: true });

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json({ message: "Body measurement details updated successfully", profile: updatedProfile });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile details", error });
  }
});

module.exports = router;

// Integration in server.js
// const accountAndBodyRoutes = require("./routes/accountAndBodyRoutes");
// app.use("/api/account-body", accountAndBodyRoutes);