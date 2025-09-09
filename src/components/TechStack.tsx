import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Code, Monitor, Server, Brain, Database, Cloud } from 'lucide-react';

interface TechStackProps {
  techStack: {
    frontend: string[];
    backend: string[];
    ai_ml: string[];
    database: string[];
    cloud_devops: string[];
  };
}

export function TechStack({ techStack }: TechStackProps) {
  const categories = [
    { 
      name: 'Frontend', 
      technologies: techStack.frontend, 
      icon: Monitor,
      gradient: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      badgeClass: 'bg-blue-100 text-blue-800 border-blue-200'
    },
    { 
      name: 'Backend', 
      technologies: techStack.backend, 
      icon: Server,
      gradient: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      badgeClass: 'bg-green-100 text-green-800 border-green-200'
    },
    { 
      name: 'AI/ML', 
      technologies: techStack.ai_ml, 
      icon: Brain,
      gradient: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      badgeClass: 'bg-purple-100 text-purple-800 border-purple-200'
    },
    { 
      name: 'Database', 
      technologies: techStack.database, 
      icon: Database,
      gradient: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      badgeClass: 'bg-orange-100 text-orange-800 border-orange-200'
    },
    { 
      name: 'Cloud/DevOps', 
      technologies: techStack.cloud_devops, 
      icon: Cloud,
      gradient: 'from-gray-500 to-slate-500',
      bgColor: 'bg-gray-50',
      textColor: 'text-gray-700',
      badgeClass: 'bg-gray-100 text-gray-800 border-gray-200'
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {categories.map((category) => (
          category.technologies.length > 0 && (
            <Card key={category.name} className="shadow-lg border border-gray-100 rounded-lg overflow-hidden">
              <CardHeader className={`bg-gradient-to-r ${category.gradient} text-white p-3`}>
                <CardTitle className="flex items-center gap-2">
                  <category.icon className="h-4 w-4" />
                  <span className="text-sm">{category.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3">
                <div className="flex flex-wrap gap-2">
                  {category.technologies.map((tech, index) => (
                    <Badge 
                      key={index} 
                      className={`${category.badgeClass} px-2 py-1 text-xs rounded border`}
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        ))}
      </div>
    </div>
  );
}