'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { DiagramViewer } from './DiagramViewer';
import { generateDecisionTreeDiagram } from '@/utils/diagram-generators/decision-tree-diagram';
import { generateProcessDiagram } from '@/utils/diagram-generators/process-diagram';
import { generateArchitectureDiagram } from '@/utils/diagram-generators/architecture-diagram';
import { generateTimelineDiagram } from '@/utils/diagram-generators/timeline';
import type { Recommendation } from '@/types/recommendation';
import { GitBranch, Workflow, Building2, Calendar } from 'lucide-react';

interface DiagramsTabProps {
  recommendation: Recommendation;
}

export function DiagramsTab({ recommendation }: DiagramsTabProps) {
  // Generar los 4 diagramas
  const decisionTreeCode = generateDecisionTreeDiagram(
    recommendation.path,
    recommendation
  );

  const processCode = generateProcessDiagram(recommendation.process);

  const architectureCode = generateArchitectureDiagram(recommendation.architecture);

  const timelineCode = generateTimelineDiagram(recommendation.timeline);

  return (
    <div className="space-y-8">
      {/* Introducción */}
      <div className="bg-muted/50 rounded-lg p-6 border">
        <h3 className="text-xl font-semibold mb-2">Visualización de Diagramas</h3>
        <p className="text-muted-foreground">
          A continuación se presentan cuatro diagramas que ilustran diferentes aspectos de
          la recomendación: el camino de decisión que te llevó aquí, el proceso de
          desarrollo sugerido, la arquitectura del sistema, y el timeline de implementación.
        </p>
      </div>

      {/* Grid de Diagramas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Decision Tree */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <GitBranch className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle>Camino de Decisión</CardTitle>
                <CardDescription className="mt-1">
                  Visualización de las opciones seleccionadas en el asistente
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DiagramViewer
              mermaidCode={decisionTreeCode}
              title="Camino de Decisión"
              description="Flujo desde el inicio hasta la recomendación"
            />
          </CardContent>
        </Card>

        {/* Process Diagram */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Workflow className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <CardTitle>Proceso de Desarrollo</CardTitle>
                <CardDescription className="mt-1">
                  Flujo del proceso: {recommendation.process.name}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DiagramViewer
              mermaidCode={processCode}
              title="Proceso de Desarrollo"
              description="Fases y flujo del proceso recomendado"
            />
          </CardContent>
        </Card>

        {/* Architecture Diagram */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <Building2 className="h-5 w-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div>
                <CardTitle>Arquitectura del Sistema</CardTitle>
                <CardDescription className="mt-1">
                  Estilo: {recommendation.architecture.style}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DiagramViewer
              mermaidCode={architectureCode}
              title="Arquitectura del Sistema"
              description="Estructura y componentes arquitectónicos"
            />
          </CardContent>
        </Card>

        {/* Timeline Diagram */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Calendar className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle>Timeline de Proyecto</CardTitle>
                <CardDescription className="mt-1">
                  Gantt de 12 semanas con fases del proyecto
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <DiagramViewer
              mermaidCode={timelineCode}
              title="Timeline de Proyecto"
              description="Cronograma de actividades por fase"
            />
          </CardContent>
        </Card>
      </div>

      {/* Nota informativa */}
      <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-6">
          <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
            <strong>💡 Tip:</strong> Puedes copiar el código Mermaid de cada diagrama para
            usarlo en tus documentos, o descargarlos como SVG para incluirlos en
            presentaciones. Los diagramas se generan automáticamente basándose en las
            decisiones que tomaste en el asistente.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
