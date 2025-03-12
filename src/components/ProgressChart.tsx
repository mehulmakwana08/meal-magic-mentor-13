
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface ProgressChartProps {
  data: {
    name: string;
    value: number;
    target?: number;
  }[];
  title: string;
  subtitle?: string;
  color?: string;
  className?: string;
  height?: number;
  unit?: string;
}

const ProgressChart = ({
  data,
  title,
  subtitle,
  color = '#4DB6AC',
  className,
  height = 200,
  unit = '',
}: ProgressChartProps) => {
  return (
    <div className={cn('bg-white rounded-xl p-4 card-shadow', className)}>
      <div className="mb-2">
        <h3 className="font-semibold text-base">{title}</h3>
        {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      
      <div style={{ height }} className="mt-3">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient id={`color-${title}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.8} />
                <stop offset="95%" stopColor={color} stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 10 }}
              tickMargin={8}
              axisLine={{ stroke: '#e0e0e0' }}
            />
            <YAxis
              tick={{ fontSize: 10 }}
              tickMargin={8}
              axisLine={{ stroke: '#e0e0e0' }}
              tickFormatter={(value) => `${value}${unit}`}
            />
            <Tooltip
              formatter={(value) => [`${value}${unit}`, '']}
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #e0e0e0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
              }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#color-${title})`}
            />
            {data[0].target !== undefined && (
              <Area
                type="monotone"
                dataKey="target"
                stroke="#ccc"
                strokeDasharray="3 3"
                strokeWidth={1.5}
                fill="none"
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;
