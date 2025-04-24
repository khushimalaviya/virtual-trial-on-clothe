const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ChartMapping = require('../models/ChartMapping');
const Color = require('../models/Color');

// New route: GET /by-brand-category-size/:brandId/:categoryId/:sizeId
router.get('/by-brand-category-size/:brandId/:categoryId/:sizeId', async (req, res) => {
  const { brandId, categoryId, sizeId } = req.params;

  try {
    const mappings = await ChartMapping.find({
      brand_id: new mongoose.Types.ObjectId(brandId),
      category_id: new mongoose.Types.ObjectId(categoryId),
      size_id: new mongoose.Types.ObjectId(sizeId),
    });

    const colorIds = [...new Set(mappings.map(m => m.color_id))];

    const colors = await Color.find({ _id: { $in: colorIds } });

    const formatted = colors.map(c => ({
      colorId: c._id,
      color_name: c.name,
    }));

    res.json(formatted);
  } catch (err) {
    console.error('Error fetching colors:', err);
    res.status(500).json({ error: 'Server error' });
  }
});



module.exports = router;
