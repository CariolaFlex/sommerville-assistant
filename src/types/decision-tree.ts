export interface DecisionTree {
  version: string;
  metadata: {
    title: string;
    description: string;
    chapters_covered: number[];
    last_updated: string;
  };
  rootStepId: string;
  totalPaths: number;
  steps: Record<string, Step>;
  pathsIndex: PathIndex[];
}

export interface Step {
  id: string;
  type: 'root' | 'branch';
  question: string;
  description: string;
  chapter: number;
  options: Option[];
}

export interface Option {
  id: string;
  label: string;
  description: string;
  examples?: string[];
  icon?: string;
  nextStepId: string | null;
  finalRecommendationId?: string;
  characteristics?: Record<string, string | number | boolean | undefined>;
  whenToChoose?: string[];
  warning?: string;
}

export interface PathIndex {
  pathId: string;
  route: string[];
  recommendationId: string;
  summary: string;
  tags: string[];
}
