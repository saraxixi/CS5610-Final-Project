// src/routes/chatRoutes.js
import express from 'express';
import dotenv from 'dotenv';
import { translateText } from '../../../client/src/contexts/utils/translationUtil.js';
dotenv.config();

const router = express.Router();

router.post('/', async (req, res) => {
  const { message, language = 'English' } = req.body;
  
  // Check if required parameters exist
  if (!message) {
    return res.status(400).json({ error: 'Missing required parameter: message' });
  }
  
  // Check if API key exists
  if (!process.env.OPENROUTER_API_KEY) {
    console.error('OPENROUTER_API_KEY is not defined in environment variables');
    return res.status(500).json({ error: 'Server configuration error' });
  }
  
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
    
    // Check if the response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenRouter API Error:', response.status, errorData);
      return res.status(response.status).json({ 
        error: 'Failed to get AI response', 
        details: errorData 
      });
    }
    
    const data = await response.json();
    
    // Verify the expected response structure exists
    if (!data.choices || !data.choices.length || !data.choices[0].message) {
      console.error('Unexpected API response structure:', data);
      return res.status(500).json({ error: 'Unexpected response format from AI service' });
    }
    
    let reply = data.choices[0].message.content || 'Sorry, I have no response.';
    
    // If language is not English, translate the response
    if (language.toLowerCase() !== 'english') {
      reply = await translateText(reply, language);
    }
    
    res.json({ reply });
  } catch (err) {
    console.error('OpenRouter API Error:', err);
    res.status(500).json({ error: 'AI failed to respond', details: err.message });
  }
});

export default router;