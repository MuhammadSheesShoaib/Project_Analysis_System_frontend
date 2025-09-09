import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { FileText, TrendingUp, Target, Lightbulb, CheckCircle } from 'lucide-react';

interface StructuredReportProps {
  report: {
    project_feasibility: string;
    complexity_score: number;
    success_probability: string;
  };
}

export function StructuredReport({ report }: StructuredReportProps) {
  const getScoreConfig = (score: number) => {
    if (score <= 3) {
      return {
        color: 'text-green-600',
        bgColor: 'bg-green-100',
        label: 'Low Complexity',
        gradient: 'from-green-500 to-emerald-500'
      };
    }
    if (score <= 6) {
      return {
        color: 'text-amber-600',
        bgColor: 'bg-amber-100',
        label: 'Medium Complexity',
        gradient: 'from-amber-500 to-orange-500'
      };
    }
    return {
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      label: 'High Complexity',
      gradient: 'from-red-500 to-pink-500'
    };
  };

  const scoreConfig = getScoreConfig(report.complexity_score);
  
  // Parse success probability percentage
  const successPercent = parseInt(report.success_probability.replace('%', '')) || 0;

  return (
    <Card className="shadow-lg border border-gray-100 rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4">
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-4 w-4" />
          <span className="text-lg">Project Summary</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 space-y-3">
        {/* Project Feasibility */}
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <div className="flex items-start gap-2">
            <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-800 mb-1">Feasibility</h4>
              <p className="text-xs text-gray-700">{report.project_feasibility}</p>
            </div>
          </div>
        </div>

        {/* Complexity Score */}
        <div className="bg-purple-50 rounded-lg p-3 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-semibold text-gray-800">Complexity</span>
            </div>
            <Badge className={`bg-gradient-to-r ${scoreConfig.gradient} text-white px-2 py-1 text-xs rounded`}>
              {report.complexity_score}/10
            </Badge>
          </div>
          <Progress 
            value={report.complexity_score * 10} 
            className="w-full h-2"
          />
          <div className="text-xs text-gray-600 mt-1">{scoreConfig.label}</div>
        </div>

        {/* Success Probability */}
        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span className="text-sm font-semibold text-gray-800">Success Rate</span>
            </div>
            <Badge className="bg-gradient-to-r from-green-500 to-green-600 text-white px-2 py-1 text-xs rounded">
              {report.success_probability}
            </Badge>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${successPercent}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}