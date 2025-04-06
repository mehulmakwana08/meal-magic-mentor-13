
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface HighContrastModeToggleProps {
  className?: string;
}

const HighContrastModeToggle: React.FC<HighContrastModeToggleProps> = ({ className }) => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [highContrast, setHighContrast] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('highContrast') === 'true';
    }
    return false;
  });
  
  const [fontSize, setFontSize] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return parseInt(localStorage.getItem('fontSize') || '100', 10);
    }
    return 100; // Default 100%
  });

  React.useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    localStorage.setItem('highContrast', highContrast.toString());
  }, [highContrast]);

  React.useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}%`;
    localStorage.setItem('fontSize', fontSize.toString());
  }, [fontSize]);

  const handleContrastToggle = (checked: boolean) => {
    setHighContrast(checked);
    toast({
      title: checked ? "High Contrast Mode Enabled" : "High Contrast Mode Disabled",
      description: checked 
        ? "The display has been adjusted for higher contrast." 
        : "Standard contrast mode has been restored.",
      duration: 3000,
    });
  };

  const increaseFontSize = () => {
    if (fontSize < 150) {
      setFontSize(prev => Math.min(prev + 10, 150));
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 80) {
      setFontSize(prev => Math.max(prev - 10, 80));
    }
  };

  const resetFontSize = () => {
    setFontSize(100);
  };

  return (
    <div className={className}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="high-contrast-mode" className="text-base">High Contrast Mode</Label>
          <Switch 
            id="high-contrast-mode" 
            checked={highContrast}
            onCheckedChange={handleContrastToggle}
          />
        </div>
        
        <div>
          <Label className="text-base block mb-2">Text Size</Label>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={decreaseFontSize}
              disabled={fontSize <= 80}
            >
              A-
            </Button>
            <div className="flex-1 text-center">
              <span className="text-sm font-medium">{fontSize}%</span>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={increaseFontSize}
              disabled={fontSize >= 150}
            >
              A+
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={resetFontSize}
            >
              Reset
            </Button>
          </div>
        </div>
        
        <div className="pt-2">
          <div className="p-4 border rounded-md bg-muted/40">
            <p className="text-sm mb-2 font-medium">Preview:</p>
            <p className="mb-1">This is regular text.</p>
            <p className="text-lg mb-1">This is larger text.</p>
            <p className="text-sm mb-1">This is smaller text.</p>
            <div className="flex space-x-2 mt-2">
              <span className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm">Button</span>
              <span className="px-3 py-1 bg-muted text-muted-foreground rounded-md text-sm">Secondary</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighContrastModeToggle;
