
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Sample data for the seasonal foods
const seasonalFoods = {
  winter: {
    months: ['December', 'January', 'February'],
    fruits: [
      { name: 'Strawberry', benefits: 'Rich in vitamin C and antioxidants', image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=150&h=150&auto=format&fit=crop' },
      { name: 'Papaya', benefits: 'Good for digestion, high in vitamin A', image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=150&h=150&auto=format&fit=crop' },
      { name: 'Guava', benefits: 'High in vitamin C, aids weight loss', image: 'https://images.unsplash.com/photo-1536511132770-e5058c7e8c46?w=150&h=150&auto=format&fit=crop' },
      { name: 'Sapota', benefits: 'Rich in iron, good for pregnant women', image: 'https://images.unsplash.com/photo-1517282009859-f000ec3b26fe?w=150&h=150&auto=format&fit=crop' },
    ],
    vegetables: [
      { name: 'Fenugreek Leaves', benefits: 'Iron-rich, good for lactation', image: 'https://images.unsplash.com/photo-1576646444188-8599471e2dd6?w=150&h=150&auto=format&fit=crop' },
      { name: 'Purple Yam', benefits: 'Rich in antioxidants, supports gut health', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150&h=150&auto=format&fit=crop' },
      { name: 'Green Peas', benefits: 'High in protein and fiber', image: 'https://images.unsplash.com/photo-1563199539279-b072e1679215?w=150&h=150&auto=format&fit=crop' },
      { name: 'Suran', benefits: 'Good for joint pain, high in nutrients', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150&h=150&auto=format&fit=crop' },
    ]
  },
  summer: {
    months: ['March', 'April', 'May'],
    fruits: [
      { name: 'Mango', benefits: 'Rich in vitamin A and C, boosts immunity', image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=150&h=150&auto=format&fit=crop' },
      { name: 'Watermelon', benefits: 'Hydrating, rich in lycopene', image: 'https://images.unsplash.com/photo-1563114773-84221bd62daa?w=150&h=150&auto=format&fit=crop' },
      { name: 'Jamun', benefits: 'Controls blood sugar, rich in iron', image: 'https://images.unsplash.com/photo-1551189253-56fe5a61d3db?w=150&h=150&auto=format&fit=crop' },
      { name: 'Lychee', benefits: 'Rich in vitamin C, good for skin', image: 'https://images.unsplash.com/photo-1588965865187-2c94bc8def6f?w=150&h=150&auto=format&fit=crop' },
    ],
    vegetables: [
      { name: 'Bottle Gourd', benefits: 'Cooling, good for digestion', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150&h=150&auto=format&fit=crop' },
      { name: 'Ridge Gourd', benefits: 'Low in calories, good for weight loss', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150&h=150&auto=format&fit=crop' },
      { name: 'Pointed Gourd', benefits: 'Controls blood sugar, low calorie', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150&h=150&auto=format&fit=crop' },
      { name: 'Okra', benefits: 'Good for pregnant women, rich in folate', image: 'https://images.unsplash.com/photo-1425543103986-22abb7d7e8d2?w=150&h=150&auto=format&fit=crop' },
    ]
  },
  monsoon: {
    months: ['June', 'July', 'August', 'September'],
    fruits: [
      { name: 'Pear', benefits: 'Good for digestion, rich in fiber', image: 'https://images.unsplash.com/photo-1631160299919-6a6988728b11?w=150&h=150&auto=format&fit=crop' },
      { name: 'Pomegranate', benefits: 'Rich in antioxidants, good for heart', image: 'https://images.unsplash.com/photo-1578829779691-99b60bd8c7be?w=150&h=150&auto=format&fit=crop' },
      { name: 'Custard Apple', benefits: 'Good for nervous system, rich in B vitamins', image: 'https://images.unsplash.com/photo-1549993800-bf30ba4e4254?w=150&h=150&auto=format&fit=crop' },
      { name: 'Fig', benefits: 'Good for digestion, rich in calcium', image: 'https://images.unsplash.com/photo-1592187270271-9a4b84faa228?w=150&h=150&auto=format&fit=crop' },
    ],
    vegetables: [
      { name: 'Cluster Beans', benefits: 'Lowers cholesterol, rich in fiber', image: 'https://images.unsplash.com/photo-1567375698949-c04dca0855a5?w=150&h=150&auto=format&fit=crop' },
      { name: 'Corn', benefits: 'Rich in antioxidants, good for eyes', image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=150&h=150&auto=format&fit=crop' },
      { name: 'Ivy Gourd', benefits: 'Helps control diabetes, low calorie', image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=150&h=150&auto=format&fit=crop' },
      { name: 'Amaranth Leaves', benefits: 'Rich in iron, great for anemia', image: 'https://images.unsplash.com/photo-1576646444188-8599471e2dd6?w=150&h=150&auto=format&fit=crop' },
    ]
  },
  autumn: {
    months: ['October', 'November'],
    fruits: [
      { name: 'Apple', benefits: 'Good for heart, rich in fiber', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=150&h=150&auto=format&fit=crop' },
      { name: 'Orange', benefits: 'Rich in vitamin C, boosts immunity', image: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=150&h=150&auto=format&fit=crop' },
      { name: 'Banana', benefits: 'Energy booster, rich in potassium', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=150&h=150&auto=format&fit=crop' },
      { name: 'Kiwi', benefits: 'High in vitamin C, good for digestion', image: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=150&h=150&auto=format&fit=crop' },
    ],
    vegetables: [
      { name: 'Carrot', benefits: 'Good for eyes, rich in vitamin A', image: 'https://images.unsplash.com/photo-1590868309235-ea34bed7bd7f?w=150&h=150&auto=format&fit=crop' },
      { name: 'Spinach', benefits: 'Rich in iron, good for pregnancy', image: 'https://images.unsplash.com/photo-1576064535092-797393568830?w=150&h=150&auto=format&fit=crop' },
      { name: 'Cauliflower', benefits: 'Low in calories, anti-inflammatory', image: 'https://images.unsplash.com/photo-1613743619602-628cf8a6e818?w=150&h=150&auto=format&fit=crop' },
      { name: 'Cabbage', benefits: 'Good for digestion, rich in vitamin K', image: 'https://images.unsplash.com/photo-1551888931-23a551bf9cbb?w=150&h=150&auto=format&fit=crop' },
    ]
  }
};

const FoodItem = ({ name, benefits, image }: { name: string, benefits: string, image: string }) => {
  return (
    <div className="flex items-center gap-3 bg-muted/50 rounded-lg p-3 hover:bg-muted transition-colors">
      <img 
        src={image} 
        alt={name} 
        className="w-16 h-16 rounded-lg object-cover"
      />
      <div>
        <h3 className="font-medium">{name}</h3>
        <p className="text-xs text-muted-foreground">{benefits}</p>
      </div>
    </div>
  );
};

const SeasonalFoodCalendar = () => {
  const [season, setSeason] = useState<'winter' | 'summer' | 'monsoon' | 'autumn'>('winter');
  
  // Get current month to highlight the active season
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  const currentSeason = Object.entries(seasonalFoods).find(([_, { months }]) => 
    months.includes(currentMonth)
  )?.[0] as 'winter' | 'summer' | 'monsoon' | 'autumn' || 'winter';
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl flex items-center justify-between">
          <span>Seasonal Food Calendar</span>
          <span className="text-sm text-muted-foreground">Current: {currentMonth}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={currentSeason} onValueChange={(value) => setSeason(value as any)}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="winter">Winter</TabsTrigger>
            <TabsTrigger value="summer">Summer</TabsTrigger>
            <TabsTrigger value="monsoon">Monsoon</TabsTrigger>
            <TabsTrigger value="autumn">Autumn</TabsTrigger>
          </TabsList>
          
          {Object.entries(seasonalFoods).map(([key, { months, fruits, vegetables }]) => (
            <TabsContent key={key} value={key} className="space-y-6 animate-fade-in">
              <div>
                <h3 className="font-medium text-lg mb-2">Months</h3>
                <div className="flex flex-wrap gap-2">
                  {months.map((month) => (
                    <span 
                      key={month} 
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm",
                        month === currentMonth ? "bg-primary text-primary-foreground" : "bg-muted"
                      )}
                    >
                      {month}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-3">Fruits</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {fruits.map((fruit) => (
                    <FoodItem key={fruit.name} {...fruit} />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-lg mb-3">Vegetables</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {vegetables.map((vegetable) => (
                    <FoodItem key={vegetable.name} {...vegetable} />
                  ))}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SeasonalFoodCalendar;
