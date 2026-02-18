# Sommerville Assistant - Reporte de Funcionamiento End-to-End

**Version:** 2.0
**Fecha:** 2026-02-18
**Stack:** Next.js 14 / React 18 / TypeScript / Tailwind CSS / Mermaid / @react-pdf/renderer

---

## Tabla de Contenidos

1. [Vision General](#1-vision-general)
2. [Flujo del Usuario](#2-flujo-del-usuario)
3. [Sistema de Recomendaciones](#3-sistema-de-recomendaciones)
4. [Generacion de Diagramas](#4-generacion-de-diagramas)
5. [Exportacion PDF](#5-exportacion-pdf)
6. [Exportacion PNG/JPG](#6-exportacion-pngjpg)
7. [Glosario](#7-glosario)
8. [Plantillas y Checklists](#8-plantillas-y-checklists)
9. [Content Manager](#9-content-manager)
10. [Arquitectura Tecnica](#10-arquitectura-tecnica)

---

## 1. Vision General

### 1.1 Que hace la aplicacion

Sommerville Assistant es una plataforma educativa e interactiva de Ingenieria de Software que analiza las caracteristicas de un proyecto de software y genera una recomendacion completa y personalizada que incluye:

- **Proceso de desarrollo** (Cascada, Iterativo, Scrum, XP, Espiral, Prototipado)
- **Metodologia** con principios, diferenciadores y referencias bibliograficas
- **Modelado UML** con notaciones, diagramas recomendados y herramientas
- **Arquitectura** con patrones, atributos de calidad y trade-offs
- **Timeline** de 12 semanas con fases, tareas y entregables
- **4 diagramas Mermaid** generados automaticamente
- **Plantillas** y **checklists** profesionales aplicables

Todo esta basado en los capitulos 1 al 6 del libro "Ingenieria de Software" (9na edicion) de Ian Sommerville.

### 1.2 Audiencia objetivo

- Estudiantes de Ingenieria de Software y ciencias de la computacion
- Equipos de desarrollo que necesitan orientacion sobre procesos y arquitectura
- Docentes que buscan herramientas pedagogicas
- Profesionales que necesitan una guia rapida basada en literatura academica

### 1.3 Stack tecnologico

| Capa | Tecnologia | Proposito |
|------|-----------|-----------|
| Framework | Next.js 14 (App Router) | SSR/CSR, enrutamiento, optimizacion |
| UI Library | React 18 | Componentes reactivos |
| Lenguaje | TypeScript | Tipado estatico |
| Estilos | Tailwind CSS 3.4 | Utilidades CSS |
| Componentes UI | Radix UI | Primitivas accesibles (Dialog, Select, Tabs, Checkbox, etc.) |
| Animaciones | Framer Motion 12 | Transiciones y animaciones |
| Iconos | Lucide React | Biblioteca de iconos SVG |
| Diagramas | Mermaid 11 | Generacion de diagramas (flowchart, gantt) |
| PDF | @react-pdf/renderer 4 | Generacion de PDF en el cliente |
| Validacion | Zod 4 | Validacion de schemas de datos |
| Variantes CSS | class-variance-authority | Variantes de componentes |

### 1.4 Estructura de rutas

```
/                       --> Landing page (HomePage)
/wizard                 --> Wizard v1 (arbol de decision)
/wizard-v2              --> Wizard v2 (cuestionario de 10 preguntas + scoring)
/results/[id]           --> Pagina de resultados (6 tabs + plantillas + checklists)
/glossary               --> Glosario de 2,100+ terminos
/templates              --> Plantillas y checklists (catalogo)
/checklists/[id]        --> Checklist interactivo individual
/test-content-manager   --> Pagina de prueba del Content Manager
```

---

## 2. Flujo del Usuario

### 2.1 Diagrama de flujo general

```
+-------------------+
|   Landing Page    |
|    (page.tsx)     |
+-------------------+
       |         |
       v         v
+----------+  +----------+
| Wizard   |  | Wizard   |
| Clasico  |  | Avanzado |
| (v1)     |  | (v2)     |
+----------+  +----------+
       |         |
       v         v
+-------------------+        +-------------------+
|  /results/[id]    | <----> |  Exportar PDF     |
|  6 tabs de        |        |  (cliente-side)   |
|  analisis         |        +-------------------+
+-------------------+
       |
       v
+-----------------------------+
|  Secciones adicionales:     |
|  - Templates aplicables     |
|  - Checklists aplicables    |
|  - Errores a evitar         |
+-----------------------------+

Recursos independientes:
+-------------------+     +-------------------+
|   /glossary       |     |   /templates      |
|   2,100+ terminos |     |   10 templates    |
|   busqueda/filtro |     |   8 checklists    |
|   export PDF      |     |   filtros         |
+-------------------+     +-------------------+
```

### 2.2 Paso a paso detallado

1. **Landing Page** (`src/app/page.tsx`): El usuario aterriza en una pagina con hero section, estadisticas (13 recomendaciones, 2,100+ terminos, 10 plantillas, 6 capitulos), dos CTAs prominentes ("Wizard Clasico" y "Wizard Avanzado"), y secciones de features. Toda la pagina usa Framer Motion para animaciones de entrada escalonada.

2. **Seleccion de Wizard**: El usuario elige entre dos modos:
   - **Wizard Clasico** (`/wizard`): 4-5 preguntas, arbol de decision, resultado inmediato
   - **Wizard Avanzado** (`/wizard-v2`): 10 preguntas, scoring inteligente, analisis profundo

3. **Navegacion del Wizard**: El usuario responde las preguntas secuencialmente. Cada respuesta determina la siguiente pregunta (v1) o avanza al siguiente paso (v2).

4. **Calculo de Recomendacion**: Al finalizar las preguntas, el sistema calcula la recomendacion optima entre 13 opciones disponibles.

5. **Pagina de Resultados** (`/results/[id]`): Se muestra la recomendacion completa con 6 tabs: Proceso, Metodologia, Modelado, Arquitectura, Timeline, Diagramas. Ademas se muestran plantillas aplicables, checklists relacionados y errores a evitar.

6. **Exportacion**: El usuario puede exportar todo como un PDF profesional de multiples paginas con portada, secciones y diagramas.

---

## 3. Sistema de Recomendaciones

El sistema ofrece **dos mecanismos distintos** para llegar a una recomendacion. Ambos terminan redirigiendo a la misma pagina de resultados (`/results/[id]`).

### 3.1 Wizard v1 -- Arbol de Decision

**Archivos clave:**
- `src/hooks/useWizard.ts` -- hook principal
- `src/data/decision-tree.json` -- arbol de decision (25 rutas)
- `src/types/decision-tree.ts` -- tipos del arbol
- `src/app/wizard/page.tsx` -- pagina del wizard

**Modelo de datos del arbol:**

```
DecisionTree
  |-- version: "2.0"
  |-- rootStepId: "step-root"
  |-- totalPaths: 25
  |-- steps: Record<string, Step>
  |-- pathsIndex: PathIndex[]

Step
  |-- id: string
  |-- type: "root" | "branch"
  |-- question: string
  |-- description: string
  |-- chapter: number (1-6)
  |-- options: Option[]

Option
  |-- id: string
  |-- label: string
  |-- description: string
  |-- examples?: string[]
  |-- nextStepId: string | null      (si hay paso siguiente)
  |-- finalRecommendationId?: string  (si es hoja terminal)
  |-- characteristics?: Record<...>
  |-- whenToChoose?: string[]
```

**Flujo de navegacion:**

```
   [step-root]
       |
   Selecciona opcion
       |
       v
  option.nextStepId != null?
      |            |
     SI           NO
      |            |
      v            v
  [siguiente    option.finalRecommendationId
   step]         --> router.push(/results/[id])
      |
   Repite...
```

**Funcionamiento del hook `useWizard`:**

1. `useState` mantiene: `currentStepId`, `selectedPath` (array de IDs de opciones), e `history` (array de IDs de steps para permitir volver atras).
2. `selectOption(optionId)`: Busca la opcion en el step actual, actualiza el path, y:
   - Si `option.nextStepId` existe: avanza al siguiente step
   - Si `option.finalRecommendationId` existe: retorna `{ finished: true, recommendationId }` que activa la navegacion a `/results/[id]`
3. `goBack()`: Retrocede en el historial, restaurando el step anterior y acortando el path.
4. `reset()`: Reinicia todo al `rootStepId` inicial.
5. `progress`: Se calcula como `Math.min(Math.round((selectedPath.length / 4) * 100), 100)`.

**Tipos de sistemas en el nodo raiz (8 opciones):**
- Sistema Critico de Seguridad
- Sistema Web / SaaS
- Sistema Transaccional
- Aplicacion Movil
- Procesamiento por Lotes
- Sistema Personal / Startup
- Sistema Embebido
- Proyecto Academico / Experimental

Cada rama desciende 5-7 niveles de profundidad, cubriendo aspectos como estabilidad de requisitos, tamano del equipo, tolerancia al riesgo, entre otros.

### 3.2 Wizard v2 -- Scoring Inteligente

**Archivos clave:**
- `src/lib/wizard/questions.ts` -- 10 preguntas definidas
- `src/lib/wizard/scoringAlgorithm.ts` -- algoritmo de matching
- `src/hooks/useWizardState.ts` -- hook con useReducer + localStorage
- `src/app/wizard-v2/page.tsx` -- pagina del wizard

**Las 10 preguntas:**

| # | ID | Categoria | Pregunta |
|---|-----|-----------|----------|
| 1 | q1 | project-type | Tipo de sistema (web, movil, embebido, desktop, backend) |
| 2 | q2 | criticality | Nivel de criticidad (critico, alto, medio, bajo) |
| 3 | q3 | project-size | Tamano del proyecto (pequeno, mediano, grande) |
| 4 | q4 | team-size | Tamano del equipo (solo, pequeno, mediano, grande) |
| 5 | q5 | timeline | Timeline requerido (< 1 mes, 1-3 meses, 3-12 meses, > 12 meses) |
| 6 | q6 | requirements-stability | Estabilidad de requisitos (muy estable a muy volatil) |
| 7 | q7 | risk-tolerance | Tolerancia al riesgo (muy baja a alta) |
| 8 | q8 | regulatory-compliance | Cumplimiento regulatorio (estricto, moderado, minimo, ninguno) |
| 9 | q9 | team-experience | Experiencia del equipo (senior, mixto, junior) |
| 10 | q10 | budget | Presupuesto (bajo, medio, alto) |

**Algoritmo de Scoring (`calculateRecommendationScore`):**

El algoritmo calcula un puntaje de 0-100 para cada una de las 13 recomendaciones basandose en las respuestas. Cada pregunta tiene un **peso** diferente:

```
Pregunta    Peso maximo    Logica
---------   -----------    ------
Q2 (criticidad)       25 pts   Matchea titulo/desc de recomendacion vs nivel critico
Q6 (estabilidad req)  20 pts   Estables -> plan-driven; Volatiles -> agile
Q4 (equipo)           15 pts   Pequeno -> personal/startup; Grande -> cascada/RUP
Q1 (tipo sistema)     15 pts   Web -> web/saas; Embebido -> critico; etc.
Q5 (timeline)         10 pts   Corto -> XP/startup; Largo -> cascada/RUP
Q7 (riesgo)            8 pts   Bajo -> critico/cascada; Alto -> startup/XP
Q8 (regulatorio)       5 pts   Estricto -> critico; Ninguno -> startup
Q10 (presupuesto)      2 pts   Bajo -> startup; Alto -> critico/grande
                     -----
Total maximo:        100 pts
```

**Flujo del scoring:**

```
Todas las 10 preguntas respondidas
        |
        v
Para cada recomendacion (13 total):
  calculateRecommendationScore(answers, rec) --> score 0-100
        |
        v
getBestRecommendation()
  - Selecciona la rec con mayor score
  - Si bestScore < 30: fallback inteligente
    basado en criticidad/tamano equipo
        |
        v
Navega a /results/[bestRecId]
```

**Fallback inteligente** (score < 30):
- Si critico: `rec-001` (Sistema Critico Grande)
- Si baja criticidad: `rec-006` (Startup)
- Si equipo grande: `rec-004` (Transaccional Grande)
- Default: `rec-005` (Scrum Mediano)

**Gestion de estado (`useWizardState`):**

Usa `useReducer` con las acciones: `NEXT_STEP`, `PREVIOUS_STEP`, `GO_TO_STEP`, `SET_ANSWER`, `SET_RECOMMENDATION`, `COMPLETE_WIZARD`, `RESET_WIZARD`.

Incluye **persistencia en localStorage**: al cargar la pagina, restaura respuestas y paso actual desde `wizard-state`. Al cambiar cualquier respuesta o paso, se serializa y guarda automaticamente. Al resetear, se elimina la clave de localStorage.

### 3.3 Datos de recomendaciones

**Archivo:** `src/data/recommendations.json`

Contiene 13 recomendaciones, cada una con la estructura completa definida en `src/types/recommendation.ts`:

```
Recommendation
  |-- id: "rec-001" .. "rec-013"
  |-- title: string
  |-- path: string[]              (ruta en el arbol de decision)
  |-- pathDescription: string
  |-- process: ProcessInfo        (nombre, capitulo, why[], how[])
  |-- methodology: MethodologyInfo (nombre, origen, principios, diferenciadores)
  |-- modeling: ModelingInfo      (notaciones, diagramas, herramientas)
  |-- architecture: ArchitectureInfo (patrones, estilo, atributos de calidad)
  |-- timeline: TimelineWeek[]   (semana, fase, tareas)
  |-- avoid: string[]            (errores comunes a evitar)
  |-- templates: string[]        (IDs de plantillas aplicables)
  |-- chapters: number[]         (capitulos relevantes del libro)
```

### 3.4 Hook `useRecommendation`

**Archivo:** `src/hooks/useRecommendation.ts`

Este hook es el puente entre el ID de recomendacion y los datos completos. Dado un `id`:

1. Busca la recomendacion en `recommendations.json`
2. Resuelve las plantillas aplicables mapeando `recommendation.templates[]` contra `templates.json`
3. Filtra los checklists aplicables de `checklists.json` buscando aquellos cuyo `relatedRecommendations` incluya el ID actual o cuyo `applicableFor` incluya "todos"
4. Retorna: `{ recommendation, applicableTemplates, applicableChecklists, isLoading, error }`

---

## 4. Generacion de Diagramas

### 4.1 Arquitectura general

La aplicacion genera **4 tipos de diagramas Mermaid** automaticamente basandose en los datos de la recomendacion seleccionada. No se requiere entrada adicional del usuario.

**Archivos clave:**
- `src/utils/diagram-generators/decision-tree-diagram.ts`
- `src/utils/diagram-generators/process-diagram.ts`
- `src/utils/diagram-generators/architecture-diagram.ts`
- `src/utils/diagram-generators/timeline.ts`
- `src/utils/diagram-generators/helpers.ts`
- `src/components/results/DiagramsTab.tsx`
- `src/components/results/DiagramViewer.tsx`

### 4.2 Los 4 tipos de diagramas

#### 4.2.1 Camino de Decision (`decision-tree-diagram.ts`)

Genera un diagrama `flowchart` que muestra el recorrido del usuario por el arbol de decision.

**Entrada:** `path: string[]` (IDs de opciones seleccionadas) + `recommendation: Recommendation`

**Algoritmo:**
1. Nodo inicio: `Start(["INICIO DEL ASISTENTE"])`
2. Para cada opcion en el path (max 8): crea un nodo `Step{i}` con el label de la opcion (obtenido de `getOptionLabel()` que busca en el decision-tree)
3. Nodo final: `Result["RESULTADO - {titulo recomendacion}"]`
4. Conecta secuencialmente: `Start --> Step0 ==> Step1 ==> ... ==> Result`
5. Aplica colores profesionales ciclicos a cada nodo
6. Usa direccion `TB` para paths largos (>4 pasos), `LR` para cortos

#### 4.2.2 Proceso de Desarrollo (`process-diagram.ts`)

Genera un diagrama `flowchart TB` que muestra las fases del proceso recomendado.

**Entrada:** `process: ProcessInfo`

**Algoritmo:**
1. Detecta el tipo de proceso por nombre (busqueda en string):
   - `cascada/waterfall` --> Diagrama lineal de 6 fases
   - `iterativo/incremental` --> Diagrama con ciclo de retorno
   - `scrum` --> Flujo de Scrum con sprint loop
   - `xp/extreme` --> Flujo XP con TDD y pair programming
   - `spiral/espiral` --> 4 cuadrantes con iteracion
   - `prototipo/prototype` --> Flujo con ciclo de evaluacion/refinamiento
   - Fallback --> Diagrama generico de 6 fases
2. Cada variante es un template fijo de Mermaid con estilos profesionales predefinidos

#### 4.2.3 Arquitectura del Sistema (`architecture-diagram.ts`)

Genera un diagrama `flowchart` que muestra el patron arquitectonico recomendado.

**Entrada:** `architecture: ArchitectureInfo`

**Algoritmo:**
1. Detecta el estilo arquitectonico por nombre:
   - `capas/layers` --> 3 subgraphs (presentacion, negocio, datos) + DB
   - `cliente-servidor` --> Subgraphs clientes + servidor con comunicacion HTTPS
   - `microservicios` --> Load balancer + API Gateway + 4 servicios + 4 DBs + Message Queue
   - `monolitico` --> Subgraph unico con modulos internos
   - `mvc` --> Patron Model-View-Controller con ciclo
   - `repositorio` --> Componentes centralizados alrededor de un repositorio
   - `pipe-filter/batch` --> Pipeline lineal de filtros
   - `event-driven/distribuido` --> Productores + Bus de eventos + Consumidores
   - Fallback --> Diagrama generico de 4 capas
2. Cada patron usa subgraphs de Mermaid para agrupar componentes logicamente

#### 4.2.4 Timeline Gantt (`timeline.ts`)

Genera un diagrama `gantt` de Mermaid con el cronograma del proyecto.

**Entrada:** `timeline: TimelineWeek[]`

**Algoritmo:**
1. Agrupa las semanas por fase (`phaseGroups`)
2. Para cada fase (max 6 secciones):
   - Crea una `section` en el Gantt
   - Recolecta actividades unicas (max 4 por fase)
   - Calcula fechas de inicio basadas en offset acumulado de semanas
   - Asigna estados: primeras fases = `done`, medias = `active`, finales = sin estado
3. Agrega milestone final de entrega
4. Formato de fechas: `YYYY-MM-DD`, eje: `%d/%m`
5. Si no hay datos validos, genera un Gantt fallback de 4 secciones

### 4.3 Pipeline de renderizado en web

```
DiagramsTab.tsx
     |
     | Genera codigo Mermaid (string) usando los 4 generadores
     |
     v
DiagramViewer.tsx (por cada diagrama)
     |
     | 1. Import dinamico de mermaid
     | 2. mermaid.initialize({...config})
     | 3. mermaid.render(uniqueId, mermaidCode)
     | 4. Inyecta SVG resultante en containerRef.innerHTML
     | 5. Ajusta estilo: maxWidth 100%, height auto
     |
     v
SVG renderizado en el DOM con zoom ajustable (50%-200%)
```

**Configuracion de Mermaid para web:**
- `theme: 'base'` con variables personalizadas (colores indigo, slate, etc.)
- `htmlLabels: true` (permite HTML en nodos de flowchart)
- `securityLevel: 'loose'` (necesario para renderizado dinamico)
- Configuracion especifica de Gantt: barHeight 28, fontSize 13, axisFormat `%d/%m`

### 4.4 Funciones helper (`helpers.ts`)

- `getOptionLabel(optionId)`: Busca el label de una opcion en el decision tree
- `sanitizeMermaidText(text)`: Limpia caracteres problematicos (comillas, brackets, newlines)
- `escapeMermaidString(text)`: Sanitiza y trunca a 50 caracteres
- `generateNodeId(prefix)`: Genera IDs unicos para nodos Mermaid
- `resetNodeCounter()`: Resetea el contador de nodos entre diagramas
- `generateColor(index)`: Retorna color de una paleta ciclica de 8 colores

---

## 5. Exportacion PDF

### 5.1 Vision general del pipeline

La exportacion PDF es **100% client-side** usando `@react-pdf/renderer`. No hay servidor involucrado en la generacion. El pipeline completo es:

```
[Usuario click "Exportar PDF"]
           |
           v
useExportPDF.tsx
           |
   +-------+--------+
   |                 |
   v                 v
generateDiagramsForPDF()   (si includeDiagrams = true)
   |
   | Para cada diagrama (secuencial):
   |   1. Genera codigo Mermaid (sin HTML tags)
   |   2. mermaid.render() --> SVG string
   |   3. svgToPngDataUri() --> PNG base64
   |
   v
<PDFDocument /> (componente React PDF)
   |
   | pdf(doc).toBlob()
   |
   v
URL.createObjectURL(blob) --> link.click() --> descarga
```

### 5.2 Generacion de diagramas para PDF (`generate-diagrams.ts`)

Esta es la parte mas compleja del sistema. `@react-pdf/renderer` NO puede renderizar SVGs complejos generados por Mermaid (contienen CSS, markers, foreignObject, etc.), por lo que se sigue un pipeline de conversion:

```
Codigo Mermaid (string)
       |
       | stripHtml(): elimina <b>, </b>, reemplaza <br/> por " - "
       | (porque htmlLabels: false no soporta HTML)
       |
       v
mermaid.render(id, code) --> SVG string
       |
       v
svgToPngDataUri(svgString, type)
       |
       | 1. DOMParser.parseFromString() --> SVG DOM
       | 2. Extrae dimensiones de viewBox/width/height
       | 3. Elimina todos los <foreignObject> (causan tainting en canvas)
       | 4. Serializa SVG limpio con XMLSerializer
       | 5. Codifica a base64 data URL: "data:image/svg+xml;base64,..."
       | 6. Carga como Image (img.src = dataUrl)
       | 7. Dibuja en Canvas con fondo blanco
       | 8. canvas.toDataURL('image/png', 1.0)
       |
       v
PNG data URI (string) -- listo para @react-pdf/renderer <Image>
```

**Detalle critico - htmlLabels:**
- En web: `htmlLabels: true` (permite etiquetas HTML bonitas en nodos)
- En PDF: `htmlLabels: false` (obligatorio, porque los `foreignObject` que Mermaid genera con htmlLabels causan cross-origin tainting en el Canvas, impidiendo la exportacion a PNG)

**Los diagramas se renderizan SECUENCIALMENTE** (no en paralelo) para evitar condiciones de carrera de Mermaid que comparte estado global.

**Escala:** Se usa escala 2x para calidad retina, con maximo 4096px por dimension.

### 5.3 Documento PDF (`PDFDocument.tsx`)

El documento PDF se construye con componentes de `@react-pdf/renderer` y tiene esta estructura de paginas:

```
Pagina 1:  Portada (Cover)
            - Nombre del proyecto / titulo de recomendacion
            - Metadatos: organizacion, autor, fecha, referencia, capitulos
            - Badges de contenido: Proceso, Metodologia, Modelado, etc.

Pagina 2:  Proceso + Metodologia
            - ProcessSection: nombre, por que, como (fases)
            - MethodologySection: origen, principios, diferenciadores

Pagina 3:  Modelado
            - ModelingSection: notaciones, diagramas UML, herramientas

Pagina 4:  Arquitectura + Errores a Evitar
            - ArchitectureSection: patrones, ventajas/desventajas
            - AvoidSection: lista de errores comunes

Pagina 5:  Timeline
            - TimelineSection: tabla de semanas con fases y tareas

Paginas 6-9: Diagramas (4 paginas, una por diagrama)
            - 6.1 Camino de Decision (PNG embebido)
            - 6.2 Proceso de Desarrollo (PNG embebido)
            - 6.3 Arquitectura del Sistema (PNG embebido)
            - 6.4 Cronograma Gantt (PNG embebido)
            (Si falla la generacion: placeholder con mensaje)

Pagina 10: Plantillas (si hay aplicables)

Pagina final: Acerca de este Documento
            - Referencia bibliografica
            - Recomendaciones de uso
            - Fecha de generacion
```

Cada pagina incluye:
- **Header fijo** con el titulo del proyecto en mayusculas
- **Footer fijo** con numero de pagina y "Sommerville Assistant"

### 5.4 Personalizacion del PDF (`PDFCustomization`)

El usuario puede personalizar la exportacion con:

```typescript
interface PDFCustomization {
  projectName?: string;      // Titulo en la portada
  companyName?: string;      // Organizacion
  authorName?: string;       // Autor(es)
  logo?: string;             // URL o base64 del logo
  primaryColor?: string;     // Color principal
  includeTimestamp?: boolean; // Incluir fecha
  includeDiagrams?: boolean; // Incluir paginas de diagramas
  includeTemplates?: boolean;// Incluir plantillas
  customFooter?: string;     // Texto personalizado en footer de portada
}
```

### 5.5 Modos de exportacion

El componente `ExportButton` ofrece tres modos via dropdown:

1. **Proyecto Completo**: Incluye todas las secciones + diagramas + plantillas
2. **Exportar Rapido**: Sin personalizacion, valores por defecto
3. **Personalizar y Exportar**: Abre un formulario modal (`PDFCustomizationForm`) para configurar antes de exportar

### 5.6 Nombre del archivo generado

El nombre se genera con: `sommerville-{titulo-sanitizado}-{YYYY-MM-DD}.pdf`

La funcion `generatePDFFilename` normaliza el titulo removiendo acentos, reemplazando caracteres especiales por guiones, y agregando la fecha actual.

---

## 6. Exportacion PNG/JPG

### 6.1 Funcionamiento

Cada diagrama individual puede descargarse como **SVG**, **PNG** o **JPG** directamente desde el `DiagramViewer`.

**Archivo:** `src/components/results/DiagramViewer.tsx`

### 6.2 Pipeline de exportacion SVG

```
1. querySelector('svg') del contenedor del diagrama
2. XMLSerializer.serializeToString(svgElement)
3. new Blob([svgData], { type: 'image/svg+xml' })
4. URL.createObjectURL(blob) --> download via <a> tag
```

### 6.3 Pipeline de exportacion PNG/JPG

```
1. Obtener dimensiones del SVG (viewBox o atributos width/height)
2. Calcular dimensiones objetivo (800px min, 1920px max, escala 2x retina)
3. Clonar SVG y setear dimensiones explicitas + xmlns
4. Serializar a base64 data URL
5. Cargar como Image
6. Crear Canvas con fondo blanco (#ffffff)
7. ctx.drawImage(img, 0, 0, width, height)
8. canvas.toBlob(callback, mimeType, quality)
   - PNG: 'image/png', sin quality
   - JPG: 'image/jpeg', quality 0.95
9. Descargar via URL.createObjectURL + <a> tag
```

**Limites de seguridad:**
- Maximo 4096px por dimension del canvas (previene problemas de memoria)
- Fondo blanco siempre aplicado (PNG sin transparencia porque se ve mal en la mayoria de visores)
- `crossOrigin = 'anonymous'` en la imagen para evitar tainting

### 6.4 Funcionalidades adicionales del DiagramViewer

- **Zoom**: Control de zoom de 50% a 200% con botones +/- de 10% en 10%
- **Copiar codigo**: Copia el codigo Mermaid al portapapeles con feedback visual
- **Reintentar**: En caso de error de renderizado, boton para reintentar
- **Detalle del error**: Acordeon con el codigo Mermaid para debugging
- **Estados**: `loading` (spinner), `success` (diagrama visible), `error` (mensaje + reintentar)

---

## 7. Glosario

### 7.1 Vision general

El glosario contiene **mas de 2,100 terminos tecnicos** de ingenieria de software, extraidos de los capitulos 1-6 del libro de Sommerville.

**Archivos clave:**
- `src/data/glossary/index.json` -- todos los terminos
- `src/types/glossary.ts` -- tipos TypeScript
- `src/hooks/useGlossary.ts` -- hook de busqueda y filtrado
- `src/app/glossary/page.tsx` -- pagina principal
- `src/components/glossary/` -- componentes UI (Stats, Filters, TermsGrid, TermCard, TermModal, TermTooltip, ExportGlossaryButton)

### 7.2 Modelo de datos

```
GlossaryIndex
  |-- version: string
  |-- lastUpdated: string
  |-- totalTerms: number
  |-- chapters: GlossaryChapter[]
  |-- categories: string[]         (lista unica de categorias)
  |-- allTerms: GlossaryTerm[]     (array plano de todos los terminos)

GlossaryTerm
  |-- id: string
  |-- nombre: string               (nombre del termino en espanol)
  |-- categoria: string            (ej: "Proceso", "Metodologia")
  |-- descripcionBreve: string     (definicion corta)
  |-- capitulo: number             (1-6)
  |-- keywords: string[]           (palabras clave para busqueda)
  |-- relatedTerms: string[]       (IDs de terminos relacionados)
  |-- descripcionExtendida?: string (definicion larga)
  |-- ejemplos?: string[]          (ejemplos de uso)
  |-- referencias?: { capitulo, secciones[] }
```

### 7.3 Hook `useGlossary`

El hook centraliza toda la logica de busqueda y filtrado:

1. **Busqueda con debounce** (300ms): Busca en `nombre`, `descripcionBreve` y `keywords[]` del termino
2. **Filtro por capitulo**: Filtra por `term.capitulo === selectedChapter`
3. **Filtro por categoria**: Filtra por `term.categoria === selectedCategory`
4. **Estadisticas calculadas con `useMemo`**:
   - Total de terminos
   - Numero de capitulos y categorias
   - Distribucion de terminos por capitulo y por categoria
   - Termino mas referenciado (el que aparece en mas `relatedTerms` de otros)

```
Flujo de filtrado:

allTerms (2,100+)
     |
     | Filtro por capitulo (si seleccionado)
     v
     | Filtro por categoria (si seleccionada)
     v
     | Busqueda textual debounced
     v
filteredTerms --> TermsGrid --> TermCard (x N)
```

### 7.4 Interfaz de usuario

- **GlossaryStats**: 4 tarjetas con total terminos, capitulos, categorias, y termino mas referenciado
- **GlossaryFilters**: Input de busqueda + selectores de capitulo y categoria + contador de resultados + boton limpiar filtros
- **TermsGrid**: Grilla responsive de tarjetas de terminos
- **TermCard**: Tarjeta individual con nombre, categoria (badge), descripcion y keywords
- **TermModal**: Dialog modal con detalle completo: descripcion extendida, ejemplos, keywords, y terminos relacionados (clickeables para navegar a otro termino sin cerrar el modal)
- **TermTooltip**: Hover card para previews rapidos de terminos

### 7.5 Exportacion PDF del glosario

**Componentes:**
- `src/components/glossary/ExportGlossaryButton.tsx` -- boton de exportacion
- `src/lib/pdf/GlossaryPDFDocument.tsx` -- documento PDF del glosario

**Pipeline:**

```
Click "Exportar (N)"
        |
        v
<GlossaryPDFDocument terms={filteredTerms} />
        |
        | 1. Agrupa terminos por capitulo
        | 2. Divide en chunks de 15 terminos por pagina
        | 3. Genera paginas con:
        |    - Portada con titulo y estadisticas
        |    - Header por capitulo
        |    - Cada termino: nombre, categoria, descripcion,
        |      descripcion extendida, ejemplos, keywords
        |
        v
pdf(doc).toBlob() --> download
```

**Nombre del archivo:** `glosario-sommerville-{N}-terminos.pdf` donde N es la cantidad de terminos filtrados.

La exportacion respeta los filtros activos: si el usuario tiene filtrado por capitulo 3, solo se exportan los terminos del capitulo 3.

---

## 8. Plantillas y Checklists

### 8.1 Vision general

El sistema incluye **10 plantillas profesionales** de documentacion tecnica y **8 checklists interactivos** con mas de 88 items en total.

**Archivos clave:**
- `src/data/templates.json` -- datos de plantillas
- `src/data/checklists.json` -- datos de checklists
- `src/types/templates.ts` -- tipos de plantillas
- `src/types/checklists.ts` -- tipos de checklists
- `src/hooks/useTemplates.ts` -- hook de carga y filtrado
- `src/app/templates/page.tsx` -- catalogo general
- `src/app/checklists/[id]/page.tsx` -- checklist interactivo

### 8.2 Modelo de datos -- Templates

```
Template
  |-- id: string
  |-- name: string                    (ej: "SRS - Especificacion de Requisitos")
  |-- category: string                (ej: "requirements", "architecture")
  |-- description: string
  |-- chapter: number                 (capitulo del libro relacionado)
  |-- format: string                  (ej: "markdown", "docx")
  |-- applicableFor: string[]         (ej: ["waterfall", "scrum"])
  |-- difficulty: string              (ej: "beginner", "intermediate")
  |-- estimatedTime: string           (ej: "2-4 horas")
  |-- content: string                 (contenido completo de la plantilla)
  |-- sections: string[]              (lista de secciones incluidas)
  |-- relatedRecommendations: string[](IDs de recomendaciones donde aplica)
  |-- tags: string[]                  (para busqueda y filtrado)
```

### 8.3 Modelo de datos -- Checklists

```
Checklist
  |-- id: string
  |-- name: string
  |-- category: string
  |-- description: string
  |-- chapter: number
  |-- applicableFor: string[]
  |-- estimatedTime: string
  |-- sections: ChecklistSection[]
  |     |-- title: string
  |     |-- items: ChecklistItem[]
  |           |-- id: string
  |           |-- text: string
  |           |-- critical: boolean     (item marcado como critico)
  |           |-- help?: string         (texto de ayuda)
  |           |-- examples?: string[]   (ejemplos)
  |-- totalItems: number
  |-- criticalItems: number
  |-- relatedRecommendations: string[]
  |-- tags: string[]
```

### 8.4 Hook `useTemplates`

El hook carga datos de `templates.json` y proporciona:

- `filterTemplates(filters)`: Filtra por categoria, metodologia, dificultad y busqueda textual
- `filterChecklists(filters)`: Filtra por metodologia, dificultad y busqueda textual
- `getTemplateById(id)` / `getChecklistById(id)`: Busqueda por ID
- `getTemplatesByCategory(cat)` / `getChecklistsByMethodology(method)`: Busqueda por atributo
- `allMethodologies`: Lista unica de todas las metodologias presentes
- `categoriesWithCounts`: Conteo de plantillas por categoria

### 8.5 Catalogo (`/templates`)

La pagina del catalogo ofrece:

- **Busqueda global** por nombre, descripcion o tags
- **Filtros laterales** por categoria, metodologia y dificultad
- **Tabs**: Plantillas / Checklists con contadores
- **TemplateCard**: Tarjeta con preview de cada plantilla
- **TemplatePreviewModal**: Modal con el contenido completo de la plantilla
- **ChecklistCard**: Tarjeta que navega a `/checklists/[id]`

### 8.6 Checklist interactivo (`/checklists/[id]`)

Pagina dedicada a completar un checklist individualmente:

```
Busca en checklists.json (IDs tipo "chk-XXX")
Si no encuentra, busca en templates.json (IDs tipo "checklist-XXX")
        |
        v
Normaliza a formato comun (NormalizedChecklist)
        |
        v
Renderiza con estado interactivo:
  - Checkbox por cada item
  - Barra de progreso: N / Total items (X%)
  - Conteo de items criticos completados
  - Secciones colapsables con indicador de completitud
  - Items criticos destacados con badge rojo
  - Items completados con texto tachado y fondo verde
  - Botones "Resetear" y "Marcar todo"
```

**Estado:** Mantenido en `useState<Record<string, boolean>>` local. El estado de checkboxes NO se persiste en localStorage (se pierde al recargar).

### 8.7 Integracion con resultados

En la pagina de resultados (`/results/[id]`), se muestran automaticamente:

- **TemplatesSection**: Plantillas cuyo ID esta en `recommendation.templates[]`
- **ChecklistsSection**: Checklists cuyo `relatedRecommendations` incluye el ID de la recomendacion actual, o cuyo `applicableFor` incluye "todos"

---

## 9. Content Manager

### 9.1 Vision general

El Content Manager es un sistema preparado para gestionar el contenido estructurado de los capitulos del libro. Actualmente esta en estado **parcialmente implementado** (la clase existe pero los archivos JSON de capitulos aun no estan creados).

**Archivos clave:**
- `src/lib/content-manager/index.ts` -- clase singleton
- `src/data/core/content-schema.ts` -- schemas Zod de validacion
- `src/types/content/chapter.ts` -- tipos TypeScript
- `src/app/test-content-manager/page.tsx` -- pagina de prueba

### 9.2 Clase `ContentManager`

Es un **singleton** exportado como `contentManager`. Internamente mantiene tres Maps:

```
ContentManager
  |-- chapters: Map<string, Chapter>
  |-- conceptsIndex: Map<string, Concept>
  |-- practicesIndex: Map<string, Practice>
```

**Metodos disponibles:**

| Metodo | Descripcion |
|--------|-------------|
| `getChapter(id)` | Obtener capitulo por ID |
| `getAllChapters()` | Listar todos los capitulos |
| `getConceptsByChapter(id)` | Conceptos de un capitulo |
| `findConcept(id)` | Buscar concepto por ID |
| `findConceptsByCategory(cat)` | Conceptos por categoria |
| `searchConcepts(query)` | Busqueda textual en nombre, tags, definicion |
| `getRelatedConcepts(id)` | Conceptos relacionados (navegacion) |
| `findPractice(id)` | Buscar practica por ID |
| `getPracticesFor(type, method)` | Practicas aplicables a un contexto |
| `getEssentialPractices()` | Practicas marcadas como esenciales |
| `addChapter(chapter)` | Agregar nuevo capitulo (extensibilidad) |
| `validateReferences()` | Validar integridad de referencias cruzadas |

### 9.3 Schemas de validacion (Zod)

El archivo `content-schema.ts` define schemas estrictos para validar los JSON de capitulos:

```
ChapterSchema
  |-- id: "chapter-{N}"
  |-- number: 1-10
  |-- title: string (min 1)
  |-- description: string (min 10)
  |-- sections: SectionSchema[] (recursivo con subsections)
  |-- concepts: ConceptSchema[]
  |     |-- category: enum (fundamental-concept, process-model,
  |     |       agile-practice, requirement-type, modeling-technique,
  |     |       uml-diagram, architectural-pattern, ...)
  |     |-- definition, whenToUse, whenNotToUse: string (min 10)
  |     |-- examples: string[] (min 1)
  |     |-- relatedConcepts: string[]
  |     |-- chapterReference: "chapter-{N}"
  |-- practices: PracticeSchema[]
  |     |-- priority: "essential" | "recommended" | "optional"
  |     |-- steps, benefits, challenges: string[] (min 1)
  |-- examples: ExampleSchema[]
  |-- references: ReferenceSchema[]
  |     |-- relationshipType: "extends" | "uses" | "requires" | ...
  |-- metadata: ChapterMetadataSchema
        |-- completeness: 0-100
```

### 9.4 Extensibilidad

El Content Manager esta disenado para ser extensible. Cuando se agreguen capitulos 7-10:

1. Crear archivos JSON siguiendo el schema (`src/data/core/chapters/chapter-N.json`)
2. Importar en el constructor del ContentManager
3. Los indices se construyen automaticamente
4. `addChapter()` permite agregar capitulos en runtime

---

## 10. Arquitectura Tecnica

### 10.1 Renderizado 100% client-side

Sommerville Assistant es una aplicacion **primordialmente client-side**. Aunque usa Next.js 14 con App Router, casi todos los componentes estan marcados con `'use client'` porque:

- Los wizards requieren estado interactivo (hooks, useState, useReducer)
- Los diagramas Mermaid requieren el DOM del navegador para renderizar
- La generacion de PDF usa `@react-pdf/renderer` que necesita APIs del navegador (Canvas, Image, Blob)
- El glosario con 2,100+ terminos usa filtrado reactivo con useMemo

**Layout:** El `RootLayout` es un Server Component minimo que solo establece la fuente (Geist Sans/Mono) y el idioma (`lang="es"`).

### 10.2 Flujo de datos

```
                    +---------------------+
                    |   Archivos JSON     |
                    |   (data estática)   |
                    |                     |
                    |  decision-tree.json |
                    |  recommendations.json|
                    |  templates.json     |
                    |  checklists.json    |
                    |  glossary/index.json|
                    +----------+----------+
                               |
                     import directo (build-time)
                               |
                    +----------v----------+
                    |    Custom Hooks     |
                    |  (logica de negocio)|
                    |                     |
                    |  useWizard          |
                    |  useWizardState     |
                    |  useRecommendation  |
                    |  useGlossary        |
                    |  useTemplates       |
                    |  useExportPDF       |
                    +----------+----------+
                               |
                         React state
                    (useState/useReducer)
                               |
                    +----------v----------+
                    |   Componentes UI    |
                    |   (presentacion)    |
                    |                     |
                    |  Pages (app/)       |
                    |  Results tabs       |
                    |  DiagramViewer      |
                    |  Glossary grid      |
                    |  Template cards     |
                    +---------------------+
```

### 10.3 Gestion de estado

No hay store global (Redux, Zustand, etc.). El estado se gestiona localmente:

| Ambito | Mecanismo | Persistencia |
|--------|-----------|-------------|
| Wizard v1 | `useState` en `useWizard` | No |
| Wizard v2 | `useReducer` en `useWizardState` | Si (localStorage) |
| Resultados | `useMemo` en `useRecommendation` | No (derivado del URL param) |
| Glosario | `useState` + `useMemo` en `useGlossary` | No |
| Checklists | `useState` local en pagina | No |
| Exportacion PDF | `useState` en `useExportPDF` | No |

### 10.4 Patron de datos: JSON estatico + TypeScript

Todos los datos viven en archivos JSON dentro de `src/data/`. Son importados como modulos ES al construir la aplicacion. No hay base de datos ni API externa.

Los tipos TypeScript en `src/types/` aseguran type-safety al consumir los JSON:

```
src/types/
  |-- wizard.ts             (WizardStep, WizardOption, WizardState, DecisionNode)
  |-- decision-tree.ts      (DecisionTree, Step, Option, PathIndex)
  |-- recommendation.ts     (Recommendation, ProcessInfo, MethodologyInfo, etc.)
  |-- diagram.ts            (DiagramType, MermaidDiagram, DiagramExportOptions)
  |-- glossary.ts           (GlossaryIndex, GlossaryChapter, GlossaryTerm)
  |-- templates.ts          (TemplatesData, Template)
  |-- checklists.ts         (ChecklistsData, Checklist, ChecklistSection, ChecklistItem)
  |-- pdf-customization.ts  (PDFCustomization)
  |-- content/              (Chapter, Concept, Practice -- para Content Manager)
```

### 10.5 Componentes UI base

La aplicacion usa una libreria de componentes UI propia construida sobre **Radix UI** + **Tailwind CSS** + **class-variance-authority**, ubicada en `src/components/ui/`:

| Componente | Base Radix | Uso |
|-----------|-----------|-----|
| Button | Slot | Acciones, CTAs, navegacion |
| Card | -- | Contenedores de contenido |
| Tabs | Tabs | Navegacion entre secciones de resultados |
| Dialog | Dialog | Modales (terminos, templates, personalizacion PDF) |
| Select | Select | Filtros de capitulo/categoria |
| Progress | Progress | Barra de progreso del wizard |
| Badge | -- | Etiquetas de estado, categorias |
| Checkbox | Checkbox | Items de checklist |
| Input | -- | Campos de busqueda |
| Switch | Switch | Toggles de configuracion |
| RadioGroup | RadioGroup | Opciones de wizard v2 |
| ScrollArea | ScrollArea | Contenedores con scroll |
| DropdownMenu | DropdownMenu | Menu de exportacion PDF |
| HoverCard | HoverCard | Tooltips de terminos |
| Separator | Separator | Divisores visuales |
| Label | Label | Etiquetas de formulario |

### 10.6 Estructura de archivos del proyecto

```
src/
  |-- app/                          # Paginas (Next.js App Router)
  |     |-- page.tsx                # Landing page
  |     |-- layout.tsx              # Root layout
  |     |-- globals.css             # Estilos globales
  |     |-- wizard/page.tsx         # Wizard v1
  |     |-- wizard-v2/page.tsx      # Wizard v2
  |     |-- results/[id]/page.tsx   # Resultados
  |     |-- glossary/page.tsx       # Glosario
  |     |-- templates/page.tsx      # Catalogo de plantillas
  |     |-- checklists/[id]/page.tsx# Checklist interactivo
  |
  |-- components/
  |     |-- ui/                     # Componentes base (Radix + Tailwind)
  |     |-- wizard/                 # Componentes del wizard
  |     |-- results/                # Tabs y secciones de resultados
  |     |-- glossary/               # Componentes del glosario
  |     |-- templates/              # Componentes de plantillas
  |     |-- pdf/                    # Componentes PDF (wizard result)
  |
  |-- hooks/                        # Custom hooks
  |     |-- useWizard.ts            # Wizard v1 (arbol de decision)
  |     |-- useWizardState.ts       # Wizard v2 (reducer + localStorage)
  |     |-- useRecommendation.ts    # Carga de recomendacion + templates + checklists
  |     |-- useGlossary.ts          # Busqueda y filtrado del glosario
  |     |-- useTemplates.ts         # Carga y filtrado de templates
  |     |-- useExportPDF.tsx        # Pipeline de exportacion PDF
  |     |-- useDiagram.ts           # Gestion basica de diagramas
  |
  |-- lib/
  |     |-- pdf/                    # Generacion de PDF
  |     |     |-- PDFDocument.tsx   # Documento principal
  |     |     |-- GlossaryPDFDocument.tsx # PDF del glosario
  |     |     |-- styles.ts         # Estilos del PDF
  |     |     |-- utils.ts          # Utilidades (fecha, filename, sanitize)
  |     |     |-- utils/generate-diagrams.ts # SVG -> PNG pipeline
  |     |     |-- components/       # Secciones del PDF (Cover, Process, etc.)
  |     |-- wizard/
  |     |     |-- questions.ts      # 10 preguntas del wizard v2
  |     |     |-- scoringAlgorithm.ts # Algoritmo de matching
  |     |-- content-manager/
  |     |     |-- index.ts          # Clase ContentManager (singleton)
  |     |-- types/
  |     |     |-- templates.ts      # Tipos extendidos de templates
  |     |     |-- wizard.ts         # Tipos del wizard v2
  |     |-- utils.ts                # Utilidad cn() para clases CSS
  |     |-- constants.ts            # Constantes globales
  |
  |-- data/                         # Datos estaticos JSON
  |     |-- decision-tree.json      # Arbol de decision (25 rutas, 5-7 niveles)
  |     |-- recommendations.json    # 13 recomendaciones completas
  |     |-- templates.json          # 10 plantillas profesionales
  |     |-- checklists.json         # 8 checklists (88+ items)
  |     |-- glossary/index.json     # 2,100+ terminos tecnicos
  |     |-- core/content-schema.ts  # Schemas Zod para validacion
  |
  |-- types/                        # Tipos TypeScript globales
  |     |-- index.ts                # Re-exporta todos los tipos
  |     |-- wizard.ts, recommendation.ts, glossary.ts, diagram.ts, ...
  |
  |-- utils/
        |-- diagram-generators/     # 4 generadores de diagramas Mermaid
        |-- pdf-export.ts           # Utilidades de exportacion PDF
        |-- path-resolver.ts        # Resolucion de paths
        |-- term-matcher.ts         # Matching de terminos
```

### 10.7 Rendimiento y optimizaciones

1. **Debounce en busqueda del glosario**: 300ms de retraso para evitar re-renders excesivos con 2,100+ terminos
2. **useMemo**: Calculo de estadisticas del glosario y filtrado de recomendaciones memorizados
3. **Import dinamico de Mermaid**: `await import('mermaid')` evita incluir la libreria en el bundle inicial y previene errores SSR
4. **Renderizado secuencial de diagramas para PDF**: Evita race conditions de Mermaid
5. **Limites de canvas**: Max 4096px para prevenir problemas de memoria en exportacion de imagenes
6. **Chunks de 15 terminos por pagina** en el PDF del glosario: Evita overflow de contenido
7. **Timeout de 200ms** antes de renderizar diagramas Mermaid en el DiagramViewer: Permite que el DOM se estabilice

---

*Documento generado como referencia tecnica del proyecto Sommerville Assistant.*
*Basado en el analisis del codigo fuente del repositorio en su estado actual.*
