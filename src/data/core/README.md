# 🎯 Core Content - Sistema de Contenido Estructurado

## Propósito

Esta carpeta contiene el **conocimiento estructurado** del libro "Ingeniería de Software" de Ian Sommerville en formato JSON consumible por la aplicación.

## Arquitectura

```
data/core/
├── chapters/           # JSONs de capítulos 1-6 (futuro: 7-10)
│   ├── chapter-1.json
│   ├── chapter-2.json
│   └── ...
│
└── content-schema.ts   # Validación con Zod
```

## Relación con Otros Sistemas

```
audit-source/                     (Fuentes originales MD)
        ↓
data/core/chapters/               (Conocimiento estructurado JSON)
        ↓
lib/content-manager/              (Sistema de gestión)
        ↓
Components/Pages                  (Consumo en UI)
```

## Estado Actual

**FASE 0 (COMPLETADA):**
- ✅ Estructura de carpetas creada
- ✅ Types definidos (`src/types/content/`)
- ✅ Content Manager implementado
- ✅ Schemas de validación creados
- ✅ Archivos JSON placeholder listos

**FASE 1 (PRÓXIMO):**
- [ ] Poblar chapter-1.json a chapter-6.json
- [ ] Extraer contenido de archivos MD
- [ ] Validar con schemas

## Escalabilidad

Preparado para:
- ✅ Capítulos 7-10 (solo crear JSONs y agregar a Content Manager)
- ✅ Nuevas categorías de conceptos
- ✅ Nuevos tipos de relaciones entre conceptos
