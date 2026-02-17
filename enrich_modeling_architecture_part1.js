const fs = require('fs');
const path = require('path');

// Leer el JSON completo
const jsonPath = path.join(__dirname, 'src', 'data', 'recommendations.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log('🚀 PARTE 1: Enriqueciendo modeling y architecture (GRUPOS A, B, rec-001)...\n');

// ============================================================================
// COMMON PATTERNS (reusables)
// ============================================================================
const layeredPattern = {
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
};

const mvcPattern = {
  name: "MVC (Model-View-Controller)",
  description: "Patrón que separa datos (Model), presentación (View) y lógica de control (Controller).",
  advantages: [
    "Separación clara entre datos y presentación",
    "Facilita testing de lógica de negocio (Model)",
    "Múltiples vistas pueden usar mismo modelo",
    "Evolución independiente de UI y lógica de negocio"
  ],
  disadvantages: [
    "Controllers pueden volverse muy grandes (fat controllers)",
    "Curva de aprendizaje para desarrolladores nuevos",
    "Overhead de coordinación entre componentes"
  ],
  whenToUse: "Aplicaciones web transaccionales con múltiples vistas sobre los mismos datos",
  tradeoffs: "Separación de concerns vs Complejidad de coordinación entre componentes"
};

const microservicesPattern = {
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
  whenToUse: "Sistemas grandes con múltiples equipos, funcionalidades independientes y necesidad de escalamiento diferenciado",
  tradeoffs: "Escalabilidad independiente y deployment ágil vs Complejidad operacional"
};

// ============================================================================
// rec-001: Sistema Crítico
// ============================================================================
data.recommendations['rec-001'].modeling = {
  notations: [
    {
      name: "UML",
      description: "Unified Modeling Language para modelado estructural y comportamental completo con énfasis en trazabilidad.",
      diagrams: ["Use Case Diagram", "Class Diagram", "Sequence Diagram", "State Machine Diagram", "Deployment Diagram"],
      whenToUse: "Sistemas críticos requieren documentación formal exhaustiva de requisitos (use cases), diseño (class/sequence) y deployment para certificación regulatoria",
      tools: ["Enterprise Architect", "IBM Rational", "Visual Paradigm", "PlantUML"]
    },
    {
      name: "Traceability Matrix",
      description: "Matriz que liga requisitos → diseño → código → tests para compliance regulatorio.",
      diagrams: ["Traceability Matrix (tabla/diagrama)", "Requirements Coverage Matrix"],
      whenToUse: "Sistemas críticos regulados (FDA, FAA, DO-178C) que requieren demostrar trazabilidad completa",
      tools: ["IBM DOORS", "Jama Connect", "Polarion", "Excel con macros"]
    },
    {
      name: "FMEA (Failure Mode and Effects Analysis)",
      description: "Análisis de modos de falla: qué puede fallar, probabilidad, severidad, detección, mitigación.",
      diagrams: ["FMEA Table", "FTA (Fault Tree Analysis)", "HAZOP"],
      whenToUse: "Análisis obligatorio en sistemas críticos para identificar y mitigar riesgos de seguridad (safety)",
      tools: ["Relyence", "XFMEA", "RAM Commander", "Excel"]
    }
  ],
  primaryFocus: "Documentación formal exhaustiva con trazabilidad completa (requisitos → diseño → código → tests) y análisis de riesgos (FMEA/FTA)",
  references: {
    chapter: "chapter-24",
    sections: ["24.2 Dependability engineering", "24.3 Safety and dependability requirements"]
  }
};

data.recommendations['rec-001'].architecture = {
  patterns: [
    {
      ...layeredPattern,
      whenToUse: "Sistemas críticos con lógica de negocio compleja y necesidad de auditoría por capa",
      advantages: [...layeredPattern.advantages, "Facilita auditorías regulatorias (cada capa auditable independientemente)"]
    },
    {
      name: "Redundancy Patterns (High Availability)",
      description: "Redundancia de componentes críticos (active-active, active-passive, N+1) para alta disponibilidad.",
      advantages: [
        "Alta disponibilidad (99.9%+ uptime)",
        "Tolerancia a fallos (failover automático)",
        "Mantenimiento sin downtime (rolling updates)",
        "Cumple requisitos de sistemas críticos (no single point of failure)"
      ],
      disadvantages: [
        "Costo de infraestructura (servidores/componentes redundantes)",
        "Complejidad de configuración y failover",
        "Sincronización de estado entre réplicas (consistency challenges)"
      ],
      whenToUse: "Sistemas críticos donde downtime no es aceptable (healthcare, control industrial, finanzas)",
      tradeoffs: "Alta disponibilidad y tolerancia a fallos vs Costo de infraestructura"
    }
  ],
  style: "Monolito modular con redundancia y auditoría completa",
  qualityAttributes: {
    scalability: "Medium - Prioridad es compliance y disponibilidad, no escalamiento masivo. Vertical scaling suficiente con redundancia N+1.",
    maintainability: "Very High - Documentación formal exhaustiva (SRS, SDD, traceability matrix) facilita mantenimiento. Código auditado regularmente.",
    performance: "Medium - Overhead de logging/auditoría. Optimización secundaria a safety y compliance. Latencia aceptable en sistemas críticos.",
    security: "Very High - Controles estrictos (autenticación multi-factor, autorización granular, encriptación AES-256, auditoría completa). Cumple DO-178C, IEC 61508."
  },
  references: {
    chapter: "chapter-24",
    sections: ["24.4 Safety assurance", "24.5 Security and dependability"]
  }
};

console.log('✅ rec-001 enriquecido');

// ============================================================================
// GRUPO A: rec-002, rec-010, rec-011
// ============================================================================

// rec-002
data.recommendations['rec-002'].modeling = {
  notations: [
    {
      name: "UML",
      description: "Unified Modeling Language para modelado estructural y comportamental completo.",
      diagrams: ["Use Case Diagram", "Class Diagram", "Sequence Diagram", "State Machine Diagram", "Deployment Diagram"],
      whenToUse: "Sistemas transaccionales requieren documentación formal de requisitos (use cases), diseño de BD (class diagrams) y flujos transaccionales (sequence diagrams)",
      tools: ["Enterprise Architect", "Visual Paradigm", "Lucidchart", "PlantUML"]
    },
    {
      name: "ERD (Entity-Relationship Diagram)",
      description: "Modelado de base de datos relacional (entidades, relaciones, cardinalidad, normalización).",
      diagrams: ["ERD", "Relational Schema", "Data Dictionary"],
      whenToUse: "Sistemas transaccionales con bases de datos complejas (normalización 3NF, integridad referencial, índices)",
      tools: ["MySQL Workbench", "dbdiagram.io", "Lucidchart", "ER/Studio"]
    }
  ],
  primaryFocus: "Documentación formal completa de requisitos, diseño de base de datos y flujos transaccionales",
  references: {
    chapter: "chapter-5",
    sections: ["5.2 UML diagrams", "5.3 Use case modeling"]
  }
};

data.recommendations['rec-002'].architecture = {
  patterns: [layeredPattern, mvcPattern],
  style: "Monolito modularizado (módulos separados por dominio de negocio)",
  qualityAttributes: {
    scalability: "Medium - Escalamiento vertical (más RAM/CPU al servidor). Escalamiento horizontal difícil con monolito. Load balancer con sticky sessions.",
    maintainability: "High - Arquitectura en capas facilita localizar y modificar código. Separación de concerns clara. Refactoring seguro con tests.",
    performance: "Medium-High - Latencia de múltiples capas, pero optimizable con caching (Redis) y database indexing. Queries SQL optimizadas críticas.",
    security: "High - Autenticación/autorización en capa de negocio. SQL injection prevention con ORMs/prepared statements. HTTPS obligatorio. Session management."
  },
  references: {
    chapter: "chapter-6",
    sections: ["6.3 Application architectures", "6.4 Architectural patterns"]
  }
};

console.log('✅ rec-002 enriquecido');

// rec-010
data.recommendations['rec-010'].modeling = {
  notations: [
    {
      name: "UML",
      description: "UML para documentar flujos de procesamiento batch y estructura de jobs.",
      diagrams: ["Activity Diagram (flujos ETL)", "Class Diagram (estructura jobs)", "Deployment Diagram (infraestructura batch)"],
      whenToUse: "Documentar flujos complejos de ETL, dependencias entre jobs y estructura de datos procesados",
      tools: ["Lucidchart", "PlantUML", "Visual Paradigm"]
    },
    {
      name: "BPMN (Business Process Model and Notation)",
      description: "Notación estándar para modelado de procesos de negocio (swimlanes, eventos, gateways).",
      diagrams: ["BPMN Process Diagram", "BPMN Collaboration Diagram"],
      whenToUse: "Sistemas batch que automatizan procesos de negocio complejos (procesamiento nómina, conciliación bancaria, reporting)",
      tools: ["Camunda Modeler", "Bizagi", "Lucidchart", "Draw.io"]
    }
  ],
  primaryFocus: "Modelado de flujos de procesamiento batch, dependencias entre jobs y manejo de errores/reintento",
  references: {
    chapter: "chapter-5",
    sections: ["5.4 Behavioral models"]
  }
};

data.recommendations['rec-010'].architecture = {
  patterns: [
    {
      name: "Pipeline (Pipe-and-Filter)",
      description: "Procesamiento en etapas secuenciales donde salida de una etapa es entrada de la siguiente (ETL pattern).",
      advantages: [
        "Fácil agregar/remover etapas (modularidad)",
        "Cada etapa puede testearse independientemente",
        "Procesamiento paralelizable por etapa (múltiples workers por etapa)",
        "Reusabilidad de filtros (misma etapa en múltiples pipelines)"
      ],
      disadvantages: [
        "Performance limitada por etapa más lenta (cuello de botella)",
        "Overhead de pasar datos entre etapas (serialización/deserialización)",
        "Debugging complejo (error en etapa N afecta etapa N+1)"
      ],
      whenToUse: "ETL (Extract-Transform-Load), procesamiento de datos en múltiples pasos (parsear CSV → validar → transformar → cargar DB)",
      tradeoffs: "Modularidad y testabilidad vs Performance (overhead de pasar datos entre etapas)"
    },
    {
      name: "Batch Layer (Lambda Architecture)",
      description: "Procesamiento batch separado de real-time (batch genera vistas pre-computadas, real-time para queries ad-hoc).",
      advantages: [
        "Tolerancia a fallos (batch puede re-procesar histórico si hay errores)",
        "Escalabilidad (batch procesa grandes volúmenes offline sin afectar sistema productivo)",
        "Consistencia eventual (batch corrige errores de procesamiento real-time)"
      ],
      disadvantages: [
        "Complejidad de mantener 2 pipelines (batch + real-time)",
        "Latencia alta (vistas batch se actualizan cada X horas, no real-time)",
        "Duplicación de lógica de negocio (batch y real-time pueden tener código similar)"
      ],
      whenToUse: "Sistemas de reporting/analytics con grandes volúmenes (analytics de e-commerce, dashboards ejecutivos, data warehousing)",
      tradeoffs: "Escalabilidad y tolerancia a fallos vs Latencia (vistas batch no son real-time)"
    }
  ],
  style: "Batch/Offline processing (no hay usuarios interactivos esperando respuesta)",
  qualityAttributes: {
    scalability: "Very High - Escalamiento horizontal con workers paralelos. Procesamiento de millones de registros. Apache Spark, Hadoop para big data.",
    maintainability: "Medium - Lógica de ETL puede volverse compleja. Importante documentar dependencias entre jobs (DAG graphs). Airflow/Luigi facilitan orquestación.",
    performance: "Very High - Procesamiento optimizado para throughput (no latencia). Paralelización crítica. Batch windows nocturnos típicos.",
    security: "Medium-High - Acceso a datos sensibles durante ETL. Encriptación en tránsito (TLS) y en reposo (disk encryption). Logs de auditoría."
  },
  references: {
    chapter: "chapter-6",
    sections: ["6.4 Architectural patterns"]
  }
};

console.log('✅ rec-010 enriquecido');

// rec-011
data.recommendations['rec-011'].modeling = {
  notations: [
    {
      name: "UML",
      description: "UML para arquitectura distribuida de dispositivos IoT y cloud backend.",
      diagrams: ["Component Diagram (microservicios/dispositivos)", "Sequence Diagram (IoT device → cloud)", "Deployment Diagram (edge + cloud)"],
      whenToUse: "Sistemas IoT distribuidos con edge computing y cloud backend",
      tools: ["Lucidchart", "PlantUML", "Visual Paradigm"]
    },
    {
      name: "C4 Model",
      description: "Modelo de 4 niveles (Context, Container, Component, Code) para documentar arquitectura moderna.",
      diagrams: ["C4 Context Diagram (sistema + actores)", "C4 Container Diagram (apps, DBs, message brokers)"],
      whenToUse: "Sistemas IoT complejos con múltiples containers (edge devices, cloud services, databases, message queues)",
      tools: ["Structurizr", "Draw.io", "Mermaid", "C4-PlantUML"]
    }
  ],
  primaryFocus: "Arquitectura distribuida de dispositivos IoT, edge computing y cloud backend con message queues",
  references: {
    chapter: "chapter-6",
    sections: ["6.2 Architectural design decisions", "6.5 Distributed systems architectures"]
  }
};

data.recommendations['rec-011'].architecture = {
  patterns: [
    {
      name: "Event-Driven (Pub-Sub)",
      description: "Comunicación asíncrona mediante eventos. Dispositivos IoT publican eventos (telemetry), servicios cloud subscriben y procesan.",
      advantages: [
        "Desacoplamiento (devices no conocen consumers, facilita agregar consumers)",
        "Escalabilidad (múltiples consumers pueden procesar eventos en paralelo)",
        "Tolerancia a fallos (message broker persiste eventos si consumer está caído)",
        "Real-time processing (eventos procesados al llegar, no batch)"
      ],
      disadvantages: [
        "Complejidad de debugging (flujo asíncrono difícil de trazar, necesita distributed tracing)",
        "Eventual consistency (no hay garantía de orden estricto entre consumers)",
        "Overhead de message broker (latencia adicional, costo de Kafka/RabbitMQ/AWS SQS)"
      ],
      whenToUse: "IoT con miles de dispositivos enviando telemetry en paralelo (sensores industriales, smart city, wearables)",
      tradeoffs: "Escalabilidad y desacoplamiento vs Complejidad de debugging y eventual consistency"
    },
    microservicesPattern
  ],
  style: "Distribuido (edge + cloud), event-driven con microservices",
  qualityAttributes: {
    scalability: "Very High - Escalamiento horizontal de microservices y message brokers (Kafka partitions). Millones de dispositivos IoT. Auto-scaling en cloud.",
    maintainability: "Medium - Microservices facilitan cambios aislados, pero debugging distribuido es complejo. Observabilidad crítica (Prometheus, Grafana, Jaeger).",
    performance: "Very High - Event-driven permite procesamiento real-time. Edge computing reduce latencia (procesamiento local). Message brokers optimizados para throughput.",
    security: "Very High - TLS para comunicación devices-cloud. Autenticación por certificados (X.509). Encriptación end-to-end. Device identity management. OTA updates firmados."
  },
  references: {
    chapter: "chapter-6",
    sections: ["6.4 Architectural patterns", "6.5 Distributed systems architectures"]
  }
};

console.log('✅ rec-011 enriquecido');

// ============================================================================
// GRUPO B: rec-003
// ============================================================================
data.recommendations['rec-003'].modeling = {
  notations: [
    {
      name: "UML",
      description: "UML para documentar requisitos evolutivos y prototipos técnicos en cada ciclo.",
      diagrams: ["Use Case Diagram (requisitos)", "Sequence Diagram (prototipos)", "Component Diagram (arquitectura evolutiva)"],
      whenToUse: "Documentar requisitos que evolucionan en cada ciclo de la espiral y prototipos técnicos validados",
      tools: ["Lucidchart", "PlantUML", "Visual Paradigm"]
    },
    {
      name: "Prototyping Tools",
      description: "Herramientas de prototipado rápido para validar viabilidad técnica (mockups, wireframes, PoCs).",
      diagrams: ["Wireframes", "Interactive Prototypes", "Technical PoC (code prototypes)"],
      whenToUse: "Cada ciclo de la espiral requiere prototipo para validar supuestos técnicos antes de comprometer recursos",
      tools: ["Figma", "Balsamiq", "InVision", "CodePen (PoCs técnicos)", "Jupyter Notebooks (algoritmos)"]
    }
  ],
  primaryFocus: "Modelado de riesgos, prototipos técnicos y validación de viabilidad en cada ciclo de la espiral",
  references: {
    chapter: "chapter-2, chapter-5",
    sections: ["2.3 Incremental development and delivery", "5.1 System modeling"]
  }
};

data.recommendations['rec-003'].architecture = {
  patterns: [
    {
      name: "Prototype-Driven Architecture",
      description: "Arquitectura evoluciona a partir de prototipos técnicos validados en cada ciclo de la espiral.",
      advantages: [
        "Validación temprana de viabilidad técnica (fail-fast approach)",
        "Reduce riesgo de arquitectura incorrecta (prototipos validan supuestos)",
        "Stakeholders ven progreso tangible (prototipos funcionales, no solo documentos)",
        "Permite experimentar con múltiples alternativas arquitectónicas"
      ],
      disadvantages: [
        "Prototipos throwaway pueden convertirse en código productivo (technical debt)",
        "Overhead de construir múltiples prototipos (tiempo/recursos)",
        "Riesgo de scope creep (stakeholders piden más features en prototipos)"
      ],
      whenToUse: "Sistemas de alto riesgo técnico (tecnología nueva, integraciones complejas, requisitos inciertos, algoritmos no probados)",
      tradeoffs: "Validación temprana de riesgos vs Overhead de prototipos y riesgo de technical debt"
    },
    {
      name: "Layered with Abstraction Layers",
      description: "Capas de abstracción para aislar riesgos técnicos (ej: capa de integración con API externa inestable).",
      advantages: [
        "Aisla código de alto riesgo (fácil reemplazar si prototipo falla)",
        "Facilita testing de componentes de riesgo (mocks de capas de riesgo)",
        "Permite evolución independiente de capas (refactoring localizado)"
      ],
      disadvantages: [
        "Complejidad de múltiples capas de abstracción",
        "Overhead de performance (indirección adicional)"
      ],
      whenToUse: "Riesgos técnicos específicos que necesitan aislamiento (integración con API legacy inestable, algoritmo experimental)",
      tradeoffs: "Aislamiento de riesgos vs Complejidad de abstracción"
    }
  ],
  style: "Evolutivo (arquitectura emerge de prototipos validados, no diseño upfront exhaustivo)",
  qualityAttributes: {
    scalability: "Medium - Prioridad es validar viabilidad, no escalar. Escalabilidad se refina después de validación en ciclos posteriores.",
    maintainability: "Medium - Prototipos pueden generar technical debt si no se refactorizan. Importante separar prototipos throwaway vs evolutionary.",
    performance: "Low-Medium - Prototipos priorizan validación rápida sobre performance óptima. Optimización en ciclos posteriores.",
    security: "Medium-High - Riesgos de seguridad deben identificarse temprano (análisis de amenazas en cada ciclo). Security by design progresivo."
  },
  references: {
    chapter: "chapter-6",
    sections: ["6.2 Architectural design decisions"]
  }
};

console.log('✅ rec-003 enriquecido');

// Guardar
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log('\n✅ PARTE 1 COMPLETADA: rec-001, GRUPO A (rec-002, 010, 011), GRUPO B (rec-003)');
console.log('📊 Progreso: 5/13 recomendaciones enriquecidas');
