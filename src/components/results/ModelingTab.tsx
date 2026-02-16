'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Boxes, Target } from 'lucide-react';
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
            Modelado {modeling.level}
          </h3>
          <Badge variant="outline" className="mt-1">
            Capítulo {modeling.chapter}
          </Badge>
        </div>
      </div>

      {/* Propósito */}
      <Card className="border-purple-200 dark:border-purple-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-lg">Propósito del Modelado</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {modeling.purpose}
          </p>
        </CardContent>
      </Card>

      {/* Diagramas/Modelos Requeridos */}
      <Card className="border-purple-200 dark:border-purple-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-purple-600" />
            <CardTitle className="text-lg">Diagramas/Modelos Requeridos</CardTitle>
          </div>
          <CardDescription>
            Conjunto mínimo de modelos necesarios para este proyecto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {modeling.required.map((model, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/10 rounded-lg border border-purple-100 dark:border-purple-800/50"
              >
                <Boxes className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    {model}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nota sobre nivel de detalle */}
      <Card className="bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800">
        <CardHeader>
          <CardTitle className="text-base text-purple-800 dark:text-purple-200">
            📐 Nivel de Detalle
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed">
            {modeling.level === 'COMPLETO Y FORMAL'
              ? 'Todos los diagramas deben ser formales, completos y con notación estándar UML. Servirán como documentación contractual y base para generación de código.'
              : modeling.level === 'DETALLADO'
              ? 'Los diagramas deben cubrir los aspectos principales del sistema con suficiente detalle para guiar la implementación.'
              : modeling.level === 'LIGERO'
              ? 'Diagramas de alto nivel enfocados en comunicación del equipo. Prioriza claridad sobre formalismo.'
              : 'Modelado mínimo, solo lo necesario para comunicar ideas complejas. Usa pizarra o herramientas simples.'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
