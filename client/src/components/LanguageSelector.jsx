import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  
  const languages = [
    { value: 'English', label: 'English' },
    { value: 'Chinese', label: '中文' },
    { value: 'Spanish', label: 'Español' },
    { value: 'French', label: 'Français' },
    { value: 'German', label: 'Deutsch' },
    { value: 'Japanese', label: '日本語' },
    { value: 'Korean', label: '한국어' },
    { value: 'Russian', label: 'Русский' },
    { value: 'Arabic', label: 'العربية' },
    { value: 'Hindi', label: 'हिन्दी' }
  ];

  return (
    <div className="language-selector-container">
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="language-dropdown"
        aria-label="Select language"
      >
        {languages.map((lang) => (
          <option key={lang.value} value={lang.value}>
            {lang.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LanguageSelector;