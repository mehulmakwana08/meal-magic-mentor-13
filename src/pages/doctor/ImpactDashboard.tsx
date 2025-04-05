
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TrendingUp, TrendingDown, Users, Calendar, Download, ThumbsUp, BarChart, PieChart } from 'lucide-react';

import {
  LineChart, Line, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Mock data for charts
const growthData = [
  { month: 'Jan', underweight: 25, normal: 65, overweight: 10 },
  { month: 'Feb', underweight: 22, normal: 68, overweight: 10 },
  { month: 'Mar', underweight: 20, normal: 70, overweight: 10 },
  { month: 'Apr', underweight: 18, normal: 72, overweight: 10 },
  { month: 'May', underweight: 15, normal: 75, overweight: 10 },
  { month: 'Jun', underweight: 12, normal: 78, overweight: 10 },
];

const nutritionData = [
  { name: 'Iron', deficient: 35, improving: 40, normal: 25 },
  { name: 'Calcium', deficient: 28, improving: 45, normal: 27 },
  { name: 'Protein', deficient: 15, improving: 35, normal: 50 },
  { name: 'Vitamins', deficient: 22, improving: 38, normal: 40 },
];

const pregnancyOutcomeData = [
  { name: 'Normal Weight', value: 68 },
  { name: 'Low Birth Weight', value: 18 },
  { name: 'High Birth Weight', value: 14 },
];

const COLORS = ['#1cc88a', '#f6c23e', '#e74a3b', '#4e73df', '#36b9cc'];

const kpiData = [
  {
    title: "Underweight Children",
    current: "12%",
    previous: "25%",
    change: -13,
    improving: true,
  },
  {
    title: "Anemic Mothers",
    current: "18%",
    previous: "29%",
    change: -11,
    improving: true,
  },
  {
    title: "Breastfeeding Rate",
    current: "82%",
    previous: "70%",
    change: 12,
    improving: true,
  },
  {
    title: "Vaccination Coverage",
    current: "95%",
    previous: "90%",
    change: 5,
    improving: true,
  },
];

const regionPerformance = [
  {
    region: "North",
    nutritionScore: 78,
    beneficiaryCount: 120,
    success: "Reduced underweight by 15%",
    challenge: "Limited breastfeeding adherence",
  },
  {
    region: "South",
    nutritionScore: 85,
    beneficiaryCount: 164,
    success: "Improved maternal nutrition by 22%",
    challenge: "Access to fresh vegetables",
  },
  {
    region: "East",
    nutritionScore: 72,
    beneficiaryCount: 97,
    success: "Increased iron levels by 25%",
    challenge: "Follow-up attendance",
  },
  {
    region: "West",
    nutritionScore: 81,
    beneficiaryCount: 135,
    success: "Improved child growth metrics by 18%",
    challenge: "Traditional practice conflicts",
  },
];

const ImpactDashboard = () => {
  const [timeFrame, setTimeFrame] = useState('6m');
  
  return (
    <div className="min-h-screen pb-20">
      <Header title="Impact Measurement" showBackButton />
      
      <div className="px-4 py-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <h2 className="text-xl font-bold">Nutrition Intervention Outcomes</h2>
          
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <Select value={timeFrame} onValueChange={setTimeFrame}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3m">Last 3 months</SelectItem>
                <SelectItem value="6m">Last 6 months</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="all">All time</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpiData.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground">{item.title}</p>
                <div className="flex items-center justify-between mt-2">
                  <h3 className="text-2xl font-bold">{item.current}</h3>
                  <div className={`flex items-center text-sm ${item.improving ? 'text-green-600' : 'text-red-600'}`}>
                    {item.improving ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {item.change > 0 ? '+' : ''}{item.change}%
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Previous: {item.previous}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Growth Tracking Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Child Growth Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={growthData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="underweight" name="Underweight" stackId="a" fill="#e74a3b" />
                  <Bar dataKey="normal" name="Normal" stackId="a" fill="#1cc88a" />
                  <Bar dataKey="overweight" name="Overweight" stackId="a" fill="#f6c23e" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
            <div className="text-center mt-4">
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200">
                <ThumbsUp className="h-3 w-3 mr-1" />
                13% reduction in underweight children
              </Badge>
            </div>
          </CardContent>
        </Card>
        
        {/* Nutrition Deficiency Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Nutritional Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={nutritionData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" domain={[0, 100]} />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="deficient" name="Deficient" stackId="a" fill="#e74a3b" />
                  <Bar dataKey="improving" name="Improving" stackId="a" fill="#f6c23e" />
                  <Bar dataKey="normal" name="Normal" stackId="a" fill="#1cc88a" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        {/* Tabs for more detailed analysis */}
        <Tabs defaultValue="outcome">
          <TabsList>
            <TabsTrigger value="outcome">Pregnancy Outcomes</TabsTrigger>
            <TabsTrigger value="regional">Regional Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="outcome" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Birth Outcome Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center justify-around">
                  <div className="w-full md:w-1/2 h-72 md:h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={pregnancyOutcomeData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {pregnancyOutcomeData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="w-full md:w-1/2 space-y-4 mt-6 md:mt-0">
                    <div className="p-4 border rounded-lg bg-green-50 border-green-200">
                      <h3 className="font-medium text-green-700">Key Improvements</h3>
                      <ul className="mt-2 space-y-2 text-sm">
                        <li className="flex items-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></div>
                          Low birth weight reduced from 25% to 18%
                        </li>
                        <li className="flex items-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></div>
                          Full-term deliveries increased by 12%
                        </li>
                        <li className="flex items-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2"></div>
                          Maternal complications decreased by 15%
                        </li>
                      </ul>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <p>Data collected from Jan 2023 to Jun 2023</p>
                      </div>
                      <div className="flex items-center mt-1">
                        <Users className="h-4 w-4 mr-1" />
                        <p>Based on 256 pregnancy records</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="regional" className="mt-4">
            <div className="space-y-4">
              {regionPerformance.map((region, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{region.region} Region</h3>
                        <div className="flex items-center mt-1">
                          <Users className="h-4 w-4 mr-1 text-blue-500" />
                          <p className="text-sm text-muted-foreground">
                            {region.beneficiaryCount} beneficiaries
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <Badge 
                          variant="outline"
                          className={`
                            ${region.nutritionScore >= 80 
                              ? 'bg-green-100 text-green-700 border-green-200' 
                              : region.nutritionScore >= 70 
                                ? 'bg-amber-100 text-amber-700 border-amber-200'
                                : 'bg-red-100 text-red-700 border-red-200'
                            }
                          `}
                        >
                          Nutrition Score: {region.nutritionScore}/100
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                      <div className="border rounded-lg p-3 bg-green-50 border-green-200">
                        <h4 className="text-sm font-medium text-green-800">Success Story</h4>
                        <p className="text-sm mt-1 text-green-700">{region.success}</p>
                      </div>
                      
                      <div className="border rounded-lg p-3 bg-amber-50 border-amber-200">
                        <h4 className="text-sm font-medium text-amber-800">Challenge Area</h4>
                        <p className="text-sm mt-1 text-amber-700">{region.challenge}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ImpactDashboard;
