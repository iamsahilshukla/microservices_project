// routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/index');

// Create a new user
router.post('/', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST API route to accept an array of users
router.post('/bulk', async (req, res) => {
  try {
    const users = req.body; // Assuming req.body is an array of user objects

    // Insert all users in the array into the database in bulk
    const createdUsers = await User.insertMany(users);

    res.status(201).json(createdUsers);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Retrieve all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Retrieve a user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) throw new Error('User not found');
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Update a user by ID
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedUser) throw new Error('User not found');
    res.json(updatedUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Delete a user by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndRemove(id);
    if (!deletedUser) throw new Error('User not found');
    res.json(deletedUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
