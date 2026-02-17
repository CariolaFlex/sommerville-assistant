import { Filter } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import type { TemplateFilters, TemplateCategory, Difficulty } from '@/lib/types/templates';

interface TemplateFiltersProps {
  activeFilters: TemplateFilters;
  onFilterChange: (filters: TemplateFilters) => void;
  allMethodologies: string[];
  showCategoryFilter?: boolean;
}

const categories: { value: TemplateCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'Todas las categorías' },
  { value: 'requirements', label: 'Requerimientos' },
  { value: 'architecture', label: 'Arquitectura' },
  { value: 'testing', label: 'Testing' },
  { value: 'methodology', label: 'Metodología' },
  { value: 'management', label: 'Gestión' },
];

const difficulties: { value: Difficulty | 'all'; label: string }[] = [
  { value: 'all', label: 'Todas' },
  { value: 'basic', label: 'Básico' },
  { value: 'intermediate', label: 'Intermedio' },
  { value: 'advanced', label: 'Avanzado' },
];

export function TemplateFilters({
  activeFilters,
  onFilterChange,
  allMethodologies,
  showCategoryFilter = true,
}: TemplateFiltersProps) {
  const handleCategoryChange = (value: string) => {
    onFilterChange({ ...activeFilters, category: value as TemplateCategory | 'all' });
  };

  const handleMethodologyChange = (value: string) => {
    onFilterChange({ ...activeFilters, methodology: value });
  };

  const handleDifficultyChange = (value: string) => {
    onFilterChange({ ...activeFilters, difficulty: value as Difficulty | 'all' });
  };

  const handleClearFilters = () => {
    onFilterChange({
      category: 'all',
      methodology: 'all',
      difficulty: 'all',
      searchQuery: '',
    });
  };

  const hasActiveFilters =
    activeFilters.category !== 'all' ||
    activeFilters.methodology !== 'all' ||
    activeFilters.difficulty !== 'all' ||
    (activeFilters.searchQuery && activeFilters.searchQuery !== '');

  return (
    <div className="space-y-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="font-semibold text-gray-900">Filtros</h3>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters}>
            Limpiar
          </Button>
        )}
      </div>

      {showCategoryFilter && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Categoría</Label>
          <RadioGroup value={activeFilters.category || 'all'} onValueChange={handleCategoryChange}>
            {categories.map((cat) => (
              <div key={cat.value} className="flex items-center space-x-2">
                <RadioGroupItem value={cat.value} id={`cat-${cat.value}`} />
                <Label htmlFor={`cat-${cat.value}`} className="font-normal cursor-pointer">
                  {cat.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      )}

      <div className="space-y-2">
        <Label className="text-sm font-medium">Metodología</Label>
        <RadioGroup
          value={activeFilters.methodology || 'all'}
          onValueChange={handleMethodologyChange}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="all" id="meth-all" />
            <Label htmlFor="meth-all" className="font-normal cursor-pointer">
              Todas
            </Label>
          </div>
          {allMethodologies.map((meth) => (
            <div key={meth} className="flex items-center space-x-2">
              <RadioGroupItem value={meth} id={`meth-${meth}`} />
              <Label htmlFor={`meth-${meth}`} className="font-normal cursor-pointer capitalize">
                {meth}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label className="text-sm font-medium">Dificultad</Label>
        <RadioGroup
          value={activeFilters.difficulty || 'all'}
          onValueChange={handleDifficultyChange}
        >
          {difficulties.map((diff) => (
            <div key={diff.value} className="flex items-center space-x-2">
              <RadioGroupItem value={diff.value} id={`diff-${diff.value}`} />
              <Label htmlFor={`diff-${diff.value}`} className="font-normal cursor-pointer">
                {diff.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
