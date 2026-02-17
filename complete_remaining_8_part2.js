const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'src', 'data', 'recommendations.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log('🚀 Completando GRUPO E y F...\n');

// ============================================================================
// GRUPO E: rec-008 (XP Puro)
// ============================================================================
data.recommendations['rec-008'].modeling = {
  notations: [
    {
      name: "CRC Cards (Class-Responsibility-Collaboration)",
      description: "Técnica XP para diseño OO rápido (tarjetas con clase, responsabilidades, colaboradores).",
      diagrams: ["CRC Cards (físicas o digitales)"],
      whenToUse: "XP Simple Design (diseño mínimo sin over-engineering). CRC cards facilitan diseño colaborativo en pair programming.",
      tools: ["Físicas (post-its)", "Miro", "Google Jamboard", "Index cards"]
    },
    {
      name: "UML mínimo",
      description: "Documentación mínima. Solo diagramas cuando código no es suficientemente claro.",
      diagrams: ["Class Diagram (básico)", "Sequence Diagram (flujos complejos)"],
      whenToUse: "XP documentación mínima. Solo diagramas cuando código no es auto-explicativo.",
      tools: ["Whiteboard", "Draw.io", "Mermaid", "PlantUML"]
    },
    {
      name: "Wireframes (Móvil)",
      description: "Mockups de UI móvil para validar UX antes de implementar.",
      diagrams: ["Wireframes", "Interactive Prototypes"],
      whenToUse: "Apps móviles (iOS/Android) requieren wireframes para validar flujos con on-site customer",
      tools: ["Figma", "Sketch", "Balsamiq", "Adobe XD"]
    }
  ],
  primaryFocus: "Modelado mínimo (YAGNI). CRC cards para diseño OO, wireframes para UX móvil.",
  references: {
    chapter: "chapter-3",
    sections: ["3.4 Extreme programming"]
  }
};

data.recommendations['rec-008'].architecture = {
  patterns: [
    {
      name: "Monolito simple (Backend)",
      description: "Arquitectura simple para apps móviles con backend API REST.",
      advantages: [
        "Simplicidad (1 deployment, 1 base de datos)",
        "TDD fácil (no distributed testing)",
        "Simple Design (YAGNI: no over-engineer microservices para app pequeña)",
        "Deployment rápido (importante para small releases XP)"
      ],
      disadvantages: [
        "Escalamiento limitado (vertical only)",
        "Deployment monolítico (todo o nada)"
      ],
      whenToUse: "Apps móviles indie/personal (2-4 personas) con tráfico bajo-medio",
      tradeoffs: "Simplicidad vs Escalabilidad"
    },
    {
      name: "MVVM (Frontend Móvil)",
      description: "Model-View-ViewModel para apps móviles (Flutter, React Native, SwiftUI).",
      advantages: [
        "Separación de lógica de negocio y UI",
        "Testabilidad (ViewModel testeable sin UI, crítico para TDD de XP)",
        "Reactive programming (UI se actualiza automáticamente)",
        "Pair programming efectivo (logic en ViewModel, UI en View)"
      ],
      disadvantages: [
        "Curva de aprendizaje (reactive programming)",
        "Boilerplate code (pero XP refactoring continuo lo minimiza)"
      ],
      whenToUse: "Apps móviles modernas con UI compleja y necesidad de TDD",
      tradeoffs: "Testabilidad y reactive UI vs Complejidad de boilerplate"
    },
    {
      name: "BFF (Backend for Frontend)",
      description: "Backend específico para móvil (agrega datos de múltiples servicios, optimiza payloads para móvil).",
      advantages: [
        "Optimización para móvil (payloads pequeños, reduce roundtrips)",
        "Evolución independiente de backend móvil vs web",
        "Offline-first support (BFF puede cachear para offline)"
      ],
      disadvantages: [
        "Duplicación de lógica (si no se usa BFF, móvil y web comparten mismo backend)"
      ],
      whenToUse: "Apps móviles con necesidades específicas (offline-first, payloads optimizados, flujos móviles únicos)",
      tradeoffs: "Optimización móvil vs Duplicación de lógica"
    }
  ],
  style: "Monolito simple (backend API) + MVVM (frontend móvil)",
  qualityAttributes: {
    scalability: "Low-Medium - Apps indie no requieren escalamiento masivo. Vertical scaling suficiente.",
    maintainability: "Very High - TDD, refactoring continuo, simple design, pair programming garantizan código limpio y mantenible.",
    performance: "High - Apps móviles requieren performance (60 FPS UI, payloads optimizados). Small releases permiten optimización iterativa.",
    security: "High - APIs móviles expuestas a internet. OAuth2 para autenticación. Certificate pinning contra MITM. Tests de seguridad en CI."
  },
  references: {
    chapter: "chapter-6",
    sections: ["6.3 Application architectures"]
  }
};

console.log('✅ rec-008 completado (XP Puro)');

// ============================================================================
// GRUPO F: rec-009 (Híbrido Embebido/IoT)
// ============================================================================
data.recommendations['rec-009'].modeling = {
  notations: [
    {
      name: "UML",
      description: "UML para documentación formal de hardware-software co-design.",
      diagrams: ["Component Diagram (hardware + firmware + software)", "Deployment Diagram (edge + cloud)", "State Machine Diagram (firmware states)"],
      whenToUse: "Sistemas embebidos requieren documentación formal de hardware-software co-design",
      tools: ["Enterprise Architect", "Rhapsody (IBM)", "Visual Paradigm"]
    },
    {
      name: "Hardware Schematics",
      description: "Diagramas de circuitos eléctricos (schematics) y PCB layout.",
      diagrams: ["Schematic Diagram", "PCB Layout", "Block Diagram"],
      whenToUse: "Hardware design (Fase 1 Cascada) - diseño completo antes de fabricación",
      tools: ["KiCAD", "Altium Designer", "Eagle", "Proteus"]
    }
  ],
  primaryFocus: "Modelado de hardware-software co-design, schematics de hardware, diagramas de deployment edge+cloud",
  references: {
    chapter: "chapter-6, chapter-21",
    sections: ["6.5 Distributed systems architectures", "21.2 Embedded system design"]
  }
};

data.recommendations['rec-009'].architecture = {
  patterns: [
    {
      name: "Edge Computing + Cloud",
      description: "Procesamiento en edge (dispositivos IoT) + cloud (analytics, storage).",
      advantages: [
        "Latencia baja (procesamiento en edge, crítico para real-time)",
        "Tolerancia a fallos (edge opera offline si cloud no disponible)",
        "Ahorro de ancho de banda (solo datos agregados a cloud)",
        "Privacidad (datos sensibles procesados localmente)"
      ],
      disadvantages: [
        "Complejidad de sincronización edge-cloud",
        "Recursos limitados en edge (CPU, RAM, batería)",
        "Debugging difícil (edge devices en campo)"
      ],
      whenToUse: "IoT con requisitos de latencia baja o conectividad intermitente (industrial, wearables, smart home)",
      tradeoffs: "Latencia baja y tolerancia a fallos vs Complejidad de sincronización"
    },
    {
      name: "Firmware Layered",
      description: "Firmware en capas (HAL - Hardware Abstraction Layer, Middleware, Application).",
      advantages: [
        "Portabilidad (cambiar hardware sin reescribir application)",
        "Testabilidad (mockear HAL para unit tests)",
        "Reusabilidad (HAL reutilizable en múltiples productos)"
      ],
      disadvantages: [
        "Overhead de abstracción (latencia en sistemas real-time críticos)",
        "Memoria adicional (layers ocupan RAM/Flash)"
      ],
      whenToUse: "Firmware que debe soportar múltiples hardware (ej: diferentes microcontroladores STM32, ESP32, nRF)",
      tradeoffs: "Portabilidad vs Overhead de abstracción"
    }
  ],
  style: "Distribuido (edge + cloud), firmware layered",
  qualityAttributes: {
    scalability: "High - Cloud escala horizontalmente. Edge distribuye carga (millones de dispositivos).",
    maintainability: "Medium - Firmware complejo de debuggear. OTA updates facilitan mantenimiento post-deployment. Logging limitado en edge.",
    performance: "High - Real-time constraints en firmware (RTOS). Edge computing reduce latencia. Optimización crítica (batería, CPU).",
    security: "Very High - TLS para comunicación edge-cloud. Secure boot en firmware. Hardware security modules (HSM). OTA updates firmados."
  },
  references: {
    chapter: "chapter-21",
    sections: ["21.2 Embedded system design", "21.3 Real-time system design"]
  }
};

console.log('✅ rec-009 completado (Híbrido Embebido/IoT)');

// ============================================================================
// GRUPO F: rec-013 (Híbrido Crítico Regulado)
// ============================================================================
data.recommendations['rec-013'].modeling = {
  notations: [
    {
      name: "UML formal",
      description: "UML con trazabilidad completa a requisitos (cada diagrama referencia requisitos en SRS).",
      diagrams: ["Use Case (requisitos trazables)", "Class", "Sequence", "State Machine (todos con trazabilidad a requisitos)"],
      whenToUse: "FDA/SOX requieren trazabilidad completa (cada diagrama debe referenciar requisitos en SRS)",
      tools: ["IBM Rational", "DOORS (trazabilidad)", "Polarion"]
    },
    {
      name: "Traceability Matrix",
      description: "Matriz que liga requisitos → diseño → código → tests.",
      diagrams: ["Traceability Matrix (tabla o diagrama)", "Requirements Coverage Matrix"],
      whenToUse: "Regulaciones requieren demostrar que cada requisito está implementado y testeado (FDA 21 CFR Part 11, IEC 62304)",
      tools: ["IBM DOORS", "Jama Connect", "Polarion", "Excel con macros"]
    },
    {
      name: "FMEA (Failure Mode and Effects Analysis)",
      description: "Análisis de modos de falla (qué puede fallar, impacto, probabilidad, detección, mitigación).",
      diagrams: ["FMEA Table", "FTA (Fault Tree Analysis)", "HAZOP"],
      whenToUse: "Sistemas críticos requieren análisis de riesgos formal (FDA, IEC 62304, ISO 26262)",
      tools: ["Relyence", "XFMEA", "RAM Commander", "Excel"]
    }
  ],
  primaryFocus: "Modelado formal con trazabilidad completa (requisitos → diseño → código → tests) y análisis de riesgos (FMEA)",
  references: {
    chapter: "chapter-24",
    sections: ["24.2 Dependability engineering", "24.3 Safety and dependability requirements"]
  }
};

data.recommendations['rec-013'].architecture = {
  patterns: [
    {
      name: "Layered (con auditoría)",
      description: "Arquitectura en capas con logging y auditoría exhaustiva en cada capa.",
      advantages: [
        "Trazabilidad de acciones (quién hizo qué y cuándo, FDA 21 CFR Part 11)",
        "Separación de concerns con auditoría integrada",
        "Facilita compliance con regulaciones (logs inmutables)",
        "Debugging facilitado por logs exhaustivos"
      ],
      disadvantages: [
        "Overhead de logging (performance, storage significativos)",
        "Complejidad de gestión de logs (rotación, archivado, búsqueda)"
      ],
      whenToUse: "Sistemas regulados que requieren auditoría completa (FDA 21 CFR Part 11, SOX, HIPAA)",
      tradeoffs: "Trazabilidad y auditoría completa vs Overhead de logging"
    },
    {
      name: "Redundancy Patterns (High Availability)",
      description: "Redundancia de componentes críticos (active-active, active-passive, N+1) para alta disponibilidad.",
      advantages: [
        "Alta disponibilidad (99.9%+ uptime, crítico en healthcare/finanzas)",
        "Tolerancia a fallos (failover automático en segundos)",
        "Mantenimiento sin downtime (rolling updates)",
        "Cumple requisitos de sistemas críticos (no single point of failure)"
      ],
      disadvantages: [
        "Costo de infraestructura (servidores/componentes redundantes)",
        "Complejidad de configuración y failover (testing de failover necesario)",
        "Sincronización de estado entre réplicas (consistency challenges)"
      ],
      whenToUse: "Sistemas críticos donde downtime no es aceptable (healthcare, finanzas, control industrial)",
      tradeoffs: "Alta disponibilidad y tolerancia a fallos vs Costo de infraestructura"
    }
  ],
  style: "Monolito modular o SOA (con redundancia y auditoría completa)",
  qualityAttributes: {
    scalability: "Medium - Prioridad es compliance y disponibilidad, no escalamiento masivo. Vertical scaling suficiente con redundancia N+1.",
    maintainability: "High - Documentación formal exhaustiva (SRS, SDD, traceability matrix) facilita mantenimiento. Change control estricto garantiza estabilidad.",
    performance: "Medium - Overhead de logging y auditoría. Optimización secundaria a compliance y safety. Latencia aceptable en sistemas críticos.",
    security: "Very High - Controles estrictos (autenticación multi-factor, autorización granular, encriptación AES-256, auditoría completa). Cumple FDA 21 CFR Part 11, HIPAA, SOX."
  },
  references: {
    chapter: "chapter-24",
    sections: ["24.4 Safety assurance", "24.5 Security and dependability"]
  }
};

console.log('✅ rec-013 completado (Híbrido Crítico Regulado)');

// Guardar archivo final
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');

console.log('\n🎉🏁 ¡TODAS LAS 8 RECOMENDACIONES COMPLETADAS! 🏁🎉\n');
console.log('📊 Resumen final:');
console.log('   ✅ GRUPO C (RUP): rec-004, rec-012');
console.log('   ✅ GRUPO D (Scrum): rec-005, rec-006, rec-007');
console.log('   ✅ GRUPO E (XP): rec-008');
console.log('   ✅ GRUPO F (Híbridos): rec-009, rec-013');
console.log('\n🎯 TAREA 2.4: 13/13 (100%) COMPLETADA');
console.log('🎉 FASE 1.2: 100% COMPLETADA');
