'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, TrendingUp } from 'lucide-react';
import type { TimelineWeek } from '@/types/recommendation';

interface TimelineTabProps {
  timeline: TimelineWeek[];
}

// Colores por fase
const phaseColors: Record<string, { bg: string; border: string; text: string }> = {
  'Inicio y Planificación': {
    bg: 'bg-blue-50 dark:bg-blue-900/10',
    border: 'border-blue-300 dark:border-blue-700',
    text: 'text-blue-700 dark:text-blue-300',
  },
  'Planificación': {
    bg: 'bg-blue-50 dark:bg-blue-900/10',
    border: 'border-blue-300 dark:border-blue-700',
    text: 'text-blue-700 dark:text-blue-300',
  },
  'Análisis': {
    bg: 'bg-purple-50 dark:bg-purple-900/10',
    border: 'border-purple-300 dark:border-purple-700',
    text: 'text-purple-700 dark:text-purple-300',
  },
  'Diseño': {
    bg: 'bg-indigo-50 dark:bg-indigo-900/10',
    border: 'border-indigo-300 dark:border-indigo-700',
    text: 'text-indigo-700 dark:text-indigo-300',
  },
  'Desarrollo': {
    bg: 'bg-green-50 dark:bg-green-900/10',
    border: 'border-green-300 dark:border-green-700',
    text: 'text-green-700 dark:text-green-300',
  },
  'Implementación': {
    bg: 'bg-green-50 dark:bg-green-900/10',
    border: 'border-green-300 dark:border-green-700',
    text: 'text-green-700 dark:text-green-300',
  },
  'Testing': {
    bg: 'bg-orange-50 dark:bg-orange-900/10',
    border: 'border-orange-300 dark:border-orange-700',
    text: 'text-orange-700 dark:text-orange-300',
  },
  'Pruebas': {
    bg: 'bg-orange-50 dark:bg-orange-900/10',
    border: 'border-orange-300 dark:border-orange-700',
    text: 'text-orange-700 dark:text-orange-300',
  },
  'Despliegue': {
    bg: 'bg-red-50 dark:bg-red-900/10',
    border: 'border-red-300 dark:border-red-700',
    text: 'text-red-700 dark:text-red-300',
  },
  'Lanzamiento': {
    bg: 'bg-red-50 dark:bg-red-900/10',
    border: 'border-red-300 dark:border-red-700',
    text: 'text-red-700 dark:text-red-300',
  },
};

function getPhaseColor(phase: string) {
  // Buscar match exacto primero
  if (phaseColors[phase]) {
    return phaseColors[phase];
  }

  // Buscar por palabra clave
  for (const [key, colors] of Object.entries(phaseColors)) {
    if (phase.toLowerCase().includes(key.toLowerCase())) {
      return colors;
    }
  }

  // Color por defecto
  return {
    bg: 'bg-gray-50 dark:bg-gray-900/10',
    border: 'border-gray-300 dark:border-gray-700',
    text: 'text-gray-700 dark:text-gray-300',
  };
}

export function TimelineTab({ timeline }: TimelineTabProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
          <Calendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-foreground">
            Timeline de 12 Semanas
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Plan de trabajo fase por fase
          </p>
        </div>
        <Badge variant="outline" className="gap-2">
          <TrendingUp className="h-4 w-4" />
          {timeline.length} fases
        </Badge>
      </div>

      {/* Desktop: Tabla */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-border">
              <th className="text-left p-4 font-semibold text-foreground bg-muted/50">
                Semana
              </th>
              <th className="text-left p-4 font-semibold text-foreground bg-muted/50">
                Fase
              </th>
              <th className="text-left p-4 font-semibold text-foreground bg-muted/50">
                Tareas
              </th>
            </tr>
          </thead>
          <tbody>
            {timeline.map((week, index) => {
              const colors = getPhaseColor(week.phase);
              return (
                <tr
                  key={index}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="p-4 align-top">
                    <Badge variant="outline" className="whitespace-nowrap">
                      Semana {week.week}
                    </Badge>
                  </td>
                  <td className="p-4 align-top">
                    <Badge className={`${colors.bg} ${colors.border} ${colors.text} border`}>
                      {week.phase}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <ul className="space-y-2">
                      {week.tasks.map((task, taskIndex) => (
                        <li
                          key={taskIndex}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-indigo-600 mt-1 flex-shrink-0">•</span>
                          <span className="leading-relaxed">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile: Cards */}
      <div className="md:hidden space-y-4">
        {timeline.map((week, index) => {
          const colors = getPhaseColor(week.phase);
          return (
            <Card key={index} className="overflow-hidden">
              <div className={`p-4 ${colors.bg} border-b-2 ${colors.border}`}>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline">Semana {week.week}</Badge>
                  <Badge className={`${colors.bg} ${colors.border} ${colors.text} border`}>
                    {week.phase}
                  </Badge>
                </div>
              </div>
              <CardContent className="pt-4">
                <ul className="space-y-2">
                  {week.tasks.map((task, taskIndex) => (
                    <li
                      key={taskIndex}
                      className="flex items-start gap-2 text-sm text-muted-foreground"
                    >
                      <span className="text-indigo-600 mt-1 flex-shrink-0">•</span>
                      <span className="leading-relaxed">{task}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Nota final */}
      <Card className="bg-indigo-50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800">
        <CardContent className="pt-6">
          <p className="text-sm text-indigo-700 dark:text-indigo-300 leading-relaxed">
            <strong>📅 Nota:</strong> Este timeline es una guía de referencia. Ajusta las
            duraciones según la complejidad real de tu proyecto y la disponibilidad del
            equipo. Es normal que algunas fases se extiendan o se solapen.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
