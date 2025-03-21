
import React from 'react';
import { PlusCircle, SearchIcon, Filter } from 'lucide-react';
import Header from '@/components/Header';
import MealPlanCard from '@/components/MealPlanCard';
import AnimatedButton from '@/components/AnimatedButton';
import { useNavigate } from 'react-router-dom';

const MealPlans = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'active' | 'completed'>('all');
  
  // Mock data
  const mealPlans = [
    {
      id: '1',
      title: 'Pregnancy Nutrition Plan',
      beneficiary: 'Meera Singh',
      period: 'This Week',
      completionRate: 75,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: '2',
      title: 'Child Growth Diet',
      beneficiary: 'Arjun Kumar',
      period: 'This Week',
      completionRate: 60,
      status: 'active',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: '3',
      title: 'Lactation Support Plan',
      beneficiary: 'Lakshmi Reddy',
      period: 'Last Week',
      completionRate: 100,
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=500&auto=format&fit=crop'
    },
    {
      id: '4',
      title: 'Toddler Nutrition Plan',
      beneficiary: 'Rohan Sharma',
      period: 'Last Week',
      completionRate: 90,
      status: 'completed',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=500&auto=format&fit=crop'
    },
  ];
  
  const filteredPlans = activeFilter === 'all' 
    ? mealPlans 
    : mealPlans.filter(plan => plan.status === activeFilter);

  return (
    <div className="min-h-screen pb-20">
      <Header title="Meal Plans" />
      
      {/* Search & Add */}
      <div className="px-4 py-4 border-b border-border sticky top-[57px] bg-white/95 backdrop-blur-sm z-10">
        <div className="flex gap-2 mb-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              type="text"
              placeholder="Search meal plans..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary text-sm"
            />
          </div>
          
          <button className="p-2 border border-border rounded-xl bg-background hover:bg-muted transition-colors">
            <Filter className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        {/* Status filters */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {['all', 'active', 'completed'].map((filter) => {
            const isActive = activeFilter === filter;
            
            return (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter as 'all' | 'active' | 'completed')}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition-colors ${
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                <span className="font-medium capitalize">{filter}</span>
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Meal Plan List */}
      <div className="px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {filteredPlans.length} Meal Plan{filteredPlans.length !== 1 ? 's' : ''}
          </h2>
          
          <AnimatedButton
            icon={PlusCircle}
            color="primary"
            size="sm"
            onClick={() => {/* Navigate to create meal plan */}}
          >
            Create New
          </AnimatedButton>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPlans.map((plan) => (
            <MealPlanCard
              key={plan.id}
              title={plan.title}
              beneficiary={plan.beneficiary}
              period={plan.period}
              completionRate={plan.completionRate}
              image={plan.image}
              onClick={() => navigate(`/meal-plans/${plan.id}`)}
              className="animate-fade-in"
            />
          ))}
          
          {filteredPlans.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No meal plans found</p>
              <AnimatedButton
                icon={PlusCircle}
                color="primary"
                className="mt-4"
                onClick={() => navigate('/meal-plans/create')}
              >
                Create New Plan
              </AnimatedButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MealPlans;
