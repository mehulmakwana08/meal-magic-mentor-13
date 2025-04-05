
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { BarChart, PieChart, Flame, Users, Utensils, Search, Filter, MapPin, Calendar, Download } from 'lucide-react';

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from 'recharts';

// Mock data
const beneficiaryData = [
  { month: 'Jan', pregnant: 45, lactating: 30, children: 85 },
  { month: 'Feb', pregnant: 50, lactating: 35, children: 90 },
  { month: 'Mar', pregnant: 52, lactating: 38, children: 95 },
  { month: 'Apr', pregnant: 60, lactating: 40, children: 100 },
  { month: 'May', pregnant: 65, lactating: 42, children: 105 },
];

const regionData = [
  { name: 'North', value: 35 },
  { name: 'South', value: 25 },
  { name: 'East', value: 20 },
  { name: 'West', value: 15 },
  { name: 'Central', value: 5 },
];

const COLORS = ['#9b87f5', '#36b9cc', '#f6c23e', '#1cc88a', '#e74a3b'];

const beneficiaries = [
  {
    id: 1,
    name: "Meera Singh",
    type: "Pregnant",
    age: 28,
    region: "North Delhi",
    status: "active",
    progress: 85,
    nextCheckup: "15 May 2023",
  },
  {
    id: 2,
    name: "Priya Patel",
    type: "Lactating",
    age: 30,
    region: "South Delhi",
    status: "active",
    progress: 92,
    nextCheckup: "18 May 2023",
  },
  {
    id: 3,
    name: "Arjun Kumar",
    type: "Child",
    age: 4,
    region: "East Delhi",
    status: "attention",
    progress: 65,
    nextCheckup: "12 May 2023",
  },
  {
    id: 4,
    name: "Vikram Singh",
    type: "Child",
    age: 3,
    region: "West Delhi",
    status: "active",
    progress: 78,
    nextCheckup: "20 May 2023",
  },
  {
    id: 5,
    name: "Anaya Reddy",
    type: "Pregnant",
    age: 25,
    region: "Central Delhi",
    status: "attention",
    progress: 70,
    nextCheckup: "14 May 2023",
  },
];

const programs = [
  {
    id: 1,
    name: "Iron Supplementation Program",
    beneficiaries: 156,
    completionRate: 75,
    status: "active",
  },
  {
    id: 2,
    name: "Mother & Child Nutrition Program",
    beneficiaries: 212,
    completionRate: 68,
    status: "active",
  },
  {
    id: 3,
    name: "Pregnancy Support Initiative",
    beneficiaries: 98,
    completionRate: 82,
    status: "active",
  },
];

const AnganwadiDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  
  return (
    <div className="min-h-screen pb-20">
      <Header title="Anganwadi Dashboard" />
      
      <div className="px-4 py-6 space-y-6">
        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Total Beneficiaries</p>
                  <h3 className="text-2xl font-bold">267</h3>
                  <p className="text-xs text-green-600 font-medium mt-1">
                    +12% from last month
                  </p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Active Programs</p>
                  <h3 className="text-2xl font-bold">8</h3>
                  <p className="text-xs text-blue-600 font-medium mt-1">
                    3 ending this month
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Utensils className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-muted-foreground">Nutrition Compliance</p>
                  <h3 className="text-2xl font-bold">78%</h3>
                  <p className="text-xs text-amber-600 font-medium mt-1">
                    +5% from last month
                  </p>
                </div>
                <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <Flame className="h-6 w-6 text-amber-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <BarChart className="h-5 w-5 mr-2" />
                Beneficiary Trend
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart
                    data={beneficiaryData}
                    margin={{ top: 5, right: 5, bottom: 20, left: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="pregnant" fill="#9b87f5" name="Pregnant" />
                    <Bar dataKey="lactating" fill="#36b9cc" name="Lactating" />
                    <Bar dataKey="children" fill="#f6c23e" name="Children" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center mt-2 gap-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#9b87f5] mr-1"></div>
                  <span className="text-xs">Pregnant</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#36b9cc] mr-1"></div>
                  <span className="text-xs">Lactating</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#f6c23e] mr-1"></div>
                  <span className="text-xs">Children</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Regional Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-64 flex items-center justify-center">
                <div className="w-40 h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={regionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        innerRadius={30}
                        outerRadius={60}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {regionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col gap-2">
                  {regionData.map((entry, index) => (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: COLORS[index] }}
                      ></div>
                      <span className="text-xs">{entry.name}: {entry.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs for Beneficiaries and Programs */}
        <Tabs defaultValue="beneficiaries">
          <TabsList>
            <TabsTrigger value="beneficiaries">Beneficiaries</TabsTrigger>
            <TabsTrigger value="programs">Nutrition Programs</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="beneficiaries" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <CardTitle className="text-lg font-semibold">Beneficiary Management</CardTitle>
                  
                  <div className="flex flex-col md:flex-row gap-2 mt-2 md:mt-0">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search beneficiaries..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 h-9 w-full md:w-[200px]"
                      />
                    </div>
                    
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="h-9 w-full md:w-[150px]">
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="attention">Needs Attention</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {beneficiaries.map((beneficiary) => (
                    <div key={beneficiary.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{beneficiary.name}</h3>
                            <Badge 
                              variant={beneficiary.status === 'active' ? 'default' : 'outline'}
                              className={
                                beneficiary.status === 'active' ? 'ml-2 bg-green-500'
                                : beneficiary.status === 'attention' ? 'ml-2 bg-amber-500'
                                : 'ml-2 bg-gray-500'
                              }
                            >
                              {beneficiary.status === 'active' ? 'Active' 
                              : beneficiary.status === 'attention' ? 'Needs Attention'
                              : 'Inactive'}
                            </Badge>
                          </div>
                          
                          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm">
                            <div className="flex items-center text-muted-foreground">
                              <Users className="h-3.5 w-3.5 mr-1" />
                              {beneficiary.type}, {beneficiary.age} {beneficiary.type === 'Child' ? 'years' : ''}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="h-3.5 w-3.5 mr-1" />
                              {beneficiary.region}
                            </div>
                            <div className="flex items-center text-muted-foreground">
                              <Calendar className="h-3.5 w-3.5 mr-1" />
                              Next: {beneficiary.nextCheckup}
                            </div>
                          </div>
                        </div>
                        
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium">Nutrition Progress</span>
                          <span className="text-xs font-medium">{beneficiary.progress}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              beneficiary.progress >= 80 ? 'bg-green-500'
                              : beneficiary.progress >= 70 ? 'bg-amber-500'
                              : 'bg-red-500'
                            }`}
                            style={{ width: `${beneficiary.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t flex justify-between bg-muted/50">
                <div className="text-xs text-muted-foreground">
                  Showing 5 out of 267 beneficiaries
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="programs" className="mt-4">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <CardTitle className="text-lg font-semibold">Nutrition Programs</CardTitle>
                  <Button size="sm">Add New Program</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {programs.map((program) => (
                    <div key={program.id} className="border rounded-lg p-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{program.name}</h3>
                          <div className="flex mt-1 text-sm">
                            <div className="text-muted-foreground">
                              {program.beneficiaries} Beneficiaries
                            </div>
                          </div>
                        </div>
                        
                        <Button size="sm" variant="outline">
                          Manage
                        </Button>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium">Completion Rate</span>
                          <span className="text-xs font-medium">{program.completionRate}%</span>
                        </div>
                        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full bg-primary`}
                            style={{ width: `${program.completionRate}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="border-t flex justify-between bg-muted/50">
                <div className="text-xs text-muted-foreground">
                  Showing 3 out of 8 active programs
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Monthly Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Nutrition Impact Report - April 2023</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Summary of nutrition program outcomes for April 2023
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Beneficiary Growth Report - Q1 2023</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Analysis of beneficiary registration and retention
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Program Effectiveness Report - 2023</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Comparative analysis of nutrition program effectiveness
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t bg-muted/50">
                <Button variant="secondary" className="w-full">
                  Generate Custom Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnganwadiDashboard;
