'use strict';
const mongoose = require('mongoose');

// Durable idempotency ledger. A provider timeout never creates an automatic retry;
// the owner must inspect the external job before requesting a new scene.
const schema = new mongoose.Schema({
  _id: { type: String, required: true, match: /^[a-f0-9-]{36}$/i },
  courseId: { type: String, required: true },
  lessonId: { type: String, required: true },
  sceneIndex: { type: Number, min: 0, max: 3, required: true },
  provider: { type: String, enum: ['local-wan'], default: 'local-wan' },
  missionId: { type: String, required: true },
  providerJobId: { type: String, default: null },
  state: {
    type: String,
    enum: ['submitting', 'submitted', 'working', 'succeeded', 'failed', 'unavailable', 'unknown'],
    default: 'submitting',
  },
  error: { type: String, default: null },
  outputUrls: { type: [String], default: [] },
}, { timestamps: true });
module.exports = mongoose.model('CinematicVideoJob', schema);
