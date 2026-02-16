import type { Recommendation } from '@/types/recommendation';
import { getOptionLabel, sanitizeMermaidText, resetNodeCounter } from './helpers';

/**
 * Genera un diagrama de flujo Mermaid mostrando el camino de decisión tomado
 */
export function generateDecisionTreeDiagram(
  path: string[],
  recommendation: Recommendation
): string {
  resetNodeCounter();

  if (!path || path.length === 0) {
    return `flowchart LR
    Start[🎯 Inicio] --> Result[✅ ${sanitizeMermaidText(recommendation.title)}]
    style Result fill:#60a5fa,color:#fff`;
  }

  let mermaidCode = 'flowchart LR\n';
  const nodes: string[] = [];
  const connections: string[] = [];

  // Nodo inicial
  nodes.push('Start[🎯 Inicio del Asistente]');

  // Procesar cada paso del path
  path.forEach((optionId, index) => {
    const nodeId = `Step${index}`;
    const label = getOptionLabel(optionId);
    const sanitizedLabel = sanitizeMermaidText(label);

    nodes.push(`${nodeId}["${sanitizedLabel}"]`);

    // Conectar con el nodo anterior
    if (index === 0) {
      connections.push(`Start --> ${nodeId}`);
    } else {
      connections.push(`Step${index - 1} --> ${nodeId}`);
    }
  });

  // Nodo final (resultado)
  const resultLabel = sanitizeMermaidText(recommendation.title);
  nodes.push(`Result[✅ ${resultLabel}]`);
  connections.push(`Step${path.length - 1} --> Result`);

  // Construir el código completo
  mermaidCode += '    ' + nodes.join('\n    ') + '\n';
  mermaidCode += '    ' + connections.join('\n    ') + '\n\n';

  // Estilos
  mermaidCode += '    style Start fill:#e0e7ff,stroke:#6366f1,stroke-width:2px\n';

  // Estilo para nodos del path (verde)
  for (let i = 0; i < path.length; i++) {
    mermaidCode += `    style Step${i} fill:#86efac,stroke:#22c55e,stroke-width:2px\n`;
  }

  // Estilo para resultado (azul)
  mermaidCode += '    style Result fill:#60a5fa,stroke:#3b82f6,stroke-width:3px,color:#fff\n';

  return mermaidCode;
}
