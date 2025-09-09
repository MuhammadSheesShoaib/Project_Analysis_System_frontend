import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AlertTriangle, Shield, Info, Zap } from 'lucide-react';

interface RisksListProps {
  risks: string[];
}

export function RisksList({ risks }: RisksListProps) {
  const getRiskLevel = (risk: string, index: number) => {
    // Simple heuristic to assign risk levels
    const riskLower = risk.toLowerCase();
    if (riskLower.includes('critical') || riskLower.includes('security') || riskLower.includes('compliance')) {
      return 'high';
    } else if (riskLower.includes('performance') || riskLower.includes('scalability') || riskLower.includes('timeline')) {
      return 'medium';
    }
    return index % 3 === 0 ? 'high' : index % 2 === 0 ? 'medium' : 'low';
  };

  const getRiskConfig = (level: string) => {
    switch (level) {
      case 'high':
        return {
          icon: AlertTriangle,
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-800',
          iconColor: 'text-red-600',
          badgeClass: 'bg-gradient-to-r from-red-500 to-pink-500 text-white',
          label: 'High Risk'
        };
      case 'medium':
        return {
          icon: Zap,
          bgColor: 'bg-amber-50',
          borderColor: 'border-amber-200',
          textColor: 'text-amber-800',
          iconColor: 'text-amber-600',
          badgeClass: 'bg-gradient-amber text-white',
          label: 'Medium Risk'
        };
      default:
        return {
          icon: Info,
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          textColor: 'text-blue-800',
          iconColor: 'text-blue-600',
          badgeClass: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
          label: 'Low Risk'
        };
    }
  };

  return (
    <div className="space-y-4">
      <Card className="shadow-lg border border-gray-100 rounded-lg overflow-hidden">
        <CardHeader className="bg-gradient-orange text-white p-3">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span className="text-sm">Risk Assessment</span>
            </div>
            <span className="text-xs bg-white/20 rounded px-2 py-1">
              {risks.length} risks
            </span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-3">
          <div className="space-y-3">
            {risks.map((risk, index) => {
              const level = getRiskLevel(risk, index);
              const config = getRiskConfig(level);
              const Icon = config.icon;
              
              return (
                <div 
                  key={index} 
                  className={`flex items-start gap-3 p-3 rounded-lg ${config.bgColor} border ${config.borderColor}`}
                >
                  <Icon className={`h-4 w-4 ${config.iconColor} mt-0.5 flex-shrink-0`} />
                  <div className="flex-1">
                    <p className={`${config.textColor} text-sm leading-relaxed`}>{risk}</p>
                  </div>
                  <span className={`${config.badgeClass} px-2 py-1 rounded text-xs font-medium flex-shrink-0`}>
                    {config.label.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 text-sm text-blue-700">
              <Shield className="h-4 w-4" />
              <span className="font-medium">Regular monitoring recommended</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}