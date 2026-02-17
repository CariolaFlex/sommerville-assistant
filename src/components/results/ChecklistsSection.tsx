'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  CheckSquare,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  AlertCircle,
  Clock,
  BookOpen,
} from 'lucide-react';
import type { Checklist } from '@/types/checklists';
import { useState } from 'react';

interface ChecklistsSectionProps {
  checklists: Checklist[];
}

export function ChecklistsSection({ checklists }: ChecklistsSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (checklists.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          <CheckSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No hay checklists específicos para esta recomendación</p>
        </CardContent>
      </Card>
    );
  }

  const toggleChecklist = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <CheckSquare className="h-6 w-6 text-purple-600" />
        <div>
          <h3 className="text-2xl font-bold">Checklists de Validación</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Herramientas para verificar la calidad de tu trabajo
          </p>
        </div>
        <Badge variant="outline" className="ml-auto">
          {checklists.length} checklist{checklists.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="space-y-4">
        {checklists.map((checklist) => {
          const isExpanded = expandedId === checklist.id;

          // Contar items por sección para vista previa
          const totalItemsReal = checklist.sections.reduce(
            (acc, s) => acc + s.items.length,
            0
          );
          const criticalCount = checklist.sections.reduce(
            (acc, s) => acc + s.items.filter((i) => i.critical).length,
            0
          );

          // Vista previa: primeros 3 items de la primera sección
          const previewItems = checklist.sections[0]?.items.slice(0, 3) ?? [];

          return (
            <Card
              key={checklist.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Header clickeable */}
              <CardHeader
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleChecklist(checklist.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{checklist.name}</CardTitle>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                      )}
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                      {checklist.description}
                    </CardDescription>
                  </div>
                  <div className="flex flex-col gap-2 items-end flex-shrink-0">
                    <Badge variant="secondary">{checklist.category}</Badge>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">
                        {totalItemsReal} items
                      </Badge>
                      {criticalCount > 0 && (
                        <Badge
                          variant="outline"
                          className="text-xs border-red-500 text-red-700"
                        >
                          {criticalCount} críticos
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>

              {/* Contenido expandido */}
              {isExpanded && (
                <CardContent className="border-t bg-muted/20">
                  <div className="py-4 space-y-5">
                    {/* Metadata */}
                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">Tiempo:</span>
                        <span>{checklist.estimatedTime}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BookOpen className="h-4 w-4" />
                        <span className="font-medium">Capítulo:</span>
                        <Badge variant="outline" className="text-xs">
                          {checklist.chapter}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckSquare className="h-4 w-4" />
                        <span className="font-medium">Secciones:</span>
                        <span>{checklist.sections.length}</span>
                      </div>
                    </div>

                    {/* Resumen de secciones */}
                    <div>
                      <h4 className="font-semibold text-sm mb-3">Secciones del checklist:</h4>
                      <div className="space-y-2">
                        {checklist.sections.map((section, idx) => (
                          <div
                            key={`${section.title}-${idx}`}
                            className="flex items-center justify-between py-2 px-3 bg-background rounded-lg border"
                          >
                            <span className="text-sm font-medium">{section.title}</span>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {section.items.length} items
                              </Badge>
                              {section.items.some((i) => i.critical) && (
                                <Badge
                                  variant="outline"
                                  className="text-xs border-red-400 text-red-600"
                                >
                                  tiene críticos
                                </Badge>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Vista previa de items */}
                    {previewItems.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-sm text-muted-foreground mb-3">
                          Muestra de items ({checklist.sections[0]?.title}):
                        </h4>
                        <ul className="space-y-2">
                          {previewItems.map((item) => (
                            <li key={item.id} className="flex items-start gap-3 text-sm">
                              {item.critical ? (
                                <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                              ) : (
                                <CheckSquare className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                              )}
                              <span className="text-muted-foreground leading-relaxed">
                                {item.text}
                              </span>
                            </li>
                          ))}
                          {totalItemsReal > 3 && (
                            <li className="text-xs text-muted-foreground italic pl-7">
                              ... y {totalItemsReal - 3} items más en {checklist.sections.length} secciones
                            </li>
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Tags */}
                    {checklist.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {checklist.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Botón que va a la página correcta con el ID del checklist */}
                    <Link href={`/checklists/${checklist.id}`}>
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full gap-2 mt-2 bg-purple-600 hover:bg-purple-700"
                      >
                        <CheckSquare className="h-4 w-4" />
                        Ver checklist completo interactivo
                        <ExternalLink className="h-3 w-3 ml-auto" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>

      {/* Nota final */}
      <Card className="mt-6 bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800">
        <CardContent className="pt-6">
          <p className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed">
            <strong>Consejo:</strong> Los items marcados como críticos son fundamentales
            para la calidad del proyecto. Haz clic en{' '}
            <strong>Ver checklist completo</strong> para marcar tu progreso interactivamente.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
