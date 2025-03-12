
import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface AnimatedButtonProps {
  children: React.ReactNode;
  icon?: LucideIcon;
  color?: 'primary' | 'secondary' | 'accent' | 'teal' | 'amber' | 'rose' | 'purple';
  onClick?: () => void;
  className?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const AnimatedButton = ({
  children,
  icon: Icon,
  color = 'primary',
  onClick,
  className,
  fullWidth = false,
  size = 'md',
}: AnimatedButtonProps) => {
  const colorVariants = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/90',
    accent: 'bg-accent text-accent-foreground hover:bg-accent/90',
    teal: 'bg-teal text-white hover:bg-teal-dark',
    amber: 'bg-amber text-gray-800 hover:bg-amber-dark',
    rose: 'bg-rose text-white hover:bg-rose-dark',
    purple: 'bg-purple text-white hover:bg-purple-dark',
  };
  
  const sizeVariants = {
    sm: 'text-sm py-1.5 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-5',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center justify-center gap-2 font-medium rounded-xl transition-all',
        'transform active:scale-[0.98] animate-float',
        'card-shadow hover:translate-y-[-2px]',
        colorVariants[color],
        sizeVariants[size],
        fullWidth && 'w-full',
        className
      )}
    >
      {Icon && <Icon className={cn(
        size === 'sm' && 'w-4 h-4',
        size === 'md' && 'w-5 h-5',
        size === 'lg' && 'w-6 h-6'
      )} />}
      {children}
    </button>
  );
};

export default AnimatedButton;
