import type { Recommendation } from '@/types/recommendation';
import { getOptionLabel, sanitizeMermaidText, resetNodeCounter } from './helpers';

/**
 * Genera un diagrama de flujo Mermaid mostrando el camino de decisión tomado
 * NOTA: Sin emojis - Mermaid 11.x tiene timeout con caracteres Unicode complejos
 */
export function generateDecisionTreeDiagram(
  path: string[],
  recommendation: Recommendation
): string {
  resetNodeCounter();

  const title = recommendation?.title || 'Recomendacion';

  if (!path || path.length === 0) {
    return `flowchart LR
    Start["Inicio"] --> Result["${sanitizeMermaidText(title)}"]
    style Start fill:#e0e7ff,stroke:#6366f1,stroke-width:2px
    style Result fill:#60a5fa,stroke:#3b82f6,stroke-width:3px,color:#fff`;
  }

  let mermaidCode = 'flowchart LR\n';
  const nodes: string[] = [];
  const connections: string[] = [];

  // Nodo inicial
  nodes.push('    Start["Inicio del Asistente"]');

  // Procesar cada paso del path (máx 8 para no sobrecargar)
  const limitedPath = path.slice(0, 8);

  limitedPath.forEach((optionId, index) => {
    const nodeId = `Step${index}`;
    const label = getOptionLabel(optionId);
    const sanitizedLabel = sanitizeMermaidText(label).substring(0, 40);

    nodes.push(`    ${nodeId}["${sanitizedLabel}"]`);

    if (index === 0) {
      connections.push(`    Start --> ${nodeId}`);
    } else {
      connections.push(`    Step${index - 1} --> ${nodeId}`);
    }
  });

  // Nodo final (resultado)
  const resultLabel = sanitizeMermaidText(title).substring(0, 50);
  nodes.push(`    Result["${resultLabel}"]`);
  connections.push(`    Step${limitedPath.length - 1} --> Result`);

  // Construir código completo
  mermaidCode += nodes.join('\n') + '\n';
  mermaidCode += connections.join('\n') + '\n\n';

  // Estilos
  mermaidCode += '    style Start fill:#e0e7ff,stroke:#6366f1,stroke-width:2px\n';
  for (let i = 0; i < limitedPath.length; i++) {
    mermaidCode += `    style Step${i} fill:#86efac,stroke:#22c55e,stroke-width:2px\n`;
  }
  mermaidCode += '    style Result fill:#60a5fa,stroke:#3b82f6,stroke-width:3px,color:#fff\n';

  return mermaidCode;
}
