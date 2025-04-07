const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Create new category
// router.post('/', async (req, res) => {
//   try {
//     const { categoryId, name } = req.body;
//     const newCategory = new Category({ categoryId, name });
//     await newCategory.save();
//     res.status(201).json(newCategory);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// Create single or multiple categories
router.post('/', async (req, res) => {
  try {
    const data = Array.isArray(req.body) ? req.body : [req.body];
    const categories = await Category.insertMany(data);
    res.status(201).json(categories);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Get all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single category by ID
router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findOne({ categoryId: req.params.id });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update category
router.put('/:id', async (req, res) => {
  try {
    const updated = await Category.findOneAndUpdate(
      { categoryId: req.params.id },
      { $set: req.body },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Category not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete category
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({ categoryId: req.params.id });
    if (!deleted) return res.status(404).json({ message: 'Category not found' });
    res.json({ message: 'Category deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
