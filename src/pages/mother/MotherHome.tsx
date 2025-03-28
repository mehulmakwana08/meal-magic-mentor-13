import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Utensils, ArrowRight, Bell, LineChart, Bookmark, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

// Calendar
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Add custom CSS directly
const CustomCalendarStyles = () => (
  <style>{`
    /* Custom styles for calendar */
    .custom-datepicker-container .react-datepicker {
      border: none;
      box-shadow: none;
      font-family: inherit;
    }
    
    .custom-datepicker-container .react-datepicker__header {
      background-color: white;
      border-bottom: 1px solid #f3f4f6;
      padding-top: 10px;
    }
    
    .custom-datepicker-container .react-datepicker__day-names {
      margin-top: 8px;
    }
    
    .custom-datepicker-container .react-datepicker__day-name {
      color: #9ca3af;
      font-weight: 500;
      width: 36px;
      height: 36px;
      line-height: 36px;
      margin: 0;
      font-size: 0.75rem;
    }
    
    .custom-datepicker-container .react-datepicker__day {
      width: 36px;
      height: 36px;
      line-height: 36px;
      margin: 0;
      border-radius: 50%;
      color: #4b5563;
      font-size: 0.875rem;
    }
    
    .custom-datepicker-container .react-datepicker__day:hover {
      background-color: #f3f4f6;
      border-radius: 50%;
    }
    
    .custom-datepicker-container .react-datepicker__day--selected,
    .custom-datepicker-container .react-datepicker__day--keyboard-selected {
      background-color: #9333ea;
      color: white;
      border-radius: 50%;
      font-weight: 500;
    }
    
    .custom-datepicker-container .react-datepicker__day--today {
      font-weight: 700;
      color: #7c3aed;
    }
    
    .custom-datepicker-container .react-datepicker__month-container {
      float: none;
    }
    
    .custom-datepicker-container .react-datepicker__day--outside-month {
      color: #d1d5db;
    }
    
    .custom-datepicker-container .selected-day {
      background-color: #9333ea !important;
      color: white !important;
      border-radius: 50%;
    }
    
    /* Week row styles */
    .custom-datepicker-container .react-datepicker__week {
      display: flex;
      justify-content: space-around;
      margin: 2px 0;
    }
    
    /* Month styles */
    .custom-datepicker-container .react-datepicker__month {
      margin: 0;
      padding: 0.5rem 0;
    }
  `}</style>
);

const MotherHome = () => {
  const navigate = useNavigate();
  const calendarRef = useRef<HTMLDivElement>(null);
  
  // Add state for calendar
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
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
  
  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [calendarRef]);
  
  // Calendar toggle handler
  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
  };
  
  // Date selection handler
  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    setShowCalendar(false); // Close calendar after date selection
  };
  
  // Custom header for the DatePicker
  const renderCustomHeader = ({
    date,
    decreaseMonth,
    increaseMonth,
    prevMonthButtonDisabled,
    nextMonthButtonDisabled,
  }) => (
    <div className="flex items-center justify-between px-2 py-2">
      <button
        onClick={decreaseMonth}
        disabled={prevMonthButtonDisabled}
        type="button"
        className="p-1 rounded-full hover:bg-purple-100 transition-colors disabled:opacity-50 text-purple-700"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      
      <div className="text-sm font-medium text-purple-800">
        {date.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
        })}
      </div>
      
      <button
        onClick={increaseMonth}
        disabled={nextMonthButtonDisabled}
        type="button"
        className="p-1 rounded-full hover:bg-purple-100 transition-colors disabled:opacity-50 text-purple-700"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
  
  return (
    <div className="min-h-screen pb-20 bg-gray-50">
      {/* Include custom calendar styles */}
      <CustomCalendarStyles />
      
      <Header title={`Hi, ${userData.name}`} />
      
      <div className="px-4 py-4">
        <div className="space-y-6">
          {/* Pregnancy / Lactation Stage */}
          <Card className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-100 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-purple-700 font-medium">
                  {userData.type === 'pregnant' ? 'Pregnancy Week' : 'Lactation Month'}
                </p>
                <h3 className="text-2xl font-bold text-purple-700">
                  Week {userData.weekNumber}
                </h3>
              </div>
              <div className="relative">
                <Calendar 
                  className="h-8 w-8 text-purple-700 cursor-pointer hover:text-purple-900 transition-colors" 
                  onClick={handleCalendarToggle}
                />
                
                {/* Enhanced Calendar Popup */}
                {showCalendar && (
                  <div 
                    ref={calendarRef} 
                    className="absolute right-0 z-20 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden w-[320px]"
                  >
                    <div className="p-3 bg-gradient-to-r from-purple-100 to-purple-50 rounded-t-lg border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="h-4 w-4 text-purple-700" />
                          <p className="text-sm font-medium text-purple-800">Select Date</p>
                        </div>
                        <div className="text-xs px-2 py-1 bg-purple-200 text-purple-800 rounded-full">
                          {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                    </div>
                    
                    <div className="custom-datepicker-container">
                      <DatePicker
                        selected={selectedDate}
                        onChange={handleDateChange}
                        inline
                        renderCustomHeader={renderCustomHeader}
                        dateFormat="MMMM d, yyyy"
                        calendarClassName="custom-calendar border-0 shadow-none bg-white"
                        wrapperClassName="!block custom-wrapper"
                        dayClassName={date => 
                          date.getDate() === selectedDate.getDate() && 
                          date.getMonth() === selectedDate.getMonth() ?
                          "selected-day" : undefined
                        }
                      />
                    </div>
                    
                    <div className="p-3 flex justify-between border-t border-gray-200 bg-gray-50">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-gray-500 hover:text-gray-700 border-gray-300 hover:bg-gray-100 transition-colors"
                        onClick={() => setShowCalendar(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        size="sm"
                        className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
                        onClick={() => setShowCalendar(false)}
                      >
                        Select
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
          
          {/* Next Checkup */}
          <Card className="p-4 border-border shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800">Next Checkup</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-purple-700 p-0 h-auto hover:bg-transparent hover:text-purple-700"
                onClick={() => {}}
              >
                <span className="text-sm">Reschedule</span>
              </Button>
            </div>
            <p className="text-muted-foreground text-sm">
              {formatDate(userData.nextCheckup)}
            </p>
          </Card>
          
          {/* Selected Date Display */}
          <Card className="p-4 border-border shadow-sm bg-gradient-to-r from-purple-50 to-blue-50 border-purple-100">
            <div className="flex justify-between items-center">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <CalendarIcon className="h-4 w-4 text-purple-600" />
                  <h3 className="font-semibold text-gray-800">Selected Date</h3>
                </div>
                <div className="bg-white px-3 py-2 mt-2 rounded-md border border-purple-200 shadow-sm inline-block">
                  <p className="text-sm font-medium text-purple-800">
                    {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {selectedDate.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric', 
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          </Card>
          
          {/* Upcoming Meals */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-semibold text-gray-800">Today's Meals</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-purple-700 p-0 h-auto hover:bg-transparent hover:text-purple-700 flex items-center"
                onClick={() => navigate('/meal-plans')}
              >
                <span className="text-sm">All meals</span>
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
            
            <Card className="p-4 border-border shadow-sm">
              <div className="space-y-3">
                {upcomingMeals.map((meal) => (
                  <div key={meal.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div 
                        className={cn(
                          "w-3 h-3 rounded-full mr-3",
                          meal.completed ? "bg-green-500" : "bg-purple-500"
                        )}
                      />
                      <div>
                        <p className="font-medium text-gray-800">{meal.name}</p>
                        <p className="text-sm text-muted-foreground">{meal.time}</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "text-xs border-purple-200 shadow-sm",
                        meal.completed ? "bg-green-50 text-green-700" : "bg-purple-50 text-purple-700"
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
                  <p className="font-medium text-purple-700">{userData.completedMeals}/{userData.totalMeals}</p>
                </div>
              </div>
            </Card>
          </div>
          
          {/* Quick Actions */}
          <div>
            <h3 className="font-semibold mb-3 text-gray-800">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <Card 
                className="p-4 border-border cursor-pointer hover:bg-purple-50 transition-colors shadow-sm"
                onClick={() => navigate('/progress')}
              >
                <div className="flex flex-col items-center text-center">
                  <LineChart className="h-6 w-6 text-purple-700 mb-2" />
                  <p className="font-medium text-gray-800">Track Progress</p>
                </div>
              </Card>
              
              <Card 
                className="p-4 border-border cursor-pointer hover:bg-purple-50 transition-colors shadow-sm"
                onClick={() => navigate('/tips')}
              >
                <div className="flex flex-col items-center text-center">
                  <Bookmark className="h-6 w-6 text-purple-700 mb-2" />
                  <p className="font-medium text-gray-800">Nutrition Tips</p>
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
