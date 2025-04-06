import React, { useState, useRef, useEffect } from 'react';
import '../styles/GoogleTranslate.css';

const GoogleTranslate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const isInitialized = useRef(false); // Track initialization

  // Define the languages
  const languages = [
    { value: 'English', label: 'English', code: 'en' },
    { value: 'Chinese', label: '中文', code: 'zh-CN' },
    { value: 'Spanish', label: 'Español', code: 'es' },
    { value: 'French', label: 'Français', code: 'fr' },
    { value: 'German', label: 'Deutsch', code: 'de' },
    { value: 'Japanese', label: '日本語', code: 'ja' },
    { value: 'Korean', label: '한국어', code: 'ko' },
    { value: 'Russian', label: 'Русский', code: 'ru' },
    { value: 'Arabic', label: 'العربية', code: 'ar' },
    { value: 'Hindi', label: 'हिन्दी', code: 'hi' }
  ];

  // Function to set a cookie
  const setCookie = (key, value, expiryDays = 1) => {
    let expires = "";
    if (expiryDays) {
      const date = new Date();
      date.setTime(date.getTime() + (expiryDays * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    // Ensure cookie is set for the root path to apply site-wide
    document.cookie = key + "=" + (value || "") + expires + "; path=/";
  };

  useEffect(() => {
    // Define the initialization function globally
    window.googleTranslateElementInit = () => {
      if (!isInitialized.current) {
        console.log("Initializing Google Translate Element...");
        new window.google.translate.TranslateElement({
          pageLanguage: 'en', // Set default language
          includedLanguages: languages.map(l => l.code).join(','),
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE, 
          autoDisplay: false
        }, 'google_translate_element');
        isInitialized.current = true;
      }
    };

    // Load the Google Translate script
    const loadGoogleTranslateScript = () => {
      const existingScript = document.querySelector('script[src*="translate.google.com/translate_a/element.js"]');
      if (existingScript) {
        // If script exists but init function wasn't called (e.g., SPA navigation)
        if (window.google && window.google.translate && !isInitialized.current) {
           window.googleTranslateElementInit();
        }
        return;
      }

      const script = document.createElement('script');
      // Use the init function name as the callback
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    };

    loadGoogleTranslateScript();

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Run only once on mount

  const toggleDropdown = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  const changeLanguage = (langCode) => {
    if (!langCode) return; // Ignore "Select Language" option

    console.log(`Attempting to change language to: ${langCode}`);

    setCookie('googtrans', `/auto/${langCode}`);
    // Reload the page for the cookie to take effect on initialization
    window.location.reload();
  };

  // Find the language code from the display name selected in the dropdown
  const handleSelectChange = (event) => {
    const selectedValue = event.target.value; // This is the 'value' (e.g., 'English', 'Chinese')
    const selectedLang = languages.find(lang => lang.value === selectedValue);
    if (selectedLang) {
      changeLanguage(selectedLang.code); // Pass the language code ('en', 'zh-CN')
    }
  };

  return (
    <li className="dropdown translate-dropdown" ref={dropdownRef}>
      <a href="#" className="translate-link" onClick={toggleDropdown}>Translate</a>
      <div className={`translate-dropdown-container ${isOpen ? 'open' : ''}`}>
        <select
          className="language-select"
          onChange={handleSelectChange} // Use the new handler
          value="" // Control the select value if needed, or leave uncontrolled
        >
          <option value="" disabled>Select Language</option> {/* Make placeholder disabled */}
          {languages.map((lang) => (
            <option key={lang.code} value={lang.value}> {/* Value is 'English', 'Chinese', etc. */}
              {lang.label} {/* Display name */}
            </option>
          ))}
        </select>
        {/* Hidden container FOR Google Translate initialization */}
        {/* Add CSS to effectively hide this visually but keep it in DOM */}
        <div id="google_translate_element" style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}></div>
      </div>
    </li>
  );
};

export default GoogleTranslate;