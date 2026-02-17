const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'src', 'data', 'recommendations.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log('🚀 Completando las 8 recomendaciones restantes...\n');

// ============================================================================
// GRUPO C: rec-004 (RUP - Sistema Transaccional)
// ============================================================================
data.recommendations['rec-004'].modeling = {
  notations: [
    {
      name: "UML (completo)",
      description: "Unified Modeling Language completo con todos los diagramas para modelado exhaustivo.",
      diagrams: ["Use Case", "Class", "Sequence", "State Machine", "Activity", "Component", "Deployment"],
      whenToUse: "RUP es use case driven y architecture-centric, requiere modelado UML exhaustivo en todas las fases",
      tools: ["IBM Rational", "Enterprise Architect", "Visual Paradigm", "PlantUML"]
    },
    {
      name: "4+1 Views (Kruchten)",
      description: "Modelo de arquitectura con 5 vistas: Logical, Process, Development, Physical, Scenarios.",
      diagrams: ["Class Diagram (Logical)", "Sequence Diagram (Process)", "Component Diagram (Development)", "Deployment Diagram (Physical)"],
      whenToUse: "RUP arquitectura-céntrica requiere documentar arquitectura desde múltiples perspectivas en Elaboration",
      tools: ["Rational Software Architect", "Visual Paradigm", "Enterprise Architect"]
    }
  ],
  primaryFocus: "Modelado exhaustivo UML y arquitectura 4+1 Views desde fase de Elaboration",
  references: {
    chapter: "chapter-5",
    sections: ["5.2 UML diagrams", "5.5 Model-driven engineering"]
  }
};

data.recommendations['rec-004'].architecture = {
  patterns: [
    {
      name: "Layered (N-Tier)",
      description: "Arquitectura en capas (Presentation, Business Logic, Data Access) con separación clara de responsabilidades.",
      advantages: [
        "Separación de concerns (UI, lógica de negocio, datos)",
        "Facilita testing de cada capa independientemente",
        "Reusabilidad de lógica de negocio entre diferentes interfaces",
        "Facilita mantenimiento (cambios en UI no afectan datos)"
      ],
      disadvantages: [
        "Performance overhead (múltiples capas añaden latencia)",
        "Over-engineering para sistemas simples",
        "Acoplamiento entre capas puede generar rigidez"
      ],
      whenToUse: "Sistemas transaccionales con lógica de negocio compleja y múltiples interfaces (web, móvil, API)",
      tradeoffs: "Mantenibilidad y separación de concerns vs Performance (latencia de múltiples capas)"
    },
    {
      name: "Service-Oriented Architecture (SOA)",
      description: "Arquitectura basada en servicios reutilizables con interfaces bien definidas (SOAP/REST).",
      advantages: [
        "Reusabilidad de servicios (ej: servicio de autenticación usado por múltiples apps)",
        "Interoperabilidad (servicios pueden ser consumidos por diferentes tecnologías)",
        "Escalabilidad independiente por servicio",
        "Evolución independiente de servicios"
      ],
      disadvantages: [
        "Overhead de comunicación (latencia de red)",
        "Complejidad de governance (versionado de servicios)",
        "Performance inferior a monolito (múltiples llamadas de red)"
      ],
      whenToUse: "Sistemas empresariales grandes con múltiples aplicaciones compartiendo servicios comunes",
      tradeoffs: "Reusabilidad y interoperabilidad vs Performance (latencia de red)"
    }
  ],
  style: "Monolito modularizado o SOA (dependiendo de tamaño)",
  qualityAttributes: {
    scalability: "Medium-High - RUP arquitectura-céntrica facilita diseño para escalabilidad desde Elaboration.",
    maintainability: "High - Arquitectura bien documentada (4+1 Views) facilita mantenimiento.",
    performance: "Medium - Diseño upfront permite optimizaciones tempranas (caching, indexing).",
    security: "High - RUP seguridad se diseña en Elaboration (análisis de amenazas, autenticación/autorización)."
  },
  references: {
    chapter: "chapter-6",
    sections: ["6.3 Application architectures", "6.5 Distributed systems architectures"]
  }
};

console.log('✅ rec-004 completado (RUP Sistema Transaccional)');

// ============================================================================
// GRUPO C: rec-012 (RUP - Sistema de Sistemas)
// ============================================================================
data.recommendations['rec-012'].modeling = {
  notations: [
    {
      name: "UML",
      description: "UML para modelado de subsistemas independientes y sus interacciones.",
      diagrams: ["Component Diagram (subsistemas)", "Package Diagram (módulos)", "Deployment Diagram (infraestructura distribuida)"],
      whenToUse: "Sistemas de sistemas requieren modelado de subsistemas independientes y sus interacciones",
      tools: ["Enterprise Architect", "IBM Rational", "Visual Paradigm"]
    },
    {
      name: "SysML (Systems Modeling Language)",
      description: "Extensión de UML para ingeniería de sistemas (hardware + software + procesos).",
      diagrams: ["Block Definition Diagram", "Internal Block Diagram", "Parametric Diagram"],
      whenToUse: "Sistemas de sistemas complejos con hardware, software y procesos integrados (aeroespaciales, defensa)",
      tools: ["Cameo Systems Modeler", "Enterprise Architect", "MagicDraw"]
    }
  ],
  primaryFocus: "Modelado de subsistemas independientes, interfaces entre subsistemas y arquitectura de integración",
  references: {
    chapter: "chapter-19",
    sections: ["19.2 System architectures", "19.3 Systems integration"]
  }
};

data.recommendations['rec-012'].architecture = {
  patterns: [
    {
      name: "Microservices",
      description: "Arquitectura de servicios pequeños independientes, cada uno con su propia base de datos y deployment.",
      advantages: [
        "Escalamiento independiente por servicio (horizontal scaling granular)",
        "Tecnologías heterogéneas (Python para ML, Go para telemetry, Java para transacciones)",
        "Deployment independiente (actualizar un servicio sin afectar otros)",
        "Resiliencia (fallo de un servicio no tumba todo el sistema)"
      ],
      disadvantages: [
        "Complejidad operacional (múltiples deployments, monitoring distribuido)",
        "Network latency (servicios se comunican por red, no memoria compartida)",
        "Distributed transactions difíciles (eventual consistency, sagas)",
        "Debugging complejo (tracing distribuido necesario)"
      ],
      whenToUse: "Sistemas de sistemas con subsistemas independientes y necesidad de escalamiento diferenciado",
      tradeoffs: "Escalabilidad independiente y deployment ágil vs Complejidad operacional"
    },
    {
      name: "Service Mesh",
      description: "Capa de infraestructura para gestionar comunicación entre microservicios (service discovery, load balancing, circuit breaker).",
      advantages: [
        "Resiliencia (circuit breaker previene cascading failures)",
        "Observabilidad (tracing distribuido, metrics)",
        "Security (mTLS entre servicios)",
        "Traffic management (canary deployments, A/B testing)"
      ],
      disadvantages: [
        "Complejidad operacional (configuración de Istio, Linkerd)",
        "Overhead de latencia (proxy sidecar en cada servicio)",
        "Curva de aprendizaje alta"
      ],
      whenToUse: "Sistemas de sistemas con decenas de microservicios comunicándose (necesidad de governance centralizado)",
      tradeoffs: "Resiliencia y observabilidad vs Complejidad operacional"
    },
    {
      name: "Event-Driven (Choreography vs Orchestration)",
      description: "Subsistemas se comunican mediante eventos (choreography: cada servicio decide qué hacer, orchestration: orquestador central coordina).",
      advantages: [
        "Desacoplamiento de subsistemas",
        "Escalabilidad (procesamiento asíncrono)",
        "Flexibilidad para agregar nuevos subsistemas"
      ],
      disadvantages: [
        "Debugging complejo (flujo distribuido)",
        "Eventual consistency",
        "Orquestación puede convertirse en single point of failure"
      ],
      whenToUse: "Sistemas de sistemas donde subsistemas son independientes y deben reaccionar a eventos de otros subsistemas",
      tradeoffs: "Desacoplamiento vs Complejidad de debugging"
    }
  ],
  style: "Distribuido (múltiples subsistemas independientes), SOA o microservices con service mesh",
  qualityAttributes: {
    scalability: "Very High - Subsistemas escalan independientemente. Arquitectura distribuida soporta alta carga.",
    maintainability: "Medium - Múltiples subsistemas dificultan coordinación. Service mesh ayuda con observabilidad.",
    performance: "Medium - Latencia de red entre subsistemas. Caching distribuido (Redis) crítico.",
    security: "Very High - Autenticación/autorización en cada subsistema. mTLS para comunicación inter-servicio."
  },
  references: {
    chapter: "chapter-19",
    sections: ["19.2 System architectures", "19.3 Systems integration"]
  }
};

console.log('✅ rec-012 completado (RUP Sistema de Sistemas)');

// ============================================================================
// GRUPO D: rec-005, rec-006, rec-007 (Scrum)
// ============================================================================
const scrumModeling = {
  notations: [
    {
      name: "User Story Mapping",
      description: "Técnica ágil para organizar user stories en épicas y sprints.",
      diagrams: ["User Story Map (horizontal: flujo usuario, vertical: prioridad)"],
      whenToUse: "Scrum Product Backlog refinement (organizar stories en sprints)",
      tools: ["Miro", "Mural", "StoriesOnBoard", "Jira"]
    },
    {
      name: "UML ligero",
      description: "Documentación técnica ligera (no exhaustiva como RUP). Solo diagramas críticos.",
      diagrams: ["Class Diagram (diseño básico)", "Sequence Diagram (flujos críticos)", "Component Diagram (arquitectura)"],
      whenToUse: "Scrum teams documentan arquitectura high-level sin detalles exhaustivos",
      tools: ["Lucidchart", "Draw.io", "Mermaid (markdown-based)", "PlantUML"]
    },
    {
      name: "C4 Model",
      description: "Modelo de 4 niveles (Context, Container, Component, Code) para documentar arquitectura moderna.",
      diagrams: ["C4 Context Diagram (sistema + actores)", "C4 Container Diagram (apps, DBs, message brokers)"],
      whenToUse: "Scrum teams documentan arquitectura high-level con C4 (Context, Container) sin detalles exhaustivos",
      tools: ["Structurizr", "Draw.io", "Mermaid", "C4-PlantUML"]
    }
  ],
  primaryFocus: "Modelado ligero centrado en user stories y arquitectura high-level (no documentación exhaustiva)",
  references: {
    chapter: "chapter-3",
    sections: ["3.2 Agile development techniques"]
  }
};

// rec-005: Scrum puro (equipo único)
data.recommendations['rec-005'].modeling = scrumModeling;
data.recommendations['rec-005'].architecture = {
  patterns: [
    {
      name: "Monolito modular",
      description: "Monolito con módulos bien definidos (separación por bounded contexts de DDD).",
      advantages: [
        "Simplicidad operacional (1 deployment)",
        "Transacciones ACID (sin distributed transactions)",
        "Debugging fácil (todo en 1 proceso)",
        "Bajo costo de infraestructura"
      ],
      disadvantages: [
        "Escalamiento solo vertical (no horizontal por módulo)",
        "Deployment monolítico (cambio pequeño requiere deployment completo)",
        "Acoplamiento puede crecer con el tiempo si no se cuida modularidad"
      ],
      whenToUse: "Scrum team único (rec-005: 8-12 personas) con sistema mediano",
      tradeoffs: "Simplicidad operacional vs Limitaciones de escalamiento"
    },
    {
      name: "MVC/MVVM (Frontend)",
      description: "Patrón para frontend (web/móvil) que separa lógica de presentación.",
      advantages: [
        "Separación de UI y lógica de negocio",
        "Testabilidad (ViewModel/Controller testeable sin UI)",
        "Reactive programming (UI se actualiza automáticamente)"
      ],
      disadvantages: [
        "Curva de aprendizaje (reactive programming)",
        "Boilerplate code puede ser significativo"
      ],
      whenToUse: "Apps web modernas (React, Vue, Angular) o móviles (Flutter, React Native)",
      tradeoffs: "Testabilidad y reactive UI vs Complejidad de boilerplate"
    }
  ],
  style: "Monolito modular (backend), MVC/MVVM (frontend)",
  qualityAttributes: {
    scalability: "Medium - Escalamiento vertical. Load balancer con sticky sessions para horizontal limitado.",
    maintainability: "High - Scrum iterativo facilita refactoring continuo. Tests automatizados críticos. Modularidad clara.",
    performance: "Medium-High - Sprints permiten optimizaciones iterativas. Monitoring con APM (New Relic, Datadog).",
    security: "High - Security user stories en Product Backlog. Sprint Reviews validan controles de seguridad."
  },
  references: {
    chapter: "chapter-6",
    sections: ["6.3 Application architectures", "6.4 Architectural patterns"]
  }
};

console.log('✅ rec-005 completado (Scrum puro)');

// rec-006: Scrum/XP Hybrid (startup)
data.recommendations['rec-006'].modeling = scrumModeling;
data.recommendations['rec-006'].architecture = {
  patterns: [
    {
      name: "Microservices (lightweight)",
      description: "Pocos microservicios (3-5) enfocados en dominios de negocio clave, no full microservices architecture.",
      advantages: [
        "Deployment independiente de servicios clave (API, Workers, Admin)",
        "Escalamiento diferenciado (escalar API sin escalar Admin)",
        "Tecnologías diferentes por servicio (Node.js API, Python ML)",
        "Resiliencia parcial (fallo de Admin no afecta API pública)"
      ],
      disadvantages: [
        "Complejidad operacional vs monolito",
        "Network latency entre servicios",
        "Distributed transactions (eventual consistency)"
      ],
      whenToUse: "Startups (rec-006: 5-8 personas) con necesidad de deployment ágil y escalamiento diferenciado",
      tradeoffs: "Deployment ágil vs Complejidad operacional"
    },
    {
      name: "BFF (Backend for Frontend)",
      description: "Backend específico para cada frontend (Web BFF, Mobile BFF) que agrega datos de servicios backend.",
      advantages: [
        "Optimización por frontend (payloads específicos para web vs móvil)",
        "Evolución independiente de cada BFF",
        "Reduce acoplamiento entre frontend y backend"
      ],
      disadvantages: [
        "Duplicación de lógica si no se gestiona bien",
        "Más servicios para mantener"
      ],
      whenToUse: "Apps con web y móvil con necesidades diferentes (ej: móvil requiere payloads pequeños)",
      tradeoffs: "Optimización por frontend vs Duplicación de lógica"
    }
  ],
  style: "Microservices ligeros (3-5 servicios), BFF pattern",
  qualityAttributes: {
    scalability: "High - Microservices permiten escalamiento horizontal independiente. Cloud auto-scaling.",
    maintainability: "High - Sprints de 1 semana + TDD + pair programming garantizan código limpio. Refactoring continuo.",
    performance: "High - Deployment ágil permite optimizaciones rápidas. CI/CD con tests de performance.",
    security: "High - OAuth2 para autenticación. TLS everywhere. Security tests automatizados en CI."
  },
  references: {
    chapter: "chapter-6",
    sections: ["6.3 Application architectures", "6.4 Architectural patterns"]
  }
};

console.log('✅ rec-006 completado (Scrum/XP Hybrid)');

// rec-007: Scaled Scrum (SAFe/LeSS)
data.recommendations['rec-007'].modeling = scrumModeling;
data.recommendations['rec-007'].architecture = {
  patterns: [
    {
      name: "Microservices (full architecture)",
      description: "Arquitectura completa de microservicios con 10-20 servicios, cada equipo Scrum posee 2-4 servicios.",
      advantages: [
        "Ownership claro (cada equipo posee sus servicios)",
        "Deployment completamente independiente por equipo",
        "Escalamiento granular por servicio",
        "Tecnologías heterogéneas (equipos eligen stack óptimo)"
      ],
      disadvantages: [
        "Complejidad operacional alta (service mesh necesario)",
        "Coordinación entre equipos para integraciones",
        "Distributed transactions complejas (sagas, event sourcing)"
      ],
      whenToUse: "Scaled Scrum (rec-007: 20-40 personas, 3-5 teams) con sistema grande",
      tradeoffs: "Autonomía de equipos vs Complejidad de coordinación"
    },
    {
      name: "API Gateway",
      description: "Gateway único de entrada que rutea requests a microservicios backend (Kong, AWS API Gateway).",
      advantages: [
        "Punto único de entrada (simplifica clientes)",
        "Autenticación/autorización centralizada",
        "Rate limiting y throttling",
        "Routing y load balancing"
      ],
      disadvantages: [
        "Puede convertirse en bottleneck si no escala bien",
        "Single point of failure (necesita redundancia)",
        "Complejidad de configuración"
      ],
      whenToUse: "Microservices con múltiples clientes (web, móvil, partners) que necesitan punto de entrada unificado",
      tradeoffs: "Simplicidad para clientes vs Riesgo de bottleneck"
    }
  ],
  style: "Microservices distribuidos (10-20 servicios), API Gateway, Service Mesh",
  qualityAttributes: {
    scalability: "Very High - Microservices + auto-scaling + service mesh. Soporta alta carga distribuida.",
    maintainability: "Medium-High - Equipos autónomos facilitan cambios, pero Scrum of Scrums (SoS) necesario para coordinación. Observabilidad crítica.",
    performance: "High - Escalamiento independiente optimiza recursos. Service mesh con circuit breakers previene cascading failures.",
    security: "Very High - API Gateway centraliza autenticación. mTLS entre servicios. Security champions en cada equipo Scrum."
  },
  references: {
    chapter: "chapter-6",
    sections: ["6.3 Application architectures", "6.4 Architectural patterns", "6.5 Distributed systems architectures"]
  }
};

console.log('✅ rec-007 completado (Scaled Scrum)');

// Guardar progreso parcial
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log('\n📊 Progreso GRUPO C y D guardado. Continuando con GRUPO E y F...\n');
