# 📚 Content Manager - Sistema de Gestión de Contenido

## Propósito

El Content Manager es el sistema central que gestiona todo el conocimiento extraído del libro "Ingeniería de Software" de Ian Sommerville.

## Arquitectura

```
Content Manager (Singleton)
├─ chapters: Map<string, Chapter>       # Capítulos completos
├─ conceptsIndex: Map<string, Concept>  # Índice rápido de conceptos
└─ practicesIndex: Map<string, Practice> # Índice rápido de prácticas
```

## Uso

### Importar

```typescript
import { contentManager, getConcept, searchConcepts } from '@/lib/content-manager';
```

### Obtener capítulo

```typescript
const chapter2 = contentManager.getChapter('chapter-2');
console.log(chapter2.title); // "Procesos de Software"
```

### Buscar conceptos

```typescript
// Por ID
const scrum = getConcept('scrum');

// Por texto
const results = searchConcepts('agile');

// Por categoría
const agilePractices = contentManager.findConceptsByCategory('agile-practice');
```

### Navegar relaciones

```typescript
const scrum = getConcept('scrum');
const related = contentManager.getRelatedConcepts('scrum');
// Retorna: ['sprint', 'product-backlog', 'scrum-master', ...]
```

### Obtener prácticas aplicables

```typescript
const practices = contentManager.getPracticesFor('web-saas', 'scrum');
// Retorna prácticas recomendadas para proyectos web usando Scrum
```

## Escalabilidad

El sistema está preparado para agregar capítulos 7-10 en el futuro:

1. Crear archivo JSON (ej: `chapter-7.json`)
2. Importar en `index.ts`
3. Agregar al array en `loadChapters()`
4. ✅ Todo funciona automáticamente

## Estado Actual

**FASE 0:** Estructura creada, esperando población de datos en FASE 1.

## Próximos Pasos

- **FASE 1:** Poblar `chapter-1.json` a `chapter-6.json`
- **FASE 2:** Agregar validaciones con Zod
- **FUTURO:** Agregar capítulos 7-10
