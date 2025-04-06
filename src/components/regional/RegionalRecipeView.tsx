
import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Star, Clock, Users, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

// Sample data - in a real app, this would come from an API
const gujaratiRecipes = [
  {
    id: 1,
    name: 'Undhiyu',
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&auto=format&fit=crop',
    description: 'A traditional Gujarati mixed vegetable dish made with winter vegetables and fenugreek dumplings.',
    healthBenefits: ['High Fiber', 'Rich in Vitamins', 'Antioxidants'],
    prepTime: '60 min',
    servings: 6,
    category: 'Main Dish',
    tags: ['Vegetarian', 'Winter', 'Traditional'],
    rating: 4.8,
    nutrientInfo: {
      calories: 350,
      protein: '9g',
      carbs: '45g',
      fats: '12g',
      fiber: '8g'
    },
    ingredientGroups: [
      {
        name: 'Vegetables',
        items: ['Purple yam', 'Eggplant', 'Potatoes', 'Green Beans', 'Carrots']
      },
      {
        name: 'Spices',
        items: ['Cumin', 'Coriander', 'Turmeric', 'Red Chili Powder']
      }
    ]
  },
  {
    id: 2,
    name: 'Dhokla',
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&auto=format&fit=crop',
    description: 'A savory steamed cake made from fermented gram flour, popular as a breakfast or snack.',
    healthBenefits: ['Protein-Rich', 'Low Fat', 'Probiotics'],
    prepTime: '30 min',
    servings: 4,
    category: 'Snack',
    tags: ['Vegetarian', 'Fermented', 'Breakfast'],
    rating: 4.6,
    nutrientInfo: {
      calories: 180,
      protein: '7g',
      carbs: '30g',
      fats: '3g',
      fiber: '4g'
    },
    ingredientGroups: [
      {
        name: 'Base',
        items: ['Gram flour (Besan)', 'Yogurt', 'Water']
      },
      {
        name: 'Tempering',
        items: ['Mustard Seeds', 'Curry Leaves', 'Green Chilies']
      }
    ]
  },
  {
    id: 3,
    name: 'Thepla',
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&auto=format&fit=crop',
    description: 'Flatbread made with whole wheat flour and fenugreek leaves, ideal for travel and quick meals.',
    healthBenefits: ['Iron-Rich', 'Good for Digestion', 'Lactation Support'],
    prepTime: '25 min',
    servings: 8,
    category: 'Bread',
    tags: ['Vegetarian', 'Travel-Friendly', 'Pregnancy-Friendly'],
    rating: 4.5,
    nutrientInfo: {
      calories: 120,
      protein: '4g',
      carbs: '22g',
      fats: '3g',
      fiber: '3g'
    },
    ingredientGroups: [
      {
        name: 'Dough',
        items: ['Whole Wheat Flour', 'Fenugreek Leaves', 'Yogurt', 'Spices']
      }
    ]
  },
  {
    id: 4,
    name: 'Gujarati Kadhi',
    image: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&auto=format&fit=crop',
    description: 'A sweet and spicy yogurt-based curry, typically served with rice or khichdi.',
    healthBenefits: ['Probiotics', 'Digestive Aid', 'Calcium-Rich'],
    prepTime: '20 min',
    servings: 4,
    category: 'Soup/Curry',
    tags: ['Vegetarian', 'Light Meal', 'Summer Food'],
    rating: 4.7,
    nutrientInfo: {
      calories: 150,
      protein: '5g',
      carbs: '18g',
      fats: '7g',
      fiber: '1g'
    },
    ingredientGroups: [
      {
        name: 'Base',
        items: ['Yogurt', 'Gram Flour (Besan)', 'Water']
      },
      {
        name: 'Seasoning',
        items: ['Cumin Seeds', 'Mustard Seeds', 'Curry Leaves', 'Cinnamon']
      }
    ]
  }
];

interface RecipeFilterProps {
  onFilterChange: (filters: any) => void;
}

const RecipeFilter: React.FC<RecipeFilterProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    healthGoals: {
      pregnancy: false,
      lactation: false,
      childGrowth: false,
      diabetic: false,
      weightLoss: false
    },
    mealTypes: {
      breakfast: false,
      lunch: false,
      dinner: false,
      snack: false
    },
    dietaryRestrictions: {
      vegetarian: false,
      vegan: false,
      glutenFree: false,
      dairyFree: false
    }
  });

  const handleFilterChange = (category: string, key: string, value: boolean) => {
    const newFilters = {
      ...filters,
      [category]: {
        ...filters[category as keyof typeof filters],
        [key]: value
      }
    };
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-medium mb-2">Health Goals</h3>
        <div className="space-y-2">
          {Object.entries(filters.healthGoals).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox 
                id={`health-${key}`} 
                checked={value}
                onCheckedChange={(checked) => 
                  handleFilterChange('healthGoals', key, checked as boolean)
                }
              />
              <Label htmlFor={`health-${key}`} className="text-sm capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Meal Types</h3>
        <div className="space-y-2">
          {Object.entries(filters.mealTypes).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox 
                id={`meal-${key}`} 
                checked={value}
                onCheckedChange={(checked) => 
                  handleFilterChange('mealTypes', key, checked as boolean)
                }
              />
              <Label htmlFor={`meal-${key}`} className="text-sm capitalize">
                {key}
              </Label>
            </div>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-2">Dietary Restrictions</h3>
        <div className="space-y-2">
          {Object.entries(filters.dietaryRestrictions).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <Checkbox 
                id={`diet-${key}`} 
                checked={value}
                onCheckedChange={(checked) => 
                  handleFilterChange('dietaryRestrictions', key, checked as boolean)
                }
              />
              <Label htmlFor={`diet-${key}`} className="text-sm capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const RegionalRecipeView: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<typeof gujaratiRecipes[0] | null>(null);
  
  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters);
    // In a real app, this would filter the recipes
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // In a real app, this would search for recipes
  };
  
  return (
    <div className="w-full">
      <div className="mb-6">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Gujarati recipes..."
              className="pl-9"
            />
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" type="button">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <RecipeFilter onFilterChange={handleFilterChange} />
            </PopoverContent>
          </Popover>
          
          <Button type="submit">Search</Button>
        </form>
      </div>
      
      {selectedRecipe ? (
        <div className="space-y-6">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedRecipe(null)} 
            className="mb-2"
          >
            ← Back to Recipes
          </Button>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img 
                src={selectedRecipe.image} 
                alt={selectedRecipe.name} 
                className="w-full h-64 object-cover rounded-lg"
              />
              
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-amber fill-amber" />
                    <span className="ml-1 font-medium">{selectedRecipe.rating}/5</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-sm">{selectedRecipe.prepTime}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-muted-foreground mr-1" />
                      <span className="text-sm">{selectedRecipe.servings} servings</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {selectedRecipe.tags.map((tag, index) => (
                    <Badge key={index} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Health Benefits</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {selectedRecipe.healthBenefits.map((benefit, index) => (
                      <li key={index} className="text-sm">{benefit}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Nutritional Information</h3>
                  <div className="grid grid-cols-5 gap-2">
                    <div className="bg-muted p-2 rounded text-center">
                      <div className="text-xs text-muted-foreground">Calories</div>
                      <div className="font-medium">{selectedRecipe.nutrientInfo.calories}</div>
                    </div>
                    <div className="bg-muted p-2 rounded text-center">
                      <div className="text-xs text-muted-foreground">Protein</div>
                      <div className="font-medium">{selectedRecipe.nutrientInfo.protein}</div>
                    </div>
                    <div className="bg-muted p-2 rounded text-center">
                      <div className="text-xs text-muted-foreground">Carbs</div>
                      <div className="font-medium">{selectedRecipe.nutrientInfo.carbs}</div>
                    </div>
                    <div className="bg-muted p-2 rounded text-center">
                      <div className="text-xs text-muted-foreground">Fats</div>
                      <div className="font-medium">{selectedRecipe.nutrientInfo.fats}</div>
                    </div>
                    <div className="bg-muted p-2 rounded text-center">
                      <div className="text-xs text-muted-foreground">Fiber</div>
                      <div className="font-medium">{selectedRecipe.nutrientInfo.fiber}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-bold">{selectedRecipe.name}</h2>
                <p className="text-muted-foreground mt-1">{selectedRecipe.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Ingredients</h3>
                {selectedRecipe.ingredientGroups.map((group, index) => (
                  <div key={index} className="mb-4">
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">{group.name}</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {group.items.map((item, idx) => (
                        <li key={idx} className="text-sm">{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Preparation</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li className="text-sm">
                    Wash and chop all vegetables into medium-sized pieces.
                  </li>
                  <li className="text-sm">
                    Heat oil in a deep pot and add mustard seeds. When they start crackling, add cumin seeds.
                  </li>
                  <li className="text-sm">
                    Add the chopped vegetables and mix well with the spices.
                  </li>
                  <li className="text-sm">
                    Cover and cook on low heat for 30-40 minutes, stirring occasionally.
                  </li>
                  <li className="text-sm">
                    The dish is ready when all vegetables are tender but still hold their shape.
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Special Notes</h3>
                <div className="bg-amber-50 border border-amber-200 rounded p-3 text-sm">
                  <p className="text-amber-800">
                    <strong>For Pregnancy:</strong> Rich in folate and iron which are essential during pregnancy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {gujaratiRecipes.map((recipe) => (
            <Card 
              key={recipe.id} 
              className="overflow-hidden cursor-pointer transition-transform hover:scale-[1.02]"
              onClick={() => setSelectedRecipe(recipe)}
            >
              <div className="h-40 overflow-hidden">
                <img 
                  src={recipe.image} 
                  alt={recipe.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{recipe.name}</CardTitle>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-amber fill-amber" />
                    <span className="ml-1 text-sm font-medium">{recipe.rating}</span>
                  </div>
                </div>
                <CardDescription>{recipe.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="pb-2">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 text-muted-foreground mr-1" />
                    <span>{recipe.prepTime}</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-3 w-3 text-muted-foreground mr-1" />
                    <span>{recipe.category}</span>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter>
                <div className="flex flex-wrap gap-1">
                  {recipe.healthBenefits.slice(0, 2).map((benefit, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {benefit}
                    </Badge>
                  ))}
                  {recipe.healthBenefits.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{recipe.healthBenefits.length - 2} more
                    </Badge>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default RegionalRecipeView;
