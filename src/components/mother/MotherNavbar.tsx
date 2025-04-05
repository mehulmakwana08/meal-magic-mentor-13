
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, Utensils, LineChart, Lightbulb, User, Settings, MessageSquare, 
  Brain, Apple, Activity, Database
} from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Utensils, label: 'Meal Plans', path: '/meal-plans' },
  { icon: LineChart, label: 'Progress', path: '/progress' },
  { icon: Lightbulb, label: 'Tips', path: '/tips' },
  { icon: MessageSquare, label: 'Complaints', path: '/complain' },
  { icon: User, label: 'Profile', path: '/profile' },
  { icon: Brain, label: 'AI Nutrition Planning', path: '/ai-nutrition-planning' },
  { icon: Apple, label: 'Local Food Database', path: '/local-food-database' },
  { icon: Activity, label: 'Real-time Monitoring', path: '/real-time-monitoring' },
  { icon: Database, label: 'AI Nutrition Center', path: '/ai-nutrition' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

interface MotherNavbarProps {
  className?: string;
}

const MotherNavbar = ({ className }: MotherNavbarProps) => {
  const location = useLocation();
  
  return (
    <nav className={cn("hidden md:flex w-64 bg-white border-r border-border fixed h-screen flex-col py-6 px-4", className)}>
      <div className="mb-8">
        <h1 className="text-xl font-bold text-purple-600">Mother's Nutrition</h1>
        <p className="text-sm text-muted-foreground mt-1">Patient Portal</p>
      </div>
      
      <div className="flex flex-col space-y-1 overflow-y-auto flex-1 pr-3">
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
                  ? "text-purple-600 bg-purple-50" 
                  : "text-gray-600 hover:bg-gray-100 hover:text-purple-600"
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

export default MotherNavbar;
