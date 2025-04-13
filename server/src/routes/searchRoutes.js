import { Router } from 'express';
import Mural from '../models/Mural.js';
import Artifact from '../models/Artifact.js';
import Cave from '../models/Cave.js';
import Manuscript from '../models/Manuscript.js';
import DigitalExhibition from '../models/DigitalExhibition.js';

const router = Router();

router.get('/', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ message: "Missing query param 'q'" });
  const query = { $regex: q, $options: 'i' };

  try {
    const [murals, artifacts, caves, manuscripts, exhibitions] = await Promise.all([
        Mural.find({ title: { $regex: regex } }),
        Artifact.find({ title: { $regex: regex } }),
        Cave.find({ name: { $regex: regex } }),
        Manuscript.find({ title: { $regex: regex } }),
        DigitalExhibition.find({ title: { $regex: regex } })
    ]);

    res.json({
      murals,
      artifacts,
      caves,
      manuscripts,
      exhibitions
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
