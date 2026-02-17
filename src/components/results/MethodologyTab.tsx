'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap, CheckCircle2, BookOpen, History, Target } from 'lucide-react';
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
            {methodology.references.chapter}
          </Badge>
        </div>
      </div>

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Descripción
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {methodology.description}
          </p>
        </CardContent>
      </Card>

      {/* Origin */}
      <Card className="bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
            <History className="h-5 w-5" />
            Origen
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div>
            <span className="font-semibold text-amber-900 dark:text-amber-100">Creador: </span>
            <span className="text-sm text-amber-700 dark:text-amber-300">{methodology.origin.creator}</span>
          </div>
          <div>
            <span className="font-semibold text-amber-900 dark:text-amber-100">Año: </span>
            <span className="text-sm text-amber-700 dark:text-amber-300">{methodology.origin.year}</span>
          </div>
          <div>
            <span className="font-semibold text-amber-900 dark:text-amber-100">Contexto: </span>
            <p className="text-sm text-amber-700 dark:text-amber-300 mt-1 leading-relaxed">
              {methodology.origin.context}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Principios Fundamentales */}
      <div>
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          Principios Fundamentales
        </h4>
        <div className="grid gap-3 md:grid-cols-2">
          {methodology.principles.map((principle, index) => (
            <Card
              key={index}
              className="border-green-200 dark:border-green-800 hover:shadow-md transition-shadow"
            >
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {principle}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Differentiators */}
      <div>
        <h4 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-600" />
          Diferenciadores Clave
        </h4>
        <div className="space-y-3">
          {methodology.differentiators.map((diff, index) => (
            <Card
              key={index}
              className="border-blue-200 dark:border-blue-800"
            >
              <CardContent className="pt-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {diff}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Referencias */}
      {methodology.references.externalResources.length > 0 && (
        <Card className="bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-800">
          <CardHeader>
            <CardTitle className="text-base text-purple-800 dark:text-purple-200">
              📚 Referencias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {methodology.references.externalResources.map((ref, index) => (
                <li key={index} className="text-sm text-purple-700 dark:text-purple-300 leading-relaxed">
                  • {ref}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Nota adicional */}
      <Card className="bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="text-base text-green-800 dark:text-green-200">
            💡 Consejo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-green-700 dark:text-green-300 leading-relaxed">
            Estos principios y prácticas representan la esencia de {methodology.name}.
            Comprender su origen y contexto histórico te ayudará a aplicarlos de manera
            más efectiva en tu proyecto.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
