'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface GlossaryFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedChapter: number | null;
  onChapterChange: (chapter: number | null) => void;
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  categories: string[];
  resultsCount: number;
  onClearFilters: () => void;
}

export function GlossaryFilters({
  searchQuery,
  onSearchChange,
  selectedChapter,
  onChapterChange,
  selectedCategory,
  onCategoryChange,
  categories,
  resultsCount,
  onClearFilters,
}: GlossaryFiltersProps) {
  const hasActiveFilters = searchQuery || selectedChapter !== null || selectedCategory !== null;

  return (
    <Card className="p-6 sticky top-4 z-30 shadow-md bg-card/95 backdrop-blur-sm">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold text-lg">Filtros de búsqueda</h3>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
              Limpiar filtros
            </Button>
          )}
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar por término, descripción o palabra clave..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 pr-4"
          />
        </div>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Chapter Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Capítulo</label>
            <Select
              value={selectedChapter?.toString() || 'all'}
              onValueChange={(value) =>
                onChapterChange(value === 'all' ? null : parseInt(value))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Todos los capítulos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los capítulos</SelectItem>
                {[1, 2, 3, 4, 5, 6].map((chapter) => (
                  <SelectItem key={chapter} value={chapter.toString()}>
                    Capítulo {chapter}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Category Select */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Categoría</label>
            <Select
              value={selectedCategory || 'all'}
              onValueChange={(value) => onCategoryChange(value === 'all' ? null : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent className="max-h-80">
                <SelectItem value="all">Todas las categorías</SelectItem>
                {categories.sort().map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between pt-2 border-t">
          <Badge variant="secondary" className="text-sm">
            {resultsCount} término{resultsCount !== 1 ? 's' : ''} encontrado
            {resultsCount !== 1 ? 's' : ''}
          </Badge>
          {hasActiveFilters && (
            <span className="text-xs text-muted-foreground">Filtrando resultados...</span>
          )}
        </div>
      </div>
    </Card>
  );
}
