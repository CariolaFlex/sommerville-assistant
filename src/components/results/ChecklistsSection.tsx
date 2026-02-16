'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckSquare, ChevronDown, ChevronUp, ExternalLink, AlertCircle } from 'lucide-react';
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
          const firstItems = checklist.sections.flatMap((section) =>
            section.items.map((item) => ({ ...item, sectionTitle: section.title }))
          ).slice(0, 5);

          return (
            <Card
              key={checklist.id}
              className="overflow-hidden hover:shadow-md transition-shadow"
            >
              <CardHeader
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => toggleChecklist(checklist.id)}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{checklist.name}</CardTitle>
                      {isExpanded ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
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
                        {checklist.totalItems} items
                      </Badge>
                      {checklist.criticalItems > 0 && (
                        <Badge
                          variant="outline"
                          className="text-xs border-red-500 text-red-700"
                        >
                          {checklist.criticalItems} críticos
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardHeader>

              {isExpanded && (
                <CardContent className="border-t bg-muted/20">
                  <div className="py-4 space-y-4">
                    {/* Metadata */}
                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Tiempo estimado:</span>
                        <span>{checklist.estimatedTime}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Capítulo:</span>
                        <Badge variant="outline" className="text-xs">
                          {checklist.chapter}
                        </Badge>
                      </div>
                    </div>

                    {/* First 5 items */}
                    <div>
                      <h4 className="font-semibold mb-3 text-sm text-muted-foreground">
                        Primeros {Math.min(5, firstItems.length)} items:
                      </h4>
                      <ul className="space-y-2">
                        {firstItems.map((item) => (
                          <li
                            key={item.id}
                            className="flex items-start gap-3 text-sm"
                          >
                            {item.critical ? (
                              <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
                            ) : (
                              <CheckSquare className="h-4 w-4 text-purple-600 flex-shrink-0 mt-0.5" />
                            )}
                            <div className="flex-1">
                              <p className="leading-relaxed text-muted-foreground">
                                {item.text}
                              </p>
                              {item.help && (
                                <p className="text-xs text-muted-foreground/70 mt-1 italic">
                                  💡 {item.help}
                                </p>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                      {checklist.totalItems > 5 && (
                        <p className="text-xs text-muted-foreground mt-3 italic">
                          ... y {checklist.totalItems - 5} items más
                        </p>
                      )}
                    </div>

                    {/* Tags */}
                    {checklist.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {checklist.tags.slice(0, 5).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Action button */}
                    <Link href="/checklists">
                      <Button variant="outline" size="sm" className="w-full gap-2 mt-2">
                        <CheckSquare className="h-4 w-4" />
                        Ver checklist completo
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
            <strong>✅ Consejo:</strong> Los items marcados como críticos son fundamentales
            para la calidad del proyecto. Revísalos con especial atención antes de avanzar
            a la siguiente fase.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
