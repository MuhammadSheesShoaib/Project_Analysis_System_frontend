import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { CheckCircle2, Layers, Clock } from 'lucide-react';

interface ProjectPipelineProps {
  pipeline: Array<{
    phase: string;
    duration: string;
    deliverables: string[];
  }>;
}

export function ProjectPipeline({ pipeline }: ProjectPipelineProps) {
  return (
    <div className="space-y-4">
      {pipeline.map((phase, index) => {
        const gradientClasses = [
          'bg-gradient-to-r from-blue-500 to-blue-600',
          'bg-gradient-to-r from-green-500 to-green-600', 
          'bg-gradient-to-r from-purple-500 to-purple-600',
          'bg-gradient-to-r from-orange-500 to-orange-600'
        ];
        const bgColors = ['bg-blue-50', 'bg-green-50', 'bg-purple-50', 'bg-orange-50'];
        
        return (
          <Card key={index} className="shadow-lg border border-gray-100 rounded-lg overflow-hidden">
            <CardHeader className={`${gradientClasses[index % gradientClasses.length]} text-white p-3`}>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6 rounded bg-white/20 text-white">
                    <span className="text-sm font-bold">{index + 1}</span>
                  </div>
                  <span className="text-sm">{phase.phase}</span>
                </CardTitle>
                <div className="flex items-center gap-1 text-xs bg-white/20 rounded px-2 py-1">
                  <Clock className="h-3 w-3" />
                  {phase.duration}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className={`p-3 ${bgColors[index % bgColors.length]}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {phase.deliverables.map((deliverable, deliverableIndex) => (
                  <div 
                    key={deliverableIndex} 
                    className="flex items-center gap-2 p-2 bg-white rounded border border-gray-200 text-xs"
                  >
                    <CheckCircle2 className="h-3 w-3 text-green-600 flex-shrink-0" />
                    <span className="text-gray-700">{deliverable}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}