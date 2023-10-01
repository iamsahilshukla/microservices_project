
const express = require('express');
const User = require("../models/user.js");

const validateUserExistence = async (req, res, next) => {
    try {
      const { userId } = req.body; // Assuming the userId is sent in the request body
  
      // Check if the user with the given userId exists in your user database
      const user = await User.findById(userId);
      console.log(user);
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // If the user exists, attach the user object to the request for later use
      req.user = user;
      next();
    } catch (error) {
      return res.status(500).json({ error: 'User existence validation failed' });
    }
  };

module.exports = validateUserExistence;