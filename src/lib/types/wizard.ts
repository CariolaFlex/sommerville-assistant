/**
 * WIZARD TYPES - FASE 2
 *
 * Tipos TypeScript para el wizard interactivo
 */

// Respuestas del usuario en el wizard
export interface WizardAnswers {
  [key: string]: string | undefined;
  q1?: string; // project-type
  q2?: string; // criticality
  q3?: string; // project-size
  q4?: string; // team-size
  q5?: string; // timeline
  q6?: string; // requirements-stability
  q7?: string; // risk-tolerance
  q8?: string; // regulatory-compliance
  q9?: string; // team-experience
  q10?: string; // budget
}

// Estado completo del wizard
export interface WizardState {
  currentStep: number;
  totalSteps: number;
  answers: WizardAnswers;
  recommendationId: string | null;
  isComplete: boolean;
  visitedSteps: Set<number>;
}

// Acciones para modificar el estado del wizard
export type WizardAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREVIOUS_STEP' }
  | { type: 'GO_TO_STEP'; payload: number }
  | { type: 'SET_ANSWER'; payload: { questionId: string; value: string } }
  | { type: 'SET_RECOMMENDATION'; payload: string }
  | { type: 'COMPLETE_WIZARD' }
  | { type: 'RESET_WIZARD' };

// Metadata de una pregunta del wizard
export interface QuestionOption {
  value: string;
  label: string;
  description: string;
  icon: string; // Lucide icon name
}

export interface Question {
  id: string;
  text: string;
  type: 'single-choice' | 'multi-choice';
  category: string;
  helpText: string;
  options: QuestionOption[];
}

// Resultado del scoring
export interface RecommendationScore {
  id: string;
  title: string;
  score: number;
}
