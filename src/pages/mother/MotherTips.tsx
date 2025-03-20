
import React, { useState } from 'react';
import { Search, Bookmark, BookmarkCheck, Lightbulb } from 'lucide-react';
import Header from '@/components/Header';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const MotherTips = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [savedTips, setSavedTips] = useState<number[]>([2, 5]);
  
  // Sample data - in a real app this would come from an API
  const categories = [
    { id: 'all', name: 'All' },
    { id: 'nutrition', name: 'Nutrition' },
    { id: 'exercise', name: 'Exercise' },
    { id: 'rest', name: 'Rest & Sleep' },
    { id: 'mental', name: 'Mental Health' },
  ];
  
  const tips = [
    {
      id: 1,
      title: "Iron-Rich Foods for Pregnancy",
      description: "Include foods like spinach, lentils, beans, and fortified cereals in your diet to boost iron levels during pregnancy.",
      category: "nutrition",
      tags: ["iron", "pregnancy", "food"],
      image: "https://placehold.co/600x400/cfe9fa/1a3c5b",
    },
    {
      id: 2,
      title: "Safe Exercises During Pregnancy",
      description: "Walking, swimming, and prenatal yoga are excellent low-impact exercises that can help maintain fitness during pregnancy.",
      category: "exercise",
      tags: ["exercise", "pregnancy", "fitness"],
      image: "https://placehold.co/600x400/efd2e9/411535",
    },
    {
      id: 3,
      title: "Foods to Avoid While Pregnant",
      description: "Avoid raw seafood, unpasteurized dairy, deli meats, and excessive caffeine during pregnancy to protect your baby's health.",
      category: "nutrition",
      tags: ["pregnancy", "food safety", "nutrition"],
      image: "https://placehold.co/600x400/d2f1e1/0c3d22",
    },
    {
      id: 4,
      title: "Managing Sleep During Third Trimester",
      description: "Use pillows to support your back and belly, and try sleeping on your left side to improve blood flow to your baby.",
      category: "rest",
      tags: ["sleep", "third trimester", "comfort"],
      image: "https://placehold.co/600x400/f1e3d2/3d280c",
    },
    {
      id: 5,
      title: "Calcium-Rich Alternatives to Dairy",
      description: "If you're lactose intolerant, try calcium-rich foods like fortified plant milks, tofu, almonds, and leafy greens.",
      category: "nutrition",
      tags: ["calcium", "dairy-free", "nutrition"],
      image: "https://placehold.co/600x400/d2e3f1/0c1e3d",
    },
    {
      id: 6,
      title: "Stress Management Techniques",
      description: "Practice deep breathing, meditation, and light exercise to manage stress levels during pregnancy.",
      category: "mental",
      tags: ["stress", "mental health", "relaxation"],
      image: "https://placehold.co/600x400/f0d2f1/350c3d",
    },
  ];
  
  const toggleSaved = (id: number) => {
    if (savedTips.includes(id)) {
      setSavedTips(savedTips.filter(tipId => tipId !== id));
    } else {
      setSavedTips([...savedTips, id]);
    }
  };
  
  const filteredTips = tips.filter(tip => 
    tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tip.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tip.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  return (
    <div className="min-h-screen pb-20">
      <Header title="Nutrition Tips" />
      
      <div className="px-4 py-4 sticky top-[57px] bg-white/95 backdrop-blur-sm z-10 border-b border-border">
        <div className="relative flex items-center mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tips..."
            className="pl-9 pr-4 h-10 bg-background border-border"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(category => (
            <Button
              key={category.id}
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-full text-sm whitespace-nowrap px-3 py-1 h-auto",
                category.id === 'all' ? "bg-rose-600 text-white hover:bg-rose-700" : "bg-muted hover:bg-muted/80"
              )}
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>
      
      <div className="px-4 py-4">
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="all">All Tips</TabsTrigger>
            <TabsTrigger value="saved">Saved Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all">
            <div className="space-y-4">
              {filteredTips.length > 0 ? (
                filteredTips.map(tip => (
                  <Card key={tip.id} className="overflow-hidden border-border">
                    <div className="aspect-video relative">
                      <img src={tip.image} alt={tip.title} className="w-full h-full object-cover" />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full h-8 w-8"
                        onClick={() => toggleSaved(tip.id)}
                      >
                        {savedTips.includes(tip.id) ? (
                          <BookmarkCheck className="h-5 w-5 text-rose-600" />
                        ) : (
                          <Bookmark className="h-5 w-5 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                    <div className="p-4">
                      <div className="flex items-start gap-2 mb-2">
                        <Lightbulb className="h-5 w-5 text-rose-600 mt-0.5" />
                        <h3 className="font-semibold text-lg">{tip.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-sm mb-3">{tip.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {tip.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No tips found matching your search.</p>
                  <Button 
                    variant="outline" 
                    className="mt-2"
                    onClick={() => setSearchQuery('')}
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="saved">
            <div className="space-y-4">
              {savedTips.length > 0 ? (
                tips
                  .filter(tip => savedTips.includes(tip.id))
                  .map(tip => (
                    <Card key={tip.id} className="overflow-hidden border-border">
                      <div className="aspect-video relative">
                        <img src={tip.image} alt={tip.title} className="w-full h-full object-cover" />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full h-8 w-8"
                          onClick={() => toggleSaved(tip.id)}
                        >
                          <BookmarkCheck className="h-5 w-5 text-rose-600" />
                        </Button>
                      </div>
                      <div className="p-4">
                        <div className="flex items-start gap-2 mb-2">
                          <Lightbulb className="h-5 w-5 text-rose-600 mt-0.5" />
                          <h3 className="font-semibold text-lg">{tip.title}</h3>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">{tip.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {tip.tags.map(tag => (
                            <Badge key={tag} variant="outline" className="bg-rose-50 text-rose-700 border-rose-200">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No saved tips yet.</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Bookmark tips to save them for later.
                  </p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MotherTips;
