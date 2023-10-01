// models/userInteraction.js
const mongoose = require('mongoose');

const userInteractionSchema = new mongoose.Schema({
  userId: String,   // userId,
  contentId: String,  // contentId,
  interactionType: String, // Like,Read.
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('UserInteraction', userInteractionSchema);
