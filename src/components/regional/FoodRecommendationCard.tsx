
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Info, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FoodRecommendationCardProps {
  title: string;
  description: string;
  image: string;
  benefits: string[];
  tags: string[];
  nutritionalInfo?: {
    calories?: string;
    protein?: string;
    carbs?: string;
    fiber?: string;
    vitamins?: string[];
  };
  className?: string;
  onClick?: () => void;
}

const FoodRecommendationCard: React.FC<FoodRecommendationCardProps> = ({
  title,
  description,
  image,
  benefits,
  tags,
  nutritionalInfo,
  className,
  onClick
}) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-md",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-4">
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-medium mb-1 flex items-center">
              <Info className="w-3 h-3 mr-1" /> Health Benefits
            </h4>
            <ul className="text-xs text-muted-foreground pl-3 space-y-1">
              {benefits.map((benefit, index) => (
                <li key={index}>• {benefit}</li>
              ))}
            </ul>
          </div>
          
          {nutritionalInfo && (
            <div className="grid grid-cols-4 gap-2 mt-2">
              {nutritionalInfo.calories && (
                <div className="bg-muted/50 rounded p-1 text-center">
                  <span className="text-xs text-muted-foreground block">Calories</span>
                  <span className="text-xs font-medium">{nutritionalInfo.calories}</span>
                </div>
              )}
              {nutritionalInfo.protein && (
                <div className="bg-muted/50 rounded p-1 text-center">
                  <span className="text-xs text-muted-foreground block">Protein</span>
                  <span className="text-xs font-medium">{nutritionalInfo.protein}</span>
                </div>
              )}
              {nutritionalInfo.carbs && (
                <div className="bg-muted/50 rounded p-1 text-center">
                  <span className="text-xs text-muted-foreground block">Carbs</span>
                  <span className="text-xs font-medium">{nutritionalInfo.carbs}</span>
                </div>
              )}
              {nutritionalInfo.fiber && (
                <div className="bg-muted/50 rounded p-1 text-center">
                  <span className="text-xs text-muted-foreground block">Fiber</span>
                  <span className="text-xs font-medium">{nutritionalInfo.fiber}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="p-0 h-auto text-sm font-medium text-primary hover:bg-transparent hover:text-primary/80"
        >
          View Details <ChevronRight className="ml-1 w-3 h-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default FoodRecommendationCard;
