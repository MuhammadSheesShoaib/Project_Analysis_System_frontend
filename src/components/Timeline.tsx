import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, CalendarDays, Timer } from 'lucide-react';

interface TimelineProps {
  timeline: {
    total_duration: string;
    phases: Array<{
      phase: string;
      duration: string;
    }>;
  };
}

export function Timeline({ timeline }: TimelineProps) {
  // Calculate relative durations for progress bars
  const totalWeeks = timeline.phases.reduce((sum, phase) => {
    const weeks = parseInt(phase.duration.split(' ')[0]) || 1;
    return sum + weeks;
  }, 0);

  return (
    <Card className="shadow-lg border border-gray-100 rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4">
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span className="text-lg">Timeline</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {/* Total Duration */}
        <div className="bg-cyan-50 rounded-lg p-3 border border-cyan-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-cyan-600" />
              <span className="text-sm font-semibold text-gray-800">Total Duration</span>
            </div>
            <Badge className="bg-gradient-cyan text-white px-2 py-1 text-xs rounded">
              {timeline.total_duration}
            </Badge>
          </div>
        </div>
        
        {/* Phase Breakdown */}
        <div className="space-y-2">
          {timeline.phases.map((phase, index) => {
            const weeks = parseInt(phase.duration.split(' ')[0]) || 1;
            const percentage = (weeks / totalWeeks) * 100;
            const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500', 'bg-orange-500'];
            
            return (
              <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{phase.phase}</span>
                  <span className="text-xs text-gray-600">{phase.duration}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${colors[index % colors.length]} transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {percentage.toFixed(0)}% of timeline
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}