const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'src', 'data', 'recommendations.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Nuevo proceso completo para rec-004 (Sistema Transaccional Grande con RUP)
const newProcess = {
  name: "Incremental Development with RUP",
  type: "iterative-phased",
  chapter: 2,
  description: "Framework híbrido que combina 4 fases secuenciales de RUP (Inception, Elaboration, Construction, Transition) con desarrollo iterativo incremental dentro de cada fase. Ideal para sistemas transaccionales grandes con requisitos complejos, workflows de negocio críticos y necesidad de arquitectura robusta desde el inicio.",
  why: [
    "RUP estructura el desarrollo en fases macro para gestionar complejidad",
    "Iteraciones dentro de cada fase permiten entregas incrementales y feedback continuo",
    "Emphasis en arquitectura sólida (Elaboration) minimiza refactoring costoso en Construction",
    "Manejo sistemático de transacciones ACID desde fase de diseño",
    "Documentación formal (Use Cases, SAD) facilita governance y auditorías"
  ],
  how: [
    "Ejecutar 4 fases secuenciales (Inception → Elaboration → Construction → Transition)",
    "Cada fase tiene 1-5 iteraciones de 2-4 semanas que producen incremento funcional",
    "Usar 9 disciplinas RUP (Requirements, Design, Implementation, Testing, Deployment)",
    "Intensidad de disciplinas varía por fase: Requirements alto en Inception/Elaboration, Implementation alto en Construction",
    "Milestones claros (Lifecycle Objective, Architecture, Capability, Release) con decisiones go/no-go"
  ],
  phases: [
    {
      id: "phase-rup-inception",
      name: "Inception (Concepción)",
      order: 1,
      description: "Establecer viabilidad del proyecto, alcance inicial y business case. Objetivo: Responder '¿Vale la pena construir este sistema?' mediante análisis preliminar de requisitos y factibilidad técnica.",
      duration: "2-4 semanas (1-2 iteraciones)",
      activities: [
        "Identificar stakeholders clave y objetivos de negocio (C-level, usuarios finales, IT)",
        "Crear Vision Document (problema a resolver, objetivos estratégicos, restricciones presupuesto/tiempo)",
        "Definir 10-15 casos de uso core (critical business workflows: facturación, ventas, inventario)",
        "Realizar feasibility study técnico (tecnologías candidatas, integraciones con legacy systems)",
        "Construir Business Case con ROI preliminar (costos estimados, beneficios cuantificables)",
        "Identificar riesgos críticos iniciales (top 5: integraciones, escalabilidad, regulaciones)",
        "Crear initial project plan (fases, hitos, recursos necesarios)",
        "Milestone: Lifecycle Objective - Decisión go/no-go de stakeholders y sponsor"
      ],
      inputs: [
        "Solicitud de proyecto o RFP (Request for Proposal)",
        "Descripción del problema de negocio a resolver",
        "Restricciones conocidas (presupuesto, tiempo, compliance)"
      ],
      outputs: [
        "Vision Document aprobado (10-15 páginas)",
        "Initial Use Case Model (10-15 casos de uso en formato brief)",
        "Business Case con ROI preliminar",
        "Initial Risk List (top 10 riesgos identificados)",
        "Project Plan de alto nivel (Gantt con fases y milestones)"
      ],
      deliverables: [
        {
          name: "Vision Document v1.0",
          template: "tpl-001",
          required: true,
          reviewedBy: ["Product Owner", "Sponsor", "Business Analyst"]
        },
        {
          name: "Use Case Specification (brief format, UML use case diagrams)",
          template: "tpl-002",
          required: true,
          reviewedBy: ["Business Analyst", "Product Owner"]
        },
        {
          name: "Business Case Document (financial analysis, ROI)",
          template: "tpl-003",
          required: true,
          reviewedBy: ["CFO", "Sponsor"]
        },
        {
          name: "Go/No-Go Decision Document",
          template: "tpl-015",
          required: true,
          reviewedBy: ["Sponsor", "Finance"]
        }
      ],
      gate: {
        name: "Lifecycle Objective Milestone",
        criteria: [
          "Vision Document aprobado por al menos 3/4 de stakeholders ejecutivos",
          "Business Case muestra ROI positivo en 18-24 meses",
          "Top 5 riesgos tienen estrategias de mitigación identificadas",
          "Presupuesto aprobado para Elaboration Phase (siguiente fase)",
          "Sponsor firma decisión explícita de continuar a Elaboration"
        ],
        decision: "GO / NO-GO / PIVOT",
        approvers: ["Sponsor", "Product Owner", "Technical Lead", "Finance"]
      },
      keyStakeholders: ["Business Analyst", "Product Owner", "Enterprise Architect", "CFO", "CTO"]
    },
    {
      id: "phase-rup-elaboration",
      name: "Elaboration (Elaboración)",
      order: 2,
      description: "Establecer arquitectura base del sistema y mitigar riesgos arquitectónicos críticos. Objetivo: Crear architecture baseline sólida que soporte todos los requisitos sin refactoring mayor en Construction.",
      duration: "8-12 semanas (2-3 iteraciones de 4 semanas)",
      activities: [
        "Refinar y detallar 80% de casos de uso (formato fully dressed con pre/post condiciones, flujos alternativos)",
        "Diseñar arquitectura de referencia (capas: presentación, lógica negocio, acceso datos, integración)",
        "Seleccionar stack tecnológico definitivo (frameworks, DB, cloud provider, message queues)",
        "Construir Architecture Baseline (ADRs para decisiones críticas: monolito vs microservicios, SQL vs NoSQL)",
        "Implementar spike técnico de componentes críticos (motor de workflows, procesamiento transaccional, integraciones)",
        "Definir NFRs cuantificables (latencia <200ms, throughput 1000 TPS, uptime 99.9%)",
        "Crear detailed risk mitigation plan (top 10 riesgos con owner, plan, deadline)",
        "Testing del spike: performance, escalabilidad, seguridad básica",
        "Milestone: Lifecycle Architecture - Arquitectura aprobada por equipo técnico y stakeholders"
      ],
      inputs: [
        "Vision Document aprobado (Inception)",
        "Initial Use Cases (brief format)",
        "Risk List inicial",
        "Budget aprobado para Elaboration"
      ],
      outputs: [
        "Detailed Use Case Specifications (80% completos, fully dressed)",
        "Software Architecture Document (SAD con diagramas UML: componentes, deployment, secuencia)",
        "Architecture Baseline (spike técnico funcional con componentes críticos)",
        "Architecture Decision Records (ADRs para decisiones key)",
        "Risk Mitigation Plan detallado (top 10 riesgos con planes de acción)",
        "Refined Project Plan (estimaciones de Construction con ±15% accuracy)"
      ],
      deliverables: [
        {
          name: "Software Architecture Document (SAD)",
          template: "tpl-004",
          required: true,
          reviewedBy: ["Software Architect", "Technical Lead"]
        },
        {
          name: "Detailed Use Case Model (UML, 80% completos)",
          template: "tpl-002",
          required: true,
          reviewedBy: ["Business Analyst", "Product Owner"]
        },
        {
          name: "Architecture Baseline (código ejecutable del spike)",
          template: null,
          required: true,
          reviewedBy: ["Software Architect", "Senior Developers"]
        },
        {
          name: "Risk Mitigation Plan v2.0",
          template: "tpl-014",
          required: true,
          reviewedBy: ["Risk Manager", "Technical Lead"]
        },
        {
          name: "NFRs Document (performance, seguridad, escalabilidad)",
          template: "tpl-005",
          required: true,
          reviewedBy: ["Architect", "QA Lead"]
        }
      ],
      gate: {
        name: "Lifecycle Architecture Milestone",
        criteria: [
          "Architecture Baseline valida todos los NFRs críticos (performance, escalabilidad)",
          "80% de casos de uso detallados y aprobados por Product Owner",
          "Top 5 riesgos arquitectónicos mitigados o con plan claro",
          "Estimaciones de Construction refinadas con ±15% accuracy",
          "Arquitectura aprobada por Architecture Review Board (ARB)",
          "Go decision de sponsor para continuar a Construction (presupuesto aprobado)"
        ],
        decision: "GO / REFINE ARCHITECTURE / NO-GO",
        approvers: ["Software Architect", "Technical Lead", "Product Owner", "Sponsor", "Security Lead"]
      },
      keyStakeholders: ["Software Architect", "Senior Developers", "DBA", "Security Engineer", "DevOps Lead"]
    },
    {
      id: "phase-rup-construction",
      name: "Construction (Construcción)",
      order: 3,
      description: "Desarrollar sistema completo con todas las features implementadas, probadas e integradas. Objetivo: Producir sistema operacional listo para User Acceptance Testing (UAT).",
      duration: "12-20 semanas (3-5 iteraciones de 4 semanas)",
      activities: [
        "Iteración 1-2 (Core Features): Implementar workflows críticos de negocio (facturación, ventas, usuarios), testing unit e integration",
        "Iteración 3-4 (Secondary Features): Implementar features secundarios (reportes, dashboards, admin panels), integraciones con sistemas externos",
        "Iteración 5 (Hardening): Bug fixing, performance tuning, security hardening, refactoring técnico, testing end-to-end",
        "Code reviews obligatorios (peer review para cada feature critical)",
        "Testing continuo: unit tests (>80% coverage), integration tests, system tests por iteración",
        "Crear user documentation (user manuals, help system, FAQs)",
        "Preparar deployment scripts (CI/CD pipelines, migrations, rollback procedures)",
        "Realizar pre-UAT interno (alpha testing con equipo interno)",
        "Milestone: Initial Operational Capability - Sistema completo y listo para UAT"
      ],
      inputs: [
        "Architecture Baseline validada (Elaboration)",
        "Detailed Use Cases (80% completos)",
        "NFRs definidos",
        "Development environment configurado"
      ],
      outputs: [
        "Sistema operacional con 100% features implementados",
        "Test Suite completo (unit, integration, system tests con >80% coverage)",
        "User Documentation (manuals, help system, release notes)",
        "Deployment Package (CI/CD pipelines, Docker images, Kubernetes manifests)",
        "Pre-UAT Test Report (alpha testing resultados)"
      ],
      deliverables: [
        {
          name: "Sistema desplegable en staging (100% funcional)",
          template: null,
          required: true,
          reviewedBy: ["Technical Lead", "QA Lead", "Product Owner"]
        },
        {
          name: "Test Coverage Report (>80% en código crítico)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["QA Lead"]
        },
        {
          name: "User Manual v1.0",
          template: "tpl-007",
          required: true,
          reviewedBy: ["Technical Writer", "Product Owner"]
        },
        {
          name: "Deployment Guide (runbook)",
          template: "tpl-006",
          required: true,
          reviewedBy: ["DevOps Lead", "Operations"]
        },
        {
          name: "Release Notes v1.0",
          template: "tpl-008",
          required: true,
          reviewedBy: ["Product Owner"]
        }
      ],
      gate: {
        name: "Initial Operational Capability Milestone",
        criteria: [
          "100% de casos de uso implementados y verificados",
          "Test coverage >80% en código crítico (core workflows)",
          "Zero bugs críticos, <5 bugs high priority conocidos",
          "Performance cumple NFRs (latencia, throughput, uptime en staging)",
          "Security audit aprobado (OWASP Top 10, penetration testing básico)",
          "Pre-UAT completado con >90% éxito en test cases",
          "Aprobación de Technical Lead y Product Owner para iniciar UAT"
        ],
        decision: "GO TO UAT / FIX CRITICAL ISSUES / ITERATE",
        approvers: ["Technical Lead", "QA Lead", "Product Owner", "Security Lead"]
      },
      keyStakeholders: ["Development Team (8-15 developers)", "QA Engineers", "DevOps Engineer", "Technical Writer"]
    },
    {
      id: "phase-rup-transition",
      name: "Transition (Transición)",
      order: 4,
      description: "Desplegar sistema a producción, ejecutar User Acceptance Testing (UAT), capacitar usuarios y establecer soporte inicial. Objetivo: Sistema aceptado y operando en producción con usuarios reales.",
      duration: "4-8 semanas (1-2 iteraciones de 4 semanas)",
      activities: [
        "Ejecutar User Acceptance Testing (UAT) con 20-50 usuarios piloto (key users de cada departamento)",
        "Iteración 1 (UAT): Fixing de bugs reportados por usuarios (prioridad alta), ajustes de UX menores",
        "Crear training materials (videos, slideshows, hands-on labs para end-users)",
        "Ejecutar training sessions (capacitación presencial o virtual, 3-5 sesiones de 2h c/u)",
        "Preparar production environment (configuración de servidores, DB, networking, monitoreo)",
        "Ejecutar data migration de legacy systems (ETL scripts, validación de integridad de datos)",
        "Deployment a producción (phased rollout: 10% usuarios → 50% → 100% en 2 semanas)",
        "Establecer soporte L1/L2 (helpdesk, on-call rotation, incident response procedures)",
        "Monitoreo post-deployment (métricas SRE: latencia, error rate, uptime por 30 días)",
        "Milestone: Product Release - Sistema aceptado por usuarios y operando en producción"
      ],
      inputs: [
        "Sistema operacional completo (Construction)",
        "Test reports de pre-UAT",
        "User documentation",
        "Production environment aprovisionado"
      ],
      outputs: [
        "Sistema en producción con 100% usuarios activos",
        "UAT Test Report (aprobado por usuarios piloto y Product Owner)",
        "Training completion certificates (usuarios capacitados)",
        "Post-Deployment Support Plan (L1/L2 procedures, escalation matrix)",
        "Lessons Learned Document (retrospectiva del proyecto)"
      ],
      deliverables: [
        {
          name: "Production System (live con usuarios reales)",
          template: null,
          required: true,
          reviewedBy: ["Operations Manager", "Product Owner"]
        },
        {
          name: "UAT Acceptance Document",
          template: "tpl-013",
          required: true,
          reviewedBy: ["Product Owner", "Key Users", "Sponsor"]
        },
        {
          name: "Training Materials Package",
          template: "tpl-007",
          required: true,
          reviewedBy: ["Training Team", "Product Owner"]
        },
        {
          name: "Operations Manual (runbook, troubleshooting)",
          template: "tpl-006",
          required: true,
          reviewedBy: ["SRE", "DevOps Lead"]
        },
        {
          name: "Post-Implementation Review",
          template: "tpl-015",
          required: true,
          reviewedBy: ["Product Owner", "Sponsor", "Technical Lead"]
        }
      ],
      gate: {
        name: "Product Release Milestone",
        criteria: [
          "UAT aprobado por >90% de usuarios piloto (acceptance criteria cumplidos)",
          "Zero bugs críticos en producción, <3 bugs high priority conocidos",
          "Data migration completada con 100% integridad (validación end-to-end)",
          "Training completado para >95% de usuarios finales (attendance + quiz >80%)",
          "Sistema operando en producción con >99% uptime por 7 días continuos",
          "Soporte L1/L2 establecido y respondiendo a tickets (<4h response time)",
          "Sign-off formal de sponsor y Product Owner (project closure)"
        ],
        decision: "PROJECT SUCCESS / ITERATE / ROLLBACK",
        approvers: ["Product Owner", "Sponsor", "Key Users (piloto)", "Operations Manager", "Support Lead"]
      },
      keyStakeholders: ["End Users", "Support Team", "Training Team", "Operations Team", "Product Owner"]
    }
  ],
  iterationStrategy: "RUP ejecuta 7-12 iteraciones totales distribuidas en 4 fases: Inception (1-2 iter), Elaboration (2-3 iter), Construction (3-5 iter), Transition (1-2 iter). Cada iteración dura 2-4 semanas y produce incremento funcional testeable. Intensidad de 9 disciplinas RUP varía por fase: Requirements alto en Inception/Elaboration, Implementation alto en Construction, Deployment alto en Transition. Feedback de usuarios piloto en Transition puede gatillar iteración adicional de refinamiento.",
  whenToUse: [
    "Sistema transaccional grande con workflows complejos (ERP, CRM, core banking)",
    "Requisitos bien entendidos pero complejos (necesitan análisis detallado en Elaboration)",
    "Necesidad de arquitectura robusta desde el inicio (evitar refactoring costoso después)",
    "Equipo mediano-grande (20-50 personas) con roles especializados (BA, Architect, QA)",
    "Múltiples stakeholders con intereses divergentes (requiere Vision y Business Case claros)",
    "Alto impacto de fallas en producción (financiero, salud, crítico para negocio)",
    "Integraciones complejas con legacy systems (necesitan spike técnico en Elaboration)",
    "Regulaciones estrictas que requieren documentación formal (FDA, SOX, HIPAA)",
    "Presupuesto grande (>$500K) con necesidad de control de costos por fase",
    "Organización madura con procesos definidos (compatible con governance corporativo)"
  ],
  whenNotToUse: [
    "Requisitos completamente desconocidos o experimentales (Ágil puro o Espiral mejor)",
    "Startup o proyecto de innovación sin arquitectura predefinida (overhead de RUP excesivo)",
    "Equipo pequeño (<10 personas) sin roles especializados (RUP demasiado pesado)",
    "Plazos muy cortos (<6 meses, no hay tiempo para 4 fases completas)",
    "Presupuesto limitado (<$100K, overhead de documentación y governance muy caro)",
    "Cambios frecuentes de requisitos esperados (Scrum/XP mejor para pivoting rápido)",
    "Sistema simple CRUD sin workflows complejos (overkill, Incremental puro suficiente)",
    "Cultura organizacional ágil anti-documentación (friction con formalidad de RUP)",
    "Sin sponsor ejecutivo comprometido (RUP requiere decisiones go/no-go frecuentes)",
    "Tecnología completamente nueva sin madurez (spike de Elaboration puede fallar)"
  ],
  advantages: [
    "Arquitectura sólida desde Elaboration evita refactoring costoso en Construction (saving 30-40% tiempo)",
    "Control de riesgos en fases tempranas (Inception + Elaboration) minimiza sorpresas tardías",
    "Iteraciones dentro de fases permiten feedback continuo sin perder estructura macro",
    "Documentación formal (Vision, SAD, Use Cases) facilita governance y auditorías de compliance",
    "Milestones claros (Lifecycle Objective, Architecture, Capability, Release) permiten decisiones go/no-go",
    "Apropiado para equipos grandes con especialización (roles claros: BA, Architect, Dev, QA)",
    "Manejo explícito de requisitos complejos mediante casos de uso detallados (UML)",
    "Transition Phase asegura deployment exitoso con UAT, training y soporte estructurado",
    "Escalable a proyectos muy grandes (equipos distribuidos, múltiples locaciones)",
    "Compatible con herramientas enterprise (IBM Rational, JIRA, Confluence, ALM tools)"
  ],
  disadvantages: [
    "Overhead de documentación alto (Vision, SAD, Use Cases consume 15-20% del tiempo)",
    "Largo tiempo hasta primer release (6-12 meses mínimo para 4 fases completas)",
    "Requiere equipo experimentado con expertise en RUP (curva de aprendizaje >6 meses)",
    "Costoso debido a fases de análisis extensas (Inception + Elaboration = 25-30% del timeline)",
    "Menos flexible que Ágil puro ante cambios de requisitos en Construction/Transition",
    "Governance pesado puede generar burocracia (aprobaciones de milestones lentas)",
    "Riesgo de analysis paralysis en Elaboration (exceso de diseño upfront)",
    "Transición de fase puede ser abrupta si estimaciones de Elaboration fueron incorrectas",
    "Requiere tooling enterprise costoso (IBM Rational Suite, ALM tools >$50K licencias)",
    "Puede sentirse 'anticuado' en organizaciones con cultura ágil moderna"
  ],
  changeManagement: {
    description: "Gestión de cambios estructurada por fase con impact analysis. Cambios en Inception/Elaboration son más baratos (requisitos aún flexibles). Cambios en Construction/Transition requieren Change Control Board (CCB) y aprobación formal debido a alto costo de refactoring.",
    steps: [
      {
        step: 1,
        name: "Change Request Formal (CR)",
        description: "Todo cambio de requisitos, arquitectura o alcance requiere CR formal con: justificación, impacto en tiempo/costo/riesgo, alternativas consideradas."
      },
      {
        step: 2,
        name: "Impact Analysis por Fase",
        description: "Inception/Elaboration: cambios baratos (requisitos flexibles). Construction: cambios costosos (refactoring de código). Transition: cambios muy costosos (re-testing de UAT, re-training)."
      },
      {
        step: 3,
        name: "Change Control Board (CCB) Review",
        description: "En Construction/Transition, CCB (Product Owner, Architect, Tech Lead, Sponsor) revisa CR y decide: Aprobar, Rechazar, Defer to Next Release."
      },
      {
        step: 4,
        name: "Re-estimación y Re-planificación",
        description: "Cambios aprobados requieren re-estimar tiempo/costo afectado. Actualizar project plan, comunicar a stakeholders, ajustar próximas iteraciones."
      },
      {
        step: 5,
        name: "Implementation y Regression Testing",
        description: "Implementar cambio en próxima iteración disponible. Ejecutar regression testing completo (cambios pueden romper features existentes)."
      },
      {
        step: 6,
        name: "Documentation Update",
        description: "Actualizar documentación afectada: Use Cases, SAD, User Manuals, Test Cases, Release Notes. Versionar todos los documentos (vX.Y)."
      }
    ]
  },
  tooling: [
    {
      category: "Requirements Management",
      tools: [
        "IBM DOORS, Jama, JIRA Requirements para trazabilidad de requisitos",
        "Enterprise Architect, Visual Paradigm para UML Use Cases y diagramas"
      ]
    },
    {
      category: "Project Management",
      tools: [
        "MS Project, JIRA, Monday.com con Gantt charts para fases y milestones",
        "Confluence, SharePoint para documentación centralizada (Vision, SAD)"
      ]
    },
    {
      category: "Development",
      tools: [
        "Git/GitHub/GitLab para version control de código y documentación",
        "CI/CD (Jenkins, GitHub Actions) para builds automatizados por iteración",
        "IBM Rational Suite (RUP tooling completo: ClearCase, ClearQuest)"
      ]
    },
    {
      category: "Testing",
      tools: [
        "Selenium, JMeter, Postman para testing automatizado (unit, integration, performance)",
        "SonarQube para code quality y test coverage tracking"
      ]
    },
    {
      category: "Monitoring",
      tools: [
        "Datadog, New Relic, Prometheus/Grafana para producción",
        "Slack/Teams con integraciones a JIRA para daily standups"
      ]
    }
  ],
  references: [
    {
      title: "Software Engineering (10th Edition) - Chapter 2.3: Incremental Development",
      author: "Ian Sommerville",
      year: 2015,
      source: "Pearson"
    },
    {
      title: "Software Engineering (10th Edition) - Chapter 2.4: Rational Unified Process",
      author: "Ian Sommerville",
      year: 2015,
      source: "Pearson"
    },
    {
      title: "The Rational Unified Process: An Introduction",
      author: "Philippe Kruchten",
      year: 2003,
      source: "Addison-Wesley"
    }
  ]
};

// Actualizar rec-004
data.recommendations['rec-004'].process = newProcess;

// Guardar
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');

console.log('✅ rec-004 enriquecido exitosamente con RUP para Sistema Transaccional Grande');
console.log(`   - Type: ${newProcess.type}`);
console.log(`   - Phases: ${newProcess.phases.length} fases RUP`);
console.log(`   - Iterations: 7-12 total (distribuidas en 4 fases)`);
console.log(`   - whenToUse: ${newProcess.whenToUse.length} criterios`);
console.log(`   - advantages: ${newProcess.advantages.length} puntos`);
console.log('   - changeManagement: 6 pasos con CCB');
