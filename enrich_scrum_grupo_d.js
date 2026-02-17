const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'src', 'data', 'recommendations.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// ==================== REC-005: SCRUM ESTÁNDAR ====================
const rec005Process = {
  name: "Scrum",
  type: "agile-iterative",
  chapter: 3,
  description: "Framework ágil para desarrollo iterativo incremental basado en sprints de tiempo fijo (1-4 semanas). Enfocado en entregas rápidas, auto-organización del equipo y adaptación continua basada en feedback. Apropiado para equipos únicos (8-12 personas) con requisitos volátiles y necesidad de time-to-market rápido.",
  why: [
    "Entregas rápidas cada 2 semanas permiten validar funcionalidad con usuarios reales temprano",
    "Adaptación continua a requisitos cambiantes mediante re-priorización de Product Backlog",
    "Feedback temprano del Product Owner y stakeholders reduce riesgo de construir features incorrectas",
    "Auto-organización del equipo maximiza productividad y ownership",
    "Transparencia del proceso (burndown chart, tablero Kanban) facilita gestión de expectativas"
  ],
  how: [
    "Sprints de 2 semanas que producen incremento funcional potencialmente shippable",
    "4 ceremonias por sprint: Planning (4h), Daily Standup (15min diario), Review (2h), Retrospective (1.5h)",
    "3 roles: Product Owner (priorización), Scrum Master (facilitación), Development Team (6-10 personas)",
    "Product Backlog con user stories priorizadas por valor de negocio, estimadas en story points",
    "Definition of Done: código testeado (>80% coverage), code review aprobado, deployable a staging"
  ],
  phases: [
    {
      id: "phase-scrum-planning",
      name: "Sprint Planning",
      order: 1,
      description: "Ceremonia de inicio de sprint donde equipo selecciona user stories del Product Backlog, define Sprint Goal y descompone stories en tareas técnicas. Objetivo: Crear Sprint Backlog con trabajo comprometido para las próximas 2 semanas.",
      duration: "4 horas (sprint de 2 semanas)",
      activities: [
        "Product Owner presenta top user stories del Product Backlog priorizadas por ROI y valor de negocio",
        "Development Team estima complejidad de cada story usando Planning Poker (escala Fibonacci: 1, 2, 3, 5, 8, 13 story points)",
        "Equipo selecciona stories que caben en velocity promedio (20-30 story points para sprint de 2 semanas)",
        "Definir Sprint Goal: objetivo coherente del sprint (ej: 'Usuario puede crear y editar órdenes de compra')",
        "Descomponer cada story en tareas técnicas (desarrollo, testing, code review, deployment) de 2-8 horas c/u",
        "Identificar dependencias técnicas y riesgos del sprint (integraciones, performance, data migration)",
        "Asignar tareas iniciales (auto-asignación por developers según expertise)",
        "Output: Sprint Backlog visualizado en tablero Kanban (Jira, Trello) con columnas To Do / In Progress / Done"
      ],
      inputs: [
        "Product Backlog refinado (stories con acceptance criteria claros)",
        "Velocity promedio de últimos 3 sprints (para estimar capacidad)",
        "Definition of Done acordada por equipo",
        "Feedback de Sprint Review anterior (bugs, ajustes solicitados)"
      ],
      outputs: [
        "Sprint Backlog (subset de Product Backlog para este sprint)",
        "Sprint Goal (objetivo del sprint en 1 frase)",
        "Tareas técnicas (descomposición de stories en tareas de 2-8h)",
        "Burndown chart inicializado (trabajo restante vs días del sprint)"
      ],
      deliverables: [
        {
          name: "Sprint Backlog en tablero Kanban",
          template: null,
          required: true,
          reviewedBy: ["Product Owner", "Development Team"]
        },
        {
          name: "Sprint Goal Document",
          template: "tpl-009",
          required: true,
          reviewedBy: ["Product Owner", "Scrum Master"]
        }
      ],
      gate: {
        name: "Sprint Commitment",
        criteria: [
          "Sprint Goal definido y aceptado por Product Owner y Development Team",
          "Stories seleccionadas caben en velocity promedio (no over-commitment)",
          "Todas las stories tienen acceptance criteria claros y testables",
          "Dependencias técnicas identificadas y mitigadas (o con plan de acción)",
          "Equipo tiene confianza de completar trabajo comprometido"
        ],
        decision: "COMMIT / ADJUST SCOPE / CANCEL SPRINT (si Product Owner cambia prioridades drásticamente)",
        approvers: ["Product Owner", "Development Team", "Scrum Master"]
      },
      keyStakeholders: ["Product Owner", "Scrum Master", "Development Team (6-10 developers)"]
    },
    {
      id: "phase-scrum-daily-dev",
      name: "Daily Development (with Daily Standups)",
      order: 2,
      description: "Fase de ejecución del sprint (10 días hábiles para sprint de 2 semanas) donde Development Team implementa, testea y code-reviewea user stories. Sincronización diaria mediante Daily Standup de 15 minutos. Objetivo: Completar Sprint Backlog cumpliendo Definition of Done.",
      duration: "10 días hábiles (2 semanas)",
      activities: [
        "Daily Standup (9:00 AM, 15 min): Cada developer responde: ¿Qué hice ayer? ¿Qué haré hoy? ¿Tengo impedimentos?",
        "Desarrollo iterativo: Developers auto-asignan tareas del Sprint Backlog, implementan código, escriben tests",
        "Code review obligatorio: Pull requests revisados por al menos 1 peer antes de merge (GitHub/GitLab)",
        "Continuous Integration: Tests automatizados (unit, integration) ejecutados en cada merge a main branch",
        "Testing continuo: QA engineers (si hay) ejecutan testing exploratorio de features completadas",
        "Actualización de tablero Kanban: Mover tareas de To Do → In Progress → Done conforme avanzan",
        "Scrum Master remueve impedimentos: Bloqueos técnicos, dependencias externas, distracciones organizacionales",
        "Backlog refinement ad-hoc (mid-sprint): Product Owner clarifica acceptance criteria si surgen dudas",
        "Product Owner valida features completadas mid-sprint (opcional): Feedback temprano para ajustes",
        "Monitoring de burndown chart: Scrum Master verifica progreso diario, alerta si equipo está atrasado"
      ],
      inputs: [
        "Sprint Backlog con tareas priorizadas",
        "Definition of Done (criterios de completitud)",
        "Development environment configurado (repos, CI/CD, staging)",
        "Velocity promedio (para tracking de progreso)"
      ],
      outputs: [
        "Incremento funcional parcial (features completadas durante sprint)",
        "Código mergeado a main branch (con tests pasando)",
        "Burndown chart actualizado diariamente (trabajo restante)",
        "Lista de impedimentos removidos y pendientes (tracking de Scrum Master)"
      ],
      deliverables: [
        {
          name: "Working Software (incremento funcional)",
          template: null,
          required: true,
          reviewedBy: ["Development Team", "Product Owner (mid-sprint opcional)"]
        },
        {
          name: "Burndown Chart (progreso diario)",
          template: null,
          required: true,
          reviewedBy: ["Scrum Master"]
        },
        {
          name: "Impediments Log (tracking de bloqueos)",
          template: "tpl-011",
          required: false,
          reviewedBy: ["Scrum Master"]
        }
      ],
      gate: {
        name: "Daily Progress Check",
        criteria: [
          "Al menos 1 tarea completada por developer cada 2 días (evitar estancamiento)",
          "Burndown chart trending hacia cero al final del sprint (no muy atrasado)",
          "Impedimentos críticos removidos dentro de 24h (Scrum Master activo)",
          "Daily Standup <15 min (no convertir en status meeting largo)",
          "Code reviews completados dentro de 4h de abrir PR (no bloquear flujo)"
        ],
        decision: "CONTINUE / ESCALATE IMPEDIMENTS / ADJUST SPRINT SCOPE (si burndown muy atrasado)",
        approvers: ["Scrum Master", "Development Team"]
      },
      keyStakeholders: ["Development Team", "Scrum Master", "Product Owner (validación mid-sprint)"]
    },
    {
      id: "phase-scrum-review",
      name: "Sprint Review",
      order: 3,
      description: "Ceremonia de demo del incremento funcional a stakeholders. Product Owner acepta o rechaza user stories basado en Definition of Done. Stakeholders dan feedback que alimenta Product Backlog. Objetivo: Validar que el incremento cumple expectativas y recoger feedback para próximos sprints.",
      duration: "2 horas",
      activities: [
        "Product Owner presenta Sprint Goal y user stories comprometidas al inicio del sprint",
        "Development Team demuestra incremento funcional en staging environment (working software, no slides)",
        "Demo de cada user story completada: Mostrar flujo end-to-end desde perspectiva de usuario final",
        "Product Owner valida acceptance criteria de cada story: Acepta (DONE) o Rechaza (vuelve a backlog con ajustes)",
        "Stakeholders dan feedback: Features que faltan, UX issues, bugs encontrados, nuevas ideas",
        "Product Owner actualiza Product Backlog: Agregar nuevas stories basadas en feedback, re-priorizar existentes",
        "Revisar métricas del sprint: Velocity alcanzada (story points completados), burndown final, bugs reportados",
        "Discusión de impedimentos no removidos: ¿Afectarán próximos sprints? ¿Requieren escalación?",
        "Proyección de roadmap: Product Owner muestra próximas 2-3 sprints según backlog actualizado"
      ],
      inputs: [
        "Incremento funcional deployado en staging (working software)",
        "Sprint Backlog con stories marcadas como Done",
        "Definition of Done (criterios de aceptación)",
        "Feedback de stakeholders de sprints previos (para validar si se incorporó)"
      ],
      outputs: [
        "User stories aceptadas (pasan a DONE, potencialmente shippable a producción)",
        "User stories rechazadas (vuelven a Product Backlog con ajustes necesarios)",
        "Product Backlog actualizado (nuevas stories, re-priorización)",
        "Velocity del sprint (story points completados: ej 25 puntos)",
        "Action items de feedback de stakeholders (mejoras para próximos sprints)"
      ],
      deliverables: [
        {
          name: "Sprint Review Report (aceptación de stories)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["Product Owner", "Stakeholders"]
        },
        {
          name: "Updated Product Backlog (con feedback incorporado)",
          template: null,
          required: true,
          reviewedBy: ["Product Owner"]
        },
        {
          name: "Velocity Metrics (story points completados)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["Scrum Master"]
        }
      ],
      gate: {
        name: "Increment Acceptance",
        criteria: [
          "Al menos 80% de user stories comprometidas completadas y aceptadas por Product Owner",
          "Incremento funcional deployable a producción (cumple Definition of Done)",
          "Zero bugs críticos introducidos (si hay bugs, son low priority)",
          "Stakeholders satisfechos con progreso (feedback mayormente positivo)",
          "Velocity estable o mejorando (no cayendo sprint a sprint)"
        ],
        decision: "ACCEPT INCREMENT / PARTIAL ACCEPT (algunas stories rechazadas) / REJECT (muy pocas stories completadas)",
        approvers: ["Product Owner", "Stakeholders"]
      },
      keyStakeholders: ["Product Owner", "Development Team", "Stakeholders (usuarios finales, management)", "Scrum Master"]
    },
    {
      id: "phase-scrum-retrospective",
      name: "Sprint Retrospective",
      order: 4,
      description: "Ceremonia de mejora continua donde equipo inspecciona el proceso (no el producto) e identifica acciones de mejora. Objetivo: Incrementar productividad, calidad y satisfacción del equipo en próximos sprints.",
      duration: "1.5 horas",
      activities: [
        "Set the stage (10 min): Scrum Master crea ambiente seguro para feedback honesto (lo dicho en retro queda en retro)",
        "Gather data (20 min): Equipo lista hechos objetivos del sprint (metrics: velocity, bugs, cycle time, impedimentos)",
        "Generate insights (30 min): Discusión facilitada por Scrum Master usando formato 'What went well / What didn't / What to improve'",
        "What went well: Identificar prácticas exitosas (ej: pair programming aceleró feature X, daily standups más cortos fueron efectivos)",
        "What didn't go well: Problemas enfrentados (ej: code reviews lentos bloquearon flujo, ambiguity en acceptance criteria causó re-trabajo)",
        "Decide what to do (20 min): Priorizar top 3 problemas y definir acciones concretas con owner y deadline",
        "Action items SMART: Específicos, Medibles, Alcanzables, Relevantes, con Tiempo definido (ej: 'Reducir tiempo de code review a <4h mediante notificaciones Slack')",
        "Close retrospective (10 min): Scrum Master resume action items, asigna owners, agrega a tablero de mejora continua",
        "Tracking de action items previos: Revisar si acciones de retrospectiva anterior se completaron (accountability)"
      ],
      inputs: [
        "Sprint metrics (velocity, burndown, cycle time, bugs)",
        "Impediments log del sprint",
        "Feedback anecdótico de team members (frustraciones, éxitos)",
        "Action items de retrospectiva anterior (para tracking)"
      ],
      outputs: [
        "Lista de 'What went well' (prácticas exitosas a mantener)",
        "Lista de 'What didn't go well' (problemas identificados)",
        "Top 3 action items priorizados con owner y deadline",
        "Retrospective summary document (para referencia futura)",
        "Action items board actualizado (tracking de mejoras continuas)"
      ],
      deliverables: [
        {
          name: "Retrospective Action Items (top 3 mejoras priorizadas)",
          template: "tpl-012",
          required: true,
          reviewedBy: ["Scrum Master", "Development Team"]
        },
        {
          name: "Retrospective Summary (what went well, didn't, improvements)",
          template: "tpl-012",
          required: false,
          reviewedBy: ["Scrum Master"]
        }
      ],
      gate: {
        name: "Continuous Improvement Commitment",
        criteria: [
          "Al menos 3 action items concretos definidos con owner y deadline",
          "Action items son SMART (específicos y medibles, no vagos como 'comunicar mejor')",
          "Equipo tiene consenso en priorización de action items (no impuestos por Scrum Master)",
          "Action items de retrospectiva anterior fueron revisados (accountability)",
          "Ambiente de retro fue seguro (todos participaron, no blame game)"
        ],
        decision: "COMMIT TO IMPROVEMENTS / DEFER (si equipo no tiene consenso)",
        approvers: ["Development Team", "Scrum Master"]
      },
      keyStakeholders: ["Development Team", "Scrum Master", "Product Owner (opcional, generalmente no participa)"]
    }
  ],
  iterationStrategy: "Scrum ejecuta sprints de 2 semanas (10 días hábiles) que producen incremento funcional potencialmente shippable. Velocity estable de 20-30 story points por sprint después de 3-4 sprints de calibración. Product Backlog refinement continuo: Product Owner y equipo refinan top 20% del backlog semanalmente (grooming sessions de 1h). Re-priorización permitida entre sprints pero NO mid-sprint (scope freeze). Feedback de Sprint Review alimenta próximo sprint.",
  whenToUse: [
    "Requisitos volátiles que cambian frecuentemente (prioridades de negocio, feedback de usuarios, pivoting)",
    "Equipo único mediano (8-12 personas) sin necesidad de coordinación multi-equipo",
    "Product Owner disponible >50% del tiempo (para sprint planning, review, backlog refinement, clarificaciones)",
    "Necesidad de time-to-market rápido (entregas cada 2 semanas vs 6 meses waterfall)",
    "Stakeholders requieren demos frecuentes de progreso (validación continua, no sorpresas al final)",
    "Sistema transaccional mediano sin complejidad arquitectónica extrema (ej: gestión órdenes, CRM, booking)",
    "Equipo cross-funcional disponible (developers, QA, UX en mismo equipo, no silos)",
    "Organización tolera cambios de alcance (no contratos de scope fijo inmutables)",
    "Cultura de ownership y auto-organización (equipo puede tomar decisiones técnicas sin aprobaciones lentas)",
    "Incrementos pequeños son valiosos para negocio (no necesitan sistema completo para entregar valor)"
  ],
  whenNotToUse: [
    "Requisitos completamente estables y conocidos upfront (Cascada o RUP más eficiente, menos overhead de ceremonias)",
    "Product Owner no disponible o sin autoridad (Scrum requiere PO empowered que pueda tomar decisiones rápidas)",
    "Equipo distribuido con zonas horarias muy diferentes (daily standup, planning sincrónicos difíciles)",
    "Sistema simple CRUD sin complejidad (overhead de 4 ceremonias no justifica para 1 mes de desarrollo)",
    "Equipo <5 personas (ceremonias Scrum demasiado pesadas, XP puro mejor)",
    "Regulaciones requieren documentación exhaustiva upfront (FDA, aviación, nuclear - waterfall/RUP necesario)",
    "Cultura organizacional jerárquica anti-ágil (management quiere gantt charts, no acepta cambios mid-project)",
    "Stakeholders no disponibles para sprint reviews cada 2 semanas (feedback loop se rompe)",
    "Sistema con dependencias críticas externas fuera de control del equipo (Scrum asume equipo autónomo)",
    "Presupuesto o timeline absolutamente fijo sin flexibilidad (Scrum requiere trade-off entre scope/tiempo/costo)"
  ],
  advantages: [
    "Time-to-market rápido: Entregas cada 2 semanas vs 6-12 meses de waterfall (valor al negocio temprano)",
    "Adaptabilidad a cambios: Re-priorización de backlog entre sprints sin costo alto de re-planificación",
    "Feedback temprano: Validación con usuarios reales cada 2 semanas reduce riesgo de construir features incorrectas",
    "Transparencia: Burndown chart, tablero Kanban, velocity hacen progreso visible a stakeholders",
    "Calidad continua: Definition of Done con testing obligatorio previene deuda técnica acumulada",
    "Motivación de equipo: Auto-organización y ownership incrementan satisfacción y productividad",
    "Risk mitigation temprana: Problemas técnicos, de integración o de requisitos detectados en sprints tempranos",
    "Ceremonias estructuradas: Planning, review, retrospective aseguran alineación sin micro-management",
    "Velocity predecible: Después de 3-4 sprints, equipo puede estimar roadmap con ±20% accuracy",
    "Mejora continua: Retrospectives cada 2 semanas optimizan proceso incrementalmente (no esperan fin de proyecto)"
  ],
  disadvantages: [
    "Overhead de ceremonias: 4h planning + 15min diario + 2h review + 1.5h retro = ~12h/sprint (12% del tiempo)",
    "Requiere Product Owner full-time disponible: Si PO no disponible, equipo se bloquea esperando decisiones",
    "Curva de aprendizaje: Equipo nuevo en Scrum tarda 3-4 sprints en estabilizar velocity (período de calibración)",
    "Scope creep si no hay disciplina: Cambios mid-sprint rompen compromiso y afectan velocity (requiere PO firme)",
    "Difícil estimar largo plazo: Velocity variable hace roadmap >3 meses impreciso (stakeholders piden fechas fijas)",
    "Burnout si sprints mal gestionados: Over-commitment crónico lleva a crunch continuo (no sostenible)",
    "Definition of Done puede relajarse: Presión de completar stories puede llevar a compromisos en calidad",
    "Daily standup puede volverse status report: Sin facilitación de Scrum Master, degenera en meeting largo y aburrido",
    "Requiere stakeholders comprometidos: Si stakeholders no asisten a sprint reviews, feedback loop se rompe",
    "No apto para todos los dominios: Regulaciones estrictas (FDA, SOX) requieren documentación que Scrum no genera por defecto"
  ],
  changeManagement: {
    description: "Gestión de cambios mid-sprint y entre sprints con balance entre flexibilidad y estabilidad del sprint.",
    steps: [
      {
        step: 1,
        name: "Scope Freeze Mid-Sprint",
        description: "Regla: NO cambios en Sprint Backlog mid-sprint excepto si es crítico (bug de producción, cambio de regulación). Product Owner debe justificar urgencia y equipo debe consensuar si aceptar cambio o defer a próximo sprint."
      },
      {
        step: 2,
        name: "Emergency Change Exception",
        description: "Si cambio mid-sprint es inevitable (producción caída, seguridad crítica), equipo swap: Remover story de igual complejidad del sprint y agregar cambio urgente. Documentar en Sprint Review por qué sprint goal cambió."
      },
      {
        step: 3,
        name: "Backlog Re-Prioritization (entre sprints)",
        description: "Product Owner puede re-priorizar Product Backlog libremente entre sprints basado en feedback de Sprint Review, cambios de mercado, o nuevas oportunidades. Equipo selecciona nuevas top stories en próximo Sprint Planning."
      },
      {
        step: 4,
        name: "Handling Incomplete Stories",
        description: "Stories no completadas al final del sprint NO pasan a Done. Opciones: (1) Vuelven a Product Backlog re-estimadas, (2) Se splitean en stories más pequeñas, (3) Se cancelan si ya no son valiosas. NO arrastrar stories automáticamente a próximo sprint."
      },
      {
        step: 5,
        name: "Stakeholder Change Requests",
        description: "Stakeholders pueden solicitar nuevas features o cambios en cualquier momento. Product Owner evalúa, prioriza en Product Backlog y comunica cuándo se implementarán (próximo sprint, en 3 sprints, never). Transparencia de roadmap previene expectativas incorrectas."
      },
      {
        step: 6,
        name: "Definition of Done Updates",
        description: "Equipo puede actualizar Definition of Done en Sprint Retrospective para incrementar calidad (ej: agregar performance testing). Cambios aplican a partir de próximo sprint, no retroactivamente."
      }
    ]
  },
  tooling: [
    {
      category: "Sprint Management",
      tools: [
        "Jira (tablero Kanban, burndown charts, backlog management)",
        "Trello (alternativa lightweight para equipos pequeños)",
        "Azure DevOps (integración con Microsoft stack)"
      ]
    },
    {
      category: "Communication",
      tools: [
        "Slack/Teams (daily standups remotos, notificaciones de CI/CD)",
        "Zoom/Meet (sprint planning, review, retrospective remotas)",
        "Miro/Mural (retrospective boards, sprint planning virtual)"
      ]
    },
    {
      category: "Development",
      tools: [
        "GitHub/GitLab (version control, pull requests, code review)",
        "CI/CD (GitHub Actions, Jenkins, GitLab CI para tests automatizados)",
        "SonarQube (code quality, test coverage tracking)"
      ]
    },
    {
      category: "Documentation",
      tools: [
        "Confluence (user stories, acceptance criteria, sprint reports)",
        "Notion (alternativa moderna para documentación colaborativa)"
      ]
    }
  ],
  references: [
    {
      title: "Software Engineering (10th Edition) - Chapter 3: Agile Software Development",
      author: "Ian Sommerville",
      year: 2015,
      source: "Pearson"
    },
    {
      title: "The Scrum Guide (2020)",
      author: "Ken Schwaber, Jeff Sutherland",
      year: 2020,
      source: "Scrum.org"
    },
    {
      title: "Scrum: The Art of Doing Twice the Work in Half the Time",
      author: "Jeff Sutherland",
      year: 2014,
      source: "Crown Business"
    }
  ]
};

// Actualizar rec-005
data.recommendations['rec-005'].process = rec005Process;

console.log('✅ rec-005 enriquecido (Scrum Estándar)');

// ==================== REC-006: SCRUM/XP HYBRID ====================
const rec006Process = {
  name: "Scrum/XP Hybrid",
  type: "agile-xp-hybrid",
  chapter: 3,
  description: "Framework ágil que combina ceremonias de Scrum con prácticas técnicas de XP (Extreme Programming). Sprints cortos de 1 semana para máxima velocidad, TDD obligatorio, pair programming 50% del tiempo, CI múltiples veces al día. Ideal para startups y equipos pequeños (5-8 personas) que necesitan experimentar rápido y mantener calidad técnica alta.",
  why: [
    "Sprints de 1 semana permiten pivoting rápido si experimentos de producto fallan (fail-fast culture)",
    "TDD (Test-Driven Development) asegura calidad técnica desde el inicio, minimiza deuda técnica en crecimiento rápido",
    "Pair programming acelera onboarding de nuevos developers y distribuye conocimiento (crítico en startups con rotación)",
    "Continuous Integration múltiples veces al día detecta bugs de integración inmediatamente (no acumulados)",
    "Simple Design y YAGNI (You Aren't Gonna Need It) evitan over-engineering en contexto de incertidumbre de startup"
  ],
  how: [
    "Sprints de 1 semana (lunes-viernes) con planning 2h lunes, review 1h viernes, retrospective 45min viernes",
    "Daily standup 10 min (equipo pequeño permite sincronización rápida)",
    "TDD obligatorio: Write test → See it fail (red) → Write code → Test passes (green) → Refactor",
    "Pair programming 50% del tiempo: Rotación de pairs cada día, knowledge sharing continuo",
    "CI/CD agresivo: Merge a main 3-5 veces al día por developer, tests automatizados en cada merge"
  ],
  phases: [
    {
      id: "phase-xp-planning",
      name: "Sprint Planning",
      order: 1,
      description: "Planning condensado de 2 horas (sprint de 1 semana es corto). Equipo selecciona user stories pequeñas (max 5 story points c/u) que caben en 5 días. Énfasis en simplicidad: YAGNI, no over-engineering.",
      duration: "2 horas (lunes 9-11 AM)",
      activities: [
        "Product Owner presenta top 5-8 user stories del backlog priorizadas por experimentos de producto a validar",
        "Equipo estima complejidad con Planning Poker (escala pequeña: 1, 2, 3, 5 - no stories >5 puntos para sprint de 1 semana)",
        "Seleccionar 10-15 story points de trabajo (velocity típica para equipo 5-8 personas, sprint 1 semana)",
        "Definir Sprint Goal enfocado en experimento: 'Validar que usuarios completan checkout en <3 clics' (hipótesis a probar)",
        "Descomponer stories en tareas técnicas con TDD explícito: Para cada feature, escribir tests primero (red-green-refactor)",
        "Identificar pairs para pair programming: Asignar duplas developer senior + junior para knowledge sharing",
        "Simple Design check: Asegurar que solución propuesta es la más simple posible (YAGNI, no agregar features 'por si acaso')",
        "Output: Sprint Backlog en tablero físico o digital (Trello, GitHub Projects) con tareas de testing explícitas"
      ],
      inputs: [
        "Product Backlog con stories pequeñas (<5 puntos)",
        "Velocity de último sprint (10-15 puntos típico)",
        "Experimentos de producto fallidos/exitosos de sprint anterior (para priorización)"
      ],
      outputs: [
        "Sprint Backlog con 10-15 story points",
        "Sprint Goal (hipótesis a validar)",
        "Pairs asignados para pair programming",
        "Lista de tests a escribir (TDD tasks)"
      ],
      deliverables: [
        {
          name: "Sprint Backlog (tablero Kanban)",
          template: null,
          required: true,
          reviewedBy: ["Product Owner", "Development Team"]
        },
        {
          name: "Sprint Goal (hipótesis de experimento)",
          template: "tpl-009",
          required: true,
          reviewedBy: ["Product Owner"]
        }
      ],
      gate: {
        name: "Sprint Commitment",
        criteria: [
          "Sprint Goal es experimento claro y medible (no vago como 'mejorar UX')",
          "Stories son pequeñas (max 5 puntos c/u, no stories grandes para sprint 1 semana)",
          "Pairs asignados con balance senior/junior (knowledge sharing)",
          "TDD tasks identificadas (tests a escribir antes de código)",
          "Simple Design verificado (no over-engineering detectado en planning)"
        ],
        decision: "COMMIT / ADJUST SCOPE",
        approvers: ["Product Owner", "Development Team"]
      },
      keyStakeholders: ["Product Owner", "Development Team (5-8 developers)", "Scrum Master (puede ser part-time)"]
    },
    {
      id: "phase-xp-daily-dev",
      name: "Daily Development (TDD, Pair Programming, CI)",
      order: 2,
      description: "Fase de ejecución intensiva (5 días). TDD obligatorio para cada feature, pair programming 50% del tiempo con rotación diaria de pairs, CI agresivo (merge 3-5 veces/día). Daily standup de 10 min para sincronización rápida.",
      duration: "5 días (lunes PM - viernes AM)",
      activities: [
        "Daily Standup (10 min, 9:30 AM): ¿Qué hice? ¿Qué haré? ¿Impedimentos? (más rápido que Scrum estándar por equipo pequeño)",
        "Pair Programming rotación diaria: Lunes (Alice+Bob), Martes (Alice+Carlos), Miércoles (Bob+Carlos) - todos aprenden todo",
        "TDD cycle (red-green-refactor): (1) Write failing test (red), (2) Write minimal code to pass (green), (3) Refactor code + tests",
        "Continuous Integration agresivo: Merge a main 3-5 veces al día por developer, CI pipeline ejecuta tests en <5 min",
        "Refactoring continuo: Después de cada feature, refactorizar código para mantener simple design (no acumular deuda técnica)",
        "Collective Code Ownership: Cualquier developer puede modificar cualquier parte del código (no silos de ownership)",
        "Simple Design enforcement: Code reviews rechazan PRs con over-engineering (features no solicitadas, abstracciones innecesarias)",
        "On-site Customer (Product Owner): Disponible todo el día para clarificar acceptance criteria (no emails, respuesta inmediata)",
        "40-hour week (Sustainable Pace): No overtime sostenido - burnout previene velocity (XP value: fresh mind > horas extras)",
        "Coding Standards enforcement: Linter automatizado (ESLint, Prettier) asegura consistencia de código"
      ],
      inputs: [
        "Sprint Backlog con TDD tasks",
        "Pairs asignados",
        "CI/CD pipeline configurado (GitHub Actions, tests <5 min)",
        "Product Owner disponible on-site o remote sync"
      ],
      outputs: [
        "Código con >90% test coverage (TDD garantiza tests)",
        "Múltiples merges diarios a main (CI agresivo)",
        "Código refactorizado continuamente (mantiene simple design)",
        "Knowledge distribuido (pair programming rotado)"
      ],
      deliverables: [
        {
          name: "Working Software con TDD (>90% test coverage)",
          template: null,
          required: true,
          reviewedBy: ["Development Team", "CI/CD pipeline"]
        },
        {
          name: "Refactoring Log (mejoras de diseño continuas)",
          template: null,
          required: false,
          reviewedBy: ["Development Team"]
        }
      ],
      gate: {
        name: "Daily Progress with Quality",
        criteria: [
          "Test coverage >90% mantenido (TDD obligatorio, no código sin tests)",
          "CI pipeline pasando en cada merge (zero broken builds en main)",
          "Pair programming 50% del tiempo cumplido (tracking en standup)",
          "No overtime crónico (40-hour week, sustainable pace)",
          "Refactoring ejecutado (código no acumula deuda técnica)"
        ],
        decision: "CONTINUE / ADJUST PRACTICES (si TDD no se cumple)",
        approvers: ["Development Team", "Scrum Master"]
      },
      keyStakeholders: ["Development Team", "Product Owner (on-site customer)", "Scrum Master"]
    },
    {
      id: "phase-xp-review",
      name: "Sprint Review",
      order: 3,
      description: "Review condensado de 1 hora (viernes PM). Demo de experimento de producto: ¿Hipótesis validada o refutada? Decisión de pivoting rápido si experimento falló. Stakeholders dan feedback para próximo sprint de 1 semana.",
      duration: "1 hora (viernes 3-4 PM)",
      activities: [
        "Recordar Sprint Goal (hipótesis): '¿Usuarios completan checkout en <3 clics?' - mostrar métricas",
        "Demo de incremento funcional: Mostrar feature implementada con TDD (código + tests pasando)",
        "Validar hipótesis con datos: Analytics de usuarios piloto (conversion rate, time-to-checkout, drop-off rate)",
        "Product Owner decide: Hipótesis validada (escalar feature) o refutada (pivotar en próximo sprint)",
        "Stakeholders dan feedback: UX improvements, nuevos experimentos a probar, features a deprecar si no se usan",
        "Actualizar Product Backlog: Agregar nuevas hipótesis a validar, re-priorizar basado en aprendizajes del sprint",
        "Revisar velocity: Story points completados (10-15 típico), ajustar estimaciones para próximo sprint si fue over/under-committed",
        "Decisión de release: ¿Incremento va a producción esta semana o esperamos próximo sprint? (startup speed permite releases semanales)"
      ],
      inputs: [
        "Incremento funcional con TDD (tests pasando)",
        "Analytics de experimento (métricas de usuarios)",
        "Sprint Goal (hipótesis a validar)"
      ],
      outputs: [
        "Hipótesis validada/refutada (decisión de pivoting)",
        "Product Backlog actualizado (nuevos experimentos)",
        "Velocity del sprint (story points completados)",
        "Decisión de release a producción (weekly release)"
      ],
      deliverables: [
        {
          name: "Sprint Review Report (hipótesis validada/refutada)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["Product Owner", "Stakeholders"]
        },
        {
          name: "Updated Product Backlog (nuevos experimentos)",
          template: null,
          required: true,
          reviewedBy: ["Product Owner"]
        }
      ],
      gate: {
        name: "Experiment Validation",
        criteria: [
          "Hipótesis validada o refutada con datos (no opiniones subjetivas)",
          "Incremento cumple Definition of Done (TDD, code review, deployable)",
          "Velocity estable o mejorando (10-15 puntos típico)",
          "Decisión de pivoting tomada si experimento falló (no persistir en ideas fallidas)",
          "Product Backlog actualizado con aprendizajes del sprint"
        ],
        decision: "ACCEPT INCREMENT / PIVOT (cambiar dirección de producto)",
        approvers: ["Product Owner", "Stakeholders"]
      },
      keyStakeholders: ["Product Owner", "Development Team", "Stakeholders (founders, investors)", "Scrum Master"]
    },
    {
      id: "phase-xp-retrospective",
      name: "Sprint Retrospective",
      order: 4,
      description: "Retrospective condensado de 45 min (viernes 4-4:45 PM). Mejora continua semanal de prácticas XP: ¿TDD funcionó? ¿Pair programming efectivo? ¿CI suficientemente rápido? Top 2 action items para próxima semana.",
      duration: "45 min (viernes 4-4:45 PM)",
      activities: [
        "What went well: Prácticas XP exitosas (ej: 'TDD previno 3 bugs que habrían llegado a producción', 'Pair programming aceleró onboarding de nuevo developer')",
        "What didn't go well: Problemas (ej: 'CI pipeline lento (10 min) bloqueó merges frecuentes', 'Pair programming 30% del tiempo solo, no 50%')",
        "XP practices check: Revisar cumplimiento de prácticas XP (TDD, pair programming, CI, refactoring, simple design, 40-hour week)",
        "Identificar top 2 action items: Enfocados en prácticas técnicas (ej: 'Optimizar CI a <5 min', 'Pair programming obligatorio 50% del tiempo con tracking')",
        "Sustainable Pace check: ¿Equipo trabajó >40h/semana? Si sí, ¿por qué? (over-commitment crónico lleva a burnout)",
        "Knowledge sharing assessment: ¿Pair programming distribuyó conocimiento? ¿Hay silos de expertise que necesitan romperse?",
        "Close retrospective: Scrum Master resume action items, asigna owners, trackea para próxima retro semanal"
      ],
      inputs: [
        "Sprint metrics (velocity, test coverage, CI time, pair programming %)",
        "Código refactorizado o deuda técnica acumulada",
        "Feedback de team sobre prácticas XP"
      ],
      outputs: [
        "Top 2 action items con owner y deadline (1 semana)",
        "XP practices compliance report (TDD, pair programming, CI cumplidos?)",
        "Retrospective summary (mantener prácticas exitosas)"
      ],
      deliverables: [
        {
          name: "Retrospective Action Items (top 2)",
          template: "tpl-012",
          required: true,
          reviewedBy: ["Scrum Master", "Development Team"]
        },
        {
          name: "XP Practices Compliance Report",
          template: "tpl-012",
          required: false,
          reviewedBy: ["Scrum Master"]
        }
      ],
      gate: {
        name: "XP Practices Improvement",
        criteria: [
          "Top 2 action items definidos (enfocados en prácticas técnicas XP)",
          "Action items son SMART y alcanzables en 1 semana",
          "Sustainable Pace mantenido (no overtime crónico)",
          "XP practices cumplidas >80% del tiempo (TDD, pair programming, CI)",
          "Knowledge sharing funcionando (pair programming rotado)"
        ],
        decision: "COMMIT TO IMPROVEMENTS",
        approvers: ["Development Team", "Scrum Master"]
      },
      keyStakeholders: ["Development Team", "Scrum Master"]
    }
  ],
  iterationStrategy: "Sprints de 1 semana (lunes-viernes) para máxima velocidad y adaptación. Velocity típica 10-15 story points/semana para equipo 5-8 personas. TDD obligatorio (write test → fail → code → pass → refactor). Pair programming 50% del tiempo con rotación diaria de pairs para knowledge sharing. CI agresivo: Merge a main 3-5 veces/día por developer, tests automatizados <5 min. Refactoring continuo post-feature para mantener simple design. Product Backlog refinement ad-hoc (Product Owner disponible on-site para clarificaciones inmediatas).",
  whenToUse: [
    "Startup en fase de product-market fit (necesidad de experimentar rápido, pivotar semanalmente)",
    "Equipo pequeño (5-8 personas) todos generalistas (no silos de especialización)",
    "Necesidad de velocidad extrema (weekly releases, competencia agresiva, time-to-market crítico)",
    "Calidad técnica crítica desde el inicio (no budget para re-escribir después, TDD previene deuda técnica)",
    "Product Owner disponible full-time (on-site customer, respuestas inmediatas a clarificaciones)",
    "Equipo valora prácticas técnicas (desarrolladores quieren aprender TDD, pair programming, no lo ven como overhead)",
    "Sistema web/móvil sin integraciones legacy complejas (TDD y CI funcionan mejor con código nuevo)",
    "Cultura de fail-fast (stakeholders toleran experimentos fallidos, pivoting frecuente)",
    "Budget limitado (equipos pequeños son más baratos, XP maximiza productividad de pocos developers)",
    "Onboarding frecuente (pair programming acelera onboarding de nuevos developers en equipo pequeño)"
  ],
  whenNotToUse: [
    "Equipo grande (>10 personas) - pair programming y sprints 1 semana no escalan bien",
    "Requisitos estables y conocidos (overhead de TDD y pair programming no justifica si no hay cambios)",
    "Product Owner no disponible full-time (XP requiere on-site customer para clarificaciones inmediatas)",
    "Equipo sin experiencia en XP (TDD, pair programming tienen curva de aprendizaje >1 mes)",
    "Sistema legacy complejo (TDD difícil de aplicar en código legacy sin tests, refactoring arriesgado)",
    "Cultura de cowboy coding (desarrolladores rechazan pair programming como 'micro-management')",
    "Regulaciones requieren documentación exhaustiva (XP genera poco documentation, código + tests son la documentación)",
    "Sprints 1 semana causan burnout (equipo no puede sostener ritmo intensivo, necesita sprints 2 semanas)",
    "Stakeholders no toleran pivoting (contratos de scope fijo, no permiten cambios semanales)",
    "Infraestructura lenta (CI >10 min hace merge 3-5 veces/día impráctico, necesitan optimizar primero)"
  ],
  advantages: [
    "Velocidad máxima: Sprints 1 semana + CI agresivo permiten weekly releases (time-to-market imbatible)",
    "Calidad técnica alta: TDD obligatorio asegura >90% test coverage, previene bugs en producción",
    "Knowledge sharing: Pair programming rotado distribuye expertise, elimina silos de conocimiento (bus factor bajo)",
    "Fail-fast culture: Experimentos semanales permiten pivotar rápido si hipótesis fallan (no persisten en ideas fallidas)",
    "Refactoring continuo: Código mantiene simple design, no acumula deuda técnica en crecimiento rápido",
    "Onboarding rápido: Pair programming acelera ramp-up de nuevos developers (aprenden de seniors on-the-job)",
    "CI detecta bugs temprano: Merge 3-5 veces/día con tests automatizados previene integration hell",
    "Sustainable Pace: 40-hour week previene burnout (equipo fresco > overtime cansado)",
    "Product Owner empowered: On-site customer permite decisiones rápidas sin esperar aprobaciones lentas",
    "Simple Design: YAGNI evita over-engineering (no construyen features 'por si acaso' que nunca se usan)"
  ],
  disadvantages: [
    "Pair programming 50% más lento: 2 developers, 1 tarea (pero compensa con menos bugs y knowledge sharing)",
    "TDD requiere disciplina: Escribir tests primero es anti-intuitivo, curva de aprendizaje >1 mes",
    "Sprints 1 semana pueden causar burnout: Ritmo intensivo no sostenible long-term (algunos equipos necesitan 2 semanas)",
    "Requiere Product Owner full-time: Si PO no disponible, equipo se bloquea esperando clarificaciones (costoso)",
    "CI agresivo requiere infra rápida: Tests deben ejecutar <5 min o merge 3-5 veces/día se vuelve impráctico",
    "Poco documentation generado: Código + tests son la documentación (problemas con compliance/auditorías)",
    "Collective Ownership puede causar caos: Sin dueños claros, código puede degradarse si todos modifican sin cuidado",
    "Difícil de escalar: Prácticas XP (TDD, pair programming) funcionan bien con 5-8 personas, no con 20+",
    "Stakeholders impacientes: Weekly releases pueden generar expectativa de features grandes cada semana (irreal)",
    "Refactoring continuo puede sobre-optimizar: Riesgo de refactorizar código que cambiará radicalmente en próximo pivot"
  ],
  changeManagement: {
    description: "Gestión de cambios ultra-flexible para startups: pivoting semanal permitido, scope freeze mid-sprint mínimo.",
    steps: [
      {
        step: 1,
        name: "Weekly Pivoting Allowed",
        description: "Sprint de 1 semana permite cambios drásticos de dirección semanalmente. Si experimento del sprint falla, Product Owner puede pivotar completamente en próximo sprint planning (no esperan 2-4 semanas como Scrum estándar)."
      },
      {
        step: 2,
        name: "Mid-Sprint Changes Minimizados",
        description: "Sprints cortos (1 semana) hacen scope freeze mid-sprint menos crítico. Si cambio urgente surge, equipo puede absorberlo porque sprint termina en días (no weeks). No necesitan proceso formal de swap como Scrum 2 semanas."
      },
      {
        step: 3,
        name: "Continuous Refactoring Enables Change",
        description: "Refactoring continuo mantiene código flexible. Cuando pivoting ocurre, código simple y bien testeado (TDD) facilita cambios drásticos sin romper sistema (deuda técnica baja)."
      },
      {
        step: 4,
        name: "On-Site Customer Immediate Clarifications",
        description: "Product Owner disponible full-time resuelve ambigüedades de acceptance criteria en minutos (no días). Equipo no se bloquea esperando respuestas por email."
      },
      {
        step: 5,
        name: "Experiment-Driven Backlog",
        description: "Product Backlog organizado por hipótesis a validar (no features fijas). Si hipótesis refutada, backlog se re-prioriza radicalmente basado en aprendizajes. Flexibilidad total de alcance."
      }
    ]
  },
  tooling: [
    {
      category: "Sprint Management",
      tools: [
        "Trello (lightweight, ideal para equipos pequeños 5-8 personas)",
        "GitHub Projects (integración directa con repos, kanban board)",
        "Linear (moderna, rápida, enfocada en startups)"
      ]
    },
    {
      category: "TDD & Testing",
      tools: [
        "Jest (JavaScript TDD framework, fast test execution)",
        "Pytest (Python TDD framework con fixtures potentes)",
        "RSpec (Ruby TDD framework con sintaxis expresiva)",
        "Coverage.py, Istanbul (test coverage tracking >90%)"
      ]
    },
    {
      category: "Pair Programming",
      tools: [
        "VS Code Live Share (pair programming remoto en tiempo real)",
        "Tuple, Pop (pair programming tools con baja latencia)",
        "tmux + vim (pair programming en terminal para equipos técnicos)"
      ]
    },
    {
      category: "CI/CD",
      tools: [
        "GitHub Actions (CI/CD integrado, <5 min builds)",
        "CircleCI (optimizado para velocidad, paralelización de tests)",
        "Vercel, Netlify (deploy automático en cada merge, preview deploys)"
      ]
    },
    {
      category: "Communication",
      tools: [
        "Slack (async communication, CI/CD notifications)",
        "Zoom (daily standup remoto 10 min, sprint ceremonies)",
        "Miro (retrospective boards, sprint planning virtual)"
      ]
    }
  ],
  references: [
    {
      title: "Software Engineering (10th Edition) - Chapter 3: Agile Software Development",
      author: "Ian Sommerville",
      year: 2015,
      source: "Pearson"
    },
    {
      title: "Extreme Programming Explained: Embrace Change (2nd Edition)",
      author: "Kent Beck",
      year: 2004,
      source: "Addison-Wesley"
    },
    {
      title: "Test Driven Development: By Example",
      author: "Kent Beck",
      year: 2002,
      source: "Addison-Wesley"
    },
    {
      title: "The Scrum Guide (2020)",
      author: "Ken Schwaber, Jeff Sutherland",
      year: 2020,
      source: "Scrum.org"
    }
  ]
};

// Actualizar rec-006
data.recommendations['rec-006'].process = rec006Process;

console.log('✅ rec-006 enriquecido (Scrum/XP Hybrid)');

// Guardar cambios antes de continuar con rec-007
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');

console.log('\n📊 Progreso: rec-005 y rec-006 completados. Continuando con rec-007...\n');

// ==================== REC-007: SCRUM ESCALADO ====================
const rec007Process = {
  name: "Scaled Scrum (SAFe/LeSS)",
  type: "agile-scaled",
  chapter: 3,
  description: "Framework ágil escalado para múltiples equipos Scrum (3-5 equipos, 20-40 personas) trabajando en mismo producto. Combina ceremonias estándar de Scrum con ceremonias adicionales de coordinación: Scrum of Scrums (SoS), Product Owner Sync, System Demo, PI Planning. Basado en SAFe (Scaled Agile Framework) o LeSS (Large-Scale Scrum) para sincronización multi-equipo.",
  why: [
    "Múltiples equipos trabajando en paralelo maximizan throughput (más personas = más features simultáneas)",
    "Ceremonias de sincronización (SoS, PO Sync) previenen conflictos entre equipos y dependencias bloqueantes",
    "Sprints sincronizados (todos inician lunes) facilitan integration testing y system demos coordinados",
    "PI Planning cada 10 semanas alinea roadmap de todos los equipos con objetivos estratégicos de negocio",
    "System Demo end-to-end valida que subsistemas desarrollados por equipos independientes se integran correctamente"
  ],
  how: [
    "3-5 equipos Scrum (cada uno 6-9 personas) con sprints sincronizados de 2 semanas (todos inician/terminan mismo día)",
    "Ceremonias estándar por equipo: Planning, Daily Standup, Review, Retrospective",
    "Ceremonias de escalamiento: Scrum of Scrums 3x/semana (representantes de equipos), PO Sync semanal, System Demo fin de sprint",
    "PI Planning cada 10 semanas: Planning de alto nivel para 5 sprints futuros con todos los equipos (2 días presencial)",
    "Integration testing continuo: CI/CD ejecuta integration tests cross-subsystem después de cada merge"
  ],
  phases: [
    {
      id: "phase-scaled-planning",
      name: "Sprint Planning (Multi-Team Synchronized)",
      order: 1,
      description: "Sprint Planning sincronizado donde 3-5 equipos planifican sprints de 2 semanas en paralelo. Coordinación de dependencias cross-team crítica. Objetivo: Cada equipo tiene Sprint Backlog alineado con objetivos globales del PI (Program Increment).",
      duration: "4 horas por equipo (todos ejecutan planning simultáneamente)",
      activities: [
        "Chief Product Owner presenta objetivos del sprint alineados con PI roadmap (qué features son prioridad global esta iteración)",
        "Product Owners de cada equipo presentan top stories de su backlog a sus respectivos equipos",
        "Equipos identifican dependencias cross-team: Equipo A necesita API de Equipo B, Equipo C depende de feature de Equipo D",
        "Dependency board actualizado: Visualizar dependencias críticas entre equipos (impedimentos potenciales)",
        "Scrum of Scrums pre-planning (30 min): Representantes de equipos coordinan secuencia de trabajo (Equipo B debe completar API en día 3 para que A pueda integrar)",
        "Cada equipo selecciona stories considerando dependencies: Si dependen de otro equipo, asumen riesgo de bloqueo",
        "Definir Sprint Goals por equipo alineados con objetivo global del PI (ej: PI Goal 'Lanzar checkout v2', Sprint Goals de equipos contribuyen a esto)",
        "Integration testing plan: Definir qué equipos ejecutarán integration tests cross-subsystem al final del sprint",
        "Output: Sprint Backlogs de 3-5 equipos sincronizados, dependency board actualizado"
      ],
      inputs: [
        "PI roadmap (objetivos de Program Increment para próximos 5 sprints)",
        "Product Backlogs de cada equipo (priorizados por POs)",
        "Dependency board (dependencias conocidas entre equipos)",
        "Velocity promedio por equipo (20-30 puntos típico por equipo 6-9 personas)"
      ],
      outputs: [
        "Sprint Backlogs de 3-5 equipos (60-150 story points total si 3-5 equipos)",
        "Sprint Goals por equipo alineados con PI roadmap",
        "Dependency board actualizado (riesgos de bloqueo identificados)",
        "Integration testing plan (qué equipos integran qué subsistemas)"
      ],
      deliverables: [
        {
          name: "Multi-Team Sprint Backlogs (3-5 tableros Kanban)",
          template: null,
          required: true,
          reviewedBy: ["Product Owners", "Chief Product Owner"]
        },
        {
          name: "Dependency Board (dependencias cross-team)",
          template: "tpl-011",
          required: true,
          reviewedBy: ["Release Train Engineer", "Scrum Masters"]
        },
        {
          name: "Sprint Goals (por equipo, alineados con PI)",
          template: "tpl-009",
          required: true,
          reviewedBy: ["Chief Product Owner"]
        }
      ],
      gate: {
        name: "Multi-Team Sprint Commitment",
        criteria: [
          "Sprint Goals de equipos alineados con objetivos del PI (no equipos trabajando en direcciones divergentes)",
          "Dependencias críticas identificadas y mitigadas (Equipo B comprometido a entregar API en día 3)",
          "Velocity total de equipos balanceado (no un equipo over-committed y otros con capacity sobrante)",
          "Integration testing plan acordado (equipos saben cuándo y cómo integrarán)",
          "Chief Product Owner aprueba alineación de sprints con roadmap estratégico"
        ],
        decision: "COMMIT / ADJUST DEPENDENCIES / RE-BALANCE WORK",
        approvers: ["Chief Product Owner", "Product Owners (3-5)", "Release Train Engineer"]
      },
      keyStakeholders: ["Chief Product Owner", "Product Owners (1 por equipo)", "Scrum Masters (1 por equipo)", "Release Train Engineer", "Development Teams (3-5 equipos)"]
    },
    {
      id: "phase-scaled-daily-dev",
      name: "Daily Development (with Scrum of Scrums)",
      order: 2,
      description: "Ejecución de sprint con desarrollo paralelo de 3-5 equipos. Daily Standups dentro de cada equipo + Scrum of Scrums (SoS) 3x/semana entre representantes de equipos para sincronización cross-team. Objetivo: Maximizar paralelismo sin conflictos de integración.",
      duration: "10 días hábiles (2 semanas)",
      activities: [
        "Daily Standup por equipo (15 min, 9:00 AM): Cada equipo ejecuta standup estándar internamente",
        "Scrum of Scrums (SoS) 3x/semana (lunes/miércoles/viernes, 9:30 AM, 30 min): 1 representante por equipo (tech lead o scrum master) sincroniza",
        "SoS agenda: (1) Progreso de cada equipo, (2) Dependencies resueltas o bloqueadas, (3) Integration issues encontrados, (4) Coordinación de próximos 2 días",
        "Desarrollo paralelo: Equipos trabajan independientemente en sus subsistemas (Equipo A: frontend, B: backend API, C: data pipeline, D: admin panel)",
        "Integration testing continuo: CI/CD ejecuta integration tests cross-subsystem después de cada merge (validar que cambio en A no rompe B)",
        "Product Owner Sync semanal (miércoles, 1h): POs de equipos + Chief PO sincronizan prioridades, ajustan backlogs si dependencias cambiaron",
        "Dependency escalation: Si Equipo A bloqueado porque Equipo B no entregó API, Release Train Engineer escala y re-prioriza trabajo de B",
        "Code reviews cross-team (opcional): Developers de diferentes equipos revisan PRs que afectan interfaces compartidas (APIs, message schemas)",
        "Continuous Integration agresivo: Merge frequency balanceada (no todos los equipos mergen simultáneamente para evitar integration conflicts)",
        "Monitoring de dependency board: Release Train Engineer trackea dependencias críticas, alerta si bloqueos no se resuelven en 24h"
      ],
      inputs: [
        "Sprint Backlogs de 3-5 equipos",
        "Dependency board (dependencias críticas trackeadas)",
        "Integration testing suite (tests cross-subsystem automatizados)",
        "Product Owner Sync agenda (prioridades a discutir)"
      ],
      outputs: [
        "Código de 3-5 subsistemas desarrollados en paralelo",
        "Integration tests pasando (subsistemas se comunican correctamente)",
        "Dependency board actualizado (dependencias resueltas o escaladas)",
        "Burndown charts de 3-5 equipos (progreso individual + agregado)"
      ],
      deliverables: [
        {
          name: "Multi-Subsystem Code (3-5 repos, merges coordinados)",
          template: null,
          required: true,
          reviewedBy: ["Development Teams", "Release Train Engineer"]
        },
        {
          name: "Integration Test Suite (cross-subsystem tests pasando)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["Integration Testing Team", "QA Lead"]
        },
        {
          name: "Dependency Board Updated (bloqueos resueltos)",
          template: "tpl-011",
          required: true,
          reviewedBy: ["Release Train Engineer"]
        }
      ],
      gate: {
        name: "Multi-Team Progress Check",
        criteria: [
          "Scrum of Scrums ejecutado 3x/semana (sincronización continua, no esperan fin de sprint)",
          "Dependency board sin bloqueos críticos activos >48h (escalaciones funcionando)",
          "Integration tests pasando >90% (subsistemas compatibles, no integration hell)",
          "Product Owner Sync semanal ejecutado (POs alineados en prioridades)",
          "Burndown charts agregados trending hacia zero (todos los equipos en track)"
        ],
        decision: "CONTINUE / ESCALATE BLOCKERS / ADJUST TEAM PRIORITIES",
        approvers: ["Release Train Engineer", "Scrum Masters (3-5)", "Chief Product Owner"]
      },
      keyStakeholders: ["Development Teams (3-5 equipos)", "Scrum Masters (coordinación SoS)", "Product Owners (sync semanal)", "Release Train Engineer", "Integration Testing Team"]
    },
    {
      id: "phase-scaled-system-demo",
      name: "System Demo (Multi-Team Integrated Review)",
      order: 3,
      description: "Demo integrada del sistema completo (subsistemas de 3-5 equipos funcionando juntos). Reemplaza Sprint Reviews individuales por equipo con System Demo unificado. Stakeholders ven producto end-to-end, no features aisladas. Objetivo: Validar integración cross-team exitosa.",
      duration: "2 horas (viernes PM, todas las teams demuestran conjuntamente)",
      activities: [
        "Chief Product Owner presenta objetivos del sprint alcanzados a nivel de sistema (no individual por equipo)",
        "Demo end-to-end: Flujo de usuario completo que atraviesa múltiples subsistemas (Equipo A frontend → B backend → C data pipeline → D admin panel)",
        "Cada equipo demuestra su contribución en contexto del flujo end-to-end (no demos aisladas)",
        "Integration testing live demo: Ejecutar integration tests en vivo para mostrar que subsistemas se comunican correctamente",
        "Stakeholders validan funcionalidad integrada: ¿El sistema completo cumple expectativas? ¿Bugs encontrados en integración?",
        "Product Owners aceptan/rechazan stories por equipo basado en integración exitosa (story de Equipo A no acepta si rompe integración con B)",
        "Feedback de stakeholders para próximo sprint: Prioridades ajustadas, nuevas features solicitadas, bugs críticos a fixear",
        "Actualizar Product Backlogs: Chief PO y POs de equipos re-priorizan basado en feedback de System Demo",
        "Decisión de release: ¿Sistema integrado va a producción este sprint o esperamos próximo? (releases cada 2-4 sprints típico en scaled scrum)",
        "Revisar métricas agregadas: Velocity total de equipos (80-150 story points típico para 3-5 equipos), bugs reportados cross-subsystem, integration issues"
      ],
      inputs: [
        "Sistema integrado en staging (subsistemas de 3-5 equipos desplegados juntos)",
        "Integration tests pasando (validación cross-subsystem)",
        "Sprint Goals de equipos (para validar cumplimiento global)",
        "Stakeholders (usuarios finales, management, product team)"
      ],
      outputs: [
        "Sistema integrado aceptado/rechazado por stakeholders",
        "Product Backlogs actualizados (prioridades ajustadas post-demo)",
        "Velocity agregada del sprint (story points completados por todos los equipos)",
        "Decisión de release a producción (go/no-go)",
        "Integration issues identificados (bugs cross-subsystem a fixear)"
      ],
      deliverables: [
        {
          name: "System Demo Report (aceptación de sistema integrado)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["Chief Product Owner", "Stakeholders"]
        },
        {
          name: "Updated Product Backlogs (3-5 backlogs actualizados)",
          template: null,
          required: true,
          reviewedBy: ["Product Owners", "Chief Product Owner"]
        },
        {
          name: "Aggregated Velocity Metrics (story points totales)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["Release Train Engineer"]
        }
      ],
      gate: {
        name: "Integrated System Acceptance",
        criteria: [
          "Sistema integrado funciona end-to-end (flujo completo de usuario atraviesa subsistemas exitosamente)",
          "Integration tests pasando >95% (subsistemas compatibles)",
          "Al menos 75% de stories de todos los equipos aceptadas (no todos los equipos deben llegar a 100%, pero mayoría sí)",
          "Zero bugs críticos de integración (bugs menores aceptables)",
          "Stakeholders satisfechos con progreso integrado (feedback positivo mayormente)",
          "Velocity agregada estable o mejorando sprint a sprint"
        ],
        decision: "ACCEPT INTEGRATED SYSTEM / PARTIAL ACCEPT / REJECT (si integration muy rota)",
        approvers: ["Chief Product Owner", "Stakeholders", "Product Owners (3-5)"]
      },
      keyStakeholders: ["Chief Product Owner", "Product Owners (3-5)", "Development Teams (3-5)", "Stakeholders (management, users)", "Release Train Engineer"]
    },
    {
      id: "phase-scaled-retrospective",
      name: "Multi-Level Retrospectives (Team + Cross-Team)",
      order: 4,
      description: "Retrospectives en 2 niveles: (1) Retrospectives individuales por equipo (1h), (2) Cross-Team Retrospective con representantes de equipos (1.5h). Objetivo: Mejorar procesos internos de equipos Y procesos de coordinación cross-team.",
      duration: "1h por equipo + 1.5h cross-team (viernes PM)",
      activities: [
        "Level 1 - Team Retrospectives (1h por equipo, paralelo): Cada equipo ejecuta retrospective estándar internamente (what went well, didn't, action items)",
        "Team retros enfocados en: Prácticas técnicas del equipo, velocity, collaboration interna, impedimentos específicos del equipo",
        "Level 2 - Cross-Team Retrospective (1.5h, representantes): 1 representante por equipo + Release Train Engineer + Chief PO discuten coordinación",
        "Cross-team retro agenda: (1) Dependency management (bloquearon equipos entre sí?), (2) Scrum of Scrums efectividad, (3) Integration testing issues, (4) Communication bottlenecks",
        "Identificar systemic issues: Problemas que afectan múltiples equipos (ej: CI pipeline lento afecta a todos, dependency board confuso, PO Sync no útil)",
        "Top 3 action items cross-team: Mejoras en procesos de coordinación (ej: 'Automatizar dependency tracking en Jira', 'SoS reducir a 2x/semana si no hay blockers')",
        "Top 2 action items por equipo: Mejoras internas de cada equipo (ej: 'Reducir tiempo de code review a <4h', 'Pair programming 1x/semana para knowledge sharing')",
        "Tracking de action items previos: Revisar si mejoras de retrospectiva anterior (team + cross-team) se implementaron (accountability)",
        "Close retrospectives: Release Train Engineer resume action items cross-team, Scrum Masters resumen action items de sus equipos, trackean para próxima retro"
      ],
      inputs: [
        "Sprint metrics por equipo (velocity, burndown, cycle time)",
        "Aggregated metrics (velocity total, integration test pass rate, dependency resolution time)",
        "Feedback de Scrum of Scrums (bloquearon teams?)",
        "Feedback de System Demo (integration issues)"
      ],
      outputs: [
        "Top 2 action items por equipo (6-10 action items totales si 3-5 equipos)",
        "Top 3 action items cross-team (coordinación, dependencies, integration)",
        "Retrospective summaries (por equipo + cross-team)",
        "Action items board actualizado (tracking de mejoras team + cross-team)"
      ],
      deliverables: [
        {
          name: "Team Retrospective Action Items (2 por equipo)",
          template: "tpl-012",
          required: true,
          reviewedBy: ["Scrum Masters", "Development Teams"]
        },
        {
          name: "Cross-Team Retrospective Action Items (top 3)",
          template: "tpl-012",
          required: true,
          reviewedBy: ["Release Train Engineer", "Chief Product Owner"]
        },
        {
          name: "Retrospective Summaries (team + cross-team)",
          template: "tpl-012",
          required: false,
          reviewedBy: ["Release Train Engineer"]
        }
      ],
      gate: {
        name: "Multi-Level Improvement Commitment",
        criteria: [
          "Cada equipo tiene 2 action items internos con owner y deadline",
          "Cross-team tiene 3 action items de coordinación con owner y deadline",
          "Action items son SMART (específicos, medibles, alcanzables en 1-2 sprints)",
          "Systemic issues identificados y con plan de acción (no solo síntomas)",
          "Action items previos (team + cross-team) fueron revisados (accountability)",
          "Ambiente de retros fue seguro (equipos participaron honestamente, no blame game)"
        ],
        decision: "COMMIT TO IMPROVEMENTS (team + cross-team)",
        approvers: ["Development Teams (3-5)", "Scrum Masters", "Release Train Engineer"]
      },
      keyStakeholders: ["Development Teams (3-5)", "Scrum Masters (1 por equipo)", "Release Train Engineer", "Chief Product Owner (opcional en cross-team retro)"]
    }
  ],
  iterationStrategy: "Sprints sincronizados de 2 semanas across 3-5 equipos (todos inician lunes, terminan viernes misma semana). Velocity agregada 80-150 story points total por sprint (20-30 puntos por equipo). Scrum of Scrums 3x/semana (lunes/miércoles/viernes, 30 min) para coordinación de dependencies. Product Owner Sync semanal (miércoles, 1h) para alinear prioridades. System Demo fin de sprint reemplaza Sprint Reviews individuales. PI (Program Increment) Planning cada 10 semanas (2 días presencial) planifica próximos 5 sprints con todos los equipos. Integration testing continuo post-merge para detectar incompatibilidades cross-subsystem temprano.",
  whenToUse: [
    "Sistema grande con múltiples módulos independientes que requieren equipos separados (e-commerce: frontend, backend, payments, logistics)",
    "Equipos >20 personas (3-5 equipos de 6-9 personas c/u, no un solo equipo gigante)",
    "Necesidad de desarrollo paralelo (múltiples features simultáneas para acelerar time-to-market)",
    "Dependencias cross-team manejables pero existentes (equipos no completamente independientes)",
    "Organización madura en Scrum (equipos individuales ya ejecutan Scrum bien, listo para escalar)",
    "Product Owner tiene Chief PO de apoyo (1 PO solo no puede manejar 3-5 equipos)",
    "Stakeholders requieren visibilidad de sistema completo (no solo features aisladas de equipos individuales)",
    "Budget soporta 20-40 personas (salarios + tooling enterprise como Jira Align, SAFe licenses)",
    "Sistema web establecido con roadmap claro (no startup experimental, sino producto maduro creciendo)",
    "Integration testing automatizado factible (CI/CD infrastructure robusta para tests cross-subsystem)"
  ],
  whenNotToUse: [
    "Equipo único <15 personas (overhead de Scrum of Scrums, System Demo no justifica, Scrum estándar suficiente)",
    "Subsistemas completamente independientes sin dependencies (cada equipo puede usar Scrum estándar aisladamente, no necesitan coordinación)",
    "Startup early-stage (Scrum/XP simple mejor, scaled Scrum demasiado pesado para 5-8 personas experimentando)",
    "Equipos distribuidos en zonas horarias muy diferentes (SoS 3x/semana, PO Sync síncrono difícil)",
    "Product Owner no tiene Chief PO de apoyo (1 PO solo se sobrecarga con 3-5 equipos)",
    "Sin Release Train Engineer dedicado (coordinación cross-team requiere rol full-time)",
    "Cultura organizacional no tolera ceremonias adicionales (SoS, PO Sync, System Demo visto como burocracia)",
    "Dependencies cross-team críticas y bloqueantes constantes (equipos se bloquean mutuamente, paralelismo se pierde)",
    "Budget limitado (20-40 personas + tooling enterprise costoso >$50K/año)",
    "Sistema simple sin complejidad arquitectónica (no necesitan múltiples equipos, 1 equipo Scrum estándar completa trabajo)"
  ],
  advantages: [
    "Escalabilidad: 3-5 equipos paralelos entregan 3-5x más throughput que 1 equipo único (asumiendo dependencies bajas)",
    "Sincronización explícita: Scrum of Scrums, PO Sync, System Demo previenen integration hell y conflictos cross-team",
    "Visibilidad del sistema completo: System Demo muestra producto integrado, no features aisladas (stakeholders ven el 'big picture')",
    "PI Planning alinea equipos con estrategia: Planning de 10 semanas asegura que todos los equipos trabajan hacia objetivos comunes",
    "Integration testing continuo: CI/CD cross-subsystem detecta incompatibilidades temprano (no big-bang integration al final)",
    "Fault isolation: Falla de Equipo B no bloquea completamente a otros equipos si dependencies bien gestionadas",
    "Especialización de equipos: Frontend team, backend team, data team permite expertise profunda (no todos generalistas)",
    "Velocity predecible agregada: Después de 3-4 sprints, velocity total estable permite roadmap >6 meses con ±20% accuracy",
    "Career growth: Equipos grandes ofrecen roles especializados (tech lead, architect, PO) que equipos pequeños no tienen",
    "Reduces single points of failure: Multiple Scrum Masters, POs, tech leads (no dependen de 1 persona clave)"
  ],
  disadvantages: [
    "Overhead de coordinación alto: SoS 3x/semana + PO Sync + System Demo + PI Planning consume 15-20% del tiempo",
    "Complejidad organizacional: Gestionar 3-5 POs, Scrum Masters, Chief PO, Release Train Engineer requiere management skills",
    "Dependencies bloquean flujo: Si Equipo A espera API de B, paralelismo se pierde (estimaciones complejas)",
    "Riesgo de burocracia: Ceremonias adicionales pueden volverse status meetings largos sin valor si mal facilitadas",
    "Integration testing complejo: CI/CD debe ejecutar tests cross-subsystem (infrastructure costosa, test data sync difícil)",
    "Communication overhead: 20-40 personas requieren más comunicación que 8-12 (Slack channels, meetings, emails crecen)",
    "Velocity variable entre equipos: Un equipo lento afecta system demo si otros dependen de él (frustración)",
    "Tooling costoso: Jira Align, SAFe licenses, enterprise ALM tools >$50K/año (vs Trello gratuito para equipo pequeño)",
    "Curva de aprendizaje de SAFe/LeSS: Frameworks complejos, equipos tardan 6-12 meses en dominar prácticas de escalamiento",
    "Silos de conocimiento: Equipos especializados (frontend, backend) pueden crear silos (frontend team no entiende backend)"
  ],
  changeManagement: {
    description: "Gestión de cambios coordinada cross-team con análisis de impacto multi-equipo.",
    steps: [
      {
        step: 1,
        name: "Scope Freeze Mid-Sprint (Multi-Team)",
        description: "Regla: NO cambios en Sprint Backlogs mid-sprint para ningún equipo (excepto emergencias críticas). Cambio en 1 equipo puede afectar dependencies de otros equipos, causando cascada de re-planificación."
      },
      {
        step: 2,
        name: "Cross-Team Impact Analysis",
        description: "Si cambio urgente mid-sprint es inevitable, Chief PO + Release Train Engineer analizan impacto cross-team: ¿Qué equipos afectados? ¿Dependencies rotas? ¿Re-priorización necesaria en múltiples equipos?"
      },
      {
        step: 3,
        name: "Dependency-Aware Backlog Re-Prioritization",
        description: "Entre sprints, POs re-priorizan backlogs en PO Sync considerando dependencies. Si Equipo A sube prioridad de feature que depende de Equipo B, PO de B debe ajustar prioridades en consecuencia."
      },
      {
        step: 4,
        name: "PI Planning for Long-Term Changes",
        description: "Cambios estratégicos grandes (nuevos módulos, refactoring arquitectónico) se planifican en PI Planning cada 10 semanas. 2 días de planning con todos los equipos asegura alineación antes de ejecutar cambios grandes."
      },
      {
        step: 5,
        name: "System Demo Validates Integrated Changes",
        description: "System Demo valida que cambios de múltiples equipos se integraron correctamente. Si un equipo cambió API sin coordinar, demo fallará y cambio se revierte o se fixea urgentemente."
      },
      {
        step: 6,
        name: "Retrospectives Address Change Management Issues",
        description: "Cross-Team Retrospective identifica problemas en gestión de cambios (ej: 'Dependencies no documentadas causaron bloqueos', 'PO Sync no suficiente para coordinar cambios grandes'). Action items mejoran procesos de change management."
      }
    ]
  },
  tooling: [
    {
      category: "Scaled Agile Management",
      tools: [
        "Jira Align (SAFe tooling, PI Planning, dependency tracking, roadmaps)",
        "VersionOne (alternativa a Jira Align para SAFe/LeSS)",
        "Rally (CA Agile Central, scaled agile management)"
      ]
    },
    {
      category: "Multi-Team Coordination",
      tools: [
        "Miro (PI Planning virtual, dependency boards, cross-team retrospectives)",
        "Mural (alternativa a Miro para workshops colaborativos)",
        "Slack (multi-channel communication, SoS notifications, integration alerts)"
      ]
    },
    {
      category: "Integration Testing",
      tools: [
        "Jenkins (CI/CD orchestration, integration tests cross-subsystem)",
        "GitHub Actions (CI/CD con matrix builds para tests paralelos)",
        "Postman/Newman (API integration testing automatizado)"
      ]
    },
    {
      category: "Dependency Tracking",
      tools: [
        "Jira Advanced Roadmaps (dependency visualization, cross-team dependencies)",
        "LucidChart (dependency diagrams, architecture visualization)",
        "Confluence (dependency documentation, API contracts, ADRs)"
      ]
    },
    {
      category: "Communication",
      tools: [
        "Zoom (PI Planning remoto, System Demo, cross-team retros)",
        "Slack (async coordination, SoS summaries, CI/CD notifications)",
        "Confluence (documentation, PI objectives, team working agreements)"
      ]
    }
  ],
  references: [
    {
      title: "Software Engineering (10th Edition) - Chapter 3: Agile Software Development",
      author: "Ian Sommerville",
      year: 2015,
      source: "Pearson"
    },
    {
      title: "SAFe 5.0 Distilled: Achieving Business Agility with the Scaled Agile Framework",
      author: "Richard Knaster, Dean Leffingwell",
      year: 2020,
      source: "Addison-Wesley"
    },
    {
      title: "Large-Scale Scrum (LeSS): More with LeSS",
      author: "Craig Larman, Bas Vodde",
      year: 2016,
      source: "Addison-Wesley"
    },
    {
      title: "The Scrum Guide (2020)",
      author: "Ken Schwaber, Jeff Sutherland",
      year: 2020,
      source: "Scrum.org"
    }
  ]
};

// Actualizar rec-007
data.recommendations['rec-007'].process = rec007Process;

// Guardar cambios finales
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');

console.log('✅ rec-007 enriquecido (Scrum Escalado - SAFe/LeSS)');
console.log('\n🎉 GRUPO D completado exitosamente!');
console.log('   - rec-005: Scrum Estándar (type: agile-iterative)');
console.log('   - rec-006: Scrum/XP Hybrid (type: agile-xp-hybrid)');
console.log('   - rec-007: Scaled Scrum (type: agile-scaled)');
