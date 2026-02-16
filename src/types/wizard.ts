export interface WizardStep {
  id: string;
  title: string;
  description: string;
  type: 'single-choice' | 'multi-choice' | 'text-input' | 'summary';
}

export interface WizardOption {
  id: string;
  label: string;
  description: string;
  icon?: string;
  nextStep?: string;
  resultPath?: string;
}

export interface WizardState {
  currentStep: number;
  answers: Record<string, string | string[]>;
  systemType?: string;
  characteristics: string[];
  path: string[];
}

export interface DecisionNode {
  id: string;
  question: string;
  description: string;
  options: WizardOption[];
  chapter: number;
}

export interface DecisionTree {
  version: string;
  rootNode: string;
  nodes: Record<string, DecisionNode>;
}
