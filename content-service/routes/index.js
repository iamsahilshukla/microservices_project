// routes/content.js
const express = require('express');
const router = express.Router();
const Content = require('../models/index');
const query = require("querymen").middleware;
const csv = require('csv-parser');
const fs = require('fs');
const getContentDetails = require('../services/index');

// Create new content
router.post('/', async (req, res) => {
  try {
    const content = new Content(req.body);
    await content.save();
    res.status(201).json(content);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Retrieve content
router.get('/', async (req, res) => {
    try {
      const content = await Content.find();
      if (!content) throw new Error('Content not found');
      res.json(content);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  });

// Retrieve content by ID
router.get('/:id', async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) throw new Error('Content not found');
    res.json(content);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Retrieve New Contents API
router.get("/new", async (req, res) => {
    try {
      const newContents = await Content.find().sort({ createdAt: -1 }); // Sort by date in descending order (newest first)
      res.json(newContents);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

//Retrieve top strories
router.get(
  '/top',
  async (req, res) => {
    try {
      // Find all content items and retrieve their _id
      const contents = await Content.find({}, { _id: 1 });

      // Fetch interaction details for each content item and sort them in descending order
      const sortedContents = await Promise.all(
        contents.map(async (content) => { //[book1 - 50,book2-60],
          const contentId = content._id;
          const data = await getContentDetails(contentId);
          return { id: contentId, count: data.count };
        })
      ).then((interactions) =>
        interactions.sort((a, b) => b.count - a.count).map(({ id }) => id) //nlogn [...]
      );

      // Retrieve the sorted content items
      const topContents = await Content.find({ _id: { $in: sortedContents } });

      res.json(topContents);
    } catch (error) {
      console.error('Error fetching top contents:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
);

// Update content by ID
router.patch('/:id', async (req, res) => {
    try {
      const contentId = req.params.id;
      const updateData = req.body; // Assuming the new data is sent in the request body
  
      // Use Mongoose's findOneAndUpdate to update the content by its ID
      const updatedContent = await Content.findOneAndUpdate(
        { _id: contentId },
        updateData,
        { new: true } // Return the updated document
      );
  
      if (!updatedContent) {
        return res.status(404).json({ error: 'Content not found' });
      }
  
      res.json(updatedContent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

// Delete content by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await Content.findByIdAndRemove(id);
    if (!deletedUser) throw new Error('Content not found');
    res.json(deletedUser);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/ingest', (req, res) => {
    const csvFilePath = 'data/content.csv'; // Replace with your CSV file path
  
    const results = [];
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        // Process and save data to the Content model
        const content = new Content({
          title: data.title,
          story: data.story,
          datePublished: new Date(data.datePublished),
          userId: data.userId,
        });
        content.save();
        results.push(content);
      })
      .on('end', () => {
        res.status(201).json({ message: 'Data ingested successfully', data: results });
      });
  });

module.exports = router;
