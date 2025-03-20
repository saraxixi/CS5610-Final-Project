import { Router } from 'express';
import Artifact from '../models/Artifact.js';

const router = Router();

// Create
router.post('/', async (req, res) => {
  try {
    const artifact = await Artifact.create(req.body);
    res.status(201).json(artifact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  try {
    const artifacts = await Artifact.find();
    res.json(artifacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const artifact = await Artifact.findById(req.params.id);
    if (!artifact) return res.status(404).json({ error: 'Not found' });
    res.json(artifact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updatedArtifact = await Artifact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedArtifact) return res.status(404).json({ error: 'Not found' });
    res.json(updatedArtifact);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const artifact = await Artifact.findByIdAndDelete(req.params.id);
    if (!artifact) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
