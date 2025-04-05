import React, { createContext, useState, useContext, useEffect } from 'react';

// Create context
const LanguageContext = createContext();

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  // Get saved language from localStorage or default to English
  const [language, setLanguage] = useState(
    localStorage.getItem('preferred-language') || 'English'
  );
  
  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('preferred-language', language);
  }, [language]);
  
  // Function to translate text
  const translateText = async (text, targetLang = language) => {
    // If the target language is English, return the original text
    if (targetLang === 'English') return text;
    
    try {
      const response = await fetch('http://localhost:4000/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text, 
          targetLanguage: targetLang 
        })
      });
      
      if (!response.ok) {
        throw new Error(`Translation API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.translatedText || text;
    } catch (error) {
      console.error('Translation error:', error);
      return text; // Fallback to original text
    }
  };
  
  // Return the context provider with values
  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage,
      translateText
    }}>
      {children}
    </LanguageContext.Provider>
  );
};