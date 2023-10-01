// models/content.js
const mongoose = require('mongoose');


const contentSchema = new mongoose.Schema( // content ... 5
  {
    title: String,
    story: String,
    datePublished: { type: Date, default: new Date()},
    userId: String, // user1....user5
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Content', contentSchema);
