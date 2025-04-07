const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
    maxlength: [50, "Name cannot exceed 50 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
    minlength: [8, "Password must be at least 8 characters long"],
  },
  contactNo: {
    type: String,
    required: function () {
      return !this.googleId;
    },
    unique: true,
    sparse: true,
    match: [/^\d{10}$/, "Contact number must be 10 digits"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model
module.exports = mongoose.model("User", UserSchema);
