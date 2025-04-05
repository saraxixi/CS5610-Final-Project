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
  // If API key is missing, return original text with warning
  if (!process.env.OPENROUTER_API_KEY) {
    console.error('OPENROUTER_API_KEY is not defined in environment variables');
    return `${text} [Translation failed: API key missing]`;
  }
  
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
    
    // Check if the response is ok
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Translation API Error:', response.status, errorData);
      return text; // Return original text on error
    }
    
    const data = await response.json();
    
    // Verify the expected response structure exists
    if (!data.choices || !data.choices.length || !data.choices[0].message) {
      console.error('Unexpected API response structure:', data);
      return text; // Return original text on unexpected format
    }
    
    return data.choices[0].message.content || text;
  } catch (err) {
    console.error('Translation error:', err);
    return text; // Return original text on error
  }
}