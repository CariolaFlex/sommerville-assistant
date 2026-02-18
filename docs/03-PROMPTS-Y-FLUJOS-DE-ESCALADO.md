# Prompts y Flujos de Escalado - Sommerville Assistant

**Guia practica y reutilizable para escalar el proyecto**

Ultima actualizacion: 2026-02-18
Version: 1.0

---

## Tabla de Contenidos

1. [Como Agregar un Nuevo Capitulo](#1-como-agregar-un-nuevo-capitulo)
2. [Como Agregar Nuevas Recomendaciones](#2-como-agregar-nuevas-recomendaciones)
3. [Como Agregar Nuevos Tipos de Diagramas](#3-como-agregar-nuevos-tipos-de-diagramas)
4. [Como Agregar Nuevas Secciones al Wizard](#4-como-agregar-nuevas-secciones-al-wizard)
5. [Como Agregar Nuevas Plantillas y Checklists](#5-como-agregar-nuevas-plantillas-y-checklists)
6. [Prompts Reutilizables](#6-prompts-reutilizables)
7. [Flujo de Escalado por Fases](#7-flujo-de-escalado-por-fases)

---

## 1. Como Agregar un Nuevo Capitulo

Los capitulos se almacenan en archivos JSON individuales en `src/data/core/chapters/`. Actualmente existen 6 capitulos (chapter-1.json a chapter-6.json), todos en estado placeholder (completeness: 0). El libro de Sommerville tiene 27 capitulos.

### 1.1 Estructura JSON del Capitulo

Archivo: `src/data/core/chapters/chapter-{N}.json`

El schema de validacion se encuentra en `src/data/core/content-schema.ts` y utiliza Zod. Toda estructura de capitulo debe pasar `validateChapter()`.

```json
{
  "id": "chapter-7",
  "number": 7,
  "title": "Diseno e Implementacion",
  "description": "Cubre los principios de diseno de software y su relacion con la implementacion, incluyendo patrones de diseno, reutilizacion de codigo y desarrollo orientado a objetos.",
  "sections": [
    {
      "id": "ch7-sec1",
      "title": "Diseno orientado a objetos con UML",
      "content": "El diseno orientado a objetos es un enfoque donde los componentes del sistema se organizan como un conjunto de objetos que interactuan entre si...",
      "subsections": [
        {
          "id": "ch7-sec1-1",
          "title": "Objetos y clases",
          "content": "Una clase es una plantilla que define atributos y metodos...",
          "keyPoints": [
            "Las clases definen la estructura y comportamiento de los objetos",
            "El encapsulamiento oculta los detalles internos"
          ]
        }
      ],
      "keyPoints": [
        "UML proporciona notaciones estandar para documentar el diseno",
        "Los diagramas de clase son los mas usados en diseno OO"
      ],
      "diagrams": ["class-diagram-example"],
      "pageNumber": 175
    }
  ],
  "concepts": [
    {
      "id": "ch7-concept-design-patterns",
      "name": "Patrones de Diseno",
      "category": "architectural-pattern",
      "definition": "Soluciones reutilizables y probadas a problemas recurrentes de diseno de software que describen la interaccion entre clases y objetos.",
      "whenToUse": "Cuando enfrentas un problema de diseno que se repite frecuentemente y necesitas una solucion probada y documentada.",
      "whenNotToUse": "Cuando el problema es trivial y la aplicacion del patron anade complejidad innecesaria al sistema.",
      "examples": [
        "Observer para notificar cambios de estado a multiples componentes",
        "Strategy para intercambiar algoritmos en tiempo de ejecucion"
      ],
      "relatedConcepts": ["ch7-concept-oo-design", "ch6-concept-architecture"],
      "chapterReference": "chapter-7",
      "tags": ["diseno", "patrones", "reutilizacion", "GOF"]
    }
  ],
  "practices": [
    {
      "id": "ch7-practice-refactoring",
      "name": "Refactoring",
      "description": "Proceso de modificar la estructura interna del codigo sin cambiar su comportamiento externo para mejorar su legibilidad y mantenibilidad.",
      "steps": [
        "Identificar el codigo que necesita mejora (code smells)",
        "Escribir pruebas unitarias para cubrir el comportamiento actual",
        "Aplicar la refactorizacion en pasos pequenos",
        "Ejecutar pruebas despues de cada cambio",
        "Verificar que el comportamiento externo no cambio"
      ],
      "benefits": [
        "Mejora la legibilidad del codigo",
        "Reduce la deuda tecnica",
        "Facilita futuros cambios"
      ],
      "challenges": [
        "Requiere cobertura de pruebas adecuada",
        "Puede introducir bugs si no se hace con cuidado"
      ],
      "applicableIn": ["Todos los tipos de proyecto"],
      "priority": "recommended",
      "relatedConcepts": ["ch7-concept-design-patterns"],
      "tools": ["IDE con soporte de refactoring", "ESLint", "SonarQube"]
    }
  ],
  "examples": [
    {
      "id": "ch7-example-observer",
      "name": "Patron Observer en sistema de notificaciones",
      "description": "Ejemplo practico del patron Observer aplicado a un sistema que notifica a multiples subscriptores cuando ocurre un evento.",
      "domain": "Sistemas de notificacion",
      "illustrates": ["ch7-concept-design-patterns"]
    }
  ],
  "references": [
    {
      "fromConcept": "ch7-concept-design-patterns",
      "toConcept": "ch6-concept-architecture",
      "relationshipType": "extends",
      "description": "Los patrones de diseno extienden los conceptos de arquitectura a nivel de componentes individuales."
    }
  ],
  "metadata": {
    "lastUpdated": "2026-02-18",
    "extractedBy": "Claude Code",
    "completeness": 80,
    "notes": "Contenido principal extraido. Faltan ejemplos de codigo."
  }
}
```

### 1.2 Campos requeridos por el schema Zod

Revisando `src/data/core/content-schema.ts`, estos son los campos obligatorios:

| Campo | Tipo | Validacion |
|-------|------|------------|
| `id` | string | Regex `/^chapter-\d+$/` |
| `number` | number | Min 1, max 10 (NOTA: ampliar para capitulos 7-27) |
| `title` | string | Min 1 caracter |
| `description` | string | Min 10 caracteres |
| `sections` | array | Min 1 seccion |
| `concepts` | array | Puede estar vacio |
| `practices` | array | Puede estar vacio |
| `examples` | array | Puede estar vacio |
| `references` | array | Puede estar vacio |
| `metadata.lastUpdated` | string | Formato YYYY-MM-DD |
| `metadata.extractedBy` | string | Min 1 caracter |
| `metadata.completeness` | number | 0-100 |

**IMPORTANTE**: El schema actual limita `number` a max 10. Para capitulos 7-27, debes modificar `content-schema.ts`:

```typescript
// En src/data/core/content-schema.ts, linea ~104
// CAMBIAR:
number: z.number().int().min(1).max(10),
// POR:
number: z.number().int().min(1).max(27),
```

### 1.3 Categorias validas para conceptos

El campo `category` en conceptos solo acepta estos valores (definidos en `ConceptSchema`):

- `fundamental-concept`
- `process-model`
- `agile-practice`
- `requirement-type`
- `requirement-technique`
- `modeling-technique`
- `uml-diagram`
- `architectural-pattern`
- `architectural-style`
- `future-chapter`

Para capitulos nuevos que introduzcan categorias nuevas (ej: testing, seguridad, gestion), hay que extender el `z.enum()` en `content-schema.ts`.

### 1.4 Terminos de Glosario a agregar

Los terminos de glosario se almacenan en dos ubicaciones:

**Archivo por capitulo**: `src/data/glossary/chapter-{N}.json`

Formato del archivo por capitulo (array simple):

```json
[
  {
    "Nombre": "Patron Observer",
    "Categoria": "Patron de diseno",
    "Descripcion breve": "Patron que define una dependencia uno-a-muchos entre objetos para que cuando uno cambie de estado, todos sus dependientes sean notificados"
  },
  {
    "Nombre": "Encapsulamiento",
    "Categoria": "Principio OO",
    "Descripcion breve": "Principio de ocultar los detalles internos de implementacion de un objeto"
  }
]
```

**Indice global**: `src/data/glossary/index.json`

Formato del indice (estructura indexada con metadatos):

```json
{
  "version": "1.5",
  "lastUpdated": "2026-02-18",
  "totalTerms": 2200,
  "chapters": [
    {
      "chapter": 7,
      "title": "Diseno e Implementacion",
      "termCount": 45,
      "terms": [
        {
          "id": "cap7-001",
          "nombre": "Patron Observer",
          "categoria": "Patron de diseno",
          "descripcionBreve": "Patron que define una dependencia uno-a-muchos...",
          "capitulo": 7,
          "keywords": ["patron", "observer", "notificacion"],
          "relatedTerms": ["cap7-002"]
        }
      ]
    }
  ]
}
```

### 1.5 Pasos completos para agregar un capitulo

1. **Modificar el schema** (si es capitulo > 10): Cambiar `.max(10)` a `.max(27)` en `src/data/core/content-schema.ts`.

2. **Crear el archivo JSON del capitulo**: `src/data/core/chapters/chapter-{N}.json` siguiendo la estructura de la seccion 1.1.

3. **Crear el glosario del capitulo**: `src/data/glossary/chapter-{N}.json` con todos los terminos del capitulo.

4. **Actualizar el indice del glosario**: Agregar la entrada del nuevo capitulo en `src/data/glossary/index.json`, incrementar `totalTerms` y actualizar `version` y `lastUpdated`.

5. **Verificar la validacion**: Ejecutar la funcion `validateChapter()` importada desde `content-schema.ts` para confirmar que el JSON es valido.

6. **Actualizar decision-tree.json (si aplica)**: Si el nuevo capitulo introduce conceptos referenciados por el wizard, agregar las referencias en `src/data/decision-tree.json`.

---

## 2. Como Agregar Nuevas Recomendaciones

Las recomendaciones son el resultado final del wizard. Se almacenan en `src/data/recommendations.json` y se navegan a traves de `src/data/decision-tree.json`.

### 2.1 Estructura del arbol de decisiones

Archivo: `src/data/decision-tree.json`

El arbol tiene un `rootStepId` ("step-root") y un mapa de `steps`. Cada step tiene:

```json
{
  "steps": {
    "step-nuevo-tipo": {
      "id": "step-nuevo-tipo",
      "type": "branch",
      "question": "¿Cual es la escala de usuarios esperada?",
      "description": "La escala de usuarios afecta directamente las decisiones de arquitectura.",
      "chapter": 5,
      "options": [
        {
          "id": "opt-nuevo-pocos",
          "label": "Pocos usuarios (<100)",
          "description": "Sistema para uso interno o equipo pequeno",
          "examples": ["App interna de equipo", "Herramienta personal"],
          "icon": "User",
          "nextStepId": "step-siguiente-paso",
          "characteristics": {
            "escala": "Pequena",
            "concurrencia": false
          },
          "whenToChoose": [
            "Uso interno solamente",
            "Sin picos de carga"
          ]
        },
        {
          "id": "opt-nuevo-muchos",
          "label": "Muchos usuarios (>10,000)",
          "description": "Plataforma publica con escalabilidad requerida",
          "examples": ["Red social", "Marketplace"],
          "icon": "Users",
          "nextStepId": "step-otro-paso",
          "characteristics": {
            "escala": "Grande",
            "concurrencia": true
          },
          "whenToChoose": [
            "Plataforma publica",
            "Necesitas escalar horizontalmente"
          ]
        }
      ]
    }
  }
}
```

Los steps terminales (hojas del arbol) tienen `type: "leaf"` y un campo `recommendationId`:

```json
{
  "step-hoja-final": {
    "id": "step-hoja-final",
    "type": "leaf",
    "question": "Recomendacion: Sistema Web Escalable",
    "description": "Basandose en tus respuestas, recomendamos...",
    "chapter": 6,
    "recommendationId": "rec-014",
    "options": []
  }
}
```

### 2.2 Estructura de una recomendacion

Archivo: `src/data/recommendations.json`

Cada recomendacion tiene esta estructura completa (ejemplo basado en `rec-001`):

```json
{
  "rec-014": {
    "id": "rec-014",
    "title": "IoT Industrial -> Sensores -> Red Local",
    "path": ["IoT", "Sensores", "Red Local"],
    "pathDescription": "Sistema IoT Industrial -> Sensores Distribuidos -> Red Local",
    "process": {
      "name": "Iterativo Incremental + Prototipado",
      "chapter": 2,
      "why": [
        "Hardware requiere validacion temprana con prototipos",
        "Requisitos de comunicacion pueden cambiar con pruebas de campo"
      ],
      "how": [
        "Fase 1: Prototipado de hardware y firmware",
        "Fase 2: Desarrollo iterativo del software de control",
        "Fase 3: Pruebas de integracion en campo"
      ],
      "phases": [
        {
          "name": "Prototipado de Hardware",
          "duration": "4-6 semanas",
          "activities": [
            "Seleccion de sensores y microcontroladores",
            "Diseno de circuitos basicos"
          ],
          "inputs": ["Especificacion de sensores"],
          "outputs": ["Prototipo funcional"],
          "gate": {
            "name": "Prototype Review",
            "criteria": ["Prototipo lee datos correctamente"],
            "approvers": ["Ingeniero de Hardware"]
          }
        }
      ]
    },
    "methodology": {
      "name": "Agil + Prototipado Rapido",
      "chapter": 3,
      "adaptations": [
        "Sprints de 1 semana para firmware",
        "Demos fisicas en lugar de demos de software"
      ],
      "ceremonies": [
        {
          "name": "Demo de prototipo",
          "frequency": "Al final de cada sprint",
          "participants": ["Equipo", "Ingenieros de campo"],
          "purpose": "Validar que el prototipo funciona en condiciones reales"
        }
      ],
      "roles": [
        {
          "name": "Firmware Developer",
          "responsibilities": ["Desarrollo de firmware para sensores"]
        }
      ]
    },
    "requirements": {
      "approach": "Iterativa con validacion en campo",
      "chapter": 4,
      "techniques": [
        {
          "name": "Observacion en campo",
          "when": "Etapa inicial",
          "how": "Visitar sitio de instalacion",
          "chapter": 4
        }
      ]
    },
    "modeling": {
      "approach": "Modelos simples con diagramas de estado",
      "chapter": 5,
      "diagrams": [
        {
          "type": "Diagrama de estados del sensor",
          "purpose": "Modelar estados de operacion del sensor",
          "when": "Fase de diseno de firmware"
        }
      ]
    },
    "architecture": {
      "style": "Edge Computing + Gateway",
      "chapter": 6,
      "pattern": "Event-Driven con buffer local",
      "justification": "Sensores necesitan procesamiento local antes de enviar a la nube",
      "layers": [
        {
          "name": "Capa de Sensores",
          "components": ["Sensor de temperatura", "Sensor de presion"],
          "technology": "Firmware en C/Rust",
          "responsibility": "Captura y pre-procesamiento de datos"
        },
        {
          "name": "Capa Gateway",
          "components": ["Gateway MQTT", "Buffer local"],
          "technology": "Raspberry Pi + Node.js",
          "responsibility": "Agregacion y envio de datos"
        }
      ],
      "qualityAttributes": [
        {
          "attribute": "Fiabilidad",
          "tactic": "Buffer local ante desconexion",
          "chapter": 6
        }
      ]
    },
    "timeline": {
      "totalWeeks": 16,
      "phases": [
        {
          "name": "Prototipado",
          "weeks": "1-4",
          "milestone": "Prototipo funcional validado"
        },
        {
          "name": "Desarrollo firmware",
          "weeks": "5-10",
          "milestone": "Firmware estable en sensores"
        },
        {
          "name": "Integracion",
          "weeks": "11-14",
          "milestone": "Sistema completo funcionando"
        },
        {
          "name": "Despliegue en campo",
          "weeks": "15-16",
          "milestone": "Sistema operativo"
        }
      ]
    },
    "avoid": {
      "practices": [
        {
          "name": "Big Bang Integration",
          "why": "Con hardware, integrar todo al final garantiza fallos",
          "instead": "Integracion incremental desde el primer prototipo"
        }
      ]
    },
    "project_characteristics": {
      "projectSize": "Mediano (10,000-50,000 LOC)",
      "teamSize": "4-10 personas",
      "timeline": "3-12 meses",
      "criticality": "Alta",
      "requirementsStability": "Moderadamente volatil",
      "riskTolerance": "Bajo",
      "regulatoryCompliance": "Moderado",
      "budget": "Medio"
    },
    "references": [
      {
        "chapter": 2,
        "topic": "Modelos de proceso iterativo"
      }
    ]
  }
}
```

### 2.3 Convenciones de nombres

- **ID de recomendacion**: `rec-XXX` donde XXX es un numero secuencial de 3 digitos (001-999). Actualmente van hasta `rec-013`.
- **ID de step**: `step-{descriptor-kebab-case}`. Ejemplo: `step-iot-network-type`.
- **ID de opcion**: `opt-{descriptor-kebab-case}`. Ejemplo: `opt-local-network`.
- **path**: Array de strings cortos que describen el camino en el arbol. Ejemplo: `["IoT", "Sensores", "Red Local"]`.

### 2.4 Pasos para agregar una nueva recomendacion

1. **Definir el path en decision-tree.json**:
   - Crear los steps intermedios (tipo `"branch"`) con sus opciones.
   - Crear el step final (tipo `"leaf"`) con el `recommendationId`.
   - Conectar las opciones del step padre al nuevo step via `nextStepId`.
   - Actualizar `totalPaths` en el metadata.

2. **Crear la recomendacion en recommendations.json**:
   - Agregar la nueva entrada en el mapa `recommendations`.
   - Completar todas las secciones: `process`, `methodology`, `requirements`, `modeling`, `architecture`, `timeline`, `avoid`, `project_characteristics`.
   - Actualizar `totalRecommendations` en el metadata.

3. **Verificar que los diagramas se generan**:
   - El nombre del `process.name` debe matchear alguna de las condiciones en `src/utils/diagram-generators/process-diagram.ts` (cascada, iterativo, scrum, xp, spiral, prototipo). Si es un proceso nuevo, se usara `generateGenericProcessDiagram()`.
   - El `architecture.style` debe ser interpretable por `src/utils/diagram-generators/architecture-diagram.ts`.

4. **Probar la navegacion completa**: Recorrer el arbol desde `step-root` hasta la nueva hoja para confirmar que se llega a la recomendacion.

---

## 3. Como Agregar Nuevos Tipos de Diagramas

### 3.1 Arquitectura actual de diagramas

Los diagramas usan Mermaid.js y siguen esta estructura de archivos:

```
src/utils/diagram-generators/
  helpers.ts                    -- Funciones utilitarias compartidas
  process-diagram.ts            -- Diagramas de proceso (cascada, scrum, etc.)
  architecture-diagram.ts       -- Diagramas de arquitectura del sistema
  decision-tree-diagram.ts      -- Diagrama del camino de decision del wizard
  timeline.ts                   -- Diagrama Gantt del timeline del proyecto
```

Cada generador es una funcion que recibe datos tipados y retorna un string con codigo Mermaid.

### 3.2 Crear un nuevo generador de diagramas

Ejemplo: crear un generador de diagramas de secuencia.

**Paso 1**: Crear el archivo `src/utils/diagram-generators/sequence-diagram.ts`:

```typescript
import type { Recommendation } from '@/types/recommendation';
import { sanitizeMermaidText, resetNodeCounter } from './helpers';

/**
 * Genera un diagrama de secuencia UML basado en la recomendacion.
 */
export function generateSequenceDiagram(recommendation: Recommendation): string {
  resetNodeCounter();

  const processName = recommendation.process?.name?.toLowerCase() || '';

  if (processName.includes('scrum')) {
    return generateScrumSequence();
  } else if (processName.includes('cascada')) {
    return generateWaterfallSequence();
  } else {
    return generateGenericSequence(recommendation);
  }
}

function generateScrumSequence(): string {
  return `sequenceDiagram
    participant PO as Product Owner
    participant SM as Scrum Master
    participant Dev as Equipo Dev
    participant Client as Cliente

    PO->>Dev: Presenta Sprint Backlog
    SM->>Dev: Facilita Sprint Planning
    loop Cada dia
        Dev->>SM: Daily Standup
        SM->>Dev: Resuelve impedimentos
    end
    Dev->>PO: Entrega incremento
    PO->>Client: Sprint Review
    Client-->>PO: Feedback
    Dev->>Dev: Retrospectiva`;
}

function generateWaterfallSequence(): string {
  return `sequenceDiagram
    participant Client as Cliente
    participant Analyst as Analista
    participant Arch as Arquitecto
    participant Dev as Desarrollador
    participant QA as Testing

    Client->>Analyst: Requisitos del sistema
    Analyst->>Arch: Documento SRS aprobado
    Arch->>Dev: Diseno arquitectonico
    Dev->>QA: Codigo implementado
    QA->>Client: Sistema probado y validado
    Client-->>QA: Aceptacion formal`;
}

function generateGenericSequence(recommendation: Recommendation): string {
  const processName = sanitizeMermaidText(recommendation.process?.name || 'Proceso');
  return `sequenceDiagram
    participant User as Usuario
    participant System as ${processName}
    participant DB as Base de Datos

    User->>System: Solicita accion
    System->>DB: Consulta datos
    DB-->>System: Retorna resultados
    System-->>User: Muestra respuesta`;
}
```

**Restricciones importantes de Mermaid para diagramas**:

- No usar caracteres especiales en nombres de participantes (evitar acentos, n con tilde).
- Las flechas validas son: `->>` (solida con punta), `-->>` (punteada con punta), `->>+` (activar participante), `->>-` (desactivar).
- Las etiquetas `participant X as "Nombre"` aceptan texto entre comillas si hay espacios.
- Mermaid no soporta bien texto largo en las flechas; mantener mensajes cortos (<40 caracteres).

### 3.3 Registrar el diagrama en DiagramsTab.tsx

Archivo: `src/components/results/DiagramsTab.tsx`

Agregar el import y la generacion del nuevo diagrama:

```typescript
// Agregar import
import { generateSequenceDiagram } from '@/utils/diagram-generators/sequence-diagram';
// Agregar icono
import { GitBranch, Workflow, Building2, Calendar, ArrowRightLeft } from 'lucide-react';

// Dentro del componente, generar el codigo:
const sequenceCode = generateSequenceDiagram(recommendation);

// Agregar la Card en el grid (dentro del return):
<Card>
  <CardHeader>
    <div className="flex items-center gap-2 mb-2">
      <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
        <ArrowRightLeft className="h-5 w-5 text-teal-600 dark:text-teal-400" />
      </div>
      <div>
        <CardTitle>Diagrama de Secuencia</CardTitle>
        <CardDescription className="mt-1">
          Interacciones entre actores y el sistema
        </CardDescription>
      </div>
    </div>
  </CardHeader>
  <CardContent>
    <DiagramViewer
      mermaidCode={sequenceCode}
      title="Diagrama de Secuencia"
      description="Flujo de mensajes entre participantes"
    />
  </CardContent>
</Card>
```

### 3.4 Agregar al pipeline de PDF

Archivo: `src/lib/pdf/utils/generate-diagrams.ts`

**Paso 1**: Actualizar la interfaz `DiagramsData`:

```typescript
export interface DiagramsData {
  decisionTree: string;
  process: string;
  architecture: string;
  timeline: string;
  sequence: string;  // NUEVO
}
```

**Paso 2**: Dentro de `generateDiagramsForPDF()`, agregar el import y la generacion:

```typescript
// Agregar al bloque de imports dinamicos:
const { generateSequenceDiagram } = await import(
  '@/utils/diagram-generators/sequence-diagram'
);

// Generar el codigo Mermaid (despues de los otros):
const sequenceCode = stripHtml(generateSequenceDiagram(recommendation));

// Renderizar (despues de los otros renderOne):
const sequence = await renderOne('sequence', sequenceCode);
```

**Paso 3**: Actualizar el return y la verificacion de exito:

```typescript
const anySuccess = decisionTree || process || architecture || timeline || sequence;
// ...
return { decisionTree, process, architecture, timeline, sequence };
```

**Paso 4**: Actualizar el componente PDF (`src/components/pdf/WizardResultPDFDocument.tsx`) para renderizar la nueva imagen.

### 3.5 Tips y restricciones de Mermaid

- **htmlLabels**: Para la version web, `htmlLabels: true` permite usar `<b>` y `<br/>`. Para la version PDF, se usa `htmlLabels: false` y se stripean tags HTML con la funcion `stripHtml()`.
- **Tamano maximo**: Los nodos con texto largo causan overflow. Usar `sanitizeMermaidText()` de helpers.ts y limitar a 50 caracteres con `escapeMermaidString()`.
- **Colores**: Usar el patron de estilos consistente del proyecto. Los colores Tailwind se mapean asi:
  - Azul: `fill:#dbeafe,stroke:#2563eb`
  - Morado: `fill:#ede9fe,stroke:#7c3aed`
  - Naranja: `fill:#fef3c7,stroke:#d97706`
  - Rojo: `fill:#fee2e2,stroke:#dc2626`
  - Verde: `fill:#d1fae5,stroke:#059669`
  - Amarillo: `fill:#fef9c3,stroke:#ca8a04`
  - Indigo: `fill:#c7d2fe,stroke:#4f46e5`
- **Tipos de diagrama soportados por Mermaid**: `flowchart`, `sequenceDiagram`, `classDiagram`, `stateDiagram-v2`, `gantt`, `erDiagram`, `pie`, `graph`.
- **Evitar**: Caracteres como `{}[]"` sin escapar en texto de nodos. Usar `sanitizeMermaidText()`.

---

## 4. Como Agregar Nuevas Secciones al Wizard

El proyecto tiene dos sistemas de wizard:

- **Wizard v1 (arbol de decision)**: Navegacion por pasos con `decision-tree.json`. Es el wizard principal.
- **Wizard v2 (preguntas con scoring)**: Cuestionario de 10 preguntas con algoritmo de scoring. Definido en `src/lib/wizard/questions.ts` y `src/lib/wizard/scoringAlgorithm.ts`.

### 4.1 Agregar preguntas al Wizard v2

Archivo: `src/lib/wizard/questions.ts`

**Estructura de una pregunta**:

```typescript
{
  id: 'q11',  // ID secuencial
  text: '¿Tu proyecto requiere integracion con sistemas legados?',
  type: 'single-choice',  // o 'multi-choice'
  category: 'legacy-integration',
  helpText: 'La integracion con sistemas legados puede requerir adaptadores y capas de compatibilidad.',
  options: [
    {
      value: 'none',
      label: 'Sin sistemas legados',
      description: 'Proyecto greenfield, sin integraciones heredadas',
      icon: 'Sparkles',  // Nombre del icono Lucide
    },
    {
      value: 'some',
      label: 'Algunos sistemas legados',
      description: 'Necesitas integrar con 1-3 sistemas existentes',
      icon: 'Link',
    },
    {
      value: 'many',
      label: 'Muchos sistemas legados',
      description: 'Entorno empresarial con multiples sistemas heredados',
      icon: 'Building2',
    },
  ],
},
```

**Pasos para agregar una pregunta**:

1. Agregar la pregunta al array `wizardQuestions` en `questions.ts`.
2. Agregar el campo al tipo `WizardAnswers` en `scoringAlgorithm.ts`:
   ```typescript
   export interface WizardAnswers {
     // ... existentes
     q11?: string; // legacy-integration
   }
   ```
3. Agregar el mapeo en `answerMapping` si los valores necesitan traduccion a texto legible.
4. Agregar la logica de scoring (ver seccion 4.2).

### 4.2 Actualizar el algoritmo de scoring

Archivo: `src/lib/wizard/scoringAlgorithm.ts`

El algoritmo asigna puntos por pregunta. Los pesos actuales suman 100:

| Pregunta | Categoria | Peso |
|----------|-----------|------|
| Q2 | Criticidad | 25 pts |
| Q6 | Estabilidad de reqs | 20 pts |
| Q4 | Tamano del equipo | 15 pts |
| Q1 | Tipo de proyecto | 15 pts |
| Q5 | Timeline | 10 pts |
| Q7 | Tolerancia al riesgo | 8 pts |
| Q8 | Cumplimiento regulatorio | 5 pts |
| Q10 | Presupuesto | 2 pts |

Para agregar una nueva pregunta (ej: Q11), agregar un bloque nuevo:

```typescript
// ========================================
// Q11: LEGACY INTEGRATION (Peso: X puntos)
// ========================================
if (answers.q11) {
  if (answers.q11 === 'many') {
    // Muchos legados -> procesos incrementales, cascada adaptada
    if (recProcessName.includes('incremental') || recTitle.includes('transaccional')) {
      score += 5;
    }
  } else if (answers.q11 === 'none') {
    // Sin legados -> startup, agil puro
    if (recTitle.includes('startup') || recProcessName.includes('xp')) {
      score += 5;
    }
  }
}
```

**IMPORTANTE**: Al agregar puntos nuevos, los scores totales pueden exceder 100. La funcion ya maneja esto con `Math.min(Math.max(score, 0), maxScore)`, pero conviene redistribuir los pesos para que la suma de maximos sea cercana a 100.

### 4.3 Agregar pasos al Wizard v1 (decision-tree.json)

Para agregar un nuevo paso en el arbol de decisiones v1:

1. Crear un nuevo step en `decision-tree.json` con un `id` unico.
2. En el step padre, agregar una opcion cuyo `nextStepId` apunte al nuevo step.
3. Si el step tiene opciones que llevan a recomendaciones existentes, usar `nextStepId` apuntando a steps tipo `"leaf"`.
4. Si el step es una nueva hoja, definir `type: "leaf"` y un `recommendationId`.

El flujo actual del arbol (simplificado):

```
step-root (8 opciones de tipo de sistema)
  -> step-critical-requirements (requisitos estables vs volatiles)
    -> step-critical-team-size (tamano del equipo)
      -> step-hoja (leaf con rec-001, rec-002, rec-003)
  -> step-web-context (escala del proyecto)
    -> step-web-team (tamano del equipo)
      -> step-hoja (leaf con rec-005, rec-006, rec-007)
  ... (mas ramas)
```

---

## 5. Como Agregar Nuevas Plantillas y Checklists

### 5.1 Estructura de plantillas

Archivo: `src/data/templates.json`

```json
{
  "id": "template-010",
  "name": "Plan de Pruebas de Software",
  "category": "testing",
  "description": "Template para crear un plan de pruebas completo...",
  "methodology": ["all"],
  "format": "markdown",
  "difficulty": "intermediate",
  "estimatedTime": "2-3 horas",
  "sections": [
    {
      "title": "1. Estrategia de Pruebas",
      "subsections": ["1.1 Alcance", "1.2 Tipos de pruebas"],
      "content": "# 1. Estrategia de Pruebas\n\n## 1.1 Alcance\n\n**Sistema bajo prueba:** [NOMBRE]\n\n**Componentes incluidos:**\n- [Componente 1]\n- [Componente 2]\n\n## 1.2 Tipos de Pruebas\n\n| Tipo | Herramienta | Cobertura Minima |\n|------|-------------|------------------|\n| Unitarias | Jest/Vitest | 80% |\n| Integracion | Supertest | Todos los endpoints |\n| E2E | Cypress/Playwright | Flujos criticos |",
      "instructions": "Adapte los tipos de prueba a su stack tecnologico."
    }
  ],
  "tags": ["testing", "qa", "plan-de-pruebas"],
  "references": {
    "sommerville": ["chapter-8"]
  },
  "relatedTemplates": ["template-001"]
}
```

**Campos obligatorios de una plantilla**:

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| `id` | string | `template-XXX` secuencial |
| `name` | string | Nombre descriptivo |
| `category` | string | `requirements`, `design`, `testing`, `management`, `architecture` |
| `description` | string | Descripcion de uso |
| `methodology` | string[] | `["all"]`, `["scrum", "xp"]`, etc. |
| `format` | string | Siempre `"markdown"` |
| `difficulty` | string | `"basic"`, `"intermediate"`, `"advanced"` |
| `estimatedTime` | string | Tiempo estimado para completar |
| `sections` | array | Al menos 1 seccion con `title`, `content`, `instructions` |
| `tags` | string[] | Tags para filtrado |
| `references.sommerville` | string[] | Capitulos de referencia, ej: `["chapter-8"]` |
| `relatedTemplates` | string[] | IDs de plantillas relacionadas |

### 5.2 Estructura de checklists

Archivo: `src/data/checklists.json`

```json
{
  "chk-005": {
    "id": "chk-005",
    "name": "Revision de Seguridad Pre-Deploy",
    "category": "Seguridad",
    "description": "Verificacion de seguridad antes de desplegar a produccion",
    "chapter": 6,
    "applicableFor": ["web", "saas", "transactional"],
    "estimatedTime": "1-2 horas",
    "sections": [
      {
        "title": "Autenticacion y Autorizacion",
        "items": [
          {
            "id": "chk-005-001",
            "text": "¿Todas las rutas sensibles requieren autenticacion?",
            "critical": true,
            "help": "Verificar middleware de auth en todas las rutas protegidas"
          },
          {
            "id": "chk-005-002",
            "text": "¿Los tokens JWT tienen expiracion razonable (<24h)?",
            "critical": true
          },
          {
            "id": "chk-005-003",
            "text": "¿Se implemento rate limiting en endpoints publicos?",
            "critical": false,
            "examples": [
              "Login: max 5 intentos por minuto",
              "API publica: max 100 requests por minuto"
            ]
          }
        ]
      },
      {
        "title": "Datos Sensibles",
        "items": [
          {
            "id": "chk-005-004",
            "text": "¿Las contrasenas se almacenan como hash (bcrypt/argon2)?",
            "critical": true
          },
          {
            "id": "chk-005-005",
            "text": "¿Los logs NO contienen datos personales?",
            "critical": true,
            "help": "Revisar que no se logueen passwords, tokens o datos PII"
          }
        ]
      }
    ]
  }
}
```

**Campos obligatorios de un item de checklist**:

| Campo | Tipo | Descripcion |
|-------|------|-------------|
| `id` | string | `chk-XXX-YYY` (checklist-item) |
| `text` | string | Pregunta de verificacion |
| `critical` | boolean | Si es un item critico (bloqueante) |
| `help` | string (opcional) | Texto de ayuda adicional |
| `examples` | string[] (opcional) | Ejemplos de buenas/malas practicas |

### 5.3 Vincular plantillas a recomendaciones

Las plantillas se vinculan a recomendaciones mediante el campo `references.sommerville` en la plantilla. La UI filtra plantillas por capitulo y metodologia.

Para vincular una plantilla a una recomendacion especifica, se debe:

1. En la plantilla, agregar los capitulos relevantes en `references.sommerville`.
2. En la plantilla, especificar las metodologias compatibles en `methodology`.
3. La UI mostrara automaticamente las plantillas relevantes cuando el usuario vea una recomendacion cuyo `process.chapter` o `methodology.chapter` coincida con los capitulos de la plantilla.

---

## 6. Prompts Reutilizables

Los siguientes prompts estan disenados para usarse con un LLM (Claude, GPT, etc.) para generar contenido estructurado para el proyecto.

### 6.1 Prompt para generar un capitulo JSON completo

```
Genera el contenido completo para el capitulo {N} del libro "Ingenieria de Software" de Ian Sommerville (10ma edicion) en formato JSON.

El capitulo se titula: "{TITULO_DEL_CAPITULO}"

El JSON debe seguir EXACTAMENTE esta estructura:

{
  "id": "chapter-{N}",
  "number": {N},
  "title": "{TITULO}",
  "description": "Descripcion de 2-3 oraciones del capitulo",
  "sections": [
    // Al menos 3-5 secciones principales del capitulo
    {
      "id": "ch{N}-sec{X}",
      "title": "Titulo de la seccion",
      "content": "Contenido extenso (minimo 100 palabras) explicando el tema...",
      "subsections": [
        // 2-4 subsecciones por seccion
        {
          "id": "ch{N}-sec{X}-{Y}",
          "title": "Titulo de subseccion",
          "content": "Contenido de la subseccion (minimo 50 palabras)...",
          "keyPoints": ["Punto clave 1", "Punto clave 2", "Punto clave 3"]
        }
      ],
      "keyPoints": ["Punto clave 1", "Punto clave 2"],
      "diagrams": [],
      "pageNumber": {PAGINA_APROXIMADA}
    }
  ],
  "concepts": [
    // 5-15 conceptos clave del capitulo
    {
      "id": "ch{N}-concept-{nombre-kebab}",
      "name": "Nombre del concepto",
      "category": "{CATEGORIA}",
      // category debe ser UNO de: fundamental-concept, process-model, agile-practice,
      // requirement-type, requirement-technique, modeling-technique, uml-diagram,
      // architectural-pattern, architectural-style, future-chapter
      "definition": "Definicion completa del concepto (minimo 30 palabras)",
      "whenToUse": "Cuando usar este concepto (minimo 20 palabras)",
      "whenNotToUse": "Cuando NO usar este concepto (minimo 20 palabras)",
      "examples": ["Ejemplo 1", "Ejemplo 2"],
      "relatedConcepts": ["IDs de conceptos relacionados"],
      "chapterReference": "chapter-{N}",
      "tags": ["tag1", "tag2"]
    }
  ],
  "practices": [
    // 3-8 practicas del capitulo
    {
      "id": "ch{N}-practice-{nombre-kebab}",
      "name": "Nombre de la practica",
      "description": "Descripcion (minimo 30 palabras)",
      "steps": ["Paso 1", "Paso 2", "Paso 3"],
      "benefits": ["Beneficio 1", "Beneficio 2"],
      "challenges": ["Desafio 1", "Desafio 2"],
      "applicableIn": ["Contexto 1", "Contexto 2"],
      "priority": "essential|recommended|optional",
      "relatedConcepts": [],
      "tools": ["Herramienta 1"]
    }
  ],
  "examples": [
    // 2-5 ejemplos practicos
    {
      "id": "ch{N}-example-{nombre-kebab}",
      "name": "Nombre del ejemplo",
      "description": "Descripcion del ejemplo (minimo 30 palabras)",
      "domain": "Dominio de aplicacion",
      "illustrates": ["IDs de conceptos que ilustra"]
    }
  ],
  "references": [
    // 2-5 referencias cruzadas a otros capitulos
    {
      "fromConcept": "ch{N}-concept-xxx",
      "toConcept": "ch{M}-concept-yyy",
      "relationshipType": "extends|uses|requires|alternative|complements|implements",
      "description": "Descripcion de la relacion (minimo 15 palabras)"
    }
  ],
  "metadata": {
    "lastUpdated": "{FECHA_HOY_YYYY-MM-DD}",
    "extractedBy": "Claude Code",
    "completeness": 80,
    "notes": "Contenido generado automaticamente. Revisar y validar."
  }
}

REGLAS:
- Todo el contenido debe estar en ESPANOL
- Los IDs deben ser unicos y seguir la convencion kebab-case
- El campo "definition" y "content" deben ser informativos y precisos
- Los "keyPoints" deben ser concisos (1 frase cada uno)
- Incluir referencias cruzadas a capitulos anteriores cuando sea posible
- No inventar informacion: basarse en los temas reales del libro de Sommerville
```

### 6.2 Prompt para generar un perfil de recomendacion

```
Genera una recomendacion completa para el Sommerville Assistant en formato JSON.

Contexto: El usuario ha seleccionado este camino en el arbol de decisiones:
- Tipo de sistema: {TIPO}
- Caracteristica clave: {CARACTERISTICA}
- Tamano del equipo: {TAMANO}

La recomendacion debe cubrir TODOS estos aspectos basandose en los capitulos 1-6 de Sommerville:

{
  "rec-{NNN}": {
    "id": "rec-{NNN}",
    "title": "{TIPO} -> {CARACTERISTICA} -> {TAMANO}",
    "path": ["{TIPO}", "{CARACTERISTICA}", "{TAMANO}"],
    "pathDescription": "Descripcion legible del camino completo",

    "process": {
      "name": "{PROCESO_RECOMENDADO}",
      // Debe ser uno de: Cascada, Cascada + RUP, Iterativo Incremental,
      // Scrum, XP, Scrum + XP, Prototipado, Espiral
      "chapter": 2,
      "why": [
        // 3-5 razones de por que este proceso es el adecuado
      ],
      "how": [
        // 4-6 pasos de como implementar el proceso
      ],
      "phases": [
        // 3-6 fases detalladas con:
        {
          "name": "Nombre de la fase",
          "duration": "X-Y semanas",
          "activities": ["Actividad 1", "Actividad 2"],
          "inputs": ["Input 1"],
          "outputs": ["Output 1"],
          "gate": {
            "name": "Nombre del gate",
            "criteria": ["Criterio 1"],
            "approvers": ["Rol 1"]
          }
        }
      ]
    },

    "methodology": {
      "name": "{METODOLOGIA}",
      "chapter": 3,
      "adaptations": ["Adaptacion 1", "Adaptacion 2"],
      "ceremonies": [
        {
          "name": "Nombre ceremonia",
          "frequency": "Frecuencia",
          "participants": ["Rol 1"],
          "purpose": "Proposito"
        }
      ],
      "roles": [
        {
          "name": "Rol",
          "responsibilities": ["Responsabilidad 1"]
        }
      ]
    },

    "requirements": {
      "approach": "Enfoque de requerimientos",
      "chapter": 4,
      "techniques": [
        {
          "name": "Tecnica",
          "when": "Cuando usarla",
          "how": "Como aplicarla",
          "chapter": 4
        }
      ]
    },

    "modeling": {
      "approach": "Enfoque de modelado",
      "chapter": 5,
      "diagrams": [
        {
          "type": "Tipo de diagrama",
          "purpose": "Para que se usa",
          "when": "Cuando usarlo"
        }
      ]
    },

    "architecture": {
      "style": "{ESTILO_ARQUITECTONICO}",
      // Debe ser uno de: Monolitica, Capas (Layered), MVC,
      // Microservicios, Event-Driven, Cliente-Servidor, Pipe-and-Filter
      "chapter": 6,
      "pattern": "Patron especifico",
      "justification": "Por que esta arquitectura",
      "layers": [
        {
          "name": "Nombre de capa",
          "components": ["Componente 1"],
          "technology": "Stack sugerido",
          "responsibility": "Responsabilidad"
        }
      ],
      "qualityAttributes": [
        {
          "attribute": "Atributo de calidad",
          "tactic": "Tactica para lograrlo",
          "chapter": 6
        }
      ]
    },

    "timeline": {
      "totalWeeks": 12,
      "phases": [
        {
          "name": "Fase",
          "weeks": "1-3",
          "milestone": "Entregable"
        }
      ]
    },

    "avoid": {
      "practices": [
        {
          "name": "Practica a evitar",
          "why": "Por que evitarla",
          "instead": "Que hacer en su lugar"
        }
      ]
    },

    "project_characteristics": {
      "projectSize": "Pequeno|Mediano|Grande",
      "teamSize": "1-3|4-10|10-30|30+",
      "timeline": "Semanas|1-3 meses|3-12 meses|12-36 meses",
      "criticality": "Baja|Media|Alta|Critica",
      "requirementsStability": "Muy estable|Estable|Moderadamente volatil|Muy volatil",
      "riskTolerance": "Muy bajo|Bajo|Medio|Alto",
      "regulatoryCompliance": "Estricto|Moderado|Minimo|Ninguno",
      "budget": "Bajo|Medio|Alto"
    },

    "references": [
      { "chapter": 2, "topic": "Tema relevante" }
    ]
  }
}

REGLAS:
- Todo en ESPANOL
- Ser especifico y practico, no generico
- Las duraciones deben sumar el totalWeeks del timeline
- Los "why" deben justificar basandose en las caracteristicas del proyecto
- La arquitectura debe ser coherente con el tipo de sistema
```

### 6.3 Prompt para generar terminos de glosario

```
Genera los terminos del glosario para el capitulo {N} ("{TITULO}") del libro "Ingenieria de Software" de Sommerville.

Necesito DOS formatos:

FORMATO 1 - Archivo chapter-{N}.json (array simple):
[
  {
    "Nombre": "Nombre del termino",
    "Categoria": "Categoria descriptiva",
    "Descripcion breve": "Descripcion de 1-2 oraciones (max 150 caracteres)"
  }
]

FORMATO 2 - Entrada para index.json (con metadatos):
{
  "chapter": {N},
  "title": "{TITULO}",
  "termCount": {TOTAL},
  "terms": [
    {
      "id": "cap{N}-001",
      "nombre": "Nombre del termino",
      "categoria": "Categoria",
      "descripcionBreve": "Descripcion breve",
      "capitulo": {N},
      "keywords": ["keyword1", "keyword2"],
      "relatedTerms": ["cap{N}-002"]
    }
  ]
}

REGLAS:
- Incluir TODOS los terminos tecnicos del capitulo (minimo 30 terminos)
- Las categorias deben ser descriptivas: "Tecnica de prueba", "Tipo de diagrama", etc.
- Los IDs siguen el formato cap{N}-{NNN} con numero secuencial de 3 digitos
- Las keywords deben ser palabras individuales utiles para busqueda
- relatedTerms vincula terminos que se mencionan juntos
- Todo en ESPANOL
```

### 6.4 Prompt para generar una plantilla

```
Genera una plantilla profesional para "{NOMBRE_PLANTILLA}" en formato JSON para el Sommerville Assistant.

La plantilla debe ser util para equipos que siguen metodologia {METODOLOGIA} y se relaciona con el capitulo {N} de Sommerville.

Formato requerido:
{
  "id": "template-{NNN}",
  "name": "{NOMBRE}",
  "category": "{CATEGORIA}",
  // category: requirements, design, testing, management, architecture, deployment
  "description": "Descripcion de 1-2 oraciones",
  "methodology": ["{METODOLOGIA}"],
  // Opciones: "all", "scrum", "xp", "waterfall", "agile", "rup"
  "format": "markdown",
  "difficulty": "{NIVEL}",
  // Opciones: "basic", "intermediate", "advanced"
  "estimatedTime": "{TIEMPO}",
  "sections": [
    {
      "title": "1. Titulo de Seccion",
      "subsections": ["1.1 Sub A", "1.2 Sub B"],
      "content": "# 1. Titulo\n\nContenido en Markdown...\n\n## 1.1 Sub A\n\n[PLACEHOLDER_PARA_USUARIO]...",
      "instructions": "Instrucciones de como completar esta seccion"
    }
  ],
  "tags": ["tag1", "tag2"],
  "references": {
    "sommerville": ["chapter-{N}"]
  },
  "relatedTemplates": []
}

REGLAS:
- El content debe ser Markdown valido con headers, tablas, listas y placeholders [ENTRE_CORCHETES]
- Incluir al menos 3 secciones sustanciales
- Cada seccion debe tener "instructions" claras
- Los placeholders deben ser descriptivos: [NOMBRE_DEL_SISTEMA], [FECHA], etc.
- El contenido debe ser profesional y basado en buenas practicas de la industria
- Todo en ESPANOL
```

---

## 7. Flujo de Escalado por Fases

### Fase 1: Completar capitulos 7-12

**Objetivo**: Expandir el contenido academico de 6 a 12 capitulos, cubriendo todo el nucleo de Sommerville.

**Capitulos a completar**:

| Capitulo | Titulo (Sommerville 10ma Ed.) | Prioridad |
|----------|------------------------------|-----------|
| 7 | Diseno e Implementacion | Alta |
| 8 | Pruebas de Software | Alta |
| 9 | Evolucion del Software | Media |
| 10 | Sistemas Confiables | Media |
| 11 | Ingenieria de Fiabilidad | Baja |
| 12 | Ingenieria de Seguridad | Baja |

**Pasos por capitulo**:

1. Modificar `content-schema.ts` para aceptar `number` hasta 27 (hacer una sola vez).
2. Para cada capitulo (7, 8, 9, ...):
   a. Usar el prompt 6.1 para generar `src/data/core/chapters/chapter-{N}.json`.
   b. Usar el prompt 6.3 para generar `src/data/glossary/chapter-{N}.json`.
   c. Actualizar `src/data/glossary/index.json` con la nueva entrada.
   d. Validar el JSON con `validateChapter()`.
   e. Revisar y corregir errores manuales.

**Cambios de codigo necesarios**:

- En `content-schema.ts`: cambiar `.max(10)` a `.max(27)`.
- Cualquier componente que asuma que solo hay 6 capitulos necesita revision. Buscar hardcoded `chapters.length` o arrays de 6 elementos.

**Estimacion**: 2-3 horas por capitulo con revision manual. Total: 12-18 horas para los 6 capitulos.

**Nuevas recomendaciones que se pueden crear con estos capitulos**:

- Capitulo 8 (Pruebas): Recomendaciones con estrategias de testing especificas por tipo de sistema.
- Capitulo 10 (Confiabilidad): Recomendaciones para sistemas con alta disponibilidad.
- Capitulo 12 (Seguridad): Recomendaciones para sistemas con requisitos de seguridad estrictos.

### Fase 2: Agregar diagramas avanzados

**Objetivo**: Expandir los 4 tipos de diagramas actuales (decision tree, proceso, arquitectura, timeline) a 8 tipos.

**Nuevos diagramas a agregar**:

| Diagrama | Tipo Mermaid | Uso | Prioridad |
|----------|-------------|-----|-----------|
| Secuencia | `sequenceDiagram` | Mostrar interacciones entre actores | Alta |
| Estado | `stateDiagram-v2` | Mostrar ciclo de vida de entidades | Alta |
| Clase | `classDiagram` | Mostrar estructura OO de la arquitectura | Media |
| Entidad-Relacion | `erDiagram` | Mostrar modelo de datos | Media |

**Pasos por cada diagrama nuevo**:

1. Crear `src/utils/diagram-generators/{tipo}-diagram.ts` con la funcion generadora.
2. Registrarlo en `src/components/results/DiagramsTab.tsx`.
3. Actualizar `DiagramsData` en `src/lib/pdf/utils/generate-diagrams.ts`.
4. Agregar la renderizacion en el pipeline PDF.
5. Actualizar el componente PDF si es necesario.

**Ejemplo de diagrama de estados**:

```typescript
// src/utils/diagram-generators/state-diagram.ts
export function generateStateDiagram(recommendation: Recommendation): string {
  return `stateDiagram-v2
    [*] --> Planificacion
    Planificacion --> Desarrollo: Requisitos aprobados
    Desarrollo --> Pruebas: Codigo completo
    Pruebas --> Revision: Pruebas pasan
    Pruebas --> Desarrollo: Defectos encontrados
    Revision --> Despliegue: Aprobado
    Revision --> Desarrollo: Cambios requeridos
    Despliegue --> Operacion: Deploy exitoso
    Operacion --> Mantenimiento: Incidencia reportada
    Mantenimiento --> Operacion: Fix aplicado
    Operacion --> [*]`;
}
```

**Estimacion**: 4-6 horas por tipo de diagrama. Total: 16-24 horas para 4 diagramas nuevos.

### Fase 3: Soporte multi-idioma

**Objetivo**: Agregar soporte para ingles ademas del espanol actual.

**Arquitectura propuesta**:

```
src/
  i18n/
    es.json          -- Traducciones en espanol (actual)
    en.json          -- Traducciones en ingles
    index.ts         -- Seleccion de idioma y funcion t()
  data/
    core/
      chapters/
        es/          -- Capitulos en espanol (mover archivos actuales aqui)
          chapter-1.json
        en/          -- Capitulos en ingles
          chapter-1.json
    glossary/
      es/            -- Glosarios en espanol
      en/            -- Glosarios en ingles
```

**Pasos principales**:

1. Instalar libreria i18n (next-intl o react-i18next).
2. Extraer todos los textos hardcodeados de la UI a archivos de traduccion.
3. Reorganizar la estructura de datos con subdirectorios por idioma.
4. Crear un context de idioma que envuelva la aplicacion.
5. Traducir los JSON de contenido al ingles (se puede usar el prompt 6.1 adaptado).
6. Actualizar los componentes para usar la funcion `t()` en lugar de strings directos.

**Estimacion**: 40-60 horas. Es un refactoring extenso.

### Fase 4: Funcionalidades colaborativas

**Objetivo**: Permitir que equipos usen el asistente juntos, compartan resultados y adapten recomendaciones.

**Funcionalidades propuestas**:

1. **Compartir resultados via URL**:
   - Codificar las respuestas del wizard y la recomendacion seleccionada en parametros de URL.
   - Generar un link compartible que reconstruya el estado.
   - Estimacion: 8-12 horas.

2. **Exportar/Importar configuraciones**:
   - Exportar las respuestas del wizard y personalizaciones a un archivo JSON.
   - Importar configuracion para restaurar estado.
   - Estimacion: 6-8 horas.

3. **Backend con persistencia** (requiere infraestructura):
   - Supabase o Firebase como backend.
   - Autenticacion de usuarios.
   - Guardar resultados del wizard por usuario.
   - Historial de recomendaciones consultadas.
   - Estimacion: 80-120 horas.

4. **Anotaciones en recomendaciones**:
   - Permitir al usuario agregar notas personales a cada recomendacion.
   - Almacenar en localStorage inicialmente, migrar a backend despues.
   - Estimacion: 12-16 horas.

**Orden recomendado**: 1 -> 2 -> 4 -> 3 (de menor a mayor complejidad).

---

## Apendice A: Mapa de archivos clave

```
src/
  data/
    core/
      chapters/
        chapter-1.json ... chapter-6.json    -- Capitulos (JSON)
      content-schema.ts                       -- Validacion Zod de capitulos
    glossary/
      chapter-1.json ... chapter-6.json      -- Glosarios por capitulo
      index.json                              -- Indice global de glosario
    decision-tree.json                        -- Arbol de decisiones v1
    recommendations.json                      -- 13 perfiles de recomendacion
    templates.json                            -- Plantillas descargables
    checklists.json                           -- Checklists interactivos
  lib/
    wizard/
      questions.ts                            -- Preguntas del wizard v2
      scoringAlgorithm.ts                     -- Algoritmo de scoring v2
    pdf/
      utils/
        generate-diagrams.ts                  -- Pipeline SVG->PNG para PDF
  utils/
    diagram-generators/
      helpers.ts                              -- Funciones utilitarias Mermaid
      process-diagram.ts                      -- Diagramas de proceso
      architecture-diagram.ts                 -- Diagramas de arquitectura
      decision-tree-diagram.ts                -- Diagrama del camino de decision
      timeline.ts                             -- Diagrama Gantt
  components/
    results/
      DiagramsTab.tsx                         -- Tab de diagramas en resultados
      DiagramViewer.tsx                       -- Componente visor de Mermaid
      ExportButton.tsx                        -- Boton de exportar PDF
    wizard/
      WizardStep.tsx                          -- Paso individual del wizard v1
      QuestionCard.tsx                        -- Tarjeta de pregunta wizard v2
      OptionCard.tsx                          -- Tarjeta de opcion
    pdf/
      WizardResultPDFDocument.tsx             -- Componente PDF completo
```

## Apendice B: Checklist de verificacion al escalar

Antes de hacer merge de contenido nuevo, verificar:

- [ ] Los IDs son unicos en todo el proyecto (no duplicados entre capitulos)
- [ ] Los JSON pasan validacion con Zod (`validateChapter()`)
- [ ] Las referencias cruzadas (`relatedConcepts`, `relatedTerms`) apuntan a IDs existentes
- [ ] Los diagramas Mermaid renderizan correctamente en web Y en PDF
- [ ] El `totalTerms` en `index.json` refleja el conteo real
- [ ] El `totalRecommendations` en `recommendations.json` esta actualizado
- [ ] El `totalPaths` en `decision-tree.json` esta actualizado
- [ ] La aplicacion compila sin errores: `npm run build`
- [ ] Los nuevos archivos estan importados donde se necesitan
