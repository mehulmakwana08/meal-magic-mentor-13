
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ClipboardCheck, ArrowRight, HelpCircle } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';

const MotherSurvey = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    pregnancyStage: '',
    age: '',
    previousChildrenCount: '',
    healthConcerns: '',
    dietaryRestrictions: '',
    nutritionGoals: '',
  });

  const totalSteps = 3;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    // Save the survey data
    localStorage.setItem('motherSurveyCompleted', 'true');
    localStorage.setItem('motherSurveyData', JSON.stringify(formData));
    
    toast({
      title: "Survey completed",
      description: "Thank you for completing the survey! Your personalized plan is ready.",
    });
    
    // Redirect to the mother's home page
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header title="Initial Survey" className="md:top-0" />
      
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-2xl space-y-8 animate-fade-in">
          <div className="text-center mb-8">
            <ClipboardCheck className="h-12 w-12 text-primary mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-primary md:text-3xl">Mother's Health Survey</h1>
            <p className="mt-2 text-muted-foreground">
              Help us understand your needs better so we can provide personalized nutrition guidance
            </p>
            
            <div className="flex justify-center items-center gap-2 mt-6">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all ${
                    i + 1 === currentStep 
                      ? 'w-8 bg-primary' 
                      : i + 1 < currentStep 
                        ? 'w-6 bg-primary/60' 
                        : 'w-6 bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Basic Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="age" className="block text-sm font-medium mb-1">
                      Your age
                    </label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleInputChange}
                      placeholder="Enter your age"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Pregnancy stage
                    </label>
                    <RadioGroup 
                      value={formData.pregnancyStage}
                      onValueChange={(value) => handleRadioChange('pregnancyStage', value)}
                      className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="first-trimester" id="first-trimester" />
                        <label htmlFor="first-trimester" className="text-sm font-medium cursor-pointer flex-1">
                          First Trimester (1-12 weeks)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="second-trimester" id="second-trimester" />
                        <label htmlFor="second-trimester" className="text-sm font-medium cursor-pointer flex-1">
                          Second Trimester (13-26 weeks)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="third-trimester" id="third-trimester" />
                        <label htmlFor="third-trimester" className="text-sm font-medium cursor-pointer flex-1">
                          Third Trimester (27-40 weeks)
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="postpartum" id="postpartum" />
                        <label htmlFor="postpartum" className="text-sm font-medium cursor-pointer flex-1">
                          Postpartum / Breastfeeding
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  <div>
                    <label htmlFor="previousChildrenCount" className="block text-sm font-medium mb-1">
                      Number of previous children
                    </label>
                    <Input
                      id="previousChildrenCount"
                      name="previousChildrenCount"
                      type="number"
                      value={formData.previousChildrenCount}
                      onChange={handleInputChange}
                      placeholder="Enter number"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Health Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="healthConcerns" className="block text-sm font-medium mb-1">
                      Any health concerns or conditions?
                    </label>
                    <Input
                      id="healthConcerns"
                      name="healthConcerns"
                      value={formData.healthConcerns}
                      onChange={handleInputChange}
                      placeholder="E.g., gestational diabetes, high blood pressure, etc."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      Dietary restrictions
                    </label>
                    <RadioGroup 
                      value={formData.dietaryRestrictions}
                      onValueChange={(value) => handleRadioChange('dietaryRestrictions', value)}
                      className="grid grid-cols-1 md:grid-cols-2 gap-3"
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="none" id="none" />
                        <label htmlFor="none" className="text-sm font-medium cursor-pointer flex-1">
                          None
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="vegetarian" id="vegetarian" />
                        <label htmlFor="vegetarian" className="text-sm font-medium cursor-pointer flex-1">
                          Vegetarian
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="vegan" id="vegan" />
                        <label htmlFor="vegan" className="text-sm font-medium cursor-pointer flex-1">
                          Vegan
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="gluten-free" id="gluten-free" />
                        <label htmlFor="gluten-free" className="text-sm font-medium cursor-pointer flex-1">
                          Gluten-free
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="dairy-free" id="dairy-free" />
                        <label htmlFor="dairy-free" className="text-sm font-medium cursor-pointer flex-1">
                          Dairy-free
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="other" id="other" />
                        <label htmlFor="other" className="text-sm font-medium cursor-pointer flex-1">
                          Other
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold">Nutrition Goals</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-3">
                      What are your main nutrition goals?
                    </label>
                    <RadioGroup 
                      value={formData.nutritionGoals}
                      onValueChange={(value) => handleRadioChange('nutritionGoals', value)}
                      className="grid grid-cols-1 gap-3"
                    >
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="healthy-pregnancy" id="healthy-pregnancy" />
                        <label htmlFor="healthy-pregnancy" className="text-sm font-medium cursor-pointer flex-1">
                          Maintaining a healthy pregnancy
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="control-weight" id="control-weight" />
                        <label htmlFor="control-weight" className="text-sm font-medium cursor-pointer flex-1">
                          Managing weight gain during pregnancy
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="manage-conditions" id="manage-conditions" />
                        <label htmlFor="manage-conditions" className="text-sm font-medium cursor-pointer flex-1">
                          Managing pregnancy-related conditions
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="postpartum-recovery" id="postpartum-recovery" />
                        <label htmlFor="postpartum-recovery" className="text-sm font-medium cursor-pointer flex-1">
                          Postpartum recovery and breastfeeding support
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="overall-health" id="overall-health" />
                        <label htmlFor="overall-health" className="text-sm font-medium cursor-pointer flex-1">
                          Overall health and wellbeing
                        </label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              </div>
            )}
            
            <div className="mt-8 flex justify-between">
              {currentStep > 1 ? (
                <Button 
                  variant="outline" 
                  onClick={prevStep}
                >
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              
              {currentStep < totalSteps ? (
                <Button 
                  onClick={nextStep}
                  className="ml-auto"
                >
                  Next <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  className="ml-auto"
                >
                  Complete Survey
                </Button>
              )}
            </div>
          </div>
          
          <div className="text-center mt-4 text-sm text-muted-foreground flex items-center justify-center">
            <HelpCircle className="h-4 w-4 mr-1" />
            Your answers help us personalize your nutrition recommendations
          </div>
        </div>
      </div>
    </div>
  );
};

export default MotherSurvey;
