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
        model: 'openai/gpt-3.5-turbo',
        messages: [
          { 
            role: 'user', 
            content: `Translate the following text to ${targetLanguage}. Preserve formatting, maintain the original meaning, and ensure the translation sounds natural:\n\n${text}` 
          }
        ],
        max_tokens: 2000 // Limit token usage to stay within available credits
      })
    });
    
    const data = await response.json();
    return data.choices?.[0]?.message?.content || 'Translation failed';
  } catch (err) {
    console.error('Translation error:', err);
    return 'Translation error occurred';
  }
}