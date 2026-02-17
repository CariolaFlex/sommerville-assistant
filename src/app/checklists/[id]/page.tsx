'use client';

import { useParams, useRouter } from 'next/navigation';
import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  ArrowLeft,
  CheckSquare,
  AlertCircle,
  Clock,
  BookOpen,
  ChevronDown,
  ChevronUp,
  RotateCcw,
} from 'lucide-react';
import checklistsData from '@/data/checklists.json';
import type { ChecklistsData } from '@/types/checklists';

const data = checklistsData as ChecklistsData;

export default function ChecklistDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const checklist = useMemo(() => {
    return data.checklists[id] || null;
  }, [id]);

  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  if (!checklist) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-red-200">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Checklist no encontrado</h2>
            <p className="text-muted-foreground mb-6">
              No existe un checklist con ID: <code>{id}</code>
            </p>
            <Button onClick={() => router.back()} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calcular progreso
  const allItems = checklist.sections.flatMap((s) => s.items);
  const totalItems = allItems.length;
  const checkedCount = allItems.filter((item) => checked[item.id]).length;
  const criticalItems = allItems.filter((item) => item.critical);
  const checkedCritical = criticalItems.filter((item) => checked[item.id]).length;
  const progressPercent = totalItems > 0 ? Math.round((checkedCount / totalItems) * 100) : 0;

  const toggleItem = (itemId: string) => {
    setChecked((prev) => ({ ...prev, [itemId]: !prev[itemId] }));
  };

  const toggleSection = (sectionTitle: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionTitle]: !prev[sectionTitle],
    }));
  };

  const resetAll = () => {
    setChecked({});
  };

  const checkAll = () => {
    const all: Record<string, boolean> = {};
    allItems.forEach((item) => {
      all[item.id] = true;
    });
    setChecked(all);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={resetAll} className="gap-2">
                <RotateCcw className="h-3 w-3" />
                Resetear
              </Button>
              <Button variant="outline" size="sm" onClick={checkAll} className="gap-2">
                <CheckSquare className="h-3 w-3" />
                Marcar todo
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Título */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Badge variant="secondary">{checklist.category}</Badge>
            <Badge variant="outline">
              <BookOpen className="h-3 w-3 mr-1" />
              Capítulo {checklist.chapter}
            </Badge>
            <Badge variant="outline">
              <Clock className="h-3 w-3 mr-1" />
              {checklist.estimatedTime}
            </Badge>
          </div>
          <h1 className="text-3xl font-bold mb-3">{checklist.name}</h1>
          <p className="text-muted-foreground leading-relaxed">{checklist.description}</p>

          {checklist.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-3">
              {checklist.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Barra de Progreso */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-sm">Progreso del Checklist</span>
              <span className="text-sm font-bold text-blue-600">
                {checkedCount} / {totalItems} items ({progressPercent}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-3">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                Items críticos: {checkedCritical} / {criticalItems.length} completados
              </span>
              {progressPercent === 100 && (
                <span className="text-green-600 font-semibold">¡Checklist completo!</span>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Secciones */}
        <div className="space-y-4">
          {checklist.sections.map((section, sectionIndex) => {
            const sectionItems = section.items;
            const sectionChecked = sectionItems.filter((item) => checked[item.id]).length;
            const isExpanded = expandedSections[section.title] !== false; // expandido por defecto
            const allSectionDone = sectionChecked === sectionItems.length;

            return (
              <Card
                key={`${section.title}-${sectionIndex}`}
                className={`overflow-hidden transition-all ${allSectionDone ? 'border-green-300 bg-green-50/50 dark:bg-green-900/10' : ''}`}
              >
                {/* Header de sección */}
                <CardHeader
                  className="cursor-pointer hover:bg-muted/40 transition-colors py-4"
                  onClick={() => toggleSection(section.title)}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          allSectionDone
                            ? 'bg-green-500 text-white'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {allSectionDone ? '✓' : sectionIndex + 1}
                      </div>
                      <CardTitle className="text-base">{section.title}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-muted-foreground">
                        {sectionChecked}/{sectionItems.length}
                      </span>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                  </div>
                </CardHeader>

                {/* Items de la sección */}
                {isExpanded && (
                  <CardContent className="pt-0 pb-4">
                    <div className="space-y-3">
                      {sectionItems.map((item) => {
                        const isChecked = !!checked[item.id];
                        return (
                          <div
                            key={item.id}
                            className={`flex items-start gap-3 p-3 rounded-lg border transition-all cursor-pointer hover:bg-muted/30 ${
                              isChecked
                                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                : item.critical
                                ? 'border-red-100 dark:border-red-900/30 bg-red-50/30 dark:bg-red-900/10'
                                : 'border-transparent bg-muted/20'
                            }`}
                            onClick={() => toggleItem(item.id)}
                          >
                            <Checkbox
                              checked={isChecked}
                              onCheckedChange={() => toggleItem(item.id)}
                              className="mt-0.5 flex-shrink-0"
                              onClick={(e) => e.stopPropagation()}
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start gap-2">
                                <p
                                  className={`text-sm leading-relaxed ${
                                    isChecked
                                      ? 'line-through text-muted-foreground'
                                      : 'text-foreground'
                                  }`}
                                >
                                  {item.text}
                                </p>
                                {item.critical && !isChecked && (
                                  <Badge
                                    variant="outline"
                                    className="text-xs border-red-400 text-red-600 flex-shrink-0"
                                  >
                                    crítico
                                  </Badge>
                                )}
                              </div>
                              {item.help && (
                                <p className="text-xs text-muted-foreground mt-1 italic">
                                  💡 {item.help}
                                </p>
                              )}
                              {item.examples && item.examples.length > 0 && (
                                <div className="mt-2">
                                  <p className="text-xs font-medium text-muted-foreground mb-1">
                                    Ejemplos:
                                  </p>
                                  <ul className="list-disc list-inside space-y-0.5">
                                    {item.examples.map((ex, i) => (
                                      <li key={i} className="text-xs text-muted-foreground">
                                        {ex}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button variant="outline" onClick={() => router.back()} className="gap-2 w-full sm:w-auto">
              <ArrowLeft className="h-4 w-4" />
              Volver a resultados
            </Button>
            <div className="text-sm text-muted-foreground text-center sm:text-right">
              <span className="font-medium">{checkedCount}</span> de{' '}
              <span className="font-medium">{totalItems}</span> items completados
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
