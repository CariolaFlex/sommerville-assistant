import { useState, useEffect, useMemo } from 'react';
import type {
  Template,
  Checklist,
  TemplateFilters,
  TemplateCategory,
  TemplatesData,
} from '@/lib/types/templates';

// Import the templates data
import templatesData from '@/data/templates.json';

export function useTemplates() {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [checklists, setChecklists] = useState<Checklist[]>([]);
  const [loading, setLoading] = useState(true);

  // Load data on mount
  useEffect(() => {
    try {
      const data = templatesData as TemplatesData;
      setTemplates(data.templates);
      setChecklists(data.checklists);
    } catch (error) {
      console.error('Error loading templates:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Get template by ID
  const getTemplateById = (id: string): Template | undefined => {
    return templates.find((template) => template.id === id);
  };

  // Get checklist by ID
  const getChecklistById = (id: string): Checklist | undefined => {
    return checklists.find((checklist) => checklist.id === id);
  };

  // Get templates by category
  const getTemplatesByCategory = (category: TemplateCategory): Template[] => {
    return templates.filter((template) => template.category === category);
  };

  // Get checklists by methodology
  const getChecklistsByMethodology = (methodology: string): Checklist[] => {
    return checklists.filter((checklist) => checklist.methodology === methodology);
  };

  // Filter templates
  const filterTemplates = (filters: TemplateFilters): Template[] => {
    let filtered = [...templates];

    // Filter by category
    if (filters.category && filters.category !== 'all') {
      filtered = filtered.filter((template) => template.category === filters.category);
    }

    // Filter by methodology
    if (filters.methodology && filters.methodology !== 'all') {
      filtered = filtered.filter((template) =>
        template.methodology.includes(filters.methodology as string) ||
        template.methodology.includes('all')
      );
    }

    // Filter by difficulty
    if (filters.difficulty && filters.difficulty !== 'all') {
      filtered = filtered.filter((template) => template.difficulty === filters.difficulty);
    }

    // Filter by search query
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (template) =>
          template.name.toLowerCase().includes(query) ||
          template.description.toLowerCase().includes(query) ||
          template.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  };

  // Filter checklists
  const filterChecklists = (filters: TemplateFilters): Checklist[] => {
    let filtered = [...checklists];

    // Filter by methodology
    if (filters.methodology && filters.methodology !== 'all') {
      filtered = filtered.filter((checklist) => checklist.methodology === filters.methodology);
    }

    // Filter by difficulty
    if (filters.difficulty && filters.difficulty !== 'all') {
      filtered = filtered.filter((checklist) => checklist.difficulty === filters.difficulty);
    }

    // Filter by search query
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(
        (checklist) =>
          checklist.name.toLowerCase().includes(query) ||
          checklist.description.toLowerCase().includes(query) ||
          checklist.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  };

  // Get all unique methodologies from templates
  const allMethodologies = useMemo(() => {
    const methodologies = new Set<string>();
    templates.forEach((template) => {
      template.methodology.forEach((m) => {
        if (m !== 'all') methodologies.add(m);
      });
    });
    checklists.forEach((checklist) => {
      if (checklist.methodology !== 'all') {
        methodologies.add(checklist.methodology);
      }
    });
    return Array.from(methodologies).sort();
  }, [templates, checklists]);

  // Get categories with counts
  const categoriesWithCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    templates.forEach((template) => {
      counts[template.category] = (counts[template.category] || 0) + 1;
    });
    return counts;
  }, [templates]);

  return {
    templates,
    checklists,
    loading,
    getTemplateById,
    getChecklistById,
    getTemplatesByCategory,
    getChecklistsByMethodology,
    filterTemplates,
    filterChecklists,
    allMethodologies,
    categoriesWithCounts,
  };
}
