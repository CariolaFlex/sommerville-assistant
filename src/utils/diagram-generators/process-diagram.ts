import type { ProcessInfo } from '@/types/recommendation';
import { sanitizeMermaidText, resetNodeCounter } from './helpers';

/**
 * Genera un diagrama de flujo del proceso de desarrollo
 */
export function generateProcessDiagram(process: ProcessInfo): string {
  resetNodeCounter();

  const processName = process.name.toLowerCase();

  // Determinar tipo de diagrama según el proceso
  if (processName.includes('cascada') || processName.includes('waterfall')) {
    return generateWaterfallDiagram();
  } else if (processName.includes('iterativo') || processName.includes('incremental')) {
    return generateIterativeDiagram();
  } else if (processName.includes('scrum')) {
    return generateScrumDiagram();
  } else if (processName.includes('xp') || processName.includes('extreme')) {
    return generateXPDiagram();
  } else if (processName.includes('spiral')) {
    return generateSpiralDiagram();
  } else if (processName.includes('prototipo')) {
    return generatePrototypeDiagram();
  } else {
    // Genérico
    return generateGenericProcessDiagram(process);
  }
}

function generateWaterfallDiagram(): string {
  return `flowchart TB
    Req["📋 Análisis de Requisitos"]
    Design["🎨 Diseño del Sistema"]
    Impl["💻 Implementación"]
    Test["🧪 Pruebas y Testing"]
    Deploy["🚀 Despliegue"]
    Maint["🔧 Mantenimiento"]

    Req --> Design
    Design --> Impl
    Impl --> Test
    Test --> Deploy
    Deploy --> Maint

    style Req fill:#bfdbfe,stroke:#3b82f6,stroke-width:2px
    style Design fill:#ddd6fe,stroke:#8b5cf6,stroke-width:2px
    style Impl fill:#fed7aa,stroke:#f97316,stroke-width:2px
    style Test fill:#fca5a5,stroke:#ef4444,stroke-width:2px
    style Deploy fill:#86efac,stroke:#22c55e,stroke-width:2px
    style Maint fill:#fde68a,stroke:#eab308,stroke-width:2px`;
}

function generateIterativeDiagram(): string {
  return `flowchart TB
    Plan["📋 Planificación"]
    Analysis["🔍 Análisis"]
    Design["🎨 Diseño"]
    Impl["💻 Implementación"]
    Test["🧪 Testing"]
    Eval["📊 Evaluación"]

    Plan --> Analysis
    Analysis --> Design
    Design --> Impl
    Impl --> Test
    Test --> Eval
    Eval -.->|"Nueva iteración"| Analysis
    Eval --> Deploy["🚀 Despliegue Final"]

    style Plan fill:#bfdbfe,stroke:#3b82f6,stroke-width:2px
    style Analysis fill:#ddd6fe,stroke:#8b5cf6,stroke-width:2px
    style Design fill:#fed7aa,stroke:#f97316,stroke-width:2px
    style Impl fill:#86efac,stroke:#22c55e,stroke-width:2px
    style Test fill:#fca5a5,stroke:#ef4444,stroke-width:2px
    style Eval fill:#fde68a,stroke:#eab308,stroke-width:2px
    style Deploy fill:#c7d2fe,stroke:#6366f1,stroke-width:3px`;
}

function generateScrumDiagram(): string {
  return `flowchart TB
    Backlog["📋 Product Backlog"]
    Planning["🎯 Sprint Planning"]
    Sprint["⚡ Sprint (2-4 semanas)"]
    Daily["☀️ Daily Scrum"]
    Review["👥 Sprint Review"]
    Retro["🔄 Retrospectiva"]
    Increment["✅ Incremento"]

    Backlog --> Planning
    Planning --> Sprint
    Sprint --> Daily
    Daily -.->|"Diario"| Sprint
    Sprint --> Review
    Review --> Retro
    Retro --> Increment
    Increment -.->|"Nuevo Sprint"| Planning

    style Backlog fill:#bfdbfe,stroke:#3b82f6,stroke-width:2px
    style Planning fill:#ddd6fe,stroke:#8b5cf6,stroke-width:2px
    style Sprint fill:#86efac,stroke:#22c55e,stroke-width:3px
    style Daily fill:#fde68a,stroke:#eab308,stroke-width:2px
    style Review fill:#fed7aa,stroke:#f97316,stroke-width:2px
    style Retro fill:#fca5a5,stroke:#ef4444,stroke-width:2px
    style Increment fill:#c7d2fe,stroke:#6366f1,stroke-width:2px`;
}

function generateXPDiagram(): string {
  return `flowchart TB
    Stories["📝 User Stories"]
    Planning["🎯 Planning Game"]
    Design["🎨 Simple Design"]
    Pair["👥 Pair Programming"]
    TDD["🧪 Test-Driven Development"]
    Refactor["🔄 Refactoring"]
    Integration["🔗 Continuous Integration"]
    Release["🚀 Small Releases"]

    Stories --> Planning
    Planning --> Design
    Design --> TDD
    TDD --> Pair
    Pair --> Refactor
    Refactor --> Integration
    Integration --> Release
    Release -.->|"Feedback"| Stories

    style Stories fill:#bfdbfe,stroke:#3b82f6,stroke-width:2px
    style Planning fill:#ddd6fe,stroke:#8b5cf6,stroke-width:2px
    style Design fill:#fed7aa,stroke:#f97316,stroke-width:2px
    style TDD fill:#86efac,stroke:#22c55e,stroke-width:2px
    style Pair fill:#fca5a5,stroke:#ef4444,stroke-width:2px
    style Refactor fill:#fde68a,stroke:#eab308,stroke-width:2px
    style Integration fill:#c7d2fe,stroke:#6366f1,stroke-width:2px
    style Release fill:#fbcfe8,stroke:#ec4899,stroke-width:2px`;
}

function generateSpiralDiagram(): string {
  return `flowchart TB
    Objectives["🎯 Determinar Objetivos"]
    Risk["⚠️ Análisis de Riesgos"]
    Develop["💻 Desarrollo y Pruebas"]
    Plan["📋 Planificar Siguiente Iteración"]

    Objectives --> Risk
    Risk --> Develop
    Develop --> Plan
    Plan -.->|"Nueva vuelta"| Objectives

    style Objectives fill:#bfdbfe,stroke:#3b82f6,stroke-width:2px
    style Risk fill:#fca5a5,stroke:#ef4444,stroke-width:2px
    style Develop fill:#86efac,stroke:#22c55e,stroke-width:2px
    style Plan fill:#ddd6fe,stroke:#8b5cf6,stroke-width:2px`;
}

function generatePrototypeDiagram(): string {
  return `flowchart TB
    Req["📋 Requisitos Iniciales"]
    Proto["🎨 Diseño de Prototipo"]
    Build["🔨 Construcción Rápida"]
    Eval["👥 Evaluación con Usuario"]
    Refine["🔄 Refinamiento"]
    Final["✅ Sistema Final"]

    Req --> Proto
    Proto --> Build
    Build --> Eval
    Eval -.->|"Ajustar"| Proto
    Eval --> Refine
    Refine --> Final

    style Req fill:#bfdbfe,stroke:#3b82f6,stroke-width:2px
    style Proto fill:#ddd6fe,stroke:#8b5cf6,stroke-width:2px
    style Build fill:#fed7aa,stroke:#f97316,stroke-width:2px
    style Eval fill:#fde68a,stroke:#eab308,stroke-width:2px
    style Refine fill:#fca5a5,stroke:#ef4444,stroke-width:2px
    style Final fill:#86efac,stroke:#22c55e,stroke-width:3px`;
}

function generateGenericProcessDiagram(process: ProcessInfo): string {
  const processName = sanitizeMermaidText(process.name);

  return `flowchart TB
    Start["🎯 Inicio: ${processName}"]
    Analysis["🔍 Análisis"]
    Design["🎨 Diseño"]
    Impl["💻 Implementación"]
    Test["🧪 Testing"]
    Deploy["🚀 Despliegue"]

    Start --> Analysis
    Analysis --> Design
    Design --> Impl
    Impl --> Test
    Test --> Deploy

    style Start fill:#e0e7ff,stroke:#6366f1,stroke-width:2px
    style Analysis fill:#bfdbfe,stroke:#3b82f6,stroke-width:2px
    style Design fill:#ddd6fe,stroke:#8b5cf6,stroke-width:2px
    style Impl fill:#fed7aa,stroke:#f97316,stroke-width:2px
    style Test fill:#fca5a5,stroke:#ef4444,stroke-width:2px
    style Deploy fill:#86efac,stroke:#22c55e,stroke-width:2px`;
}
