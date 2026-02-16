export interface Recommendations {
  version: string;
  lastUpdated: string;
  totalRecommendations: number;
  recommendations: Record<string, Recommendation>;
}

export interface Recommendation {
  id: string;
  title: string;
  path: string[];
  pathDescription: string;
  process: ProcessInfo;
  methodology: MethodologyInfo;
  modeling: ModelingInfo;
  architecture: ArchitectureInfo;
  timeline: TimelineWeek[];
  avoid: string[];
  templates: string[];
  chapters: number[];
  warning?: string;
}

export interface ProcessInfo {
  name: string;
  chapter: number;
  why: string[];
  how: string[];
}

export interface MethodologyInfo {
  name: string;
  chapter: number;
  practices: string[];
}

export interface ModelingInfo {
  level: string;
  chapter: number;
  required: string[];
  purpose: string;
}

export interface ArchitectureInfo {
  pattern: string;
  chapter: number;
  why: string;
  layers: string[];
  considerations: string[];
}

export interface TimelineWeek {
  week: string;
  phase: string;
  tasks: string[];
}
