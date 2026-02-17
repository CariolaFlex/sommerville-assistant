const fs = require('fs');
const path = require('path');

// Leer el JSON completo (usando path relativo desde el directorio del script)
const jsonPath = path.join(__dirname, 'src', 'data', 'recommendations.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Nuevo proceso completo para rec-003 (Modelo Espiral)
const newProcess = {
  name: "Spiral Model (Boehm)",
  type: "risk-driven",
  description: "Modelo de proceso orientado a gestión de riesgos que combina desarrollo iterativo con análisis sistemático de riesgos en cada ciclo. Cada iteración atraviesa 4 sectores: Objetivos, Análisis de Riesgos, Desarrollo/Verificación, Planificación. Enfocado en proyectos con alta incertidumbre técnica o de requisitos.",
  why: [
    "Reducción temprana de riesgos técnicos y de mercado mediante prototipos",
    "Gestión sistemática de incertidumbre en proyectos innovadores",
    "Fail-fast: descubrir problemas críticos antes de inversión masiva",
    "Flexibilidad para cambios de requisitos basados en prototipos",
    "Validación continua con stakeholders en cada ciclo"
  ],
  how: [
    "Ciclo 1 (4-6 sem): Concept of Operations → prototipo de feasibility",
    "Ciclo 2 (6-8 sem): Requirements Specification → prototipo arquitectónico",
    "Ciclo 3 (8-12 sem): Design & Implementation → sistema operacional",
    "Ciclo 4 (4-6 sem): Acceptance & Deployment → sistema en producción",
    "Cada ciclo tiene 4 sectores: Objectives → Risk Analysis → Development → Planning",
    "Go/No-Go decision al final de cada ciclo basada en riesgos residuales"
  ],
  phases: [
    {
      id: "phase-spiral-cycle1",
      name: "Ciclo 1: Concept of Operations",
      order: 1,
      description: "Exploración inicial de viabilidad y alternativas de solución. Identifica riesgos críticos de concepto y valida feasibility mediante prototipo throw-away.",
      duration: "4-6 semanas",
      activities: [
        "SECTOR 1 - Determinar Objetivos: Definir objetivos de negocio, constraints (presupuesto, tecnología) y alternativas de solución (3-5 opciones arquitectónicas)",
        "SECTOR 2 - Analizar Riesgos: Identificar top 10 riesgos (técnicos, de mercado, financieros). Risk assessment (probabilidad × impacto). Estrategias de mitigación (prototipo, investigación, POC)",
        "SECTOR 3 - Desarrollo: Crear prototipo de feasibility (throw-away) que demuestre viabilidad técnica de la alternativa seleccionada. Validar supuestos críticos",
        "SECTOR 4 - Planificar Siguiente Ciclo: Revisar riesgos residuales, decidir GO/NO-GO. Si GO, planificar Ciclo 2 (Requirements Specification) con enfoque en riesgos de requisitos"
      ],
      inputs: [
        "Business case con objetivos estratégicos",
        "Constraints de presupuesto, tiempo, tecnología",
        "Lista inicial de stakeholders y sus expectativas"
      ],
      outputs: [
        "Concepto de operación validado (documento de 5-10 páginas)",
        "Prototipo de feasibility (código descartable)",
        "Risk register con top 10 riesgos y estrategias de mitigación",
        "Plan detallado para Ciclo 2"
      ],
      deliverables: [
        {
          name: "Concept of Operations Document",
          template: "tpl-001",
          required: true,
          reviewedBy: ["Product Owner", "Technical Lead", "Risk Manager"]
        },
        {
          name: "Feasibility Prototype (throw-away code)",
          template: null,
          required: true,
          reviewedBy: ["Technical Lead", "Arquitecto"]
        },
        {
          name: "Risk Register (top 10 riesgos críticos)",
          template: "tpl-014",
          required: true,
          reviewedBy: ["Risk Manager", "Product Owner"]
        }
      ],
      gate: {
        name: "Concept Feasibility Gate",
        criteria: [
          "Al menos 1 alternativa de solución es técnicamente viable (demostrada por prototipo)",
          "Riesgos críticos tienen estrategias de mitigación definidas",
          "Business case positivo (ROI esperado >20%)",
          "Stakeholders aprueban concepto de operación",
          "Presupuesto suficiente para Ciclo 2 (Requirements)"
        ],
        decision: "GO / NO-GO / PIVOT (cambiar concepto)"
      },
      keyStakeholders: ["Product Owner", "Risk Manager", "Technical Lead", "Business Sponsor"]
    },
    {
      id: "phase-spiral-cycle2",
      name: "Ciclo 2: Requirements Specification",
      order: 2,
      description: "Refinamiento de requisitos mediante prototipo evolutivo. Mitiga riesgos de malentendidos de stakeholders y volatilidad de requisitos.",
      duration: "6-8 semanas",
      activities: [
        "SECTOR 1 - Determinar Objetivos: Refinar requisitos funcionales y no funcionales. Priorizar features (MoSCoW). Identificar casos de uso críticos (20% que entregan 80% valor)",
        "SECTOR 2 - Analizar Riesgos: Evaluar riesgos de requisitos (ambigüedad, conflictos entre stakeholders, volatilidad). Risk assessment de features complejos. Priorizar requisitos de alto riesgo para validación temprana",
        "SECTOR 3 - Desarrollo: Crear prototipo UI/UX evolutivo (low-code, mockups interactivos). Validar usabilidad con usuarios reales (5-10 sesiones). Refinar requisitos basados en feedback",
        "SECTOR 4 - Planificar Siguiente Ciclo: Baseline de requisitos aprobados. Decidir GO/NO-GO para Ciclo 3 (Design & Implementation). Planificar arquitectura y tecnologías"
      ],
      inputs: [
        "Concept of Operations aprobado (Ciclo 1)",
        "Risk register actualizado",
        "Lista de stakeholders y sus prioridades de features"
      ],
      outputs: [
        "Especificación de requisitos (SRS) con casos de uso priorizados",
        "Prototipo UI/UX evolutivo (puede convertirse en producto final)",
        "Risk register actualizado con riesgos de requisitos mitigados",
        "Plan de arquitectura inicial"
      ],
      deliverables: [
        {
          name: "Software Requirements Specification (SRS)",
          template: "tpl-002",
          required: true,
          reviewedBy: ["Product Owner", "Business Analyst", "UX Lead"]
        },
        {
          name: "UI/UX Prototype (evolutivo, no throw-away)",
          template: null,
          required: true,
          reviewedBy: ["UX Lead", "Product Owner", "Sample Users"]
        },
        {
          name: "Risk Register Updated (requisitos validados)",
          template: "tpl-014",
          required: true,
          reviewedBy: ["Risk Manager"]
        }
      ],
      gate: {
        name: "Requirements Validation Gate",
        criteria: [
          "90%+ de stakeholders aprueban prototipo UI/UX",
          "Requisitos críticos validados con usuarios reales (>80% satisfacción)",
          "Riesgos de requisitos reducidos a nivel aceptable (MEDIUM o menor)",
          "Features priorizadas con MoSCoW (Must/Should/Could/Won't)",
          "Arquitectura inicial factible según Technical Lead"
        ],
        decision: "GO / REFINE REQUIREMENTS / NO-GO"
      },
      keyStakeholders: ["Product Owner", "Business Analyst", "UX Lead", "Sample Users", "Risk Manager"]
    },
    {
      id: "phase-spiral-cycle3",
      name: "Ciclo 3: Design & Implementation",
      order: 3,
      description: "Desarrollo del sistema operacional con arquitectura robusta. Mitiga riesgos técnicos de integración, performance y escalabilidad.",
      duration: "8-12 semanas",
      activities: [
        "SECTOR 1 - Determinar Objetivos: Diseñar arquitectura detallada (capas, componentes, APIs). Definir objetivos de calidad (performance, seguridad, escalabilidad). Seleccionar tecnologías y frameworks",
        "SECTOR 2 - Analizar Riesgos: Identificar riesgos técnicos (integración de sistemas legacy, performance bajo carga, vulnerabilidades de seguridad). Crear POCs para componentes de alto riesgo",
        "SECTOR 3 - Desarrollo: Implementar sistema operacional con tests automatizados (unit, integration, E2E). Code reviews y CI/CD pipeline. Testing de performance y seguridad",
        "SECTOR 4 - Planificar Siguiente Ciclo: Validar sistema con beta testers (20-50 usuarios). Recoger métricas de uso y bugs. Planificar Ciclo 4 (Acceptance & Deployment) con enfoque en riesgos operacionales"
      ],
      inputs: [
        "SRS aprobado (Ciclo 2)",
        "Prototipo UI/UX como base de frontend",
        "Risk register con riesgos técnicos priorizados"
      ],
      outputs: [
        "Sistema operacional completo (código production-ready)",
        "Arquitectura documentada (diagramas C4, ADRs)",
        "Test suite automatizado (>80% coverage)",
        "Reportes de beta testing con métricas de uso"
      ],
      deliverables: [
        {
          name: "Sistema Operacional (beta release)",
          template: null,
          required: true,
          reviewedBy: ["Technical Lead", "QA Lead", "Security Engineer"]
        },
        {
          name: "Documentación de Arquitectura (C4 + ADRs)",
          template: "tpl-004",
          required: true,
          reviewedBy: ["Arquitecto", "Technical Lead"]
        },
        {
          name: "Test Suite Automatizado (CI/CD integrado)",
          template: null,
          required: true,
          reviewedBy: ["QA Lead", "DevOps"]
        },
        {
          name: "Beta Testing Report (50+ usuarios)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["Product Owner", "QA Lead"]
        }
      ],
      gate: {
        name: "System Readiness Gate",
        criteria: [
          "Todos los requisitos MUST implementados y validados",
          "Test coverage >80% con zero bugs críticos",
          "Performance cumple SLOs (latency <200ms p95, throughput >1000 req/s)",
          "Security audit aprobado (zero vulnerabilidades HIGH/CRITICAL)",
          "Beta testers reportan >85% satisfacción general"
        ],
        decision: "GO TO PRODUCTION / FIX CRITICAL ISSUES / ITERATE"
      },
      keyStakeholders: ["Technical Lead", "Arquitecto", "QA Lead", "Security Engineer", "Beta Testers"]
    },
    {
      id: "phase-spiral-cycle4",
      name: "Ciclo 4: Acceptance & Deployment",
      order: 4,
      description: "Despliegue a producción con validación de usuarios reales. Mitiga riesgos operacionales (downtime, data loss, user adoption).",
      duration: "4-6 semanas",
      activities: [
        "SECTOR 1 - Determinar Objetivos: Definir criterios de aceptación de producción (uptime >99.9%, zero data loss). Planificar rollout strategy (canary, blue-green). Establecer SLOs y SLIs",
        "SECTOR 2 - Analizar Riesgos: Identificar riesgos operacionales (downtime durante deploy, data migration failures, baja adopción de usuarios). Crear runbooks de incident response y rollback",
        "SECTOR 3 - Deployment: Despliegue gradual (5% → 25% → 100% usuarios). Monitoreo continuo de métricas (errors, latency, business KPIs). Soporte 24/7 durante primeras 2 semanas",
        "SECTOR 4 - Planificar Siguiente Ciclo: Recoger feedback post-deployment (NPS, support tickets, analytics). Identificar mejoras para siguiente versión. Decidir si iterar (nuevo Ciclo 1 para features adicionales) o cerrar proyecto"
      ],
      inputs: [
        "Sistema validado en beta (Ciclo 3)",
        "Risk register con riesgos operacionales",
        "Plan de deployment y rollback"
      ],
      outputs: [
        "Sistema en producción con 100% usuarios activos",
        "Documentación operacional (runbooks, playbooks)",
        "Métricas de adopción y satisfacción (NPS, CSAT)",
        "Lecciones aprendidas y backlog de mejoras"
      ],
      deliverables: [
        {
          name: "Sistema en Producción (100% rollout)",
          template: null,
          required: true,
          reviewedBy: ["DevOps Lead", "SRE", "Product Owner"]
        },
        {
          name: "Operational Runbooks (incident response, rollback)",
          template: "tpl-006",
          required: true,
          reviewedBy: ["SRE", "DevOps Lead"]
        },
        {
          name: "Post-Deployment Report (métricas de adopción, NPS)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["Product Owner", "Business Sponsor"]
        },
        {
          name: "Lessons Learned & Backlog de Mejoras",
          template: "tpl-015",
          required: true,
          reviewedBy: ["Product Owner", "Technical Lead", "Risk Manager"]
        }
      ],
      gate: {
        name: "Production Success Gate",
        criteria: [
          "Sistema cumple SLOs (uptime >99.9%, latency <200ms p95)",
          "Zero incidentes críticos en primeras 2 semanas",
          "Adopción de usuarios >80% del target",
          "NPS >40 (satisfacción de usuarios)",
          "Business KPIs cumplen objetivos (conversión, revenue, etc.)"
        ],
        decision: "PROJECT SUCCESS / ITERATE (nuevo ciclo) / ROLLBACK"
      },
      keyStakeholders: ["DevOps Lead", "SRE", "Product Owner", "Support Team", "Business Sponsor"]
    }
  ],
  whenToUse: [
    "Proyectos con alta incertidumbre técnica (tecnologías nuevas, integraciones complejas)",
    "Requisitos volátiles o poco claros al inicio (exploración de producto, nuevos mercados)",
    "Alto riesgo de falla costosa (sistemas críticos, inversiones grandes >$500K)",
    "Stakeholders requieren validación continua (demostrar progreso con prototipos)",
    "Proyectos innovadores donde fallar rápido es más barato que planificar todo upfront",
    "Necesidad de balancear costo vs. reducción de riesgos (presupuesto flexible)",
    "Equipos con experiencia en gestión de riesgos y prototipado rápido",
    "Proyectos de larga duración (>6 meses) con puntos de decisión GO/NO-GO",
    "Desarrollo de productos con alto impacto de UX (prototipado evolutivo crítico)",
    "Contextos donde cancelar temprano es aceptable (fail-fast culture)"
  ],
  whenNotToUse: [
    "Proyectos con requisitos estables y bien conocidos (mejor usar Cascada o Incremental)",
    "Presupuesto fijo y timeline rígido (Spiral requiere flexibilidad para iterar)",
    "Equipos sin experiencia en análisis de riesgos (overhead de gestión de riesgos es alto)",
    "Proyectos pequeños (<3 meses) donde overhead de 4 sectores por ciclo no justifica",
    "Stakeholders no disponibles para revisiones frecuentes de prototipos",
    "Organizaciones risk-averse que no toleran prototipado throw-away (desperdicio percibido)",
    "Proyectos con compliance estricto que requiere documentación exhaustiva upfront (mejor RUP)",
    "Equipos distribuidos sin cultura de colaboración (Spiral requiere comunicación intensiva)",
    "Desarrollo de productos commoditizados sin innovación (overhead innecesario)",
    "Contextos donde el costo de prototipado es prohibitivo (hardware especializado, infraestructura costosa)"
  ],
  advantages: [
    "Reducción temprana de riesgos técnicos y de negocio mediante prototipos",
    "Fail-fast: cancelar proyectos inviables antes de inversión masiva (ahorro de costos)",
    "Flexibilidad para cambios de requisitos basados en feedback de prototipos",
    "Validación continua con stakeholders reduce riesgo de rechazo final",
    "Gestión sistemática de riesgos (risk register, análisis probabilidad × impacto)",
    "Puntos de decisión GO/NO-GO permiten ajustes estratégicos en cada ciclo",
    "Prototipado evolutivo mejora calidad de UX (usuarios validan antes de implementación final)",
    "Adecuado para proyectos complejos con múltiples alternativas de solución",
    "Combina beneficios de Cascada (estructura) con Incremental (iteración)",
    "Documentación de lecciones aprendidas mejora procesos futuros"
  ],
  disadvantages: [
    "Alto overhead de gestión: requiere Risk Manager dedicado y revisiones frecuentes",
    "Costoso en tiempo y dinero: prototipado throw-away puede verse como desperdicio",
    "Requiere stakeholders altamente disponibles para revisiones de cada ciclo",
    "Complejidad de planificación: difícil estimar timelines y presupuesto total upfront",
    "Equipos necesitan skills especializados en análisis de riesgos y prototipado rápido",
    "No apto para proyectos pequeños: overhead no justifica para <3 meses duración",
    "Riesgo de analysis paralysis: equipos pueden sobre-analizar riesgos sin avanzar",
    "Difícil de integrar con procesos de adquisición tradicionales (contratos de scope fijo)",
    "Prototipado continuo puede generar expectativas irreales de velocidad de desarrollo",
    "Métricas de progreso ambiguas: difícil medir avance entre ciclos (no es % de features completas)"
  ],
  iterationStrategy: "Cada ciclo del Espiral (4-12 semanas) atraviesa 4 sectores obligatorios: 1) Determinar Objetivos, 2) Analizar Riesgos, 3) Desarrollo (prototipo o sistema), 4) Planificar Siguiente Ciclo. Ciclos posteriores refinan entregables: Ciclo 1 produce concepto + prototipo throw-away, Ciclo 2 produce SRS + prototipo evolutivo, Ciclo 3 produce sistema operacional, Ciclo 4 produce sistema en producción. Cada ciclo termina con decisión GO/NO-GO basada en riesgos residuales. Feedback de prototipos guía refinamiento de requisitos y arquitectura en ciclos subsecuentes.",
  changeManagement: {
    description: "Gestión de cambios orientada a riesgos con evaluación de impacto en cada ciclo",
    steps: [
      {
        step: 1,
        name: "Captura de Cambio Solicitado",
        description: "Stakeholder registra cambio en Risk Register con justificación de negocio y riesgos percibidos"
      },
      {
        step: 2,
        name: "Análisis de Riesgos del Cambio",
        description: "Risk Manager evalúa impacto del cambio: probabilidad de éxito, costo, impacto en timeline, riesgos técnicos introducidos"
      },
      {
        step: 3,
        name: "Priorización en Backlog de Ciclo",
        description: "Product Owner + Risk Manager priorizan cambio contra otros riesgos. Cambios de alto riesgo se validan con prototipo en siguiente ciclo"
      },
      {
        step: 4,
        name: "Prototipado de Cambio (si aplica)",
        description: "En Sector 3 (Desarrollo) del siguiente ciclo, crear prototipo que valide viabilidad del cambio solicitado"
      },
      {
        step: 5,
        name: "Decisión GO/NO-GO del Cambio",
        description: "En Sector 4 (Planificar), decidir si integrar cambio basado en resultados de prototipo y análisis costo-beneficio"
      },
      {
        step: 6,
        name: "Actualización de Documentación",
        description: "Si cambio aprobado, actualizar SRS, arquitectura, risk register y plan de siguiente ciclo"
      }
    ]
  },
  tooling: [
    {
      category: "Risk Management",
      tools: [
        "Risk Register (Excel, Jira Risk Management, RiskWatch)",
        "Risk Matrix (probabilidad × impacto con heatmap)",
        "Monte Carlo Simulation para estimación de costos y timelines"
      ]
    },
    {
      category: "Prototyping",
      tools: [
        "Figma, Sketch, Adobe XD (UI/UX mockups evolutivos)",
        "Low-code platforms (OutSystems, Mendix) para prototipado rápido",
        "Jupyter Notebooks, Google Colab (prototipos de algoritmos ML/analytics)"
      ]
    },
    {
      category: "Collaboration",
      tools: [
        "Miro, Mural (workshops de análisis de riesgos con stakeholders)",
        "Confluence (documentación de decisiones GO/NO-GO)",
        "Slack, Teams (comunicación continua con stakeholders)"
      ]
    },
    {
      category: "Development",
      tools: [
        "Git (versionado de prototipos y código evolutivo)",
        "CI/CD (GitHub Actions, GitLab CI) para validación continua",
        "Monitoring (Datadog, New Relic) para métricas de producción en Ciclo 4"
      ]
    }
  ],
  references: [
    {
      title: "A Spiral Model of Software Development and Enhancement",
      author: "Barry Boehm",
      year: 1988,
      source: "IEEE Computer, Vol. 21, No. 5",
      url: "https://dl.acm.org/doi/10.1145/35043.35044"
    },
    {
      title: "Software Engineering: A Practitioner's Approach (Chapter 2)",
      author: "Roger Pressman",
      year: 2014,
      source: "McGraw-Hill Education"
    },
    {
      title: "Software Engineering (10th Edition) - Chapter 2.1.3: Spiral Model",
      author: "Ian Sommerville",
      year: 2015,
      source: "Pearson"
    }
  ]
};

// Actualizar rec-003
data.recommendations['rec-003'].process = newProcess;

// Guardar
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');

console.log('✅ rec-003 enriquecido exitosamente con Modelo Espiral (4 ciclos risk-driven)');
console.log(`   - Type: ${newProcess.type}`);
console.log(`   - Phases: ${newProcess.phases.length} ciclos`);
console.log(`   - whenToUse: ${newProcess.whenToUse.length} criterios`);
console.log(`   - advantages: ${newProcess.advantages.length} puntos`);
console.log('   - changeManagement: 6 pasos orientados a riesgos');
