
import React from 'react';
import { ChevronDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import Header from '@/components/Header';
import ProgressChart from '@/components/ProgressChart';
import { cn } from '@/lib/utils';

const Progress = () => {
  const [selectedProfile, setSelectedProfile] = React.useState('Arjun Kumar');
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = React.useState(false);
  
  // Mock data
  const profiles = [
    'Arjun Kumar',
    'Meera Singh',
    'Lakshmi Reddy',
    'Rohan Sharma',
  ];
  
  const weightData = [
    { name: 'Jan', value: 12.0, target: 12.5 },
    { name: 'Feb', value: 12.4, target: 13.0 },
    { name: 'Mar', value: 12.8, target: 13.5 },
    { name: 'Apr', value: 13.3, target: 14.0 },
    { name: 'May', value: 13.7, target: 14.5 },
    { name: 'Jun', value: 14.0, target: 15.0 },
  ];
  
  const heightData = [
    { name: 'Jan', value: 88, target: 89 },
    { name: 'Feb', value: 89, target: 90 },
    { name: 'Mar', value: 91, target: 92 },
    { name: 'Apr', value: 92, target: 93 },
    { name: 'May', value: 94, target: 95 },
    { name: 'Jun', value: 95, target: 96 },
  ];
  
  const nutritionData = [
    { name: 'Week 1', value: 60 },
    { name: 'Week 2', value: 85 },
    { name: 'Week 3', value: 70 },
    { name: 'Week 4', value: 90 },
    { name: 'Week 5', value: 80 },
    { name: 'Week 6', value: 95 },
  ];

  const latestMetrics = {
    weight: { value: 14.0, change: 0.3, isPositive: true },
    height: { value: 95, change: 1, isPositive: true },
    bmi: { value: 15.5, change: 0.2, isPositive: false },
    compliance: { value: 85, change: 5, isPositive: true },
  };

  return (
    <div className="min-h-screen pb-20">
      <Header title="Growth Progress" />
      
      {/* Profile Selector */}
      <div className="px-4 py-3 border-b border-border sticky top-[57px] bg-white/95 backdrop-blur-sm z-10">
        <div className="relative">
          <button
            onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
            className="w-full flex items-center justify-between p-3 bg-background border border-border rounded-xl"
          >
            <span className="font-medium">{selectedProfile}</span>
            <ChevronDown className={cn(
              "w-4 h-4 text-muted-foreground transition-transform",
              isProfileDropdownOpen && "rotate-180"
            )} />
          </button>
          
          {isProfileDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-border rounded-xl shadow-lg z-20 animate-scale-in">
              {profiles.map((profile) => (
                <button
                  key={profile}
                  onClick={() => {
                    setSelectedProfile(profile);
                    setIsProfileDropdownOpen(false);
                  }}
                  className={cn(
                    "w-full p-3 text-left hover:bg-muted transition-colors",
                    profile === selectedProfile && "bg-primary/10 text-primary font-medium"
                  )}
                >
                  {profile}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Summary Cards */}
      <div className="px-4 py-4">
        <h2 className="text-lg font-semibold mb-3">Latest Metrics</h2>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(latestMetrics).map(([key, data]) => (
            <div key={key} className="bg-white rounded-xl p-3 card-shadow">
              <p className="text-xs text-muted-foreground capitalize">{key}</p>
              <div className="flex items-end justify-between mt-1">
                <p className="text-xl font-semibold">
                  {data.value}
                  <span className="text-xs ml-1">
                    {key === 'weight' && 'kg'}
                    {key === 'height' && 'cm'}
                    {key === 'compliance' && '%'}
                  </span>
                </p>
                <div className={cn(
                  "flex items-center text-xs font-medium",
                  data.isPositive ? "text-teal" : "text-rose"
                )}>
                  {data.isPositive ? (
                    <ArrowUpRight className="w-3 h-3 mr-0.5" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 mr-0.5" />
                  )}
                  {data.change}
                  {key === 'weight' && 'kg'}
                  {key === 'height' && 'cm'}
                  {key === 'compliance' && '%'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Growth Charts */}
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold mb-3">Growth Charts</h2>
        
        <div className="space-y-4">
          <ProgressChart
            data={weightData}
            title="Weight Progress"
            subtitle="Last 6 months"
            color="#4DB6AC"
            unit=" kg"
          />
          
          <ProgressChart
            data={heightData}
            title="Height Progress"
            subtitle="Last 6 months"
            color="#AB47BC"
            unit=" cm"
          />
          
          <ProgressChart
            data={nutritionData}
            title="Nutrition Compliance"
            subtitle="Last 6 weeks"
            color="#FFB74D"
            unit="%"
          />
        </div>
      </div>
    </div>
  );
};

export default Progress;
