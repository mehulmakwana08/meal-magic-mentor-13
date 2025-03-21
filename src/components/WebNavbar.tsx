
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

interface WebNavbarProps {
  className?: string;
}

const WebNavbar = ({ className }: WebNavbarProps) => {
  const location = useLocation();
  
  // Hide navbar on authentication routes
  const hideNavbarRoutes = ['/login', '/signup', '/forgot-password'];
  if (hideNavbarRoutes.includes(location.pathname)) {
    return null;
  }
  
  return (
    <nav className={cn("hidden md:flex w-64 bg-white border-r border-border fixed h-screen flex-col py-6 px-4", className)}>
      <div className="mb-8">
        <h1 className="text-xl font-bold text-primary">Anganwadi Nutrition</h1>
      </div>
      
      <div className="flex flex-col space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-4 py-3 rounded-md transition-colors",
                isActive 
                  ? "text-primary bg-primary/10" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-primary"
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default WebNavbar;
