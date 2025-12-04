export interface TopicSuggestion {
  title: string;
  description: string;
  reasoning: string;
}

export interface ScriptAnalysisResponse {
  tone: string;
  targetAudience: string;
  topics: TopicSuggestion[];
}

export enum AppStep {
  INPUT = 'INPUT',
  SELECTING = 'SELECTING',
  GENERATING = 'GENERATING',
  RESULT = 'RESULT',
}
