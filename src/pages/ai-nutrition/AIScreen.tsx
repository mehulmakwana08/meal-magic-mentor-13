
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { 
  Brain, Search, ArrowRight, Utensils, MessageSquare, Sparkles, 
  Calendar, FileBarChart, BarChart3, ChevronRight 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AIScreen = () => {
  const { toast } = useToast();
  const [mealQuery, setMealQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  
  const handleGenerateRecommendation = () => {
    if (!mealQuery.trim()) {
      toast({
        title: "Empty request",
        description: "Please describe what kind of meal plan or nutrition advice you need",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing with timeout
    setTimeout(() => {
      // Mock response data
      const mockResponse = {
        mealPlan: [
          {
            meal: "Breakfast",
            options: [
              "Spinach and feta omelet with whole grain toast",
              "Oatmeal with almond milk, berries, and chia seeds",
              "Greek yogurt with honey and mixed nuts"
            ],
            nutrients: ["protein", "calcium", "iron", "fiber"],
            benefits: "Provides essential nutrients for fetal development and sustained energy for the mother."
          },
          {
            meal: "Lunch",
            options: [
              "Lentil soup with whole grain bread",
              "Quinoa salad with chickpeas, vegetables, and feta cheese",
              "Brown rice with mixed vegetables and grilled tofu"
            ],
            nutrients: ["protein", "fiber", "folate", "iron"],
            benefits: "Balanced meal with adequate protein and complex carbohydrates to maintain energy levels throughout the day."
          },
          {
            meal: "Dinner",
            options: [
              "Grilled fish with roasted sweet potatoes and green beans",
              "Vegetable curry with brown rice",
              "Bean and vegetable stew with whole grain bread"
            ],
            nutrients: ["protein", "omega-3", "vitamins", "minerals"],
            benefits: "Protein-rich dinner with essential fatty acids important for baby's brain development."
          },
          {
            meal: "Snacks",
            options: [
              "Apple slices with almond butter",
              "Carrot sticks with hummus",
              "Handful of mixed nuts and dried fruits"
            ],
            nutrients: ["fiber", "healthy fats", "vitamins"],
            benefits: "Healthy snacks to manage hunger between meals and prevent blood sugar spikes."
          }
        ],
        advice: [
          "Stay hydrated by drinking 8-10 glasses of water daily",
          "Choose foods rich in folate, iron, calcium, and protein",
          "Limit caffeine intake to less than 200mg per day",
          "Avoid alcohol and raw or undercooked foods",
          "Consider taking a prenatal vitamin as recommended by your doctor"
        ]
      };
      
      setResult(mockResponse);
      setIsGenerating(false);
      
      toast({
        title: "Recommendation generated",
        description: "Your personalized nutrition plan is ready!",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen pb-20">
      <Header title="AI Nutrition Center" showBackButton />
      
      <div className="px-4 py-6 space-y-6">
        <Tabs defaultValue="recommend" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="recommend">Recommendations</TabsTrigger>
            <TabsTrigger value="analyze">Meal Analysis</TabsTrigger>
            <TabsTrigger value="chat">AI Nutrition Chat</TabsTrigger>
          </TabsList>
          
          {/* Recommendations Tab */}
          <TabsContent value="recommend" className="space-y-4">
            <Card className="border-purple-200">
              <CardHeader className="bg-purple-50 border-b border-purple-200">
                <CardTitle className="flex items-center text-purple-800">
                  <Sparkles className="h-5 w-5 mr-2 text-purple-600" />
                  Get AI Nutrition Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">What type of nutrition plan do you need?</label>
                    <Textarea 
                      placeholder="E.g., I need a meal plan for my third trimester of pregnancy, I'm vegetarian and have gestational diabetes."
                      className="min-h-[100px]"
                      value={mealQuery}
                      onChange={(e) => setMealQuery(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label className="text-sm font-medium mb-1 block">Dietary Preference</label>
                      <Select defaultValue="any">
                        <SelectTrigger>
                          <SelectValue placeholder="Select preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">No restrictions</SelectItem>
                          <SelectItem value="vegetarian">Vegetarian</SelectItem>
                          <SelectItem value="vegan">Vegan</SelectItem>
                          <SelectItem value="gluten-free">Gluten-free</SelectItem>
                          <SelectItem value="lactose-free">Lactose-free</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex-1">
                      <label className="text-sm font-medium mb-1 block">Regional Cuisine</label>
                      <Select defaultValue="indian">
                        <SelectTrigger>
                          <SelectValue placeholder="Select cuisine" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="indian">Indian</SelectItem>
                          <SelectItem value="north-indian">North Indian</SelectItem>
                          <SelectItem value="south-indian">South Indian</SelectItem>
                          <SelectItem value="east-indian">East Indian</SelectItem>
                          <SelectItem value="west-indian">West Indian</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch id="local-ingredients" defaultChecked />
                    <label htmlFor="local-ingredients" className="text-sm font-medium">
                      Prefer locally available ingredients
                    </label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t flex justify-end pt-4 bg-muted/20">
                <Button 
                  onClick={handleGenerateRecommendation}
                  disabled={isGenerating}
                  className="flex items-center"
                >
                  {isGenerating ? "Generating..." : "Generate Recommendations"}
                  {!isGenerating && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </CardFooter>
            </Card>
            
            {result && (
              <div className="space-y-4 animate-fade-in">
                <Card className="border-primary">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Utensils className="h-5 w-5 mr-2 text-primary" />
                      Your Personalized Meal Plan
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {result.mealPlan.map((meal, index) => (
                      <div key={index} className="space-y-2">
                        <h3 className="font-medium text-lg">{meal.meal}</h3>
                        <ul className="space-y-2 ml-5 list-disc">
                          {meal.options.map((option, i) => (
                            <li key={i} className="text-sm">{option}</li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {meal.nutrients.map((nutrient, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {nutrient}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{meal.benefits}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-primary" />
                      Nutrition Advice
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.advice.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-2 mt-0.5">
                            <span className="text-xs font-medium text-primary">{index + 1}</span>
                          </div>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                
                <div className="flex justify-center gap-2">
                  <Button variant="outline">
                    <Calendar className="h-4 w-4 mr-2" />
                    Add to My Plan
                  </Button>
                  <Button variant="outline">
                    <FileBarChart className="h-4 w-4 mr-2" />
                    Save as PDF
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          {/* Meal Analysis Tab */}
          <TabsContent value="analyze" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Analyze Your Meal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea 
                    placeholder="List the foods in your meal (e.g., 1 cup rice, 100g chicken, 1 cup spinach)"
                    className="min-h-[100px]"
                  />
                  
                  <Button className="w-full">
                    Analyze Nutritional Content
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">
                  Upload a photo of your meal for analysis (coming soon)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed rounded-lg p-6 flex items-center justify-center">
                  <p className="text-muted-foreground">
                    This feature will be available soon
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* AI Chat Tab */}
          <TabsContent value="chat" className="space-y-4">
            <Card className="min-h-[400px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Chat with Nutrition AI
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="h-[300px] border rounded-lg p-4 overflow-y-auto">
                  <div className="flex flex-col space-y-4">
                    <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                      <p className="text-sm">
                        Hello! I'm your nutrition assistant. Ask me any questions about pregnancy nutrition, breastfeeding, or child nutrition.
                      </p>
                    </div>
                    
                    <div className="bg-primary/10 p-3 rounded-lg max-w-[80%] ml-auto">
                      <p className="text-sm">
                        What foods should I eat to increase my iron levels during pregnancy?
                      </p>
                    </div>
                    
                    <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                      <p className="text-sm">
                        To boost iron levels during pregnancy, focus on these foods:
                        <br /><br />
                        1. Leafy greens like spinach and kale
                        <br />
                        2. Lentils and beans
                        <br />
                        3. Fortified cereals
                        <br />
                        4. Red meat (if you're not vegetarian)
                        <br />
                        5. Dried fruits like apricots and raisins
                        <br /><br />
                        Also, pair these with vitamin C-rich foods to improve absorption, and avoid tea or coffee with meals as they can inhibit iron absorption.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="relative w-full">
                  <Input 
                    placeholder="Type your nutrition question here..." 
                    className="pr-[70px]"
                  />
                  <Button 
                    className="absolute right-0 top-0 bottom-0 rounded-l-none"
                    size="sm"
                  >
                    Send
                  </Button>
                </div>
              </CardFooter>
            </Card>
            
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Powered by AI nutrition models trained on maternal and child health research
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIScreen;
