import { Router } from 'express';
import DigitalExhibition from '../models/DigitalExhibition.js';

const router = Router();

// Create
router.post('/', async (req, res) => {
  try {
    const exhibition = await DigitalExhibition.create(req.body);
    res.status(201).json(exhibition);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  try {
    const exhibitions = await DigitalExhibition.find().populate('featuredArtifacts');
    res.json(exhibitions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const exhibition = await DigitalExhibition.findById(req.params.id).populate('featuredArtifacts');
    if (!exhibition) return res.status(404).json({ error: 'Not found' });
    res.json(exhibition);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updatedExhibition = await DigitalExhibition.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedExhibition) return res.status(404).json({ error: 'Not found' });
    res.json(updatedExhibition);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const exhibition = await DigitalExhibition.findByIdAndDelete(req.params.id);
    if (!exhibition) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
