
import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = {
  code: string;
  name: string;
  fontFamily: string;
};

export const languages: Language[] = [
  { code: 'en', name: 'English', fontFamily: 'Poppins, sans-serif' },
  { code: 'hi', name: 'हिंदी', fontFamily: '"Hind", sans-serif' },
  { code: 'te', name: 'తెలుగు', fontFamily: '"Noto Sans Telugu", sans-serif' },
];

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  // Initialize language state from localStorage or default to English
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language');
      if (savedLang) {
        const parsedLang = JSON.parse(savedLang);
        // Validate the parsed language to ensure it has all the required properties
        if (parsedLang && parsedLang.code && parsedLang.name && parsedLang.fontFamily) {
          return parsedLang as Language;
        }
      }
    }
    return languages[0]; // Default to English
  });

  // Update document font when language changes
  useEffect(() => {
    document.documentElement.style.fontFamily = currentLanguage.fontFamily;
    localStorage.setItem('language', JSON.stringify(currentLanguage));
  }, [currentLanguage]);

  const setLanguage = (language: Language) => {
    setCurrentLanguage(language);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
