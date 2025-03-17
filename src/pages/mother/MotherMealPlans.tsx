
import React, { useState } from 'react';
import { Calendar, Search, Filter, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const MotherMealPlans = () => {
  const [activeDay, setActiveDay] = useState(0);
  
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
  
  const toggleMealCompletion = (id: number) => {
    setMeals(meals.map(meal => 
      meal.id === id ? { ...meal, completed: !meal.completed } : meal
    ));
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
            <Button size="sm" variant="ghost" className="border border-border h-8 w-8 p-0">
              <Search className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="ghost" className="border border-border h-8 w-8 p-0">
              <Filter className="h-4 w-4" />
            </Button>
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
                  ? "bg-rose-600 text-white"
                  : day.isToday
                  ? "bg-rose-50 text-rose-700"
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
        <div className="space-y-4">
          {meals.map((meal) => (
            <Card key={meal.id} className="p-4 border-border">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div 
                      className={cn(
                        "w-2 h-2 rounded-full",
                        meal.completed ? "bg-green-500" : "bg-rose-500"
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
      </div>
    </div>
  );
};

export default MotherMealPlans;
