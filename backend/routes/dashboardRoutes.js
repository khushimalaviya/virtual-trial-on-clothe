const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Category = require("../models/Category");
const Brand = require("../models/Brand");
const VirtualTryon = require("../models/VirtualTryOn");

// GET Total Registered Users
router.get("/total-users", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    res.json({ totalUsers });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch total users" });
  }
});

// GET Total Categories
router.get("/total-categories", async (req, res) => {
  try {
    const totalCategories = await Category.countDocuments();
    res.json({ totalCategories });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// GET Try-on Summary Data
router.get("/tryon-summary", async (req, res) => {
  try {
    const summary = await VirtualTryon.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $group: {
          _id: "$category.cat_name",
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(summary);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch try-on summary" });
  }
});

// GET Top Viewed Categories (simulated via tryon frequency)
router.get("/top-viewed", async (req, res) => {
  try {
    const topViewed = await VirtualTryon.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $group: {
          _id: "$category.cat_name",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 4 },
    ]);
    res.json(topViewed);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch top viewed data" });
  }
});

module.exports = router;
