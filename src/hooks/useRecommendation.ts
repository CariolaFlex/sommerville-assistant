'use client';

import { useMemo } from 'react';
import recommendationsData from '@/data/recommendations.json';
import templatesData from '@/data/templates.json';
import checklistsData from '@/data/checklists.json';
import type { Recommendations, Recommendation } from '@/types/recommendation';
import type { TemplatesData, Template } from '@/types/templates';
import type { ChecklistsData, Checklist } from '@/types/checklists';

const recommendations = recommendationsData as unknown as Recommendations;
const templates = templatesData as unknown as TemplatesData;
const checklists = checklistsData as unknown as ChecklistsData;

interface UseRecommendationResult {
  recommendation: Recommendation | null;
  applicableTemplates: Template[];
  applicableChecklists: Checklist[];
  isLoading: boolean;
  error: string | null;
}

export function useRecommendation(id: string): UseRecommendationResult {
  const result = useMemo(() => {
    // Buscar la recomendación por ID
    const recommendation = recommendations.recommendations[id] || null;

    if (!recommendation) {
      return {
        recommendation: null,
        applicableTemplates: [],
        applicableChecklists: [],
        isLoading: false,
        error: `No se encontró la recomendación con ID: ${id}`,
      };
    }

    // Filtrar plantillas aplicables
    const applicableTemplates = recommendation.templates
      .map((templateId) => templates.templates[templateId])
      .filter((template): template is Template => template !== undefined);

    // Filtrar checklists aplicables
    const applicableChecklists = Object.values(checklists.checklists).filter(
      (checklist) =>
        checklist.relatedRecommendations.includes(id) ||
        checklist.applicableFor.includes('todos')
    );

    return {
      recommendation,
      applicableTemplates,
      applicableChecklists,
      isLoading: false,
      error: null,
    };
  }, [id]);

  return result;
}
