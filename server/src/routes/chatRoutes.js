// src/routes/chatRoutes.js
import express from 'express';
import dotenv from 'dotenv';
import { translateText } from '../utils/translationUtil.js';
dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { message, language = 'English' } = req.body;
  
  try {
    // Get AI response
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-7-sonnet',
        messages: [
          { role: 'user', content: message }
        ]
      })
    });
    
    const data = await response.json();
    let reply = data.choices?.[0]?.message?.content || 'Sorry, I have no response.';
    
    // If language is not English, translate the response
    if (language.toLowerCase() !== 'english') {
      reply = await translateText(reply, language);
    }
    
    res.json({ reply });
  } catch (err) {
    console.error('OpenRouter API Error:', err);
    res.status(500).json({ error: 'AI failed to respond' });
  }
});

export default router;