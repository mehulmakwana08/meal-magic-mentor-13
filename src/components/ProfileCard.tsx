
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
        'relative overflow-hidden rounded-xl bg-white border border-border p-3 animate-fade-in card-shadow',
        'transform transition-all hover:translate-y-[-2px] active:translate-y-[0px]',
        onClick && 'cursor-pointer',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className={cn('p-1.5 rounded-full', color)}>
            <TypeIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-semibold text-base line-clamp-1">{name}</h3>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span>{label}</span>
              {age && <span>• {age}</span>}
              {stage && <span>• {stage}</span>}
            </div>
          </div>
        </div>
        
        {type === 'child' && (
          <div className="flex items-center text-amber">
            <Star className="w-3 h-3 fill-amber" />
            <Star className="w-3 h-3 fill-amber" />
            <Star className="w-3 h-3 fill-amber" />
          </div>
        )}
      </div>

      {metrics && (
        <div className="mt-3 flex items-center gap-2">
          {metrics.weight && (
            <div className="bg-muted/50 px-2 py-1 rounded-lg">
              <p className="text-xs text-muted-foreground">Weight</p>
              <p className="text-sm font-medium">{metrics.weight}</p>
            </div>
          )}
          {metrics.height && (
            <div className="bg-muted/50 px-2 py-1 rounded-lg">
              <p className="text-xs text-muted-foreground">Height</p>
              <p className="text-sm font-medium">{metrics.height}</p>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Last updated: {lastUpdated}
        </p>
        <button className="text-primary flex items-center text-xs font-medium">
          Details <ArrowRight className="ml-1 w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
