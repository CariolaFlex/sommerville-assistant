/**
 * Genera sintaxis Mermaid para el árbol de decisiones
 */
export function generateDecisionTreeDiagram(_path: string[]): string {
  // TODO: Implementar generador de diagrama de árbol de decisiones basado en path
  return `
graph TD
  A[Inicio] --> B[Tipo de Sistema]
  B --> C[Características]
  C --> D[Recomendación]
  `;
}
