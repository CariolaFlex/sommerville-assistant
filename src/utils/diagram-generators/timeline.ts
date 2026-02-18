import type { TimelineWeek } from '@/types/recommendation';
import { sanitizeMermaidText } from './helpers';

/**
 * Genera un diagrama Gantt profesional para PDF y web
 *
 * IMPORTANTE: La sintaxis Mermaid Gantt es estricta:
 *   taskName :status, taskId, startDate, duration
 *   taskName :taskId, startDate, duration          (sin status)
 *
 * NO puede haber doble colon (::) ni campos vacios entre comas.
 */
export function generateTimelineDiagram(weeks: TimelineWeek[]): string {
  if (!weeks || weeks.length === 0) {
    return buildFallbackGantt();
  }

  // Validar que hay datos utiles
  const validWeeks = weeks.filter(
    (w) => w && w.phase && Array.isArray(w.tasks) && w.tasks.length > 0
  );

  if (validWeeks.length === 0) {
    return buildFallbackGantt();
  }

  // Agrupar semanas por fase
  const phaseGroups = new Map<string, TimelineWeek[]>();
  validWeeks.forEach((week) => {
    const phase = week.phase;
    if (!phaseGroups.has(phase)) {
      phaseGroups.set(phase, []);
    }
    phaseGroups.get(phase)!.push(week);
  });

  const startDate = new Date('2024-01-01');
  const lines: string[] = [];

  lines.push('gantt');
  lines.push('    title Cronograma de Desarrollo del Proyecto');
  lines.push('    dateFormat YYYY-MM-DD');
  lines.push('    axisFormat %d/%m');
  lines.push('');

  let weekOffset = 0;
  let sectionCount = 0;
  let taskCounter = 0;
  const totalPhases = phaseGroups.size;

  phaseGroups.forEach((weeksInPhase, phase) => {
    if (sectionCount >= 6) return;

    const safePhaseName = sanitizeMermaidText(phase).substring(0, 35);
    if (!safePhaseName) return;

    lines.push(`    section ${safePhaseName}`);
    sectionCount++;

    // Recolectar actividades unicas de esta fase
    const activities = new Map<string, number>();
    weeksInPhase.forEach((week) => {
      week.tasks.forEach((task) => {
        const taskName = sanitizeMermaidText(task).substring(0, 40);
        if (taskName) {
          activities.set(taskName, (activities.get(taskName) || 0) + 1);
        }
      });
    });

    const phaseDuration = Math.max(1, weeksInPhase.length);
    const phaseStartWeek = weekOffset;

    if (activities.size > 0) {
      let activityIdx = 0;
      let localOffset = 0;

      activities.forEach((count, activity) => {
        if (activityIdx >= 4) return;
        activityIdx++;
        taskCounter++;

        const taskStart = new Date(startDate);
        taskStart.setDate(taskStart.getDate() + (phaseStartWeek + localOffset) * 7);
        const startStr = formatDate(taskStart);

        const taskDuration = Math.max(1, Math.min(count, phaseDuration - localOffset));

        // Determinar estado basado en posicion relativa
        const taskId = `task${taskCounter}`;
        const statusTag = getStatusTag(sectionCount, totalPhases);

        // Generar linea con sintaxis Mermaid correcta
        if (statusTag) {
          lines.push(`    ${activity}  :${statusTag}, ${taskId}, ${startStr}, ${taskDuration}w`);
        } else {
          lines.push(`    ${activity}  :${taskId}, ${startStr}, ${taskDuration}w`);
        }

        localOffset += taskDuration;
      });
    } else {
      // Fase sin actividades detalladas
      taskCounter++;
      const taskStart = new Date(startDate);
      taskStart.setDate(taskStart.getDate() + weekOffset * 7);
      const startStr = formatDate(taskStart);
      const taskId = `task${taskCounter}`;
      const statusTag = getStatusTag(sectionCount, totalPhases);

      if (statusTag) {
        lines.push(`    ${safePhaseName}  :${statusTag}, ${taskId}, ${startStr}, ${phaseDuration}w`);
      } else {
        lines.push(`    ${safePhaseName}  :${taskId}, ${startStr}, ${phaseDuration}w`);
      }
    }

    lines.push('');
    weekOffset += phaseDuration;
  });

  // Milestone final de entrega
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + weekOffset * 7);
  lines.push('    section Entrega');
  lines.push(`    Entrega del proyecto  :milestone, entrega, ${formatDate(endDate)}, 0d`);

  return lines.join('\n');
}

/**
 * Determina el tag de estado para una tarea Mermaid Gantt.
 * Retorna 'done' | 'active' | '' segun la posicion de la seccion.
 */
function getStatusTag(currentSection: number, totalSections: number): string {
  if (totalSections <= 1) return 'active';
  const progress = currentSection / totalSections;
  if (progress <= 0.33) return 'done';
  if (progress <= 0.66) return 'active';
  return '';
}

/** Formatea una fecha como YYYY-MM-DD */
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/** Diagrama Gantt fallback cuando no hay datos */
function buildFallbackGantt(): string {
  return `gantt
    title Cronograma del Proyecto
    dateFormat YYYY-MM-DD
    axisFormat %d/%m

    section Planificacion
    Definicion de alcance  :done, p1, 2024-01-01, 2w
    Analisis de requisitos  :done, p2, 2024-01-15, 1w

    section Desarrollo
    Sprint 1  :active, d1, 2024-01-22, 3w
    Sprint 2  :d2, 2024-02-12, 3w

    section Pruebas
    Testing e integracion  :t1, 2024-03-04, 2w

    section Entrega
    Despliegue  :milestone, deploy, 2024-03-18, 0d`;
}
