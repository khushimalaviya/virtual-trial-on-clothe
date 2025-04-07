const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ChartMapping = require('../models/ChartMapping');
const Size = require('../models/Sizes');

// Get sizes used in a specific category from ChartMapping
router.get('/by-category/:categoryId', async (req, res) => {
  try {
    const categoryObjectId = new mongoose.Types.ObjectId(req.params.categoryId);

    // Get all distinct size ObjectIds for this category
    const sizeIds = await ChartMapping.distinct('size_id', {
      category_id: categoryObjectId
    });

    // Fetch full size details
    const sizes = await Size.find({ _id: { $in: sizeIds } });

    res.json(sizes);
  } catch (err) {
    console.error('Error fetching sizes by category:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
