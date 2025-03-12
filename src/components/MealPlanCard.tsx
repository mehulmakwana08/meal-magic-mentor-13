
import React from 'react';
import { Calendar, CheckCircle, Share2, Download, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MealPlanCardProps {
  title: string;
  beneficiary: string;
  period: string;
  completionRate: number;
  image: string;
  onClick?: () => void;
  className?: string;
}

const MealPlanCard = ({
  title,
  beneficiary,
  period,
  completionRate,
  image,
  onClick,
  className,
}: MealPlanCardProps) => {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative overflow-hidden rounded-xl bg-white border border-border animate-fade-in card-shadow',
        'transform transition-all hover:translate-y-[-2px] active:translate-y-[0px]',
        onClick && 'cursor-pointer',
        className
      )}
    >
      <div className="h-32 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <span className="flex items-center text-sm font-medium text-primary">
            <Calendar className="mr-1 w-4 h-4" />
            {period}
          </span>
        </div>
        
        <p className="text-sm text-muted-foreground mt-1">For: {beneficiary}</p>
        
        <div className="mt-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-medium">Completion</span>
            <span className="text-xs font-medium flex items-center">
              <CheckCircle className="mr-1 w-3 h-3 text-teal" />
              {completionRate}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-1.5">
            <div 
              className="bg-teal h-1.5 rounded-full" 
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
          <div className="flex space-x-2">
            <button className="p-1.5 rounded-full hover:bg-muted transition-colors">
              <Share2 className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="p-1.5 rounded-full hover:bg-muted transition-colors">
              <Download className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          
          <button className="text-primary flex items-center text-sm font-medium">
            View plan <ChevronRight className="ml-1 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MealPlanCard;
