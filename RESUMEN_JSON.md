# 📋 RESUMEN: Árbol de Decisiones JSON

## ✅ ARCHIVO GENERADO

**Ubicación**: `decision-tree.json`
**Tamaño**: 18.4 KB
**Encoding**: UTF-8

---

## 📊 ESTADÍSTICAS

- **Total de caminos**: 13
- **Total de steps**: 10
- **Total de opciones**: 26
- **Nodos finales únicos**: 13 (rec-001 a rec-013)
- **Tipos de sistema**: 8

---

## 🏗️ ESTRUCTURA DEL JSON

```json
{
  "version": "1.0",
  "metadata": { ... },
  "rootStepId": "step-root",
  "totalPaths": 13,
  "steps": { ... },
  "pathsIndex": [ ... ]
}
```

---

## 🔷 INTERFACES TYPESCRIPT

### DecisionTree (Root)

```typescript
interface DecisionTree {
  version: string;
  metadata: {
    title: string;
    description: string;
    chapters_covered: number[];
    last_updated: string;
  };
  rootStepId: string;
  totalPaths: number;
  steps: Record<string, Step>;
  pathsIndex: PathIndex[];
}
```

### Step

```typescript
interface Step {
  id: string;
  type: 'root' | 'branch';
  question: string;
  description: string;
  chapter: number;
  options: Option[];
}
```

### Option

```typescript
interface Option {
  id: string;
  label: string;
  description: string;
  examples?: string[];
  icon?: string;
  nextStepId: string | null;
  finalRecommendationId?: string;
  characteristics?: Record<string, any>;
  whenToChoose?: string[];
  warning?: string;
}
```

### PathIndex

```typescript
interface PathIndex {
  pathId: string;
  route: string[]; // Array de option IDs
  recommendationId: string;
  summary: string;
  tags: string[];
}
```

---

## 🎯 MAPEO DE IDs DE RECOMENDACIONES

| ID | Ruta Resumida | Tags |
|----|---------------|------|
| **rec-001** | Crítico → Estables → Grande | crítico, grande, tradicional |
| **rec-002** | Crítico → Estables → Pequeño | crítico, pequeño, tradicional |
| **rec-003** | Crítico → Volátiles (CONFLICTO) | crítico, volátil, riesgo |
| **rec-004** | Transaccional → Estables → Grande | transaccional, grande, híbrido |
| **rec-005** | Transaccional → Volátiles → Cliente | transaccional, ágil, scrum |
| **rec-006** | Web/SaaS → Startup → Pequeño | web, startup, ágil |
| **rec-007** | Web/SaaS → Escalando | web, escalamiento, ágil |
| **rec-008** | Personal/Móvil → Muy pequeño | móvil, personal, ágil |
| **rec-009** | Entretenimiento | juegos, creativo, ágil |
| **rec-010** | Procesamiento Lotes | batch, eficiencia, tradicional |
| **rec-011** | IoT/Recolección Datos | iot, sensores, confiabilidad |
| **rec-012** | Sistema de Sistemas | complejo, integración, grande |
| **rec-013** | Web/SaaS → Sin Cliente (RIESGO) | web, startup, riesgo |

---

## 🛠️ USO EN REACT

### 1. Importar el JSON

```typescript
// src/data/decision-tree.json
import decisionTreeData from '@/data/decision-tree.json';
import type { DecisionTree } from '@/types/decision-tree';

const decisionTree: DecisionTree = decisionTreeData;
```

### 2. Hook personalizado

```typescript
// src/hooks/useDecisionTree.ts
import { useState } from 'react';
import decisionTree from '@/data/decision-tree.json';

export function useDecisionTree() {
  const [currentStepId, setCurrentStepId] = useState(decisionTree.rootStepId);
  const [path, setPath] = useState<string[]>([]);

  const currentStep = decisionTree.steps[currentStepId];

  const selectOption = (optionId: string) => {
    const option = currentStep.options.find(opt => opt.id === optionId);
    if (!option) return;

    const newPath = [...path, optionId];
    setPath(newPath);

    if (option.nextStepId) {
      setCurrentStepId(option.nextStepId);
    } else if (option.finalRecommendationId) {
      // Llegamos a nodo final
      return {
        finished: true,
        recommendationId: option.finalRecommendationId,
        path: newPath
      };
    }
  };

  const goBack = () => {
    if (path.length === 0) return;

    // Remover última decisión
    const newPath = path.slice(0, -1);
    setPath(newPath);

    // Reconstruir stepId basado en el nuevo path
    // (implementar lógica de navegación reversa)
  };

  return {
    currentStep,
    path,
    selectOption,
    goBack,
    progress: path.length
  };
}
```

### 3. Componente de navegación

```typescript
// src/components/DecisionWizard.tsx
import { useDecisionTree } from '@/hooks/useDecisionTree';

export function DecisionWizard() {
  const { currentStep, path, selectOption, goBack } = useDecisionTree();

  return (
    <div className="wizard-container">
      <h2>{currentStep.question}</h2>
      <p>{currentStep.description}</p>

      <div className="options-grid">
        {currentStep.options.map(option => (
          <button
            key={option.id}
            onClick={() => selectOption(option.id)}
            className="option-card"
          >
            <span className="icon">{option.icon}</span>
            <h3>{option.label}</h3>
            <p>{option.description}</p>
            {option.examples && (
              <ul className="examples">
                {option.examples.slice(0, 2).map((ex, i) => (
                  <li key={i}>{ex}</li>
                ))}
              </ul>
            )}
            {option.warning && (
              <div className="warning">{option.warning}</div>
            )}
          </button>
        ))}
      </div>

      {path.length > 0 && (
        <button onClick={goBack} className="back-button">
          ← Volver
        </button>
      )}
    </div>
  );
}
```

---

## 🔗 INTEGRACIÓN CON RECOMENDACIONES

Una vez que el usuario llega a un nodo final (obtiene un `finalRecommendationId`), 
debes buscar las recomendaciones completas en otro archivo:

```typescript
// src/data/recommendations.json (a crear por separado)
{
  "rec-001": {
    "id": "rec-001",
    "title": "Cascada + RUP (Sistema Crítico Grande)",
    "proceso": "Cascada",
    "metodologia": "RUP",
    "modelado": "UML Completo",
    "arquitectura": "Capas",
    "chapters": [2, 4, 5, 6],
    "timeline": "16-20 semanas típicas",
    "team": ">20 personas",
    "practices": [...],
    "immediate_actions": [...],
    "avoid": [...]
  },
  ...
}
```

---

## ⚡ VALIDACIÓN Y NAVEGACIÓN

### Validar camino completo

```typescript
function validatePath(path: string[]): PathIndex | null {
  return decisionTree.pathsIndex.find(p => 
    JSON.stringify(p.route) === JSON.stringify(path)
  );
}
```

### Obtener metadata del camino

```typescript
function getPathMetadata(recommendationId: string): PathIndex | undefined {
  return decisionTree.pathsIndex.find(p => 
    p.recommendationId === recommendationId
  );
}
```

---

## 📝 PRÓXIMOS PASOS

1. ✅ **JSON creado** → `decision-tree.json`
2. ⏳ **Crear interfaces TS** → `src/types/decision-tree.ts`
3. ⏳ **Crear recommendations.json** → Con detalles de rec-001 a rec-013
4. ⏳ **Implementar hook** → `useDecisionTree.ts`
5. ⏳ **Crear componentes** → Wizard, Step, Option
6. ⏳ **Testing** → Validar todos los 13 caminos

---

## 🎨 EJEMPLO DE FLUJO COMPLETO

```
1. Usuario entra → step-root
2. Selecciona "Sistema Web / SaaS" → step-web-context
3. Selecciona "Startup" → step-web-startup-client
4. Selecciona "Disponible" → step-web-startup-team
5. Selecciona "Pequeño" → rec-006 (FINAL)
6. App muestra recomendación completa de rec-006
7. Usuario puede exportar PDF con toda la info
```

---

**Generado**: 2026-02-15  
**Archivo fuente**: `arbol_decisiones_sommerville.md`  
**JSON output**: `decision-tree.json` (18.4 KB)
