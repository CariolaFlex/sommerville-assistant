# PLANTILLAS Y CHECKLISTS PRÁCTICOS
## Herramientas Listas para Usar - Basadas en Sommerville

---

## 📋 PLANTILLA 1: Documento de Especificación de Requisitos (Simplificado)

```markdown
# Especificación de Requisitos - [Nombre del Proyecto]

## 1. INTRODUCCIÓN

### 1.1 Propósito
[Para qué sirve este software]

### 1.2 Alcance
[Qué hace y qué NO hace]

### 1.3 Definiciones y Acrónimos
| Término | Definición |
|---------|------------|
| ...     | ...        |

## 2. DESCRIPCIÓN GENERAL

### 2.1 Perspectiva del Producto
[¿Es independiente o parte de un sistema mayor?]

### 2.2 Funciones del Producto
- Función principal 1
- Función principal 2
- Función principal 3

### 2.3 Usuarios del Sistema
| Tipo de Usuario | Descripción | Frecuencia de Uso |
|-----------------|-------------|-------------------|
| Usuario final   | ...         | Diaria           |
| Administrador   | ...         | Semanal          |

## 3. REQUISITOS FUNCIONALES

### RF-001: [Nombre del Requisito]
- **Descripción**: [Qué debe hacer el sistema]
- **Entrada**: [Qué datos recibe]
- **Proceso**: [Qué hace con los datos]
- **Salida**: [Qué produce]
- **Prioridad**: Alta / Media / Baja
- **Criterios de Aceptación**:
  1. [Criterio medible]
  2. [Criterio medible]

### RF-002: [Siguiente Requisito]
...

## 4. REQUISITOS NO FUNCIONALES

### 4.1 Rendimiento
- **RNF-001**: El sistema debe responder a consultas en < 2 segundos en el 95% de los casos
- **RNF-002**: Debe soportar 1000 usuarios concurrentes

### 4.2 Seguridad
- **RNF-003**: Autenticación de dos factores obligatoria
- **RNF-004**: Encriptación AES-256 para datos sensibles

### 4.3 Usabilidad
- **RNF-005**: Usuario nuevo completa tarea principal en < 5 minutos sin ayuda

### 4.4 Confiabilidad
- **RNF-006**: Disponibilidad del 99.9% (< 8.76 horas downtime/año)

### 4.5 Mantenibilidad
- **RNF-007**: Cobertura de tests > 80%

## 5. RESTRICCIONES

### 5.1 Tecnológicas
- Debe funcionar en navegadores Chrome, Firefox, Safari (últimas 2 versiones)
- Backend en [tecnología]

### 5.2 Regulatorias
- Cumplimiento GDPR para datos de usuarios europeos

### 5.3 Presupuestarias
- Costo de infraestructura < $X/mes

## 6. CASOS DE USO PRINCIPALES

### CU-001: Inicio de Sesión
- **Actor**: Usuario
- **Precondición**: Usuario tiene cuenta
- **Flujo Principal**:
  1. Usuario ingresa email y contraseña
  2. Sistema valida credenciales
  3. Sistema genera sesión
  4. Sistema redirige a dashboard
- **Flujo Alternativo**:
  - 2a. Credenciales inválidas → Mostrar error
- **Postcondición**: Usuario autenticado

## 7. CRITERIOS DE ACEPTACIÓN GLOBAL

- [ ] Todos los RF implementados y probados
- [ ] Todos los RNF validados con métricas
- [ ] Documentación de usuario completa
- [ ] Capacitación a usuarios completada
```

---

## 📋 PLANTILLA 2: Historia de Usuario (Ágil)

```markdown
┌─────────────────────────────────────────────────┐
│ ID: US-XXX                                      │
├─────────────────────────────────────────────────┤
│ TÍTULO: [Nombre descriptivo]                    │
├─────────────────────────────────────────────────┤
│ Como: [Tipo de usuario]                         │
│ Quiero: [Acción/Funcionalidad]                  │
│ Para: [Beneficio/Valor]                         │
├─────────────────────────────────────────────────┤
│ CRITERIOS DE ACEPTACIÓN:                        │
│ ✓ [Criterio específico y medible 1]            │
│ ✓ [Criterio específico y medible 2]            │
│ ✓ [Criterio específico y medible 3]            │
├─────────────────────────────────────────────────┤
│ PRIORIDAD: [ ] Alta  [ ] Media  [ ] Baja        │
│ ESTIMACIÓN: [ ] Story Points                    │
│ SPRINT: [ ]                                     │
├─────────────────────────────────────────────────┤
│ NOTAS TÉCNICAS:                                 │
│ [Detalles de implementación si son necesarios]  │
├─────────────────────────────────────────────────┤
│ DEPENDENCIAS:                                   │
│ - Depende de: [US-XXX]                         │
│ - Bloquea a: [US-XXX]                          │
└─────────────────────────────────────────────────┘
```

**Ejemplo Completado:**
```markdown
┌─────────────────────────────────────────────────┐
│ ID: US-042                                      │
├─────────────────────────────────────────────────┤
│ TÍTULO: Resetear contraseña                     │
├─────────────────────────────────────────────────┤
│ Como: Usuario que olvidó su contraseña          │
│ Quiero: Poder resetearla desde login            │
│ Para: Recuperar acceso a mi cuenta              │
├─────────────────────────────────────────────────┤
│ CRITERIOS DE ACEPTACIÓN:                        │
│ ✓ Link "Olvidé contraseña" visible en login    │
│ ✓ Email con token llega en < 5 minutos         │
│ ✓ Token expira en 1 hora                       │
│ ✓ Contraseña nueva cumple policy de seguridad  │
├─────────────────────────────────────────────────┤
│ PRIORIDAD: [X] Alta  [ ] Media  [ ] Baja        │
│ ESTIMACIÓN: [5] Story Points                    │
│ SPRINT: [3]                                     │
├─────────────────────────────────────────────────┤
│ NOTAS TÉCNICAS:                                 │
│ - Usar JWT con expiración de 1 hora            │
│ - Email service: SendGrid                       │
├─────────────────────────────────────────────────┤
│ DEPENDENCIAS:                                   │
│ - Depende de: US-001 (Sistema de autenticación)│
└─────────────────────────────────────────────────┘
```

---

## ✅ CHECKLIST 1: Antes de Escribir Código (Universal)

### Comprensión del Problema
- [ ] ¿Entiendo QUÉ problema estoy resolviendo?
- [ ] ¿Puedo explicarlo en 2 frases?
- [ ] ¿He hablado con al menos 1 usuario/stakeholder?
- [ ] ¿Tengo ejemplos concretos de uso?

### Requisitos Claros
- [ ] ¿Tengo los requisitos funcionales documentados?
- [ ] ¿Los requisitos no funcionales están CUANTIFICADOS?
  - ❌ "El sistema debe ser rápido"
  - ✅ "Respuesta < 2 segundos en 95% de casos"
- [ ] ¿He identificado todos los usuarios del sistema?
- [ ] ¿Sé qué NO hace el sistema (alcance claro)?

### Proceso Definido
- [ ] ¿Elegí el proceso adecuado para este tipo de sistema? (usar árbol de decisiones)
- [ ] ¿El equipo conoce y acepta el proceso?
- [ ] ¿Tenemos ceremonias/reuniones definidas?
- [ ] ¿Sabemos cómo medir progreso?

### Arquitectura Pensada
- [ ] ¿Tengo un bosquejo de arquitectura? (puede ser en servilleta)
- [ ] ¿Identifiqué componentes principales?
- [ ] ¿Sé cómo se comunican entre sí?
- [ ] ¿Consideré los requisitos no funcionales en arquitectura?
  - Rendimiento → ¿Caché? ¿Async?
  - Seguridad → ¿Capas? ¿Encriptación?
  - Escalabilidad → ¿Puede crecer?

### Herramientas Setup
- [ ] Repositorio de código configurado
- [ ] CI/CD básico funcionando
- [ ] Linter y formatter configurados
- [ ] Framework de testing elegido

### Riesgos Identificados
- [ ] ¿Qué puede salir mal? (listar top 3 riesgos)
- [ ] ¿Cómo mitigaré cada riesgo?
- [ ] ¿Hay tecnología desconocida? → Spike técnico necesario

---

## ✅ CHECKLIST 2: Durante el Desarrollo

### Testing
- [ ] ¿Escribí tests para esta funcionalidad?
- [ ] ¿Los tests cubren casos edge?
- [ ] ¿Los tests pasan en CI?
- [ ] ¿Probé manualmente la funcionalidad?

### Código Limpio
- [ ] ¿El código es auto-explicativo?
- [ ] ¿Nombres de variables/funciones son claros?
- [ ] ¿Comenté solo lo NO obvio?
- [ ] ¿Funciones tienen < 20 líneas? (regla general)
- [ ] ¿Sin código duplicado?

### Integración Continua
- [ ] ¿Hago commit/push al menos una vez al día?
- [ ] ¿El build pasa antes de push?
- [ ] ¿Integro con el trabajo de otros desarrolladores?

### Documentación
- [ ] ¿README está actualizado?
- [ ] ¿APIs documentadas? (JSDoc, Docstrings, Swagger)
- [ ] ¿Decisiones de diseño importantes documentadas?

### Seguridad
- [ ] ¿Validé inputs del usuario?
- [ ] ¿Estoy usando autenticación/autorización?
- [ ] ¿Secrets NO están en código? (usar variables de entorno)
- [ ] ¿Dependencias actualizadas? (sin vulnerabilidades conocidas)

---

## ✅ CHECKLIST 3: Antes de Entregar

### Funcionalidad
- [ ] ¿Hace lo que el requisito especificaba?
- [ ] ¿Validé con usuario/stakeholder?
- [ ] ¿Todos los criterios de aceptación se cumplen?

### Calidad
- [ ] ¿Cobertura de tests > 70% (o la meta definida)?
- [ ] ¿Sin bugs conocidos críticos?
- [ ] ¿Rendimiento aceptable? (medido, no asumido)
- [ ] ¿Funciona en todos los navegadores/dispositivos target?

### Seguridad
- [ ] ¿Pasó security scan? (Snyk, SonarQube)
- [ ] ¿Sin secretos en código?
- [ ] ¿HTTPS configurado?
- [ ] ¿Datos sensibles encriptados?

### Documentación
- [ ] Documentación de usuario actualizada
- [ ] Documentación técnica actualizada
- [ ] README tiene instrucciones de deployment
- [ ] CHANGELOG actualizado

### Deployment
- [ ] ¿Probado en ambiente de staging?
- [ ] ¿Plan de rollback definido?
- [ ] ¿Monitoring configurado?
- [ ] ¿Alertas configuradas para errores?

### Post-Deployment
- [ ] ¿Monitoreo activo en las primeras 24 horas?
- [ ] ¿Recolectando feedback de usuarios?
- [ ] ¿Sin errores en logs de producción?

---

## 📋 PLANTILLA 3: Caso de Uso Detallado

```markdown
# CASO DE USO: [ID] - [Nombre]

## INFORMACIÓN GENERAL
- **ID**: CU-XXX
- **Nombre**: [Nombre descriptivo del caso de uso]
- **Actores**: [Usuario, Sistema Externo, etc.]
- **Tipo**: Primario / Secundario
- **Complejidad**: Alta / Media / Baja
- **Prioridad**: Alta / Media / Baja

## DESCRIPCIÓN
[Descripción breve de qué hace este caso de uso]

## PRECONDICIONES
1. [Condición que debe ser verdadera ANTES de ejecutar]
2. [Otra precondición]

## POSTCONDICIONES
1. [Condición que será verdadera DESPUÉS de ejecutar exitosamente]
2. [Otra postcondición]

## FLUJO PRINCIPAL
1. [Actor] hace [acción]
2. Sistema [responde/procesa/valida]
3. [Actor] [siguiente acción]
4. Sistema [resultado]

## FLUJOS ALTERNATIVOS

### A1: [Nombre de flujo alternativo]
**Condición**: [Cuándo ocurre este flujo]
**Pasos**:
1. [Paso alternativo]
2. [Paso alternativo]
**Retorna a**: Paso X del flujo principal

### A2: [Otro flujo alternativo]
...

## FLUJOS DE EXCEPCIÓN

### E1: [Error de validación]
**Condición**: [Cuándo ocurre]
**Pasos**:
1. Sistema muestra mensaje de error: "[mensaje]"
2. Sistema retorna a paso X
**Fin del caso de uso**: No

### E2: [Error crítico]
**Condición**: [Cuándo ocurre]
**Pasos**:
1. Sistema registra error en log
2. Sistema muestra mensaje genérico al usuario
3. Sistema notifica a administradores
**Fin del caso de uso**: Sí (abortado)

## REQUISITOS ESPECIALES
- [Requisito no funcional relacionado: performance, seguridad, etc.]

## INFORMACIÓN ADICIONAL
- **Frecuencia de uso**: [Diaria/Semanal/Mensual]
- **Reglas de negocio**: [BRX]
- **Notas**: [Información adicional relevante]
```

---

## 📋 PLANTILLA 4: Plan de Sprint (Scrum)

```markdown
# SPRINT [#XX] - [Nombre del Sprint]
**Duración**: [Fecha inicio] - [Fecha fin] (X semanas)
**Goal**: [Objetivo principal del sprint - qué valor entregamos]

## EQUIPO
- **Product Owner**: [Nombre]
- **Scrum Master**: [Nombre]
- **Development Team**:
  - [Desarrollador 1]
  - [Desarrollador 2]
  - [QA]

## CAPACIDAD DEL SPRINT
- **Story Points totales**: [X] points
- **Horas estimadas**: [Y] horas
- **Días disponibles**: [Z] días (considerando vacaciones, feriados)

## BACKLOG DEL SPRINT

### Comprometido (MUST)
| ID     | Historia de Usuario        | SP | Asignado a | Estado     |
|--------|----------------------------|----|-----------  |------------|
| US-042 | Resetear contraseña        | 5  | Juan       | To Do      |
| US-043 | Dashboard de usuario       | 8  | María      | To Do      |
| ...    | ...                        | .. | ...        | ...        |
| **TOTAL** |                         | **XX** |        |            |

### Stretch Goals (SHOULD - si hay tiempo)
| ID     | Historia de Usuario        | SP |
|--------|----------------------------|----|
| US-050 | Filtros avanzados          | 3  |

## DEFINICIÓN DE DONE
Una historia está "Done" cuando:
- [ ] Código completado y revisado (PR aprobado)
- [ ] Tests escritos y pasando (coverage > 70%)
- [ ] Funcionalidad probada manualmente
- [ ] Documentación actualizada
- [ ] Deployado a staging
- [ ] Product Owner acepta

## RIESGOS IDENTIFICADOS
| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Dependencia de API externa no lista | Media | Alto | Mockear API, feature flag |
| ... | ... | ... | ... |

## MÉTRICAS
- **Velocity anterior**: [X] points
- **Velocity objetivo**: [Y] points
- **Burndown chart**: [Link a herramienta]

## NOTAS
[Cualquier información adicional del sprint planning]
```

---

## 📋 PLANTILLA 5: Retrospectiva de Sprint

```markdown
# RETROSPECTIVA SPRINT [#XX]
**Fecha**: [DD/MM/YYYY]
**Participantes**: [Nombres]
**Facilitador**: [Scrum Master]

## DATOS DEL SPRINT
- **Comprometido**: [X] story points
- **Completado**: [Y] story points
- **Velocity**: [Y] points
- **Bugs encontrados**: [Z]

## ¿QUÉ SALIÓ BIEN? 😊
1. [Práctica o situación positiva]
2. [Otra cosa positiva]
3. ...

## ¿QUÉ PODEMOS MEJORAR? 🤔
1. [Problema o fricción identificada]
2. [Otra área de mejora]
3. ...

## ACCIONES DE MEJORA
| Acción | Responsable | Fecha Límite | Estado |
|--------|-------------|--------------|--------|
| [Acción concreta y medible] | [Nombre] | [Fecha] | [ ] |
| [Otra acción] | [Nombre] | [Fecha] | [ ] |

## EXPERIMENTOS A PROBAR
1. [Algo nuevo que queremos intentar este sprint]
2. ...

## MÉTRICAS DE RETROSPECTIVA
- **Nivel de felicidad del equipo**: [1-10]
- **Nivel de colaboración**: [1-10]
- **¿Recomendarían trabajar en este equipo?**: [Sí/No]

## SEGUIMIENTO DE ACCIONES PASADAS
| Acción (de sprint anterior) | Estado | Observaciones |
|------------------------------|--------|---------------|
| [Acción del sprint pasado]   | ✅ Done | Funcionó bien |
| [Otra acción]                | ⚠️ Parcial | Seguir trabajando |
```

---

## 📋 PLANTILLA 6: Documento de Arquitectura (Simplificado)

```markdown
# DOCUMENTO DE ARQUITECTURA DE SOFTWARE
**Proyecto**: [Nombre]
**Versión**: 1.0
**Fecha**: [DD/MM/YYYY]
**Autor**: [Nombre del Arquitecto]

## 1. INTRODUCCIÓN

### 1.1 Propósito
[Por qué existe este documento]

### 1.2 Alcance
[Qué sistema cubre este documento]

### 1.3 Audiencia
- Desarrolladores
- DevOps
- Product Managers

## 2. REPRESENTACIÓN ARQUITECTÓNICA

### 2.1 Patrón Arquitectónico Principal
[MVC, Capas, Cliente-Servidor, Microservicios, etc.]

**Por qué se eligió**:
- [Razón 1]
- [Razón 2]

### 2.2 Diagrama de Alto Nivel
```
[Aquí va un diagrama ASCII o link a diagrama]

Frontend (React) ← API REST → Backend (Node.js) → PostgreSQL
                                      ↓
                                    Redis
```

## 3. VISTAS ARQUITECTÓNICAS

### 3.1 Vista Lógica
[Componentes principales del sistema]

**Componentes**:
- **Frontend**: Aplicación React con Redux
- **API Gateway**: Express.js
- **Servicios de Negocio**:
  - UserService
  - OrderService
  - PaymentService
- **Data Layer**: PostgreSQL + Redis

### 3.2 Vista de Proceso
[Flujos principales]

**Flujo: Realizar Compra**
```
1. Usuario → Frontend → API → OrderService
2. OrderService → PaymentService
3. PaymentService → Stripe API
4. Si exitoso → OrderService actualiza BD
5. OrderService → NotificationService (async)
```

### 3.3 Vista de Desarrollo
[Organización del código]

```
/frontend
  /src
    /components
    /pages
    /services
    /store (Redux)

/backend
  /src
    /controllers
    /services
    /models
    /middleware
```

### 3.4 Vista Física (Deployment)
[Infraestructura]

```
┌──────────────┐
│ Cloudflare   │ CDN
└──────┬───────┘
       │
┌──────▼───────┐
│ Vercel       │ Frontend (estático)
└──────────────┘

┌──────────────┐
│ Render.com   │ Backend API
└──────┬───────┘
       │
┌──────▼───────┐
│ PostgreSQL   │ Database (Render)
└──────────────┘

┌──────────────┐
│ Redis Cloud  │ Cache/Sessions
└──────────────┘
```

## 4. DECISIONES ARQUITECTÓNICAS CLAVE

### DA-001: Base de Datos Relacional vs NoSQL
**Decisión**: PostgreSQL (relacional)
**Razón**:
- Datos altamente estructurados
- Necesidad de transacciones ACID
- Relaciones complejas entre entidades

**Alternativas consideradas**:
- MongoDB (descartado: no soporta ACID bien)

### DA-002: Monolito vs Microservicios
**Decisión**: Monolito modular
**Razón**:
- Equipo pequeño (<10 personas)
- Complejidad de microservicios innecesaria
- Más rápido de desarrollar y deployar

**Plan de evolución**: Extraer microservicios cuando:
- Equipo crezca a >20 personas
- Necesidad de escalar componentes independientemente

## 5. REQUISITOS NO FUNCIONALES

### 5.1 Rendimiento
- **Tiempo de respuesta**: < 2 segundos (95% de requests)
- **Throughput**: 1000 requests/segundo

**Estrategias**:
- Caché en Redis para consultas frecuentes
- Índices de BD optimizados
- CDN para assets estáticos

### 5.2 Escalabilidad
- **Horizontal**: Backend puede escalar a múltiples instancias (stateless)
- **Vertical**: BD puede escalar con read replicas

### 5.3 Seguridad
- **Autenticación**: JWT con refresh tokens
- **Autorización**: RBAC (Role-Based Access Control)
- **Encriptación**: HTTPS, passwords con bcrypt
- **Rate limiting**: 100 requests/minuto por IP

### 5.4 Disponibilidad
- **Target**: 99.9% uptime (< 8.76 horas downtime/año)
- **Estrategias**:
  - Health checks
  - Auto-scaling
  - Database backups diarios

## 6. STACK TECNOLÓGICO

### Frontend
- React 18
- Redux Toolkit
- TailwindCSS
- Vite

### Backend
- Node.js 20
- Express.js
- Prisma ORM
- Jest (testing)

### Database
- PostgreSQL 15
- Redis 7

### DevOps
- Git + GitHub
- GitHub Actions (CI/CD)
- Vercel (frontend)
- Render.com (backend)

## 7. GESTIÓN DE DATOS

### 7.1 Modelo de Datos
[Link a diagrama de clases o ER]

### 7.2 Migrations
- **Herramienta**: Prisma Migrate
- **Estrategia**: Versionadas, nunca editar migrations existentes

### 7.3 Backups
- **Frecuencia**: Diario (full) + continuo (point-in-time recovery)
- **Retención**: 30 días

## 8. SEGURIDAD

### 8.1 Autenticación
[JWT con access tokens (15 min) + refresh tokens (7 días)]

### 8.2 Autorización
Roles:
- USER (lectura)
- ADMIN (lectura + escritura)
- SUPERADMIN (todo)

### 8.3 Validación
- Input validation en frontend y backend
- Sanitización de datos

## 9. MONITOREO Y LOGGING

### 9.1 Logging
- **Herramienta**: Winston (backend)
- **Niveles**: error, warn, info, debug
- **Centralización**: LogTail o similar

### 9.2 Monitoreo
- **APM**: Sentry para errors
- **Uptime**: Uptime Robot
- **Performance**: Web Vitals en frontend

### 9.3 Alertas
- Error rate > 5% → Alert a Slack
- Downtime > 5 min → Alert a Email + SMS

## 10. RIESGOS ARQUITECTÓNICOS

| Riesgo | Probabilidad | Impacto | Mitigación |
|--------|--------------|---------|------------|
| Single point of failure (BD) | Media | Alto | Read replicas + backups |
| Rate limiting de API externa | Baja | Medio | Implementar retry con backoff |
| ... | ... | ... | ... |

## 11. EVOLUCIÓN FUTURA

### Roadmap Arquitectónico
- **Q1 2026**: Implementar caché distribuido
- **Q2 2026**: Migrar a microservicios (si equipo crece)
- **Q3 2026**: Implementar event-driven architecture

---
**Aprobado por**: [Nombre Tech Lead]
**Fecha**: [DD/MM/YYYY]
```

---

## 📋 PLANTILLA 7: Definition of Done (DoD)

```markdown
# DEFINITION OF DONE

Una historia de usuario está DONE cuando cumple TODOS estos criterios:

## ✅ CÓDIGO
- [ ] Código escrito y completado
- [ ] Sin TODOs o FIXMEs en código de producción
- [ ] Sin console.log() o código de debugging
- [ ] Sin código comentado (dead code)
- [ ] Sigue estándares de código del proyecto (linter pasa)

## ✅ TESTING
- [ ] Unit tests escritos y pasando
- [ ] Integration tests (si aplica) pasando
- [ ] Coverage > [X]% (definir según proyecto)
- [ ] Probado manualmente en ambiente de desarrollo
- [ ] Probado en múltiples navegadores/dispositivos (si aplica)

## ✅ REVISIÓN
- [ ] Pull Request creado
- [ ] Descripción clara en PR (qué, por qué, cómo probar)
- [ ] Code review completado
- [ ] PR aprobado por al menos [X] desarrolladores
- [ ] Comentarios de review resueltos

## ✅ CALIDAD
- [ ] No rompe funcionalidades existentes (no regresiones)
- [ ] Sin warnings en build
- [ ] Performance aceptable (medido, no asumido)
- [ ] Accesibilidad considerada (si es UI)

## ✅ DOCUMENTACIÓN
- [ ] README actualizado (si hay cambios en setup)
- [ ] Comentarios en código complejo (solo lo NO obvio)
- [ ] API documentada (si hay nuevos endpoints)
- [ ] CHANGELOG actualizado

## ✅ DEPLOYMENT
- [ ] Deployado a ambiente de staging
- [ ] Probado en staging por QA
- [ ] Probado en staging por Product Owner
- [ ] Product Owner acepta la funcionalidad
- [ ] Ready para merge a main/producción

## ✅ SEGURIDAD (si aplica)
- [ ] Input validation implementada
- [ ] Sin secretos en código
- [ ] Autorización implementada (si modifica datos)
- [ ] Sin vulnerabilidades conocidas (npm audit / safety)

---

**Nota**: Si una historia no cumple TODOS los criterios, NO está Done.
```

---

## 📋 CHECKLIST 4: Selección de Tecnología

```markdown
# CHECKLIST: Selección de Stack Tecnológico

## FRONTEND

### Framework/Library
- [ ] ¿Equipo tiene experiencia?
  - [ ] React (más popular, ecosistema grande)
  - [ ] Vue (más simple, curva de aprendizaje suave)
  - [ ] Angular (enterprise, opinado)
  - [ ] Svelte (performance, menos código)

- [ ] ¿Comunidad activa y docs buenas?
- [ ] ¿Librerías/componentes disponibles?
- [ ] ¿Performance adecuada para el tipo de app?

### Gestión de Estado
- [ ] ¿Necesito estado global?
  - Sí → Redux Toolkit, Zustand, Pinia (Vue)
  - No → useState/useContext es suficiente

### Styling
- [ ] TailwindCSS (utility-first, rápido)
- [ ] CSS Modules (scoped, menos magic)
- [ ] Styled Components (CSS-in-JS)
- [ ] Material-UI / Chakra (componentes pre-hechos)

## BACKEND

### Language/Runtime
- [ ] ¿Equipo tiene experiencia?
  - [ ] Node.js (JavaScript, async, gran ecosistema)
  - [ ] Python (data science, scripting, readable)
  - [ ] Ruby (developer happiness, Rails)
  - [ ] Go (performance, concurrencia)
  - [ ] Java (enterprise, typed)

### Framework
- [ ] Node.js: Express (simple) vs Nest.js (estructura)
- [ ] Python: FastAPI (moderno) vs Django (batteries-included)
- [ ] Ruby: Rails (convención sobre configuración)

### ORM
- [ ] Prisma (Node.js, type-safe)
- [ ] TypeORM (Node.js, decoradores)
- [ ] SQLAlchemy (Python)
- [ ] ActiveRecord (Ruby)

## DATABASE

### Tipo
- [ ] ¿Necesito transacciones ACID? → SQL
- [ ] ¿Datos no estructurados? → NoSQL
- [ ] ¿Búsquedas de texto complejas? → Elasticsearch

### SQL
- [ ] PostgreSQL (recomendado: open source, features completas)
- [ ] MySQL (popular, simple)
- [ ] SQLite (desarrollo, apps pequeñas)

### NoSQL
- [ ] MongoDB (documentos, flexible schema)
- [ ] Redis (key-value, caché, sessions)
- [ ] Firestore (real-time, mobile-first)

## DEPLOYMENT

### Hosting
- [ ] ¿Cuál es el budget?
  - **Gratis**:
    - [ ] Vercel (frontend)
    - [ ] Netlify (frontend)
    - [ ] Render.com (backend + DB gratis tier)
    - [ ] Railway (backend, DB)
  - **Paid**:
    - [ ] AWS (control completo, complejo)
    - [ ] Google Cloud (similar a AWS)
    - [ ] DigitalOcean (más simple que AWS)
    - [ ] Heroku (simple pero caro)

### CI/CD
- [ ] GitHub Actions (gratis con GitHub)
- [ ] GitLab CI (si usas GitLab)
- [ ] CircleCI
- [ ] Jenkins (si necesitas control total)

## TESTING

### Frontend
- [ ] Jest (unit tests)
- [ ] React Testing Library
- [ ] Cypress (E2E)
- [ ] Playwright (E2E, moderno)

### Backend
- [ ] Jest (Node.js)
- [ ] pytest (Python)
- [ ] RSpec (Ruby)

## MONITOREO

### Error Tracking
- [ ] Sentry (recomendado: gratis tier generoso)
- [ ] Bugsnag
- [ ] Rollbar

### Analytics
- [ ] Google Analytics (web, gratis)
- [ ] Mixpanel (product analytics)
- [ ] Plausible (privacy-friendly)

### Uptime Monitoring
- [ ] Uptime Robot (gratis)
- [ ] Pingdom
- [ ] BetterUptime

## DECISIÓN FINAL

### Stack Elegido:
- **Frontend**: [Tecnología]
- **Backend**: [Tecnología]
- **Database**: [Tecnología]
- **Hosting**: [Servicio]
- **CI/CD**: [Herramienta]

### Razones:
1. [Razón 1]
2. [Razón 2]
3. [Razón 3]

### Riesgos:
1. [Riesgo 1]
2. [Riesgo 2]

### Plan de Mitigación:
1. [Mitigación 1]
2. [Mitigación 2]
```

---

## 🎯 MATRIZ DE TRAZABILIDAD

```markdown
| Requisito | Caso de Uso | Diseño | Código | Test | Estado |
|-----------|-------------|--------|--------|------|--------|
| REQ-001   | CU-001      | CLASS-User | user.service.ts | user.test.ts | ✅ |
| REQ-002   | CU-002      | SEQ-Login | auth.service.ts | auth.test.ts | 🚧 |
| REQ-003   | -           | -      | -      | -    | ⏳ |

**Leyenda**:
- ✅ Completado
- 🚧 En progreso
- ⏳ Pendiente
- ❌ Bloqueado
```

---

**FIN DE PLANTILLAS Y CHECKLISTS**

Todos estos templates están diseñados para ser copiados y adaptados a tu proyecto específico.
