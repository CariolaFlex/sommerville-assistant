/**
 * Genera sintaxis Mermaid para diagramas de arquitectura
 */
export function generateArchitectureDiagram(_pattern: string): string {
  // TODO: Implementar generador de diagrama de arquitectura basado en pattern
  return `
graph TB
  subgraph "Cliente"
    UI[Interfaz de Usuario]
  end
  subgraph "Servidor"
    API[API REST]
    BL[Lógica de Negocio]
    DB[(Base de Datos)]
  end
  UI --> API
  API --> BL
  BL --> DB
  `;
}
