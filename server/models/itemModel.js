const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  mainText: { type: String, required: true },
  fileUrl: { type: String },
  iconImageUrl: { type: String, required: true },
});

module.exports = mongoose.model('Item', itemSchema);
