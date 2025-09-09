import React from 'react';
import { Badge } from './ui/badge';
import { DollarSign, TrendingDown, TrendingUp } from 'lucide-react';

interface CostEstimateProps {
  estimate: string;
}

export function CostEstimate({ estimate }: CostEstimateProps) {
  const getConfig = (estimate: string) => {
    const normalizedEstimate = estimate.toLowerCase();
    if (normalizedEstimate.includes('low')) {
      return {
        icon: TrendingDown,
        className: 'bg-gradient-to-r from-emerald-500 to-green-500 text-white shadow-soft hover:shadow-glow transition-smooth',
        prefix: 'Low Cost'
      };
    } else if (normalizedEstimate.includes('medium')) {
      return {
        icon: DollarSign,
        className: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-soft hover:shadow-glow transition-smooth',
        prefix: 'Medium Cost'
      };
    } else if (normalizedEstimate.includes('high')) {
      return {
        icon: TrendingUp,
        className: 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-soft hover:shadow-glow transition-smooth',
        prefix: 'High Cost'
      };
    }
    return {
      icon: DollarSign,
      className: 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-soft hover:shadow-glow transition-smooth',
      prefix: 'Medium Cost'
    };
  };

  const config = getConfig(estimate);
  const Icon = config.icon;

  return (
    <Badge className={`${config.className} px-3 py-1 text-xs font-medium rounded-md flex items-center gap-1`}>
      <Icon className="h-3 w-3" />
      {config.prefix}
    </Badge>
  );
}