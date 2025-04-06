
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

interface NutrientData {
  name: string;
  current: number;
  recommended: number;
}

interface NutritionalAnalysisChartProps {
  data: NutrientData[];
  height?: number;
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const currentValue = payload[0].value;
    const recommendedValue = payload[1].value;
    const percentage = Math.round((currentValue / recommendedValue) * 100);
    
    return (
      <div className="bg-white p-3 border border-border rounded-lg shadow-sm">
        <p className="font-medium mb-1">{label}</p>
        <p className="text-sm text-primary">Current: {currentValue}%</p>
        <p className="text-sm text-muted-foreground">Recommended: {recommendedValue}%</p>
        <p className="text-sm font-medium mt-1">
          {percentage >= 100 ? "✅ Adequate" : `❗ ${100 - percentage}% deficient`}
        </p>
      </div>
    );
  }

  return null;
};

const NutritionalAnalysisChart: React.FC<NutritionalAnalysisChartProps> = ({ 
  data,
  height = 350,
  className
}) => {
  return (
    <div style={{ width: '100%', height }} className={className}>
      <ResponsiveContainer>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 30, bottom: 10 }}
          barGap={0}
          barSize={20}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.3} />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12 }}
            tickMargin={10}
            axisLine={{ stroke: '#E0E0E0' }}
          />
          <YAxis 
            label={{ 
              value: '% of Recommended', 
              angle: -90, 
              position: 'insideLeft',
              style: { textAnchor: 'middle', fontSize: 12, opacity: 0.7 }
            }}
            tick={{ fontSize: 12 }}
            tickMargin={10}
            axisLine={{ stroke: '#E0E0E0' }}
            domain={[0, 150]}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="top" 
            height={36}
            iconType="circle"
            iconSize={8}
          />
          <ReferenceLine y={100} stroke="#E0E0E0" strokeWidth={2} strokeDasharray="3 3" />
          <Bar 
            dataKey="current" 
            name="Current Intake" 
            fill="#4DB6AC" 
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="recommended" 
            name="Recommended" 
            fill="#E0E0E0" 
            radius={[4, 4, 0, 0]}
            fillOpacity={0.5}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default NutritionalAnalysisChart;
