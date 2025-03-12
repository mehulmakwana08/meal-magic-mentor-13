
import React from 'react';
import { Baby, Calendar, Heart, Star, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ProfileType = 'child' | 'pregnant' | 'lactating';

interface ProfileCardProps {
  name: string;
  type: ProfileType;
  age?: string;
  stage?: string;
  lastUpdated: string;
  metrics?: {
    weight?: string;
    height?: string;
  };
  onClick?: () => void;
  className?: string;
}

const ProfileCard = ({
  name,
  type,
  age,
  stage,
  lastUpdated,
  metrics,
  onClick,
  className,
}: ProfileCardProps) => {
  const typeConfig = {
    child: {
      icon: Baby,
      color: 'bg-teal-light border-teal text-teal-dark',
      label: 'Child',
    },
    pregnant: {
      icon: Calendar,
      color: 'bg-rose-light border-rose text-rose-dark',
      label: 'Pregnant',
    },
    lactating: {
      icon: Heart,
      color: 'bg-purple-light border-purple text-purple-dark',
      label: 'Lactating',
    },
  };

  const { icon: TypeIcon, color, label } = typeConfig[type];

  return (
    <div
      onClick={onClick}
      className={cn(
        'relative overflow-hidden rounded-xl bg-white border border-border p-4 animate-fade-in card-shadow',
        'transform transition-all hover:translate-y-[-2px] active:translate-y-[0px]',
        onClick && 'cursor-pointer',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className={cn('p-2 rounded-full', color)}>
            <TypeIcon className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span>{label}</span>
              {age && <span>• {age}</span>}
              {stage && <span>• {stage}</span>}
            </div>
          </div>
        </div>
        
        {type === 'child' && (
          <div className="flex items-center text-amber">
            <Star className="w-4 h-4 fill-amber" />
            <Star className="w-4 h-4 fill-amber" />
            <Star className="w-4 h-4 fill-amber" />
          </div>
        )}
      </div>

      {metrics && (
        <div className="mt-4 flex items-center gap-4">
          {metrics.weight && (
            <div className="bg-muted/50 px-3 py-1.5 rounded-lg">
              <p className="text-xs text-muted-foreground">Weight</p>
              <p className="font-medium">{metrics.weight}</p>
            </div>
          )}
          {metrics.height && (
            <div className="bg-muted/50 px-3 py-1.5 rounded-lg">
              <p className="text-xs text-muted-foreground">Height</p>
              <p className="font-medium">{metrics.height}</p>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-4 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Last updated: {lastUpdated}
        </p>
        <button className="text-primary flex items-center text-sm font-medium">
          View details <ArrowRight className="ml-1 w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
