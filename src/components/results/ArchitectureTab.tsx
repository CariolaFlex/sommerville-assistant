'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layers, AlertCircle, Lightbulb } from 'lucide-react';
import type { ArchitectureInfo } from '@/types/recommendation';

interface ArchitectureTabProps {
  architecture: ArchitectureInfo;
}

export function ArchitectureTab({ architecture }: ArchitectureTabProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
          <Layers className="h-6 w-6 text-orange-600 dark:text-orange-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-foreground">
            Patrón: {architecture.pattern}
          </h3>
          <Badge variant="outline" className="mt-1">
            Capítulo {architecture.chapter}
          </Badge>
        </div>
      </div>

      {/* ¿Por qué este patrón? */}
      <Card className="border-orange-200 dark:border-orange-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-lg">¿Por qué este patrón?</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {architecture.why}
          </p>
        </CardContent>
      </Card>

      {/* Capas/Componentes */}
      <Card className="border-orange-200 dark:border-orange-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-lg">Capas/Componentes</CardTitle>
          </div>
          <CardDescription>
            Estructura organizacional del sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {architecture.layers.map((layer, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-transparent dark:from-orange-900/10 dark:to-transparent rounded-lg border-l-4 border-orange-500"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                  <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                    {index + 1}
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground">
                  {layer}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Consideraciones Importantes */}
      <Card className="border-orange-200 dark:border-orange-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-lg">Consideraciones Importantes</CardTitle>
          </div>
          <CardDescription>
            Aspectos críticos a tener en cuenta al implementar esta arquitectura
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {architecture.considerations.map((consideration, index) => (
              <li key={index} className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  {consideration}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
