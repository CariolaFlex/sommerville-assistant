'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Layers, AlertCircle, CheckCircle2, XCircle, TrendingUp } from 'lucide-react';
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
            Estilo: {architecture.style}
          </h3>
          <Badge variant="outline" className="mt-1">
            {architecture.references.chapter}
          </Badge>
        </div>
      </div>

      {/* Patrones Arquitectónicos */}
      <div>
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Layers className="h-5 w-5 text-orange-600" />
          Patrones Arquitectónicos Recomendados
        </h4>
        <div className="space-y-4">
          {architecture.patterns.map((pattern, index) => (
            <Card key={index} className="border-orange-200 dark:border-orange-800">
              <CardHeader>
                <CardTitle className="text-base">{pattern.name}</CardTitle>
                <CardDescription>{pattern.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Advantages */}
                <div>
                  <h5 className="text-sm font-semibold mb-2 flex items-center gap-2 text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    Ventajas
                  </h5>
                  <ul className="space-y-1">
                    {pattern.advantages.map((adv, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-green-600 dark:text-green-400">+</span>
                        <span>{adv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Disadvantages */}
                <div>
                  <h5 className="text-sm font-semibold mb-2 flex items-center gap-2 text-red-600 dark:text-red-400">
                    <XCircle className="h-4 w-4" />
                    Desventajas
                  </h5>
                  <ul className="space-y-1">
                    {pattern.disadvantages.map((dis, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-red-600 dark:text-red-400">−</span>
                        <span>{dis}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* When to Use */}
                <div className="bg-blue-50 dark:bg-blue-900/10 p-3 rounded-md border border-blue-200 dark:border-blue-800">
                  <h5 className="text-sm font-semibold mb-1 text-blue-800 dark:text-blue-200">
                    Cuándo usar:
                  </h5>
                  <p className="text-sm text-blue-700 dark:text-blue-300">{pattern.whenToUse}</p>
                </div>

                {/* Tradeoffs */}
                <div className="bg-amber-50 dark:bg-amber-900/10 p-3 rounded-md border border-amber-200 dark:border-amber-800">
                  <h5 className="text-sm font-semibold mb-1 text-amber-800 dark:text-amber-200 flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Trade-offs:
                  </h5>
                  <p className="text-sm text-amber-700 dark:text-amber-300">{pattern.tradeoffs}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Atributos de Calidad */}
      <Card className="border-orange-200 dark:border-orange-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-lg">Atributos de Calidad</CardTitle>
          </div>
          <CardDescription>
            Análisis de calidad de la arquitectura recomendada
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="border-l-4 border-blue-500 pl-4 py-2">
            <h5 className="text-sm font-semibold text-blue-600 dark:text-blue-400">Escalabilidad</h5>
            <p className="text-sm text-muted-foreground">{architecture.qualityAttributes.scalability}</p>
          </div>
          <div className="border-l-4 border-green-500 pl-4 py-2">
            <h5 className="text-sm font-semibold text-green-600 dark:text-green-400">Mantenibilidad</h5>
            <p className="text-sm text-muted-foreground">{architecture.qualityAttributes.maintainability}</p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4 py-2">
            <h5 className="text-sm font-semibold text-purple-600 dark:text-purple-400">Performance</h5>
            <p className="text-sm text-muted-foreground">{architecture.qualityAttributes.performance}</p>
          </div>
          <div className="border-l-4 border-red-500 pl-4 py-2">
            <h5 className="text-sm font-semibold text-red-600 dark:text-red-400">Seguridad</h5>
            <p className="text-sm text-muted-foreground">{architecture.qualityAttributes.security}</p>
          </div>
        </CardContent>
      </Card>

      {/* Nota adicional */}
      <Card className="bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardTitle className="text-base text-orange-800 dark:text-orange-200">
            💡 Consejo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-orange-700 dark:text-orange-300 leading-relaxed">
            Los patrones arquitectónicos no son recetas exactas. Adapta estos patrones a las necesidades
            específicas de tu proyecto considerando los trade-offs entre diferentes atributos de calidad.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
