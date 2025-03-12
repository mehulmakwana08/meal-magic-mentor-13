
import React from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

type Language = {
  code: string;
  name: string;
};

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिंदी' },
  { code: 'te', name: 'తెలుగు' },
];

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector = ({ className }: LanguageSelectorProps) => {
  const [currentLang, setCurrentLang] = React.useState<Language>(languages[0]);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (lang: Language) => {
    setCurrentLang(lang);
    setIsOpen(false);
  };

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-primary px-3 py-1.5 rounded-full border border-primary/20 transition-all hover:bg-primary/5"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLang.name}</span>
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 py-1 w-max bg-white rounded-lg shadow-lg border border-border z-50 animate-scale-in">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang)}
              className={cn(
                "w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors",
                currentLang.code === lang.code && "bg-primary/10 font-medium text-primary"
              )}
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
