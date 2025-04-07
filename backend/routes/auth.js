const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { OAuth2Client } = require("google-auth-library");

const router = express.Router();
const client = new OAuth2Client("hSEWni0J7Wal46e977Vk5xhvumV2");

// Generate UserId in format U0001, U0002, etc.
const generateUserId = async () => {
  const latestUser = await User.findOne().sort({ userId: -1 });
  if (!latestUser || !latestUser.userId) return "U0001";
  const userNumber = parseInt(latestUser.userId.slice(1)) + 1;
  return `U${userNumber.toString().padStart(4, '0')}`;
};

// ✅ Google Login Route (Without Token Verification)
router.post("/google-auth", async (req, res) => {
  try {
    const { name, email, googleId } = req.body;

    if (!name || !email || !googleId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    let user = await User.findOne({ email });

    // ✅ If user does not exist, create a new one with userId
    if (!user) {
      const userId = await generateUserId();
      user = new User({ userId, name, email, googleId });
      await user.save();
    }

    res.status(200).json({ message: "Google authentication successful", user });
  } catch (error) {
    console.error("Google Auth Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Secure Signup Route (with UserId generation)
router.post("/signup", async (req, res) => {
  const { name, email, password, contactNo } = req.body;

  if (!name || !email || !password || !contactNo) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (await User.findOne({ email })) {
    return res.status(400).json({ error: "Email already in use" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await generateUserId();
    const newUser = new User({ userId, name, email, password: hashedPassword, contactNo });
    await newUser.save();
    res.status(201).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

// ✅ Secure Login Route (with UserId)
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ If Google login, password won't be present
    if (!user.password) {
      return res.status(400).json({ error: "This account was created using Google. Please log in using Google." });
    }

    // 🔒 Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", userId: user.userId, name: user.name });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
