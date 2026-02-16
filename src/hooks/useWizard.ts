'use client';

import { useState, useCallback } from 'react';
import decisionTreeData from '@/data/decision-tree.json';
import type { DecisionTree, Step } from '@/types/decision-tree';

const decisionTree = decisionTreeData as DecisionTree;

interface SelectionResult {
  finished: boolean;
  recommendationId?: string;
  path?: string[];
  nextStepId?: string;
}

export function useWizard() {
  const [currentStepId, setCurrentStepId] = useState<string>(decisionTree.rootStepId);
  const [selectedPath, setSelectedPath] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([decisionTree.rootStepId]);

  const currentStep: Step = decisionTree.steps[currentStepId];

  const selectOption = useCallback((optionId: string): SelectionResult | null => {
    const option = currentStep.options.find(opt => opt.id === optionId);
    if (!option) return null;

    const newPath = [...selectedPath, optionId];
    setSelectedPath(newPath);

    if (option.nextStepId) {
      setCurrentStepId(option.nextStepId);
      setHistory(prev => [...prev, option.nextStepId!]);
      return { finished: false, nextStepId: option.nextStepId };
    } else if (option.finalRecommendationId) {
      return {
        finished: true,
        recommendationId: option.finalRecommendationId,
        path: newPath
      };
    }

    return null;
  }, [currentStep, selectedPath]);

  const goBack = useCallback(() => {
    if (history.length <= 1) return;

    const newHistory = history.slice(0, -1);
    const previousStepId = newHistory[newHistory.length - 1];

    setHistory(newHistory);
    setCurrentStepId(previousStepId);
    setSelectedPath(prev => prev.slice(0, -1));
  }, [history]);

  const reset = useCallback(() => {
    setCurrentStepId(decisionTree.rootStepId);
    setSelectedPath([]);
    setHistory([decisionTree.rootStepId]);
  }, []);

  const progress = Math.min(Math.round((selectedPath.length / 4) * 100), 100);

  return {
    currentStep,
    selectedPath,
    selectOption,
    goBack,
    reset,
    canGoBack: history.length > 1,
    progress,
    stepNumber: selectedPath.length + 1,
  };
}
