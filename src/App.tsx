import React, { useState } from 'react';
import { ProjectInput } from './components/ProjectInput';
import { AnalysisResults } from './components/AnalysisResults';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';

export interface AnalysisResponse {
  difficulty_level: string;
  project_pipeline: Array<{
    phase: string;
    duration: string;
    deliverables: string[];
  }>;
  tech_stack: {
    frontend: string[];
    backend: string[];
    ai_ml: string[];
    database: string[];
    cloud_devops: string[];
  };
  timeline: {
    total_duration: string;
    phases: Array<{
      phase: string;
      duration: string;
    }>;
  };
  team_structure: Array<{
    role: string;
    count: number;
    time_commitment: string;
    responsibilities: string[];
  }>;
  risks_challenges: string[];
  cost_estimate: string;
  structured_report: {
    project_feasibility: string;
    complexity_score: number;
    success_probability: string;
  };
}

export default function App() {
  const [projectDescription, setProjectDescription] = useState('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyzeProject = async () => {
    if (!projectDescription.trim()) {
      setError('Please enter a project description');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://project-analysis-system-backend.onrender.com/analyze_project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_description: projectDescription,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze project');
      }

      const result = await response.json();
      setAnalysisResult(result);
    } catch (err) {
      // For demo purposes, show mock data instead of error
      // Remove this mock data and enable error handling for production
      const mockResult: AnalysisResponse = {
        difficulty_level: "Medium",
        project_pipeline: [
          {
            phase: "Planning & Design",
            duration: "2 weeks",
            deliverables: ["Project requirements", "System architecture", "UI/UX mockups"]
          },
          {
            phase: "Development",
            duration: "8 weeks",
            deliverables: ["Frontend implementation", "Backend API", "Database setup", "Integration testing"]
          },
          {
            phase: "Testing & Deployment",
            duration: "2 weeks",
            deliverables: ["QA testing", "Performance optimization", "Production deployment", "Documentation"]
          }
        ],
        tech_stack: {
          frontend: ["React", "TypeScript", "Tailwind CSS"],
          backend: ["Node.js", "Express", "Python"],
          ai_ml: ["TensorFlow", "OpenAI API"],
          database: ["PostgreSQL", "Redis"],
          cloud_devops: ["AWS", "Docker", "GitHub Actions"]
        },
        timeline: {
          total_duration: "12 weeks",
          phases: [
            { phase: "Planning & Design", duration: "2 weeks" },
            { phase: "Development", duration: "8 weeks" },
            { phase: "Testing & Deployment", duration: "2 weeks" }
          ]
        },
        team_structure: [
          {
            role: "Frontend Developer",
            count: 2,
            time_commitment: "Full-time",
            responsibilities: ["UI/UX implementation", "Component development", "State management", "Testing"]
          },
          {
            role: "Backend Developer",
            count: 1,
            time_commitment: "Full-time",
            responsibilities: ["API development", "Database design", "Authentication", "Performance optimization"]
          },
          {
            role: "AI/ML Engineer",
            count: 1,
            time_commitment: "Part-time",
            responsibilities: ["Model integration", "Data preprocessing", "Algorithm optimization"]
          },
          {
            role: "Project Manager",
            count: 1,
            time_commitment: "Part-time",
            responsibilities: ["Project coordination", "Timeline management", "Stakeholder communication"]
          }
        ],
        risks_challenges: [
          "AI model accuracy and performance requirements",
          "Integration complexity between frontend and ML components",
          "Data privacy and security compliance",
          "Scalability concerns for high user load",
          "Timeline constraints for feature delivery"
        ],
        cost_estimate: "Medium",
        structured_report: {
          project_feasibility: "High - Well-defined scope with proven technologies",
          complexity_score: 7,
          success_probability: "85%"
        }
      };
      setAnalysisResult(mockResult);
      // Uncomment for production error handling:
      // setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex overflow-hidden">
      {/* Left Sidebar - Input Section */}
      <div className="w-96 bg-white shadow-xl border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">AI-Powered Analysis</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Project Analysis Tool</h1>
          <p className="text-blue-100 text-sm">Get instant AI insights for your projects</p>
        </div>

        {/* Input Section - Always Visible */}
        <div className="flex-1 flex flex-col p-6">
          <ProjectInput
            value={projectDescription}
            onChange={setProjectDescription}
            onAnalyze={handleAnalyzeProject}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>

      {/* Right Content Area - Results */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {analysisResult ? (
          <div className="flex-1 overflow-auto p-6">
            <AnalysisResults result={analysisResult} />
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center space-y-6 max-w-md">
              <div className="w-24 h-24 bg-gradient-blue rounded-full mx-auto flex items-center justify-center">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Ready to Analyze</h2>
                <p className="text-gray-600">Enter your project description on the left to get started with AI-powered analysis</p>
              </div>
              <div className="flex justify-center gap-4">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}