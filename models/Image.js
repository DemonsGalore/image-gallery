const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  originalname: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  filename: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
  },
}, { timestamps: true });

module.exports = Image = mongoose.model('images', imageSchema);
