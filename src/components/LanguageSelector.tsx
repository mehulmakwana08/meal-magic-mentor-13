
import React from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage, languages } from '@/contexts/LanguageContext';
import { toast } from 'sonner';

interface LanguageSelectorProps {
  className?: string;
}

const LanguageSelector = ({ className }: LanguageSelectorProps) => {
  const { currentLanguage, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (lang: typeof languages[0]) => {
    setLanguage(lang);
    setIsOpen(false);
    toast.success(`Language changed to ${lang.name}`, {
      description: "Your language preference has been saved."
    });
  };

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-primary px-3 py-1.5 rounded-full border border-primary/20 transition-all hover:bg-primary/5 dark:bg-gray-800/90 dark:border-gray-700 dark:text-white"
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{currentLanguage.name}</span>
        <ChevronDown className={cn("w-4 h-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 py-1 w-max bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-border z-50 animate-scale-in dark:border-gray-700">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleSelect(lang)}
              className={cn(
                "w-full px-4 py-2 text-left text-sm hover:bg-muted transition-colors dark:hover:bg-gray-700",
                currentLanguage.code === lang.code && "bg-primary/10 font-medium text-primary dark:bg-primary/20"
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
