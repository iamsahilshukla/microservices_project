// models/user.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
