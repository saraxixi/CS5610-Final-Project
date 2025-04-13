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

  const regex = new RegExp(q, 'i');

  try {
    const murals = await Mural.find({
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    });

    const artifacts = await Artifact.find({
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    });

    const caves = await Cave.find({
      $or: [
        { name: { $regex: regex } },
        { significance: { $regex: regex } }
      ]
    });

    const manuscripts = await Manuscript.find({
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } }
      ]
    });

    const exhibitions = await DigitalExhibition.find({
      $or: [
        { title: { $regex: regex } },
        { narrative: { $regex: regex } }
      ]
    });

    res.json({ murals, artifacts, caves, manuscripts, exhibitions });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
