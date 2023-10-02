const express = require("express");
const router = express.Router();
const validateUserExistence = require("../middleware/index");
const { Schema } = require("mongoose");
const body = require("bodymen").middleware;
const {
  create,
  index,
  getByContentId,
  createLike,
  createRead,
  update,
} = require("../controller/index");

// Add a user interaction
router.post("/", validateUserExistence, create);

// Update a user interaction
router.patch("/:id", update);

// Read user interactions (you can add filtering and sorting options here)
router.get("/", index);

// Get user interactions for a specific content item (book)
router.get("/content/:contentId", getByContentId);

// Like a content item
router.post(
  "/like",
  body({
    contentId: {
      type: Schema.Types.ObjectId,
      ref: "contents",
      required: true,
    },
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
  }),
  validateUserExistence,
  createLike
);

// Mark content as read
router.post("/read", validateUserExistence, createRead);

module.exports = router;
