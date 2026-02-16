import type { TimelineWeek } from '@/types/recommendation';
import { sanitizeMermaidText } from './helpers';

/**
 * Genera sintaxis Mermaid para diagrama de timeline/Gantt
 */
export function generateTimelineDiagram(weeks: TimelineWeek[]): string {
  if (!weeks || weeks.length === 0) {
    return `gantt
    title Timeline de Proyecto
    dateFormat YYYY-MM-DD
    section General
    Proyecto :2024-01-01, 12w`;
  }

  // Agrupar semanas por fase
  const phaseGroups = new Map<string, TimelineWeek[]>();

  weeks.forEach((week) => {
    const phase = week.phase;
    if (!phaseGroups.has(phase)) {
      phaseGroups.set(phase, []);
    }
    phaseGroups.get(phase)!.push(week);
  });

  // Fecha inicial (arbitraria para el diagrama)
  const startDate = new Date('2024-01-01');

  let ganttCode = 'gantt\n';
  ganttCode += '    title Timeline de Desarrollo (12 semanas)\n';
  ganttCode += '    dateFormat YYYY-MM-DD\n';
  ganttCode += '    axisFormat %d/%m\n\n';

  let weekOffset = 0;

  // Generar secciones por fase
  phaseGroups.forEach((weeksInPhase, phase) => {
    ganttCode += `    section ${sanitizeMermaidText(phase)}\n`;

    // Agrupar actividades similares dentro de la fase
    const activities = new Map<string, number>();

    weeksInPhase.forEach((week) => {
      week.tasks.forEach((task) => {
        const taskName = sanitizeMermaidText(task);
        activities.set(taskName, (activities.get(taskName) || 0) + 1);
      });
    });

    // Calcular fechas para esta fase
    const phaseStartDate = new Date(startDate);
    phaseStartDate.setDate(phaseStartDate.getDate() + weekOffset * 7);

    const phaseDuration = weeksInPhase.length;

    // Generar tareas
    if (activities.size > 0) {
      activities.forEach((weeks, activity) => {
        const taskStartDate = phaseStartDate.toISOString().split('T')[0];
        const taskDuration = `${weeks}w`;

        // Determinar estado de la tarea
        let status = '';
        if (weekOffset < 2) {
          status = 'done, '; // Primeras semanas marcadas como completadas
        } else if (weekOffset < 4) {
          status = 'active, '; // Semanas actuales
        }

        ganttCode += `    ${activity} :${status}${taskStartDate}, ${taskDuration}\n`;
      });
    } else {
      // Si no hay actividades, crear tarea genérica de la fase
      const taskStartDate = phaseStartDate.toISOString().split('T')[0];
      const status = weekOffset < 2 ? 'done, ' : weekOffset < 4 ? 'active, ' : '';
      ganttCode += `    ${sanitizeMermaidText(phase)} :${status}${taskStartDate}, ${phaseDuration}w\n`;
    }

    ganttCode += '\n';
    weekOffset += phaseDuration;
  });

  return ganttCode;
}
