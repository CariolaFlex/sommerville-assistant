'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Boxes, Target, Wrench } from 'lucide-react';
import type { ModelingInfo } from '@/types/recommendation';

interface ModelingTabProps {
  modeling: ModelingInfo;
}

export function ModelingTab({ modeling }: ModelingTabProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
          <Boxes className="h-6 w-6 text-purple-600 dark:text-purple-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-foreground">
            Notaciones de Modelado
          </h3>
          <Badge variant="outline" className="mt-1">
            {modeling.references.chapter}
          </Badge>
        </div>
      </div>

      {/* Foco Principal */}
      <Card className="border-purple-200 dark:border-purple-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-lg">Foco Principal</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {modeling.primaryFocus}
          </p>
        </CardContent>
      </Card>

      {/* Notaciones Recomendadas */}
      <div>
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-purple-600" />
          Notaciones Recomendadas
        </h4>
        <div className="space-y-4">
          {modeling.notations.map((notation, index) => (
            <Card key={index} className="border-purple-200 dark:border-purple-800">
              <CardHeader>
                <CardTitle className="text-base">{notation.name}</CardTitle>
                <CardDescription>{notation.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Diagramas */}
                <div>
                  <h5 className="text-sm font-semibold mb-2 text-purple-600 dark:text-purple-400">
                    Diagramas específicos:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {notation.diagrams.map((diagram, i) => (
                      <Badge key={i} variant="outline" className="bg-purple-50 dark:bg-purple-900/10">
                        {diagram}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* When to Use */}
                <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-md border border-blue-200 dark:border-blue-800">
                  <h5 className="text-sm font-semibold mb-1 text-blue-800 dark:text-blue-200">
                    Cuándo usar:
                  </h5>
                  <p className="text-sm text-blue-700 dark:text-blue-300">{notation.whenToUse}</p>
                </div>

                {/* Tools */}
                <div>
                  <h5 className="text-sm font-semibold mb-2 flex items-center gap-2 text-purple-600 dark:text-purple-400">
                    <Wrench className="h-4 w-4" />
                    Herramientas recomendadas:
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {notation.tools.map((tool, i) => (
                      <span
                        key={i}
                        className="text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 rounded"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Nota adicional */}
      <Card className="bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="text-base text-purple-800 dark:text-purple-200">
            💡 Consejo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed">
            El modelado es una herramienta de comunicación. Usa la notación que mejor comunique
            tus ideas al equipo, priorizando claridad sobre formalismo cuando sea apropiado.
            Los diagramas deben evolucionar con el proyecto.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
