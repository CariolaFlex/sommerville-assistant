import type { ProcessInfo } from '@/types/recommendation';
import { sanitizeMermaidText, resetNodeCounter } from './helpers';

/**
 * Genera un diagrama de flujo del proceso de desarrollo - Diseno profesional
 * Optimizado para renderizado en PDF (A4) y web
 */
export function generateProcessDiagram(process: ProcessInfo): string {
  resetNodeCounter();

  if (!process?.name) {
    console.warn('Invalid process data provided, using fallback diagram');
    return generateGenericProcessDiagram({ name: 'Proceso Desconocido' } as ProcessInfo);
  }

  const processName = process.name.toLowerCase();

  if (processName.includes('cascada') || processName.includes('waterfall')) {
    return generateWaterfallDiagram();
  } else if (processName.includes('iterativo') || processName.includes('incremental')) {
    return generateIterativeDiagram();
  } else if (processName.includes('scrum')) {
    return generateScrumDiagram();
  } else if (processName.includes('xp') || processName.includes('extreme')) {
    return generateXPDiagram();
  } else if (processName.includes('spiral') || processName.includes('espiral')) {
    return generateSpiralDiagram();
  } else if (processName.includes('prototipo') || processName.includes('prototype')) {
    return generatePrototypeDiagram();
  } else {
    return generateGenericProcessDiagram(process);
  }
}

function generateWaterfallDiagram(): string {
  return `flowchart TB
    Req["<b>1. REQUISITOS</b><br/>Analisis y documentacion"]
    Design["<b>2. DISENO</b><br/>Arquitectura del sistema"]
    Impl["<b>3. IMPLEMENTACION</b><br/>Codificacion y desarrollo"]
    Test["<b>4. PRUEBAS</b><br/>Verificacion y validacion"]
    Deploy["<b>5. DESPLIEGUE</b><br/>Puesta en produccion"]
    Maint["<b>6. MANTENIMIENTO</b><br/>Soporte y evolucion"]

    Req ==> Design
    Design ==> Impl
    Impl ==> Test
    Test ==> Deploy
    Deploy ==> Maint

    style Req fill:#dbeafe,stroke:#2563eb,stroke-width:2px,color:#1e3a5f
    style Design fill:#ede9fe,stroke:#7c3aed,stroke-width:2px,color:#3b0764
    style Impl fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#78350f
    style Test fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#7f1d1d
    style Deploy fill:#d1fae5,stroke:#059669,stroke-width:2px,color:#064e3b
    style Maint fill:#e0e7ff,stroke:#4f46e5,stroke-width:2px,color:#312e81`;
}

function generateIterativeDiagram(): string {
  return `flowchart TB
    Plan["<b>PLANIFICACION</b><br/>Alcance y objetivos"]
    Analysis["<b>ANALISIS</b><br/>Requisitos del ciclo"]
    Design["<b>DISENO</b><br/>Solucion tecnica"]
    Impl["<b>IMPLEMENTACION</b><br/>Desarrollo iterativo"]
    Test["<b>PRUEBAS</b><br/>Validacion de calidad"]
    Eval["<b>EVALUACION</b><br/>Revision del incremento"]
    Deploy["<b>ENTREGA FINAL</b><br/>Release del producto"]

    Plan ==> Analysis
    Analysis ==> Design
    Design ==> Impl
    Impl ==> Test
    Test ==> Eval
    Eval -.->|Siguiente iteracion| Analysis
    Eval ==>|Producto listo| Deploy

    style Plan fill:#dbeafe,stroke:#2563eb,stroke-width:2px,color:#1e3a5f
    style Analysis fill:#ede9fe,stroke:#7c3aed,stroke-width:2px,color:#3b0764
    style Design fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#78350f
    style Impl fill:#d1fae5,stroke:#059669,stroke-width:2px,color:#064e3b
    style Test fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#7f1d1d
    style Eval fill:#fef9c3,stroke:#ca8a04,stroke-width:2px,color:#713f12
    style Deploy fill:#c7d2fe,stroke:#4f46e5,stroke-width:3px,color:#312e81`;
}

function generateScrumDiagram(): string {
  return `flowchart TB
    Backlog["<b>PRODUCT BACKLOG</b><br/>Historias priorizadas"]
    Planning["<b>SPRINT PLANNING</b><br/>Seleccion de tareas"]
    Sprint["<b>SPRINT</b><br/>2-4 semanas de desarrollo"]
    Daily["<b>DAILY SCRUM</b><br/>Sincronizacion diaria"]
    Review["<b>SPRINT REVIEW</b><br/>Demostracion al cliente"]
    Retro["<b>RETROSPECTIVA</b><br/>Mejora del proceso"]
    Increment["<b>INCREMENTO</b><br/>Producto potencialmente entregable"]

    Backlog ==> Planning
    Planning ==> Sprint
    Sprint --- Daily
    Daily -.->|Cada dia| Sprint
    Sprint ==> Review
    Review ==> Retro
    Retro ==> Increment
    Increment -.->|Siguiente Sprint| Planning

    style Backlog fill:#dbeafe,stroke:#2563eb,stroke-width:2px,color:#1e3a5f
    style Planning fill:#ede9fe,stroke:#7c3aed,stroke-width:2px,color:#3b0764
    style Sprint fill:#d1fae5,stroke:#059669,stroke-width:3px,color:#064e3b
    style Daily fill:#fef9c3,stroke:#ca8a04,stroke-width:2px,color:#713f12
    style Review fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#78350f
    style Retro fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#7f1d1d
    style Increment fill:#c7d2fe,stroke:#4f46e5,stroke-width:2px,color:#312e81`;
}

function generateXPDiagram(): string {
  return `flowchart TB
    Stories["<b>USER STORIES</b><br/>Requisitos del cliente"]
    Planning["<b>PLANNING GAME</b><br/>Estimacion y prioridad"]
    Design["<b>SIMPLE DESIGN</b><br/>Solucion minima viable"]
    TDD["<b>TDD</b><br/>Test-Driven Development"]
    Pair["<b>PAIR PROGRAMMING</b><br/>Desarrollo colaborativo"]
    Refactor["<b>REFACTORING</b><br/>Mejora continua del codigo"]
    CI["<b>INTEGRACION CONTINUA</b><br/>Build y deploy automatico"]
    Release["<b>SMALL RELEASES</b><br/>Entregas frecuentes"]

    Stories ==> Planning
    Planning ==> Design
    Design ==> TDD
    TDD ==> Pair
    Pair ==> Refactor
    Refactor ==> CI
    CI ==> Release
    Release -.->|Feedback del cliente| Stories

    style Stories fill:#dbeafe,stroke:#2563eb,stroke-width:2px,color:#1e3a5f
    style Planning fill:#ede9fe,stroke:#7c3aed,stroke-width:2px,color:#3b0764
    style Design fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#78350f
    style TDD fill:#d1fae5,stroke:#059669,stroke-width:2px,color:#064e3b
    style Pair fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#7f1d1d
    style Refactor fill:#fef9c3,stroke:#ca8a04,stroke-width:2px,color:#713f12
    style CI fill:#c7d2fe,stroke:#4f46e5,stroke-width:2px,color:#312e81
    style Release fill:#fce7f3,stroke:#db2777,stroke-width:2px,color:#831843`;
}

function generateSpiralDiagram(): string {
  return `flowchart TB
    Objectives["<b>1. OBJETIVOS</b><br/>Determinar metas y restricciones"]
    Risk["<b>2. ANALISIS DE RIESGOS</b><br/>Identificar y mitigar riesgos"]
    Develop["<b>3. DESARROLLO</b><br/>Implementacion y pruebas"]
    Plan["<b>4. PLANIFICACION</b><br/>Revision y siguiente ciclo"]

    Objectives ==> Risk
    Risk ==> Develop
    Develop ==> Plan
    Plan -.->|Nueva iteracion del espiral| Objectives

    style Objectives fill:#dbeafe,stroke:#2563eb,stroke-width:2px,color:#1e3a5f
    style Risk fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#7f1d1d
    style Develop fill:#d1fae5,stroke:#059669,stroke-width:2px,color:#064e3b
    style Plan fill:#ede9fe,stroke:#7c3aed,stroke-width:2px,color:#3b0764`;
}

function generatePrototypeDiagram(): string {
  return `flowchart TB
    Req["<b>REQUISITOS INICIALES</b><br/>Necesidades del usuario"]
    Proto["<b>DISENO DE PROTOTIPO</b><br/>Mockups e interfaz"]
    Build["<b>CONSTRUCCION RAPIDA</b><br/>Implementacion del prototipo"]
    Eval["<b>EVALUACION</b><br/>Feedback del usuario"]
    Refine["<b>REFINAMIENTO</b><br/>Ajustes y mejoras"]
    Final["<b>SISTEMA FINAL</b><br/>Producto terminado"]

    Req ==> Proto
    Proto ==> Build
    Build ==> Eval
    Eval -.->|Ajustar prototipo| Proto
    Eval ==>|Aprobado| Refine
    Refine ==> Final

    style Req fill:#dbeafe,stroke:#2563eb,stroke-width:2px,color:#1e3a5f
    style Proto fill:#ede9fe,stroke:#7c3aed,stroke-width:2px,color:#3b0764
    style Build fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#78350f
    style Eval fill:#fef9c3,stroke:#ca8a04,stroke-width:2px,color:#713f12
    style Refine fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#7f1d1d
    style Final fill:#d1fae5,stroke:#059669,stroke-width:3px,color:#064e3b`;
}

function generateGenericProcessDiagram(process: ProcessInfo): string {
  const processName = sanitizeMermaidText(process.name);

  return `flowchart TB
    Start["<b>INICIO</b><br/>${processName}"]
    Analysis["<b>ANALISIS</b><br/>Requisitos y alcance"]
    Design["<b>DISENO</b><br/>Arquitectura y solucion"]
    Impl["<b>IMPLEMENTACION</b><br/>Desarrollo del software"]
    Test["<b>PRUEBAS</b><br/>Verificacion de calidad"]
    Deploy["<b>DESPLIEGUE</b><br/>Entrega del producto"]

    Start ==> Analysis
    Analysis ==> Design
    Design ==> Impl
    Impl ==> Test
    Test ==> Deploy

    style Start fill:#e0e7ff,stroke:#4f46e5,stroke-width:2px,color:#312e81
    style Analysis fill:#dbeafe,stroke:#2563eb,stroke-width:2px,color:#1e3a5f
    style Design fill:#ede9fe,stroke:#7c3aed,stroke-width:2px,color:#3b0764
    style Impl fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#78350f
    style Test fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#7f1d1d
    style Deploy fill:#d1fae5,stroke:#059669,stroke-width:2px,color:#064e3b`;
}
