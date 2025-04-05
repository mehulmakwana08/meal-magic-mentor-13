
import React from 'react';
import { Home, Users, Utensils, LineChart, Lightbulb, Settings, BarChart2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Users, label: 'Profiles', path: '/profiles' },
  { icon: Utensils, label: 'Meal Plans', path: '/meal-plans' },
  { icon: LineChart, label: 'Progress', path: '/progress' },
  { icon: BarChart2, label: 'Impact', path: '/impact-dashboard' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

const BottomNav = () => {
  const location = useLocation();
  
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 bg-white border-t border-border md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="flex flex-col items-center justify-center w-full h-full"
            >
              <div 
                className={cn(
                  "flex flex-col items-center justify-center transition-all",
                  isActive 
                    ? "text-primary scale-105" 
                    : "text-gray-500 hover:text-primary/80"
                )}
              >
                <Icon 
                  className={cn(
                    "w-5 h-5 mb-1",
                    isActive && "animate-pulse-soft"
                  )} 
                />
                <span className="text-xs font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
