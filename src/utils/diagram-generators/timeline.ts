import type { TimelineWeek } from '@/types/recommendation';
import { sanitizeMermaidText } from './helpers';

/**
 * Genera sintaxis Mermaid para diagrama de timeline/Gantt
 * NOTA: Sin emojis - Mermaid 11.x tiene timeout con caracteres Unicode complejos
 * NOTA: Limitado a máx 5 secciones y 3 tareas por sección para evitar timeout
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
    if (!week?.phase || !Array.isArray(week?.tasks)) {
      console.warn('⚠️ Skipping invalid week entry:', week);
      return;
    }

    const phase = week.phase;
    if (!phaseGroups.has(phase)) {
      phaseGroups.set(phase, []);
    }
    phaseGroups.get(phase)!.push(week);
  });

  const startDate = new Date('2024-01-01');

  let ganttCode = 'gantt\n';
  ganttCode += '    title Timeline de Desarrollo\n';
  ganttCode += '    dateFormat YYYY-MM-DD\n';
  ganttCode += '    axisFormat %d/%m\n\n';

  let weekOffset = 0;
  let sectionCount = 0;

  // Limitar a máx 5 fases para evitar timeout
  phaseGroups.forEach((weeksInPhase, phase) => {
    if (sectionCount >= 5) return;
    sectionCount++;

    const safePhaseName = sanitizeMermaidText(phase).substring(0, 30);
    ganttCode += `    section ${safePhaseName}\n`;

    // Agrupar actividades únicas dentro de la fase
    const activities = new Map<string, number>();

    weeksInPhase.forEach((week) => {
      week.tasks.forEach((task) => {
        const taskName = sanitizeMermaidText(task).substring(0, 30);
        if (taskName) {
          activities.set(taskName, (activities.get(taskName) || 0) + 1);
        }
      });
    });

    const phaseStartDate = new Date(startDate);
    phaseStartDate.setDate(phaseStartDate.getDate() + weekOffset * 7);

    const phaseDuration = weeksInPhase.length;

    // Limitar a máx 3 actividades por sección
    let activityCount = 0;

    if (activities.size > 0) {
      activities.forEach((durationWeeks, activity) => {
        if (activityCount >= 3) return;
        activityCount++;

        const taskStartDate = phaseStartDate.toISOString().split('T')[0];
        const taskDuration = `${Math.max(1, durationWeeks)}w`;

        let status = '';
        if (weekOffset < 2) {
          status = 'done, ';
        } else if (weekOffset < 4) {
          status = 'active, ';
        }

        ganttCode += `    ${activity} :${status}${taskStartDate}, ${taskDuration}\n`;
      });
    } else {
      const taskStartDate = phaseStartDate.toISOString().split('T')[0];
      const status = weekOffset < 2 ? 'done, ' : weekOffset < 4 ? 'active, ' : '';
      ganttCode += `    ${safePhaseName} :${status}${taskStartDate}, ${phaseDuration}w\n`;
    }

    ganttCode += '\n';
    weekOffset += phaseDuration;
  });

  return ganttCode;
}
