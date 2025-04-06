
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';
import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface NutrientData {
  name: string;
  current: number;
  recommended: number;
  category?: string;
}

interface NutritionalAnalysisChartProps {
  data: NutrientData[];
  height?: number;
  className?: string;
  showCategoryFilters?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const currentValue = payload[0].value;
    const recommendedValue = payload[1].value;
    const percentage = Math.round((currentValue / recommendedValue) * 100);
    
    return (
      <div className="bg-white p-3 border border-border rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
        <p className="font-medium mb-1">{label}</p>
        <p className="text-sm text-primary">Current: {currentValue}%</p>
        <p className="text-sm text-muted-foreground">Recommended: {recommendedValue}%</p>
        <p className="text-sm font-medium mt-1">
          {percentage >= 100 
            ? "✅ Adequate" 
            : percentage >= 70 
              ? "⚠️ Borderline" 
              : `❗ ${100 - percentage}% deficient`
          }
        </p>
      </div>
    );
  }

  return null;
};

const NutritionalAnalysisChart: React.FC<NutritionalAnalysisChartProps> = ({ 
  data,
  height = 350,
  className,
  showCategoryFilters = false
}) => {
  const { toast } = useToast();
  const [filteredData, setFilteredData] = useState<NutrientData[]>(data);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // Extract unique categories from data
  const categories = React.useMemo(() => {
    if (!showCategoryFilters) return [];
    const cats = new Set<string>();
    data.forEach(item => {
      if (item.category) cats.add(item.category);
    });
    return Array.from(cats);
  }, [data, showCategoryFilters]);

  React.useEffect(() => {
    if (activeCategory) {
      setFilteredData(data.filter(item => item.category === activeCategory));
    } else {
      setFilteredData(data);
    }
  }, [activeCategory, data]);

  const handleNutrientInfo = (nutrient: string) => {
    const nutrientInfo: Record<string, string> = {
      "Protein": "Essential for growth and muscle development. Found in lentils, dairy, and eggs.",
      "Iron": "Critical for blood health. Found in leafy greens, beans, and fortified cereals.",
      "Calcium": "Important for bone health. Found in dairy products, ragi, and leafy greens.",
      "Vitamin A": "Vital for vision and immune function. Found in carrots, sweet potatoes, and dark leafy vegetables.",
      "Vitamin C": "Supports immune health. Found in citrus fruits, amla, and bell peppers.",
      "Zinc": "Important for growth and immune function. Found in seeds, legumes, and whole grains.",
      "Folate": "Essential during pregnancy. Found in leafy greens, legumes, and fortified grains.",
      "Vitamin D": "Important for bone health. Obtained from sunlight and fortified foods.",
      "Vitamin B12": "Critical for nerve function. Found mainly in animal products; supplements recommended for vegetarians.",
    };

    const info = nutrientInfo[nutrient] || "Important for overall health and well-being.";
    
    toast({
      title: `${nutrient} Information`,
      description: info,
      duration: 5000,
    });
  };

  // Find deficient nutrients
  const deficientNutrients = React.useMemo(() => {
    return filteredData
      .filter(item => (item.current / item.recommended) * 100 < 70)
      .sort((a, b) => (a.current / a.recommended) - (b.current / b.recommended));
  }, [filteredData]);

  return (
    <div className={className}>
      {showCategoryFilters && categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          <Button 
            variant={activeCategory === null ? "default" : "outline"} 
            size="sm"
            onClick={() => setActiveCategory(null)}
          >
            All
          </Button>
          {categories.map(category => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      )}
      
      {deficientNutrients.length > 0 && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg dark:bg-amber-900/20 dark:border-amber-800">
          <h4 className="text-sm font-medium text-amber-800 dark:text-amber-300 mb-2">Nutrient Deficiency Alert</h4>
          <div className="flex flex-wrap gap-2">
            {deficientNutrients.map(nutrient => (
              <div 
                key={nutrient.name}
                className="px-2 py-1 text-xs bg-white rounded border border-amber-200 flex items-center gap-1 dark:bg-gray-800 dark:border-amber-700"
              >
                <span>{nutrient.name}: {Math.round((nutrient.current / nutrient.recommended) * 100)}%</span>
                <button 
                  onClick={() => handleNutrientInfo(nutrient.name)}
                  className="text-muted-foreground hover:text-amber-600 dark:hover:text-amber-300"
                >
                  <Info size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div style={{ width: '100%', height }} className="mt-2">
        <ResponsiveContainer>
          <BarChart
            data={filteredData}
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
            <ReferenceLine y={70} stroke="#FFC107" strokeWidth={1.5} strokeDasharray="3 3" label={{
              position: 'right',
              value: 'Min Required (70%)',
              fill: '#FFC107',
              fontSize: 10
            }} />
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
    </div>
  );
};

export default NutritionalAnalysisChart;
