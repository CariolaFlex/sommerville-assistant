import decisionTreeData from '@/data/decision-tree.json';
import type { DecisionTree, Step } from '@/types/decision-tree';

const decisionTree = decisionTreeData as DecisionTree;

/**
 * Obtener label de opción por ID desde el decision tree
 */
export function getOptionLabel(optionId: string): string {
  // Buscar en todos los steps
  for (const step of Object.values(decisionTree.steps) as Step[]) {
    const option = step.options.find((opt) => opt.id === optionId);
    if (option) return option.label;
  }
  return optionId;
}

/**
 * Obtener label del step por ID
 */
export function getStepLabel(stepId: string): string {
  const step = decisionTree.steps[stepId];
  return step ? step.question : stepId;
}

/**
 * Generar color consistente basado en índice
 */
export function generateColor(index: number): string {
  const colors = [
    '#bfdbfe',
    '#ddd6fe',
    '#fed7aa',
    '#86efac',
    '#fca5a5',
    '#fde68a',
    '#c7d2fe',
    '#fbcfe8',
  ];
  return colors[index % colors.length];
}

/**
 * Sanitizar texto para Mermaid (evitar caracteres problemáticos)
 */
export function sanitizeMermaidText(text: string): string {
  return text
    .replace(/"/g, "'")
    .replace(/\n/g, ' ')
    .replace(/[[\]]/g, '')
    .replace(/[{}]/g, '')
    .trim();
}

/**
 * Generar ID único para nodos de Mermaid
 */
let nodeCounter = 0;
export function generateNodeId(prefix: string = 'node'): string {
  return `${prefix}${nodeCounter++}`;
}

/**
 * Resetear contador de nodos (útil entre diagramas)
 */
export function resetNodeCounter(): void {
  nodeCounter = 0;
}

/**
 * Escapar texto para uso en Mermaid con comillas
 */
export function escapeMermaidString(text: string): string {
  return sanitizeMermaidText(text).substring(0, 50); // Limitar longitud
}
