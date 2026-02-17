const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'src', 'data', 'recommendations.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Proceso completo para rec-008 (XP Puro para Desarrollo Personal/Móvil)
const rec008Process = {
  name: "Extreme Programming (XP)",
  type: "agile-xp-pure",
  chapter: 3,
  description: "Metodología ágil centrada en excelencia técnica y calidad de código mediante 12 prácticas obligatorias. Enfoque extremo en TDD (tests antes de código), pair programming, refactoring continuo, y small releases frecuentes. Ideal para equipos muy pequeños (2-4 personas) desarrollando aplicaciones móviles o personales donde calidad técnica es crítica.",
  why: [
    "Calidad de código extremadamente alta mediante TDD (>90% test coverage) previene bugs en producción",
    "Small releases semanales a App Store/Play Store permiten feedback rápido de usuarios reales",
    "Pair programming reduce bugs 40-60% mediante revisión en tiempo real durante escritura de código",
    "Refactoring continuo evita acumulación de deuda técnica (código siempre limpio y mantenible)",
    "Simple Design (YAGNI) mantiene apps móviles ligeras y rápidas (crítico para mobile performance)"
  ],
  how: [
    "Iterations de 1 semana (lunes-domingo) terminando con release a producción o beta",
    "Planning Game al inicio: Cliente presenta stories, developers estiman, seleccionan 5-10 story points",
    "TDD obligatorio: Red-Green-Refactor cycle (write test → fail → code → pass → refactor) múltiples veces al día",
    "Pair programming 30-50% del tiempo con rotación diaria de pairs para knowledge sharing",
    "Continuous Integration: Merge a main 3-5 veces/día con tests automatizados ejecutados en <3 min",
    "Small Release al final de iteration: Deploy a TestFlight/Play Store beta o producción"
  ],
  phases: [
    {
      id: "phase-xp-planning-game",
      name: "Planning Game",
      order: 1,
      description: "Ceremonia de planificación colaborativa al inicio de iteration donde cliente/PO presenta user stories y developers estiman esfuerzo técnico. Negociación para seleccionar stories que caben en 1 semana. Objetivo: Crear iteration backlog con 5-10 story points de trabajo.",
      duration: "2 horas (lunes 9-11 AM)",
      activities: [
        "Cliente/PO presenta user stories priorizadas por valor de negocio (features más importantes primero)",
        "Developers estiman complejidad técnica de cada story usando Planning Poker (escala pequeña: 1, 2, 3, 5 - no stories >5 para iteration 1 semana)",
        "Negociación colaborativa: Cliente ajusta prioridades basado en estimaciones técnicas, developers sugieren simplificaciones",
        "Seleccionar 5-10 story points de trabajo (velocity típica para equipo 2-4 personas en 1 semana)",
        "Descomponer stories en tasks técnicas con TDD explícito: Para cada feature, identificar tests a escribir primero",
        "Identificar metaphor del sistema: Analogía simple que guía diseño (ej: 'App es una biblioteca personal que organiza libros')",
        "Verificar Simple Design: Asegurar que solución propuesta es la más simple posible (YAGNI, no agregar features especulativas)",
        "Asignar pairs para pair programming: Planificar qué días/tareas se harán en parejas (30-50% del tiempo)"
      ],
      inputs: [
        "Backlog de user stories priorizadas por cliente",
        "Velocity de iteration anterior (5-10 puntos típico)",
        "Feedback de usuarios de release anterior (bugs, requests)"
      ],
      outputs: [
        "Iteration backlog (5-10 story points seleccionados)",
        "Stories descompuestas en tasks con TDD tasks identificadas",
        "Pairs asignados para pair programming sessions",
        "Metaphor actualizada si sistema evolucionó"
      ],
      deliverables: [
        {
          name: "Iteration Backlog (user stories + tasks)",
          template: null,
          required: true,
          reviewedBy: ["Cliente/PO", "Developers"]
        },
        {
          name: "TDD Task List (tests a escribir por story)",
          template: null,
          required: true,
          reviewedBy: ["Developers"]
        },
        {
          name: "Pair Programming Schedule (días/tareas en parejas)",
          template: null,
          required: false,
          reviewedBy: ["Developers"]
        }
      ],
      gate: {
        name: "Iteration Commitment",
        criteria: [
          "Stories seleccionadas caben en velocity promedio (5-10 puntos, no over-commitment)",
          "Todas las stories tienen acceptance criteria claros y testables",
          "TDD tasks identificadas para cada story (tests antes de código)",
          "Simple Design verificado (solución más simple posible, YAGNI)",
          "Cliente/PO disponible durante iteration para clarificaciones (On-site Customer)"
        ],
        decision: "COMMIT / ADJUST SCOPE (si equipo tiene dudas de completar trabajo)",
        approvers: ["Cliente/PO", "Developers"]
      },
      keyStakeholders: ["Cliente/PO (On-site Customer)", "Developers (2-4 personas)", "Designer (opcional si app móvil)"]
    },
    {
      id: "phase-xp-development-tdd",
      name: "Development with TDD (Test-Driven Development)",
      order: 2,
      description: "Fase de desarrollo intensivo (días 1-5) con TDD obligatorio, pair programming 30-50% del tiempo, y continuous integration agresivo. TDD cycle: Red (write failing test) → Green (write minimal code to pass) → Refactor (improve design). Objetivo: Completar iteration backlog con >90% test coverage.",
      duration: "5 días (lunes PM - viernes PM)",
      activities: [
        "TDD Red-Green-Refactor cycle (múltiples veces al día): (1) Write failing unit test (Red), (2) Write minimal code to make test pass (Green), (3) Refactor code while keeping tests green",
        "Pair Programming 30-50% del tiempo: Rotación diaria de pairs (Driver escribe código, Navigator revisa en tiempo real y piensa estratégicamente)",
        "Continuous Integration agresivo: Merge a main/trunk 3-5 veces al día por developer, CI pipeline ejecuta tests en <3 min (GitHub Actions, CircleCI)",
        "Coding Standards enforcement: Pre-commit hooks ejecutan linter (ESLint, SwiftLint, Black) para asegurar código consistente",
        "Simple Design continuo: Implementar solución más simple que funcione (YAGNI, no over-engineering ni features especulativas)",
        "Collective Code Ownership: Cualquier developer puede modificar cualquier parte del código (facilitado por TDD que previene romper nada)",
        "On-site Customer disponible: Cliente/PO responde preguntas por Slack/WhatsApp en <2h para clarificar acceptance criteria",
        "Testing pyramid: Unit tests (mayoría, rápidos <1s), Integration tests (algunos, <5s), UI tests (mínimos, <30s)",
        "Code review en pair programming: Navigator hace review en tiempo real, no necesita PR review formal después (velocidad)",
        "40-hour week enforcement: No overtime crónico (equipo descansado escribe mejor código, overtime ocasional OK máximo 2 semanas)"
      ],
      inputs: [
        "Iteration backlog con TDD tasks",
        "Pairs asignados para pair programming",
        "Metaphor del sistema (guía diseño)",
        "CI/CD pipeline configurado (tests <3 min)"
      ],
      outputs: [
        "Código con >90% test coverage (TDD garantiza tests)",
        "Features implementadas con tests pasando (green)",
        "Código mergeado a main 3-5 veces/día (CI agresivo)",
        "Zero bugs conocidos (pair programming + TDD los previenen)"
      ],
      deliverables: [
        {
          name: "Working Software con TDD (>90% test coverage)",
          template: null,
          required: true,
          reviewedBy: ["Developers", "CI/CD pipeline"]
        },
        {
          name: "Test Suite Automatizado (unit, integration, UI tests)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["Developers"]
        },
        {
          name: "Code Coverage Report (>90% coverage)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["Developers"]
        }
      ],
      gate: {
        name: "Quality Assurance Check",
        criteria: [
          "Test coverage >90% mantenido (TDD obligatorio, no código sin tests)",
          "CI pipeline pasando en cada merge (zero broken builds en main)",
          "Pair programming 30-50% del tiempo cumplido (tracking informal)",
          "Simple Design mantenido (no over-engineering detectado en code reviews)",
          "Coding Standards cumplidos (linter pasa en pre-commit hooks)",
          "40-hour week respetado (no overtime crónico >2 semanas consecutivas)"
        ],
        decision: "CONTINUE / FIX QUALITY ISSUES (si test coverage cae o broken builds)",
        approvers: ["Developers", "CI/CD pipeline (automated gates)"]
      },
      keyStakeholders: ["Developers (pair programming rotado)", "Cliente/PO (On-site Customer para clarificaciones)", "CI/CD (automated testing)"]
    },
    {
      id: "phase-xp-refactoring",
      name: "Refactoring & Collective Ownership",
      order: 3,
      description: "Día dedicado a refactoring del código de la iteration para mejorar diseño interno sin cambiar funcionalidad externa. Collective Code Ownership asegura que todos los developers entienden todo el código. Objetivo: Mantener código limpio y evitar deuda técnica acumulada.",
      duration: "1 día (sábado o viernes tarde)",
      activities: [
        "Refactoring de código de la iteration: Identificar code smells (duplicación, métodos largos, clases grandes) y refactorizar",
        "Aplicar reglas de Simple Design: (1) Pasa todos los tests, (2) No duplicación, (3) Expresa intención del programador, (4) Minimiza clases/métodos",
        "Collective Code Ownership enforcement: Developers rotan para leer y entender código escrito por otros (no silos de expertise)",
        "Code review cruzado: Todos revisan pull requests de otros (si no se hizo pair programming en esa feature)",
        "Actualizar metaphor del sistema: Si refactoring cambió estructura significativa, ajustar analogía para mantener coherencia",
        "Refactoring de tests: Eliminar tests duplicados, mejorar nombres de tests para claridad (tests como documentación)",
        "Dead code elimination: Remover código no usado (YAGNI retrospectivo, limpiar features experimentales que no se usaron)",
        "Performance profiling (si app móvil): Identificar bottlenecks con Instruments (iOS) o Profiler (Android), optimizar si necesario"
      ],
      inputs: [
        "Código de iteration con features implementadas",
        "Test suite pasando (>90% coverage)",
        "Code smells identificados durante development"
      ],
      outputs: [
        "Código refactorizado (mejor diseño interno)",
        "Zero duplicación de código (DRY aplicado)",
        "Metaphor actualizada (si cambió estructura)",
        "Collective ownership validado (todos entienden código)"
      ],
      deliverables: [
        {
          name: "Refactored Codebase (mejor diseño, zero duplicación)",
          template: null,
          required: true,
          reviewedBy: ["Developers (collective ownership)"]
        },
        {
          name: "Updated Metaphor Document (si cambió)",
          template: null,
          required: false,
          reviewedBy: ["Developers"]
        },
        {
          name: "Performance Profile Report (si app móvil)",
          template: "tpl-013",
          required: false,
          reviewedBy: ["Developers"]
        }
      ],
      gate: {
        name: "Code Quality Gate",
        criteria: [
          "Tests siguen pasando después de refactoring (no funcionalidad rota)",
          "Code coverage mantenido >90% (refactoring no eliminó tests)",
          "Zero duplicación de código (DRY aplicado)",
          "Simple Design rules cumplidas (código expresa intención, minimiza clases)",
          "Collective ownership validado (al menos 2 developers entienden cada módulo)"
        ],
        decision: "APPROVE REFACTORING / CONTINUE REFACTORING (si code smells persisten)",
        approvers: ["Developers (consenso del equipo)"]
      },
      keyStakeholders: ["Developers (collective ownership)", "CI/CD (validación de tests post-refactoring)"]
    },
    {
      id: "phase-xp-small-release",
      name: "Small Release",
      order: 4,
      description: "Release de la iteration a producción o beta (TestFlight para iOS, Play Store beta para Android). Small Releases frecuentes minimizan riesgo y maximizan feedback de usuarios reales. Objetivo: Entregar incremento funcional a usuarios y recoger feedback para próxima iteration.",
      duration: "1 día (domingo o lunes temprano)",
      activities: [
        "Preparar release notes: Documentar features nuevas, bug fixes, mejoras de performance para usuarios",
        "Ejecutar regression testing completo: Tests automatizados (unit, integration, UI) + testing exploratorio manual de flujos críticos",
        "Build de release: Generar .ipa (iOS) o .apk/.aab (Android) con firma de producción (no debug)",
        "Deploy a beta primero: TestFlight (iOS) o Play Store beta (Android) con 10-50 beta testers para validación final",
        "Monitorear crash reports: Firebase Crashlytics, Sentry, o App Store Connect para detectar bugs críticos en primeras 24h",
        "Recoger feedback de usuarios: In-app surveys, analytics (Firebase Analytics), reviews de App Store/Play Store",
        "Decisión de promover a producción: Si beta estable (zero crashes críticos, feedback positivo), promover a 100% usuarios",
        "Post-release monitoring: Monitorear métricas (MAU, retention, crash-free rate) por 48h para detectar issues",
        "40-hour week retrospective: Verificar que equipo no tuvo overtime crónico, ajustar velocity si fue over-committed"
      ],
      inputs: [
        "Código refactorizado con tests pasando",
        "Release notes documentadas",
        "Beta testers disponibles (10-50 usuarios)",
        "CI/CD configurado para builds de release"
      ],
      outputs: [
        "App en beta (TestFlight/Play Store beta) o producción",
        "Crash reports de primeras 24h (idealmente zero crashes)",
        "Feedback de usuarios (surveys, reviews, analytics)",
        "Métricas de release (MAU, retention, crash-free rate)"
      ],
      deliverables: [
        {
          name: "Released App (beta o producción)",
          template: null,
          required: true,
          reviewedBy: ["Developers", "Beta Testers", "Cliente/PO"]
        },
        {
          name: "Release Notes (features, bug fixes, mejoras)",
          template: "tpl-008",
          required: true,
          reviewedBy: ["Cliente/PO", "Developers"]
        },
        {
          name: "Post-Release Monitoring Report (crashes, métricas)",
          template: "tpl-013",
          required: true,
          reviewedBy: ["Developers"]
        },
        {
          name: "User Feedback Summary (surveys, reviews, analytics)",
          template: "tpl-013",
          required: false,
          reviewedBy: ["Cliente/PO"]
        }
      ],
      gate: {
        name: "Release Success Gate",
        criteria: [
          "Zero crashes críticos en primeras 24h de beta (crash-free rate >99%)",
          "Feedback de beta testers mayormente positivo (>80% satisfacción)",
          "Tests automatizados pasando (regression testing completo)",
          "Release notes aprobadas por cliente/PO (comunicación clara a usuarios)",
          "Métricas de release estables (no caída drástica de MAU o retention)",
          "40-hour week cumplido (equipo no en burnout, sostenible)"
        ],
        decision: "PROMOTE TO PRODUCTION / ROLLBACK (si crashes críticos) / FIX & RE-RELEASE",
        approvers: ["Cliente/PO", "Developers", "Beta Testers (feedback)"]
      },
      keyStakeholders: ["Developers", "Cliente/PO", "Beta Testers (10-50 usuarios)", "End Users (si release a producción)"]
    }
  ],
  iterationStrategy: "XP ejecuta iterations de 1 semana (lunes-domingo) que terminan con Small Release a beta o producción. Velocity típica 5-10 story points/semana para equipo 2-4 personas. TDD obligatorio: Red-Green-Refactor cycle múltiples veces al día garantiza >90% test coverage. Pair programming 30-50% del tiempo con rotación diaria para knowledge sharing (Driver + Navigator). Continuous Integration agresivo: Merge a main 3-5 veces/día con tests automatizados <3 min. Simple Design (YAGNI) mantiene código ligero. On-site Customer disponible por Slack/WhatsApp para responder preguntas en <2h. 40-hour week enforcement (no overtime crónico sostenible).",
  whenToUse: [
    "Equipo muy pequeño (2-4 personas) sin overhead de ceremonias Scrum (Planning Game suficiente)",
    "Desarrollo personal, indie o side project (1 developer + 1 designer/PO)",
    "Aplicaciones móviles (iOS/Android) donde calidad de código es crítica (debugging móvil es lento, TDD previene bugs)",
    "Necesidad de releases frecuentes (semanales a App Store/Play Store o TestFlight/beta)",
    "Cliente/PO disponible diariamente (Slack, WhatsApp) para On-site Customer (respuestas <2h)",
    "Requisitos técnicos complejos donde TDD ayuda a garantizar correctitud (lógica de negocio, algoritmos)",
    "Equipo valora calidad técnica sobre velocidad pura (TDD + pair programming son más lentos pero producen código superior)",
    "Código legacy que necesita refactoring continuo (TDD permite refactorizar sin miedo a romper funcionalidad)",
    "Testing automatizado es factible (APIs, lógica de negocio testeable - no solo UI manual testing)",
    "Sin necesidad de roles formales ni ceremonias pesadas (equipo auto-organizado, todos hacen de todo)"
  ],
  whenNotToUse: [
    "Equipo grande (>10 personas) - XP no escala bien sin framework adicional, usar Scrum Escalado",
    "Cliente/PO no disponible diariamente (On-site Customer es práctica obligatoria de XP)",
    "Pair Programming no es viable (equipo 100% remoto sin herramientas, o solo 1 developer sin pair)",
    "TDD no es posible (hardware embebido sin emulador, UI testing muy lento >5 min)",
    "Releases frecuentes no son posibles (regulaciones requieren aprobaciones lentas, ciclos de 6 meses)",
    "Equipo sin experiencia en TDD (curva de aprendizaje >6 meses, requiere training intensivo)",
    "Presión de deadline muy corto (TDD y pair programming son 30-50% más lentos inicialmente)",
    "Código no testeable (legacy monolítico sin inyección de dependencias, acoplamiento alto)",
    "Cultura organizacional anti-refactoring ('si funciona, no lo toques' - XP requiere refactoring continuo)",
    "Sin CI/CD disponible (tests manuales no escalan en XP que requiere merge 3-5 veces/día)"
  ],
  advantages: [
    "Calidad de código extremadamente alta (TDD + pair programming + refactoring continuo = código superior)",
    "Test coverage >90% garantizado por TDD previene bugs en producción (menos hotfixes urgentes)",
    "Pair programming reduce bugs 40-60% mediante revisión en tiempo real durante escritura (no post-hoc)",
    "Small releases semanales minimizan riesgo (feedback rápido de usuarios, pivoting ágil si falla)",
    "Refactoring continuo evita deuda técnica acumulada (código siempre limpio, mantenible largo plazo)",
    "Collective ownership elimina silos de conocimiento (cualquiera puede trabajar en cualquier parte, no bus factor)",
    "Simple Design (YAGNI) facilita mantenimiento (menos código = menos bugs = menos complejidad)",
    "TDD facilita cambios mayores (tests garantizan no romper funcionalidad existente durante refactoring)",
    "40-hour week previene burnout (sostenible a largo plazo, equipo descansado escribe mejor código)",
    "On-site Customer reduce malentendidos de requisitos (feedback diario, clarificaciones inmediatas)"
  ],
  disadvantages: [
    "Pair programming 50% más lento (2 personas, 1 tarea - pero compensa con menos bugs y knowledge sharing)",
    "TDD requiere disciplina y experiencia (curva de aprendizaje >6 meses para dominar Red-Green-Refactor)",
    "Overhead de testing alto (escribir tests toma 40-50% del tiempo de desarrollo total)",
    "No escala a equipos grandes (>10 personas, coordinación se vuelve difícil sin estructura adicional)",
    "Requiere cliente disponible diariamente (On-site Customer no siempre factible en organizaciones grandes)",
    "Refactoring continuo puede sentirse como 'no avanzar' (stakeholders impacientes ven poco progreso visible)",
    "Pair programming remoto es desafiante (requiere herramientas específicas como VS Code Live Share, latencia puede frustrar)",
    "Simple Design puede ser muy simple (riesgo de under-engineering, falta de abstracciones necesarias)",
    "Sin documentación formal generada (metaphor no es suficiente para onboarding de nuevos developers)",
    "Releases semanales pueden ser estresantes (testing de regresión completo cada semana, pressure constante)"
  ],
  changeManagement: {
    description: "Gestión de cambios flexible mediante Planning Game y refactoring facilitado por TDD.",
    steps: [
      {
        step: 1,
        name: "Cliente presenta cambio en Planning Game",
        description: "Cambios de requisitos se incorporan en próxima iteration mediante Planning Game. Cliente presenta nueva story o modificación de story existente, developers estiman impacto técnico."
      },
      {
        step: 2,
        name: "Developers estiman impacto técnico",
        description: "Equipo analiza si cambio requiere refactoring significativo (arquitectura, API changes) o es incremental. Estiman story points considerando refactoring necesario."
      },
      {
        step: 3,
        name: "Re-priorizar stories en backlog",
        description: "Cliente decide si cambio es más importante que stories previamente priorizadas. Planning Game permite re-negociar scope de iteration si cambio es urgente."
      },
      {
        step: 4,
        name: "Refactoring primero si necesario",
        description: "Si cambio requiere refactoring arquitectónico grande (ej: cambiar data model), dedicar iteration completa a refactoring antes de implementar cambio. TDD asegura no romper funcionalidad durante refactoring."
      },
      {
        step: 5,
        name: "Implementar cambio con TDD",
        description: "Escribir tests primero para nueva funcionalidad (Red), implementar código mínimo para pasar tests (Green), refactorizar si necesario (Refactor). TDD garantiza que cambio no rompe funcionalidad existente."
      },
      {
        step: 6,
        name: "Collective ownership permite flexibilidad",
        description: "Cualquier developer puede implementar cambio (no dependen de 'dueño' del módulo). Pair programming si cambio es complejo asegura conocimiento distribuido."
      }
    ]
  },
  tooling: [
    {
      category: "Testing Frameworks (TDD obligatorio)",
      tools: [
        "Jest (JavaScript/TypeScript TDD, fast execution)",
        "Pytest (Python TDD con fixtures potentes)",
        "XCTest (iOS native TDD framework)",
        "JUnit + Espresso (Android TDD + UI testing)",
        "React Native Testing Library (mobile cross-platform)"
      ]
    },
    {
      category: "CI/CD (Continuous Integration <3 min)",
      tools: [
        "GitHub Actions (CI/CD integrado, matrix builds para iOS/Android)",
        "CircleCI (optimizado para mobile, paralelización de tests)",
        "Bitrise (especializado en mobile CI/CD, iOS/Android)",
        "Fastlane (automatización de builds, screenshots, deploy a App Store/Play Store)"
      ]
    },
    {
      category: "Pair Programming (remoto)",
      tools: [
        "VS Code Live Share (pair programming en tiempo real, baja latencia)",
        "Tuple (pair programming tool optimizado para developers)",
        "Pop (screen sharing con audio de alta calidad)",
        "tmux + vim (pair programming en terminal para equipos técnicos)"
      ]
    },
    {
      category: "Code Quality & Standards",
      tools: [
        "ESLint + Prettier (JavaScript linting + formatting)",
        "SwiftLint (iOS coding standards)",
        "ktlint (Android Kotlin linting)",
        "Black (Python opinionated formatter)",
        "SonarQube (code quality, test coverage tracking)"
      ]
    },
    {
      category: "Communication (On-site Customer)",
      tools: [
        "Slack (async communication, <2h response time)",
        "WhatsApp (instant messaging para clarificaciones urgentes)",
        "Zoom (Planning Game semanal, screen sharing)"
      ]
    },
    {
      category: "Mobile Specific",
      tools: [
        "TestFlight (iOS beta distribution)",
        "Firebase App Distribution (Android beta)",
        "Firebase Crashlytics (crash reporting)",
        "Firebase Analytics (user behavior tracking)",
        "Instruments (iOS performance profiling)",
        "Android Profiler (Android performance)"
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
      title: "Extreme Programming Explained: Embrace Change (1st Edition)",
      author: "Kent Beck",
      year: 1999,
      source: "Addison-Wesley"
    },
    {
      title: "Extreme Programming Explained: Embrace Change (2nd Edition)",
      author: "Kent Beck, Cynthia Andres",
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
      title: "Refactoring: Improving the Design of Existing Code",
      author: "Martin Fowler",
      year: 2018,
      source: "Addison-Wesley"
    }
  ]
};

// Actualizar rec-008
data.recommendations['rec-008'].process = rec008Process;

// Guardar
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');

console.log('✅ rec-008 enriquecido exitosamente con XP Puro');
console.log(`   - Type: ${rec008Process.type}`);
console.log(`   - Phases: ${rec008Process.phases.length} (Planning Game, Development TDD, Refactoring, Small Release)`);
console.log(`   - 12 XP practices integrated: Planning Game, Small Releases, Metaphor, Simple Design, TDD, Refactoring, Pair Programming, Collective Ownership, CI, Coding Standards, 40-hour Week, On-site Customer`);
console.log(`   - whenToUse: ${rec008Process.whenToUse.length} criterios`);
console.log(`   - advantages: ${rec008Process.advantages.length} puntos`);
console.log('   - Differentiated from rec-006: Pure XP without Scrum ceremonies');
