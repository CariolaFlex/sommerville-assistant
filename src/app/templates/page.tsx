'use client';

import { useState } from 'react';
import { FileText, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { useTemplates } from '@/hooks/useTemplates';
import { TemplateCard } from '@/components/templates/TemplateCard';
import { ChecklistCard } from '@/components/templates/ChecklistCard';
import { TemplateFilters } from '@/components/templates/TemplateFilters';
import type { TemplateFilters as TemplateFiltersType } from '@/lib/types/templates';

export default function TemplatesPage() {
  const {
    templates: _templates,
    checklists: _checklists,
    loading,
    filterTemplates,
    filterChecklists,
    allMethodologies,
  } = useTemplates();

  const [activeTab, setActiveTab] = useState<'templates' | 'checklists'>('templates');
  const [filters, setFilters] = useState<TemplateFiltersType>({
    category: 'all',
    methodology: 'all',
    difficulty: 'all',
    searchQuery: '',
  });

  const filteredTemplates = filterTemplates(filters);
  const filteredChecklists = filterChecklists(filters);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando templates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <FileText className="h-12 w-12 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">
              📄 Templates y Checklists
            </h1>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Plantillas de documentación técnica y checklists por metodología listos para descargar y personalizar
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Buscar templates o checklists..."
              className="pl-10 py-6 text-lg"
              value={filters.searchQuery || ''}
              onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <TemplateFilters
              activeFilters={filters}
              onFilterChange={setFilters}
              allMethodologies={allMethodologies}
              showCategoryFilter={activeTab === 'templates'}
            />
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'templates' | 'checklists')}>
              <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
                <TabsTrigger value="templates">
                  Templates ({filteredTemplates.length})
                </TabsTrigger>
                <TabsTrigger value="checklists">
                  Checklists ({filteredChecklists.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="templates">
                {filteredTemplates.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No se encontraron templates
                    </h3>
                    <p className="text-gray-600">
                      Intenta ajustar los filtros o la búsqueda
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredTemplates.map((template) => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        onClick={() => {
                          // Future: Implement modal preview with full template content
                          console.log('Template selected:', template.id);
                        }}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="checklists">
                {filteredChecklists.length === 0 ? (
                  <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      No se encontraron checklists
                    </h3>
                    <p className="text-gray-600">
                      Intenta ajustar los filtros o la búsqueda
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredChecklists.map((checklist) => (
                      <ChecklistCard
                        key={checklist.id}
                        checklist={checklist}
                        onClick={() => {
                          // Future: Implement checklist viewer modal with progress tracking
                          console.log('Checklist selected:', checklist.id);
                        }}
                      />
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </div>
  );
}
