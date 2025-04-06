
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ComparisonData {
  nutrient: string;
  user: number;
  district: number;
  state: number;
  national: number;
}

interface RegionalNutritionComparisonProps {
  data: ComparisonData[];
  title?: string;
  className?: string;
  userLabel?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-border rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const RegionalNutritionComparison: React.FC<RegionalNutritionComparisonProps> = ({
  data,
  title = "Regional Nutrition Comparison",
  className,
  userLabel = "Your Data"
}) => {
  const [selectedRegion, setSelectedRegion] = useState<'district' | 'state' | 'national'>('district');
  const [chartView, setChartView] = useState<'all' | 'deficient'>('all');
  
  const filteredData = React.useMemo(() => {
    if (chartView === 'deficient') {
      return data.filter(item => item.user < 70);
    }
    return data;
  }, [data, chartView]);
  
  const comparisonData = React.useMemo(() => {
    return filteredData.map(item => ({
      nutrient: item.nutrient,
      [userLabel]: item.user,
      [selectedRegion === 'district' ? 'District Average' : 
        selectedRegion === 'state' ? 'State Average' : 'National Average']: 
        item[selectedRegion]
    }));
  }, [filteredData, selectedRegion, userLabel]);

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <div className="flex flex-col sm:flex-row gap-2 mt-2 md:mt-0">
            <Select value={selectedRegion} onValueChange={(value: any) => setSelectedRegion(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Comparison" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="district">District Average</SelectItem>
                <SelectItem value="state">State Average</SelectItem>
                <SelectItem value="national">National Average</SelectItem>
              </SelectContent>
            </Select>
            
            <Tabs value={chartView} onValueChange={(value: any) => setChartView(value)} className="w-[180px]">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="deficient">Deficient</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={comparisonData}
              margin={{ top: 20, right: 30, left: 10, bottom: 50 }}
              barGap={5}
              layout="vertical"
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" domain={[0, 100]} label={{ value: '% of Recommended Intake', position: 'bottom', offset: 20 }} />
              <YAxis dataKey="nutrient" type="category" width={100} tick={{ fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend verticalAlign="bottom" height={36} />
              <Bar 
                dataKey={userLabel} 
                fill="#4DB6AC" 
                radius={[0, 4, 4, 0]} 
              />
              <Bar 
                dataKey={selectedRegion === 'district' ? 'District Average' : 
                  selectedRegion === 'state' ? 'State Average' : 'National Average'} 
                fill="#9b87f5" 
                radius={[0, 4, 4, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RegionalNutritionComparison;
