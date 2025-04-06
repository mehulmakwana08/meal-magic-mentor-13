
import React, { useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CorrelationDataPoint {
  id: string | number;
  name?: string;
  xValue: number;
  yValue: number;
  size: number;
  category?: string;
}

interface MetricOption {
  value: string;
  label: string;
  unit: string;
}

interface HealthMetricsCorrelationProps {
  data: CorrelationDataPoint[];
  xMetricOptions: MetricOption[];
  yMetricOptions: MetricOption[];
  defaultXMetric: string;
  defaultYMetric: string;
  title?: string;
  description?: string;
  className?: string;
}

const COLORS = ['#4DB6AC', '#FFC107', '#9b87f5', '#F44336', '#4CAF50'];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white p-3 border border-border rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <p className="font-medium mb-1">{data.name || `Beneficiary ${data.id}`}</p>
        <p className="text-sm text-primary">{`${payload[0].name}: ${data.xValue}`}</p>
        <p className="text-sm text-primary">{`${payload[1] ? payload[1].name : 'Value'}: ${data.yValue}`}</p>
        {data.category && (
          <p className="text-xs text-muted-foreground mt-1">{data.category}</p>
        )}
      </div>
    );
  }
  return null;
};

const HealthMetricsCorrelation: React.FC<HealthMetricsCorrelationProps> = ({
  data,
  xMetricOptions,
  yMetricOptions,
  defaultXMetric,
  defaultYMetric,
  title = "Health Metrics Correlation",
  description = "Explore relationships between different health indicators",
  className
}) => {
  const [xMetric, setXMetric] = useState(defaultXMetric);
  const [yMetric, setYMetric] = useState(defaultYMetric);
  
  const selectedXMetric = xMetricOptions.find(option => option.value === xMetric);
  const selectedYMetric = yMetricOptions.find(option => option.value === yMetric);
  
  // Group data by category for color coding
  const dataByCategory = React.useMemo(() => {
    const categories = new Set(data.map(item => item.category));
    const categoryMap = new Map();
    
    Array.from(categories).forEach((category, index) => {
      if (category) {
        categoryMap.set(category, COLORS[index % COLORS.length]);
      }
    });
    
    return categoryMap;
  }, [data]);

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <div className="flex flex-col space-y-1.5">
          <CardTitle className="text-lg font-semibold">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="flex flex-wrap gap-3 mt-3">
          <div className="space-y-1">
            <label htmlFor="x-metric" className="text-sm font-medium text-muted-foreground">X-Axis Metric</label>
            <Select value={xMetric} onValueChange={setXMetric}>
              <SelectTrigger id="x-metric" className="w-[180px]">
                <SelectValue placeholder="Select X-Axis Metric" />
              </SelectTrigger>
              <SelectContent>
                {xMetricOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-1">
            <label htmlFor="y-metric" className="text-sm font-medium text-muted-foreground">Y-Axis Metric</label>
            <Select value={yMetric} onValueChange={setYMetric}>
              <SelectTrigger id="y-metric" className="w-[180px]">
                <SelectValue placeholder="Select Y-Axis Metric" />
              </SelectTrigger>
              <SelectContent>
                {yMetricOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                type="number" 
                dataKey="xValue" 
                name={selectedXMetric?.label} 
                label={{ 
                  value: `${selectedXMetric?.label} (${selectedXMetric?.unit})`, 
                  position: 'bottom', 
                  offset: 0 
                }}
              />
              <YAxis 
                type="number" 
                dataKey="yValue" 
                name={selectedYMetric?.label} 
                label={{ 
                  value: `${selectedYMetric?.label} (${selectedYMetric?.unit})`, 
                  angle: -90, 
                  position: 'left' 
                }}
              />
              <ZAxis type="number" dataKey="size" range={[40, 200]} />
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name={`${selectedXMetric?.label} vs ${selectedYMetric?.label}`} data={data}>
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.category ? dataByCategory.get(entry.category) : COLORS[0]} 
                  />
                ))}
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        
        {dataByCategory.size > 0 && (
          <div className="mt-4 flex flex-wrap gap-3">
            {Array.from(dataByCategory.entries()).map(([category, color], index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: color as string }}
                ></div>
                <span className="text-sm">{category}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default HealthMetricsCorrelation;
