import type { TimelineWeek } from '@/types/recommendation';
import { sanitizeMermaidText } from './helpers';

/**
 * Genera un diagrama Gantt profesional y visualmente impactante
 * Optimizado para PDF (A4) y visualizacion web
 *
 * Mejoras:
 * - Hasta 6 secciones con 4 tareas cada una para mayor detalle
 * - Colores por seccion usando numberSectionStyles de Mermaid
 * - Formato de fechas legible (dd/mm)
 * - Tareas con estados claros: done, active, pending
 * - Milestone markers para hitos importantes
 */
export function generateTimelineDiagram(weeks: TimelineWeek[]): string {
  if (!weeks || weeks.length === 0) {
    return `gantt
    title Cronograma del Proyecto
    dateFormat YYYY-MM-DD
    axisFormat %d/%m
    tickInterval 1week

    section Planificacion
    Definicion de alcance       :done, plan1, 2024-01-01, 2w
    Analisis de requisitos      :done, plan2, after plan1, 1w

    section Desarrollo
    Sprint 1 - Core             :active, dev1, after plan2, 3w
    Sprint 2 - Features         :dev2, after dev1, 3w

    section Testing
    Pruebas de integracion      :test1, after dev2, 2w

    section Entrega
    Despliegue                  :milestone, deploy, after test1, 0d`;
  }

  // Agrupar semanas por fase
  const phaseGroups = new Map<string, TimelineWeek[]>();

  weeks.forEach((week) => {
    if (!week?.phase || !Array.isArray(week?.tasks)) return;

    const phase = week.phase;
    if (!phaseGroups.has(phase)) {
      phaseGroups.set(phase, []);
    }
    phaseGroups.get(phase)!.push(week);
  });

  const startDate = new Date('2024-01-01');

  let ganttCode = 'gantt\n';
  ganttCode += '    title Cronograma de Desarrollo del Proyecto\n';
  ganttCode += '    dateFormat YYYY-MM-DD\n';
  ganttCode += '    axisFormat %d/%m\n';
  ganttCode += '    tickInterval 1week\n\n';

  let weekOffset = 0;
  let sectionCount = 0;
  let totalTaskId = 0;
  const totalWeeks = weeks.length;

  phaseGroups.forEach((weeksInPhase, phase) => {
    if (sectionCount >= 6) return;
    sectionCount++;

    const safePhaseName = sanitizeMermaidText(phase).substring(0, 35);
    ganttCode += `    section ${safePhaseName}\n`;

    // Collect unique activities with their durations
    const activities = new Map<string, { count: number; firstWeekIdx: number }>();

    weeksInPhase.forEach((week, idx) => {
      week.tasks.forEach((task) => {
        const taskName = sanitizeMermaidText(task).substring(0, 40);
        if (taskName && !activities.has(taskName)) {
          activities.set(taskName, { count: 1, firstWeekIdx: idx });
        } else if (taskName) {
          const existing = activities.get(taskName)!;
          existing.count++;
        }
      });
    });

    const phaseDuration = weeksInPhase.length;
    const phaseStartWeek = weekOffset;

    if (activities.size > 0) {
      let activityCount = 0;
      let localOffset = 0;

      activities.forEach((info, activity) => {
        if (activityCount >= 4) return;
        activityCount++;
        totalTaskId++;

        const taskStartDate = new Date(startDate);
        taskStartDate.setDate(taskStartDate.getDate() + (phaseStartWeek + localOffset) * 7);
        const startStr = taskStartDate.toISOString().split('T')[0];

        // Calculate proportional duration
        const taskDuration = Math.max(1, Math.min(info.count, phaseDuration - localOffset));
        const durationStr = `${taskDuration}w`;

        // Determine status based on position in overall timeline
        const progressPoint = (phaseStartWeek + localOffset) / Math.max(totalWeeks, 1);
        let status = '';
        if (progressPoint < 0.25) {
          status = 'done, ';
        } else if (progressPoint < 0.5) {
          status = 'active, ';
        }

        const taskId = `t${totalTaskId}`;
        ganttCode += `    ${activity}       :${status}${taskId}, ${startStr}, ${durationStr}\n`;

        localOffset += taskDuration;
      });

      // Add a milestone at end of phase if it's significant
      if (sectionCount <= 3 && activityCount >= 2) {
        totalTaskId++;
        const milestoneDate = new Date(startDate);
        milestoneDate.setDate(milestoneDate.getDate() + (phaseStartWeek + phaseDuration) * 7);
        const mStr = milestoneDate.toISOString().split('T')[0];
        const milestoneStatus = phaseStartWeek + phaseDuration < totalWeeks * 0.3 ? 'done, ' : '';
        ganttCode += `    Hito: ${safePhaseName}  :milestone, ${milestoneStatus}m${sectionCount}, ${mStr}, 0d\n`;
      }
    } else {
      totalTaskId++;
      const taskStartDate = new Date(startDate);
      taskStartDate.setDate(taskStartDate.getDate() + weekOffset * 7);
      const startStr = taskStartDate.toISOString().split('T')[0];
      const status = weekOffset < 2 ? 'done, ' : weekOffset < 4 ? 'active, ' : '';
      ganttCode += `    ${safePhaseName}       :${status}t${totalTaskId}, ${startStr}, ${phaseDuration}w\n`;
    }

    ganttCode += '\n';
    weekOffset += phaseDuration;
  });

  // Add final delivery milestone
  totalTaskId++;
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + weekOffset * 7);
  const endStr = endDate.toISOString().split('T')[0];
  ganttCode += `    section Entrega Final\n`;
  ganttCode += `    Entrega del proyecto       :milestone, crit, final, ${endStr}, 0d\n`;

  return ganttCode;
}
