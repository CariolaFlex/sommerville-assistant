# 🧪 TESTING CHECKLIST - Sommerville Assistant

## 📊 Build Metrics

**Build Status:** ✅ Compilado exitosamente
**Build Time:** 21.75 segundos
**Total Size:** 488 MB (.next directory)
**Production Start Time:** 357ms

### Bundle Sizes por Ruta

| Ruta | Tamaño | First Load JS | Tipo |
|------|--------|---------------|------|
| `/` | 179 B | 97.2 kB | Static |
| `/wizard` | 8.27 kB | 107 kB | Static |
| `/glossary` | 210 kB | 312 kB | Static |
| `/results/[id]` | 706 kB | 817 kB | Dynamic |
| `/templates` | 142 B | 88.4 kB | Static |

**Nota:** `/results/[id]` es el bundle más grande (817 kB) debido a:
- Mermaid.js (~100 kB)
- @react-pdf/renderer (~500 kB)
- Todos los componentes de tabs y secciones

---

## ✅ TESTING MANUAL

### 1. Página Principal (`/`)

#### Visual
- [ ] Logo/Título se muestra correctamente
- [ ] Descripción del proyecto es clara
- [ ] Botones de navegación están visibles
- [ ] Responsive en mobile (< 768px)
- [ ] Responsive en tablet (768-1024px)
- [ ] Responsive en desktop (> 1024px)

#### Funcionalidad
- [ ] Botón "Comenzar" navega a `/wizard`
- [ ] Link a glosario funciona
- [ ] Footer contiene información correcta
- [ ] Dark mode toggle funciona (si existe)

#### Performance
- [ ] Carga en < 2 segundos
- [ ] No hay errores en consola
- [ ] No hay warnings de React

---

### 2. Wizard/Asistente (`/wizard`)

#### Visual
- [ ] Primera pregunta se muestra
- [ ] Opciones están bien formateadas
- [ ] Breadcrumbs/stepper muestra paso actual
- [ ] Barra de progreso actualiza correctamente
- [ ] Cards de opciones tienen hover effect

#### Funcionalidad
- [ ] Hacer clic en opción avanza al siguiente paso
- [ ] Botón "Volver" regresa al paso anterior
- [ ] Botón "Reiniciar" vuelve al inicio
- [ ] Al completar, navega a `/results/[id]` correctamente
- [ ] Path tracking funciona (muestra decisiones tomadas)

#### Edge Cases
- [ ] No se puede avanzar sin seleccionar opción
- [ ] Volver desde primer paso está deshabilitado
- [ ] Breadcrumbs muestran correctamente 5+ pasos

#### Performance
- [ ] Transiciones son suaves
- [ ] No hay lag al seleccionar opciones
- [ ] Carga en < 1 segundo

---

### 3. Glosario (`/glossary`)

#### Visual
- [ ] Header con título y descripción
- [ ] 4 cards de estadísticas se muestran
- [ ] Filtros (búsqueda, capítulo, categoría) visibles
- [ ] Grid de términos en 1/2/3 columnas según viewport
- [ ] Badge de resultados muestra cantidad correcta
- [ ] Paginación se muestra (si > 30 términos)

#### Funcionalidad - Búsqueda
- [ ] Input de búsqueda tiene placeholder
- [ ] Búsqueda por nombre funciona
- [ ] Búsqueda por descripción funciona
- [ ] Búsqueda por keywords funciona
- [ ] Búsqueda es case-insensitive
- [ ] Debounce funciona (300ms, sin lag)

#### Funcionalidad - Filtros
- [ ] Select de capítulos lista 1-6
- [ ] Filtrar por capítulo funciona
- [ ] Select de categorías lista todas (ordenadas)
- [ ] Filtrar por categoría funciona
- [ ] Combinar búsqueda + filtros funciona
- [ ] Botón "Limpiar filtros" resetea todo

#### Funcionalidad - Términos
- [ ] Cards de términos muestran: nombre, categoría, descripción, keywords
- [ ] Colores de categoría son consistentes
- [ ] Click en término abre modal
- [ ] Modal muestra información completa
- [ ] Keywords se muestran como badges
- [ ] Términos relacionados son clickeables
- [ ] Click en relacionado cambia término en modal
- [ ] Cerrar modal con X funciona
- [ ] Cerrar modal con click fuera funciona

#### Funcionalidad - Paginación
- [ ] Muestra 30 términos por página
- [ ] Botón "Anterior" funciona
- [ ] Botón "Siguiente" funciona
- [ ] Números de página son clickeables
- [ ] Scroll suave al cambiar página
- [ ] Contador "Mostrando X - Y de Z" correcto

#### Estadísticas
- [ ] Total de términos: 2,100
- [ ] Capítulos cubiertos: 6
- [ ] Categorías únicas: número correcto
- [ ] Término más referenciado se muestra

#### Edge Cases
- [ ] Búsqueda sin resultados muestra empty state
- [ ] Filtros sin resultados muestra mensaje
- [ ] Modal con término sin relacionados no muestra sección

#### Performance
- [ ] Búsqueda no causa lag
- [ ] Filtrar 2,100 términos es rápido (< 500ms)
- [ ] Abrir modal es instantáneo
- [ ] Paginación es fluida

---

### 4. Resultados (`/results/[id]`)

#### Visual - General
- [ ] Header sticky con título
- [ ] Breadcrumb o badge con ID
- [ ] Título de recomendación destacado
- [ ] Descripción legible
- [ ] 6 tabs visibles (Proceso, Metodología, Modelado, Arquitectura, Timeline, Diagramas)
- [ ] Footer con navegación

#### Tab: Proceso
- [ ] Título "Proceso de Desarrollo"
- [ ] Nombre del proceso
- [ ] Badge de capítulo
- [ ] Sección "¿Por qué?" con lista
- [ ] Sección "¿Cómo implementarlo?" con lista numerada
- [ ] Iconos visibles (BookOpen)

#### Tab: Metodología
- [ ] Título "Metodología Recomendada"
- [ ] Nombre de metodología
- [ ] Prácticas en grid de cards
- [ ] Cards tienen hover effect
- [ ] Iconos visibles (Zap)

#### Tab: Modelado
- [ ] Título "Nivel de Modelado"
- [ ] Nivel se muestra
- [ ] Descripción del nivel
- [ ] Lista de diagramas requeridos
- [ ] Cada diagrama tiene descripción
- [ ] Iconos visibles (Box)

#### Tab: Arquitectura
- [ ] Título "Arquitectura del Sistema"
- [ ] Patrón arquitectónico
- [ ] Justificación (why)
- [ ] Lista de capas
- [ ] Consideraciones especiales
- [ ] Iconos visibles (Building2)

#### Tab: Timeline
- [ ] Título "Timeline del Proyecto"
- [ ] Tabla en desktop con 3 columnas
- [ ] Cards apiladas en mobile
- [ ] 12 semanas visibles
- [ ] Fases con colores diferentes
- [ ] Tareas listadas por semana
- [ ] Iconos visibles (Calendar)

#### Tab: Diagramas
- [ ] Título "Visualización de Diagramas"
- [ ] Introducción explicativa
- [ ] 4 diagramas en grid 2x2 (desktop) o 1 col (mobile)
- [ ] **Diagrama 1: Camino de Decisión**
  - [ ] Se renderiza sin errores
  - [ ] Muestra path desde inicio
  - [ ] Nodos en verde, resultado en azul
  - [ ] Botones de acción visibles
- [ ] **Diagrama 2: Proceso de Desarrollo**
  - [ ] Se renderiza sin errores
  - [ ] Muestra flujo del proceso correcto
  - [ ] Colores por fase
- [ ] **Diagrama 3: Arquitectura**
  - [ ] Se renderiza sin errores
  - [ ] Muestra patrón arquitectónico
  - [ ] Componentes visibles
- [ ] **Diagrama 4: Timeline (Gantt)**
  - [ ] Se renderiza sin errores
  - [ ] Muestra 12 semanas
  - [ ] Fases agrupadas
  - [ ] Tareas por semana
- [ ] Botón "Copiar código" funciona
- [ ] Botón "Descargar SVG" funciona
- [ ] Zoom In/Out funciona (50%-200%)
- [ ] Loading states se muestran
- [ ] Nota informativa al final

#### Sección: Plantillas
- [ ] Título "Plantillas Recomendadas"
- [ ] Grid de templates (2-3 columnas)
- [ ] Cada card muestra: nombre, descripción, categoría
- [ ] Badges de dificultad
- [ ] Tiempo estimado
- [ ] Tags (primeros 3)
- [ ] Link a `/templates` funciona
- [ ] Empty state si no hay plantillas

#### Sección: Checklists
- [ ] Título "Checklists de Validación"
- [ ] Accordion con checklists
- [ ] Click expande/colapsa
- [ ] Muestra primeros 5 items
- [ ] Badge con total de items
- [ ] Badge con críticos (rojo)
- [ ] Items críticos tienen icono AlertCircle
- [ ] Link a `/checklists` funciona
- [ ] Empty state si no hay checklists

#### Sección: Errores a Evitar
- [ ] Título "Errores Comunes a Evitar"
- [ ] Grid de cards (2 columnas)
- [ ] Cards en rojo/amarillo
- [ ] Icono XCircle visible
- [ ] Texto legible
- [ ] Nota adicional al final

#### Exportar PDF
- [ ] **Botón "Exportar PDF" visible (2 ubicaciones)**
- [ ] Click inicia generación
- [ ] Loading state: spinner + "Generando PDF..."
- [ ] Mensaje "Esto puede tardar 10-20 segundos..."
- [ ] **PDF se descarga automáticamente**
- [ ] Nombre de archivo correcto (sommerville-[titulo]-[fecha].pdf)
- [ ] Success state: checkmark + "¡PDF Descargado!"
- [ ] Auto-hide después de 3 segundos
- [ ] Error se muestra si falla

#### Validar PDF Descargado
- [ ] **Portada:**
  - [ ] Emoji 🎓 visible
  - [ ] Título "Sommerville Assistant"
  - [ ] Subtítulo con recomendación
  - [ ] Fecha de generación
  - [ ] ID de recomendación
  - [ ] Capítulos listados
  - [ ] Referencia bibliográfica
- [ ] **Página 2 - Contenido:**
  - [ ] Header con título
  - [ ] Proceso de Desarrollo completo
  - [ ] Metodología completa
  - [ ] Footer con número de página
- [ ] **Página 3 - Arquitectura:**
  - [ ] Header
  - [ ] Arquitectura completa
  - [ ] Errores a evitar
  - [ ] Footer
- [ ] **Página 4 - Timeline:**
  - [ ] Header
  - [ ] Tabla de 12 semanas legible
  - [ ] 3 columnas: Semana | Fase | Tareas
  - [ ] Nota informativa
  - [ ] Footer
- [ ] **Página 5 - Plantillas (si hay):**
  - [ ] Plantillas listadas
  - [ ] Metadata visible
  - [ ] Footer
- [ ] **Página final - Información:**
  - [ ] Acerca de
  - [ ] Propósito
  - [ ] Uso recomendado (4 puntos)
  - [ ] Referencia bibliográfica
  - [ ] Footer
- [ ] **General del PDF:**
  - [ ] Texto legible (no borroso)
  - [ ] Listas con viñetas/números
  - [ ] Saltos de página apropiados
  - [ ] No hay texto cortado
  - [ ] Badges de colores visibles
  - [ ] Se abre en Adobe Reader
  - [ ] Se abre en Chrome PDF viewer

#### Navegación
- [ ] Click en tabs cambia contenido
- [ ] URL no cambia al cambiar tabs
- [ ] Botón "Volver al asistente" funciona
- [ ] Botón "Nueva consulta" funciona
- [ ] Botón "Compartir" existe (placeholder ok)

#### Edge Cases
- [ ] Recomendación sin templates no rompe
- [ ] Recomendación sin checklists no rompe
- [ ] Recomendación sin "avoid" no rompe
- [ ] ID inválido muestra error 404
- [ ] Error state con mensaje claro

#### Performance
- [ ] Tabs cambian instantáneamente
- [ ] Diagramas renderizan en < 3 segundos
- [ ] PDF genera en < 30 segundos
- [ ] No hay memory leaks al cambiar tabs

---

### 5. Templates (`/templates`)

#### Visual
- [ ] Título "Plantillas"
- [ ] Placeholder o contenido básico
- [ ] No hay errores 404

#### Funcionalidad
- [ ] Página carga sin errores
- [ ] Navegación de vuelta funciona

---

### 6. Navegación Global

#### Header/Navigation
- [ ] Logo/título navega a `/`
- [ ] Links de navegación funcionan
- [ ] Responsive menu en mobile
- [ ] Dark mode toggle (si existe)

#### Responsive
- [ ] **Mobile (< 640px):**
  - [ ] Todo legible sin scroll horizontal
  - [ ] Botones accesibles
  - [ ] Tabs apilados o scrollables
  - [ ] Modal full-screen
- [ ] **Tablet (640-1024px):**
  - [ ] Layout de 2 columnas funciona
  - [ ] Sidebar colapsable
- [ ] **Desktop (> 1024px):**
  - [ ] Layout de 3 columnas
  - [ ] Max-width centrado

#### Dark Mode (si implementado)
- [ ] Toggle cambia tema
- [ ] Colores legibles en dark
- [ ] Persistencia entre páginas
- [ ] No hay flash al cargar

---

## 🔍 TESTING DE INTEGRACIÓN

### Flujo Completo 1: Usuario Nuevo
1. [ ] Entrar a `/`
2. [ ] Click "Comenzar"
3. [ ] Completar wizard (5-7 pasos)
4. [ ] Ver resultados en `/results/[id]`
5. [ ] Explorar 6 tabs
6. [ ] Exportar PDF
7. [ ] Volver al wizard
8. [ ] Reiniciar y probar otro path

### Flujo Completo 2: Explorar Glosario
1. [ ] Entrar a `/glossary`
2. [ ] Ver estadísticas
3. [ ] Buscar término "Scrum"
4. [ ] Filtrar por Capítulo 2
5. [ ] Combinar búsqueda + filtro
6. [ ] Abrir término en modal
7. [ ] Click en término relacionado
8. [ ] Cerrar modal
9. [ ] Limpiar filtros
10. [ ] Navegar páginas (si > 30 resultados)

### Flujo Completo 3: Generar y Validar PDF
1. [ ] Ir a `/results/rec-critical-stable-large`
2. [ ] Explorar todas las tabs
3. [ ] Click "Exportar PDF"
4. [ ] Esperar descarga
5. [ ] Abrir PDF en visor
6. [ ] Verificar todas las páginas
7. [ ] Verificar formato y legibilidad

---

## 🐛 TESTING DE ERRORES

### Manejo de Errores
- [ ] Ruta inexistente (`/asdfasdf`) → 404
- [ ] ID de recomendación inválido → error page
- [ ] PDF falla → mensaje de error visible
- [ ] JavaScript deshabilitado → fallback graceful
- [ ] Network offline → error handling

### Edge Cases Extremos
- [ ] Búsqueda con caracteres especiales (!@#$%)
- [ ] Búsqueda muy larga (> 100 caracteres)
- [ ] Abrir 10+ modales seguidos (memory leak?)
- [ ] Cambiar tabs rápidamente (race conditions?)
- [ ] Generar PDF múltiples veces seguidas

---

## ⚡ TESTING DE PERFORMANCE

### Lighthouse Scores (Desktop)
- [ ] Performance: > 90
- [ ] Accessibility: > 95
- [ ] Best Practices: > 90
- [ ] SEO: > 90

### Lighthouse Scores (Mobile)
- [ ] Performance: > 80
- [ ] Accessibility: > 95
- [ ] Best Practices: > 90
- [ ] SEO: > 90

### Core Web Vitals
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] FID (First Input Delay): < 100ms
- [ ] CLS (Cumulative Layout Shift): < 0.1

### Load Times
- [ ] `/` carga en < 2s
- [ ] `/wizard` carga en < 2s
- [ ] `/glossary` carga en < 3s (2,100 términos)
- [ ] `/results/[id]` carga en < 3s
- [ ] Diagramas renderizan en < 3s
- [ ] PDF genera en < 30s

---

## 🌐 TESTING DE COMPATIBILIDAD

### Navegadores Desktop
- [ ] Chrome (última versión)
- [ ] Firefox (última versión)
- [ ] Safari (última versión)
- [ ] Edge (última versión)

### Navegadores Mobile
- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Firefox Mobile

### Dispositivos
- [ ] iPhone SE (375px)
- [ ] iPhone 12/13 (390px)
- [ ] iPad (768px)
- [ ] iPad Pro (1024px)
- [ ] Desktop 1920px

---

## 📊 MÉTRICAS FINALES

### Bundle Analysis
- [ ] Shared chunks: 88.3 kB
- [ ] Largest chunk (results): 706 kB
- [ ] Glosario chunk: 210 kB
- [ ] No hay duplicación innecesaria

### Build Metrics
- [ ] Build time: ~22 segundos
- [ ] 0 errores TypeScript
- [ ] 0 warnings ESLint
- [ ] 9 páginas generadas

### Runtime Metrics
- [ ] Server start: < 500ms
- [ ] Hot reload: < 1s
- [ ] No memory leaks
- [ ] No console errors en producción

---

## ✅ CHECKLIST DE PRE-DEPLOY

Antes de hacer deploy a Vercel:

- [ ] Todos los tests manuales pasados
- [ ] Lighthouse scores aceptables
- [ ] PDF export funciona en producción
- [ ] No hay errores en consola
- [ ] Responsive en todos los dispositivos
- [ ] Dark mode funciona (si existe)
- [ ] README.md actualizado
- [ ] package.json tiene versión correcta
- [ ] .env.example creado (si necesario)
- [ ] Git commit con mensaje descriptivo
- [ ] Git push a main/master
- [ ] Vercel deployment configurado
- [ ] Dominio configurado (si aplica)

---

## 📝 NOTAS

### Problemas Conocidos
- `/results/[id]` tiene bundle grande (817 kB) por @react-pdf/renderer
  - Solución futura: Code splitting o lazy loading
- Glosario puede ser lento en dispositivos antiguos
  - Solución: Implementada paginación (30 items/página)

### Mejoras Futuras (post-launch)
- Implementar diagramas en PDF
- Agregar tests automatizados (Jest, Playwright)
- Optimizar bundle size de @react-pdf/renderer
- Agregar PWA support
- Implementar analytics

---

**Fecha de creación:** 2026-02-16
**Versión:** 1.0.0
**Estado:** Listo para testing manual
