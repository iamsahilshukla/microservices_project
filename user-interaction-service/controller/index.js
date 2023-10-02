const express = require("express");
const router = express.Router();
const UserInteraction = require("../models/index");

// Add a user interaction
const create = async (req, res) => {
  try {
    const { userId, contentId, interactionType } = req.body;
    // Validate if the user exists (you can implement this)

    const interaction = new UserInteraction({
      userId,
      contentId,
      interactionType,
    });
    await interaction.save();

    res.status(201).json(interaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a user interaction
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { interactionType } = req.body;

    const interaction = await UserInteraction.findByIdAndUpdate(
      id,
      { interactionType },
      { new: true }
    );

    if (!interaction) throw new Error("Interaction not found");

    res.json(interaction);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Read user interactions (you can add filtering and sorting options here)
const index = async (req, res) => {
  try {
    const interactions = await UserInteraction.find();
    res.json(interactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user interactions for a specific content item (book)
const getByContentId = async (req, res) => {
  // book1
  try {
    const { contentId } = req.params;

    // Fetch all interactions related to the specified contentId
    const countDoc = await UserInteraction.countDocuments({ contentId }); // 50 , like read

    res.json({ count: countDoc });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createLike = async (req, res) => {
  try {
    const { userId, contentId } = req.body;

    // Check if the user has already liked the content
    const existingInteraction = await UserInteraction.findOne({
      userId,
      contentId,
      interactionType: "like",
    });
    if (existingInteraction) {
      // User has already liked the content, you can handle this case as needed
      return res
        .status(400)
        .json({ error: "User has already liked this content." });
    }

    const interaction = new UserInteraction({
      userId,
      contentId,
      interactionType: "like",
    });
    await interaction.save();

    res.status(201).json(interaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Mark content as read
const createRead = async (req, res) => {
  try {
    const { userId, contentId } = req.body;

    // Check if the user has already marked the content as read
    const existingInteraction = await UserInteraction.findOne({
      userId,
      contentId,
      interactionType: "read",
    });
    if (existingInteraction) {
      // User has already marked the content as read, you can handle this case as needed
      return res
        .status(400)
        .json({ error: "User has already marked this content as read." });
    }

    const interaction = new UserInteraction({
      userId,
      contentId,
      interactionType: "read",
    });
    await interaction.save();

    res.status(201).json(interaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {create,index,getByContentId,createLike,createRead,update};
