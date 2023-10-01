const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/index.js');


const app = express();
const port = process.env.PORT || 3003;

// Connect to MongoDB (Make sure you have MongoDB installed and running)
mongoose.connect('mongodb://mongodb:27017/shared_db', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the User Service');
});
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`User Service is running on port ${port}`);
});
