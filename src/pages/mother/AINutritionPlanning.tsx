
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Brain, Utensils, Salad, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AINutritionPlanning = () => {
  const { toast } = useToast();
  const [trimester, setTrimester] = useState('');
  const [healthCondition, setHealthCondition] = useState('');
  const [region, setRegion] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  const handleGeneratePlan = () => {
    if (!trimester || !region) {
      toast({
        title: "Missing information",
        description: "Please select your pregnancy stage and region",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI plan generation with setTimeout
    setTimeout(() => {
      const mockPlan = {
        breakfast: [
          { name: "Oats Porridge", nutrients: ["Fiber", "Protein"], benefits: "Provides sustained energy" },
          { name: "Mixed Fruit Bowl", nutrients: ["Vitamins", "Antioxidants"], benefits: "Boosts immunity" },
        ],
        lunch: [
          { name: "Brown Rice", nutrients: ["Complex Carbs", "Fiber"], benefits: "Steady glucose levels" },
          { name: "Mixed Vegetable Curry", nutrients: ["Vitamins", "Minerals"], benefits: "Essential nutrients for baby development" },
          { name: "Yogurt", nutrients: ["Calcium", "Probiotics"], benefits: "Bone development and gut health" },
        ],
        dinner: [
          { name: "Whole Grain Roti", nutrients: ["Complex Carbs", "B Vitamins"], benefits: "Slow-release energy" },
          { name: "Lentil Soup", nutrients: ["Protein", "Iron"], benefits: "Crucial for blood production" },
          { name: "Sautéed Greens", nutrients: ["Folate", "Iron"], benefits: "Prevents neural tube defects" },
        ],
        snacks: [
          { name: "Nuts and Seeds Mix", nutrients: ["Healthy Fats", "Protein"], benefits: "Brain development" },
          { name: "Fruit Smoothie", nutrients: ["Vitamins", "Calcium"], benefits: "Hydration and nutrition" },
        ]
      };
      
      setGeneratedPlan(mockPlan);
      setIsGenerating(false);
      toast({
        title: "Plan generated successfully!",
        description: "Your personalized nutrition plan is ready.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen pb-20">
      <Header title="AI Nutrition Planning" showBackButton />
      
      <div className="px-4 py-6 space-y-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-xl font-bold">Personalized Meal Plan</CardTitle>
            <Brain className="h-6 w-6 text-purple-600" />
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Our AI will generate a personalized nutrition plan based on your specific needs and preferences.
            </p>
            
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Pregnancy Stage</label>
                <Select value={trimester} onValueChange={setTrimester}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your pregnancy stage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="first-trimester">First Trimester</SelectItem>
                    <SelectItem value="second-trimester">Second Trimester</SelectItem>
                    <SelectItem value="third-trimester">Third Trimester</SelectItem>
                    <SelectItem value="breastfeeding">Breastfeeding</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Health Conditions (Optional)</label>
                <Select value={healthCondition} onValueChange={setHealthCondition}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any health conditions?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="gestational-diabetes">Gestational Diabetes</SelectItem>
                    <SelectItem value="hypertension">Hypertension</SelectItem>
                    <SelectItem value="anemia">Anemia</SelectItem>
                    <SelectItem value="thyroid">Thyroid Issues</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Region</label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="north">North India</SelectItem>
                    <SelectItem value="south">South India</SelectItem>
                    <SelectItem value="east">East India</SelectItem>
                    <SelectItem value="west">West India</SelectItem>
                    <SelectItem value="central">Central India</SelectItem>
                    <SelectItem value="northeast">Northeast India</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={handleGeneratePlan} 
                className="w-full mt-2" 
                disabled={isGenerating}
              >
                {isGenerating ? "Generating Plan..." : "Generate Nutrition Plan"}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {generatedPlan && (
          <Card className="border-purple-200">
            <CardHeader className="bg-purple-50 rounded-t-lg">
              <CardTitle className="flex items-center text-purple-700">
                <Calendar className="h-5 w-5 mr-2" />
                Your Personalized Nutrition Plan
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <Tabs defaultValue="breakfast">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="breakfast">Breakfast</TabsTrigger>
                  <TabsTrigger value="lunch">Lunch</TabsTrigger>
                  <TabsTrigger value="dinner">Dinner</TabsTrigger>
                  <TabsTrigger value="snacks">Snacks</TabsTrigger>
                </TabsList>
                
                <TabsContent value="breakfast" className="space-y-4">
                  {generatedPlan.breakfast.map((item, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="flex items-center">
                        <Utensils className="h-4 w-4 text-purple-600 mr-2" />
                        <h3 className="font-medium">{item.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.benefits}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.nutrients.map((nutrient, i) => (
                          <Badge key={i} variant="outline" className="bg-purple-50 border-purple-200">
                            {nutrient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="lunch" className="space-y-4">
                  {generatedPlan.lunch.map((item, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="flex items-center">
                        <Utensils className="h-4 w-4 text-purple-600 mr-2" />
                        <h3 className="font-medium">{item.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.benefits}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.nutrients.map((nutrient, i) => (
                          <Badge key={i} variant="outline" className="bg-purple-50 border-purple-200">
                            {nutrient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="dinner" className="space-y-4">
                  {generatedPlan.dinner.map((item, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="flex items-center">
                        <Utensils className="h-4 w-4 text-purple-600 mr-2" />
                        <h3 className="font-medium">{item.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.benefits}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.nutrients.map((nutrient, i) => (
                          <Badge key={i} variant="outline" className="bg-purple-50 border-purple-200">
                            {nutrient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>
                
                <TabsContent value="snacks" className="space-y-4">
                  {generatedPlan.snacks.map((item, idx) => (
                    <div key={idx} className="p-3 border rounded-lg">
                      <div className="flex items-center">
                        <Utensils className="h-4 w-4 text-purple-600 mr-2" />
                        <h3 className="font-medium">{item.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{item.benefits}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.nutrients.map((nutrient, i) => (
                          <Badge key={i} variant="outline" className="bg-purple-50 border-purple-200">
                            {nutrient}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>
              </Tabs>
              
              <div className="mt-6 pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  This plan is personalized based on your pregnancy stage, health conditions, and regional preferences. 
                  Please consult with your healthcare provider before making significant changes to your diet.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AINutritionPlanning;
