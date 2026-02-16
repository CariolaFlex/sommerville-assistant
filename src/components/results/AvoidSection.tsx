'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, XCircle } from 'lucide-react';

interface AvoidSectionProps {
  avoidItems: string[];
}

export function AvoidSection({ avoidItems }: AvoidSectionProps) {
  if (avoidItems.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
          <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-foreground">Errores Comunes a Evitar</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Prácticas desaconsejadas para este tipo de proyecto
          </p>
        </div>
        <Badge variant="outline" className="ml-auto border-red-500 text-red-700">
          {avoidItems.length} advertencia{avoidItems.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {avoidItems.map((item, index) => (
          <Card
            key={index}
            className="border-red-200 dark:border-red-800 bg-red-50/50 dark:bg-red-900/10 hover:shadow-md transition-shadow"
          >
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <XCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Nota adicional */}
      <Card className="mt-6 bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800">
        <CardContent className="pt-6">
          <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed">
            <strong>⚠️ Importante:</strong> Estas advertencias se basan en experiencias
            documentadas de proyectos fallidos. Evitar estos errores aumenta
            significativamente las probabilidades de éxito de tu proyecto.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
