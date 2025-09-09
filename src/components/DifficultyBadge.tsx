import React from 'react';
import { Badge } from './ui/badge';
import { Target, TrendingUp, Zap } from 'lucide-react';

interface DifficultyBadgeProps {
  level: string;
}

export function DifficultyBadge({ level }: DifficultyBadgeProps) {
  const getConfig = (level: string) => {
    const normalizedLevel = level.toLowerCase();
    if (normalizedLevel.includes('easy') || normalizedLevel.includes('low')) {
      return {
        icon: Target,
        className: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-soft hover:shadow-glow transition-smooth',
        glow: 'shadow-emerald-200'
      };
    } else if (normalizedLevel.includes('medium')) {
      return {
        icon: TrendingUp,
        className: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-soft hover:shadow-glow transition-smooth',
        glow: 'shadow-amber-200'
      };
    } else if (normalizedLevel.includes('hard') || normalizedLevel.includes('high') || normalizedLevel.includes('difficult')) {
      return {
        icon: Zap,
        className: 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-soft hover:shadow-glow transition-smooth',
        glow: 'shadow-red-200'
      };
    }
    return {
      icon: TrendingUp,
      className: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-soft hover:shadow-glow transition-smooth',
      glow: 'shadow-amber-200'
    };
  };

  const config = getConfig(level);
  const Icon = config.icon;

  return (
    <Badge className={`${config.className} px-3 py-1 text-xs font-medium rounded-md flex items-center gap-1`}>
      <Icon className="h-3 w-3" />
      {level}
    </Badge>
  );
}