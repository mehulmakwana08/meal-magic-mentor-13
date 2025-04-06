
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { toast } from 'sonner';
import Header from '@/components/Header';
import NutritionalAnalysisChart from '@/components/charts/NutritionalAnalysisChart';
import RegionalRecipeView from '@/components/regional/RegionalRecipeView';
import SeasonalFoodCalendar from '@/components/regional/SeasonalFoodCalendar';
import { Brain, Calendar, FileSpreadsheet, Baby, Heart, Apple } from 'lucide-react';

const AINutritionPlanning = () => {
  const [activeTab, setActiveTab] = useState('personalized');
  const [loading, setLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    activityLevel: 'moderate',
    healthGoal: 'balanced',
    dietaryRestrictions: [] as string[],
    pregnancyStage: '',
    childAge: '',
    lactationPeriod: '',
    region: 'gujarat',
    existingConditions: [] as string[],
    foodPreferences: '',
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (name: string, value: string, checked: boolean) => {
    setFormData((prev) => {
      const currentValues = prev[name as keyof typeof formData] as string[];
      
      if (checked) {
        return { ...prev, [name]: [...currentValues, value] };
      } else {
        return { ...prev, [name]: currentValues.filter(v => v !== value) };
      }
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setShowRecommendations(true);
      toast.success('Nutrition plan generated successfully!');
    }, 2000);
  };
  
  // Sample nutrition data for the chart
  const nutritionData = [
    { name: 'Protein', current: 75, recommended: 100 },
    { name: 'Carbs', current: 90, recommended: 100 },
    { name: 'Fats', current: 60, recommended: 100 },
    { name: 'Fiber', current: 80, recommended: 100 },
    { name: 'Iron', current: 50, recommended: 100 },
    { name: 'Calcium', current: 70, recommended: 100 },
    { name: 'Vitamin A', current: 85, recommended: 100 },
    { name: 'Vitamin C', current: 120, recommended: 100 },
  ];
  
  return (
    <div className="min-h-screen pb-20 md:pb-0">
      <Header title="AI Nutrition Planning" showBackButton />
      
      <div className="px-4 py-4 md:px-6 max-w-7xl mx-auto">
        <Tabs 
          defaultValue="personalized" 
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personalized">
              <Brain className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Personalized</span>
              <span className="sm:hidden">AI</span>
            </TabsTrigger>
            <TabsTrigger value="recipes">
              <Apple className="w-4 h-4 mr-2" />
              <span>Recipes</span>
            </TabsTrigger>
            <TabsTrigger value="seasonal">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Seasonal</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="personalized" className="space-y-6">
            {showRecommendations ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Your Personalized Plan</h2>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowRecommendations(false)}
                  >
                    Edit Info
                  </Button>
                </div>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Nutritional Analysis</CardTitle>
                    <CardDescription>
                      Based on your current intake vs recommended values
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <NutritionalAnalysisChart data={nutritionData} />
                  </CardContent>
                </Card>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Daily Recommendations</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium">Macronutrients</h3>
                        <ul className="mt-2 space-y-2">
                          <li className="flex justify-between items-center">
                            <span>Protein</span>
                            <span className="font-medium">65-70g</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span>Carbohydrates</span>
                            <span className="font-medium">225-250g</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span>Healthy Fats</span>
                            <span className="font-medium">55-65g</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span>Fiber</span>
                            <span className="font-medium">25-30g</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">Micronutrients Focus</h3>
                        <ul className="mt-2 space-y-2">
                          <li className="flex justify-between items-center">
                            <span>Iron</span>
                            <span className="font-medium text-rose-600">27mg (increase needed)</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span>Calcium</span>
                            <span className="font-medium">1000mg</span>
                          </li>
                          <li className="flex justify-between items-center">
                            <span>Folate</span>
                            <span className="font-medium">600mcg</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <h3 className="font-medium text-amber-800">Special Note</h3>
                        <p className="text-sm text-amber-700 mt-1">
                          During the second trimester, focus on increasing iron-rich foods to prevent anemia. Include vitamin C sources with iron-rich foods to enhance absorption.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Personalized Meal Ideas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-medium">Breakfast</h3>
                        <ul className="mt-1 text-sm space-y-1.5">
                          <li>• Methi thepla with curd</li>
                          <li>• Moong dal chilla with vegetable stuffing</li>
                          <li>• Millet porridge with jaggery and nuts</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">Lunch</h3>
                        <ul className="mt-1 text-sm space-y-1.5">
                          <li>• Brown rice, dal, palak paneer</li>
                          <li>• Millet khichdi with mixed vegetables</li>
                          <li>• Rotla with kathol (legume curry) and curd</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">Dinner</h3>
                        <ul className="mt-1 text-sm space-y-1.5">
                          <li>• Multi-grain roti with seasonal vegetable curry</li>
                          <li>• Mung beans khichdi with ghee</li>
                          <li>• Vegetable handvo with chutney</li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium">Snacks</h3>
                        <ul className="mt-1 text-sm space-y-1.5">
                          <li>• Roasted chana with jaggery</li>
                          <li>• Seasonal fruits with nuts</li>
                          <li>• Sukhdi (traditional Gujarati sweet with nutritional benefits)</li>
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button>Save Plan</Button>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Get Your Personalized Nutrition Plan</CardTitle>
                  <CardDescription>
                    Tell us about yourself so we can create a custom nutrition plan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input 
                          id="age" 
                          name="age" 
                          placeholder="e.g., 28" 
                          value={formData.age}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <Input 
                          id="weight" 
                          name="weight" 
                          placeholder="e.g., 65" 
                          value={formData.weight}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (cm)</Label>
                        <Input 
                          id="height" 
                          name="height" 
                          placeholder="e.g., 165" 
                          value={formData.height}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="region">Region</Label>
                        <Select 
                          defaultValue={formData.region}
                          onValueChange={(value) => handleSelectChange('region', value)}
                        >
                          <SelectTrigger id="region">
                            <SelectValue placeholder="Select region" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="gujarat">Gujarat</SelectItem>
                            <SelectItem value="rajasthan">Rajasthan</SelectItem>
                            <SelectItem value="maharashtra">Maharashtra</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Physical Activity Level</Label>
                      <RadioGroup 
                        defaultValue={formData.activityLevel}
                        onValueChange={(value) => handleSelectChange('activityLevel', value)}
                        className="flex flex-col space-y-1"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="sedentary" id="sedentary" />
                          <Label htmlFor="sedentary">Sedentary (little to no exercise)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="light" id="light" />
                          <Label htmlFor="light">Light (light exercise 1-3 days/week)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="moderate" id="moderate" />
                          <Label htmlFor="moderate">Moderate (moderate exercise 3-5 days/week)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="active" id="active" />
                          <Label htmlFor="active">Active (hard exercise 6-7 days/week)</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <RadioGroup 
                        defaultValue="pregnant"
                        onValueChange={(value) => handleSelectChange('category', value)}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="pregnant" id="pregnant" />
                          <Label htmlFor="pregnant" className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" /> Pregnant
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="lactating" id="lactating" />
                          <Label htmlFor="lactating" className="flex items-center gap-1">
                            <Heart className="w-4 h-4" /> Lactating
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="child" id="child" />
                          <Label htmlFor="child" className="flex items-center gap-1">
                            <Baby className="w-4 h-4" /> Child
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Pregnancy Stage</Label>
                      <RadioGroup 
                        defaultValue="second-trimester"
                        onValueChange={(value) => handleSelectChange('pregnancyStage', value)}
                        className="flex space-x-4"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="first-trimester" id="first-trimester" />
                          <Label htmlFor="first-trimester">First Trimester</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="second-trimester" id="second-trimester" />
                          <Label htmlFor="second-trimester">Second Trimester</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="third-trimester" id="third-trimester" />
                          <Label htmlFor="third-trimester">Third Trimester</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Dietary Restrictions</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="vegetarian"
                            onCheckedChange={(checked) => 
                              handleCheckboxChange('dietaryRestrictions', 'vegetarian', checked as boolean)
                            }
                          />
                          <Label htmlFor="vegetarian">Vegetarian</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="vegan"
                            onCheckedChange={(checked) => 
                              handleCheckboxChange('dietaryRestrictions', 'vegan', checked as boolean)
                            }
                          />
                          <Label htmlFor="vegan">Vegan</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="gluten-free"
                            onCheckedChange={(checked) => 
                              handleCheckboxChange('dietaryRestrictions', 'gluten-free', checked as boolean)
                            }
                          />
                          <Label htmlFor="gluten-free">Gluten-Free</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="lactose-free"
                            onCheckedChange={(checked) => 
                              handleCheckboxChange('dietaryRestrictions', 'lactose-free', checked as boolean)
                            }
                          />
                          <Label htmlFor="lactose-free">Lactose-Free</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Do you have any of these conditions?</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="diabetes"
                            onCheckedChange={(checked) => 
                              handleCheckboxChange('existingConditions', 'diabetes', checked as boolean)
                            }
                          />
                          <Label htmlFor="diabetes">Diabetes</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="hypertension"
                            onCheckedChange={(checked) => 
                              handleCheckboxChange('existingConditions', 'hypertension', checked as boolean)
                            }
                          />
                          <Label htmlFor="hypertension">Hypertension</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="anemia"
                            onCheckedChange={(checked) => 
                              handleCheckboxChange('existingConditions', 'anemia', checked as boolean)
                            }
                          />
                          <Label htmlFor="anemia">Anemia</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="thyroid"
                            onCheckedChange={(checked) => 
                              handleCheckboxChange('existingConditions', 'thyroid', checked as boolean)
                            }
                          />
                          <Label htmlFor="thyroid">Thyroid Issues</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="foodPreferences">
                        Food Preferences and Allergies
                      </Label>
                      <Textarea 
                        id="foodPreferences" 
                        name="foodPreferences"
                        placeholder="List any food preferences, allergies, or dislikes..."
                        value={formData.foodPreferences}
                        onChange={handleInputChange}
                        className="min-h-[100px]"
                      />
                    </div>
                    
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? 'Generating Plan...' : 'Generate Nutrition Plan'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          <TabsContent value="recipes">
            <Card>
              <CardHeader>
                <CardTitle>Gujarat-Specific Healthy Recipes</CardTitle>
                <CardDescription>
                  Discover nutritious traditional recipes perfect for pregnancy, lactation, and child growth
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RegionalRecipeView />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="seasonal">
            <Card>
              <CardHeader>
                <CardTitle>Seasonal Food Guide</CardTitle>
                <CardDescription>
                  Find out which fruits and vegetables are in season in Gujarat for maximum nutrition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SeasonalFoodCalendar />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AINutritionPlanning;
