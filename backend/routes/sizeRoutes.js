const express = require('express');
const router = express.Router();
const Size = require('../models/Sizes');

// Create a new size
router.post('/', async (req, res) => {
    try {
        const { size_id, size } = req.body;
        
        // Validate required fields
        if (!size_id || !size) {
            return res.status(400).json({ 
                success: false,
                message: 'size_id and size are required fields' 
            });
        }

        // Check if size_id already exists
        const existingSize = await Size.findOne({ size_id });
        if (existingSize) {
            return res.status(400).json({
                success: false,
                message: 'Size with this ID already exists'
            });
        }

        const newSize = new Size({
            size_id,
            size
        });

        const savedSize = await newSize.save();
        
        res.status(201).json({
            success: true,
            data: savedSize
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get all sizes
router.get('/', async (req, res) => {
    try {
        const sizes = await Size.find().sort({ timestamp: -1 });
        
        res.status(200).json({
            success: true,
            count: sizes.length,
            data: sizes
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Get a single size by ID
router.get('/:size_id', async (req, res) => {
    try {
        const size = await Size.findOne({ size_id: req.params.size_id });
        
        if (!size) {
            return res.status(404).json({
                success: false,
                message: 'Size not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: size
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Update a size
router.put('/:size_id', async (req, res) => {
    try {
        const { size } = req.body;
        
        if (!size) {
            return res.status(400).json({
                success: false,
                message: 'Size field is required for update'
            });
        }

        const updatedSize = await Size.findOneAndUpdate(
            { size_id: req.params.size_id },
            { size },
            { new: true, runValidators: true }
        );

        if (!updatedSize) {
            return res.status(404).json({
                success: false,
                message: 'Size not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: updatedSize
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// Delete a size
router.delete('/:size_id', async (req, res) => {
    try {
        const deletedSize = await Size.findOneAndDelete({ 
            size_id: req.params.size_id 
        });

        if (!deletedSize) {
            return res.status(404).json({
                success: false,
                message: 'Size not found'
            });
        }
        
        res.status(200).json({
            success: true,
            data: deletedSize
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;