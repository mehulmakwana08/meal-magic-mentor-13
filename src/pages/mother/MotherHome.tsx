
import React from 'react';
import { Calendar, Utensils, ArrowRight, Bell, LineChart, Bookmark } from 'lucide-react';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

const MotherHome = () => {
  const navigate = useNavigate();
  
  // This would be fetched from an API in a real application
  const userData = {
    name: "Meera",
    type: "pregnant",
    weekNumber: 28,
    nextCheckup: "2023-05-15T10:30:00",
    notifications: 3,
    completedMeals: 2,
    totalMeals: 3,
  };
  
  const upcomingMeals = [
    { id: 1, time: "8:00 AM", name: "Breakfast", completed: true },
    { id: 2, time: "1:00 PM", name: "Lunch", completed: true },
    { id: 3, time: "7:00 PM", name: "Dinner", completed: false },
  ];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };
  
  return (
    <div className="min-h-screen pb-20">
      <Header title={`Hi, ${userData.name}`} />
      
      <div className="px-4 py-4">
        <div className="space-y-6">
          {/* Pregnancy / Lactation Stage */}
          <Card className="p-4 bg-rose-50 border-rose-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-rose-700 font-medium">
                  {userData.type === 'pregnant' ? 'Pregnancy Week' : 'Lactation Month'}
                </p>
                <h3 className="text-2xl font-bold text-rose-700">
                  Week {userData.weekNumber}
                </h3>
              </div>
              <Calendar className="h-8 w-8 text-rose-500" />
            </div>
          </Card>
          
          {/* Next Checkup */}
          <Card className="p-4 border-border">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Next Checkup</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-rose-600 p-0 h-auto hover:bg-transparent hover:text-rose-700"
                onClick={() => {}}
              >
                <span className="text-sm">Reschedule</span>
              </Button>
            </div>
            <p className="text-muted-foreground text-sm">
              {formatDate(userData.nextCheckup)}
            </p>
          </Card>
          
          {/* Upcoming Meals */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold">Today's Meals</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-rose-600 p-0 h-auto hover:bg-transparent hover:text-rose-700 flex items-center"
                onClick={() => navigate('/meal-plans')}
              >
                <span className="text-sm">All meals</span>
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            
            <Card className="p-4 border-border">
              <div className="space-y-3">
                {upcomingMeals.map((meal) => (
                  <div key={meal.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className={cn(
                          "w-3 h-3 rounded-full mr-3",
                          meal.completed ? "bg-green-500" : "bg-rose-500"
                        )}
                      />
                      <div>
                        <p className="font-medium">{meal.name}</p>
                        <p className="text-sm text-muted-foreground">{meal.time}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "text-xs border-rose-200",
                        meal.completed ? "bg-green-50 text-green-700" : "bg-rose-50 text-rose-700"
                      )}
                    >
                      {meal.completed ? "Completed" : "Pending"}
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-3 border-t border-border">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Meals completed today</p>
                  <p className="font-medium">{userData.completedMeals}/{userData.totalMeals}</p>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Quick Actions */}
          <div>
            <h3 className="font-semibold mb-3">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Card 
                className="p-4 border-border cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => navigate('/progress')}
              >
                <div className="flex flex-col items-center text-center">
                  <LineChart className="h-6 w-6 text-rose-600 mb-2" />
                  <p className="font-medium">Track Progress</p>
                </div>
              </Card>
              
              <Card 
                className="p-4 border-border cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => navigate('/tips')}
              >
                <div className="flex flex-col items-center text-center">
                  <Bookmark className="h-6 w-6 text-rose-600 mb-2" />
                  <p className="font-medium">Nutrition Tips</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotherHome;
