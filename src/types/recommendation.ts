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
  description: string;
  origin: {
    creator: string;
    year: number;
    context: string;
  };
  principles: string[];
  differentiators: string[];
  references: {
    chapter: string;
    sections: string[];
    externalResources: string[];
  };
}

export interface ModelingInfo {
  notations: {
    name: string;
    description: string;
    diagrams: string[];
    whenToUse: string;
    tools: string[];
  }[];
  primaryFocus: string;
  references: {
    chapter: string | number;
    sections: string[];
  };
}

export interface ArchitectureInfo {
  patterns: {
    name: string;
    description: string;
    advantages: string[];
    disadvantages: string[];
    whenToUse: string;
    tradeoffs: string;
  }[];
  style: string;
  qualityAttributes: {
    scalability: string;
    maintainability: string;
    performance: string;
    security: string;
  };
  references: {
    chapter: string | number;
    sections: string[];
  };
}

export interface TimelineWeek {
  week: string;
  phase: string;
  tasks: string[];
}
