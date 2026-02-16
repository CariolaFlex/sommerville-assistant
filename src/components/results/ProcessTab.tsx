'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CheckCircle2, Lightbulb } from 'lucide-react';
import type { ProcessInfo } from '@/types/recommendation';

interface ProcessTabProps {
  process: ProcessInfo;
}

export function ProcessTab({ process }: ProcessTabProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-foreground">{process.name}</h3>
          <Badge variant="outline" className="mt-1">
            Capítulo {process.chapter}
          </Badge>
        </div>
      </div>

      {/* ¿Por qué este proceso? */}
      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">¿Por qué este proceso?</CardTitle>
          </div>
          <CardDescription>
            Razones por las que este proceso es adecuado para tu proyecto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {process.why.map((reason, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground leading-relaxed">
                  {reason}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* ¿Cómo implementarlo? */}
      <Card className="border-blue-200 dark:border-blue-800">
        <CardHeader>
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">¿Cómo implementarlo?</CardTitle>
          </div>
          <CardDescription>
            Pasos para aplicar este proceso en tu proyecto
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            {process.how.map((step, index) => (
              <li key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-muted-foreground leading-relaxed">
                    {step}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
