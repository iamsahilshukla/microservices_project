// routes/content.js
const express = require("express");
const router = express.Router();
const {
  create,
  index,
  update,
  getById,
  remove,
  ingest,
  topContent,
  newContent,
} = require("../controller/index");

// Create new content
router.post("/", create);

// Retrieve content
router.get("/", index);

// Retrieve New Contents API
router.get("/new", newContent);

//Retrieve top strories
router.get("/top", topContent);

// Retrieve content by ID
router.get("/:id", getById);

// Update content by ID
router.patch("/:id", update);

// Delete content by ID
router.delete("/:id", remove);

router.post("/ingest", ingest);

module.exports = router;
