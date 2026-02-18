# Arbol del Proyecto - Sommerville Assistant

> Ramificacion completa con descripcion de cada archivo.
> Generado el 18 de febrero de 2026.

---

## Raiz del Proyecto

```
sommerville-assistant/
```

| Archivo | Descripcion |
|---------|-------------|
| `.eslintrc.json` | Reglas de ESLint para TypeScript y Next.js |
| `.gitignore` | Exclusiones de Git (node_modules, .next, builds) |
| `components.json` | Configuracion de shadcn/ui para generacion de componentes |
| `LICENSE` | Licencia MIT del proyecto |
| `next-env.d.ts` | Tipos de entorno TypeScript para Next.js |
| `next.config.mjs` | Configuracion de Next.js con Webpack para Mermaid |
| `package.json` | Dependencias, scripts de build, metadata del proyecto |
| `package-lock.json` | Versiones fijadas de todas las dependencias npm |
| `postcss.config.mjs` | Configuracion PostCSS para procesamiento de TailwindCSS |
| `README.md` | Documentacion principal del proyecto |
| `tailwind.config.ts` | Configuracion de TailwindCSS con colores y utilidades custom |
| `tsconfig.json` | Configuracion TypeScript con path aliases (@/*) |

---

## `.claude/`

| Archivo | Descripcion |
|---------|-------------|
| `settings.local.json` | Configuracion local de Claude Code para el proyecto |

---

## `scripts/`

| Archivo | Descripcion |
|---------|-------------|
| `build-glossary-index.js` | Script Node.js para parsear JSONs del glosario y generar indice de busqueda |
| `enrich-process-fields.js` | Script para validar y enriquecer definiciones de procesos con campos faltantes |

---

## `src/app/` - Paginas y Rutas (Next.js App Router)

```
src/app/
  layout.tsx
  page.tsx
  globals.css
  favicon.ico
  fonts/
  wizard/
  wizard-v2/
  results/[id]/
  templates/
  checklists/[id]/
  glossary/
  test-content-manager/
  api/export-pdf/
```

| Archivo | Descripcion |
|---------|-------------|
| `layout.tsx` | Layout raiz: metadata SEO, fuentes Geist, estructura HTML base |
| `page.tsx` | Landing page: hero, 6 paneles de features, how-it-works, CTAs |
| `globals.css` | Estilos globales: tipografia, animaciones CSS, utilidades |
| `favicon.ico` | Icono del navegador |
| `fonts/GeistVF.woff` | Fuente variable sans-serif para la interfaz |
| `fonts/GeistMonoVF.woff` | Fuente variable monospace para codigo |
| `wizard/page.tsx` | Wizard clasico: arbol de decision con barra de progreso y breadcrumb |
| `wizard-v2/page.tsx` | Wizard avanzado: formulario de 10 preguntas con algoritmo de scoring |
| `results/[id]/page.tsx` | Pagina de resultados: 8 tabs (proceso, metodologia, arquitectura, etc.) + exportar PDF |
| `templates/page.tsx` | Galeria de plantillas y checklists con filtros, preview modal y descarga |
| `checklists/[id]/page.tsx` | Checklist interactivo con checkboxes, progreso y generacion PDF |
| `glossary/page.tsx` | Glosario de 2,100+ terminos con busqueda, filtros por capitulo/categoria, exportar PDF |
| `test-content-manager/page.tsx` | Pagina de desarrollo para probar API del content manager |
| `api/export-pdf/route.ts` | Endpoint API server-side para generacion de PDF (stub, se usa client-side) |

---

## `src/components/` - Componentes React

### `src/components/ui/` - Componentes Base (shadcn/ui + Radix)

| Archivo | Descripcion |
|---------|-------------|
| `alert.tsx` | Caja de alerta para mensajes y notificaciones |
| `badge.tsx` | Badge para tags y estados |
| `button.tsx` | Boton con variantes (default, outline, ghost) y tamanos |
| `card.tsx` | Contenedor card con header, content y footer |
| `checkbox.tsx` | Input checkbox para selecciones booleanas |
| `dialog.tsx` | Modal dialog para formularios y confirmaciones |
| `dropdown-menu.tsx` | Menu desplegable para opciones |
| `hover-card.tsx` | Tooltip flotante con informacion contextual |
| `input.tsx` | Campo de texto con estados de validacion |
| `label.tsx` | Label para campos de formulario |
| `progress.tsx` | Barra de progreso con porcentaje |
| `radio-group.tsx` | Grupo de radio buttons para seleccion unica |
| `scroll-area.tsx` | Area scrollable para contenido largo |
| `select.tsx` | Select dropdown para seleccion de opciones |
| `separator.tsx` | Divisor visual horizontal/vertical |
| `switch.tsx` | Toggle switch para flags booleanos |
| `tabs.tsx` | Navegacion por tabs para secciones |
| `textarea.tsx` | Campo de texto multilinea |

### `src/components/wizard/` - Componentes del Wizard

| Archivo | Descripcion |
|---------|-------------|
| `ExportWizardResultButton.tsx` | Boton para exportar resultado del wizard como PDF |
| `OptionCard.tsx` | Card de opcion del arbol de decision con descripcion e icono |
| `ProgressBar.tsx` | Indicador visual de progreso del wizard |
| `QuestionCard.tsx` | Card de pregunta actual con descripcion y contexto |
| `ResultsPreview.tsx` | Vista previa de la recomendacion final |
| `WizardStep.tsx` | Wrapper de paso del wizard con layout y estilos |

### `src/components/results/` - Componentes de Resultados

| Archivo | Descripcion |
|---------|-------------|
| `ArchitectureTab.tsx` | Tab de patrones arquitectonicos y diseno del sistema |
| `AvoidSection.tsx` | Seccion de anti-patrones y errores a evitar |
| `ChecklistsSection.tsx` | Grid de checklists aplicables a la recomendacion |
| `DiagramsTab.tsx` | Tab con 4 diagramas Mermaid (decision, proceso, arquitectura, Gantt) |
| `DiagramViewer.tsx` | Visor de diagramas con zoom, descarga SVG/PNG/JPG, copiar codigo |
| `ExportButton.tsx` | Boton de exportar PDF con formulario de personalizacion |
| `MethodologyTab.tsx` | Tab de detalles de metodologia y practicas |
| `ModelingTab.tsx` | Tab de tecnicas de modelado UML y diagramas |
| `PDFCustomizationForm.tsx` | Formulario para personalizar PDF (nombre, autor, secciones) |
| `ProcessTab.tsx` | Tab de fases del proceso de desarrollo y actividades |
| `TemplateModal.tsx` | Modal para preview de contenido de plantilla |
| `TemplatesSection.tsx` | Grid de plantillas aplicables a la recomendacion |
| `TimelineTab.tsx` | Tab con cronograma Gantt de 12 semanas por fases |

### `src/components/templates/` - Componentes de Plantillas

| Archivo | Descripcion |
|---------|-------------|
| `ChecklistCard.tsx` | Card de preview de checklist con categoria y tiempo estimado |
| `TemplateCard.tsx` | Card de preview de plantilla con metadata y tags |
| `TemplateFilters.tsx` | Filtros por categoria, metodologia, dificultad y busqueda |
| `TemplatePreviewModal.tsx` | Modal con contenido completo de la plantilla |

### `src/components/glossary/` - Componentes del Glosario

| Archivo | Descripcion |
|---------|-------------|
| `ExportGlossaryButton.tsx` | Boton para exportar glosario filtrado como PDF |
| `GlossaryFilters.tsx` | Filtros de busqueda, capitulo y categoria |
| `GlossaryStats.tsx` | Panel de estadisticas de terminos y metadata |
| `TermCard.tsx` | Card de termino individual con preview de definicion |
| `TermModal.tsx` | Modal con detalles completos del termino, ejemplos y relaciones |
| `TermsGrid.tsx` | Grid responsivo de cards de terminos |
| `TermTooltip.tsx` | Tooltip rapido con definicion al hover |

### `src/components/pdf/` - Componentes PDF del Wizard

| Archivo | Descripcion |
|---------|-------------|
| `WizardResultPDFDocument.tsx` | Documento PDF principal para resultados del wizard |

---

## `src/hooks/` - Custom React Hooks

| Archivo | Descripcion |
|---------|-------------|
| `useDiagram.ts` | Hook para generacion y cache de diagramas Mermaid |
| `useExportPDF.tsx` | Hook para funcionalidad de exportar PDF y manejo de estado |
| `useGlossary.ts` | Hook para filtrado, busqueda y estadisticas del glosario |
| `useRecommendation.ts` | Hook para cargar y gestionar datos de recomendacion |
| `useTemplates.ts` | Hook para filtrado de plantillas y checklists |
| `useWizard.ts` | Hook para estado del wizard, navegacion y tracking de decisiones |
| `useWizardState.ts` | Hook para wizard avanzado con persistencia de estado del formulario |

---

## `src/lib/` - Librerias y Utilidades Core

| Archivo | Descripcion |
|---------|-------------|
| `constants.ts` | Constantes de la app (config, capitulos, rutas, temas de diagramas) |
| `utils.ts` | Funciones utilitarias para formato de texto, validacion y helpers |

### `src/lib/wizard/`

| Archivo | Descripcion |
|---------|-------------|
| `questions.ts` | Definiciones de preguntas del wizard con opciones y texto de ayuda |
| `scoringAlgorithm.ts` | Algoritmo de scoring para determinar mejor recomendacion |

### `src/lib/types/`

| Archivo | Descripcion |
|---------|-------------|
| `templates.ts` | Tipos para filtrado y metadata de plantillas |
| `wizard.ts` | Tipos para preguntas y scoring del wizard |

### `src/lib/content-manager/`

| Archivo | Descripcion |
|---------|-------------|
| `index.ts` | Singleton content manager para acceder a capitulos y conceptos |
| `README.md` | Documentacion de la API del content manager |

### `src/lib/pdf/` - Pipeline de Generacion PDF

| Archivo | Descripcion |
|---------|-------------|
| `PDFDocument.tsx` | Documento PDF principal que combina todas las secciones |
| `GlossaryPDFDocument.tsx` | Componente PDF especializado para exportar glosario |
| `styles.ts` | Estilos compartidos para PDF (colores, tipografia, layout) |
| `utils.ts` | Funciones utilitarias para formato y layout de PDF |

#### `src/lib/pdf/utils/`

| Archivo | Descripcion |
|---------|-------------|
| `generate-diagrams.ts` | Pipeline SVG->Canvas->PNG para convertir diagramas Mermaid a imagenes PDF |

#### `src/lib/pdf/components/`

| Archivo | Descripcion |
|---------|-------------|
| `ArchitectureSection.tsx` | Seccion PDF de arquitectura del sistema |
| `AvoidSection.tsx` | Seccion PDF de anti-patrones y advertencias |
| `Cover.tsx` | Portada PDF con titulo, fecha y autor |
| `DiagramsSection.tsx` | Seccion PDF con diagramas embebidos como imagenes PNG |
| `MethodologySection.tsx` | Seccion PDF de detalles de metodologia |
| `ModelingSection.tsx` | Seccion PDF de tecnicas UML y modelado |
| `ProcessSection.tsx` | Seccion PDF de fases del proceso y actividades |
| `TemplatesSection.tsx` | Seccion PDF con listado de plantillas aplicables |
| `TimelineSection.tsx` | Seccion PDF con cronograma Gantt y timeline |

---

## `src/utils/` - Utilidades

| Archivo | Descripcion |
|---------|-------------|
| `path-resolver.ts` | Resolucion de rutas de archivos entre plataformas |
| `term-matcher.ts` | Matching y highlighting de terminos del glosario en texto |
| `pdf-export.ts` | Funcion core de exportar PDF usando React-PDF renderer |

### `src/utils/diagram-generators/` - Generadores de Diagramas

| Archivo | Descripcion |
|---------|-------------|
| `architecture-diagram.ts` | Genera diagramas Mermaid de patrones arquitectonicos (8 estilos) |
| `decision-tree-diagram.ts` | Genera diagramas Mermaid del flujo de decision del wizard |
| `process-diagram.ts` | Genera flowcharts Mermaid de procesos de desarrollo (7 procesos) |
| `timeline.ts` | Genera diagramas Gantt Mermaid del cronograma del proyecto |
| `helpers.ts` | Funciones auxiliares: sanitizacion, IDs unicos, colores |

---

## `src/types/` - Definiciones de Tipos TypeScript

| Archivo | Descripcion |
|---------|-------------|
| `index.ts` | Exportacion central de todos los tipos |
| `wizard.ts` | Tipos del wizard: estado, pasos, decisiones |
| `recommendation.ts` | Tipos de recomendacion: proceso, metodologia, timeline, arquitectura |
| `glossary.ts` | Tipos del glosario: terminos con definiciones y relaciones |
| `diagram.ts` | Tipos de diagramas y configuraciones Mermaid |
| `checklists.ts` | Tipos de checklists: items y secciones |
| `decision-tree.ts` | Tipos del arbol de decision: pasos y opciones |
| `pdf-customization.ts` | Tipos de personalizacion de exportar PDF |
| `templates.ts` | Tipos de plantillas y checklists |

### `src/types/content/`

| Archivo | Descripcion |
|---------|-------------|
| `chapter.ts` | Tipos de contenido de capitulos: conceptos y practicas |
| `index.ts` | Exportacion central de tipos de contenido |

---

## `src/data/` - Datos JSON del Proyecto

| Archivo | Descripcion |
|---------|-------------|
| `decision-tree.json` | Arbol de decision completo con 25+ paths mapeando tipos de sistema a recomendaciones |
| `decision-tree.json.backup` | Backup del arbol de decision |
| `recommendations.json` | 13 perfiles de recomendacion con proceso, metodologia, arquitectura y timeline |
| `templates.json` | 10 plantillas profesionales (SRS, user stories, arquitectura, test plan, etc.) |
| `checklists.json` | 4 checklists interactivos (pre-desarrollo, testing, despliegue, retrospectiva) |

### `src/data/core/`

| Archivo | Descripcion |
|---------|-------------|
| `README.md` | Documentacion de la estructura de contenido core y schemas |
| `content-schema.ts` | Schemas Zod para validacion de estructura de contenido JSON |

### `src/data/core/chapters/`

| Archivo | Descripcion |
|---------|-------------|
| `README.md` | Guia de estructura JSON de capitulos y lineamientos de contenido |
| `chapter-1.json` | Cap. 1: Introduccion a la Ingenieria de Software |
| `chapter-2.json` | Cap. 2: Procesos de Software (cascada, iterativo, espiral, RUP) |
| `chapter-3.json` | Cap. 3: Desarrollo Agil (Scrum, XP, Kanban) |
| `chapter-4.json` | Cap. 4: Ingenieria de Requisitos |
| `chapter-5.json` | Cap. 5: Modelado de Sistemas (UML) |
| `chapter-6.json` | Cap. 6: Diseno Arquitectonico |

### `src/data/glossary/`

| Archivo | Descripcion |
|---------|-------------|
| `index.json` | Indice consolidado de todos los terminos del glosario |
| `chapter-1.json` | Glosario Cap. 1: 100+ terminos basicos |
| `chapter-2.json` | Glosario Cap. 2: 250+ terminos de procesos |
| `chapter-3.json` | Glosario Cap. 3: 300+ terminos agiles |
| `chapter-4.json` | Glosario Cap. 4: 400+ terminos de requisitos |
| `chapter-5.json` | Glosario Cap. 5: 350+ terminos de modelado |
| `chapter-6.json` | Glosario Cap. 6: 350+ terminos de arquitectura |

---

## Estadisticas

| Metrica | Valor |
|---------|-------|
| Archivos TypeScript/TSX | ~85 |
| Archivos JSON de datos | ~20 |
| Componentes React | ~50 |
| Custom Hooks | 7 |
| Paginas/Rutas | 8 |
| Terminos del glosario | 2,100+ |
| Recomendaciones | 13 |
| Plantillas | 10 |
| Checklists | 4 |
| Capitulos cubiertos | 6 |
