import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Alert, AlertDescription } from './ui/alert';
import { Loader2, FileText, Sparkles } from 'lucide-react';

interface ProjectInputProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
  error: string | null;
}

export function ProjectInput({ value, onChange, onAnalyze, isLoading, error }: ProjectInputProps) {
  return (
    <div className="space-y-4 h-full flex flex-col">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Project Description
        </label>
        <div className="relative">
          <Textarea
            placeholder="Describe your project in detail... Include goals, features, target audience, and requirements for the most accurate AI analysis."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-40 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-smooth resize-none text-sm p-3"
            disabled={isLoading}
          />
          {value.length > 0 && (
            <div className="absolute bottom-2 right-2 text-xs text-gray-400 bg-white px-2 py-1 rounded-md shadow-sm">
              {value.length} chars
            </div>
          )}
        </div>
      </div>
      
      {error && (
        <Alert variant="destructive" className="rounded-lg border-red-200 bg-red-50 py-2">
          <AlertDescription className="text-red-700 text-sm">{error}</AlertDescription>
        </Alert>
      )}
      
      <Button 
        onClick={onAnalyze} 
        disabled={isLoading || !value.trim()}
        className="w-full h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold transition-smooth disabled:opacity-50 disabled:from-gray-400 disabled:to-gray-500 shadow-lg hover:shadow-xl border-0"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Analyzing...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Analyze Project
          </>
        )}
      </Button>
      
      {!isLoading && value.trim() && (
        <div className="text-xs text-gray-500 text-center">
          ⚡ Analysis takes ~5 seconds
        </div>
      )}
    </div>
  );
}