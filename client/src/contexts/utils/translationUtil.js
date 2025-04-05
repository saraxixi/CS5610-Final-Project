import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Translates text to the specified language using AI
 * @param {string} text - The text to translate
 * @param {string} targetLanguage - The language to translate to
 * @returns {Promise<string>} - The translated text
 */
export async function translateText(text, targetLanguage) {
  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-7-sonnet',
        messages: [
          { 
            role: 'user', 
            content: `Translate the following text to ${targetLanguage}. Preserve formatting, maintain the original meaning, and ensure the translation sounds natural:\n\n${text}` 
          }
        ]
      })
    });
    
    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'Translation failed';
  } catch (err) {
    console.error('Translation error:', err);
    return 'Translation error occurred';
  }
}