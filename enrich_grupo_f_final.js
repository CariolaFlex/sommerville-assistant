const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'src', 'data', 'recommendations.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// ==================== REC-009: SISTEMA EMBEBIDO/IOT (HÍBRIDO CASCADA+ÁGIL) ====================
const rec009Process = {
  name: "Hybrid Waterfall-Agile for Embedded/IoT",
  type: "hybrid-waterfall-agile-embedded",
  chapter: 2,
  description: "Metodología híbrida para sistemas embebidos/IoT que combina Cascada upfront para diseño de hardware (no se puede cambiar post-fabricación) con desarrollo ágil iterativo para firmware/software (se puede actualizar con OTA). Balance entre predictibilidad de hardware (diseño completo antes de fabricación) y flexibilidad de firmware/software (iteraciones con testing en prototipo real, updates remotas post-deployment).",
  why: [
    "Hardware requiere diseño completo upfront (costoso cambiar post-fabricación, rediseño de PCB = $50-100K)",
    "Firmware/software necesita iteraciones (debugging en hardware real, validación de sensores/actuadores físicos)",
    "OTA (Over-The-Air) updates permiten mejorar firmware post-deployment sin recall físico de dispositivos",
    "Certificaciones IoT (FCC/CE) requieren diseño final de hardware + firmware antes de aprobación",
    "Field testing con beta testers valida sistema en condiciones reales (no solo laboratorio)"
  ],
  how: [
    "Fase 1 (Cascada, 8-12 semanas): Diseño hardware completo (schematics, PCB layout, componentes), prototipo físico, testing RF, certificaciones preliminares",
    "Fase 2 (Ágil, 16-24 semanas, 8-12 sprints): Firmware/software iterativo con sprints de 2 semanas, testing en prototipo físico cada sprint, OTA capability implementation",
    "Fase 3 (Cascada, 8-12 semanas): Integration testing hardware+firmware, field testing con 10-20 beta testers, certificaciones finales FCC/CE, manufacturing ramp-up"
  ],
  phases: [
    {
      id: "phase-hybrid-hw-design",
      name: "Hardware Design (Waterfall Upfront)",
      order: 1,
      description: "Diseño completo de hardware antes de fabricación (no se puede iterar después). Schematics, PCB layout, selección de componentes, prototipo físico, testing de hardware, certificaciones preliminares. Objetivo: Hardware final validado antes de pasar a desarrollo de firmware.",
      duration: "8-12 semanas",
      activities: [
        "Diseño de schematics (circuit design): Microcontrolador, sensores, actuadores, power management, connectivity (WiFi, BLE, LoRa)",
        "PCB layout: Routing de señales, power planes, RF antenna design, mechanical constraints (carcasa, mounting holes)",
        "Selección de componentes: MCU (ESP32, STM32, nRF52), sensores (temperature, humidity, motion), radio (WiFi, BLE, LoRa), power (battery, charging circuit)",
        "Bill of Materials (BOM): Costos, lead times, supply chain (evitar componentes con stock limitado)",
        "Prototipo físico: PCB manufacturing (JLCPCB, PCBWay), assembly (SMT soldering), 3D printing de carcasa",
        "Testing de hardware: Voltaje, corriente, consumo energético (critical para battery life), temperatura (thermal testing), RF testing (antenna performance)",
        "Certificaciones preliminares: FCC/CE pre-compliance testing (RF chamber rental, EMI/EMC testing)",
        "Design freeze: Aprobar diseño final antes de fabricación en masa (cambios posteriores = rediseño costoso)"
      ],
      inputs: [
        "Product requirements (funcionalidad del dispositivo IoT)",
        "Mechanical constraints (tamaño carcasa, mounting, IP rating si outdoor)",
        "Power budget (battery life target, ej: 1 año con CR2032)",
        "Connectivity requirements (WiFi, BLE, LoRa según rango y throughput)"
      ],
      outputs: [
        "Schematics finales (circuit design aprobado)",
        "PCB layout Gerber files (para fabricación)",
        "BOM (Bill of Materials con costos y lead times)",
        "Prototipo físico funcional (5-10 unidades)",
        "Hardware testing report (voltaje, consumo, RF performance)",
        "Pre-compliance testing report (FCC/CE preliminary)"
      ],
      deliverables: [
        {
          name: "Schematics y PCB Gerber Files",
          template: null,
          required: true,
          reviewedBy: ["Hardware Engineer", "Mechanical Engineer"]
        },
        {
          name: "Prototipo Físico (5-10 unidades)",
          template: null,
          required: true,
          reviewedBy: ["Hardware Engineer", "Firmware Engineer"]
        },
        {
          name: "Hardware Testing Report (voltaje, consumo, RF)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["Hardware Engineer", "QA Lead"]
        },
        {
          name: "Pre-Compliance Testing Report (FCC/CE)",
          template: "tpl-013",
          required: false,
          reviewedBy: ["Certification Consultant"]
        }
      ],
      gate: {
        name: "Hardware Design Freeze Gate",
        criteria: [
          "Schematics aprobados por Hardware Engineer (zero critical issues)",
          "Prototipo físico funcional validado (power-on, básica funcionalidad)",
          "Hardware testing passed (voltaje, consumo dentro de specs)",
          "RF performance aceptable (antenna gain, range según requirements)",
          "BOM con componentes disponibles (no components on allocation)",
          "Pre-compliance testing indica probabilidad alta de pasar FCC/CE final"
        ],
        decision: "FREEZE DESIGN (proceed to firmware) / ITERATE (si hardware issues críticos)",
        approvers: ["Hardware Engineer", "Product Owner", "Firmware Engineer"]
      },
      keyStakeholders: ["Hardware Engineer", "Mechanical Engineer (carcasa)", "Firmware Engineer", "Certification Consultant"]
    },
    {
      id: "phase-hybrid-fw-agile",
      name: "Firmware/Software Development (Agile Iterative)",
      order: 2,
      description: "Desarrollo ágil de firmware/software con sprints de 2 semanas. Testing en prototipo físico cada sprint para validar integración hardware-firmware. OTA update capability para permitir updates remotas post-deployment. Objetivo: Firmware funcional completo testeado en hardware real.",
      duration: "16-24 semanas (8-12 sprints de 2 semanas)",
      activities: [
        "Sprint Planning: Seleccionar user stories de firmware/software (ej: 'Device wakes on motion sensor', 'Send telemetry to cloud every 5 min')",
        "Firmware development: C/C++, Rust, o Embedded Linux según MCU (ESP32 = ESP-IDF, STM32 = HAL, nRF52 = Zephyr RTOS)",
        "HAL (Hardware Abstraction Layer): Drivers para sensores, actuadores, radio (I2C, SPI, UART communication)",
        "Testing en prototipo físico: Flash firmware a prototipo, validar funcionalidad con sensores/actuadores reales (no simulación)",
        "Power optimization: Sleep modes, wake on interrupt, minimizar consumo para extender battery life",
        "OTA update implementation: Bootloader con dual partition (rollback si update falla), secure firmware signing",
        "Cloud integration (si aplica): MQTT, HTTP, CoAP para telemetry, AWS IoT Core, Azure IoT Hub, Google Cloud IoT",
        "App móvil/web (si aplica): Desarrollo en paralelo con Scrum para companion app (BLE pairing, dashboard, configuración)",
        "Sprint Review: Demo de firmware funcionando en prototipo físico (mostrar sensores/actuadores operando)",
        "Continuous Integration: CI/CD para firmware (GitHub Actions, PlatformIO CI para builds automatizados)"
      ],
      inputs: [
        "Prototipo físico de Hardware Design phase",
        "Product backlog de firmware/software features",
        "Hardware datasheets (sensores, MCU, radio)",
        "Cloud backend API specs (si aplica)"
      ],
      outputs: [
        "Firmware funcional con OTA capability (código C/C++/Rust)",
        "Firmware tested en prototipo físico (validado en hardware real)",
        "OTA update server configurado (AWS S3, Azure Blob, custom server)",
        "App móvil/web (si aplica) integrada con dispositivo vía BLE/WiFi",
        "Power consumption optimized (sleep modes implementados)"
      ],
      deliverables: [
        {
          name: "Firmware con OTA Capability (código fuente + binary)",
          template: null,
          required: true,
          reviewedBy: ["Firmware Engineer", "Hardware Engineer"]
        },
        {
          name: "Firmware Testing Report (validado en prototipo físico)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["QA Lead", "Firmware Engineer"]
        },
        {
          name: "OTA Update Server (configurado y testeado)",
          template: null,
          required: true,
          reviewedBy: ["Backend Engineer", "DevOps"]
        },
        {
          name: "Companion App (móvil/web si aplica)",
          template: null,
          required: false,
          reviewedBy: ["App Developer", "Product Owner"]
        }
      ],
      gate: {
        name: "Firmware Functional Complete Gate",
        criteria: [
          "Firmware funciona en prototipo físico (100% user stories implementadas)",
          "OTA update capability validada (update + rollback funcionan)",
          "Power consumption dentro de target (battery life >target, ej: >6 meses)",
          "Cloud integration funcional (telemetry enviada correctamente si aplica)",
          "App móvil/web integrada (BLE pairing, dashboard funcionan si aplica)",
          "Zero bugs críticos conocidos (bugs menores aceptables)"
        ],
        decision: "PROCEED TO INTEGRATION / FIX CRITICAL BUGS",
        approvers: ["Firmware Engineer", "Product Owner", "QA Lead"]
      },
      keyStakeholders: ["Firmware Engineer", "Backend Engineer (cloud)", "App Developer (móvil/web)", "QA Lead"]
    },
    {
      id: "phase-hybrid-integration",
      name: "Integration & Certification (Waterfall Final)",
      order: 3,
      description: "Integration testing de hardware+firmware, field testing con beta testers en condiciones reales, certificaciones finales FCC/CE con firmware final, manufacturing ramp-up. Objetivo: Sistema certificado listo para producción en masa.",
      duration: "8-12 semanas",
      activities: [
        "Integration testing: Validar hardware + firmware + cloud + app en conjunto (end-to-end testing)",
        "Field testing: Enviar 10-20 prototipos a beta testers (usuarios reales en condiciones reales: outdoor, indoor, temperatura, humedad)",
        "Crash reporting: Firebase Crashlytics, Sentry para capturar bugs en field testing (4-6 semanas de testing)",
        "Certificaciones finales FCC/CE: Submisión de hardware + firmware final a laboratorio certificado (6-8 semanas, $10-20K)",
        "Manufacturing ramp-up: Negociar con fabricante (MOQ, lead times, quality control), producir batch piloto (100-500 unidades)",
        "Packaging design: Caja, manual de usuario, etiquetas FCC/CE (compliance labeling)",
        "User documentation: Manual de instalación, troubleshooting, especificaciones técnicas",
        "Support setup: Helpdesk, knowledge base, RMA (Return Merchandise Authorization) process para defectos",
        "Production release: Aprobación final para manufacturing en masa (1000+ unidades)"
      ],
      inputs: [
        "Prototipo con firmware funcional (Agile phase)",
        "Field testing feedback de beta testers",
        "Certificaciones preliminares (pre-compliance de Design phase)"
      ],
      outputs: [
        "Sistema integrado validado (hardware + firmware + cloud + app)",
        "Field testing report (beta testers feedback, crash reports, battery life real)",
        "Certificaciones FCC/CE aprobadas (compliance certificates)",
        "Manufacturing batch piloto (100-500 unidades producidas)",
        "User documentation completa (manual, troubleshooting)"
      ],
      deliverables: [
        {
          name: "Integration Testing Report (end-to-end validado)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["QA Lead", "Product Owner"]
        },
        {
          name: "Field Testing Report (beta testers, 4-6 semanas)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["Product Owner", "QA Lead"]
        },
        {
          name: "FCC/CE Certificates (compliance aprobada)",
          template: null,
          required: true,
          reviewedBy: ["Certification Consultant", "Product Owner"]
        },
        {
          name: "Manufacturing Batch Piloto (100-500 unidades)",
          template: null,
          required: true,
          reviewedBy: ["Manufacturing Engineer", "QA Lead"]
        },
        {
          name: "User Documentation (manual, troubleshooting)",
          template: "tpl-007",
          required: true,
          reviewedBy: ["Technical Writer", "Product Owner"]
        }
      ],
      gate: {
        name: "Production Release Gate",
        criteria: [
          "Integration testing passed (hardware + firmware + cloud + app funcionan end-to-end)",
          "Field testing exitoso (>90% beta testers satisfechos, battery life cumple target)",
          "FCC/CE certificates obtenidos (compliance aprobada)",
          "Manufacturing batch piloto sin defectos críticos (<1% defect rate)",
          "User documentation aprobada por Product Owner",
          "Support setup operativo (helpdesk, RMA process funcionando)"
        ],
        decision: "APPROVE MASS PRODUCTION / FIX ISSUES / ITERATE",
        approvers: ["Product Owner", "QA Lead", "Manufacturing Engineer", "Certification Consultant"]
      },
      keyStakeholders: ["QA Lead", "Beta Testers (10-20 usuarios)", "Manufacturing Engineer", "Certification Consultant", "Product Owner"]
    }
  ],
  iterationStrategy: "Híbrido con 3 fases: (1) Hardware Design (Cascada, 8-12 sem, NO iterativo - diseño completo upfront antes de fabricación), (2) Firmware/Software Development (Ágil, 16-24 sem, 8-12 sprints de 2 semanas - iterativo con testing en prototipo físico cada sprint), (3) Integration & Certification (Cascada, 8-12 sem, NO iterativo - validación formal end-to-end). Total: 32-48 semanas (8-12 meses). OTA updates post-deployment permiten mejorar firmware sin recall físico.",
  whenToUse: [
    "Sistema embebido o IoT con hardware custom + firmware (no Raspberry Pi/Arduino commodity)",
    "Hardware no se puede cambiar después de fabricación (costoso rediseño de PCB)",
    "Firmware/software necesita iteraciones (debugging en hardware real, validación de sensores/actuadores)",
    "Certificaciones IoT requeridas (FCC para USA, CE para Europa, UL para seguridad eléctrica)",
    "OTA (Over-The-Air) updates factibles (firmware se puede actualizar remotamente via WiFi/cellular)",
    "Prototipo físico disponible para testing iterativo (PCB manufacturing, assembly)",
    "Equipo con expertise en hardware + firmware + embedded systems",
    "Timeline 8-12 meses aceptable (suficiente para diseño hardware + firmware ágil + certificaciones)",
    "Presupuesto para prototipado físico ($5-10K PCB + componentes) + certificaciones ($10-20K FCC/CE)",
    "Field testing con beta testers posible (validar en condiciones reales: outdoor, temperatura, humedad)"
  ],
  whenNotToUse: [
    "Sistema solo software sin hardware custom (usar Ágil puro como Scrum o XP)",
    "Hardware commodity (Raspberry Pi, Arduino, ESP32 dev boards sin PCB custom, usar Ágil puro)",
    "Hardware puede cambiar fácilmente (prototipado rápido 3D printing sin PCB, usar Ágil puro)",
    "Sin OTA updates (firmware no se puede actualizar remotamente, muy restrictivo para IoT moderno)",
    "Equipo sin expertise en hardware (curva de aprendizaje muy alta >6 meses)",
    "Timeline <6 meses (no hay tiempo para diseño hardware upfront + firmware ágil + certificaciones)",
    "Sin presupuesto para prototipado físico (mínimo $5-10K para PCB manufacturing + componentes)",
    "Certificaciones no requeridas (producto interno o prototipo, usar Ágil puro)",
    "Sistema crítico para vida (medical devices Class II/III, usar Cascada puro con V&V formal, no híbrido)",
    "Sin field testing posible (imposible validar en condiciones reales, solo lab testing)"
  ],
  advantages: [
    "Hardware diseñado upfront evita rediseño costoso post-fabricación (saving $50-100K en re-spins de PCB)",
    "Firmware ágil permite debugging en hardware real (iteraciones rápidas con prototipo físico)",
    "OTA updates permiten fixing de bugs post-deployment (sin recall físico de dispositivos)",
    "Field testing valida sistema en condiciones reales (no solo laboratorio: temperatura, humedad, RF interference)",
    "Certificaciones FCC/CE se obtienen con diseño final (no necesidad de re-certificar después)",
    "Balance entre predictibilidad (hardware) y flexibilidad (firmware iterativo)",
    "Testing iterativo en prototipo reduce riesgo de integration bugs (hardware-firmware validado cada sprint)",
    "Manufacturing ramp-up planificado (batch piloto antes de producción en masa minimiza riesgo)",
    "Apropiado para equipos multidisciplinarios (hardware, firmware, mechanical, RF engineers)",
    "Firmware se puede mejorar post-deployment (features nuevas con OTA updates sin tocar hardware)"
  ],
  disadvantages: [
    "Hardware upfront es riesgo alto (si diseño tiene fallas críticas, costoso rediseñar PCB + re-certificar)",
    "Prototipado físico es costoso ($5-10K mínimo para PCB manufacturing + assembly + componentes)",
    "Certificaciones FCC/CE son lentas (6-8 semanas) y costosas ($10-20K por región)",
    "Testing en hardware real es lento (no se puede mockear sensores/actuadores fácilmente)",
    "OTA updates tienen riesgo (brick devices si update falla, necesita rollback capability robusto)",
    "Field testing logístico complejo (enviar 10-20 prototipos, recoger feedback, RMA si fallan)",
    "Requiere expertise multidisciplinario escaso (hardware, firmware, RF, mechanical engineering)",
    "Manufacturing ramp-up tiene lead time largo (8-12 semanas para producción en masa con fabricante)",
    "Timeline largo (8-12 meses mínimo) comparado con solo software (3-6 meses Ágil puro)",
    "Cambios de hardware mid-project son muy costosos (rediseño PCB + re-fabricación + re-certificación = $50-100K + 12 semanas)"
  ],
  changeManagement: {
    description: "Gestión de cambios estricta: hardware solo en Phase 1, firmware flexible en Phase 2-3.",
    steps: [
      {
        step: 1,
        name: "Cambio en Hardware (solo Phase 1)",
        description: "Cambios de hardware solo permitidos en Phase 1 (antes de design freeze). Después de fabricación de prototipo final, cambios requieren rediseño completo de PCB ($50-100K + 8-12 semanas lead time)."
      },
      {
        step: 2,
        name: "Cambio en Firmware/Software (cualquier momento)",
        description: "Cambios de firmware permitidos en cualquier sprint de Phase 2 (Ágil). Prioritizar en backlog según valor de negocio. Post-deployment, cambios se pueden deployar con OTA updates."
      },
      {
        step: 3,
        name: "Impacto en Certificaciones",
        description: "Cambios de hardware (PCB, componentes, antenna) o cambios de firmware que afectan RF requieren re-certificación FCC/CE completa (6-8 semanas + $10-20K). Cambios de firmware que no afectan RF no requieren re-certificación."
      },
      {
        step: 4,
        name: "OTA Update Post-Deployment",
        description: "Cambios menores de firmware (bug fixes, optimizaciones) se pueden deployar con OTA updates remotas. Testing en staging environment primero (rollout gradual: 10% → 50% → 100% dispositivos)."
      },
      {
        step: 5,
        name: "Field Testing si Cambio Crítico",
        description: "Cambios críticos de firmware (power management, RF communication) requieren re-testing con beta testers en field (4-6 semanas adicionales para validar en condiciones reales)."
      }
    ]
  },
  tooling: [
    {
      category: "Hardware Design",
      tools: [
        "KiCAD, Altium Designer (PCB design, schematics)",
        "Oscilloscope, Multimeter, Logic Analyzer (hardware testing)",
        "RF chamber rental (FCC/CE pre-compliance testing)",
        "3D printer (carcasa prototyping), PCB manufacturing (JLCPCB, PCBWay)"
      ]
    },
    {
      category: "Firmware Development",
      tools: [
        "Embedded IDEs (Keil, IAR, PlatformIO, Arduino IDE)",
        "JTAG debugger, SWD (flashing y debugging firmware en MCU)",
        "Git/GitHub (version control firmware)",
        "CI/CD (GitHub Actions, PlatformIO CI para builds automatizados)"
      ]
    },
    {
      category: "OTA Updates",
      tools: [
        "AWS IoT Core, Azure IoT Hub, Google Cloud IoT (cloud backend)",
        "MQTT broker (Mosquitto, AWS IoT MQTT)",
        "OTA libraries (ESP32 OTA, Mbed Cloud, custom bootloader)"
      ]
    },
    {
      category: "Testing & Monitoring",
      tools: [
        "pytest (unit tests firmware con mocking de HAL)",
        "Firebase Crashlytics, Sentry (crash reporting field testing)",
        "Firebase Analytics (telemetry de dispositivos en field)",
        "Power Profiler Kit (Nordic nRF PPK para medir consumo energético)"
      ]
    },
    {
      category: "App Development (si aplica)",
      tools: [
        "React Native, Flutter (cross-platform móvil)",
        "BLE libraries (react-native-ble-plx, flutter_blue)",
        "Xcode (iOS), Android Studio (Android)"
      ]
    }
  ],
  references: [
    {
      title: "Software Engineering (10th Edition) - Chapter 2: Software Processes",
      author: "Ian Sommerville",
      year: 2015,
      source: "Pearson"
    },
    {
      title: "Software Engineering (10th Edition) - Chapter 3: Agile Software Development",
      author: "Ian Sommerville",
      year: 2015,
      source: "Pearson"
    },
    {
      title: "Embedded Systems Architecture: Explore architectural concepts and best practices",
      author: "Daniele Lacamera",
      year: 2018,
      source: "Packt Publishing"
    }
  ]
};

// Actualizar rec-009
data.recommendations['rec-009'].process = rec009Process;

console.log('✅ rec-009 enriquecido (Híbrido Cascada+Ágil para Embebido/IoT)');

// ==================== REC-013: SISTEMA CRÍTICO REGULADO (HÍBRIDO CASCADA+INCREMENTAL) ====================
const rec013Process = {
  name: "Hybrid Waterfall-Incremental for Regulated Systems",
  type: "hybrid-waterfall-incremental-regulated",
  chapter: 2,
  description: "Metodología híbrida para sistemas críticos regulados que combina Cascada upfront (requirements + design formal, documentación regulatoria completa) con desarrollo incremental iterativo (implementación en iteraciones de 3-4 semanas con trazabilidad completa mantenida) y V&V final formal. Balance entre compliance regulatorio (documentación exhaustiva, trazabilidad, auditorías independientes) y flexibilidad (iteraciones permiten detección temprana de defectos y ajustes controlados sin sacrificar trazabilidad).",
  why: [
    "Regulaciones (FDA, SOX, HIPAA, DO-178C) requieren documentación formal upfront (SRS, SDD, traceability matrix completados antes de coding)",
    "V&V (Verification & Validation) independiente obligatorio por regulaciones (equipo separado de development valida sistema)",
    "Trazabilidad completa requerida (100% requisitos ligados a diseño, código y tests - auditable por inspectores)",
    "Implementación iterativa permite detección temprana de defectos (testing continuo cada 3-4 semanas reduce fixing cost 10x vs encontrar defectos en V&V final)",
    "Change control formal previene cambios no autorizados (governance estricto protege integridad del sistema regulado)"
  ],
  how: [
    "Fase 1 (Cascada, 12-16 semanas): Requirements Engineering formal (SRS IEEE 830), Traceability Matrix, High-Level Design, Risk Analysis (FMEA), aprobación regulatoria preliminar (FDA 510(k), SOX controls)",
    "Fase 2 (Incremental, 20-28 semanas, 5-7 iteraciones): Desarrollo iterativo con iteraciones de 3-4 semanas (más largas que Scrum por overhead de documentación), cada iteración entrega código + tests + documentación actualizada + traceability matrix actualizada",
    "Fase 3 (Cascada, 8-12 semanas): V&V formal (equipo independiente), auditoría de trazabilidad, UAT con protocolos formales, auditorías regulatorias (FDA inspection, SOX audit), deployment controlado"
  ],
  phases: [
    {
      id: "phase-hybrid-req-design",
      name: "Requirements & Design (Waterfall Formal)",
      order: 1,
      description: "Requirements Engineering formal y High-Level Design completo antes de implementación. Documentación regulatoria exhaustiva, traceability matrix, risk analysis (FMEA), aprobación regulatoria preliminar. Objetivo: SRS y HLD aprobados por regulador antes de escribir código.",
      duration: "12-16 semanas",
      activities: [
        "Requirements Engineering formal: Capturar 100% requisitos funcionales y no funcionales en SRS (Software Requirements Specification IEEE 830)",
        "Stakeholder interviews: Usuarios finales, compliance officers, reguladores (FDA, auditors) para requisitos completos",
        "Traceability Matrix creation: Requisito ID → Diseño ID → Código módulo → Test Case ID (trazabilidad completa desde inicio)",
        "High-Level Design (HLD): Arquitectura del sistema (capas, componentes, interfaces), security architecture (encryption, access control), compliance controls (audit logging, data retention)",
        "Risk Analysis (FMEA - Failure Mode and Effects Analysis): Identificar modos de falla, impacto, probabilidad, mitigación (crítico para FDA)",
        "Regulatory documentation: FDA 510(k) submission (medical software), SOX controls documentation (financial), HIPAA compliance documentation (health data)",
        "Aprobación preliminar: Revisión de SRS y HLD por regulador (FDA pre-submission meeting, SOX auditor review)",
        "Design reviews: Formal reviews de HLD con arquitecto, security team, compliance officer (sign-off obligatorio)"
      ],
      inputs: [
        "Regulatory requirements (FDA 21 CFR Part 11, SOX Section 404, HIPAA Security Rule)",
        "Business requirements (funcionalidad del sistema)",
        "Compliance constraints (data retention policies, audit logging, access control)"
      ],
      outputs: [
        "Software Requirements Specification (SRS IEEE 830, 100-200 páginas)",
        "Traceability Matrix inicial (requisitos → diseño, empty code/test columns)",
        "High-Level Design Document (HLD con arquitectura, security, compliance)",
        "Risk Analysis Report (FMEA con modos de falla, mitigación)",
        "Regulatory submission preliminar (FDA 510(k), SOX controls documentation)"
      ],
      deliverables: [
        {
          name: "Software Requirements Specification (SRS IEEE 830)",
          template: "tpl-002",
          required: true,
          reviewedBy: ["Business Analyst", "Compliance Officer", "Product Owner"]
        },
        {
          name: "Traceability Matrix (requisitos → diseño)",
          template: "tpl-014",
          required: true,
          reviewedBy: ["QA Lead", "Compliance Officer"]
        },
        {
          name: "High-Level Design Document (HLD)",
          template: "tpl-004",
          required: true,
          reviewedBy: ["Software Architect", "Security Lead", "Compliance Officer"]
        },
        {
          name: "Risk Analysis Report (FMEA)",
          template: "tpl-014",
          required: true,
          reviewedBy: ["Risk Manager", "Compliance Officer"]
        },
        {
          name: "Regulatory Submission Preliminar (FDA 510(k) o SOX controls)",
          template: null,
          required: true,
          reviewedBy: ["Compliance Officer", "Regulatory Affairs"]
        }
      ],
      gate: {
        name: "Requirements & Design Approval Gate",
        criteria: [
          "SRS aprobado por stakeholders (100% requisitos capturados y firmados)",
          "Traceability Matrix creada (100% requisitos tienen ID único)",
          "HLD aprobado por Software Architect y Security Lead",
          "FMEA completado (todos los modos de falla identificados con mitigación)",
          "Regulatory submission preliminar aceptada (FDA pre-submission meeting positivo o SOX auditor review passed)",
          "Design reviews completados con sign-off de compliance officer"
        ],
        decision: "APPROVE (proceed to implementation) / REVISE (si regulador requiere cambios)",
        approvers: ["Compliance Officer", "Software Architect", "Product Owner", "Regulatory Affairs", "QA Lead"]
      },
      keyStakeholders: ["Business Analyst", "Compliance Officer", "Software Architect", "Security Lead", "Regulatory Affairs (FDA liaison, SOX auditor)"]
    },
    {
      id: "phase-hybrid-incremental-impl",
      name: "Implementation (Incremental with Traceability)",
      order: 2,
      description: "Desarrollo incremental con iteraciones de 3-4 semanas (más largas que Scrum por overhead de documentación). Cada iteración entrega código + unit tests + integration tests + documentación actualizada + traceability matrix actualizada. Code reviews obligatorios con sign-off. Objetivo: Sistema completo con trazabilidad 100% mantenida.",
      duration: "20-28 semanas (5-7 iteraciones de 3-4 semanas)",
      activities: [
        "Iteration Planning: Seleccionar subset de requisitos de SRS para iteración (priorizar por riesgo y dependencias)",
        "Detailed Design: Diseño detallado de módulos (SDD - Software Design Document) antes de coding",
        "Implementation: Codificar módulos con trazabilidad (comentarios en código ligan requisito ID → código)",
        "Unit Testing: Tests unitarios con trazabilidad (cada test ligado a requisito en traceability matrix, test ID generado)",
        "Code Review obligatorio: Peer review formal con checklist (coding standards, security, compliance) y sign-off de reviewer",
        "Integration Testing: Tests de integración entre módulos con trazabilidad (test cases documentados)",
        "Traceability Matrix update: Actualizar matriz con código implementado y tests ejecutados (requisito → diseño → código → test)",
        "Documentation update: Actualizar SDD, user manuals, release notes cada iteración",
        "Change Control: Cambios de requisitos requieren Change Request formal con impacto análisis (CCB approval)",
        "Iteration Review: Demo de incremento funcional + review de traceability matrix actualizada (compliance check)"
      ],
      inputs: [
        "SRS aprobado (Requirements phase)",
        "HLD aprobado (Design phase)",
        "Traceability Matrix inicial",
        "FMEA (riesgos a mitigar en código)"
      ],
      outputs: [
        "Código implementado con trazabilidad (comentarios ligan requisito ID)",
        "Unit tests + integration tests con trazabilidad (test ID → requisito ID)",
        "Traceability Matrix actualizada (requisito → diseño → código → test completo)",
        "Software Design Document (SDD) actualizado iteración a iteración",
        "Code review sign-offs (cada módulo aprobado formalmente)"
      ],
      deliverables: [
        {
          name: "Source Code con trazabilidad (comentarios requisito ID)",
          template: null,
          required: true,
          reviewedBy: ["Tech Lead", "Code Reviewer"]
        },
        {
          name: "Test Suite (unit + integration tests con trazabilidad)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["QA Lead", "Compliance Officer"]
        },
        {
          name: "Traceability Matrix Updated (requisito → código → test)",
          template: "tpl-014",
          required: true,
          reviewedBy: ["QA Lead", "Compliance Officer"]
        },
        {
          name: "Software Design Document (SDD) actualizado",
          template: "tpl-004",
          required: true,
          reviewedBy: ["Software Architect", "Tech Lead"]
        },
        {
          name: "Code Review Sign-offs (peer review formal)",
          template: "tpl-012",
          required: true,
          reviewedBy: ["Tech Lead", "Code Reviewers"]
        }
      ],
      gate: {
        name: "Implementation Complete Gate",
        criteria: [
          "100% requisitos de SRS implementados (código completo)",
          "100% unit tests + integration tests pasando (zero failed tests)",
          "Traceability Matrix 100% completa (cada requisito tiene código + test ligado)",
          "Code reviews completados con sign-off (100% módulos revisados)",
          "SDD actualizado (diseño detallado documentado)",
          "Zero defectos críticos conocidos (defectos menores aceptables con workaround documentado)"
        ],
        decision: "PROCEED TO V&V / FIX CRITICAL DEFECTS",
        approvers: ["Tech Lead", "QA Lead", "Compliance Officer", "Product Owner"]
      },
      keyStakeholders: ["Development Team (8-15 developers)", "QA Engineers", "Code Reviewers", "Compliance Officer (oversight)", "Tech Lead"]
    },
    {
      id: "phase-hybrid-vv-cert",
      name: "V&V & Certification (Waterfall Formal)",
      order: 3,
      description: "Verification & Validation formal por equipo independiente (no development team). Auditoría de trazabilidad completa, UAT con protocolos formales, auditorías regulatorias (FDA inspection, SOX audit), deployment controlado. Objetivo: Sistema certificado y aprobado por regulador para producción.",
      duration: "8-12 semanas",
      activities: [
        "Verification & Validation (V&V) independiente: Equipo separado de development ejecuta test plan completo (system testing, regression testing)",
        "Auditoría de trazabilidad: Validar que 100% requisitos tienen tests que pasan (traceability matrix completa y correcta)",
        "UAT (User Acceptance Testing) formal: Usuarios finales ejecutan test protocols (scripts formales con expected results, sign-off obligatorio)",
        "Security testing: Penetration testing, vulnerability scanning (OWASP Top 10, compliance con security standards)",
        "Performance testing: Load testing, stress testing (validar NFRs de SRS: latencia, throughput, uptime)",
        "Auditorías regulatorias: FDA inspection (software validation, 21 CFR Part 11), SOX audit (IT controls, segregation of duties), HIPAA compliance review (PHI protection)",
        "Defect fixing: V&V team reporta defectos, development team fixea, regression testing completo post-fix",
        "Deployment controlado: Phased rollout (10% usuarios → 50% → 100% en 4 semanas), rollback plan documentado",
        "Post-deployment monitoring: Monitoring de errores, crashes, performance por 30 días (validar estabilidad)",
        "Final approval: Sign-off de compliance officer, regulatory affairs, product owner (project closure)"
      ],
      inputs: [
        "Código completo con tests (Implementation phase)",
        "Traceability Matrix 100% completa",
        "SDD, SRS actualizados",
        "UAT test protocols (definidos en Requirements phase)"
      ],
      outputs: [
        "V&V Test Report (equipo independiente, system testing completo)",
        "Traceability Audit Report (100% requisitos validados)",
        "UAT Acceptance Document (usuarios finales sign-off)",
        "Regulatory Audit Reports (FDA inspection passed, SOX audit passed, HIPAA compliance passed)",
        "Production Deployment Report (phased rollout, monitoring post-deployment)"
      ],
      deliverables: [
        {
          name: "V&V Test Report (equipo independiente)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["V&V Lead (independiente)", "Compliance Officer"]
        },
        {
          name: "Traceability Audit Report (100% validado)",
          template: "tpl-014",
          required: true,
          reviewedBy: ["Compliance Officer", "QA Lead"]
        },
        {
          name: "UAT Acceptance Document (usuarios sign-off)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["Product Owner", "Key Users"]
        },
        {
          name: "Regulatory Audit Reports (FDA, SOX, HIPAA)",
          template: null,
          required: true,
          reviewedBy: ["Regulatory Affairs", "Compliance Officer"]
        },
        {
          name: "Production Deployment Report (phased rollout, monitoring)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["DevOps Lead", "Product Owner"]
        }
      ],
      gate: {
        name: "Production Release Certification Gate",
        criteria: [
          "V&V testing passed (zero critical defects, <5 minor defects aceptables)",
          "Traceability audit passed (100% requisitos validados con tests pasando)",
          "UAT acceptance signed-off (>95% usuarios finales aprueban)",
          "Regulatory audits passed (FDA inspection aprobado, SOX audit clean, HIPAA compliance validated)",
          "Deployment controlado exitoso (phased rollout sin rollback, <0.1% error rate)",
          "Post-deployment monitoring estable (30 días sin incidentes críticos)",
          "Final sign-off de compliance officer y regulatory affairs"
        ],
        decision: "CERTIFY FOR PRODUCTION / FIX DEFECTS / ROLLBACK",
        approvers: ["Compliance Officer", "Regulatory Affairs", "V&V Lead (independiente)", "Product Owner", "Key Users"]
      },
      keyStakeholders: ["V&V Team (independiente, 3-5 QA engineers)", "Compliance Officer", "Regulatory Affairs (FDA liaison, SOX auditor)", "Key Users (UAT)", "DevOps Lead"]
    }
  ],
  iterationStrategy: "Híbrido con 3 fases: (1) Requirements & Design (Cascada formal, 12-16 sem, NO iterativo - SRS y HLD completos upfront con aprobación regulatoria), (2) Implementation (Incremental, 20-28 sem, 5-7 iteraciones de 3-4 semanas - iterativo pero con trazabilidad mantenida, documentación actualizada cada iteración), (3) V&V & Certification (Cascada formal, 8-12 sem, NO iterativo - validación independiente, auditorías regulatorias, deployment controlado). Total: 40-56 semanas (10-14 meses). Change management controlado: cambios de requisitos requieren re-aprobación regulatoria.",
  whenToUse: [
    "Sistema crítico regulado (FDA software médico, SOX financial systems, HIPAA healthcare, DO-178C aviación)",
    "Documentación formal obligatoria por regulación (SRS, SDD, traceability matrix requeridos por ley)",
    "Trazabilidad completa requerida (100% requisitos ligados a código y tests - auditable por inspectores)",
    "Auditorías regulatorias periódicas (FDA inspection cada 2 años, SOX audit anual, HIPAA compliance reviews)",
    "V&V (Verification & Validation) independiente requerido (equipo separado de development valida sistema)",
    "Requisitos mayormente estables (cambios controlados, no frecuentes ni volátiles)",
    "Alto impacto de fallas (salud humana, datos financieros, seguridad crítica)",
    "Timeline 10-14 meses aceptable (suficiente para 3 fases con documentación exhaustiva)",
    "Presupuesto para overhead de documentación y auditorías (30-40% del tiempo + $50-100K auditorías)",
    "Equipo con experiencia en desarrollo regulado (conocimiento de FDA, SOX, HIPAA, compliance)"
  ],
  whenNotToUse: [
    "Sistema no regulado (sin FDA, SOX, HIPAA, usar Ágil puro como Scrum o XP)",
    "Sin necesidad de documentación formal (startup, prototipo, producto interno, usar Scrum)",
    "Requisitos muy volátiles (cambios frecuentes no permitidos en sistemas regulados - friction con governance)",
    "Sin presupuesto para overhead de documentación (30-40% del tiempo en docs + $50-100K auditorías)",
    "Timeline <6 meses (no hay tiempo para Requirements formal + Implementation incremental + V&V formal)",
    "Equipo sin experiencia en compliance (curva de aprendizaje muy alta >6 meses para dominar FDA/SOX/HIPAA)",
    "Sin V&V independiente disponible (regulaciones lo requieren, no puede ser mismo dev team)",
    "Stakeholders no dispuestos a esperar (esperan velocidad de Ágil puro 6-9 meses, no 10-14 meses)",
    "Sistema de bajo riesgo (fallas no tienen impacto crítico en salud/finanzas/seguridad)",
    "Sin aprobación regulatoria preliminar (FDA 510(k) puede tardar 6-12 meses antes de coding)"
  ],
  advantages: [
    "Compliance regulatorio garantizado (documentación formal cumple FDA 21 CFR Part 11, SOX 404, HIPAA Security Rule)",
    "Trazabilidad completa facilita auditorías (100% requisitos ligados a tests - inspectores validan fácilmente)",
    "V&V independiente detecta defectos que dev team pasa por alto (fresh eyes, perspectiva crítica)",
    "Iteraciones permiten ajustes controlados sin perder trazabilidad (detección temprana de defectos, fixing cost 10x menor)",
    "Risk analysis upfront (FMEA) minimiza fallas críticas (modos de falla identificados antes de coding)",
    "Change control formal previene cambios no autorizados (governance estricto protege integridad)",
    "Code reviews obligatorios mejoran calidad (peer review con sign-off formal reduce defectos 40-60%)",
    "Deployment controlado minimiza riesgo (phased rollout 10%→50%→100% con rollback plan)",
    "Auditorías pasadas facilitan re-certificaciones futuras (documentación reutilizable para compliance anual)",
    "Balance entre predictibilidad (Cascada) y detección temprana de defectos (Incremental)"
  ],
  disadvantages: [
    "Overhead de documentación muy alto (30-40% del tiempo en SRS, SDD, traceability matrix, test protocols)",
    "Timeline largo (10-14 meses) comparado con Ágil puro (6-9 meses para mismo sistema)",
    "Costoso debido a V&V independiente ($50-100K adicionales para equipo separado + auditorías regulatorias)",
    "Cambios de requisitos son lentos (requieren re-aprobación regulatoria 4-6 semanas + impacto análisis)",
    "Iteraciones más largas que Scrum (3-4 semanas vs 1-2 semanas) por overhead de documentación y traceability",
    "Requiere expertise en compliance escaso (no todos los equipos tienen experiencia en FDA/SOX/HIPAA)",
    "Aprobación regulatoria preliminar puede tardar 6-12 meses (FDA 510(k) submission antes de coding)",
    "V&V formal al final puede descubrir defectos tardíos (costoso fixing si arquitectura tiene issues fundamentales)",
    "Burocracia puede generar frustración en dev team (documentación excesiva vista como overhead sin valor)",
    "Sin flexibilidad para pivoting rápido (regulaciones no permiten cambios drásticos mid-project)"
  ],
  changeManagement: {
    description: "Change control formal con re-aprobación regulatoria si cambio afecta safety/security.",
    steps: [
      {
        step: 1,
        name: "Change Request Formal con justificación regulatoria",
        description: "Todo cambio de requisitos requiere CR formal con: justificación (por qué cambio es necesario para compliance o funcionalidad), impacto en traceability, tests afectados, documentación a actualizar."
      },
      {
        step: 2,
        name: "Impact Analysis multi-dimensional",
        description: "Analizar impacto en: (1) Traceability matrix (requisitos afectados, tests a re-ejecutar), (2) Código (módulos a modificar, refactoring necesario), (3) Documentación (SRS, SDD, user manuals a actualizar), (4) Regulatory approval (cambio afecta safety/security? Requiere re-aprobación FDA/SOX?)."
      },
      {
        step: 3,
        name: "Change Control Board (CCB) Approval",
        description: "CCB (Product Owner + QA Lead + Compliance Officer + Regulatory Affairs) revisa CR. Decisión: Aprobar (si impacto aceptable), Rechazar (si muy costoso o riesgoso), Defer to Next Release (si no es crítico)."
      },
      {
        step: 4,
        name: "Re-aprobación regulatoria si safety/security afectado",
        description: "Si cambio afecta safety (modos de falla nuevos) o security (access control, encryption), requiere amendment a regulatory submission (FDA 510(k) amendment, SOX controls update). Timeline: 4-6 semanas + $10-20K."
      },
      {
        step: 5,
        name: "Implementation en próxima iteración con trazabilidad",
        description: "Implementar cambio en próxima iteración disponible. Actualizar traceability matrix (requisito nuevo/modificado → diseño → código → test). Code review obligatorio con sign-off."
      },
      {
        step: 6,
        name: "Regression Testing completo + V&V update",
        description: "Ejecutar regression testing completo (cambio puede romper funcionalidad existente). Actualizar V&V test plans con nuevos test cases. Re-ejecutar tests afectados en V&V phase."
      }
    ]
  },
  tooling: [
    {
      category: "Requirements & Traceability",
      tools: [
        "IBM DOORS, Jama Connect, Helix RM (requirements management con trazabilidad)",
        "Traceability Matrix tools (requisito → diseño → código → test)",
        "Visure Requirements (alternativa a DOORS para FDA/IEC 62304)"
      ]
    },
    {
      category: "Documentation",
      tools: [
        "Confluence, SharePoint (versionado de SRS, SDD, test protocols)",
        "LaTeX, Markdown (documentación técnica versionada en Git)",
        "DocuSign (sign-offs electrónicos de compliance officer, regulatory affairs)"
      ]
    },
    {
      category: "Testing",
      tools: [
        "JUnit, Pytest, NUnit (unit testing con trazabilidad - test ID → requisito ID)",
        "Selenium, Cypress (integration testing, UAT automation)",
        "JIRA Test Management, Zephyr (test case management con trazabilidad)"
      ]
    },
    {
      category: "Compliance & Risk",
      tools: [
        "GxP tools (MasterControl, Veeva Vault para FDA compliance)",
        "FMEA tools (Relyence, XFMEA para risk analysis)",
        "SOX compliance tools (AuditBoard, Workiva para IT controls)"
      ]
    },
    {
      category: "Code Review & CI/CD",
      tools: [
        "GitHub, GitLab (version control con approval workflows para sign-off obligatorio)",
        "SonarQube (code quality, static analysis para compliance)",
        "Jenkins, GitHub Actions (CI/CD con trazabilidad de builds, test execution)"
      ]
    },
    {
      category: "ALM & Auditing",
      tools: [
        "IBM Rational DOORS/DNG (ALM completo para regulated systems)",
        "PTC Windchill (ALM para medical devices)",
        "Jama Connect (ALM con FDA/IEC 62304 templates)"
      ]
    }
  ],
  references: [
    {
      title: "Software Engineering (10th Edition) - Chapter 2: Software Processes",
      author: "Ian Sommerville",
      year: 2015,
      source: "Pearson"
    },
    {
      title: "Software Engineering (10th Edition) - Chapter 24: Critical Systems Engineering",
      author: "Ian Sommerville",
      year: 2015,
      source: "Pearson"
    },
    {
      title: "IEC 62304: Medical Device Software - Software Life Cycle Processes",
      author: "International Electrotechnical Commission",
      year: 2006,
      source: "IEC Standard"
    },
    {
      title: "FDA Guidance: General Principles of Software Validation",
      author: "U.S. Food and Drug Administration",
      year: 2002,
      source: "FDA Guidance Document"
    }
  ]
};

// Actualizar rec-013
data.recommendations['rec-013'].process = rec013Process;

// Guardar
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');

console.log('✅ rec-013 enriquecido (Híbrido Cascada+Incremental para Sistemas Regulados)');
console.log('\n🏁🎉 GRUPO F COMPLETADO - ¡TAREA 2.2 FINALIZADA! 🎉🏁\n');
console.log('📊 Resumen GRUPO F:');
console.log('   - rec-009: Híbrido Cascada+Ágil para Embebido/IoT (type: hybrid-waterfall-agile-embedded)');
console.log('   - rec-013: Híbrido Cascada+Incremental para Sistemas Regulados (type: hybrid-waterfall-incremental-regulated)');
console.log('\n🎯 TAREA 2.2 (process enrichment): 13/13 (100%) COMPLETADA');
console.log('   ✅ Todas las recomendaciones enriquecidas a 80%+ profundidad');
