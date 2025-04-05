
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell
} from 'recharts';
import { ChevronUp, ChevronDown, Zap, Activity, Droplet, TrendingUp, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock data for the charts
const nutritionData = [
  { day: 'Mon', protein: 80, carbs: 65, fat: 50, calories: 70, iron: 60 },
  { day: 'Tue', protein: 75, carbs: 70, fat: 55, calories: 65, iron: 50 },
  { day: 'Wed', protein: 90, carbs: 85, fat: 60, calories: 80, iron: 70 },
  { day: 'Thu', protein: 85, carbs: 80, fat: 65, calories: 75, iron: 65 },
  { day: 'Fri', protein: 95, carbs: 90, fat: 70, calories: 85, iron: 75 },
  { day: 'Sat', protein: 88, carbs: 75, fat: 60, calories: 78, iron: 68 },
  { day: 'Sun', protein: 92, carbs: 85, fat: 65, calories: 82, iron: 72 },
];

const macroData = [
  { name: 'Protein', value: 30 },
  { name: 'Carbs', value: 45 },
  { name: 'Fats', value: 25 },
];

const COLORS = ['#9b87f5', '#36b9cc', '#f6c23e'];

const insights = [
  "Your protein intake is consistently above the target. Great job!",
  "Your iron levels are increasing, which is important for your pregnancy.",
  "Consider increasing your calcium intake for optimal bone development.",
  "Your water intake is lower than recommended. Try to drink more water throughout the day.",
];

const RealTimeMonitoring = () => {
  const [period, setPeriod] = useState('week');
  
  return (
    <div className="min-h-screen pb-20">
      <Header title="Nutrition Monitoring" showBackButton />
      
      <div className="px-4 py-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-3">
              <div className="flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-purple-700 font-medium">Daily Goal</p>
                  <Zap className="h-4 w-4 text-purple-500" />
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-purple-800">76%</h3>
                    <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-200">
                      <ChevronUp className="h-3 w-3 mr-1" />
                      5%
                    </Badge>
                  </div>
                  <Progress value={76} className="h-1.5 mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-3">
              <div className="flex flex-col justify-between h-full">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-blue-700 font-medium">Hydration</p>
                  <Droplet className="h-4 w-4 text-blue-500" />
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-blue-800">1.6L</h3>
                    <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                      <ChevronDown className="h-3 w-3 mr-1" />
                      10%
                    </Badge>
                  </div>
                  <Progress value={65} className="h-1.5 mt-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Trend Chart */}
        <Card>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Nutrition Trends</CardTitle>
              <div className="flex items-center space-x-1">
                <Badge 
                  variant={period === 'week' ? 'default' : 'outline'} 
                  className="cursor-pointer text-xs h-6"
                  onClick={() => setPeriod('week')}
                >
                  Week
                </Badge>
                <Badge 
                  variant={period === 'month' ? 'default' : 'outline'} 
                  className="cursor-pointer text-xs h-6"
                  onClick={() => setPeriod('month')}
                >
                  Month
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={nutritionData} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="protein" stroke="#9b87f5" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="iron" stroke="#e11d48" strokeWidth={2} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="calories" stroke="#f6c23e" strokeWidth={2} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center mt-2 gap-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#9b87f5] mr-1"></div>
                <span className="text-xs">Protein</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#e11d48] mr-1"></div>
                <span className="text-xs">Iron</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-[#f6c23e] mr-1"></div>
                <span className="text-xs">Calories</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Macronutrients */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Macronutrient Distribution</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="w-40 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={macroData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    innerRadius={30}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {macroData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2">
              {macroData.map((entry, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index] }}></div>
                  <span className="text-sm">{entry.name}: {entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* AI Insights */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center">
              <Activity className="h-5 w-5 mr-2" />
              AI Nutrition Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {insights.map((insight, idx) => (
                <div 
                  key={idx} 
                  className={cn(
                    "p-3 border rounded-lg flex items-start gap-2",
                    idx === 3 ? "bg-amber-50 border-amber-200" : "bg-purple-50 border-purple-200"
                  )}
                >
                  {idx === 3 ? (
                    <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
                  ) : (
                    <TrendingUp className="h-5 w-5 text-purple-500 mt-0.5" />
                  )}
                  <p className={cn(
                    "text-sm",
                    idx === 3 ? "text-amber-800" : "text-purple-800"
                  )}>
                    {insight}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="bg-muted/50 border-t">
            <p className="text-xs text-muted-foreground w-full text-center">
              These insights are generated based on your recent nutrition data
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default RealTimeMonitoring;
