'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, CheckCircle2 } from 'lucide-react';
import type { MethodologyInfo } from '@/types/recommendation';

interface MethodologyTabProps {
  methodology: MethodologyInfo;
}

export function MethodologyTab({ methodology }: MethodologyTabProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
          <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-foreground">{methodology.name}</h3>
          <Badge variant="outline" className="mt-1">
            Capítulo {methodology.chapter}
          </Badge>
        </div>
      </div>

      {/* Prácticas Recomendadas */}
      <div>
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          Prácticas Recomendadas
        </h4>
        <div className="grid gap-3 md:grid-cols-2">
          {methodology.practices.map((practice, index) => (
            <Card
              key={index}
              className="border-green-200 dark:border-green-800 hover:shadow-md transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {practice}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Nota adicional */}
      <Card className="bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="text-base text-green-800 dark:text-green-200">
            💡 Consejo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
            Estas prácticas no son opcionales: son el conjunto mínimo recomendado
            para implementar correctamente la metodología {methodology.name}.
            Adapta la intensidad según el tamaño y complejidad de tu proyecto.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
