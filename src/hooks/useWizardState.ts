/**
 * WIZARD STATE HOOK - FASE 2
 *
 * Hook personalizado para manejar el estado del wizard interactivo
 */

'use client';

import { useReducer, useCallback, useEffect } from 'react';
import { WizardState, WizardAction } from '@/lib/types/wizard';
import { wizardQuestions } from '@/lib/wizard/questions';

// Estado inicial del wizard
const initialState: WizardState = {
  currentStep: 0,
  totalSteps: wizardQuestions.length,
  answers: {},
  recommendationId: null,
  isComplete: false,
  visitedSteps: new Set([0]),
};

// Reducer para manejar las acciones del wizard
function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case 'NEXT_STEP':
      if (state.currentStep < state.totalSteps - 1) {
        const nextStep = state.currentStep + 1;
        const newVisited = new Set(state.visitedSteps);
        newVisited.add(nextStep);
        return {
          ...state,
          currentStep: nextStep,
          visitedSteps: newVisited,
        };
      }
      return state;

    case 'PREVIOUS_STEP':
      if (state.currentStep > 0) {
        return {
          ...state,
          currentStep: state.currentStep - 1,
        };
      }
      return state;

    case 'GO_TO_STEP':
      if (action.payload >= 0 && action.payload < state.totalSteps) {
        return {
          ...state,
          currentStep: action.payload,
        };
      }
      return state;

    case 'SET_ANSWER':
      return {
        ...state,
        answers: {
          ...state.answers,
          [action.payload.questionId]: action.payload.value,
        },
      };

    case 'SET_RECOMMENDATION':
      return {
        ...state,
        recommendationId: action.payload,
      };

    case 'COMPLETE_WIZARD':
      return {
        ...state,
        isComplete: true,
      };

    case 'RESET_WIZARD':
      return {
        ...initialState,
        visitedSteps: new Set([0]),
      };

    default:
      return state;
  }
}

// Hook personalizado
export function useWizardState() {
  const [state, dispatch] = useReducer(wizardReducer, initialState);

  // Cargar estado desde localStorage al montar (opcional)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedState = localStorage.getItem('wizard-state');
      if (savedState) {
        try {
          const parsed = JSON.parse(savedState);
          // Restaurar respuestas
          Object.entries(parsed.answers || {}).forEach(([key, value]) => {
            dispatch({
              type: 'SET_ANSWER',
              payload: { questionId: key, value: value as string },
            });
          });
          // Restaurar paso actual
          if (parsed.currentStep) {
            dispatch({ type: 'GO_TO_STEP', payload: parsed.currentStep });
          }
        } catch (error) {
          console.error('Error loading wizard state:', error);
        }
      }
    }
  }, []);

  // Guardar estado en localStorage cuando cambie (opcional)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stateToSave = {
        currentStep: state.currentStep,
        answers: state.answers,
      };
      localStorage.setItem('wizard-state', JSON.stringify(stateToSave));
    }
  }, [state.currentStep, state.answers]);

  // Funciones helper
  const nextStep = useCallback(() => {
    dispatch({ type: 'NEXT_STEP' });
  }, []);

  const previousStep = useCallback(() => {
    dispatch({ type: 'PREVIOUS_STEP' });
  }, []);

  const goToStep = useCallback((step: number) => {
    dispatch({ type: 'GO_TO_STEP', payload: step });
  }, []);

  const setAnswer = useCallback((questionId: string, value: string) => {
    dispatch({ type: 'SET_ANSWER', payload: { questionId, value } });
  }, []);

  const setRecommendation = useCallback((recommendationId: string) => {
    dispatch({ type: 'SET_RECOMMENDATION', payload: recommendationId });
  }, []);

  const completeWizard = useCallback(() => {
    dispatch({ type: 'COMPLETE_WIZARD' });
  }, []);

  const resetWizard = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('wizard-state');
    }
    dispatch({ type: 'RESET_WIZARD' });
  }, []);

  // Helpers de validación
  const isStepAnswered = useCallback(
    (stepIndex: number): boolean => {
      const question = wizardQuestions[stepIndex];
      return !!state.answers[question.id];
    },
    [state.answers]
  );

  const canGoNext = useCallback((): boolean => {
    const currentQuestion = wizardQuestions[state.currentStep];
    return !!state.answers[currentQuestion.id];
  }, [state.currentStep, state.answers]);

  const canGoPrevious = useCallback((): boolean => {
    return state.currentStep > 0;
  }, [state.currentStep]);

  const getProgress = useCallback((): number => {
    const answeredCount = Object.keys(state.answers).length;
    return Math.round((answeredCount / state.totalSteps) * 100);
  }, [state.answers, state.totalSteps]);

  const getCurrentQuestion = useCallback(() => {
    return wizardQuestions[state.currentStep];
  }, [state.currentStep]);

  return {
    // Estado
    state,
    currentStep: state.currentStep,
    totalSteps: state.totalSteps,
    answers: state.answers,
    recommendationId: state.recommendationId,
    isComplete: state.isComplete,
    visitedSteps: state.visitedSteps,

    // Acciones
    nextStep,
    previousStep,
    goToStep,
    setAnswer,
    setRecommendation,
    completeWizard,
    resetWizard,

    // Helpers
    isStepAnswered,
    canGoNext,
    canGoPrevious,
    getProgress,
    getCurrentQuestion,
  };
}
