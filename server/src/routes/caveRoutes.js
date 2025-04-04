import { Router } from 'express';
import Cave from '../models/Cave.js';

const router = Router();

// Create
router.post('/', async (req, res) => {
  try {
    const cave = await Cave.create(req.body);
    res.status(201).json(cave);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  try {
    const caves = await Cave.find().populate('artifacts');
    res.json(caves);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const cave = await Cave.findById(req.params.id).populate('artifacts');
    if (!cave) return res.status(404).json({ error: 'Not found' });
    res.json(cave);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updatedCave = await Cave.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCave) return res.status(404).json({ error: 'Not found' });
    res.json(updatedCave);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const cave = await Cave.findByIdAndDelete(req.params.id);
    if (!cave) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
