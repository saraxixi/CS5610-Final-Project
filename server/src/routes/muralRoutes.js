import express from 'express';
import Mural from '../models/Mural.js';

const router = express.Router();

// Get all murals
router.get('/', async (req, res) => {
  try {
    const murals = await Mural.find();
    res.json(murals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single mural by ID
router.get('/:id', async (req, res) => {
  try {
    const mural = await Mural.findById(req.params.id);
    if (!mural) {
      return res.status(404).json({ message: 'Mural not found' });
    }
    res.json(mural);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new mural
router.post('/', async (req, res) => {
  const mural = new Mural({
    title: req.body.title,
    period: req.body.period,
    description: req.body.description,
    category: req.body.category,
    subcategory: req.body.subcategory,
    rating: req.body.rating,
    location: req.body.location,
    images: req.body.images
  });

  try {
    const newMural = await mural.save();
    res.status(201).json(newMural);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update mural
router.patch('/:id', async (req, res) => {
  try {
    const mural = await Mural.findById(req.params.id);
    if (!mural) {
      return res.status(404).json({ message: 'Mural not found' });
    }
    
    if (req.body.title) mural.title = req.body.title;
    if (req.body.period) mural.period = req.body.period;
    if (req.body.description) mural.description = req.body.description;
    if (req.body.category) mural.category = req.body.category;
    if (req.body.subcategory) mural.subcategory = req.body.subcategory;
    if (req.body.rating) mural.rating = req.body.rating;
    if (req.body.location) mural.location = req.body.location;
    if (req.body.images) mural.images = req.body.images;
    
    const updatedMural = await mural.save();
    res.json(updatedMural);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete mural
router.delete('/:id', async (req, res) => {
  try {
    const mural = await Mural.findById(req.params.id);
    if (!mural) {
      return res.status(404).json({ message: 'Mural not found' });
    }
    
    await Mural.findByIdAndDelete(req.params.id);
    res.json({ message: 'Mural deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export { router };
export default router;