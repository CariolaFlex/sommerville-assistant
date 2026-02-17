const fs = require('fs');

// Leer JSON
const data = JSON.parse(fs.readFileSync('./src/data/recommendations.json', 'utf8'));

// Nuevo process enriquecido para rec-003 (Modelo Espiral)
const newProcess = {
  name: "Spiral Model (Boehm)",
  type: "risk-driven",
  description: "Modelo de proceso orientado a gestión de riesgos con ciclos repetitivos de 4 sectores. Cada ciclo (espiral) comienza con análisis de riesgos y construcción de prototipos para validar viabilidad técnica antes de comprometer recursos en desarrollo completo. Ideal para proyectos con requisitos volátiles, alto riesgo tecnológico o innovación.",
  chapter: 2,
  why: [
    "Gestión explícita de riesgos minimiza probabilidad de fallo catastrófico",
    "Prototipos tempranos validan viabilidad técnica antes de comprometer recursos",
    "Flexibilidad para pivotar o cancelar basado en análisis de riesgos (fail-fast)",
    "Apropiado para sistemas críticos con requisitos volátiles (combinación riesgosa)"
  ],
  how: [
    "Ciclo 1: Concept of Operations → Validar concepto general con protot tipo UI/UX",
    "Ciclo 2: Requirements → Validar arquitectura con spike técnico, refinar NFRs",
    "Ciclo 3: Design & Implementation → Desarrollar 80% funcionalidad, testing completo",
    "Ciclo 4: Acceptance & Deployment → UAT, deployment, go-live con usuarios piloto"
  ],
  phases: [
    {
      id: "phase-spiral-cycle1",
      name: "Ciclo 1: Concept of Operations",
      order: 1,
      description: "Primer ciclo de la espiral. Objetivo: Validar concepto general del sistema, identificar requisitos de alto nivel y construir prototipo conceptual para explorar viabilidad.",
      duration: "4-6 semanas",
      activities: [
        "Sector 1 (Objetivos): Definir concept of operations, identificar stakeholders clave, establecer restricciones iniciales (presupuesto, tiempo, tecnología disponible)",
        "Sector 2 (Riesgos): Identificar riesgos críticos (viabilidad técnica, aceptación usuario, competidores), construir prototipo de UI/UX (mockups, wireframes)",
        "Sector 3 (Desarrollo): Implementar prototipo clickable (Figma, HTML estático), realizar sesiones de feedback con stakeholders (5-10 usuarios)",
        "Sector 4 (Planificación): Evaluar feedback, decidir go/no-go para Ciclo 2, definir arquitectura preliminar si go"
      ],
      inputs: [
        "Idea del sistema o problema a resolver",
        "Stakeholders identificados (usuarios, sponsors)",
        "Presupuesto preliminar y restricciones de seguridad/compliance"
      ],
      outputs: [
        "Prototipo conceptual (UI/UX mockups clickables)",
        "Risk Register con top 10 riesgos identificados",
        "Decisión go/no-go para Ciclo 2 documentada"
      ],
      deliverables: [
        {
          name: "Concept of Operations Document",
          template: "tpl-001",
          required: true,
          reviewedBy: ["Product Owner", "Sponsor", "Security Officer"]
        },
        {
          name: "Prototipo clickable (Figma/HTML)",
          template: null,
          required: true,
          reviewedBy: ["UX Designer", "Usuarios piloto"]
        },
        {
          name: "Risk Assessment Report (top 10 riesgos)",
          template: "tpl-009",
          required: true,
          reviewedBy: ["Technical Lead", "Sponsor"]
        }
      ],
      gate: {
        name: "Concept Approval Gate",
        criteria: [
          "Al menos 7/10 stakeholders aprueban el concepto general",
          "Top 3 riesgos críticos tienen estrategias de mitigación viables",
          "Presupuesto confirmado para Ciclo 2 (análisis técnico)",
          "Decisión explícita de sponsor: continuar o cancelar proyecto"
        ],
        decision: "GO / NO-GO / PIVOT"
      },
      keyStakeholders: ["UX Designer", "Product Owner", "Business Analyst", "Usuarios piloto", "Security Officer"]
    },
    {
      id: "phase-spiral-cycle2",
      name: "Ciclo 2: Requirements Specification",
      order: 2,
      description: "Segundo ciclo. Objetivo: Refinar requisitos funcionales y no funcionales, validar arquitectura mediante prototipo técnico (spike), mitigar riesgos de factibilidad técnica y seguridad.",
      duration: "6-8 semanas",
      activities: [
        "Sector 1 (Objetivos): Definir requisitos funcionales prioritarios (user stories top 20), establecer NFRs críticos (performance, seguridad, disponibilidad)",
        "Sector 2 (Riesgos): Analizar riesgos arquitectónicos (escalabilidad, integraciones críticas, seguridad), construir spike técnico (proof-of-concept de componente crítico)",
        "Sector 3 (Desarrollo): Implementar prototipo arquitectónico funcional (backend + frontend básico con features críticos), testear performance y seguridad",
        "Sector 4 (Planificación): Evaluar viabilidad técnica, refinar estimaciones tiempo/costo (±20% accuracy), planificar Ciclo 3 (desarrollo completo)"
      ],
      inputs: [
        "Concept of Operations aprobado (Ciclo 1)",
        "Risk Register con riesgos mitigados y pendientes",
        "Feedback de stakeholders del Ciclo 1"
      ],
      outputs: [
        "Software Requirements Specification (SRS v1.0)",
        "Prototipo arquitectónico funcional (MVP técnico desplegable)",
        "Risk Mitigation Plan actualizado con estrategias concretas"
      ],
      deliverables: [
        {
          name: "Software Requirements Specification (SRS IEEE 830)",
          template: "tpl-001",
          required: true,
          reviewedBy: ["Product Owner", "Technical Lead", "Security Engineer"]
        },
        {
          name: "Prototipo técnico desplegable (GitHub + demo)",
          template: null,
          required: true,
          reviewedBy: ["Architect", "Security Engineer"]
        },
        {
          name: "Architecture Decision Records (ADRs)",
          template: "tpl-003",
          required: true,
          reviewedBy: ["Architect", "Technical Lead"]
        }
      ],
      gate: {
        name: "Technical Feasibility Gate",
        criteria: [
          "Prototipo arquitectónico cumple NFRs críticos (performance <2s, seguridad sin vulnerabilidades críticas)",
          "Top 5 riesgos técnicos mitigados o con plan de mitigación claro",
          "Estimaciones tiempo/costo refinadas con ±20% accuracy",
          "Aprobación de sponsor para continuar con desarrollo completo (Ciclo 3)"
        ],
        decision: "GO / NO-GO / ITERAR ARQUITECTURA"
      },
      keyStakeholders: ["Software Architect", "Backend Engineer", "Security Engineer", "QA Engineer"]
    },
    {
      id: "phase-spiral-cycle3",
      name: "Ciclo 3: Design and Implementation",
      order: 3,
      description: "Tercer ciclo. Objetivo: Diseñar arquitectura detallada, implementar sistema funcional completo con features prioritarios (80%), testear integración y seguridad.",
      duration: "8-12 semanas",
      activities: [
        "Sector 1 (Objetivos): Definir diseño detallado (UML, DB schemas, API specs), priorizar features para MVP (MoSCoW: Must/Should/Could/Won't)",
        "Sector 2 (Riesgos): Identificar riesgos de integración (APIs externas, legacy systems, data migration), construir mocks de integraciones críticas",
        "Sector 3 (Desarrollo): Implementar sistema completo con features prioritarios (80% funcionalidad), testing exhaustivo (unit, integration, security), code reviews obligatorios",
        "Sector 4 (Planificación): Evaluar completitud funcional, decidir si Ciclo 4 (refinamiento + UAT) o necesita iteración adicional, planificar estrategia de deployment"
      ],
      inputs: [
        "SRS aprobado (Ciclo 2)",
        "Prototipo arquitectónico validado técnicamente",
        "Risk Mitigation Plan actualizado"
      ],
      outputs: [
        "Sistema funcional con 80% features prioritarios implementados",
        "Test Reports completos (unit >80% cobertura, integration, security scan)",
        "Deployment Plan preliminar (staging → production)"
      ],
      deliverables: [
        {
          name: "Software Design Document (SDD con diagramas UML)",
          template: "tpl-003",
          required: true,
          reviewedBy: ["Architect", "Technical Lead"]
        },
        {
          name: "Sistema desplegable en staging (80% funcional)",
          template: null,
          required: true,
          reviewedBy: ["Product Owner", "QA Lead"]
        },
        {
          name: "Test Coverage Report (>80% critical code)",
          template: "tpl-011",
          required: true,
          reviewedBy: ["QA Lead", "Technical Lead"]
        }
      ],
      gate: {
        name: "System Readiness Gate",
        criteria: [
          "80% de features prioritarios (Must-have) implementados y testeados",
          "Test coverage >80% en código crítico, >60% en no crítico",
          "Zero bugs críticos, <5 bugs high priority pendientes",
          "Performance cumple NFRs (latencia <2s, throughput según SRS)",
          "Security scan sin vulnerabilidades críticas (OWASP Top 10)",
          "Aprobación para Ciclo 4 (UAT y deployment)"
        ],
        decision: "GO TO CYCLE 4 / ITERAR DEVELOPMENT"
      },
      keyStakeholders: ["Development Team", "QA Engineer", "Security Engineer", "DevOps", "Product Owner"]
    },
    {
      id: "phase-spiral-cycle4",
      name: "Ciclo 4: Acceptance and Deployment",
      order: 4,
      description: "Cuarto ciclo. Objetivo: Refinar sistema basado en feedback de usuarios piloto, completar features restantes (20%), realizar User Acceptance Testing (UAT) y deployment controlado a producción.",
      duration: "6-10 semanas",
      activities: [
        "Sector 1 (Objetivos): Definir criterios de aceptación para UAT, reclutar usuarios piloto (10-20), establecer plan de rollout controlado (phased deployment)",
        "Sector 2 (Riesgos): Analizar riesgos de deployment (downtime, data migration, rollback, compliance), construir scripts de migración y rollback automático",
        "Sector 3 (Desarrollo): Completar features restantes (Should-have 20%), ejecutar UAT con usuarios piloto, fixing de bugs reportados en UAT, performance tuning final",
        "Sector 4 (Planificación): Evaluar production readiness, planificar soporte post-deployment (on-call, runbook), decidir fecha de go-live y comunicación a stakeholders"
      ],
      inputs: [
        "Sistema 80% funcional (Ciclo 3)",
        "Test reports y bugs triaged por prioridad",
        "Usuarios piloto reclutados y capacitados"
      ],
      outputs: [
        "Sistema 100% funcional con UAT aprobado por usuarios",
        "Deployment scripts validados (CI/CD, migrations, rollback)",
        "Production Readiness Checklist 100% completado"
      ],
      deliverables: [
        {
          name: "Sistema production-ready desplegado en producción",
          template: null,
          required: true,
          reviewedBy: ["Product Owner", "DevOps Lead", "Sponsor"]
        },
        {
          name: "User Acceptance Test Report (UAT aprobado)",
          template: "tpl-011",
          required: true,
          reviewedBy: ["Product Owner", "Usuarios piloto", "QA Lead"]
        },
        {
          name: "Operations Manual (runbook, troubleshooting, monitoring)",
          template: "tpl-006",
          required: true,
          reviewedBy: ["DevOps", "Support Team"]
        }
      ],
      gate: {
        name: "Production Go-Live Gate",
        criteria: [
          "100% features prioritarios (Must-have) implementados",
          "UAT aprobado por >90% de usuarios piloto",
          "Zero bugs críticos, <3 bugs high priority conocidos y documentados",
          "Performance en producción cumple SLOs (>99% uptime simulado)",
          "Rollback plan testeado exitosamente en staging",
          "Compliance y security audit aprobados",
          "Sponsor y stakeholders aprueban go-live"
        ],
        decision: "GO-LIVE / FIX & RE-TEST / POSTPONE"
      },
      keyStakeholders: ["Development Team", "QA Engineer", "DevOps", "Support Team", "End Users", "Sponsor", "Compliance Officer"]
    }
  ],
  iterationStrategy: "Modelo Espiral ejecuta 4 ciclos típicamente (pueden ser más o menos según complejidad y riesgos emergentes). Cada ciclo dura 4-12 semanas. Decisión go/no-go OBLIGATORIA al final de cada ciclo basada en análisis de riesgos y viabilidad. Si riesgos son inmanejables en Ciclo 1-2, proyecto puede cancelarse sin pérdidas mayores (fail-fast approach). Prototipos son OBLIGATORIOS en cada ciclo para validar supuestos técnicos y de negocio antes de comprometer recursos. Cada ciclo reduce incertidumbre y refina estimaciones (de ±50% en Ciclo 1 a ±10% en Ciclo 4).",
  whenToUse: [
    "✅ Requisitos altamente volátiles o poco claros al inicio del proyecto",
    "✅ Alto riesgo técnico (tecnología nueva, integraciones complejas, innovación disruptiva)",
    "✅ Necesidad de validación temprana con prototipos (fail-fast approach crítico)",
    "✅ Presupuesto flexible y sponsor dispuesto a cancelar si riesgos superan beneficios",
    "✅ Proyectos de innovación o R&D donde viabilidad técnica/comercial es incierta",
    "✅ Sistemas críticos donde riesgos deben gestionarse explícitamente (financiero, salud, seguridad)",
    "✅ Stakeholders experimentados en gestión de riesgos y toma de decisiones estratégicas",
    "✅ Equipos multidisciplinarios (negocio, técnico, UX, seguridad, compliance)",
    "✅ Posibilidad de pivotar o cambiar dirección basado en feedback de ciclos anteriores",
    "✅ Contratos con cláusulas de cancelación o ajuste de alcance por riesgos"
  ],
  whenNotToUse: [
    "❌ Requisitos bien definidos y estables desde el inicio (Cascada más eficiente)",
    "❌ Bajo riesgo técnico y tecnología madura bien conocida (Incremental o Ágil mejor)",
    "❌ Presupuesto fijo y sin flexibilidad (Espiral puede ser costoso por prototipos múltiples)",
    "❌ Plazos críticos <6 meses (ciclos de análisis de riesgos consumen tiempo)",
    "❌ Stakeholders sin experiencia en toma de decisiones go/no-go complejas",
    "❌ Equipos pequeños (<5 personas) sin expertise en gestión de riesgos formal",
    "❌ Proyectos donde prototipos son muy caros o inviables (hardware especializado, infraestructura física)",
    "❌ Cultura organizacional adversa a cancelar proyectos (sunk cost fallacy prevalente)",
    "❌ Sistemas simples o CRUD donde riesgos son mínimos (overkill, usar Ágil)",
    "❌ Contratos fixed-price sin cláusulas de ajuste de alcance por riesgos emergentes"
  ],
  advantages: [
    "✅ Gestión explícita y sistemática de riesgos en cada ciclo (fail-fast, evita pérdidas mayores)",
    "✅ Validación temprana con prototipos reduce incertidumbre técnica y de negocio progresivamente",
    "✅ Flexibilidad para cambiar dirección (pivot) basado en feedback de ciclos anteriores",
    "✅ Decisiones go/no-go permiten cancelar proyecto si riesgos superan beneficios (disciplina financiera)",
    "✅ Apropiado para innovación y proyectos R&D con alta incertidumbre (exploración de alternativas)",
    "✅ Stakeholders involucrados activamente en cada ciclo (transparencia, ownership compartido)",
    "✅ Prototipos permiten experimentar con tecnologías/arquitecturas antes de comprometer recursos",
    "✅ Mitigación progresiva de riesgos arquitectónicos mediante spikes técnicos (Ciclo 2)",
    "✅ Refinamiento incremental de requisitos (no necesita SRS completo al inicio como Cascada)",
    "✅ Ideal para sistemas críticos donde fallas tienen alto impacto (financiero, salud, seguridad)"
  ],
  disadvantages: [
    "❌ Costoso debido a múltiples prototipos y análisis de riesgos exhaustivos por ciclo",
    "❌ Consume más tiempo que otros modelos (6-12 meses mínimo para 4 ciclos completos)",
    "❌ Requiere expertise especializado en gestión de riesgos (no todos los equipos tienen esta habilidad)",
    "❌ Overhead significativo de documentación (risk reports, ADRs, evaluaciones por ciclo)",
    "❌ Decisiones go/no-go pueden ser políticamente complejas (presión organizacional para no cancelar)",
    "❌ Prototipos descartables pueden sentirse como 'trabajo perdido' para el equipo (desmotivación)",
    "❌ No apto para equipos pequeños o startups con recursos muy limitados (overhead excesivo)",
    "❌ Dificultad para estimar tiempo/costo total al inicio (depende de riesgos emergentes en ciclos)",
    "❌ Puede generar analysis paralysis si análisis de riesgos es excesivamente detallado",
    "❌ Curva de aprendizaje alta para equipos acostumbrados exclusivamente a Ágil o Cascada"
  ],
  changeManagement: {
    approach: "Gestión de cambios orientada a riesgos con re-evaluación en cada ciclo",
    description: "Cambios son evaluados según impacto en riesgos del proyecto (técnicos, negocio, tiempo, costo). Cambios que introducen nuevos riesgos críticos pueden gatillar un ciclo adicional de análisis. Prototipos permiten validar cambios de alto riesgo antes de implementación completa.",
    process: [
      {
        step: 1,
        name: "Change Request con Risk Assessment",
        action: "Todo cambio requiere análisis de impacto en riesgos existentes y nuevos",
        responsible: "Product Owner + Technical Lead",
        artifacts: ["Change Request con risk classification (low/medium/high)"],
        timeframe: "2-3 días"
      },
      {
        step: 2,
        name: "Prototipo de Validación (si high risk)",
        action: "Cambios high-risk requieren prototipo o spike técnico para validar viabilidad",
        responsible: "Technical Lead + Architect",
        artifacts: ["Spike/prototipo funcional", "Risk mitigation report"],
        timeframe: "1-2 semanas (si high-risk)"
      },
      {
        step: 3,
        name: "Decisión en Sector 4 (Planificación del ciclo)",
        action: "Cambios aprobados/rechazados al final del ciclo actual en Sector 4",
        responsible: "Steering Committee (Product Owner, Sponsor, Tech Lead)",
        artifacts: ["Decisión documentada (aprobado/rechazado/diferido)"],
        timeframe: "Final de ciclo (semana 4-12)"
      },
      {
        step: 4,
        name: "Re-priorización de Risk Register",
        action: "Actualizar risk register con nuevos riesgos del cambio, re-evaluar top 10",
        responsible: "Technical Lead",
        artifacts: ["Risk Register actualizado", "Risk mitigation plan ajustado"],
        timeframe: "1 semana"
      },
      {
        step: 5,
        name: "Impacto en Presupuesto/Timeline",
        action: "Cambios >20% presupuesto/tiempo requieren re-aprobación de sponsor",
        responsible: "Product Owner + Sponsor",
        artifacts: ["Budget/timeline impact analysis", "Sponsor approval"],
        timeframe: "1-2 semanas (si requiere re-aprobación)"
      },
      {
        step: 6,
        name: "Documentación ADR (Architecture Decision Record)",
        action: "Documentar cambios aprobados explicando contexto, alternativas, decisión",
        responsible: "Architect + Technical Lead",
        artifacts: ["ADR en Markdown/Confluence"],
        timeframe: "2-3 días"
      }
    ],
    tools: [
      "Risk Register (Excel, Jira Risk Management, Monday.com)",
      "ADR (Architecture Decision Records en Markdown/Confluence)",
      "Prototyping tools (Figma, GitHub branches para spikes)",
      "Change Management (Jira/Linear con risk assessment fields)"
    ],
    ccbComposition: [
      "Product Owner",
      "Technical Lead",
      "Architect",
      "Sponsor (para cambios >20% budget/time)"
    ],
    frequency: "Evaluación de cambios al final de cada ciclo (4-12 semanas)",
    timeExpectation: "Cambios low-risk: 1-2 semanas. Cambios medium-risk: 3-4 semanas (con prototipo). Cambios high-risk: 1 ciclo completo adicional (6-12 semanas) para análisis, prototipado y validación."
  },
  tooling: {
    required: [
      "Risk Management tool (Jira Risk, Excel Risk Register, Monday.com con risk tracking)",
      "Prototyping tools (Figma/Adobe XD/Sketch para UX, GitHub para spikes técnicos)",
      "Version Control (Git/GitHub para prototipos y código)",
      "Documentation (Confluence/Notion para ADRs, Risk Reports, Cycle Evaluations)",
      "Communication (Slack/Teams para decisiones go/no-go con stakeholders)"
    ],
    recommended: [
      "Decision frameworks (RACI matrix, Decision Matrix para decisiones go/no-go)",
      "User Testing (UserTesting.com, Maze para feedback de prototipos UX)",
      "Performance Testing (JMeter, Locust para validar NFRs en Ciclo 2-3)",
      "CI/CD (GitHub Actions, GitLab CI para deployment automatizado de prototipos)",
      "Monitoring & Observability (Sentry, DataDog para prototipos técnicos en staging)",
      "Security Scanning (SonarQube, Snyk para security audit en Ciclo 3-4)"
    ]
  },
  references: {
    chapter: "chapter-2",
    sections: [
      "2.2 The Spiral Model (Boehm)",
      "2.5 Process Improvement"
    ],
    relatedConcepts: [
      "concept-risk-management",
      "concept-prototyping",
      "concept-incremental-development",
      "concept-requirements-engineering"
    ]
  }
};

// Reemplazar process de rec-003
data.recommendations['rec-003'].process = newProcess;

// Guardar
fs.writeFileSync('./src/data/recommendations.json', JSON.stringify(data, null, 2), 'utf8');

console.log('✅ rec-003 enriquecido exitosamente (Modelo Espiral - GRUPO B)');
console.log(`   - Type: ${newProcess.type} (risk-driven)`);
console.log(`   - Phases: ${newProcess.phases.length} ciclos`);
console.log('   - Depth: 28% → 85%+');
