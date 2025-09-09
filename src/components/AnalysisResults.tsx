import React from 'react';
import { AnalysisResponse } from '../App';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { DifficultyBadge } from './DifficultyBadge';
import { ProjectPipeline } from './ProjectPipeline';
import { TechStack } from './TechStack';
import { Timeline } from './Timeline';
import { TeamStructure } from './TeamStructure';
import { RisksList } from './RisksList';
import { CostEstimate } from './CostEstimate';
import { StructuredReport } from './StructuredReport';
import { BarChart3, Users, AlertTriangle, Code, Clock, Layers } from 'lucide-react';

interface AnalysisResultsProps {
  result: AnalysisResponse;
}

export function AnalysisResults({ result }: AnalysisResultsProps) {
  return (
    <div className="space-y-4">
      {/* Compact Results Header */}
      <div className="bg-white rounded-lg p-4 shadow-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-blue rounded-lg">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">Analysis Complete</h2>
              <p className="text-sm text-gray-600">AI insights ready</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <DifficultyBadge level={result.difficulty_level} />
            <CostEstimate estimate={result.cost_estimate} />
          </div>
        </div>
      </div>

      {/* Compact Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-white rounded-lg p-1 shadow-lg border border-gray-100 h-auto">
          <TabsTrigger 
            value="overview" 
            className="flex items-center gap-1 rounded-md py-2 px-2 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-blue-600 data-[state=active]:text-white transition-smooth"
          >
            <BarChart3 className="h-3 w-3" />
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="pipeline"
            className="flex items-center gap-1 rounded-md py-2 px-2 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-green-600 data-[state=active]:text-white transition-smooth"
          >
            <Layers className="h-3 w-3" />
            Pipeline
          </TabsTrigger>
          <TabsTrigger 
            value="tech"
            className="flex items-center gap-1 rounded-md py-2 px-2 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-purple-600 data-[state=active]:text-white transition-smooth"
          >
            <Code className="h-3 w-3" />
            Tech
          </TabsTrigger>
          <TabsTrigger 
            value="team"
            className="flex items-center gap-1 rounded-md py-2 px-2 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500 data-[state=active]:to-pink-600 data-[state=active]:text-white transition-smooth"
          >
            <Users className="h-3 w-3" />
            Team
          </TabsTrigger>
          <TabsTrigger 
            value="risks"
            className="flex items-center gap-1 rounded-md py-2 px-2 text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 data-[state=active]:text-white transition-smooth"
          >
            <AlertTriangle className="h-3 w-3" />
            Risks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4 mt-4">
          <div className="grid grid-cols-1 gap-4">
            <StructuredReport report={result.structured_report} />
            <Timeline timeline={result.timeline} />
          </div>
        </TabsContent>

        <TabsContent value="pipeline" className="mt-4">
          <ProjectPipeline pipeline={result.project_pipeline} />
        </TabsContent>

        <TabsContent value="tech" className="mt-4">
          <TechStack techStack={result.tech_stack} />
        </TabsContent>

        <TabsContent value="team" className="mt-4">
          <TeamStructure teamStructure={result.team_structure} />
        </TabsContent>

        <TabsContent value="risks" className="mt-4">
          <RisksList risks={result.risks_challenges} />
        </TabsContent>
      </Tabs>
    </div>
  );
}