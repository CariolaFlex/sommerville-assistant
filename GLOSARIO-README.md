# 📚 Glosario Consolidado de Sommerville

## 📊 Resumen de Estadísticas

- **Versión**: 1.0
- **Última Actualización**: 2026-02-16
- **Total de Términos**: 2,100
- **Total de Capítulos**: 6
- **Total de Categorías**: 570
- **Tamaño del Archivo**: 1.5 MB
- **Líneas de JSON**: 52,772

## 📖 Distribución por Capítulo

| Capítulo | Título | Términos |
|----------|--------|----------|
| 1 | Introducción a la Ingeniería de Software | 396 |
| 2 | Procesos de Software | 672 |
| 3 | Desarrollo Ágil de Software | 250 |
| 4 | Ingeniería de Requerimientos | 207 |
| 5 | Modelado de Sistemas | 281 |
| 6 | Arquitectura de Software | 294 |

## 🏷️ Categorías Principales

El glosario incluye 570 categorías únicas, incluyendo:

- Actividades (Scrum, adquisición, análisis, arquitectura, diseño, etc.)
- Artefactos (documentación, diseño, implementación, pruebas, etc.)
- Conceptos (desarrollo, gestión, proceso, modelado, etc.)
- Componentes (arquitectura, hardware, sistema, software, etc.)
- Herramientas (CASE, desarrollo, gestión, pruebas, etc.)
- Metodologías (desarrollo, diseño, proceso, etc.)
- Modelos (arquitectura, desarrollo, negocio, proceso, etc.)
- Técnicas (análisis, desarrollo, diseño, gestión, etc.)
- Tipos (aplicación, diagrama, proceso, prueba, requerimiento, sistema, etc.)

## 📁 Estructura del Archivo

```json
{
  "version": "1.0",
  "lastUpdated": "2026-02-16",
  "totalTerms": 2100,
  "chapters": [
    {
      "chapter": 1,
      "title": "Introducción a la Ingeniería de Software",
      "termCount": 396,
      "terms": [
        {
          "id": "cap1-001",
          "nombre": "Ingeniería de software",
          "categoria": "Disciplina",
          "descripcionBreve": "...",
          "capitulo": 1,
          "keywords": ["ingeniería", "software"],
          "relatedTerms": []
        }
      ]
    }
  ],
  "categories": [...],
  "allTerms": [...]
}
```

## 🔧 Formato de Términos

Cada término tiene la siguiente estructura:

- **id**: Identificador único formato `capX-XXX` (ej: `cap1-001`)
- **nombre**: Nombre del término
- **categoria**: Categoría del término
- **descripcionBreve**: Descripción concisa del término
- **capitulo**: Número del capítulo (1-6)
- **keywords**: Array de palabras clave extraídas del nombre
- **relatedTerms**: Array de IDs de términos relacionados (vacío por ahora)

## 📝 Ejemplos de Términos

### Capítulo 1: Introducción
```json
{
  "id": "cap1-001",
  "nombre": "Ingeniería de software",
  "categoria": "Disciplina",
  "descripcionBreve": "Disciplina de ingeniería que se interesa por todos los aspectos de la producción de software...",
  "capitulo": 1,
  "keywords": ["ingeniería", "software"],
  "relatedTerms": []
}
```

### Capítulo 3: Desarrollo Ágil
```json
{
  "id": "cap3-001",
  "nombre": "Desarrollo ágil de software",
  "categoria": "Paradigma de desarrollo",
  "descripcionBreve": "Enfoque de desarrollo de software basado en entregas incrementales...",
  "capitulo": 3,
  "keywords": ["desarrollo", "ágil", "software"],
  "relatedTerms": []
}
```

### Capítulo 6: Arquitectura
```json
{
  "id": "cap6-001",
  "nombre": "Arquitectura de software",
  "categoria": "Concepto fundamental",
  "descripcionBreve": "Descripción de cómo se organiza un sistema de software...",
  "capitulo": 6,
  "keywords": ["arquitectura", "software"],
  "relatedTerms": []
}
```

## 🚀 Uso en la Aplicación

El archivo consolidado `src/data/glossary/index.json` está listo para ser utilizado en:

1. **Tooltips contextuales**: Mostrar definiciones al pasar el cursor sobre términos
2. **Búsqueda de glosario**: Filtrar por capítulo, categoría o palabra clave
3. **Referencias cruzadas**: Enlazar términos relacionados
4. **Exportación PDF**: Incluir glosario en documentos generados
5. **Validación de contenido**: Verificar que términos usados estén en el glosario

## 🔄 Actualización del Glosario

Para regenerar el archivo consolidado después de modificar los archivos de capítulo:

```bash
node scripts/build-glossary-index.js
```

El script automáticamente:
- ✅ Lee los 6 archivos de capítulos
- ✅ Normaliza las propiedades de cada término
- ✅ Genera IDs únicos secuenciales
- ✅ Extrae keywords automáticamente
- ✅ Consolida todas las categorías
- ✅ Genera estadísticas
- ✅ Guarda el archivo index.json

## ✅ Validación

El archivo ha sido validado y cumple con:
- ✅ Formato JSON válido
- ✅ Estructura TypeScript compatible
- ✅ IDs únicos para todos los términos
- ✅ Propiedades normalizadas
- ✅ Keywords generadas automáticamente
- ✅ Categorías consolidadas
- ✅ Estadísticas correctas
