import express from 'express';
import { translateText } from '../utils/translationUtil.js';

const router = express.Router();

// Endpoint for translating text
router.post('/', async (req, res) => {
  const { text, targetLanguage } = req.body;
  
  if (!text || !targetLanguage) {
    return res.status(400).json({ 
      error: 'Missing required parameters. Please provide text and targetLanguage.' 
    });
  }
  
  try {
    const translatedText = await translateText(text, targetLanguage);
    res.json({ translatedText });
  } catch (err) {
    console.error('Translation route error:', err);
    res.status(500).json({ error: 'Failed to translate text' });
  }
});

export default router;