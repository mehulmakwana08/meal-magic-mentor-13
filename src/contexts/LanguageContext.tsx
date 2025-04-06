
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
  { code: 'gu', name: 'ગુજરાતી', fontFamily: '"Noto Sans Gujarati", sans-serif' },
];

type LanguageContextType = {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  translate: (key: string) => string;
  translations: Record<string, Record<string, string>>;
};

// Basic translations for common UI elements
const translations: Record<string, Record<string, string>> = {
  en: {
    'app.name': 'Meal Magic Mentor',
    'nav.home': 'Home',
    'nav.progress': 'Progress',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.submit': 'Submit',
    'common.continue': 'Continue',
    'common.back': 'Back',
    'nutrition.protein': 'Protein',
    'nutrition.calcium': 'Calcium',
    'nutrition.iron': 'Iron',
    'nutrition.vitaminA': 'Vitamin A',
    'nutrition.vitaminC': 'Vitamin C',
    'nutrition.folate': 'Folate',
    'nutrition.zinc': 'Zinc',
  },
  hi: {
    'app.name': 'मील मैजिक मेंटर',
    'nav.home': 'होम',
    'nav.progress': 'प्रगति',
    'nav.profile': 'प्रोफाइल',
    'nav.settings': 'सेटिंग्स',
    'common.save': 'सहेजें',
    'common.cancel': 'रद्द करें',
    'common.submit': 'जमा करें',
    'common.continue': 'जारी रखें',
    'common.back': 'वापस',
    'nutrition.protein': 'प्रोटीन',
    'nutrition.calcium': 'कैल्शियम',
    'nutrition.iron': 'आयरन',
    'nutrition.vitaminA': 'विटामिन ए',
    'nutrition.vitaminC': 'विटामिन सी',
    'nutrition.folate': 'फोलेट',
    'nutrition.zinc': 'जिंक',
  },
  te: {
    'app.name': 'మీల్ మ్యాజిక్ మెంటార్',
    'nav.home': 'హోమ్',
    'nav.progress': 'పురోగతి',
    'nav.profile': 'ప్రొఫైల్',
    'nav.settings': 'సెట్టింగ్స్',
    'common.save': 'సేవ్',
    'common.cancel': 'రద్దు',
    'common.submit': 'సమర్పించు',
    'common.continue': 'కొనసాగించు',
    'common.back': 'వెనుకకు',
    'nutrition.protein': 'ప్రోటీన్',
    'nutrition.calcium': 'కాల్షియం',
    'nutrition.iron': 'ఐరన్',
    'nutrition.vitaminA': 'విటమిన్ ఎ',
    'nutrition.vitaminC': 'విటమిన్ సి',
    'nutrition.folate': 'ఫోలేట్',
    'nutrition.zinc': 'జింక్',
  },
  gu: {
    'app.name': 'મીલ મેજિક મેન્ટર',
    'nav.home': 'હોમ',
    'nav.progress': 'પ્રગતિ',
    'nav.profile': 'પ્રોફાઇલ',
    'nav.settings': 'સેટિંગ્સ',
    'common.save': 'સાચવો',
    'common.cancel': 'રદ કરો',
    'common.submit': 'સબમિટ કરો',
    'common.continue': 'ચાલુ રાખો',
    'common.back': 'પાછા',
    'nutrition.protein': 'પ્રોટીન',
    'nutrition.calcium': 'કેલ્શિયમ',
    'nutrition.iron': 'આયર્ન',
    'nutrition.vitaminA': 'વિટામિન એ',
    'nutrition.vitaminC': 'વિટામિન સી',
    'nutrition.folate': 'ફોલેટ',
    'nutrition.zinc': 'ઝિંક',
  }
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

  const translate = (key: string): string => {
    const langTranslations = translations[currentLanguage.code] || translations.en;
    return langTranslations[key] || translations.en[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, translate, translations }}>
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
