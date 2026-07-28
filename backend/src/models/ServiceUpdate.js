const mongoose = require('mongoose');
const { attachAppwriteMirror } = require('../utils/appwriteMirrorHooks');

const serviceUpdateSchema = new mongoose.Schema(
  {
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// Mirror every write to the Appwrite backup backend (no-op unless configured).
attachAppwriteMirror(serviceUpdateSchema, 'ServiceUpdate');

module.exports = mongoose.model('ServiceUpdate', serviceUpdateSchema);
