# 🔍 AUDITORÍA COMPLETA DEL PROYECTO SOMMERVILLE ASSISTANT

## 🎯 OBJETIVO
Validar que la implementación actual refleje **completamente** el conocimiento de los 9 archivos fuente y corregir todas las inconsistencias, vacíos y errores.

## 📚 FUENTES DE VERDAD (en orden de prioridad)

### 1. Core Knowledge (Conocimiento Nuclear)
- `core-knowledge/arbol_decisiones_sommerville.md`
  - Define el **árbol de decisiones completo**
  - Debe mapear 1:1 con `src/data/decision-tree.json`
  
- `core-knowledge/nodos_finales_complementarios.md`
  - Define las **13 recomendaciones finales**
  - Debe mapear 1:1 con `src/data/recommendations.json`
  
- `core-knowledge/plantillas_y_checklists.md`
  - Define **todas las plantillas y checklists**
  - Debe mapear 1:1 con `src/data/templates.json` y `src/data/checklists.json`

### 2. Book Chapters (Fundamento Teórico)
- `book-chapters/Capitulo_1.md` → Conceptos fundamentales
- `book-chapters/Capitulo_2.md` → Procesos de software
- `book-chapters/Capitulo_3.md` → Métodos ágiles
- `book-chapters/Capitulo_4.md` → Ingeniería de requisitos
- `book-chapters/Capitulo_5.md` → Modelado de sistemas
- `book-chapters/Capitulo_6.md` → Arquitectura de software

## 🔴 PROBLEMAS IDENTIFICADOS

### 1. Wizard demasiado simple
**Actual:** 2-3 preguntas → resultado
**Esperado:** Árbol complejo con múltiples niveles de decisión

**Archivos a revisar:**
- `src/data/decision-tree.json`
- `core-knowledge/arbol_decisiones_sommerville.md`

**Validar:**
- ¿El JSON refleja TODAS las preguntas del MD?
- ¿Hay nodos faltantes?
- ¿Las opciones cubren todos los casos del libro?

### 2. Recomendaciones incompletas
**Actual:** 13 recomendaciones básicas
**Esperado:** Recomendaciones con toda la profundidad del libro

**Archivos a revisar:**
- `src/data/recommendations.json`
- `core-knowledge/nodos_finales_complementarios.md`
- Todos los `book-chapters/Capitulo_X.md`

**Validar:**
- ¿Cada recomendación tiene process, methodology, modeling, architecture completos?
- ¿Falta información de los capítulos?
- ¿Los avoid items reflejan anti-patrones del libro?

### 3. Diagramas no funcionan
**Actual:** Timeout error

**Archivos a revisar:**
- `src/utils/diagram-generators/*.ts`
- `src/components/results/DiagramViewer.tsx`
- `core-knowledge/arbol_decisiones_sommerville.md` (para decision tree)
- `book-chapters/Capitulo_2.md` (para process diagrams)

**Validar:**
- ¿El código Mermaid generado es sintácticamente correcto?
- ¿Los datos que reciben los generadores son completos?
- ¿Falta mapear información de los MD a los diagramas?

### 4. Plantillas y Checklists desconectados
**Actual:** Aparecen en UI pero no están bien integrados

**Archivos a revisar:**
- `src/data/templates.json`
- `src/data/checklists.json`
- `core-knowledge/plantillas_y_checklists.md`

**Validar:**
- ¿Todas las plantillas del MD están en el JSON?
- ¿Los contenidos son completos?
- ¿Falta mapear plantillas a recomendaciones específicas?

## ✅ PLAN DE AUDITORÍA (ORDEN SUGERIDO)

### PASO 1: Mapeo Completo de Fuentes
1. Leer los 9 archivos MD completamente
2. Crear matriz de trazabilidad:
   - Conceptos del libro → JSON actual
   - Decisiones del árbol → decision-tree.json
   - Recomendaciones finales → recommendations.json
   - Plantillas → templates.json
3. Identificar TODOS los vacíos

### PASO 2: Validación de decision-tree.json
1. Comparar `arbol_decisiones_sommerville.md` vs `src/data/decision-tree.json`
2. Verificar:
   - ¿Faltan nodos?
   - ¿Faltan opciones en nodos existentes?
   - ¿Los IDs son consistentes?
   - ¿El árbol tiene la profundidad correcta?
3. Listar cambios necesarios

### PASO 3: Validación de recommendations.json
1. Comparar `nodos_finales_complementarios.md` vs `src/data/recommendations.json`
2. Para cada recomendación:
   - ¿Tiene toda la info de process del Capítulo 2?
   - ¿Tiene toda la info de methodology del Capítulo 3?
   - ¿Tiene toda la info de modeling del Capítulo 5?
   - ¿Tiene toda la info de architecture del Capítulo 6?
3. Enriquecer con info faltante de los capítulos

### PASO 4: Validación de templates.json y checklists.json
1. Comparar `plantillas_y_checklists.md` vs JSONs
2. Verificar completitud de contenidos
3. Agregar campos faltantes (usage, examples, etc.)

### PASO 5: Fix de Diagramas
1. Validar que los generadores reciban datos completos
2. Corregir sintaxis Mermaid
3. Probar cada tipo de diagrama en mermaid.live

### PASO 6: Testing de Integración Completa
1. Probar wizard con todos los caminos posibles
2. Verificar que cada camino lleve a la recomendación correcta
3. Validar que los diagramas se generan para cada recomendación
4. Verificar que plantillas y checklists se muestran correctamente

## 📋 ENTREGABLES ESPERADOS

1. **AUDIT-REPORT.md**
   - Matriz de trazabilidad completa
   - Lista de vacíos encontrados
   - Cambios realizados en cada JSON

2. **decision-tree.json (REVISADO)**
   - Árbol completo con todos los nodos del MD
   - Validado contra el archivo fuente

3. **recommendations.json (ENRIQUECIDO)**
   - Cada recomendación con info completa de los 6 capítulos
   - Sin vacíos de información

4. **templates.json y checklists.json (COMPLETOS)**
   - Todos los contenidos del MD
   - Correctamente mapeados a recomendaciones

5. **Diagramas funcionando**
   - 4 tipos renderizando sin errores
   - Código Mermaid validado

6. **Wizard enriquecido**
   - Más preguntas
   - Flujo más personalizado
   - Validaciones correctas

## 🚨 CRITERIOS DE ÉXITO

- [ ] Cada concepto de los 9 MD tiene su lugar en el código
- [ ] decision-tree.json refleja 100% el árbol del MD
- [ ] recommendations.json tiene info completa de los 6 capítulos
- [ ] Plantillas y checklists están completos
- [ ] Diagramas renderizan en < 10 segundos
- [ ] Wizard tiene al menos 5-7 niveles de decisión
- [ ] 0 errores de build
- [ ] Testing manual completo pasa

---

**INSTRUCCIONES PARA CLAUDE CODE:**
1. Lee todos los archivos de `audit-source/` primero
2. Luego revisa los archivos actuales de `src/data/` y `src/utils/`
3. Crea AUDIT-REPORT.md con hallazgos
4. Implementa correcciones en orden (JSONs → generadores → componentes)
5. Valida cada cambio con testing manual
6. Documenta todo en el reporte
