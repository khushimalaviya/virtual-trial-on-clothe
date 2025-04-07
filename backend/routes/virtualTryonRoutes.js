const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const VirtualTryon = require("../models/VirtualTryOn");
const Category = require("../models/Category");

// Generate TR00001, TR00002, ...
const generateTryonId = async () => {
  const latestTryon = await VirtualTryon.findOne().sort({ tryon_id: -1 });

  if (!latestTryon || !latestTryon.tryon_id) return "TR00001";

  const tryonNumber = parseInt(latestTryon.tryon_id.slice(2)) + 1;
  return `TR${tryonNumber.toString().padStart(5, '0')}`;
};

// Upload Virtual Try-On Image
router.post("/upload-image", async (req, res) => {
    try {
      const {
        user_id,
        category_id,
        size_id,
        resultImageUrl
      } = req.body;
  
      console.log("🛠️ Incoming data:", { user_id, category_id, size_id, resultImageUrl });
  
      if (!resultImageUrl || !user_id || !category_id || !size_id) {
        return res.status(400).json({ success: false, message: "Missing required fields" });
      }
  
      const nextTryonId = await generateTryonId();
  
      const savedTryon = await VirtualTryon.create({
        tryon_id: nextTryonId,
        user_id: user_id,
        // user_id: new mongoose.Types.ObjectId(user_id),
        category_id: new mongoose.Types.ObjectId(category_id),
        size_id: new mongoose.Types.ObjectId(size_id),
        preview_image_url: resultImageUrl
      });
  
      res.status(201).json({ success: true, savedTryon });
    } catch (err) {
      console.error("❌ Error storing try-on:", err.message);
      res.status(500).json({ success: false, message: "Failed to save try-on" });
    }
  });

// Get all virtual try-on records
router.get("/", async (req, res) => {
  try {
    const records = await VirtualTryon.find()
    //   .populate("user_id")
      .populate("category_id")
      .populate("size_id");
    res.json(records);
  } catch (error) {
    res.status(500).json({ message: "Error fetching records", error });
  }
});

// Get single try-on record by tryon_id
router.get("/:tryon_id", async (req, res) => {
  try {
    const record = await VirtualTryon.findOne({ tryon_id: req.params.tryon_id })
    //   .populate("user_id")
      .populate("category_id")
      .populate("size_id");

    if (!record) {
      return res.status(404).json({ message: "Try-on record not found" });
    }

    res.json(record);
  } catch (error) {
    res.status(500).json({ message: "Error fetching try-on record", error });
  }
});

// Get total count of virtual try-ons
router.get("/stats/total-trials", async (req, res) => {
    try {
      const totalTrials = await VirtualTryon.countDocuments();
      res.json({ totalTrials });
    } catch (error) {
      res.status(500).json({ message: "Error fetching total trials", error });
    }
  });
  
 // Get top 5 categories by usage
router.get("/stats/top-categories", async (req, res) => {
    try {
      const results = await VirtualTryon.aggregate([
        {
          $group: {
            _id: "$category_id",
            trials: { $sum: 1 }
          }
        },
        {
            $lookup: {
                from: "categories", // ✅ This is okay *only* if your MongoDB collection is named `categories`
                localField: "_id",
                foreignField: "_id",
                as: "category"
              }              
        },
        { $unwind: "$category" },
        {
          $project: {
            name: "$category.cat_name",
            trials: 1
          }
        },
        { $sort: { trials: -1 } },
        { $limit: 5 }
      ]);
  
      res.json(results);
    } catch (err) {
      console.error("❌ Error fetching top categories:", err);
      res.status(500).json({ message: "Server error" });
    }
  });
  const User = require("../models/User"); // Adjust path as needed

router.get("/stats/recent", async (req, res) => {
  try {
    const recent = await VirtualTryon.find()
      .sort({ timestamp: -1 })
      .limit(5)
      .populate("category_id", "cat_name");

    const formatted = await Promise.all(recent.map(async (item) => {
      const user = await User.findOne({ userId: item.user_id }); // match by "U0001"
      return {
        user: user?.name || "Unknown",
        category: item.category_id?.cat_name || "Unknown",
        time: item.timestamp,
      };
    }));

    res.json(formatted);
  } catch (err) {
    console.error("❌ Error fetching recent try-ons:", err);
    res.status(500).json({ message: "Server error" });
  }
});

  
module.exports = router;
