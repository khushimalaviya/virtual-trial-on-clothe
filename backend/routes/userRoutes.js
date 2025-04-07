
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Generate UserId in format U0001, U0002, etc.
const generateUserId = async () => {
  const latestUser = await User.findOne().sort({ userId: -1 });
  if (!latestUser || !latestUser.userId) return "U0001";
  const userNumber = parseInt(latestUser.userId.slice(1)) + 1;
  return `U${userNumber.toString().padStart(4, '0')}`;
};

// Get total number of registered users
router.get("/stats/total-users", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ totalUsers });
  } catch (err) {
    res.status(500).json({ message: "Error fetching total users", error: err });
  }
});

// GET user by custom userId
router.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId }).select("-password"); // changed from findById

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, "-password"); // exclude passwords
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/user/add
router.post("/add", async (req, res) => {
  try {
    const { name, email, contactNo,password } = req.body;

    // Optional: Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists" });
    }

    const userId = await generateUserId();
    // const newUser = new User({ userId, name, email, password: hashedPassword, contactNo });

    const newUser = new User({ userId, name, email, password, contactNo });
    await newUser.save();

    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (err) {
    console.error("Error adding user:", err);
    res.status(500).json({ message: "Server error while adding user" });
  }
});

// PUT - Update user by ID
router.put("/:id", async (req, res) => {
  try {
    const { name, email, contactNo, role } = req.body;

    // Validate required fields
    if (!name || !email || !contactNo || !role) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Optional: Validate contactNo is 10 digits
    if (!/^\d{10}$/.test(contactNo)) {
      return res.status(400).json({ error: "Contact number must be 10 digits" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, contactNo, role },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Server error while updating user" });
  }
});

// DELETE user by ID
router.delete("/users/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Server error while deleting user." });
  }
});

module.exports = router;
