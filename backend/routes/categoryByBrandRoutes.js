const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ChartMapping = require('../models/ChartMapping');
const Category = require('../models/Category');

// Get categories used by a specific brand from ChartMapping table
router.get('/by-brand/:brandId', async (req, res) => {
  try {
    const brandObjectId = new mongoose.Types.ObjectId(req.params.brandId);

    // Find distinct category ObjectIds used by this brand
    const categoryIds = await ChartMapping.distinct('category_id', {
      brand_id: brandObjectId
    });

    // Fetch full category details
    const categories = await Category.find({ _id: { $in: categoryIds } });

    res.json(categories);
  } catch (err) {
    console.error('Error fetching categories by brand:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
