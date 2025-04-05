
import React from 'react';
import { Home, Utensils, LineChart, Lightbulb, User, Settings, MessageSquare, Brain } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Utensils, label: 'Meal Plans', path: '/meal-plans' },
  { icon: LineChart, label: 'Progress', path: '/progress' },
  { icon: Lightbulb, label: 'Tips', path: '/tips' },
  { icon: MessageSquare, label: 'Complaints', path: '/complain' },
  { icon: Brain, label: 'AI', path: '/ai-nutrition' },
];

const MotherBottomNav = () => {
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
                    ? "text-purple-600 scale-105" 
                    : "text-gray-500 hover:text-purple-500"
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

export default MotherBottomNav;
