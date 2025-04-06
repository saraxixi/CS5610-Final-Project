import { useContext } from 'react';
import LanguageContext from './LanguageContext';

// Custom hook to use the language context
const useLanguage = () => useContext(LanguageContext);

export default useLanguage;