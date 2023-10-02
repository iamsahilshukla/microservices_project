// routes/users.js
const express = require("express");
const router = express.Router();
const User = require("../models/index");
const {
  create,
  getById,
  remove,
  update,
  index,
  bulk,
} = require("../controller");

// Create a new user
router.post("/", create);

// POST API route to accept an array of users
router.post("/bulk", bulk);

// Retrieve all users
router.get("/", index);

// Retrieve a user by ID
router.get("/:id", getById);

// Update a user by ID
router.patch("/:id", update);

// Delete a user by ID
router.delete("/:id", remove);

module.exports = router;
