const express = require('express');
const router = express.Router();
const Manuscript = require('../models/Manuscript');

// Get all manuscripts
router.get('/', async (req, res) => {
  try {
    const manuscripts = await Manuscript.find();
    res.json(manuscripts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single manuscript by ID
router.get('/:id', async (req, res) => {
  try {
    const manuscript = await Manuscript.findById(req.params.id);
    if (!manuscript) {
      return res.status(404).json({ message: 'Manuscript not found' });
    }
    res.json(manuscript);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new manuscript
router.post('/', async (req, res) => {
  const manuscript = new Manuscript({
    title: req.body.title,
    period: req.body.period,
    description: req.body.description,
    category: req.body.category,
    subcategory: req.body.subcategory,
    rating: req.body.rating,
    images: req.body.images
  });

  try {
    const newManuscript = await manuscript.save();
    res.status(201).json(newManuscript);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update manuscript
router.patch('/:id', async (req, res) => {
  try {
    const manuscript = await Manuscript.findById(req.params.id);
    if (!manuscript) {
      return res.status(404).json({ message: 'Manuscript not found' });
    }
    
    if (req.body.title) manuscript.title = req.body.title;
    if (req.body.period) manuscript.period = req.body.period;
    if (req.body.description) manuscript.description = req.body.description;
    if (req.body.category) manuscript.category = req.body.category;
    if (req.body.subcategory) manuscript.subcategory = req.body.subcategory;
    if (req.body.rating) manuscript.rating = req.body.rating;
    if (req.body.images) manuscript.images = req.body.images;
    
    const updatedManuscript = await manuscript.save();
    res.json(updatedManuscript);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete manuscript
router.delete('/:id', async (req, res) => {
  try {
    const manuscript = await Manuscript.findById(req.params.id);
    if (!manuscript) {
      return res.status(404).json({ message: 'Manuscript not found' });
    }
    
    await manuscript.remove();
    res.json({ message: 'Manuscript deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;