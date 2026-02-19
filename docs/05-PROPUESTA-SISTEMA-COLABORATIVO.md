# 05 - Propuesta de Sistema Colaborativo

> Arquitectura para integrar Sommerville Assistant con equipos reales de trabajo.
> Ingenieros de software e ingenieros industriales colaborando en gestión y delegación de proyectos.
> Generado el 18 de febrero de 2026.

---

## Resumen Ejecutivo

La propuesta transforma Sommerville Assistant de una herramienta individual en una **plataforma colaborativa multi-rol** donde ingenieros de software e ingenieros industriales coexisten con responsabilidades diferenciadas. La base tecnológica es el ecosistema Firebase + Google Cloud, elegido por su integración nativa, escalabilidad sin servidor y bajo costo operativo inicial.

---

## 1. Arquitectura General

```
┌─────────────────────────────────────────────────────────────────┐
│                    CLIENTE (Next.js / PWA)                       │
│  Ingenieros de Software  │  Ingenieros Industriales  │  Admin   │
└────────────┬─────────────┴──────────────┬────────────┴────┬─────┘
             │                            │                  │
             ▼                            ▼                  ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Firebase Auth (Google SSO)                    │
│           Custom Claims: rol, departamento, permisos            │
└──────────────────────────────┬──────────────────────────────────┘
                               │
        ┌──────────────────────┼──────────────────────┐
        ▼                      ▼                       ▼
┌───────────────┐    ┌─────────────────┐    ┌──────────────────┐
│   Firestore   │    │ Cloud Functions │    │  Firebase Storage │
│  Base de datos│    │  Lógica server  │    │  Archivos, PDFs  │
│  en tiempo    │    │  Notificaciones │    │  Diagramas       │
│  real         │    │  Automatización │    │  Exports         │
└───────────────┘    └────────┬────────┘    └──────────────────┘
                              │
              ┌───────────────┼───────────────┐
              ▼               ▼               ▼
     ┌──────────────┐ ┌─────────────┐ ┌────────────────┐
     │  Pub/Sub     │ │  Vertex AI  │ │  BigQuery       │
     │  Eventos     │ │  (Gemini)   │ │  Analytics      │
     │  async       │ │  Asistencia │ │  Reportes       │
     └──────────────┘ └─────────────┘ └────────────────┘
```

### Por qué Firebase + Google Cloud

| Servicio | Justificación |
|----------|---------------|
| **Firestore** | Tiempo real con listeners, modelo documento flexible, sin esquema rígido |
| **Firebase Auth** | SSO con Google Workspace corporativo, custom claims para roles |
| **Cloud Functions** | Lógica de negocio sin servidor, triggers de Firestore, webhooks |
| **Firebase Storage** | PDFs, diagramas Gantt, exportaciones de proyectos |
| **Pub/Sub** | Notificaciones asíncronas sin acoplar servicios |
| **Vertex AI / Gemini** | Asistencia inteligente para ingenieros, sin cambiar proveedor |
| **BigQuery** | Analytics de proyectos, KPIs, reportes históricos |

---

## 2. Roles y Permisos

### Definición de Roles

```
SUPER_ADMIN
  └── ADMIN_ORGANIZACION
        ├── INGENIERO_SOFTWARE (IS)
        │     ├── IS_SENIOR
        │     ├── IS_MID
        │     └── IS_JUNIOR
        └── INGENIERO_INDUSTRIAL (II)
              ├── II_SENIOR
              ├── II_MID
              └── II_JUNIOR
```

### Matriz de Permisos por Recurso

| Acción | Super Admin | Admin Org | IS Senior | IS Mid/Junior | II Senior | II Mid/Junior |
|--------|:-----------:|:---------:|:---------:|:-------------:|:---------:|:-------------:|
| Crear organización | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Gestionar usuarios | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Crear proyecto | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| Editar proyecto propio | ✅ | ✅ | ✅ | ✅* | ✅ | ✅* |
| Ver todos los proyectos | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| Delegar tareas | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| Ejecutar tareas asignadas | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Exportar reportes | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Aprobar entregables | ✅ | ✅ | ✅ | ❌ | ✅ | ❌ |
| Ver analytics global | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Configurar integraciones | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |

*Solo proyectos donde están asignados.

### Implementación de Custom Claims en Firebase Auth

```typescript
// Cloud Function: assignUserRole
export const assignUserRole = functions.https.onCall(async (data, context) => {
  // Solo admins pueden asignar roles
  if (!context.auth?.token.admin) throw new functions.https.HttpsError('permission-denied');

  const { uid, rol, departamento, nivel } = data;

  await admin.auth().setCustomUserClaims(uid, {
    rol,           // 'IS' | 'II' | 'ADMIN' | 'SUPER_ADMIN'
    nivel,         // 'SENIOR' | 'MID' | 'JUNIOR'
    departamento,  // ID del departamento
    orgId,         // ID de la organización
  });
});
```

---

## 3. Flujo de Datos entre Usuarios

### Flujo Principal: Creación y Delegación de Proyecto

```
ADMIN / IS_SENIOR / II_SENIOR
        │
        │ 1. Crea proyecto en Sommerville Assistant
        ▼
   [Firestore: /proyectos/{id}]
        │
        │ 2. Cloud Function trigger: onProjectCreate
        ▼
   [Pub/Sub: topic=proyecto-nuevo]
        │
        ├──► Notificación push a miembros del equipo
        │
        │ 3. Senior asigna tareas a miembros
        ▼
   [Firestore: /proyectos/{id}/tareas/{id}]
        │
        │ 4. Cloud Function trigger: onTaskAssigned
        ▼
   ┌────┴────────────────────────────────────┐
   │                                         │
   ▼                                         ▼
[Notificación al IS asignado]       [Notificación al II asignado]
        │                                    │
        │ 5a. IS actualiza código/    5b. II actualiza proceso/
        │     arquitectura                   │  métricas industriales
        ▼                                    ▼
[Firestore: tarea.estado = 'EN_PROGRESO']
        │
        │ 6. Miembro marca tarea como completada
        ▼
   [Cloud Function: onTaskComplete]
        │
        ├──► Notifica al Senior que delegó
        ├──► Actualiza progreso del proyecto
        └──► Dispara revisión si requiere aprobación
```

### Flujo de Colaboración Cruzada IS ↔ II

```
Ingeniero Industrial                    Ingeniero de Software
       │                                        │
       │ Detecta cuello de botella              │
       │ en proceso productivo                  │
       ▼                                        │
[Crea solicitud de automatización]              │
       │                                        │
       │ Cloud Function notifica ──────────────►│
       │                                        │ Revisa requerimiento
       │                                        │ Propone solución técnica
       │◄─────────────────── Respuesta técnica ─│
       │                                        │
       │ Valida con conocimiento                │
       │ de proceso industrial                  │
       ▼                                        ▼
[Ambos actualizan el proyecto compartido en Firestore]
       │
       ▼
[Cloud Function genera reporte automático de colaboración]
```

---

## 4. Estructura de Base de Datos en Firestore

### Colecciones Principales

```
firestore/
├── organizaciones/
│   └── {orgId}/
│       ├── nombre: string
│       ├── plan: 'starter' | 'pro' | 'enterprise'
│       ├── createdAt: timestamp
│       └── configuracion: map
│
├── usuarios/
│   └── {uid}/
│       ├── email: string
│       ├── nombre: string
│       ├── orgId: string
│       ├── rol: 'IS' | 'II' | 'ADMIN' | 'SUPER_ADMIN'
│       ├── nivel: 'SENIOR' | 'MID' | 'JUNIOR'
│       ├── departamento: string
│       ├── avatar: string (URL Storage)
│       ├── activo: boolean
│       └── ultimoAcceso: timestamp
│
├── proyectos/
│   └── {proyectoId}/
│       ├── orgId: string
│       ├── titulo: string
│       ├── descripcion: string
│       ├── estado: 'BORRADOR' | 'ACTIVO' | 'EN_REVISION' | 'COMPLETADO' | 'ARCHIVADO'
│       ├── tipo: 'SOFTWARE' | 'INDUSTRIAL' | 'HIBRIDO'
│       ├── creadorId: string (ref usuario)
│       ├── responsableId: string (ref usuario)
│       ├── equipo: string[] (array de uids)
│       ├── fechaInicio: timestamp
│       ├── fechaFin: timestamp
│       ├── prioridad: 'BAJA' | 'MEDIA' | 'ALTA' | 'CRITICA'
│       ├── etiquetas: string[]
│       ├── progreso: number (0-100)
│       ├── createdAt: timestamp
│       ├── updatedAt: timestamp
│       │
│       ├── tareas/  [subcolección]
│       │   └── {tareaId}/
│       │       ├── titulo: string
│       │       ├── descripcion: string
│       │       ├── asignadoA: string (uid)
│       │       ├── asignadoPor: string (uid)
│       │       ├── estado: 'PENDIENTE' | 'EN_PROGRESO' | 'EN_REVISION' | 'COMPLETADA' | 'BLOQUEADA'
│       │       ├── prioridad: 'BAJA' | 'MEDIA' | 'ALTA'
│       │       ├── fechaVencimiento: timestamp
│       │       ├── requiereAprobacion: boolean
│       │       ├── aprobadoPor: string | null
│       │       ├── dependencias: string[] (ids de tareas)
│       │       ├── estimacionHoras: number
│       │       ├── horasReales: number
│       │       ├── tipo: 'SOFTWARE' | 'INDUSTRIAL' | 'COLABORATIVA'
│       │       └── comentarios/  [subcolección]
│       │           └── {comentarioId}/
│       │               ├── autorId: string
│       │               ├── texto: string
│       │               ├── adjuntos: string[] (URLs Storage)
│       │               └── createdAt: timestamp
│       │
│       ├── hitos/  [subcolección]
│       │   └── {hitoId}/
│       │       ├── titulo: string
│       │       ├── fecha: timestamp
│       │       ├── completado: boolean
│       │       └── tareas: string[] (ids)
│       │
│       └── archivos/  [subcolección]
│           └── {archivoId}/
│               ├── nombre: string
│               ├── tipo: 'PDF' | 'DIAGRAMA' | 'GANTT' | 'OTRO'
│               ├── url: string (Firebase Storage)
│               ├── subidoPor: string
│               └── createdAt: timestamp
│
├── notificaciones/
│   └── {uid}/
│       └── items/  [subcolección]
│           └── {notifId}/
│               ├── tipo: 'TAREA_ASIGNADA' | 'TAREA_COMPLETADA' | 'COMENTARIO' | 'APROBACION' | 'MENCION'
│               ├── titulo: string
│               ├── mensaje: string
│               ├── leida: boolean
│               ├── accionUrl: string
│               ├── emisorId: string
│               └── createdAt: timestamp
│
├── solicitudes/  [colaboración cruzada IS ↔ II]
│   └── {solicitudId}/
│       ├── tipo: 'AUTOMATIZACION' | 'OPTIMIZACION' | 'SOPORTE_TECNICO' | 'ANALISIS'
│       ├── solicitanteId: string
│       ├── receptorId: string | null (si null, va al pool del equipo)
│       ├── proyectoId: string
│       ├── titulo: string
│       ├── descripcion: string
│       ├── estado: 'ABIERTA' | 'EN_PROCESO' | 'RESUELTA' | 'CANCELADA'
│       ├── prioridad: 'BAJA' | 'MEDIA' | 'ALTA' | 'URGENTE'
│       ├── respuesta: string | null
│       └── timestamps: map
│
└── auditoria/
    └── {eventoId}/
        ├── orgId: string
        ├── usuarioId: string
        ├── accion: string  (ej: 'proyecto.crear', 'tarea.delegar')
        ├── recursoTipo: string
        ├── recursoId: string
        ├── datos: map (snapshot antes/después)
        └── timestamp: timestamp
```

### Reglas de Seguridad Firestore (Resumen)

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Funciones helper
    function isAuth() { return request.auth != null; }
    function userClaim(field) { return request.auth.token[field]; }
    function isSameOrg(orgId) { return userClaim('orgId') == orgId; }
    function isAdmin() { return userClaim('rol') in ['ADMIN', 'SUPER_ADMIN']; }
    function isSenior() { return userClaim('nivel') == 'SENIOR'; }
    function isProjectMember(projectData) {
      return request.auth.uid in projectData.equipo
        || request.auth.uid == projectData.responsableId;
    }

    // Usuarios: solo lectura propia, escritura solo admins
    match /usuarios/{uid} {
      allow read: if isAuth() && isSameOrg(resource.data.orgId);
      allow write: if isAdmin();
    }

    // Proyectos: lectura para miembros del equipo, creación para seniors y admins
    match /proyectos/{proyectoId} {
      allow read: if isAuth() && isSameOrg(resource.data.orgId)
                  && (isAdmin() || isSenior() || isProjectMember(resource.data));
      allow create: if isAuth() && (isAdmin() || isSenior());
      allow update: if isAuth() && isProjectMember(resource.data);
      allow delete: if isAdmin();

      // Tareas: heredan permisos del proyecto
      match /tareas/{tareaId} {
        allow read: if isAuth() && isProjectMember(get(/databases/$(database)/documents/proyectos/$(proyectoId)).data);
        allow write: if isAuth() && (
          isAdmin() || isSenior() ||
          request.auth.uid == resource.data.asignadoA
        );
      }
    }

    // Notificaciones: solo el dueño
    match /notificaciones/{uid}/items/{notifId} {
      allow read, write: if request.auth.uid == uid;
    }

    // Auditoría: solo lectura para admins, escritura solo desde Cloud Functions
    match /auditoria/{eventoId} {
      allow read: if isAdmin();
      allow write: if false; // Solo Cloud Functions con Admin SDK
    }
  }
}
```

---

## 5. Cloud Functions Clave

### Triggers de Firestore

```typescript
// 1. Notificar al equipo cuando se crea un proyecto
export const onProjectCreate = functions.firestore
  .document('proyectos/{proyectoId}')
  .onCreate(async (snap, context) => {
    const proyecto = snap.data();
    await notifyTeam(proyecto.equipo, {
      tipo: 'PROYECTO_NUEVO',
      titulo: `Nuevo proyecto: ${proyecto.titulo}`,
      accionUrl: `/proyectos/${context.params.proyectoId}`,
    });
    await logAuditEvent('proyecto.crear', proyecto);
  });

// 2. Notificar al asignado cuando se delega una tarea
export const onTaskAssigned = functions.firestore
  .document('proyectos/{proyectoId}/tareas/{tareaId}')
  .onWrite(async (change, context) => {
    const after = change.after.data();
    const before = change.before.data();
    if (after?.asignadoA !== before?.asignadoA && after?.asignadoA) {
      await sendNotification(after.asignadoA, {
        tipo: 'TAREA_ASIGNADA',
        titulo: `Te asignaron: ${after.titulo}`,
        accionUrl: `/proyectos/${context.params.proyectoId}/tareas/${context.params.tareaId}`,
      });
    }
  });

// 3. Recalcular progreso del proyecto al completar tareas
export const onTaskStatusChange = functions.firestore
  .document('proyectos/{proyectoId}/tareas/{tareaId}')
  .onUpdate(async (change, context) => {
    const { proyectoId } = context.params;
    const tareas = await db.collection(`proyectos/${proyectoId}/tareas`).get();
    const completadas = tareas.docs.filter(d => d.data().estado === 'COMPLETADA').length;
    const progreso = Math.round((completadas / tareas.size) * 100);
    await db.doc(`proyectos/${proyectoId}`).update({ progreso, updatedAt: admin.firestore.FieldValue.serverTimestamp() });
  });
```

### Funciones HTTP (API REST interna)

```typescript
// Endpoint: Generar reporte PDF de proyecto
export const generarReporteProyecto = functions.https.onCall(async (data, context) => {
  // Validar permisos
  // Obtener datos del proyecto de Firestore
  // Generar PDF con los datos (reusa la lógica existente de Sommerville)
  // Subir a Firebase Storage
  // Retornar URL firmada de descarga
});

// Endpoint: Solicitar colaboración cruzada
export const crearSolicitudColaboracion = functions.https.onCall(async (data, context) => {
  // Crear documento en /solicitudes
  // Notificar al equipo del tipo requerido (IS o II)
  // Registrar en auditoría
});
```

---

## 6. Integración con Sommerville Assistant Existente

La aplicación Next.js existente se extiende con:

### Nuevas Rutas (App Router)

```
src/app/
├── (auth)/
│   ├── login/          → Firebase Auth Google SSO
│   └── onboarding/     → Configuración inicial de perfil
├── dashboard/
│   ├── page.tsx        → Vista general según rol
│   ├── proyectos/
│   │   ├── page.tsx    → Lista de proyectos del usuario
│   │   └── [id]/
│   │       ├── page.tsx         → Detalle del proyecto
│   │       ├── tareas/          → Gestión de tareas
│   │       ├── equipo/          → Miembros y roles
│   │       └── reportes/        → Exportar PDFs
├── admin/
│   ├── usuarios/       → Gestión de usuarios (solo ADMIN)
│   └── organizacion/   → Config de org (solo ADMIN)
└── colaboracion/
    └── solicitudes/    → Pool de solicitudes IS ↔ II
```

### Nuevas Dependencias a Agregar

```json
{
  "firebase": "^11.x",
  "firebase-admin": "^13.x",
  "firebase-functions": "^6.x",
  "@tanstack/react-query": "^5.x"
}
```

---

## 7. Roadmap de Implementación por Fases

### Fase 0: Preparación (Semana 1-2)

- [ ] Crear proyecto Firebase en Google Cloud Console
- [ ] Configurar Firebase Auth con dominio corporativo (Google Workspace)
- [ ] Definir estructura de Firestore e implementar reglas de seguridad
- [ ] Configurar Firebase Storage con buckets por organización
- [ ] Instalar dependencias Firebase en el proyecto Next.js existente
- [ ] Crear archivo de configuración Firebase (`src/lib/firebase.ts`)

**Entregable:** Proyecto Firebase configurado, auth funcional en entorno local.

---

### Fase 1: Autenticación y Perfiles (Semana 3-4)

- [ ] Implementar login con Google SSO (Firebase Auth)
- [ ] Crear flujo de onboarding: selección de rol, departamento
- [ ] Implementar Cloud Function `assignUserRole` para que admins asignen roles
- [ ] Panel de administración básico: listar y gestionar usuarios
- [ ] Middleware Next.js para proteger rutas por rol
- [ ] Custom claims sincronizados con la UI

**Entregable:** Usuarios pueden registrarse, administradores pueden asignar roles.

---

### Fase 2: Gestión de Proyectos Colaborativa (Semana 5-7)

- [ ] CRUD de proyectos con Firestore (listeners en tiempo real)
- [ ] Sistema de tareas con delegación y asignación
- [ ] Listeners Firestore para actualización automática de UI sin recargar
- [ ] Cloud Functions: `onProjectCreate`, `onTaskAssigned`, `onTaskStatusChange`
- [ ] Dashboard personalizado por rol (IS ve sus tareas de código, II ve sus procesos)
- [ ] Historial de actividad por proyecto

**Entregable:** Equipos pueden crear proyectos, asignar y gestionar tareas en tiempo real.

---

### Fase 3: Colaboración Cruzada IS ↔ II (Semana 8-9)

- [ ] Sistema de solicitudes de colaboración cruzada
- [ ] Pool compartido visible para el tipo de ingeniero requerido
- [ ] Hilo de conversación por solicitud (con Firestore)
- [ ] Notificaciones push (Firebase Cloud Messaging)
- [ ] Métricas de colaboración: tiempo de respuesta, solicitudes resueltas

**Entregable:** Ingenieros de distintas disciplinas pueden colaborar formalmente.

---

### Fase 4: Notificaciones y Automatización (Semana 10)

- [ ] Sistema de notificaciones en tiempo real (bell icon en UI)
- [ ] Firebase Cloud Messaging para notificaciones push (PWA)
- [ ] Pub/Sub para eventos desacoplados entre Cloud Functions
- [ ] Reglas de escalado automático: tarea sin movimiento 48h → notifica al responsable
- [ ] Resumen diario automático por email (SendGrid + Cloud Functions)

**Entregable:** Sistema proactivo que notifica sin que el usuario tenga que revisar manualmente.

---

### Fase 5: Reportes y Analytics (Semana 11-12)

- [ ] Exportar reportes de proyecto a PDF (reutiliza lógica Sommerville existente)
- [ ] Subir PDFs a Firebase Storage, URL firmada para descarga
- [ ] Integración BigQuery: exportar métricas de Firestore para análisis histórico
- [ ] Dashboard de analytics para admins: proyectos completados, productividad por equipo
- [ ] KPIs diferenciados: métricas de software (sprints, bugs) vs. industriales (tiempos de proceso, eficiencia)

**Entregable:** Liderazgo tiene visibilidad completa del estado y productividad del equipo.

---

### Fase 6: Inteligencia y Optimización (Semana 13-16)

- [ ] Integrar Vertex AI / Gemini para asistencia contextual por rol
  - IS: sugerir patrones de arquitectura, detectar deuda técnica
  - II: sugerir optimizaciones de proceso, detectar cuellos de botella
- [ ] Recomendaciones automáticas de asignación de tareas basadas en carga de trabajo
- [ ] Predicción de riesgo de retraso en proyectos (ML con datos históricos BigQuery)
- [ ] Generación automática de diagramas Gantt al crear proyecto

**Entregable:** Plataforma asistida por IA que mejora la toma de decisiones.

---

## 8. Costos Estimados (Plan Spark → Blaze)

| Servicio | Uso Estimado (50 usuarios) | Costo Mensual Aprox. |
|----------|---------------------------|----------------------|
| Firestore | ~500K lecturas, ~100K escrituras | $0-5 |
| Cloud Functions | ~1M invocaciones | $0-1 |
| Firebase Auth | Usuarios ilimitados | $0 |
| Firebase Storage | ~5 GB | $0-1 |
| Firebase Hosting | Incluido con Next.js en Vercel | $0 |
| BigQuery | ~10 GB procesados | $0-5 |
| Vertex AI (Gemini) | Según uso (Fase 6) | $10-50 |
| **Total estimado** | | **$10-62 / mes** |

> Para equipos pequeños (<50 usuarios), el costo puede mantenerse en el tier gratuito (Spark) hasta la Fase 5.

---

## 9. Consideraciones de Seguridad y Cumplimiento

1. **Datos en reposo**: Firestore y Storage cifran automáticamente (AES-256).
2. **Datos en tránsito**: HTTPS obligatorio en todas las conexiones.
3. **Auditoría completa**: Cada acción sensible se registra en `/auditoria` con Admin SDK (no falsificable desde el cliente).
4. **Principio de mínimo privilegio**: Las reglas Firestore aseguran que cada usuario solo accede a sus datos.
5. **Sin secretos en el cliente**: Firebase config del cliente no contiene claves privadas; toda la lógica sensible en Cloud Functions con Admin SDK.
6. **GDPR / Privacidad**: Firestore permite exportar y eliminar datos de usuario por uid (derecho al olvido).

---

## 10. Próximos Pasos Inmediatos

1. Ejecutar `firebase init` en el proyecto para crear `firebase.json` y `.firebaserc`
2. Agregar variables de entorno Firebase a `.env.local` (no commitear)
3. Crear colección inicial `organizaciones` con la organización piloto
4. Implementar Fase 1 como prueba de concepto con 2-3 usuarios beta
5. Validar el flujo con un proyecto piloto real antes de escalar

---

*Documento generado como parte de la documentación técnica de Sommerville Assistant.*
*Para integración técnica detallada, consultar: `04-GUIA-INTEGRACION-JSON.md`*
