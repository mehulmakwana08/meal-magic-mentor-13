
import React from 'react';
import { MenuIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
  className?: string;
}

const Header = ({ title, onMenuClick, className }: HeaderProps) => {
  return (
    <header className={cn(
      "sticky top-0 z-10 flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-md border-b border-border",
      className
    )}>
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuClick}
          className="p-1.5 rounded-full hover:bg-muted transition-colors"
        >
          <MenuIcon className="w-5 h-5 text-primary" />
        </button>
        <h1 className="text-lg font-semibold text-primary">{title}</h1>
      </div>
      
      <LanguageSelector />
    </header>
  );
};

export default Header;
