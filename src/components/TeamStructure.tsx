import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Users, Monitor, Server, Brain, Settings, User } from 'lucide-react';

interface TeamStructureProps {
  teamStructure: Array<{
    role: string;
    count: number;
    time_commitment: string;
    responsibilities: string[];
  }>;
}

export function TeamStructure({ teamStructure }: TeamStructureProps) {
  const getRoleConfig = (role: string) => {
    const roleKey = role.toLowerCase();
    if (roleKey.includes('frontend') || roleKey.includes('ui') || roleKey.includes('ux')) {
      return {
        icon: Monitor,
        gradient: 'from-blue-500 to-cyan-500',
        bgColor: 'bg-blue-50',
        accentColor: 'text-blue-600',
        avatar: 'bg-gradient-to-r from-blue-400 to-cyan-400'
      };
    } else if (roleKey.includes('backend') || roleKey.includes('api')) {
      return {
        icon: Server,
        gradient: 'from-green-500 to-emerald-500',
        bgColor: 'bg-green-50',
        accentColor: 'text-green-600',
        avatar: 'bg-gradient-to-r from-green-400 to-emerald-400'
      };
    } else if (roleKey.includes('ai') || roleKey.includes('ml') || roleKey.includes('data')) {
      return {
        icon: Brain,
        gradient: 'from-purple-500 to-pink-500',
        bgColor: 'bg-purple-50',
        accentColor: 'text-purple-600',
        avatar: 'bg-gradient-to-r from-purple-400 to-pink-400'
      };
    } else if (roleKey.includes('manager') || roleKey.includes('lead')) {
      return {
        icon: Settings,
        gradient: 'from-amber-500 to-orange-500',
        bgColor: 'bg-amber-50',
        accentColor: 'text-amber-600',
        avatar: 'bg-gradient-to-r from-amber-400 to-orange-400'
      };
    }
    return {
      icon: User,
      gradient: 'from-gray-500 to-slate-500',
      bgColor: 'bg-gray-50',
      accentColor: 'text-gray-600',
      avatar: 'bg-gradient-to-r from-gray-400 to-slate-400'
    };
  };

  const totalTeamSize = teamStructure.reduce((sum, member) => sum + member.count, 0);

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-3 shadow-lg border border-gray-100">
        <div className="text-center">
          <Badge className="bg-gradient-pink text-white px-3 py-1 text-sm rounded">
            {totalTeamSize} Team Members
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {teamStructure.map((member, index) => {
          const config = getRoleConfig(member.role);
          const Icon = config.icon;
          
          return (
            <Card key={index} className="shadow-lg border border-gray-100 rounded-lg overflow-hidden">
              <CardHeader className={`bg-gradient-to-r ${config.gradient} text-white p-3`}>
                <div className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  <div className="flex-1">
                    <CardTitle className="text-sm">{member.role}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs bg-white/20 rounded px-2 py-0.5">
                        {member.count} {member.count === 1 ? 'person' : 'people'}
                      </span>
                      <span className="text-xs bg-white/20 rounded px-2 py-0.5">
                        {member.time_commitment}
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-3">
                <div className="space-y-2">
                  {member.responsibilities.slice(0, 3).map((responsibility, respIndex) => (
                    <div 
                      key={respIndex} 
                      className="flex items-start gap-2 text-xs text-gray-700"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                      <span>{responsibility}</span>
                    </div>
                  ))}
                  {member.responsibilities.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{member.responsibilities.length - 3} more responsibilities
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}