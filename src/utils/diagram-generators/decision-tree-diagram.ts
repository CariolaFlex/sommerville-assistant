import type { Recommendation } from '@/types/recommendation';
import { getOptionLabel, sanitizeMermaidText, resetNodeCounter } from './helpers';

/**
 * Genera un diagrama de flujo Mermaid del camino de decision - Diseno profesional
 * Optimizado para PDF (A4) y visualizacion web
 */
export function generateDecisionTreeDiagram(
  path: string[],
  recommendation: Recommendation
): string {
  resetNodeCounter();

  const title = recommendation?.title || 'Recomendacion';

  if (!path || path.length === 0) {
    return `flowchart LR
    Start(["<b>INICIO</b>"]):::startNode --> Result["<b>${sanitizeMermaidText(title)}</b>"]:::resultNode

    classDef startNode fill:#e0e7ff,stroke:#4f46e5,stroke-width:2px,color:#312e81
    classDef resultNode fill:#dbeafe,stroke:#2563eb,stroke-width:3px,color:#1e3a5f`;
  }

  // Use TB for longer paths (>4 steps), LR for shorter
  const direction = path.length > 4 ? 'TB' : 'LR';
  let mermaidCode = `flowchart ${direction}\n`;
  const nodes: string[] = [];
  const connections: string[] = [];

  // Nodo inicial con forma de estadio
  nodes.push('    Start(["<b>INICIO DEL ASISTENTE</b>"])');

  // Color palette for steps - cycling through professional colors
  const stepColors = [
    { fill: '#dbeafe', stroke: '#3b82f6', text: '#1e40af' },
    { fill: '#ede9fe', stroke: '#8b5cf6', text: '#5b21b6' },
    { fill: '#fef3c7', stroke: '#f59e0b', text: '#92400e' },
    { fill: '#d1fae5', stroke: '#10b981', text: '#065f46' },
    { fill: '#fee2e2', stroke: '#ef4444', text: '#991b1b' },
    { fill: '#fef9c3', stroke: '#eab308', text: '#854d0e' },
    { fill: '#c7d2fe', stroke: '#6366f1', text: '#312e81' },
    { fill: '#fce7f3', stroke: '#ec4899', text: '#9d174d' },
  ];

  // Procesar cada paso del path (max 8)
  const limitedPath = path.slice(0, 8);

  limitedPath.forEach((optionId, index) => {
    const nodeId = `Step${index}`;
    const label = getOptionLabel(optionId);
    const sanitizedLabel = sanitizeMermaidText(label).substring(0, 40);
    const stepNum = index + 1;

    nodes.push(`    ${nodeId}["<b>Paso ${stepNum}</b><br/>${sanitizedLabel}"]`);

    if (index === 0) {
      connections.push(`    Start --> ${nodeId}`);
    } else {
      connections.push(`    Step${index - 1} ==> ${nodeId}`);
    }
  });

  // Nodo final (resultado) con forma de doble borde
  const resultLabel = sanitizeMermaidText(title).substring(0, 50);
  nodes.push(`    Result["<b>RESULTADO</b><br/>${resultLabel}"]`);
  connections.push(`    Step${limitedPath.length - 1} ==> Result`);

  // Construir codigo completo
  mermaidCode += nodes.join('\n') + '\n';
  mermaidCode += connections.join('\n') + '\n\n';

  // Estilos profesionales
  mermaidCode += '    style Start fill:#e0e7ff,stroke:#4f46e5,stroke-width:2px,color:#312e81\n';
  for (let i = 0; i < limitedPath.length; i++) {
    const color = stepColors[i % stepColors.length];
    mermaidCode += `    style Step${i} fill:${color.fill},stroke:${color.stroke},stroke-width:2px,color:${color.text}\n`;
  }
  mermaidCode += '    style Result fill:#dbeafe,stroke:#2563eb,stroke-width:3px,color:#1e3a5f\n';

  return mermaidCode;
}
