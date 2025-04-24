const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User'); // Your Mongoose User model
const bcrypt = require('bcrypt');

// In-memory storage for OTPs (Use Redis in production)
const otpStore = new Map();

// Nodemailer setup (example using Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'khushimalaviya60@gmail.com', // Replace with your email
    pass: 'ftphvilgjmmpvyor'   // Replace with your email password or app password
  }
});

// Send OTP
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore.set(email, otp);

    await transporter.sendMail({
      from: '"Virtual Trial on Clothe" <virtualtrialonclothe@gmail.com>',
      to: email,
      subject: 'OTP for Password Reset',
      text: `Your OTP is ${otp}`
    });

    res.json({ message: 'OTP sent' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Verify OTP
router.post('/verify-otp', (req, res) => {
  const { email, otp } = req.body;

  const storedOtp = otpStore.get(email);
  if (storedOtp && storedOtp === otp) {
    otpStore.delete(email); // Optional: remove OTP after use
    res.json({ message: 'OTP verified' });
  } else {
    res.status(400).json({ error: 'Invalid OTP' });
  }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
    res.json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
