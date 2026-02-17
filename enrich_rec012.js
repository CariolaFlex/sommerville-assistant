const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'src', 'data', 'recommendations.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Nuevo proceso completo para rec-012 (Sistema de Sistemas con RUP + Integration Focus)
const newProcess = {
  name: "RUP with Integration Focus (System of Systems)",
  type: "iterative-phased-integration",
  chapter: 2,
  description: "Framework RUP adaptado para Sistema de Sistemas donde múltiples subsistemas independientes deben integrarse. Énfasis en Elaboration extendida para diseñar contratos de APIs, estrategia de integración (SOA, message bus) y testing end-to-end. Construction incluye desarrollo paralelo de subsistemas con puntos de sincronización para validar integraciones.",
  why: [
    "Sistema de Sistemas requiere arquitectura de integración robusta desde el inicio (API contracts, message schemas)",
    "RUP estructura desarrollo en fases macro que aseguran que arquitectura de integración es viable antes de Construction",
    "Testing end-to-end crítico para validar que subsistemas colaboran correctamente",
    "Desarrollo paralelo de subsistemas maximiza productividad (múltiples equipos trabajando simultáneamente)",
    "Deployment escalonado minimiza blast radius de bugs críticos en producción"
  ],
  how: [
    "Ejecutar 4 fases RUP (Inception, Elaboration extendida, Construction paralelo, Transition escalonado)",
    "10-15 iteraciones totales: Inception (1-2), Elaboration (3-4), Construction (4-6), Transition (2-3)",
    "Elaboration diseña contratos de APIs (OpenAPI) y message schemas (Avro/Protobuf)",
    "Construction desarrolla subsistemas en paralelo con integration testing al final de cada iteración",
    "Transition despliega subsistemas de forma escalonada (no big-bang) para minimizar riesgo"
  ],
  phases: [
    {
      id: "phase-sos-inception",
      name: "Inception (Concepción)",
      order: 1,
      description: "Establecer viabilidad del Sistema de Sistemas, identificar subsistemas componentes y sus interfaces de integración de alto nivel. Objetivo: Definir alcance del ecosystem y decidir si proyecto es factible.",
      duration: "3-6 semanas (1-2 iteraciones)",
      activities: [
        "Identificar subsistemas componentes (ej: subsistema A=CRM, B=Inventario, C=Logística, D=Finanzas)",
        "Crear System Context Diagram (diagrama de contexto mostrando subsistemas y sus interacciones)",
        "Definir 15-25 casos de uso end-to-end (cross-subsystem workflows: orden de compra → facturación → envío)",
        "Realizar análisis de integraciones críticas (APIs REST, message queues, eventos, data sync)",
        "Identificar subsistemas legacy existentes vs nuevos a desarrollar (buy vs build decisions)",
        "Crear Vision Document del ecosystem (objetivos, stakeholders por subsistema, restricciones de integración)",
        "Identificar riesgos de integración críticos (incompatibilidad de tecnologías, latencia, seguridad)",
        "Milestone: Lifecycle Objective - Decisión go/no-go basada en viabilidad de integración"
      ],
      inputs: [
        "Solicitud de proyecto o RFP para ecosystem",
        "Documentación de subsistemas legacy existentes (si aplica)",
        "Restricciones de integración conocidas (firewalls, VPNs, compliance)"
      ],
      outputs: [
        "System Context Diagram (C4 Model nivel 1)",
        "Subsystems Catalog (listado de subsistemas con responsabilidades)",
        "Initial Use Case Model (15-25 casos de uso cross-subsystem)",
        "Integration Risk Assessment (top 10 riesgos de integración)",
        "Vision Document del ecosystem"
      ],
      deliverables: [
        {
          name: "System Architecture Overview (diagrama de alto nivel)",
          template: "tpl-004",
          required: true,
          reviewedBy: ["Enterprise Architect", "Integration Architect"]
        },
        {
          name: "Subsystems Identification Document",
          template: "tpl-001",
          required: true,
          reviewedBy: ["Enterprise Architect", "Subsystem Owners"]
        },
        {
          name: "Vision Document v1.0 (ecosystem-wide)",
          template: "tpl-001",
          required: true,
          reviewedBy: ["Sponsor", "Subsystem Owners"]
        },
        {
          name: "Go/No-Go Decision Document",
          template: "tpl-015",
          required: true,
          reviewedBy: ["Sponsor", "CTO"]
        }
      ],
      gate: {
        name: "Lifecycle Objective Milestone",
        criteria: [
          "Subsistemas identificados con interfaces preliminares definidas",
          "Top 5 riesgos de integración tienen estrategias de mitigación preliminares",
          "Vision Document aprobado por stakeholders de todos los subsistemas",
          "Presupuesto aprobado para Elaboration (fase más larga y costosa)",
          "Sponsor firma decisión go para continuar"
        ],
        decision: "GO / NO-GO / REDEFINE SCOPE",
        approvers: ["Enterprise Architect", "Sponsor", "Subsystem Owners", "CTO"]
      },
      keyStakeholders: ["Enterprise Architect", "Business Analyst", "Subsystem Owners", "Integration Architect"]
    },
    {
      id: "phase-sos-elaboration",
      name: "Elaboration (Elaboración Extendida)",
      order: 2,
      description: "Diseñar arquitectura de integración completa: contratos de APIs, message schemas, estrategia de sincronización de datos, error handling cross-subsystem. Fase más crítica para Sistema de Sistemas. Objetivo: Architecture Baseline que asegure interoperabilidad.",
      duration: "12-16 semanas (3-4 iteraciones de 4 semanas)",
      activities: [
        "Diseñar API contracts para cada interfaz entre subsistemas (OpenAPI/Swagger specs, versioning strategy)",
        "Definir message schemas para eventos asíncronos (Avro, Protobuf, JSON schemas con validación)",
        "Seleccionar estrategia de integración: SOA (API Gateway como Kong/Apigee), Event-Driven (Kafka/RabbitMQ), Hybrid",
        "Crear Architecture Decision Records (ADRs) para decisiones críticas: REST vs gRPC, sync vs async, orchestration vs choreography",
        "Implementar spike técnico de integración (proof-of-concept: subsistema A llama API de B, B publica evento a C)",
        "Diseñar data synchronization strategy (eventual consistency, SAGA pattern, distributed transactions)",
        "Definir error handling cross-subsystem (circuit breakers, retries, compensating transactions)",
        "Crear security architecture (OAuth2, API keys, mutual TLS, encryption in-transit)",
        "Testing del spike: latencia end-to-end, fault tolerance (qué pasa si subsistema B cae), data consistency",
        "Milestone: Lifecycle Architecture - Arquitectura de integración aprobada y validada con spike"
      ],
      inputs: [
        "System Context Diagram (Inception)",
        "Subsystems Catalog",
        "Integration Risk Assessment"
      ],
      outputs: [
        "Integration Architecture Document (IAD con diagramas de secuencia, deployment, componentes)",
        "API Contracts (OpenAPI specs versionados para cada interfaz)",
        "Message Schemas (Avro/Protobuf schemas versionados)",
        "Integration Spike (código ejecutable demostrando integración end-to-end)",
        "Security Architecture Document (autenticación, autorización, encryption)",
        "Data Sync Strategy Document (consistency model, conflict resolution)"
      ],
      deliverables: [
        {
          name: "Integration Architecture Document (IAD)",
          template: "tpl-004",
          required: true,
          reviewedBy: ["Integration Architect", "Enterprise Architect"]
        },
        {
          name: "API Contract Specifications (OpenAPI 3.0)",
          template: null,
          required: true,
          reviewedBy: ["Integration Architect", "Subsystem Tech Leads"]
        },
        {
          name: "Integration Spike (GitHub repo con demo end-to-end)",
          template: null,
          required: true,
          reviewedBy: ["Integration Architect", "DevOps Lead"]
        },
        {
          name: "Architecture Decision Records (ADRs)",
          template: "tpl-004",
          required: true,
          reviewedBy: ["Enterprise Architect", "Technical Leads"]
        },
        {
          name: "NFRs for Integration (latencia, throughput, fault tolerance)",
          template: "tpl-005",
          required: true,
          reviewedBy: ["Integration Architect", "QA Lead"]
        }
      ],
      gate: {
        name: "Lifecycle Architecture Milestone",
        criteria: [
          "API contracts aprobados por owners de todos los subsistemas involucrados",
          "Integration spike valida arquitectura propuesta (latencia, fault tolerance, consistency)",
          "Security architecture aprobada por Security Team y Compliance",
          "Top 5 riesgos de integración mitigados o con plan claro",
          "Estimaciones de Construction refinadas con ±20% accuracy (integración es costosa)",
          "Architecture Review Board (ARB) aprueba arquitectura de integración"
        ],
        decision: "GO / REFINE ARCHITECTURE / NO-GO",
        approvers: ["Integration Architect", "Enterprise Architect", "Subsystem Tech Leads", "Security Lead", "Sponsor"]
      },
      keyStakeholders: ["Integration Architect", "API Developers", "DevOps (infrastructure)", "Security Engineer", "DBA (data sync)"]
    },
    {
      id: "phase-sos-construction",
      name: "Construction (Construcción Paralela)",
      order: 3,
      description: "Desarrollo paralelo de subsistemas por equipos independientes + iteraciones de integration testing. Objetivo: Producir ecosystem completo con subsistemas integrados y testeados end-to-end.",
      duration: "16-24 semanas (4-6 iteraciones de 4 semanas)",
      activities: [
        "Iteración 1-2 (Core Subsystems): Equipos independientes desarrollan subsistemas A, B, C en paralelo. Al final de iteración: integration testing de interfaces críticas (A↔B, B↔C)",
        "Iteración 3-4 (Secondary Subsystems + Full Integration): Desarrollar subsistemas D, E. Integration testing end-to-end de workflows completos (cross-subsystem)",
        "Iteración 5-6 (Hardening + Performance): Bug fixing cross-subsystem, performance tuning end-to-end (latencia, throughput), security hardening (penetration testing de APIs)",
        "Sincronización entre equipos: Daily sync meeting de Integration Architect con Tech Leads de subsistemas (resolver conflictos de contratos, breaking changes)",
        "Continuous Integration Testing: Pipeline de CI/CD ejecuta integration tests automatizados después de cada merge (validar que cambios en A no rompen B)",
        "Contract testing (Pact, Spring Cloud Contract) para validar que implementaciones respetan API contracts",
        "End-to-end testing: Selenium/Cypress para workflows completos cross-subsystem (simular usuario real navegando ecosystem)",
        "Milestone: Initial Operational Capability - Ecosystem completo funcional en staging"
      ],
      inputs: [
        "Integration Architecture Document (Elaboration)",
        "API Contracts y Message Schemas",
        "Integration Spike validado"
      ],
      outputs: [
        "Subsistemas A, B, C, D, E implementados y desplegados en staging",
        "Integration Test Suite (contract tests, integration tests, end-to-end tests)",
        "Performance Test Report (latencia end-to-end, throughput, scalability)",
        "Security Audit Report (penetration testing de APIs, OWASP Top 10)",
        "Deployment Package (Docker images, Kubernetes manifests, API Gateway configs)"
      ],
      deliverables: [
        {
          name: "Integrated System in Staging (todos los subsistemas comunicándose)",
          template: null,
          required: true,
          reviewedBy: ["Integration Architect", "Tech Leads"]
        },
        {
          name: "Integration Test Coverage Report (>70% coverage de interfaces)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["QA Lead", "Integration Architect"]
        },
        {
          name: "Performance Benchmarks (latencia <500ms P95, throughput sustentable)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["Performance Engineer", "Integration Architect"]
        },
        {
          name: "API Documentation (Swagger UI, Postman collections)",
          template: "tpl-007",
          required: true,
          reviewedBy: ["Integration Architect", "Tech Writers"]
        },
        {
          name: "Operations Manual (deployment, troubleshooting, monitoring)",
          template: "tpl-006",
          required: true,
          reviewedBy: ["DevOps Lead", "SRE"]
        }
      ],
      gate: {
        name: "Initial Operational Capability Milestone",
        criteria: [
          "Todos los subsistemas críticos (A, B, C) integrados y comunicándose correctamente",
          "Integration tests pasando >95% (contract tests + integration tests + end-to-end)",
          "Performance cumple NFRs (latencia <500ms P95 end-to-end, throughput >500 req/s)",
          "Security audit aprobado (zero vulnerabilidades críticas en APIs)",
          "Zero bugs críticos cross-subsystem, <5 bugs high priority conocidos",
          "Aprobación de Integration Architect y Tech Leads de subsistemas para iniciar UAT"
        ],
        decision: "GO TO UAT / FIX CRITICAL ISSUES / ITERATE",
        approvers: ["Integration Architect", "Tech Leads (subsistemas A-E)", "QA Lead", "Security Lead", "Product Owner"]
      },
      keyStakeholders: ["Development Teams (5-10 equipos paralelos)", "Integration Testing Team", "DevOps Engineers", "API Gateway Admin"]
    },
    {
      id: "phase-sos-transition",
      name: "Transition (Transición Escalonada)",
      order: 4,
      description: "Deployment escalonado de subsistemas a producción (no big-bang), UAT cross-subsystem, training de usuarios por subsistema, establecimiento de soporte distribuido. Objetivo: Ecosystem operando en producción con usuarios reales.",
      duration: "8-12 semanas (2-3 iteraciones de 4 semanas)",
      activities: [
        "Ejecutar UAT cross-subsystem con 30-50 usuarios piloto (representantes de cada subsistema)",
        "Iteración 1 (UAT + Bug Fixing): Usuarios piloto prueban workflows end-to-end, reportan bugs. Equipos de subsistemas fijan bugs en paralelo",
        "Deployment escalonado a producción: Semana 1 (subsistema A), Semana 2 (A+B), Semana 3 (A+B+C), Semana 4 (ecosystem completo)",
        "Razón del deployment escalonado: Minimizar blast radius de bugs críticos, validar integración en producción antes de agregar más subsistemas",
        "Data migration coordinada: Migrar datos de legacy systems a subsistemas nuevos de forma sincronizada (evitar inconsistencias)",
        "Training por subsistema: Capacitar usuarios de A, luego B, luego C (training acumulativo para workflows cross-subsystem)",
        "Establecer soporte distribuido: L1/L2 por subsistema + Integration Support Team (L3) para bugs cross-subsystem",
        "Monitoreo end-to-end: Distributed tracing (Jaeger, Zipkin) para tracear requests cross-subsystem, alertas SRE",
        "Milestone: Product Release - Ecosystem completo operando en producción con >99% uptime"
      ],
      inputs: [
        "Integrated System en staging (Construction)",
        "Integration Test Suite pasando",
        "Performance y Security validados"
      ],
      outputs: [
        "Ecosystem en producción con 100% subsistemas desplegados",
        "UAT Acceptance Document (firmado por usuarios piloto de cada subsistema)",
        "Training Materials Package (por subsistema + workflows cross-subsystem)",
        "Distributed Support Model (L1/L2 por subsistema, L3 integration team)",
        "Post-Deployment Monitoring Dashboard (distributed tracing, SLOs, alertas)"
      ],
      deliverables: [
        {
          name: "Production Ecosystem (live con usuarios reales en todos los subsistemas)",
          template: null,
          required: true,
          reviewedBy: ["Operations Manager", "Product Owners"]
        },
        {
          name: "UAT Acceptance Report (aprobado por Product Owners de subsistemas)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["Product Owners", "Sponsor"]
        },
        {
          name: "Operations Manual (deployment escalonado, rollback, incident response)",
          template: "tpl-006",
          required: true,
          reviewedBy: ["SRE", "DevOps Lead"]
        },
        {
          name: "Distributed Tracing Dashboard (Jaeger UI con traces end-to-end)",
          template: null,
          required: true,
          reviewedBy: ["SRE", "Integration Architect"]
        },
        {
          name: "Lessons Learned Document (retrospectiva del proyecto de integración)",
          template: "tpl-015",
          required: true,
          reviewedBy: ["Integration Architect", "Sponsor"]
        }
      ],
      gate: {
        name: "Product Release Milestone",
        criteria: [
          "UAT aprobado por >90% usuarios piloto (workflows cross-subsystem funcionan correctamente)",
          "Deployment escalonado completado sin rollback (todos los subsistemas en producción)",
          "Data migration completada con 100% integridad (validación cross-subsystem)",
          "Training completado para >95% usuarios de cada subsistema",
          "Ecosystem operando con >99% uptime por 14 días continuos (SLO cumplido)",
          "Distributed tracing funcionando (traces end-to-end visibles en Jaeger)",
          "Support distribuido operando con <4h response time (L1/L2/L3)",
          "Sign-off formal de Product Owners de todos los subsistemas y Sponsor"
        ],
        decision: "PROJECT SUCCESS / ITERATE / STAGED ROLLBACK",
        approvers: ["Product Owners (subsistemas A-E)", "Sponsor", "Integration Architect", "Operations Manager", "Support Lead"]
      },
      keyStakeholders: ["End Users (por subsistema)", "Support Teams (distribuido)", "Operations Team", "Training Team", "Integration Architect"]
    }
  ],
  iterationStrategy: "RUP adaptado para Sistema de Sistemas ejecuta 10-15 iteraciones totales: Inception (1-2), Elaboration (3-4), Construction (4-6), Transition (2-3). Elaboration es más larga porque diseño de integración (API contracts, message schemas) es crítico y costoso de cambiar después. Construction usa desarrollo paralelo (equipos independientes por subsistema) con puntos de sincronización para integration testing. Transition escalonado minimiza riesgo de big-bang deployment.",
  whenToUse: [
    "Sistema de Sistemas con múltiples subsistemas independientes que deben integrarse (smart city, ecosystem empresarial)",
    "Cada subsistema tiene equipo independiente (5-10 personas) y ciclo de desarrollo propio",
    "Necesidad crítica de interoperabilidad (subsistemas deben comunicarse correctamente)",
    "Múltiples tecnologías heterogéneas (Java, .NET, Python) requieren estrategia de integración clara (SOA, API Gateway)",
    "Subsistemas legacy existentes que deben integrarse con subsistemas nuevos",
    "Alto riesgo de integración (latencia end-to-end, fault tolerance, data consistency son críticos)",
    "Regulaciones requieren auditoría de APIs y security en integraciones (healthcare, finance)",
    "Escalabilidad independiente de subsistemas (subsistema A puede escalar sin afectar B)",
    "Equipos distribuidos geográficamente (necesitan contratos de APIs claros para coordinarse)",
    "Presupuesto grande (>$1M) para soportar equipos múltiples y tooling de integración (API Gateway, message bus)"
  ],
  whenNotToUse: [
    "Sistema monolítico sin subsistemas independientes (RUP tradicional o Incremental puro mejor)",
    "Equipo único pequeño (<20 personas) sin necesidad de desarrollo paralelo",
    "Subsistemas están fuertemente acoplados (no tienen interfaces claras, RUP overhead innecesario)",
    "Requisitos de integración desconocidos o experimentales (Ágil puro o Espiral mejor para explorar)",
    "Presupuesto limitado (<$300K, overhead de Elaboration extendida muy caro)",
    "Plazos muy cortos (<9 meses, no hay tiempo para Elaboration extendida + Construction paralelo)",
    "Sin expertise en arquitectura de integración (APIs, SOA, message queues, distributed systems)",
    "Cambios frecuentes de contratos de APIs esperados (friction con formalidad de RUP)",
    "Sin necesidad de fault tolerance cross-subsystem (sistema simple no requiere complejidad de integration testing)",
    "Cultura organizacional ágil con aversión a documentación formal de APIs"
  ],
  advantages: [
    "API contracts y message schemas definidos en Elaboration evitan breaking changes costosos en Construction (saving 40-50% tiempo de integration debugging)",
    "Desarrollo paralelo de subsistemas maximiza productividad (5 equipos trabajando simultáneamente)",
    "Integration testing continuo detecta bugs cross-subsystem temprano (cada iteración)",
    "Deployment escalonado minimiza blast radius de bugs críticos (no big-bang failure)",
    "Arquitectura de integración robusta (SOA, API Gateway, message bus) facilita escalabilidad independiente",
    "Contract testing (Pact) asegura que cambios en subsistema A no rompen B sin validación",
    "Distributed tracing (Jaeger) permite troubleshooting de issues end-to-end en producción",
    "Apropiado para equipos distribuidos geográficamente (contratos claros permiten coordinación asíncrona)",
    "Escalamiento independiente de subsistemas según demanda (A puede escalar 10x mientras B permanece estable)",
    "Fault isolation: Falla de subsistema B no derriba ecosystem completo (circuit breakers, retries)"
  ],
  disadvantages: [
    "Elaboration extendida (12-16 semanas) retrasa inicio de Construction (stakeholders impacientes)",
    "Overhead de coordinación entre equipos muy alto (daily sync, conflict resolution de APIs)",
    "Integration testing complejo y costoso (requiere infrastructure dedicada, test data sync)",
    "Deployment escalonado prolonga Transition (8-12 semanas vs 4-6 en sistema monolítico)",
    "Debugging cross-subsystem muy difícil (requiere distributed tracing, logs centralizados)",
    "Cambios en API contracts requieren coordinación de múltiples equipos (breaking change = re-deploy de A y B)",
    "Tooling costoso (API Gateway >$50K/año, Kafka cluster, distributed tracing infrastructure)",
    "Riesgo de inconsistencia de datos entre subsistemas (eventual consistency es difícil de debuggear)",
    "Performance end-to-end puede ser impredecible (latencia acumulada de N subsistemas)",
    "Requiere expertise avanzada en distributed systems (no todos los equipos tienen este skillset)"
  ],
  changeManagement: {
    description: "Gestión de cambios con impacto cross-subsystem mediante versioning de APIs. Cambios en API contracts son críticos porque afectan múltiples subsistemas. Usar semantic versioning (v1, v2, v3) para APIs y deprecation policy (v1 deprecated, v2 current, v3 beta). Breaking changes requieren aprobación de Integration Architect + owners de subsistemas afectados.",
    steps: [
      {
        step: 1,
        name: "Change Request con Cross-Subsystem Impact Analysis",
        description: "Todo cambio que afecta API contracts o message schemas requiere CR con: subsistemas impactados, breaking vs non-breaking change, plan de migración."
      },
      {
        step: 2,
        name: "API Versioning Strategy",
        description: "Breaking changes requieren nueva versión de API (v1 → v2). Mantener v1 deprecated por 6-12 meses mientras consumidores migran. Non-breaking changes (nuevos fields opcionales) no requieren versioning."
      },
      {
        step: 3,
        name: "Integration Architect Review",
        description: "Integration Architect revisa CR y coordina con Tech Leads de subsistemas afectados. Decisión: Aprobar (con plan de migración), Rechazar (muy costoso), Defer to Next Release."
      },
      {
        step: 4,
        name: "Contract Testing Pre-Merge",
        description: "Implementar cambio en branch. Ejecutar contract tests (Pact) para validar que cambio no rompe consumidores existentes. Si rompe: blocking merge hasta migración de consumidores."
      },
      {
        step: 5,
        name: "Coordinated Deployment",
        description: "Breaking changes requieren deployment coordinado: (1) Desplegar v2 de API provider (mantener v1 activa), (2) Migrar consumidores a v2 (phased rollout), (3) Deprecar v1 después de 6 meses."
      },
      {
        step: 6,
        name: "End-to-End Regression Testing",
        description: "Después de deployment, ejecutar end-to-end tests de workflows cross-subsystem para validar que integración sigue funcionando correctamente."
      }
    ]
  },
  tooling: [
    {
      category: "Integration Infrastructure",
      tools: [
        "API Gateway (Kong, Apigee, AWS API Gateway para routing, rate limiting, auth)",
        "Message Bus (Kafka, RabbitMQ para eventos asíncronos cross-subsystem)",
        "Service Mesh (Istio, Linkerd para traffic management, observability)"
      ]
    },
    {
      category: "API Design & Testing",
      tools: [
        "OpenAPI 3.0, Swagger para API contract specifications versionadas",
        "Pact, Spring Cloud Contract para contract testing (validar compatibilidad)",
        "Postman, WireMock para API mocking y testing independiente"
      ]
    },
    {
      category: "Observability",
      tools: [
        "Distributed Tracing (Jaeger, Zipkin, AWS X-Ray para troubleshooting end-to-end)",
        "Monitoring (Prometheus, Grafana, Datadog para métricas cross-subsystem)",
        "Centralized Logging (ELK Stack, Splunk para logs agregados)"
      ]
    },
    {
      category: "Development & CI/CD",
      tools: [
        "Git/GitHub/GitLab para version control multi-repo (1 repo por subsistema)",
        "CI/CD (Jenkins, GitHub Actions con integration testing automatizado)",
        "Kubernetes para orchestration de múltiples subsistemas"
      ]
    },
    {
      category: "Documentation",
      tools: [
        "Swagger UI, Redoc, Stoplight para API documentation self-service",
        "Confluence para Architecture Decision Records (ADRs) y Integration Architecture Document"
      ]
    }
  ],
  references: [
    {
      title: "Software Engineering (10th Edition) - Chapter 2.4: Rational Unified Process",
      author: "Ian Sommerville",
      year: 2015,
      source: "Pearson"
    },
    {
      title: "Software Engineering (10th Edition) - Chapter 6.3: Application Architectures",
      author: "Ian Sommerville",
      year: 2015,
      source: "Pearson"
    },
    {
      title: "Building Microservices: Designing Fine-Grained Systems",
      author: "Sam Newman",
      year: 2021,
      source: "O'Reilly Media"
    },
    {
      title: "Enterprise Integration Patterns",
      author: "Gregor Hohpe, Bobby Woolf",
      year: 2003,
      source: "Addison-Wesley"
    }
  ]
};

// Actualizar rec-012
data.recommendations['rec-012'].process = newProcess;

// Guardar
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');

console.log('✅ rec-012 enriquecido exitosamente con RUP para Sistema de Sistemas');
console.log(`   - Type: ${newProcess.type}`);
console.log(`   - Phases: ${newProcess.phases.length} fases RUP (Elaboration extendida)`);
console.log(`   - Iterations: 10-15 total (más que rec-004 debido a complejidad de integración)`);
console.log(`   - whenToUse: ${newProcess.whenToUse.length} criterios`);
console.log(`   - advantages: ${newProcess.advantages.length} puntos`);
console.log('   - changeManagement: 6 pasos con API versioning');
