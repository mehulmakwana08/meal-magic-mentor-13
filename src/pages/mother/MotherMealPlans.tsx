
import React, { useState } from 'react';
import { Calendar, Search, Filter, CheckCircle, PlusCircle } from 'lucide-react';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CreateMealPlan from '@/components/CreateMealPlan';
import MealPlanFilter, { FilterOption } from '@/components/MealPlanFilter';
import { useToast } from '@/hooks/use-toast';
import AnimatedButton from '@/components/AnimatedButton';

const MotherMealPlans = () => {
  const [activeDay, setActiveDay] = useState(0);
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Sample data - in a real app this would come from an API
  const weekDays = [
    { id: 0, name: "Mon", date: "12", isToday: true },
    { id: 1, name: "Tue", date: "13", isToday: false },
    { id: 2, name: "Wed", date: "14", isToday: false },
    { id: 3, name: "Thu", date: "15", isToday: false },
    { id: 4, name: "Fri", date: "16", isToday: false },
    { id: 5, name: "Sat", date: "17", isToday: false },
    { id: 6, name: "Sun", date: "18", isToday: false },
  ];
  
  const mealPlans = [
    {
      id: 1,
      time: "8:00 AM",
      name: "Breakfast",
      description: "Spinach omelette with whole grain toast",
      nutrients: { calories: 350, protein: "15g", iron: "4mg", calcium: "200mg" },
      completed: true,
    },
    {
      id: 2,
      time: "11:00 AM",
      name: "Mid-morning Snack",
      description: "Greek yogurt with mixed berries and nuts",
      nutrients: { calories: 200, protein: "10g", iron: "1mg", calcium: "150mg" },
      completed: true,
    },
    {
      id: 3,
      time: "1:00 PM",
      name: "Lunch",
      description: "Lentil soup with brown rice and green salad",
      nutrients: { calories: 450, protein: "18g", iron: "6mg", calcium: "120mg" },
      completed: false,
    },
    {
      id: 4,
      time: "4:00 PM",
      name: "Afternoon Snack",
      description: "Apple with peanut butter",
      nutrients: { calories: 200, protein: "5g", iron: "1mg", calcium: "30mg" },
      completed: false,
    },
    {
      id: 5,
      time: "7:00 PM",
      name: "Dinner",
      description: "Grilled fish with quinoa and steamed vegetables",
      nutrients: { calories: 400, protein: "25g", iron: "3mg", calcium: "100mg" },
      completed: false,
    },
  ];
  
  const [meals, setMeals] = useState(mealPlans);
  
  // Filter meals based on active filter and search query
  const getFilteredMeals = () => {
    let filtered = meals;
    
    // Apply status filter
    if (activeFilter === 'active') {
      filtered = filtered.filter(meal => !meal.completed);
    } else if (activeFilter === 'completed') {
      filtered = filtered.filter(meal => meal.completed);
    }
    
    // Apply search filter if search query exists
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        meal => 
          meal.name.toLowerCase().includes(query) ||
          meal.description.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };
  
  const filteredMeals = getFilteredMeals();
  
  const toggleMealCompletion = (id: number) => {
    setMeals(meals.map(meal => 
      meal.id === id ? { ...meal, completed: !meal.completed } : meal
    ));
  };
  
  const handleCreateMeal = (data: any) => {
    const newMeal = {
      id: meals.length + 1,
      time: "12:00 PM", // Default time
      name: data.title,
      description: data.description || "No description provided",
      nutrients: { calories: 0, protein: "0g", iron: "0mg", calcium: "0mg" },
      completed: false,
    };
    
    setMeals([...meals, newMeal]);
    toast({
      title: "Success!",
      description: "New meal has been added to your plan.",
    });
  };
  
  return (
    <div className="min-h-screen pb-20">
      <Header title="Meal Plans" />
      
      {/* Date Selector */}
      <div className="px-4 py-4 border-b border-border sticky top-[57px] bg-white/95 backdrop-blur-sm z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            May 2023
          </h2>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="ghost" 
              className="border border-border h-8 w-8 p-0"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="ghost" 
              className="border border-border h-8 w-8 p-0"
              onClick={() => {
                const searchInput = document.getElementById('meal-search') as HTMLInputElement;
                if (searchInput) {
                  searchInput.focus();
                }
              }}
            >
              <Search className="h-4 w-4" />
            </Button>
            <MealPlanFilter
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
          </div>
        </div>
        
        <div className="mb-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input
              id="meal-search"
              type="text"
              placeholder="Search meals..."
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-border bg-background focus:outline-none focus:ring-1 focus:ring-primary text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex space-x-2 pb-1 overflow-x-auto no-scrollbar">
          {weekDays.map((day) => (
            <button
              key={day.id}
              onClick={() => setActiveDay(day.id)}
              className={cn(
                "flex flex-col items-center justify-center min-w-[3rem] p-2 rounded-lg transition-colors",
                activeDay === day.id
                  ? "bg-purple-600 text-white"
                  : day.isToday
                  ? "bg-purple-50 text-purple-700"
                  : "bg-muted text-foreground hover:bg-muted/80"
              )}
            >
              <span className="text-xs font-medium">{day.name}</span>
              <span className="text-lg font-bold">{day.date}</span>
            </button>
          ))}
        </div>
      </div>
      
      {/* Meal List */}
      <div className="px-4 py-4">
        {filteredMeals.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No meals found</p>
            <AnimatedButton
              icon={PlusCircle}
              color="primary"
              className="mt-4"
              onClick={() => setIsCreateDialogOpen(true)}
            >
              Add New Meal
            </AnimatedButton>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMeals.map((meal) => (
              <Card key={meal.id} className="p-4 border-border">
                <div className="flex justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div 
                        className={cn(
                          "w-2 h-2 rounded-full",
                          meal.completed ? "bg-green-500" : "bg-purple-500"
                        )}
                      />
                      <p className="text-sm text-muted-foreground">{meal.time}</p>
                    </div>
                    <h3 className="font-medium text-lg mt-1">{meal.name}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{meal.description}</p>
                    
                    <div className="flex gap-3 mt-3">
                      <div className="text-xs">
                        <p className="text-muted-foreground">Calories</p>
                        <p className="font-medium">{meal.nutrients.calories}</p>
                      </div>
                      <div className="text-xs">
                        <p className="text-muted-foreground">Protein</p>
                        <p className="font-medium">{meal.nutrients.protein}</p>
                      </div>
                      <div className="text-xs">
                        <p className="text-muted-foreground">Iron</p>
                        <p className="font-medium">{meal.nutrients.iron}</p>
                      </div>
                      <div className="text-xs">
                        <p className="text-muted-foreground">Calcium</p>
                        <p className="font-medium">{meal.nutrients.calcium}</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                      "h-8 w-8 rounded-full",
                      meal.completed ? "text-green-500" : "text-muted-foreground"
                    )}
                    onClick={() => toggleMealCompletion(meal.id)}
                  >
                    <CheckCircle className={cn(
                      "h-6 w-6",
                      meal.completed ? "fill-green-100" : ""
                    )} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
      
      {/* Create Meal Dialog */}
      <CreateMealPlan
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateMeal}
      />
    </div>
  );
};

export default MotherMealPlans;
