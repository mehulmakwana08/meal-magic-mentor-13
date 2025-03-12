
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Utensils, LineChart, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Users, label: 'Profiles', path: '/profiles' },
  { icon: Utensils, label: 'Meal Plans', path: '/meal-plans' },
  { icon: LineChart, label: 'Progress', path: '/progress' },
  { icon: Lightbulb, label: 'Tips', path: '/tips' },
];

const WebNavbar = () => {
  const location = useLocation();
  
  return (
    <nav className="hidden md:flex w-full h-16 bg-white border-b border-border sticky top-0 z-20">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-primary mr-8">Anganwadi Nutrition</h1>
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-2 rounded-md transition-colors",
                    isActive 
                      ? "text-primary bg-primary/10" 
                      : "text-gray-600 hover:bg-gray-100 hover:text-primary"
                  )}
                >
                  <Icon className="w-5 h-5 mr-2" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default WebNavbar;
