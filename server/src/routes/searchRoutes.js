import { Router } from 'express';
import Mural from '../models/Mural.js';
import Artifact from '../models/Artifact.js';
import Cave from '../models/Cave.js';
import Manuscript from '../models/Manuscript.js';
import DigitalExhibition from '../models/DigitalExhibitions.js';

const router = Router();

router.get('/', async (req, res) => {
  const { q } = req.query;
  const query = { $regex: q, $options: 'i' };

  try {
    const [murals, artifacts, caves, manuscripts, exhibitions] = await Promise.all([
      Mural.find({ title: query }),
      Artifact.find({ name: query }),
      Cave.find({ name: query }),
      Manuscript.find({ title: query }),
      DigitalExhibition.find({ title: query })
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
