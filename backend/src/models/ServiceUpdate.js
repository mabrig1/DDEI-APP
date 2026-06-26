const mongoose = require('mongoose');

const serviceUpdateSchema = new mongoose.Schema(
  {
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ServiceUpdate', serviceUpdateSchema);
