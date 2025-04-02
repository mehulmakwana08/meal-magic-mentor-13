
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface SettingItemProps { 
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
  badge?: string;
}

export const SettingItem = ({ 
  title, 
  description, 
  icon, 
  onClick,
  badge
}: SettingItemProps) => {
  return (
    <div 
      className={cn(
        "flex items-center justify-between",
        onClick ? 'cursor-pointer hover:bg-muted/50 dark:hover:bg-gray-800/50 -mx-2 px-2 py-1 rounded-lg transition-colors' : ''
      )}
      onClick={onClick}
    >
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <Label className="text-base cursor-pointer dark:text-white">{title}</Label>
          {badge && (
            <Badge variant="outline" className="text-xs font-normal dark:border-gray-700">
              {badge}
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground dark:text-gray-400">{description}</p>
      </div>
      <div className="flex-shrink-0">
        {icon}
      </div>
    </div>
  );
};
