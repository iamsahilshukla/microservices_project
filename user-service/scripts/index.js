const mongoose = require('mongoose');
const User = require('../models/index'); // Replace with the path to your User model

// Predefined user data (you can customize this)
const predefinedUsers = [
  {
    _id: "651959125c1b4a579d79028d",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phoneNumber: "1234567890",
  },
  {
    _id: "651959125c1b4a579d79028e",
    firstName: "Jane",
    lastName: "Doe",
    email: "jane@example.com",
    phoneNumber: "9876543210",
  },
  {
    _id: "651959125c1b4a579d79028f",
    firstName: "Bob",
    lastName: "Brown",
    email: "bob.brown@example.com",
    phoneNumber: "111-222-3333",
  },
  {
    _id: "651959125c1b4a579d790290",
    firstName: "Eva",
    lastName: "Williams",
    email: "eva.williams@example.com",
    phoneNumber: "777-888-9999",
  }
  // Add more user data as needed
];

// Function to create users if they don't exist
const createUsersIfNeeded = async () => {
  try {
    // Check if there are existing users in the database
    const existingUsers = await User.find();

    if (existingUsers.length === 0) {
      // If no users exist, create predefined users
      const userPromises = predefinedUsers.map(async (userData) => {
        const newUser = new User(userData);
        return await newUser.save();
      });

      // Wait for all user creation promises to resolve
      const createdUsers = await Promise.all(userPromises);
      console.log('Predefined users created successfully:', createdUsers);
    } else {
      console.log('Users already exist in the database.');
    }
  } catch (error) {
    console.error('Error creating users:', error);
  } finally {
    mongoose.disconnect(); // Close the database connection
  }
};

// Connect to your MongoDB database
mongoose.connect('mongodb://localhost/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Call the function to create users if needed
createUsersIfNeeded();
