
import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Filter, Check } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export type FilterOption = 'all' | 'active' | 'completed' | 'this-week' | 'last-week' | 'past-month';

interface MealPlanFilterProps {
  activeFilter: string;
  onFilterChange: (filter: FilterOption) => void;
}

const filterOptions = [
  { value: 'all', label: 'All Plans' },
  { value: 'active', label: 'Active Plans' },
  { value: 'completed', label: 'Completed Plans' },
  { value: 'this-week', label: 'This Week' },
  { value: 'last-week', label: 'Last Week' },
  { value: 'past-month', label: 'Past Month' },
];

const MealPlanFilter = ({ activeFilter, onFilterChange }: MealPlanFilterProps) => {
  const isMobile = useIsMobile();

  const FilterContent = () => (
    <div className="p-2 space-y-2">
      <h3 className="text-sm font-medium px-2 py-1.5">Filter By Status</h3>
      <div className="space-y-1">
        {filterOptions.slice(0, 3).map((option) => (
          <Button
            key={option.value}
            variant="ghost"
            className={cn(
              "w-full justify-start px-2 py-1.5 h-auto text-sm",
              activeFilter === option.value && "bg-primary/10 text-primary"
            )}
            onClick={() => onFilterChange(option.value as FilterOption)}
          >
            <span className="w-4 mr-2">
              {activeFilter === option.value && <Check className="h-4 w-4" />}
            </span>
            {option.label}
          </Button>
        ))}
      </div>
      
      <div className="px-2 py-1.5 pt-3 border-t">
        <h3 className="text-sm font-medium mb-2">Filter By Time</h3>
        <div className="space-y-1">
          {filterOptions.slice(3).map((option) => (
            <Button
              key={option.value}
              variant="ghost"
              className={cn(
                "w-full justify-start px-2 py-1.5 h-auto text-sm", 
                activeFilter === option.value && "bg-primary/10 text-primary"
              )}
              onClick={() => onFilterChange(option.value as FilterOption)}
            >
              <span className="w-4 mr-2">
                {activeFilter === option.value && <Check className="h-4 w-4" />}
              </span>
              {option.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button className="p-2 border border-border rounded-xl bg-background hover:bg-muted transition-colors">
            <Filter className="w-5 h-5 text-muted-foreground" />
          </Button>
        </SheetTrigger>
        <SheetContent side="bottom" className="px-0 py-0">
          <SheetHeader className="px-4 py-4 border-b">
            <SheetTitle className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filter Meal Plans
            </SheetTitle>
          </SheetHeader>
          <div className="px-4 py-4">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="p-2 border border-border rounded-xl bg-background hover:bg-muted transition-colors">
          <Filter className="w-5 h-5 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-56" align="end">
        <FilterContent />
      </PopoverContent>
    </Popover>
  );
};

export default MealPlanFilter;
