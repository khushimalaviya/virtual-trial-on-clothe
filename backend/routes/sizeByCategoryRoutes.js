const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ChartMapping = require('../models/ChartMapping');
const Size = require('../models/Sizes');

// Get sizes used in a specific category from ChartMapping
router.get('/by-brand-category/:brandId/:categoryId', async (req, res) => {
  try {
    const brandObjectId = new mongoose.Types.ObjectId(req.params.brandId);
    const categoryObjectId = new mongoose.Types.ObjectId(req.params.categoryId);

    // Find distinct size IDs from chart mapping
    const sizeIds = await ChartMapping.distinct('size_id', {
      brand_id: brandObjectId,
      category_id: categoryObjectId
    });

    const sizes = await Size.find({ _id: { $in: sizeIds } });

    res.json(sizes);
  } catch (err) {
    console.error('Error fetching sizes by brand and category:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
