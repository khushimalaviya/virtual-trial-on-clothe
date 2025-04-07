const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const ChartMapping = require('../models/ChartMapping');
const Color = require('../models/Color');

// New route: GET /by-category-size/:categoryId/:sizeId

router.get('/by-category-size/:categoryId/:sizeId', async (req, res) => {
  const { categoryId, sizeId } = req.params;

  try {
    const mappings = await ChartMapping.find({
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
    console.error('Error fetching colors by category and size:', err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
