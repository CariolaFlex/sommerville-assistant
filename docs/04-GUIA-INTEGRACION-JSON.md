# Guia de Integracion JSON - Sommerville Assistant

**Version:** 1.0
**Ultima actualizacion:** 2026-02-18
**Autor:** Generado por Claude Code

---

## Tabla de Contenidos

1. [Mapa General de Archivos JSON](#1-mapa-general-de-archivos-json)
2. [decision-tree.json](#2-decision-treejson)
3. [recommendations.json](#3-recommendationsjson)
4. [templates.json](#4-templatesjson)
5. [checklists.json](#5-checklistsjson)
6. [Archivos de Glosario (glossary/)](#6-archivos-de-glosario)
7. [Archivos de Capitulos (core/chapters/)](#7-archivos-de-capitulos)
8. [Convenciones de Naming](#8-convenciones-de-naming)
9. [Conexiones Entre JSONs](#9-conexiones-entre-jsons)
10. [Validacion](#10-validacion)

---

## 1. Mapa General de Archivos JSON

El proyecto almacena todos los datos en archivos JSON dentro de `src/data/`. La siguiente tabla muestra cada archivo, su ubicacion y su funcion.

| Archivo | Ruta | Funcion |
|---------|------|---------|
| `decision-tree.json` | `src/data/decision-tree.json` | Arbol de decisiones interactivo. Define preguntas, opciones y rutas que guian al usuario hacia una recomendacion. |
| `recommendations.json` | `src/data/recommendations.json` | Perfiles completos de recomendacion. Cada perfil incluye proceso, metodologia, modelado, arquitectura, timeline, plantillas y errores a evitar. |
| `templates.json` | `src/data/templates.json` | Plantillas de documentos (SRS, User Stories, Casos de Uso, SAD, etc.) con contenido markdown completo. |
| `checklists.json` | `src/data/checklists.json` | Listas de verificacion con secciones e items. Cubren pre-desarrollo, desarrollo, testing y entrega. |
| `glossary/index.json` | `src/data/glossary/index.json` | Indice maestro del glosario con todos los terminos de todos los capitulos en un solo archivo. |
| `glossary/chapter-N.json` | `src/data/glossary/chapter-1.json` ... `chapter-6.json` | Terminos del glosario separados por capitulo. Formato simplificado (array plano). |
| `core/chapters/chapter-N.json` | `src/data/core/chapters/chapter-1.json` ... `chapter-6.json` | Contenido estructurado por capitulo: secciones, conceptos, practicas, ejemplos y referencias cruzadas. |

### Tipos TypeScript asociados

Los tipos se encuentran en `src/types/`:

| Tipo | Archivo | JSON que valida |
|------|---------|-----------------|
| `DecisionTree`, `Step`, `Option`, `PathIndex` | `src/types/decision-tree.ts` | `decision-tree.json` |
| `Recommendations`, `Recommendation`, `ProcessInfo`, `MethodologyInfo`, `ModelingInfo`, `ArchitectureInfo`, `TimelineWeek` | `src/types/recommendation.ts` | `recommendations.json` |
| `TemplatesData`, `Template` | `src/types/templates.ts` | `templates.json` |
| `ChecklistsData`, `Checklist`, `ChecklistSection`, `ChecklistItem` | `src/types/checklists.ts` | `checklists.json` |
| `GlossaryIndex`, `GlossaryChapter`, `GlossaryTerm` | `src/types/glossary.ts` | `glossary/index.json` y `glossary/chapter-N.json` |
| Schemas Zod: `ChapterSchema`, `ConceptSchema`, `PracticeSchema`, etc. | `src/data/core/content-schema.ts` | `core/chapters/chapter-N.json` |

---

## 2. decision-tree.json

### Estructura raiz

```json
{
  "version": "2.0",
  "metadata": {
    "title": "Arbol de Decisiones - Ingenieria de Software Sommerville",
    "description": "Sistema de navegacion inteligente basado en capitulos 1-6",
    "chapters_covered": [1, 2, 3, 4, 5, 6],
    "last_updated": "2026-02-16",
    "phase": "FASE 1 - PARTE 1: Arbol expandido con profundidad 5-7 niveles",
    "coverage": "100% (8 de 8 tipos de sistemas con flujos profundos)",
    "depth": "5-7 niveles por flujo"
  },
  "rootStepId": "step-root",
  "totalPaths": 25,
  "steps": { ... },
  "pathsIndex": [ ... ]
}
```

**Campos raiz:**

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `version` | `string` | Si | Version semantica del arbol |
| `metadata` | `object` | Si | Informacion descriptiva del arbol |
| `metadata.title` | `string` | Si | Titulo legible del arbol |
| `metadata.description` | `string` | Si | Descripcion del proposito |
| `metadata.chapters_covered` | `number[]` | Si | Capitulos de Sommerville cubiertos |
| `metadata.last_updated` | `string` | Si | Fecha YYYY-MM-DD |
| `metadata.phase` | `string` | Si | Fase de desarrollo del contenido |
| `metadata.coverage` | `string` | Si | Porcentaje de cobertura |
| `metadata.depth` | `string` | Si | Profundidad de niveles del arbol |
| `rootStepId` | `string` | Si | ID del paso raiz (siempre `"step-root"`) |
| `totalPaths` | `number` | Si | Total de rutas completas en el arbol |
| `steps` | `Record<string, Step>` | Si | Mapa de todos los pasos (nodos del arbol) |
| `pathsIndex` | `PathIndex[]` | Si | Indice de todas las rutas posibles con sus recomendaciones |

### Estructura de un Step (nodo del arbol)

Cada paso es un nodo que presenta una pregunta y ofrece opciones al usuario.

```json
{
  "step-root": {
    "id": "step-root",
    "type": "root",
    "question": "Que tipo de sistema de software vas a desarrollar?",
    "description": "Selecciona el tipo de sistema que mejor describa tu proyecto.",
    "chapter": 1,
    "options": [ ... ]
  }
}
```

**Campos de Step:**

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `id` | `string` | Si | Identificador unico. Formato: `step-{nombre-descriptivo}` |
| `type` | `"root" \| "branch"` | Si | `root` para el nodo inicial, `branch` para los demas |
| `question` | `string` | Si | Pregunta que se muestra al usuario |
| `description` | `string` | Si | Texto descriptivo que acompana la pregunta |
| `chapter` | `number` | Si | Capitulo de Sommerville al que pertenece la pregunta |
| `options` | `Option[]` | Si | Array de opciones disponibles |
| `context` | `object` | No | Objeto con `note` y `tip` (solo en el nodo root) |

### Estructura de una Option (opcion dentro de un Step)

Cada opcion puede llevar a otro paso (`nextStepId`) o ser un nodo terminal (`finalRecommendationId`).

```json
{
  "id": "opt-critical",
  "label": "Sistema Critico de Seguridad",
  "description": "Fallas pueden causar dano fisico o economico grave",
  "examples": [
    "Control de frenos ABS",
    "Marcapasos cardiaco",
    "Sistema de vuelo de avion"
  ],
  "icon": "...",
  "nextStepId": "step-critical-requirements",
  "characteristics": {
    "criticidad": "ALTA",
    "riesgo": "Muy alto",
    "regulaciones": true,
    "hardware": "Embebido o especializado"
  },
  "whenToChoose": [
    "Vidas humanas dependen del sistema",
    "Regulaciones estrictas (FDA, aviacion)"
  ]
}
```

**Ejemplo de nodo terminal** (sin `nextStepId`, con `finalRecommendationId`):

```json
{
  "id": "opt-critical-volatile",
  "label": "Volatiles",
  "description": "Requisitos cambian frecuentemente o hay incertidumbre",
  "nextStepId": null,
  "finalRecommendationId": "rec-003",
  "warning": "Combinacion critico + volatil es riesgosa. Se recomienda Modelo Espiral."
}
```

**Campos de Option:**

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `id` | `string` | Si | ID unico. Formato: `opt-{nombre}` |
| `label` | `string` | Si | Texto corto que se muestra como boton/opcion |
| `description` | `string` | Si | Descripcion mas detallada de la opcion |
| `examples` | `string[]` | No | Ejemplos concretos del tipo de sistema |
| `icon` | `string` | No | Icono representativo (emoji) |
| `nextStepId` | `string \| null` | Si | ID del siguiente paso. `null` si es nodo terminal |
| `finalRecommendationId` | `string` | No | ID de la recomendacion final (solo en nodos terminales). Formato: `rec-XXX` |
| `characteristics` | `Record<string, string \| number \| boolean>` | No | Propiedades del tipo de sistema |
| `whenToChoose` | `string[]` | No | Criterios que ayudan al usuario a saber si esta opcion aplica |
| `warning` | `string` | No | Advertencia que se muestra si esta opcion tiene riesgos |

### Estructura de PathIndex (indice de rutas)

El array `pathsIndex` enumera todas las rutas posibles del arbol con su recomendacion asociada.

```json
{
  "pathId": "path-001",
  "route": ["opt-critical", "opt-critical-stable", "opt-critical-large"],
  "recommendationId": "rec-001",
  "summary": "Sistema Critico -> Estables -> Grande -> Cascada + RUP",
  "tags": ["critico", "grande", "estable", "tradicional"]
}
```

**Campos de PathIndex:**

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `pathId` | `string` | Si | ID unico de la ruta. Formato: `path-XXX` |
| `route` | `string[]` | Si | Secuencia de IDs de opciones seleccionadas |
| `recommendationId` | `string` | Si | ID de la recomendacion destino. Formato: `rec-XXX` |
| `summary` | `string` | Si | Resumen legible de la ruta |
| `tags` | `string[]` | Si | Etiquetas para busqueda y filtrado |

### Logica de navegacion

1. Se inicia en `steps[rootStepId]` (siempre `step-root`).
2. Se muestra la `question` del paso actual con sus `options`.
3. El usuario selecciona una opcion.
4. Si `option.nextStepId` no es `null`, se navega a `steps[option.nextStepId]`.
5. Si `option.nextStepId` es `null` y `option.finalRecommendationId` existe, se carga la recomendacion correspondiente de `recommendations.json`.
6. El proceso se repite hasta llegar a un nodo terminal.

---

## 3. recommendations.json

### Estructura raiz

```json
{
  "version": "2.0",
  "lastUpdated": "2026-02-16",
  "totalRecommendations": 13,
  "recommendations": {
    "rec-001": { ... },
    "rec-002": { ... },
    ...
  }
}
```

**Campos raiz:**

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `version` | `string` | Si | Version del archivo |
| `lastUpdated` | `string` | Si | Fecha YYYY-MM-DD |
| `totalRecommendations` | `number` | Si | Cantidad total de perfiles |
| `recommendations` | `Record<string, Recommendation>` | Si | Mapa de recomendaciones por ID |

### Estructura completa de una Recommendation

Un perfil de recomendacion es el objeto mas complejo del sistema. Contiene toda la informacion que necesita un estudiante o desarrollador para ejecutar un proyecto de software.

#### Campos de nivel superior

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `id` | `string` | Si | ID unico. Formato: `rec-XXX` |
| `title` | `string` | Si | Titulo descriptivo de la ruta |
| `path` | `string[]` | Si | Ruta de decision simplificada |
| `pathDescription` | `string` | Si | Ruta legible completa |
| `process` | `ProcessInfo` | Si | Informacion del proceso de software recomendado |
| `methodology` | `MethodologyInfo` | Si | Metodologia detallada |
| `modeling` | `ModelingInfo` | Si | Notaciones y tecnicas de modelado |
| `architecture` | `ArchitectureInfo` | Si | Patrones arquitectonicos recomendados |
| `timeline` | `TimelineWeek[]` | Si | Cronograma semana a semana |
| `avoid` | `string[]` | Si | Lista de practicas a evitar |
| `templates` | `string[]` | Si | IDs de templates recomendados. Formato: `tpl-XXX` |
| `chapters` | `number[]` | Si | Capitulos de Sommerville relevantes |
| `warning` | `string` | No | Advertencia especial (solo en recomendaciones de alto riesgo) |

#### ProcessInfo (campo `process`)

```json
{
  "name": "Cascada + RUP",
  "chapter": 2,
  "why": [
    "Requisitos estables permiten especificacion completa",
    "Criticidad requiere documentacion exhaustiva y trazabilidad",
    "Equipo grande necesita proceso disciplinado",
    "Regulaciones (FDA, aviacion) exigen cumplimiento formal"
  ],
  "how": [
    "Fase 1: Analisis y Definicion de Requerimientos -> Documento de Especificacion",
    "Fase 2: Diseno del Sistema y Software -> Arquitectura + Diseno Detallado",
    "Fase 3: Implementacion y Prueba de Unidad -> Codigo + Verificacion",
    "Fase 4: Integracion y Prueba de Sistema -> Sistema Completo Probado",
    "Fase 5: Operacion y Mantenimiento -> Instalacion + Soporte"
  ],
  "phases": [ ... ]
}
```

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `name` | `string` | Si | Nombre del proceso (ej. "Cascada + RUP", "Scrum", "Espiral") |
| `chapter` | `number` | Si | Capitulo de Sommerville donde se describe |
| `why` | `string[]` | Si | Razones por las cuales este proceso es adecuado |
| `how` | `string[]` | Si | Pasos de alto nivel del proceso |
| `phases` | `Phase[]` | Si | Fases detalladas del proceso |

#### Estructura de Phase (dentro de `process.phases`)

```json
{
  "name": "Analisis y Definicion de Requerimientos",
  "duration": "3-6 semanas",
  "activities": [
    "Estudio de factibilidad tecnica y economica",
    "Identificacion de stakeholders y usuarios finales",
    "Obtencion de requerimientos (entrevistas, observacion)"
  ],
  "inputs": [
    "Solicitud del proyecto con justificacion de negocio",
    "Documentacion de sistemas legados (si aplica)"
  ],
  "outputs": [
    "Documento de Especificacion de Requerimientos (SRS)",
    "Matriz de trazabilidad de requerimientos"
  ],
  "gate": {
    "name": "Requirements Review Gate",
    "criteria": [
      "SRS completo y aprobado por stakeholders",
      "Todos los requerimientos tienen criterios de aceptacion medibles"
    ],
    "approvers": [
      "Cliente/Sponsor",
      "Arquitecto Principal",
      "Gerente de Proyecto"
    ]
  }
}
```

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `name` | `string` | Si | Nombre de la fase |
| `duration` | `string` | Si | Duracion estimada (ej. "3-6 semanas") |
| `activities` | `string[]` | Si | Actividades a realizar |
| `inputs` | `string[]` | Si | Entradas necesarias para iniciar la fase |
| `outputs` | `string[]` | Si | Entregables producidos |
| `gate` | `object` | Si | Puerta de revision que controla paso a siguiente fase |
| `gate.name` | `string` | Si | Nombre del gate |
| `gate.criteria` | `string[]` | Si | Criterios que deben cumplirse |
| `gate.approvers` | `string[]` | Si | Personas/roles que aprueban |

#### MethodologyInfo (campo `methodology`)

```json
{
  "name": "Waterfall for Critical Systems (Plan-Driven with Safety Focus)",
  "description": "Adaptacion del modelo Waterfall tradicional con enfasis en seguridad...",
  "origin": {
    "creator": "Adaptacion de Waterfall tradicional (Royce, 1970)...",
    "year": 1980,
    "context": "Evolucion del modelo Waterfall para industrias reguladas..."
  },
  "principles": [
    "Especificacion Formal de Requisitos exhaustiva usando estandares (IEEE 830)...",
    "Analisis de seguridad y confiabilidad obligatorio: FMEA, FTA, HAZOP..."
  ],
  "differentiators": [ ... ],
  "references": {
    "chapter": "chapter-2",
    "sections": ["2.1", "2.2"],
    "externalResources": ["https://..."]
  }
}
```

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `name` | `string` | Si | Nombre completo de la metodologia |
| `description` | `string` | Si | Descripcion detallada |
| `origin.creator` | `string` | Si | Autor/creador de la metodologia |
| `origin.year` | `number` | Si | Anio de creacion |
| `origin.context` | `string` | Si | Contexto historico |
| `principles` | `string[]` | Si | Principios fundamentales |
| `differentiators` | `string[]` | Si | Diferenciadores clave respecto a otras metodologias |
| `references.chapter` | `string` | Si | Capitulo de Sommerville |
| `references.sections` | `string[]` | Si | Secciones especificas |
| `references.externalResources` | `string[]` | Si | URLs externas de referencia |

#### ModelingInfo (campo `modeling`)

```json
{
  "notations": [
    {
      "name": "UML",
      "description": "Unified Modeling Language para modelado estructural y comportamental.",
      "diagrams": [
        "Use Case Diagram",
        "Class Diagram",
        "Sequence Diagram",
        "State Machine Diagram",
        "Deployment Diagram"
      ],
      "whenToUse": "Sistemas criticos requieren documentacion formal exhaustiva...",
      "tools": [
        "Enterprise Architect",
        "IBM Rational",
        "Visual Paradigm",
        "PlantUML"
      ]
    }
  ],
  "primaryFocus": "Trazabilidad completa de requisitos a diseno a codigo",
  "references": {
    "chapter": "chapter-5",
    "sections": ["5.1", "5.2", "5.3"]
  }
}
```

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `notations` | `array` | Si | Notaciones de modelado recomendadas |
| `notations[].name` | `string` | Si | Nombre de la notacion (ej. "UML", "C4 Model") |
| `notations[].description` | `string` | Si | Descripcion de la notacion |
| `notations[].diagrams` | `string[]` | Si | Tipos de diagramas recomendados |
| `notations[].whenToUse` | `string` | Si | Cuando usar esta notacion |
| `notations[].tools` | `string[]` | Si | Herramientas sugeridas |
| `primaryFocus` | `string` | Si | Enfoque principal del modelado |
| `references.chapter` | `string \| number` | Si | Capitulo de referencia |
| `references.sections` | `string[]` | Si | Secciones del capitulo |

#### ArchitectureInfo (campo `architecture`)

```json
{
  "patterns": [
    {
      "name": "Layered (N-Tier)",
      "description": "Arquitectura en capas (Presentation, Business Logic, Data Access)...",
      "advantages": [
        "Separacion de concerns (UI, logica de negocio, datos)",
        "Facilita testing de cada capa independientemente"
      ],
      "disadvantages": [
        "Performance overhead (multiples capas anaden latencia)",
        "Over-engineering para sistemas simples"
      ],
      "whenToUse": "Sistemas criticos con logica de negocio compleja...",
      "tradeoffs": "Mantenibilidad y separacion de concerns vs Performance"
    }
  ],
  "style": "Plan-Driven Architecture with Formal Verification",
  "qualityAttributes": {
    "scalability": "N/A (sistemas embebidos, no escalan)",
    "maintainability": "Alta (capas separadas, documentacion completa)",
    "performance": "Critica (tiempo real, determinismo)",
    "security": "Maxima (regulada, certificada)"
  },
  "references": {
    "chapter": "chapter-6",
    "sections": ["6.1", "6.2", "6.3"]
  }
}
```

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `patterns` | `array` | Si | Patrones arquitectonicos recomendados |
| `patterns[].name` | `string` | Si | Nombre del patron |
| `patterns[].description` | `string` | Si | Descripcion del patron |
| `patterns[].advantages` | `string[]` | Si | Ventajas |
| `patterns[].disadvantages` | `string[]` | Si | Desventajas |
| `patterns[].whenToUse` | `string` | Si | Cuando aplicar este patron |
| `patterns[].tradeoffs` | `string` | Si | Compromiso clave de diseno |
| `style` | `string` | Si | Estilo arquitectonico general |
| `qualityAttributes` | `object` | Si | Atributos de calidad evaluados |
| `qualityAttributes.scalability` | `string` | Si | Evaluacion de escalabilidad |
| `qualityAttributes.maintainability` | `string` | Si | Evaluacion de mantenibilidad |
| `qualityAttributes.performance` | `string` | Si | Evaluacion de rendimiento |
| `qualityAttributes.security` | `string` | Si | Evaluacion de seguridad |
| `references.chapter` | `string \| number` | Si | Capitulo de referencia |
| `references.sections` | `string[]` | Si | Secciones del capitulo |

#### TimelineWeek (campo `timeline`)

```json
[
  {
    "week": "1-2",
    "phase": "Inicio y Planificacion",
    "tasks": [
      "Kickoff con stakeholders principales",
      "Identificar todos los modulos del sistema",
      "Definir criterios de aceptacion",
      "Establecer equipo y roles",
      "Setup de infraestructura"
    ]
  },
  {
    "week": "3-6",
    "phase": "Especificacion Completa",
    "tasks": [ ... ]
  }
]
```

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `week` | `string` | Si | Rango de semanas (ej. "1-2", "3-6", "7-14") |
| `phase` | `string` | Si | Nombre de la fase en esas semanas |
| `tasks` | `string[]` | Si | Tareas a realizar en ese periodo |

#### Campos `avoid`, `templates`, `chapters`

```json
{
  "avoid": [
    "Agil puro (requisitos criticos deben estar completamente especificados)",
    "Big Bang Integration (integrar todo al final es riesgoso)",
    "Sin trazabilidad (requisito -> diseno -> codigo -> prueba)",
    "Skipping formal reviews (requerido por regulaciones)"
  ],
  "templates": ["tpl-001", "tpl-003", "tpl-006", "tpl-009", "tpl-011"],
  "chapters": [1, 2, 3, 4, 5, 6]
}
```

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `avoid` | `string[]` | Si | Practicas y enfoques a evitar para este tipo de proyecto |
| `templates` | `string[]` | Si | IDs de plantillas recomendadas (referencia cruzada a `templates.json`) |
| `chapters` | `number[]` | Si | Capitulos de Sommerville relevantes para esta recomendacion |
| `warning` | `string` | No | Advertencia especial. Solo presente en rec-003 y rec-013 |

#### Campos adicionales dentro de `process` (nivel avanzado)

Algunas recomendaciones incluyen campos extendidos en `process`:

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `whenToUse` | `object` | No | Condiciones detalladas con sub-categorias `systemType`, `requirements`, `team`, `constraints` |
| `whenNotToUse` | `object` | No | Situaciones donde no usar este proceso, con `avoid` y `alternatives` |
| `advantages` | `string[]` | No | Ventajas del proceso |
| `disadvantages` | `string[]` | No | Desventajas del proceso |
| `changeManagement` | `object` | No | Proceso de gestion de cambios (`process`, `description`, `steps`, `ccbComposition`, `frequency`, `tools`) |
| `tooling` | `object` | No | Herramientas recomendadas por area (`requirements`, `design`, `development`, `testing`, `projectManagement`, `documentation`) |

### Ejemplo real truncado de una recomendacion (rec-001)

```json
{
  "id": "rec-001",
  "title": "Sistema Critico -> Estables -> Grande",
  "path": ["Critico", "Estables", "Grande"],
  "pathDescription": "Sistema Critico de Seguridad -> Requisitos Estables -> Equipo Grande (>20)",
  "process": {
    "name": "Cascada + RUP",
    "chapter": 2,
    "why": ["Requisitos estables permiten especificacion completa", "..."],
    "how": ["Fase 1: Analisis y Definicion de Requerimientos -> ...", "..."],
    "phases": [
      {
        "name": "Analisis y Definicion de Requerimientos",
        "duration": "3-6 semanas",
        "activities": ["..."],
        "inputs": ["..."],
        "outputs": ["..."],
        "gate": { "name": "...", "criteria": ["..."], "approvers": ["..."] }
      }
    ]
  },
  "methodology": {
    "name": "Waterfall for Critical Systems",
    "description": "...",
    "origin": { "creator": "...", "year": 1980, "context": "..." },
    "principles": ["..."],
    "differentiators": ["..."],
    "references": { "chapter": "chapter-2", "sections": ["..."], "externalResources": ["..."] }
  },
  "modeling": {
    "notations": [{ "name": "UML", "description": "...", "diagrams": ["..."], "whenToUse": "...", "tools": ["..."] }],
    "primaryFocus": "Trazabilidad completa...",
    "references": { "chapter": "chapter-5", "sections": ["..."] }
  },
  "architecture": {
    "patterns": [{ "name": "Layered (N-Tier)", "description": "...", "advantages": ["..."], "disadvantages": ["..."], "whenToUse": "...", "tradeoffs": "..." }],
    "style": "Plan-Driven Architecture with Formal Verification",
    "qualityAttributes": { "scalability": "...", "maintainability": "...", "performance": "...", "security": "..." },
    "references": { "chapter": "chapter-6", "sections": ["..."] }
  },
  "timeline": [
    { "week": "1-2", "phase": "Inicio y Planificacion", "tasks": ["..."] },
    { "week": "3-6", "phase": "Especificacion Completa", "tasks": ["..."] }
  ],
  "avoid": ["Agil puro", "Big Bang Integration", "Sin trazabilidad"],
  "templates": ["tpl-001", "tpl-003", "tpl-006", "tpl-009", "tpl-011"],
  "chapters": [1, 2, 3, 4, 5, 6]
}
```

---

## 4. templates.json

### Estructura raiz

```json
{
  "version": "1.0.0",
  "lastUpdated": "2026-02-17",
  "templates": [
    { ... },
    { ... }
  ]
}
```

**Nota importante:** En el JSON real, `templates` es un **array** (no un `Record`). Esto difiere del tipo TypeScript `TemplatesData` que define `templates: Record<string, Template>`. La implementacion actual usa un array de objetos.

**Campos raiz:**

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `version` | `string` | Si | Version semantica |
| `lastUpdated` | `string` | Si | Fecha YYYY-MM-DD |
| `templates` | `Template[]` | Si | Array de plantillas |

### Estructura de un Template

```json
{
  "id": "template-001",
  "name": "Documento de Requerimientos de Software (SRS)",
  "category": "requirements",
  "description": "Template completo basado en IEEE 830 para especificar requerimientos...",
  "methodology": ["all"],
  "format": "markdown",
  "difficulty": "intermediate",
  "estimatedTime": "3-4 horas para completar",
  "sections": [
    {
      "title": "1. Introduccion",
      "subsections": ["1.1 Proposito", "1.2 Alcance", "..."],
      "content": "# 1. Introduccion\n\n## 1.1 Proposito\n\nEste documento especifica...",
      "instructions": "Complete los campos entre [corchetes] con informacion especifica..."
    }
  ],
  "tags": ["requirements", "srs", "ieee-830", "documentation", "standards"],
  "references": {
    "sommerville": ["chapter-4"],
    "standards": ["IEEE 830-1998"]
  },
  "relatedTemplates": ["template-002", "template-003"]
}
```

**Campos de Template (datos reales):**

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `id` | `string` | Si | ID unico. Formato: `template-XXX` |
| `name` | `string` | Si | Nombre descriptivo de la plantilla |
| `category` | `string` | Si | Categoria: `"requirements"`, `"architecture"`, `"testing"`, `"management"` |
| `description` | `string` | Si | Descripcion del proposito de la plantilla |
| `methodology` | `string[]` | Si | Metodologias compatibles: `["all"]`, `["scrum", "xp", "agile"]`, etc. |
| `format` | `string` | Si | Formato del contenido: `"markdown"` |
| `difficulty` | `string` | Si | Nivel: `"basic"`, `"intermediate"`, `"advanced"` |
| `estimatedTime` | `string` | Si | Tiempo estimado para completar |
| `sections` | `TemplateSection[]` | Si | Secciones del template con contenido markdown |
| `tags` | `string[]` | Si | Etiquetas para busqueda |
| `references` | `object` | Si | Referencias a Sommerville y estandares |
| `references.sommerville` | `string[]` | Si | Capitulos referenciados |
| `references.standards` | `string[]` | No | Estandares de industria |
| `relatedTemplates` | `string[]` | Si | IDs de templates relacionados |

**Campos de TemplateSection (dentro de `sections`):**

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `title` | `string` | Si | Titulo de la seccion |
| `subsections` | `string[]` | No | Lista de subsecciones |
| `content` | `string` | Si | Contenido completo en markdown (puede ser muy extenso) |
| `instructions` | `string` | Si | Instrucciones para completar la seccion |

### Categorias de templates identificadas

| Categoria | Ejemplos |
|-----------|----------|
| `requirements` | SRS (template-001), User Stories (template-002), Casos de Uso (template-003) |
| `architecture` | SAD - Documento de Arquitectura (template-004) |

---

## 5. checklists.json

### Estructura raiz

```json
{
  "version": "1.0",
  "lastUpdated": "2026-02-15",
  "totalChecklists": 4,
  "checklists": {
    "chk-001": { ... },
    "chk-002": { ... },
    "chk-003": { ... },
    "chk-004": { ... }
  }
}
```

**Campos raiz:**

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `version` | `string` | Si | Version del archivo |
| `lastUpdated` | `string` | Si | Fecha YYYY-MM-DD |
| `totalChecklists` | `number` | Si | Total de checklists |
| `checklists` | `Record<string, Checklist>` | Si | Mapa de checklists por ID |

### Estructura de un Checklist

```json
{
  "id": "chk-001",
  "name": "Antes de Escribir Codigo",
  "category": "Pre-Desarrollo",
  "description": "Verificacion completa antes de iniciar la codificacion...",
  "chapter": 2,
  "applicableFor": ["todos"],
  "estimatedTime": "1-2 horas",
  "sections": [ ... ],
  "totalItems": 23,
  "criticalItems": 16,
  "relatedRecommendations": ["rec-001", "rec-002", "rec-004", "rec-005"],
  "tags": ["preparacion", "requisitos", "arquitectura", "setup", "pre-desarrollo"]
}
```

**Campos de Checklist:**

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `id` | `string` | Si | ID unico. Formato: `chk-XXX` |
| `name` | `string` | Si | Nombre descriptivo del checklist |
| `category` | `string` | Si | Categoria: `"Pre-Desarrollo"`, `"Desarrollo"`, `"Testing"`, `"Entrega"` |
| `description` | `string` | Si | Descripcion del proposito |
| `chapter` | `number` | Si | Capitulo de Sommerville asociado |
| `applicableFor` | `string[]` | Si | Tipos de proyecto donde aplica (ej. `["todos"]`) |
| `estimatedTime` | `string` | Si | Tiempo estimado para completar |
| `sections` | `ChecklistSection[]` | Si | Secciones tematicas del checklist |
| `totalItems` | `number` | Si | Conteo total de items en todas las secciones |
| `criticalItems` | `number` | Si | Conteo de items marcados como criticos |
| `relatedRecommendations` | `string[]` | Si | IDs de recomendaciones relacionadas (referencia cruzada a `recommendations.json`) |
| `tags` | `string[]` | Si | Etiquetas para busqueda |

### Estructura de ChecklistSection

```json
{
  "title": "Comprension del Problema",
  "items": [
    {
      "id": "chk-001-001",
      "text": "Entiendo QUE problema estoy resolviendo?",
      "critical": true,
      "help": "Debe poder explicarlo en 2 frases claras sin ambiguedad"
    },
    {
      "id": "chk-001-004",
      "text": "Tengo ejemplos concretos de uso?",
      "critical": false
    }
  ]
}
```

**Campos de ChecklistSection:**

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `title` | `string` | Si | Titulo de la seccion tematica |
| `items` | `ChecklistItem[]` | Si | Items de verificacion |

### Estructura de ChecklistItem

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `id` | `string` | Si | ID unico. Formato: `chk-XXX-YYY` (checklist padre + numero secuencial) |
| `text` | `string` | Si | Texto del item de verificacion (pregunta o afirmacion) |
| `critical` | `boolean` | Si | Si `true`, es un item critico que no debe omitirse |
| `help` | `string` | No | Texto de ayuda contextual |
| `examples` | `string[]` | No | Ejemplos de buenas y malas practicas |
| `subItems` | `string[]` | No | Sub-items de verificacion mas granulares |

### Ejemplo de item con `examples`

```json
{
  "id": "chk-001-006",
  "text": "Los requisitos no funcionales estan CUANTIFICADOS?",
  "critical": true,
  "examples": [
    "MAL: 'El sistema debe ser rapido'",
    "BIEN: 'Respuesta < 2 segundos en 95% de casos'"
  ]
}
```

### Ejemplo de item con `subItems`

```json
{
  "id": "chk-001-016",
  "text": "Considere los requisitos no funcionales en arquitectura?",
  "critical": true,
  "subItems": [
    "Rendimiento -> Cache? Async?",
    "Seguridad -> Capas? Encriptacion?",
    "Escalabilidad -> Puede crecer?"
  ]
}
```

---

## 6. Archivos de Glosario

### Estructura general

El glosario se almacena en dos formatos:

1. **Archivos por capitulo** (`src/data/glossary/chapter-N.json`): Array plano de terminos con formato simplificado.
2. **Indice maestro** (`src/data/glossary/index.json`): Archivo consolidado con todos los terminos de todos los capitulos, mas metadatos.

### glossary/chapter-N.json (formato simplificado)

Estos archivos son arrays planos (no objetos):

```json
[
  {
    "Nombre": "Ingenieria de software",
    "Categoria": "Disciplina",
    "Descripcion breve": "Disciplina de ingenieria que se interesa por todos los aspectos de la produccion de software..."
  },
  {
    "Nombre": "Procesos de software",
    "Categoria": "Concepto",
    "Descripcion breve": "Conceptos importantes que describen las actividades y secuencias necesarias..."
  }
]
```

**Campos (formato simplificado):**

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `Nombre` | `string` | Si | Nombre del termino (con mayuscula inicial, en espanol) |
| `Categoria` | `string` | Si | Categoria del termino |
| `Descripcion breve` | `string` | Si | Definicion resumida |

**Nota:** Estos archivos usan claves en espanol con espacios y acentos. Es un formato de datos plano sin IDs.

### glossary/index.json (formato enriquecido)

El indice maestro usa el formato definido en el tipo TypeScript `GlossaryTerm`:

```json
{
  "version": "1.4",
  "lastUpdated": "2026-02-17",
  "totalTerms": 2100,
  "chapters": [
    {
      "chapter": 1,
      "title": "Introduccion a la Ingenieria de Software",
      "termCount": 396,
      "terms": [
        {
          "id": "cap1-001",
          "nombre": "Ingenieria de software",
          "categoria": "Disciplina",
          "descripcionBreve": "Disciplina de ingenieria que se interesa por todos los aspectos...",
          "capitulo": 1,
          "keywords": ["ingenieria", "software"],
          "relatedTerms": []
        }
      ]
    }
  ]
}
```

**Campos raiz de index.json:**

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `version` | `string` | Si | Version del indice |
| `lastUpdated` | `string` | Si | Fecha YYYY-MM-DD |
| `totalTerms` | `number` | Si | Total de terminos en todos los capitulos |
| `chapters` | `GlossaryChapter[]` | Si | Array de capitulos con sus terminos |

**Campos de GlossaryChapter:**

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `chapter` | `number` | Si | Numero de capitulo |
| `title` | `string` | Si | Titulo del capitulo |
| `termCount` | `number` | Si | Cantidad de terminos en este capitulo |
| `terms` | `GlossaryTerm[]` | Si | Array de terminos |

**Campos de GlossaryTerm:**

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `id` | `string` | Si | ID unico. Formato: `capN-XXX` (ej. `cap1-001`, `cap3-042`) |
| `nombre` | `string` | Si | Nombre del termino en espanol |
| `categoria` | `string` | Si | Categoria taxonomica (ej. "Disciplina", "Concepto", "Metodo agil", etc.) |
| `descripcionBreve` | `string` | Si | Definicion breve |
| `capitulo` | `number` | Si | Numero de capitulo donde aparece |
| `keywords` | `string[]` | Si | Palabras clave para busqueda |
| `relatedTerms` | `string[]` | Si | IDs de terminos relacionados (puede estar vacio) |
| `descripcionExtendida` | `string` | No | Definicion extendida mas detallada |
| `ejemplos` | `string[]` | No | Ejemplos de uso del concepto |
| `referencias` | `object` | No | Objeto con `capitulo` (number) y `secciones` (string[]) |

### Categorias de terminos identificadas

Las categorias usadas en el glosario incluyen:

- `Disciplina`
- `Concepto`
- `Metodologia de desarrollo`
- `Metodo agil`
- `Actividad de proceso`
- `Lenguaje de modelado`
- `Tipo de diagrama`
- `Tecnica de diseno`
- `Paradigma de diseno`
- `Practica de desarrollo`
- `Practica de gestion`

---

## 7. Archivos de Capitulos

### Ubicacion

`src/data/core/chapters/chapter-N.json` donde N va de 1 a 6.

### Estructura de un Chapter

```json
{
  "id": "chapter-1",
  "number": 1,
  "title": "Introduccion a la Ingenieria de Software",
  "description": "Placeholder - A completar en FASE 1",
  "sections": [],
  "concepts": [],
  "practices": [],
  "examples": [],
  "references": [],
  "metadata": {
    "lastUpdated": "2026-02-16",
    "extractedBy": "Claude Code",
    "completeness": 0,
    "notes": "Estructura creada en FASE 0, contenido se agregara en FASE 1"
  }
}
```

**Nota:** Al momento de escribir esta guia, los archivos de capitulos son placeholders vacios. La estructura completa esta definida por los schemas Zod en `src/data/core/content-schema.ts`.

**Campos de Chapter:**

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `id` | `string` | Si | ID unico. Formato: `chapter-N` (validado por regex `^chapter-\d+$`) |
| `number` | `number` | Si | Numero de capitulo (1-10) |
| `title` | `string` | Si | Titulo del capitulo |
| `description` | `string` | Si | Descripcion del capitulo (min 10 caracteres cuando este completo) |
| `sections` | `Section[]` | Si | Secciones del capitulo (min 1 cuando este completo) |
| `concepts` | `Concept[]` | Si | Conceptos clave del capitulo |
| `practices` | `Practice[]` | Si | Practicas recomendadas |
| `examples` | `Example[]` | Si | Ejemplos ilustrativos |
| `references` | `Reference[]` | Si | Referencias cruzadas entre conceptos |
| `metadata` | `ChapterMetadata` | Si | Metadatos del archivo |

### Estructura de Section (definida por Zod)

```json
{
  "id": "sec-1-1",
  "title": "Que es la Ingenieria de Software",
  "content": "La ingenieria de software es una disciplina...",
  "subsections": [ ... ],
  "keyPoints": ["Punto clave 1", "Punto clave 2"],
  "diagrams": ["diag-001"],
  "pageNumber": 5
}
```

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `id` | `string` | Si | ID de la seccion |
| `title` | `string` | Si | Titulo |
| `content` | `string` | Si | Contenido textual (min 10 caracteres) |
| `subsections` | `Section[]` | No | Subsecciones (estructura recursiva) |
| `keyPoints` | `string[]` | Si | Puntos clave (min 1) |
| `diagrams` | `string[]` | No | IDs de diagramas asociados |
| `pageNumber` | `number` | No | Numero de pagina en el libro |

### Estructura de Concept (definida por Zod)

```json
{
  "id": "concept-waterfall",
  "name": "Modelo en Cascada",
  "category": "process-model",
  "definition": "Modelo de proceso de software secuencial...",
  "whenToUse": "Cuando los requisitos son estables y bien entendidos...",
  "whenNotToUse": "Cuando los requisitos son volatiles o inciertos...",
  "examples": ["Sistemas criticos de seguridad", "Proyectos de defensa"],
  "relatedConcepts": ["concept-rup", "concept-spiral"],
  "chapterReference": "chapter-2",
  "tags": ["proceso", "cascada", "plan-driven"]
}
```

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `id` | `string` | Si | ID del concepto |
| `name` | `string` | Si | Nombre del concepto |
| `category` | `enum` | Si | Uno de: `fundamental-concept`, `process-model`, `agile-practice`, `requirement-type`, `requirement-technique`, `modeling-technique`, `uml-diagram`, `architectural-pattern`, `architectural-style`, `future-chapter` |
| `definition` | `string` | Si | Definicion completa (min 10 caracteres) |
| `whenToUse` | `string` | Si | Cuando usar (min 10 caracteres) |
| `whenNotToUse` | `string` | Si | Cuando no usar (min 10 caracteres) |
| `examples` | `string[]` | Si | Ejemplos (min 1) |
| `relatedConcepts` | `string[]` | Si | IDs de conceptos relacionados |
| `chapterReference` | `string` | Si | Referencia al capitulo. Formato: `chapter-N` |
| `tags` | `string[]` | Si | Etiquetas (min 1) |

### Estructura de Practice (definida por Zod)

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `id` | `string` | Si | ID de la practica |
| `name` | `string` | Si | Nombre |
| `description` | `string` | Si | Descripcion (min 10 caracteres) |
| `steps` | `string[]` | Si | Pasos para implementar (min 1) |
| `benefits` | `string[]` | Si | Beneficios (min 1) |
| `challenges` | `string[]` | Si | Desafios (min 1) |
| `applicableIn` | `string[]` | Si | Contextos donde aplica (min 1) |
| `priority` | `enum` | Si | `"essential"`, `"recommended"`, `"optional"` |
| `relatedConcepts` | `string[]` | Si | IDs de conceptos relacionados |
| `tools` | `string[]` | No | Herramientas sugeridas |

### Estructura de Example (definida por Zod)

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `id` | `string` | Si | ID del ejemplo |
| `name` | `string` | Si | Nombre |
| `description` | `string` | Si | Descripcion (min 10 caracteres) |
| `domain` | `string` | Si | Dominio del ejemplo |
| `illustrates` | `string[]` | Si | Conceptos que ilustra (min 1) |
| `codeSnippet` | `string` | No | Fragmento de codigo |
| `diagramId` | `string` | No | ID de diagrama asociado |

### Estructura de Reference (definida por Zod)

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `fromConcept` | `string` | Si | ID del concepto origen |
| `toConcept` | `string` | Si | ID del concepto destino |
| `relationshipType` | `enum` | Si | `"extends"`, `"uses"`, `"requires"`, `"alternative"`, `"complements"`, `"implements"` |
| `description` | `string` | Si | Descripcion de la relacion (min 10 caracteres) |

### Estructura de ChapterMetadata

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `lastUpdated` | `string` | Si | Fecha YYYY-MM-DD (validado por regex) |
| `extractedBy` | `string` | Si | Quien genero el contenido |
| `completeness` | `number` | Si | Porcentaje de completitud (0-100) |
| `notes` | `string` | No | Notas adicionales |

---

## 8. Convenciones de Naming

### Formatos de ID

El proyecto sigue convenciones estrictas de nomenclatura para todos los IDs.

| Entidad | Formato | Ejemplos |
|---------|---------|----------|
| Recomendacion | `rec-XXX` | `rec-001`, `rec-002`, `rec-013` |
| Template (en recommendations.json) | `tpl-XXX` | `tpl-001`, `tpl-003`, `tpl-011` |
| Template (en templates.json) | `template-XXX` | `template-001`, `template-002`, `template-004` |
| Checklist | `chk-XXX` | `chk-001`, `chk-002`, `chk-004` |
| Item de checklist | `chk-XXX-YYY` | `chk-001-001`, `chk-001-023` |
| Paso del arbol | `step-{nombre}` | `step-root`, `step-critical-requirements`, `step-web-context` |
| Opcion del arbol | `opt-{nombre}` | `opt-critical`, `opt-web-saas`, `opt-batch` |
| Ruta del arbol | `path-XXX` | `path-001`, `path-002`, `path-025` |
| Termino del glosario | `capN-XXX` | `cap1-001`, `cap3-042`, `cap6-100` |
| Capitulo | `chapter-N` | `chapter-1`, `chapter-6` |

### Nota sobre la discrepancia de IDs de templates

Existe una discrepancia entre los IDs usados en `recommendations.json` y los IDs en `templates.json`:

- En `recommendations.json`, los templates se referencian como `tpl-XXX` (ej. `"tpl-001"`, `"tpl-003"`)
- En `templates.json`, los templates usan IDs con formato `template-XXX` (ej. `"template-001"`, `"template-003"`)

Esto requiere un mapeo al conectar ambos archivos. La correspondencia es: `tpl-001` corresponde a `template-001`, `tpl-002` a `template-002`, etc.

### Convenciones generales

1. **Numeracion secuencial con ceros a la izquierda:** Todos los IDs numericos usan formato de 3 digitos (`001`, `002`, ..., `013`).
2. **Separador de guion:** Todos los IDs usan guion `-` como separador, nunca guion bajo `_`.
3. **Minusculas:** Los segmentos descriptivos en IDs de steps y options usan minusculas (`step-critical-requirements`, no `step-Critical-Requirements`).
4. **Idioma de IDs:** Los IDs usan ingles (`opt-critical`, `step-web-context`), mientras que el contenido esta en espanol.
5. **Idioma de campos del glosario:** Los campos del glosario en `index.json` usan espanol en camelCase (`nombre`, `categoria`, `descripcionBreve`, `capitulo`).
6. **Fechas:** Siempre en formato ISO `YYYY-MM-DD`.
7. **Version:** Formato semantico (`"2.0"`, `"1.0.0"`, `"1.4"`).

---

## 9. Conexiones Entre JSONs

### Diagrama de relaciones

```
decision-tree.json
    |
    | option.finalRecommendationId = "rec-XXX"
    v
recommendations.json
    |
    | recommendation.templates = ["tpl-XXX"]
    v                                          (mapeo: tpl-XXX -> template-XXX)
templates.json
    |
    | template.references.sommerville = ["chapter-N"]
    v
core/chapters/chapter-N.json
    |
    | chapter.concepts[].chapterReference = "chapter-N"
    v
glossary/index.json (via capitulo)
```

### Conexion 1: decision-tree -> recommendations

**Como funciona:**

El arbol de decisiones guia al usuario a traves de preguntas. Cuando se llega a un nodo terminal (una opcion sin `nextStepId`), el campo `finalRecommendationId` apunta a una recomendacion en `recommendations.json`.

```
decision-tree.json                   recommendations.json
-----------------                    --------------------
option.finalRecommendationId  --->   recommendations["rec-003"].id
       "rec-003"                          "rec-003"
```

**Ademas**, el `pathsIndex` del arbol indexa todas las rutas posibles con su `recommendationId`:

```json
// decision-tree.json -> pathsIndex[0]
{
  "pathId": "path-001",
  "route": ["opt-critical", "opt-critical-stable", "opt-critical-large"],
  "recommendationId": "rec-001"
}
```

### Conexion 2: recommendations -> templates

Cada recomendacion incluye un array `templates` con IDs de plantillas sugeridas:

```json
// recommendations.json -> rec-001
{
  "templates": ["tpl-001", "tpl-003", "tpl-006", "tpl-009", "tpl-011"]
}
```

Estos IDs se mapean a los objetos en `templates.json` donde `tpl-001` corresponde a `template-001`, etc.

### Conexion 3: recommendations -> checklists

Los checklists referencian recomendaciones en su campo `relatedRecommendations`:

```json
// checklists.json -> chk-001
{
  "relatedRecommendations": ["rec-001", "rec-002", "rec-004", "rec-005"]
}
```

Esta conexion es bidireccional conceptualmente: dado un `rec-XXX`, se pueden buscar todos los checklists que lo referencian.

### Conexion 4: recommendations -> chapters

Cada recomendacion indica que capitulos de Sommerville son relevantes:

```json
// recommendations.json -> rec-001
{
  "chapters": [1, 2, 3, 4, 5, 6]
}
```

Ademas, dentro de cada recomendacion, los sub-objetos `methodology.references`, `modeling.references` y `architecture.references` apuntan a capitulos y secciones especificas:

```json
{
  "methodology": {
    "references": {
      "chapter": "chapter-2",
      "sections": ["2.1", "2.2"]
    }
  }
}
```

### Conexion 5: templates -> chapters

Las plantillas referencian capitulos de Sommerville:

```json
// templates.json -> template-001
{
  "references": {
    "sommerville": ["chapter-4"],
    "standards": ["IEEE 830-1998"]
  }
}
```

### Conexion 6: glossary -> chapters

Cada termino del glosario pertenece a un capitulo:

```json
// glossary/index.json -> terms[0]
{
  "id": "cap1-001",
  "capitulo": 1
}
```

El prefijo del ID (`cap1`, `cap2`, etc.) tambien indica el capitulo.

### Conexion 7: decision-tree steps -> chapters

Cada paso del arbol indica a que capitulo pertenece la pregunta:

```json
// decision-tree.json -> step-root
{
  "chapter": 1
}

// decision-tree.json -> step-critical-requirements
{
  "chapter": 4
}
```

### Tabla resumen de conexiones

| Origen | Campo | Destino | Campo destino |
|--------|-------|---------|---------------|
| `decision-tree.json` option | `finalRecommendationId` | `recommendations.json` | `recommendations[id].id` |
| `decision-tree.json` pathsIndex | `recommendationId` | `recommendations.json` | `recommendations[id].id` |
| `recommendations.json` | `templates[]` | `templates.json` | `templates[].id` (con mapeo tpl->template) |
| `recommendations.json` | `chapters[]` | `core/chapters/` | `chapter-N.json` |
| `recommendations.json` methodology | `references.chapter` | `core/chapters/` | `chapter-N.json` |
| `checklists.json` | `relatedRecommendations[]` | `recommendations.json` | `recommendations[id].id` |
| `templates.json` | `references.sommerville[]` | `core/chapters/` | `chapter-N.json` |
| `templates.json` | `relatedTemplates[]` | `templates.json` | `templates[].id` |
| `glossary/index.json` term | `capitulo` | `core/chapters/` | `chapter-N.json` |
| `glossary/index.json` term | `relatedTerms[]` | `glossary/index.json` | otros `terms[].id` |

---

## 10. Validacion

### Schemas Zod existentes

El proyecto ya incluye validacion Zod para los archivos de capitulos en `src/data/core/content-schema.ts`. Este archivo define:

| Schema | Valida |
|--------|--------|
| `ConceptSchema` | Conceptos dentro de un capitulo |
| `PracticeSchema` | Practicas dentro de un capitulo |
| `ExampleSchema` | Ejemplos dentro de un capitulo |
| `SectionSchema` | Secciones (recursivas) dentro de un capitulo |
| `ReferenceSchema` | Referencias cruzadas entre conceptos |
| `ChapterMetadataSchema` | Metadatos del capitulo |
| `ChapterSchema` | Capitulo completo (compuesto por todos los anteriores) |

**Uso:**

```typescript
import { validateChapter, validateChapterStrict } from './content-schema';

// Validacion segura (retorna resultado con success/error)
const result = validateChapter(data);
if (result.success) {
  console.log('Capitulo valido:', result.data);
} else {
  console.error('Errores:', result.error.issues);
}

// Validacion estricta (lanza excepcion si falla)
try {
  const chapter = validateChapterStrict(data);
} catch (error) {
  console.error('Validacion fallo:', error);
}
```

### Tipos TypeScript para los demas archivos

Los demas archivos JSON se validan implicitamente mediante tipos TypeScript:

```typescript
// src/types/decision-tree.ts
import type { DecisionTree } from '../types/decision-tree';

// Al importar el JSON, TypeScript verifica la estructura
import decisionTreeData from '../data/decision-tree.json';
const tree: DecisionTree = decisionTreeData;
```

### Como crear schemas Zod adicionales

Si se necesita validacion en runtime para otros archivos, se recomienda crear schemas similares. Ejemplo para `recommendations.json`:

```typescript
import { z } from 'zod';

const TimelineWeekSchema = z.object({
  week: z.string().min(1),
  phase: z.string().min(1),
  tasks: z.array(z.string()).min(1)
});

const ProcessInfoSchema = z.object({
  name: z.string().min(1),
  chapter: z.number().int().min(1),
  why: z.array(z.string()).min(1),
  how: z.array(z.string()).min(1)
});

const RecommendationSchema = z.object({
  id: z.string().regex(/^rec-\d{3}$/),
  title: z.string().min(1),
  path: z.array(z.string()).min(1),
  pathDescription: z.string().min(1),
  process: ProcessInfoSchema,
  // ... demas campos
  timeline: z.array(TimelineWeekSchema).min(1),
  avoid: z.array(z.string()).min(1),
  templates: z.array(z.string().regex(/^tpl-\d{3}$/)).min(1),
  chapters: z.array(z.number().int().min(1)).min(1),
  warning: z.string().optional()
});
```

### Errores comunes y como corregirlos

#### Error 1: ID duplicado

**Sintoma:** Dos entradas con el mismo ID en el mismo archivo.

**Deteccion:** JSON no lanza error (la segunda clave sobrescribe la primera), pero la logica se rompe.

**Correccion:** Verificar unicidad de IDs. Para objetos Record, cada clave debe ser unica:
```json
{
  "rec-001": { "id": "rec-001" },
  "rec-002": { "id": "rec-002" }
}
```
Asegurar que la clave del objeto coincida con el campo `id` interno.

#### Error 2: Referencia rota entre JSONs

**Sintoma:** Una recomendacion referencia `tpl-015` pero ese template no existe.

**Deteccion:** Error en runtime al intentar cargar el template.

**Correccion:** Verificar que todos los IDs en `templates[]` de cada recomendacion tengan correspondencia en `templates.json`. Lo mismo aplica para `finalRecommendationId` en el arbol de decisiones.

#### Error 3: Nodo sin salida en el arbol

**Sintoma:** Una opcion tiene `nextStepId: "step-xyz"` pero `step-xyz` no existe en `steps`.

**Deteccion:** Error en runtime al intentar navegar.

**Correccion:** Verificar que todo `nextStepId` no nulo apunte a un step existente. Verificar que toda opcion tenga `nextStepId` o `finalRecommendationId`.

#### Error 4: Discrepancia de conteos

**Sintoma:** `totalChecklists: 4` pero solo hay 3 checklists en el objeto.

**Deteccion:** Inconsistencia visual; puede causar errores de UI.

**Correccion:** Actualizar el campo de conteo al agregar o eliminar entradas. Campos afectados: `totalRecommendations`, `totalChecklists`, `totalPaths`, `totalTerms`, `termCount`, `totalItems`, `criticalItems`.

#### Error 5: JSON invalido (sintaxis)

**Sintoma:** Error de parseo al cargar el archivo.

**Causas comunes:**
- Coma final despues del ultimo elemento de un array u objeto
- Comillas simples en lugar de dobles
- Caracteres especiales no escapados en strings

**Correccion:** Usar un validador JSON (como `jsonlint`) o el linter de VS Code.

#### Error 6: Campo faltante requerido

**Sintoma:** Un componente espera `recommendation.process.phases` pero el campo no existe.

**Correccion:** Revisar el tipo TypeScript correspondiente y asegurar que todos los campos requeridos esten presentes. Los campos opcionales estan marcados con `?` en los tipos.

### Script de validacion recomendado

Para validar la integridad referencial entre archivos, se recomienda ejecutar verificaciones como:

```typescript
// Verificar que todos los finalRecommendationId existan
const tree = require('./data/decision-tree.json');
const recs = require('./data/recommendations.json');

for (const [stepId, step] of Object.entries(tree.steps)) {
  for (const option of step.options) {
    if (option.finalRecommendationId) {
      if (!recs.recommendations[option.finalRecommendationId]) {
        console.error(
          `Referencia rota: ${stepId} -> ${option.id} apunta a ` +
          `${option.finalRecommendationId} que no existe en recommendations.json`
        );
      }
    }
  }
}
```

---

## Apendice: Resumen de todos los IDs existentes

### Recomendaciones (13 total)

`rec-001` a `rec-010` (y posiblemente hasta `rec-013` segun `totalRecommendations`).

### Checklists (4 total)

`chk-001` (Pre-Desarrollo), `chk-002` (Desarrollo), `chk-003`, `chk-004`.

### Templates

En `templates.json`: `template-001` (SRS), `template-002` (User Stories), `template-003` (Casos de Uso), `template-004` (SAD), y mas.

En `recommendations.json` referenciados como: `tpl-001`, `tpl-002`, `tpl-003`, `tpl-004`, `tpl-006`, `tpl-007`, `tpl-009`, `tpl-010`, `tpl-011`.

### Capitulos de glosario

`chapter-1.json` a `chapter-6.json`, mas `index.json`.

### Capitulos de contenido

`chapter-1.json` a `chapter-6.json` (actualmente placeholders).

---

*Documento generado automaticamente. Verificar contra el codigo fuente para la version mas actualizada de las estructuras.*
