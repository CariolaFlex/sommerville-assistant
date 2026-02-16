import { useState, useMemo, useEffect } from 'react';
import glossaryData from '@/data/glossary/index.json';
import type { GlossaryIndex, GlossaryTerm } from '@/types/glossary';

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

interface GlossaryStats {
  totalTerms: number;
  chaptersCount: number;
  categoriesCount: number;
  termsByChapter: Record<number, number>;
  termsByCategory: Record<string, number>;
  mostReferencedTerm?: { name: string; count: number; id: string };
}

interface UseGlossaryResult {
  terms: GlossaryTerm[];
  filteredTerms: GlossaryTerm[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedChapter: number | null;
  setSelectedChapter: (chapter: number | null) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  categories: string[];
  stats: GlossaryStats;
  isFiltering: boolean;
}

export function useGlossary(): UseGlossaryResult {
  const data = glossaryData as GlossaryIndex;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Debounce search query to avoid lag
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Calculate stats
  const stats = useMemo((): GlossaryStats => {
    const termsByChapter: Record<number, number> = {};
    const termsByCategory: Record<string, number> = {};
    const termReferences: Record<string, number> = {};

    // Count terms by chapter and category
    data.allTerms.forEach((term) => {
      // By chapter
      termsByChapter[term.capitulo] = (termsByChapter[term.capitulo] || 0) + 1;

      // By category
      termsByCategory[term.categoria] = (termsByCategory[term.categoria] || 0) + 1;

      // Count references
      term.relatedTerms.forEach((relatedId) => {
        termReferences[relatedId] = (termReferences[relatedId] || 0) + 1;
      });
    });

    // Find most referenced term
    let mostReferencedTerm: { name: string; count: number; id: string } | undefined;
    let maxReferences = 0;

    Object.entries(termReferences).forEach(([termId, count]) => {
      if (count > maxReferences) {
        const term = data.allTerms.find((t) => t.id === termId);
        if (term) {
          maxReferences = count;
          mostReferencedTerm = { name: term.nombre, count, id: termId };
        }
      }
    });

    return {
      totalTerms: data.totalTerms,
      chaptersCount: data.chapters.length,
      categoriesCount: data.categories.length,
      termsByChapter,
      termsByCategory,
      mostReferencedTerm,
    };
  }, [data]);

  // Filter and search terms
  const filteredTerms = useMemo(() => {
    let result = [...data.allTerms];

    // Filter by chapter
    if (selectedChapter !== null) {
      result = result.filter((term) => term.capitulo === selectedChapter);
    }

    // Filter by category
    if (selectedCategory !== null) {
      result = result.filter((term) => term.categoria === selectedCategory);
    }

    // Search filter
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase().trim();
      result = result.filter((term) => {
        // Search in name
        if (term.nombre.toLowerCase().includes(query)) return true;

        // Search in description
        if (term.descripcionBreve.toLowerCase().includes(query)) return true;

        // Search in keywords
        if (term.keywords.some((kw) => kw.toLowerCase().includes(query))) return true;

        return false;
      });
    }

    return result;
  }, [data.allTerms, selectedChapter, selectedCategory, debouncedSearchQuery]);

  const isFiltering =
    searchQuery.trim() !== '' || selectedChapter !== null || selectedCategory !== null;

  return {
    terms: data.allTerms,
    filteredTerms,
    searchQuery,
    setSearchQuery,
    selectedChapter,
    setSelectedChapter,
    selectedCategory,
    setSelectedCategory,
    categories: data.categories,
    stats,
    isFiltering,
  };
}
