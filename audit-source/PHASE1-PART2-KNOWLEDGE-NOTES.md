# 📚 FASE 1 - PARTE 2: NOTAS DE CONOCIMIENTO EXTRAÍDO

**Fecha:** 2026-02-16
**Propósito:** Consolidar conocimiento de Capítulos 2-6 para enriquecer recommendations.json

---

## 🎯 PROCESO (Cap. 2)

### WATERFALL (Cascada)
**Fases:**
1. Análisis y definición de requerimientos
2. Diseño del sistema y software
3. Implementación y prueba de unidad
4. Integración y prueba de sistema
5. Operación y mantenimiento

**Cuándo usar:**
- Requerimientos estables y bien entendidos
- Sistemas críticos de seguridad
- Hardware y software desarrollados juntos
- Contratos formales requieren especificación completa

**Cuándo NO usar:**
- Requerimientos cambiantes
- Incertidumbre en requerimientos
- Interfaces de usuario necesitan experimentación

**Ventajas:**
- Documentación completa en cada fase
- Progreso medible y visible
- Apropiado para equipos distribuidos
- Bueno para cumplimiento regulatorio

**Desventajas:**
- Difícil acomodar cambios
- Cliente ve sistema solo al final
- Iteraciones costosas

---

### DESARROLLO INCREMENTAL
**Características:**
- Especificación, desarrollo y validación entrelazadas
- Versión inicial → Versiones intermedias → Versión final
- Cada incremento ejecutable y utilizable

**Cuándo usar:**
- Sistemas empresariales (e-commerce, SaaS)
- Apps móviles
- Requerimientos cambiantes
- Cliente necesita valor rápido

**Cuándo NO usar:**
- Sistemas embebidos (dependencia de hardware)
- Sistemas críticos (análisis exhaustivo necesario)
- Sistemas muy grandes con equipos distribuidos

**Beneficios:**
- Costo reducido de cambios
- Retroalimentación temprana del cliente
- Entrega rápida de valor

**Problemas:**
- Visibilidad del proceso reducida
- Degradación de estructura (requiere refactorización)

---

### RUP (Proceso Unificado Racional)
**4 Fases:**
1. **Concepción (Inception):** Establecer caso empresarial
2. **Elaboración (Elaboration):** Comprender dominio, marco arquitectónico
3. **Construcción (Construction):** Diseño, programación, pruebas
4. **Transición (Transition):** Implementación en ambiente real

**6 Flujos de trabajo:**
1. Modelado del negocio
2. Requerimientos
3. Análisis y diseño
4. Implementación
5. Pruebas
6. Despliegue

**6 Mejores prácticas:**
1. Desarrollo iterativo
2. Gestión de requerimientos
3. Arquitecturas basadas en componentes
4. Modelado visual (UML)
5. Verificar calidad
6. Controlar cambios

**Ideal para:** Sistemas empresariales grandes, equipos distribuidos

---

### MODELO ESPIRAL
**4 Sectores por ciclo:**
1. **Establecimiento de objetivos:** Definir objetivos, restricciones, plan
2. **Valoración y reducción del riesgo:** Análisis detallado, acciones (ej: prototipos)
3. **Desarrollo y validación:** Elegir modelo según riesgos
4. **Planeación:** Revisión, decisión de continuar

**Cuándo usar:**
- Alta incertidumbre
- Riesgos significativos
- Proyectos complejos

---

## 🏃 METODOLOGÍA (Cap. 3)

### XP (Extreme Programming)
**12 Prácticas:**
1. Planeación incremental (historias de usuario)
2. Liberaciones pequeñas (cada 2 semanas)
3. Diseño simple (suficiente para requerimientos actuales)
4. Desarrollo de primera prueba (TDD)
5. Refactorización continua
6. Programación en pares
7. Propiedad colectiva del código
8. Integración continua
9. Ritmo sustentable (sin horas extra excesivas)
10. Cliente en sitio (tiempo completo)
11. Estándares de código
12. Metáfora del sistema

**Cuándo usar:**
- Equipos pequeños (3-9 personas)
- Requerimientos volátiles
- Cliente disponible tiempo completo
- Sistemas no críticos

**Artefactos:**
- Historias de usuario (tarjetas)
- Tareas (1-2 días)
- Pruebas automatizadas

---

### SCRUM
**3 Roles:**
1. **Product Owner:** Representa cliente, define/prioriza backlog
2. **Scrum Master:** Facilitador, protege equipo, remueve impedimentos
3. **Equipo de Desarrollo:** Auto-organizado, 5-9 personas

**Eventos:**
1. **Sprint Planning:** Seleccionar historias, acordar alcance
2. **Daily Scrum:** 15 min, 3 preguntas (qué hice, qué haré, impedimentos)
3. **Sprint Review:** Demo a stakeholders
4. **Sprint Retrospective:** Mejora continua del proceso

**Artefactos:**
1. Product Backlog (cartera priorizada)
2. Sprint Backlog (tareas del sprint)
3. Incremento (software funcional)

**Sprint:** 2-4 semanas, timeboxed, sin cambios durante ejecución

**Cuándo usar:**
- Requerimientos cambiantes
- Cliente disponible para colaboración
- Equipos co-localizados o con buena comunicación

---

## 📐 MODELADO (Cap. 5)

### Diagramas UML Esenciales

**1. Modelo de Contexto:**
- Muestra sistema + entorno
- Define fronteras
- Identifica sistemas externos

**2. Casos de Uso:**
- Interacciones usuario-sistema
- Actores + elipses (casos)
- Documentación con tabla (actores, descripción, datos, estímulo, respuesta)

**3. Diagramas de Secuencia:**
- Orden temporal de mensajes
- Líneas de vida verticales
- Flechas horizontales (tiempo de arriba → abajo)
- Útil para: APIs, protocolos, debugging

**4. Diagramas de Clases:**
- Estructura estática
- Clases + atributos + métodos
- Asociaciones con multiplicidad (1, 0..1, 1..*, *)
- Tipos: Asociación, Agregación, Composición, Generalización

**5. Diagramas de Estado:**
- Máquina de estados finitos
- Estados + eventos + transiciones
- Útil para: Sistemas reactivos, workflows, protocolos

**6. Diagramas de Actividad:**
- Flujo de trabajo
- Actividades + decisiones + paralelismo
- Útil para: Procesos de negocio, algoritmos, pipelines

---

## 🏗️ ARQUITECTURA (Cap. 6)

### Patrones Arquitectónicos

**1. MVC (Modelo-Vista-Controlador):**
- **Modelo:** Datos
- **Vista:** Presentación
- **Controlador:** Lógica de interacción
- **Cuándo:** Múltiples vistas para mismos datos, desarrollo web/móvil

**2. Arquitectura en Capas:**
- 4 capas típicas: UI → Lógica Negocio → Acceso Datos → BD/SO
- Regla: Capa N solo habla con Capa N-1
- **Cuándo:** Sistemas empresariales, equipos paralelos, seguridad multinivel

**3. Repositorio:**
- Base de datos central compartida
- Componentes independientes acceden repositorio
- **Cuándo:** Grandes volúmenes de datos compartidos, IDEs, gestión documental

**4. Cliente-Servidor:**
- Servicios centralizados (servidores) + múltiples clientes
- **Cuándo:** Acceso multi-ubicación, datos centralizados, carga variable

**5. Tubería y Filtro (Pipeline):**
- Transformaciones secuenciales
- Datos fluyen por filtros
- **Cuándo:** Procesamiento batch, transformaciones secuenciales, compiladores

---

### Arquitecturas de Aplicación

**A. Procesamiento de Transacciones:**
- Estructura: Procesamiento I/O → Lógica Aplicación → Gestor Transacciones → BD
- Características ACID: Atomicidad, Consistencia, Aislamiento, Durabilidad
- Ejemplos: Cajeros, e-commerce, reservas, banca

**B. Procesamiento de Lenguaje:**
- Fases: Léxico → Sintaxis → Semántico → Generación de Código
- Dos variantes: Tubería (batch) o Repositorio (interactivo/IDE)
- Ejemplos: Compiladores, intérpretes, traductores XML

---

### Modelo 4+1 (Vistas Arquitectónicas)

1. **Vista Lógica:** Clases, objetos, abstracciones (para desarrolladores)
2. **Vista de Proceso:** Procesos concurrentes (para arquitectos)
3. **Vista de Desarrollo:** Módulos/paquetes (para gerentes)
4. **Vista Física:** Hardware y distribución (para DevOps)
5. **Vista de Casos de Uso (+1):** Valida consistencia de todas las vistas

---

## 🎯 CRITERIOS DE DECISIÓN

### Cuándo usar Cascada:
- Requerimientos estables
- Sistema crítico de seguridad
- Contrato formal
- Equipo distribuido
- Regulación externa estricta

### Cuándo usar Incremental:
- Requerimientos cambiantes
- Time-to-market crítico
- Cliente disponible
- Sistema no crítico
- Necesidad de feedback temprano

### Cuándo usar RUP:
- Sistema empresarial grande
- Equipos distribuidos
- Necesidad de documentación formal
- Desarrollo iterativo con estructura

### Cuándo usar XP:
- Equipo pequeño (3-9 personas)
- Requerimientos muy volátiles
- Cliente tiempo completo
- Énfasis en calidad de código

### Cuándo usar Scrum:
- Gestión ágil de proyecto
- Sprints de 2-4 semanas
- Product Owner claro
- Necesidad de demos frecuentes

---

## 📋 ELEMENTOS PARA ENRIQUECER RECOMENDACIONES

### Para el campo PROCESS:
- Fases detalladas con actividades
- Entradas y salidas de cada fase
- Gates (puntos de decisión)
- Cuándo usar / cuándo NO usar
- Ventajas y desventajas
- Gestión de cambios (Change Control Board, proceso de aprobación)
- Herramientas (software de gestión de proyectos, control de versiones)

### Para el campo METHODOLOGY:
- Roles específicos (responsabilidades)
- Eventos/ceremonias (duración, participantes, objetivo)
- Artefactos (con plantillas)
- Prácticas técnicas (TDD, pair programming, refactoring)
- Métricas (velocity, burndown, code coverage)

### Para el campo MODELING:
- Diagramas UML específicos por tipo de sistema
- Cuándo usar cada diagrama
- Ejemplos de templates
- Herramientas recomendadas

### Para el campo ARCHITECTURE:
- Patrones arquitectónicos recomendados
- Trade-offs (rendimiento vs seguridad, etc.)
- Decisiones arquitectónicas críticas
- Vistas arquitectónicas necesarias

---

**Estado:** ✅ TAREA 2.1 COMPLETADA (Lectura de Capítulos 2-6)

**Siguiente:** TAREA 2.2 - Enriquecer campo PROCESS para las 13 recomendaciones
