
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Apple, MapPin } from 'lucide-react';

// Mock database of local foods
const mockLocalFoods = [
  {
    name: "Ragi",
    region: "South India",
    category: "grains",
    nutrients: ["Iron", "Calcium", "Fiber"],
    benefits: "High in calcium, supports bone development in pregnancy",
    preparation: "Can be made into porridge, dosa, or roti",
    image: "https://placehold.co/100x100/9b87f5/ffffff?text=Ragi",
  },
  {
    name: "Sattu",
    region: "East India",
    category: "grains",
    nutrients: ["Protein", "Iron", "Fiber"],
    benefits: "High protein content, provides sustained energy",
    preparation: "Mixed with water or milk as a cooling summer drink",
    image: "https://placehold.co/100x100/9b87f5/ffffff?text=Sattu",
  },
  {
    name: "Moringa Leaves",
    region: "South India",
    category: "vegetables",
    nutrients: ["Vitamin C", "Iron", "Calcium"],
    benefits: "Rich in iron, helps prevent anemia during pregnancy",
    preparation: "Can be added to soups, stews, or made into a stir-fry",
    image: "https://placehold.co/100x100/9b87f5/ffffff?text=Moringa",
  },
  {
    name: "Amaranth Leaves",
    region: "North India",
    category: "vegetables",
    nutrients: ["Iron", "Vitamin A", "Vitamin C"],
    benefits: "Excellent source of folate for fetal development",
    preparation: "Stir-fried or added to soups and stews",
    image: "https://placehold.co/100x100/9b87f5/ffffff?text=Amaranth",
  },
  {
    name: "Jowar",
    region: "West India",
    category: "grains",
    nutrients: ["Fiber", "Protein", "Iron"],
    benefits: "Gluten-free grain, good for digestive health",
    preparation: "Used for rotis, bhakri, and porridge",
    image: "https://placehold.co/100x100/9b87f5/ffffff?text=Jowar",
  },
  {
    name: "Amla",
    region: "All India",
    category: "fruits",
    nutrients: ["Vitamin C", "Antioxidants"],
    benefits: "Boosts immunity during pregnancy",
    preparation: "Eaten fresh, as juice, or in pickles",
    image: "https://placehold.co/100x100/9b87f5/ffffff?text=Amla",
  },
  {
    name: "Bajra",
    region: "North India",
    category: "grains",
    nutrients: ["Iron", "Protein", "Magnesium"],
    benefits: "High in fiber, helps manage gestational diabetes",
    preparation: "Used for rotis, khichdi, and porridge",
    image: "https://placehold.co/100x100/9b87f5/ffffff?text=Bajra",
  },
  {
    name: "Sesame Seeds",
    region: "All India",
    category: "seeds",
    nutrients: ["Calcium", "Zinc", "Magnesium"],
    benefits: "Rich in calcium for bone health",
    preparation: "Added to sweets, chutneys, or sprinkled on foods",
    image: "https://placehold.co/100x100/9b87f5/ffffff?text=Sesame",
  }
];

const LocalFoodDatabase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredFoods, setFilteredFoods] = useState(mockLocalFoods);
  
  useEffect(() => {
    let result = mockLocalFoods;
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(food => 
        food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.nutrients.some(n => n.toLowerCase().includes(searchQuery.toLowerCase())) ||
        food.benefits.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (activeCategory !== 'all') {
      result = result.filter(food => food.category === activeCategory);
    }
    
    setFilteredFoods(result);
  }, [searchQuery, activeCategory]);
  
  return (
    <div className="min-h-screen pb-20">
      <Header title="Local Food Database" showBackButton />
      
      <div className="px-4 py-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search foods, nutrients, or benefits..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory}>
          <ScrollArea className="whitespace-nowrap pb-2">
            <TabsList className="inline-flex w-max">
              <TabsTrigger value="all">All Foods</TabsTrigger>
              <TabsTrigger value="grains">Grains</TabsTrigger>
              <TabsTrigger value="vegetables">Vegetables</TabsTrigger>
              <TabsTrigger value="fruits">Fruits</TabsTrigger>
              <TabsTrigger value="seeds">Seeds & Nuts</TabsTrigger>
              <TabsTrigger value="dairy">Dairy</TabsTrigger>
            </TabsList>
          </ScrollArea>
          
          <div className="my-4">
            <h2 className="text-sm font-medium text-muted-foreground">
              Showing {filteredFoods.length} foods
            </h2>
          </div>
          
          <TabsContent value="all" className="space-y-4 mt-0">
            {filteredFoods.map((food, idx) => (
              <FoodCard key={idx} food={food} />
            ))}
            
            {filteredFoods.length === 0 && (
              <div className="text-center py-10">
                <Apple className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                <h3 className="font-medium">No foods found</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Try adjusting your search or filter
                </p>
              </div>
            )}
          </TabsContent>
          
          {['grains', 'vegetables', 'fruits', 'seeds', 'dairy'].map(category => (
            <TabsContent key={category} value={category} className="space-y-4 mt-0">
              {filteredFoods.map((food, idx) => (
                <FoodCard key={idx} food={food} />
              ))}
              
              {filteredFoods.length === 0 && (
                <div className="text-center py-10">
                  <Apple className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                  <h3 className="font-medium">No foods found</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Try adjusting your search
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

const FoodCard = ({ food }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="flex">
          <div className="w-20 h-20">
            <img 
              src={food.image} 
              alt={food.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 p-3">
            <div className="flex justify-between items-start">
              <h3 className="font-medium">{food.name}</h3>
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" />
                {food.region}
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {food.benefits}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {food.nutrients.map((nutrient, i) => (
                <Badge 
                  key={i} 
                  variant="outline" 
                  className="text-xs bg-purple-50 text-purple-700 border-purple-200"
                >
                  {nutrient}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LocalFoodDatabase;
