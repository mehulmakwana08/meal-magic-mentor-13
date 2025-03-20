
import React, { useState } from 'react';
import { LineChart as LineChartIcon, Weight, Ruler, ArrowUp, ArrowDown, CalendarDays } from 'lucide-react';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

const MotherProgress = () => {
  const [period, setPeriod] = useState('month');
  
  // Sample data - in a real app this would come from an API
  const userData = {
    name: "Meera Singh",
    type: "pregnant",
    weeksPregnant: 28,
    currentWeight: 65.4,
    lastWeight: 64.8,
    weightChange: 0.6,
    idealRange: "64-68 kg",
    height: 165,
    bmi: 24.1,
    hemoglobin: 11.5,
    bloodPressure: "120/80",
    nextCheckup: "May 15, 2023",
  };
  
  const weightData = [
    { week: 'Week 20', weight: 61.2 },
    { week: 'Week 22', weight: 62.1 },
    { week: 'Week 24', weight: 63.4 },
    { week: 'Week 26', weight: 64.8 },
    { week: 'Week 28', weight: 65.4 },
  ];
  
  const nutrientData = [
    { week: 'Week 20', iron: 9.8, calcium: 95, protein: 88 },
    { week: 'Week 22', iron: 10.2, calcium: 90, protein: 92 },
    { week: 'Week 24', iron: 10.8, calcium: 105, protein: 95 },
    { week: 'Week 26', iron: 11.2, calcium: 110, protein: 90 },
    { week: 'Week 28', iron: 11.5, calcium: 108, protein: 93 },
  ];
  
  return (
    <div className="min-h-screen pb-20">
      <Header title="My Progress" />
      
      <div className="px-4 py-4">
        <div className="space-y-6">
          {/* Summary Card */}
          <Card className="p-4 border-border">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Current Status</h3>
              <p className="text-sm text-muted-foreground flex items-center">
                <CalendarDays className="h-3.5 w-3.5 mr-1" />
                Week {userData.weeksPregnant}
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border border-border rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Weight className="h-4 w-4 text-purple-600 mr-2" />
                    <p className="text-sm font-medium">Weight</p>
                  </div>
                  <div className={cn(
                    "flex items-center text-xs font-medium",
                    userData.weightChange > 0 ? "text-green-600" : "text-amber-600"
                  )}>
                    {userData.weightChange > 0 ? (
                      <ArrowUp className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(userData.weightChange)} kg
                  </div>
                </div>
                <p className="text-lg font-bold mt-2">{userData.currentWeight} kg</p>
                <p className="text-xs text-muted-foreground mt-1">Ideal: {userData.idealRange}</p>
              </div>
              
              <div className="border border-border rounded-lg p-3">
                <div className="flex items-center">
                  <Ruler className="h-4 w-4 text-purple-600 mr-2" />
                  <p className="text-sm font-medium">BMI</p>
                </div>
                <p className="text-lg font-bold mt-2">{userData.bmi}</p>
                <p className="text-xs text-muted-foreground mt-1">Normal range: 18.5-24.9</p>
              </div>
              
              <div className="border border-border rounded-lg p-3">
                <p className="text-sm font-medium">Hemoglobin</p>
                <p className="text-lg font-bold mt-2">{userData.hemoglobin} g/dL</p>
                <p className="text-xs text-muted-foreground mt-1">Normal: 11.0-15.0 g/dL</p>
              </div>
              
              <div className="border border-border rounded-lg p-3">
                <p className="text-sm font-medium">Blood Pressure</p>
                <p className="text-lg font-bold mt-2">{userData.bloodPressure}</p>
                <p className="text-xs text-muted-foreground mt-1">Normal: 120/80 mmHg</p>
              </div>
            </div>
            
            <div className="mt-4 pt-3 border-t border-border">
              <p className="text-sm text-muted-foreground">Next checkup: {userData.nextCheckup}</p>
            </div>
          </Card>
          
          {/* Charts */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold flex items-center">
                <LineChartIcon className="h-4 w-4 mr-2" />
                Progress Charts
              </h3>
              
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-7 text-xs",
                    period === 'week' ? "bg-rose-50 text-purple-700" : "text-muted-foreground"
                  )}
                  onClick={() => setPeriod('week')}
                >
                  Week
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-7 text-xs",
                    period === 'month' ? "bg-purple-50 text-purple-700" : "text-muted-foreground"
                  )}
                  onClick={() => setPeriod('month')}
                >
                  Month
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "h-7 text-xs",
                    period === 'all' ? "bg-purple-50 text-purple-700" : "text-muted-foreground"
                  )}
                  onClick={() => setPeriod('all')}
                >
                  All
                </Button>
              </div>
            </div>
            
            <Tabs defaultValue="weight" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="weight">Weight</TabsTrigger>
                <TabsTrigger value="nutrients">Nutrients</TabsTrigger>
              </TabsList>
              
              <TabsContent value="weight">
                <Card className="p-4 border-border h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={weightData}
                      margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="week" tick={{ fontSize: 12 }} tickMargin={10} />
                      <YAxis domain={['auto', 'auto']} tick={{ fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: '8px', 
                          border: '1px solid #e2e8f0' 
                        }} 
                      />
                      <Line
                        type="monotone"
                        dataKey="weight"
                        stroke="#e11d48"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#e11d48' }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </TabsContent>
              
              <TabsContent value="nutrients">
                <Card className="p-4 border-border h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={nutrientData}
                      margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="week" tick={{ fontSize: 12 }} tickMargin={10} />
                      <YAxis tick={{ fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          borderRadius: '8px', 
                          border: '1px solid #e2e8f0' 
                        }} 
                      />
                      <Line
                        type="monotone"
                        dataKey="iron"
                        name="Iron (g/dL)"
                        stroke="#e11d48"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#e11d48' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="calcium"
                        name="Calcium (%)"
                        stroke="#0ea5e9"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#0ea5e9' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="protein"
                        name="Protein (%)"
                        stroke="#10b981"
                        strokeWidth={2}
                        dot={{ r: 4, fill: '#10b981' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotherProgress;
