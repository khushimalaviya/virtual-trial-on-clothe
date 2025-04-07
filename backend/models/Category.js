const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  category_id: {
    type: String,
    required: true,
    unique: true
  },
  cat_name: {
    type: String,
    required: true
  }
}, {
  timestamps: true // automatically adds createdAt and updatedAt
});

module.exports = mongoose.model('Category', categorySchema);
