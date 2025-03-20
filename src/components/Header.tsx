
import { useState, useEffect } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import UserProfileDropdown from './UserProfileDropdown';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
  className?: string;
}

const Header = ({ title, showBackButton = false, className }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const isHomePage = location.pathname === '/';
  const isAuthPage = ['/login', '/signup'].includes(location.pathname);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header 
      className={cn(
        "sticky top-0 z-30 flex h-[57px] items-center justify-between px-4 md:px-6 bg-white",
        isScrolled && "shadow-sm border-b border-border",
        className
      )}
    >
      <div className="flex items-center">
        {(showBackButton || (!isHomePage && !isAuthPage)) && (
          <button
            onClick={() => navigate(-1)}
            className="mr-3 rounded-full p-1 hover:bg-muted"
            aria-label="Go back"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
        <h1 className="text-lg font-semibold truncate md:text-xl">{title}</h1>
      </div>
      
      {!isAuthPage && (
        <div className="flex items-center gap-2">
          <UserProfileDropdown />
        </div>
      )}
    </header>
  );
};

export default Header;
