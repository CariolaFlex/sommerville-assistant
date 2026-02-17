const fs = require('fs');
const path = require('path');

// Read the glossary index
const glossaryPath = path.join(__dirname, 'src/data/glossary/index.json');
const data = JSON.parse(fs.readFileSync(glossaryPath, 'utf8'));

// Helper function to find term by name (case insensitive)
function findTermByName(name) {
  return data.allTerms.find(t => t.nombre.toLowerCase() === name.toLowerCase());
}

// Helper function to find term by id
function findTermById(id) {
  return data.allTerms.find(t => t.id === id);
}

// Enrichment data for fundamental terms
const enrichments = {
  // CAPÍTULO 1: Introducción
  'Ingeniería de software': {
    descripcionExtendida: 'Disciplina ingenieril que aplica principios científicos y de ingeniería para el desarrollo sistemático, operación y mantenimiento de software de calidad. Abarca desde la especificación inicial hasta el mantenimiento post-despliegue, incluyendo aspectos técnicos, gerenciales y de calidad.',
    keywords: ['ingeniería', 'software', 'disciplina', 'desarrollo', 'mantenimiento', 'calidad', 'producción'],
    ejemplos: [
      'Desarrollo de sistema de gestión hospitalaria con metodología RUP',
      'Mantenimiento evolutivo de aplicación bancaria legacy',
      'Especificación de requisitos para sistema de control industrial'
    ],
    referencias: { capitulo: 1, secciones: ['1.1', '1.2'] },
    relatedTerms: ['cap1-002', 'cap1-003', 'cap2-001'] // Procesos de software, Métodos ágiles, Modelo de proceso
  },

  'Procesos de software': {
    descripcionExtendida: 'Conjunto estructurado de actividades, métodos, prácticas y transformaciones que las personas utilizan para desarrollar y mantener software y productos asociados (planes, documentos, modelos). Define quién hace qué, cuándo y cómo alcanzar un objetivo específico.',
    keywords: ['procesos', 'software', 'actividades', 'metodología', 'desarrollo', 'ciclo de vida', 'SDLC'],
    ejemplos: [
      'Proceso en cascada para sistema de nómina gubernamental',
      'Proceso Scrum para desarrollo de app móvil',
      'Proceso iterativo RUP para sistema de e-commerce'
    ],
    referencias: { capitulo: 1, secciones: ['1.3'] },
    relatedTerms: ['cap2-001', 'cap2-011', 'cap2-015', 'cap3-001'] // Modelo de proceso, Procesos dirigidos por plan, Procesos ágiles
  },

  'Métodos ágiles': {
    descripcionExtendida: 'Enfoques de desarrollo que enfatizan desarrollo iterativo incremental, entregas frecuentes de software funcional, colaboración directa con el cliente, y capacidad de respuesta a cambios. Contrastan con métodos dirigidos por plan en su énfasis en la adaptabilidad sobre la predictibilidad.',
    keywords: ['métodos', 'ágiles', 'iterativo', 'incremental', 'scrum', 'xp', 'kanban', 'agile', 'sprint'],
    ejemplos: [
      'Equipo de 5 desarrolladores usando Scrum para SaaS',
      'Desarrollo de MVP con sprints de 2 semanas',
      'XP para proyecto de startup con pair programming'
    ],
    referencias: { capitulo: 1, secciones: ['1.3.3'] },
    relatedTerms: ['cap3-001', 'cap3-003', 'cap3-008', 'cap3-009'] // Desarrollo ágil, Scrum, XP, Kanban
  },

  // CAPÍTULO 2: Procesos de Software
  'Modelo en cascada': {
    descripcionExtendida: 'Modelo secuencial de proceso de software donde las fases fluyen hacia abajo como cascada: especificación → diseño → implementación → prueba → mantenimiento. Cada fase debe completarse antes de iniciar la siguiente. Apropiado para sistemas con requisitos bien comprendidos y estables.',
    keywords: ['cascada', 'waterfall', 'secuencial', 'plan-driven', 'fases', 'lineal', 'predictivo'],
    ejemplos: [
      'Desarrollo de sistema de control de tráfico aéreo',
      'Sistema de facturación para gobierno con requisitos fijos',
      'Software embebido para dispositivo médico regulado'
    ],
    referencias: { capitulo: 2, secciones: ['2.1.1'] },
    relatedTerms: ['cap2-011', 'cap2-001', 'cap2-015'] // Procesos dirigidos por plan, Modelo de proceso
  },

  'Desarrollo incremental': {
    descripcionExtendida: 'Enfoque donde el sistema se desarrolla en incrementos, cada uno entregando funcionalidad adicional. Permite entregas parciales tempranas y facilita la obtención de feedback del cliente. Los incrementos pueden desarrollarse en paralelo por equipos distintos.',
    keywords: ['incremental', 'iterativo', 'incrementos', 'entregas', 'ciclos', 'feedback'],
    ejemplos: [
      'Sistema de e-commerce entregando módulos: catálogo → carrito → pago → reportes',
      'App móvil con releases incrementales: login → perfil → notificaciones',
      'Plataforma SaaS con features mensuales'
    ],
    referencias: { capitulo: 2, secciones: ['2.1.2'] },
    relatedTerms: ['cap3-001', 'cap2-001', 'cap3-003'] // Desarrollo ágil, Scrum
  },

  'Modelo en espiral': {
    descripcionExtendida: 'Modelo de proceso iterativo que combina desarrollo incremental con análisis de riesgos. Cada vuelta de la espiral representa una fase que incluye: determinación de objetivos, evaluación y reducción de riesgos, desarrollo y prueba, planificación de la siguiente iteración. Especialmente útil para sistemas grandes y complejos.',
    keywords: ['espiral', 'spiral', 'riesgos', 'iterativo', 'Boehm', 'prototipos', 'análisis'],
    ejemplos: [
      'Sistema de gestión de central nuclear con análisis de riesgos de seguridad',
      'Plataforma financiera evaluando riesgos de regulación en cada iteración',
      'Sistema de defensa con prototipos de subsistemas críticos'
    ],
    referencias: { capitulo: 2, secciones: ['2.1.3'] },
    relatedTerms: ['cap2-001', 'cap2-016'] // Modelo de proceso, Prototipado
  },

  // CAPÍTULO 3: Desarrollo Ágil
  'Scrum': {
    descripcionExtendida: 'Marco de trabajo ágil que estructura el desarrollo en sprints de duración fija (1-4 semanas). Define roles (Product Owner, Scrum Master, Development Team), artefactos (Product Backlog, Sprint Backlog, Increment) y ceremonias (Sprint Planning, Daily Scrum, Sprint Review, Sprint Retrospective). Enfatiza autoorganización del equipo.',
    keywords: ['scrum', 'sprint', 'product owner', 'scrum master', 'backlog', 'daily', 'retrospectiva', 'agile'],
    ejemplos: [
      'Equipo de 7 personas con sprints de 2 semanas para app web',
      'Scrum distribuido con daily standup remoto',
      'Scaled Scrum (SAFe) para organización de 50 desarrolladores'
    ],
    referencias: { capitulo: 3, secciones: ['3.2'] },
    relatedTerms: ['cap3-001', 'cap3-004', 'cap3-005', 'cap3-006'] // Desarrollo ágil, Sprint, Product backlog
  },

  'Programación extrema (XP)': {
    descripcionExtendida: 'Metodología ágil que lleva las prácticas de ingeniería al extremo: pair programming, TDD, integración continua diaria, releases frecuentes, diseño simple, refactorización constante. Enfatiza excelencia técnica y adaptación continua a requisitos cambiantes. Requiere cliente on-site.',
    keywords: ['xp', 'extreme programming', 'pair programming', 'tdd', 'refactoring', 'continuous integration', 'test-driven'],
    ejemplos: [
      'Startup tech con deploys diarios y TDD',
      'Equipo de 4 devs con pair programming rotativo',
      'Proyecto con cliente embebido en el equipo'
    ],
    referencias: { capitulo: 3, secciones: ['3.3'] },
    relatedTerms: ['cap3-001', 'cap3-011', 'cap3-012', 'cap3-013'] // Desarrollo ágil, Pair programming, TDD
  },

  // CAPÍTULO 4: Ingeniería de Requisitos
  'Requerimientos funcionales': {
    descripcionExtendida: 'Declaraciones de servicios que el sistema debe proveer, cómo debe reaccionar a entradas específicas y cómo debe comportarse en situaciones particulares. Describen la funcionalidad o servicios del sistema independientemente de su implementación.',
    keywords: ['requerimientos', 'funcionales', 'requisitos', 'funcionalidad', 'servicios', 'casos de uso', 'features'],
    ejemplos: [
      'El sistema debe permitir búsqueda de productos por categoría',
      'El usuario debe poder exportar reportes a PDF',
      'El sistema debe validar tarjetas de crédito antes de procesar pago'
    ],
    referencias: { capitulo: 4, secciones: ['4.1.1'] },
    relatedTerms: ['cap4-002', 'cap4-003'] // Requerimientos no funcionales, Especificación de software
  },

  'Requerimientos no funcionales': {
    descripcionExtendida: 'Restricciones sobre servicios o funciones del sistema, incluyendo restricciones temporales, sobre el proceso de desarrollo y estándares. Definen propiedades y atributos del sistema: rendimiento, seguridad, disponibilidad, mantenibilidad, usabilidad. A menudo más críticos que funcionales.',
    keywords: ['no funcionales', 'nfr', 'calidad', 'rendimiento', 'seguridad', 'usabilidad', 'performance', 'constraints'],
    ejemplos: [
      'El sistema debe responder en menos de 2 segundos (rendimiento)',
      'La aplicación debe soportar 10,000 usuarios concurrentes (escalabilidad)',
      'Los datos deben cifrarse con AES-256 (seguridad)'
    ],
    referencias: { capitulo: 4, secciones: ['4.1.2'] },
    relatedTerms: ['cap4-001', 'cap6-010'] // Requerimientos funcionales, Atributos de calidad
  },

  'Historias de usuario': {
    descripcionExtendida: 'Descripciones breves y simples de una funcionalidad desde la perspectiva del usuario final. Formato típico: "Como [rol], quiero [funcionalidad] para [beneficio]". Usadas en métodos ágiles para capturar requisitos de manera liviana y conversacional. Se refinan mediante conversaciones.',
    keywords: ['historias', 'user stories', 'agile', 'requisitos', 'features', 'épicas', 'backlog'],
    ejemplos: [
      'Como cliente, quiero agregar productos al carrito para comprar múltiples items',
      'Como admin, quiero ver dashboard de ventas para tomar decisiones de negocio',
      'Como usuario registrado, quiero resetear mi contraseña para recuperar acceso'
    ],
    referencias: { capitulo: 4, secciones: ['4.3.2'] },
    relatedTerms: ['cap3-003', 'cap4-001'] // Scrum, Requerimientos funcionales
  },

  // CAPÍTULO 5: Modelado de Sistemas
  'UML': {
    descripcionExtendida: 'Unified Modeling Language - Lenguaje estándar de modelado visual para especificar, visualizar, construir y documentar sistemas de software. Incluye diagramas estructurales (clases, componentes, despliegue) y de comportamiento (casos de uso, secuencia, estados, actividades). Independiente de metodología.',
    keywords: ['uml', 'modelado', 'diagramas', 'clases', 'casos de uso', 'secuencia', 'visual', 'omg'],
    ejemplos: [
      'Diagrama de clases para sistema de biblioteca',
      'Diagrama de secuencia para flujo de login',
      'Diagrama de despliegue para arquitectura cloud'
    ],
    referencias: { capitulo: 5, secciones: ['5.2', '5.3', '5.4'] },
    relatedTerms: ['cap5-002', 'cap5-003', 'cap5-004'] // Diagrama de casos de uso, Diagrama de clases, Diagrama de secuencia
  },

  'Diagrama de casos de uso': {
    descripcionExtendida: 'Diagrama UML que muestra las interacciones entre usuarios (actores) y el sistema. Identifica funcionalidades del sistema desde la perspectiva del usuario. Útil para capturar requisitos funcionales de alto nivel y comunicar alcance del sistema a stakeholders.',
    keywords: ['casos de uso', 'use cases', 'actores', 'uml', 'requisitos', 'funcionalidad', 'interacciones'],
    ejemplos: [
      'Sistema bancario: actores (Cliente, Cajero) y casos de uso (Depositar, Retirar, Consultar saldo)',
      'E-commerce: actores (Comprador, Admin) y casos de uso (Buscar producto, Realizar pago, Gestionar inventario)',
      'Hospital: actores (Paciente, Doctor, Enfermera) y casos de uso (Agendar cita, Ver historial, Prescribir medicamento)'
    ],
    referencias: { capitulo: 5, secciones: ['5.2.1'] },
    relatedTerms: ['cap5-001', 'cap4-001'] // UML, Requerimientos funcionales
  },

  'Diagrama de clases': {
    descripcionExtendida: 'Diagrama UML estructural que muestra clases del sistema, sus atributos, métodos y relaciones (asociación, agregación, composición, herencia). Representa la estructura estática del sistema orientado a objetos. Base para implementación en lenguajes OOP.',
    keywords: ['clases', 'class diagram', 'uml', 'objetos', 'herencia', 'asociación', 'atributos', 'métodos', 'oop'],
    ejemplos: [
      'Modelo de dominio: Clase Pedido con relación a Cliente y LineaPedido',
      'Jerarquía de clases: Vehículo (padre) con Auto, Moto, Camión (hijos)',
      'Patrón Repository: Interfaces y clases concretas para acceso a datos'
    ],
    referencias: { capitulo: 5, secciones: ['5.3'] },
    relatedTerms: ['cap5-001', 'cap5-004'] // UML, Diagrama de objetos
  },

  'Diagrama de secuencia': {
    descripcionExtendida: 'Diagrama UML de comportamiento que muestra interacciones entre objetos en una secuencia temporal. Ilustra el flujo de mensajes entre objetos para realizar una funcionalidad específica. Útil para diseñar y documentar escenarios de uso complejos.',
    keywords: ['secuencia', 'sequence diagram', 'uml', 'mensajes', 'interacciones', 'temporal', 'lifeline', 'comportamiento'],
    ejemplos: [
      'Flujo de autenticación: Usuario → UI → Controller → AuthService → Database',
      'Proceso de compra: Cliente → Carrito → Sistema de Pago → Banco',
      'Comunicación entre microservicios: API Gateway → User Service → Order Service → Notification Service'
    ],
    referencias: { capitulo: 5, secciones: ['5.4.3'] },
    relatedTerms: ['cap5-001', 'cap5-006'] // UML, Diagrama de actividades
  },

  // CAPÍTULO 6: Diseño Arquitectónico
  'Arquitectura de software': {
    descripcionExtendida: 'Organización fundamental de un sistema, embodied en sus componentes, sus relaciones entre ellos y el ambiente, y los principios que gobiernan su diseño y evolución. Define estructura de alto nivel, patrones, decisiones técnicas clave y trade-offs de calidad (performance vs mantenibilidad).',
    keywords: ['arquitectura', 'software', 'diseño', 'componentes', 'estructura', 'patrones', 'sistema', 'high-level'],
    ejemplos: [
      'Arquitectura de microservicios para plataforma de streaming',
      'Arquitectura en capas para aplicación empresarial',
      'Arquitectura orientada a eventos para sistema de trading'
    ],
    referencias: { capitulo: 6, secciones: ['6.1', '6.2'] },
    relatedTerms: ['cap6-002', 'cap6-003', 'cap6-004'] // Patrón arquitectónico, Arquitectura en capas, MVC
  },

  'Patrón arquitectónico': {
    descripcionExtendida: 'Solución reutilizable a problemas comunes de arquitectura de software. Describe organización estructural fundamental para sistemas de software, con subsistemas predefinidos, responsabilidades y reglas para organizar relaciones entre ellos. Ejemplos: capas, MVC, microservicios, cliente-servidor.',
    keywords: ['patrón', 'arquitectónico', 'architectural pattern', 'estilo', 'diseño', 'template', 'blueprint'],
    ejemplos: [
      'Patrón MVC para aplicación web Spring Boot',
      'Patrón de capas para sistema empresarial Java EE',
      'Patrón de microservicios con Docker y Kubernetes'
    ],
    referencias: { capitulo: 6, secciones: ['6.3'] },
    relatedTerms: ['cap6-001', 'cap6-003', 'cap6-004', 'cap6-007'] // Arquitectura, Capas, MVC, Microservicios
  },

  'Arquitectura en capas': {
    descripcionExtendida: 'Patrón que organiza el sistema en capas jerárquicas, donde cada capa proporciona servicios a la capa superior y usa servicios de la capa inferior. Típicamente: Presentación, Lógica de negocio, Acceso a datos, Base de datos. Promueve separación de concerns y modularidad.',
    keywords: ['capas', 'layered', 'layers', 'n-tier', 'presentation', 'business logic', 'data access', 'separación'],
    ejemplos: [
      'App web clásica: UI → Service Layer → DAO → Database',
      'Sistema empresarial: Presentation → Business → Persistence → Database',
      'API REST: Controller → Service → Repository → DB'
    ],
    referencias: { capitulo: 6, secciones: ['6.3.1'] },
    relatedTerms: ['cap6-001', 'cap6-002'] // Arquitectura, Patrón arquitectónico
  },

  'MVC (Modelo-Vista-Controlador)': {
    descripcionExtendida: 'Patrón arquitectónico que separa aplicación en tres componentes interconectados: Modelo (datos y lógica de negocio), Vista (presentación al usuario), Controlador (maneja input del usuario y actualiza modelo/vista). Facilita desarrollo paralelo, mantenibilidad y testing.',
    keywords: ['mvc', 'modelo', 'vista', 'controlador', 'model', 'view', 'controller', 'separación', 'ui'],
    ejemplos: [
      'Aplicación web Spring MVC: JSP (Vista), Controllers, Services (Modelo)',
      'App móvil iOS: UIViewController (Controlador), Models, Views',
      'Framework Ruby on Rails con arquitectura MVC estándar'
    ],
    referencias: { capitulo: 6, secciones: ['6.3.2'] },
    relatedTerms: ['cap6-001', 'cap6-002', 'cap6-003'] // Arquitectura, Patrón, Capas
  },

  'Microservicios': {
    descripcionExtendida: 'Estilo arquitectónico donde la aplicación se estructura como colección de servicios pequeños, autónomos y desplegables independientemente. Cada microservicio implementa una capacidad de negocio específica, tiene su propia base de datos, y se comunica vía APIs (HTTP/REST, messaging). Favorece escalabilidad y despliegues independientes.',
    keywords: ['microservicios', 'microservices', 'servicios', 'distribuidos', 'api', 'rest', 'scalability', 'docker', 'containers'],
    ejemplos: [
      'E-commerce: servicios separados para Users, Products, Orders, Payments, Notifications',
      'Netflix: cientos de microservicios para streaming, recommendations, billing',
      'Uber: servicios para Riders, Drivers, Trips, Payments, Maps'
    ],
    referencias: { capitulo: 6, secciones: ['6.3.3'] },
    relatedTerms: ['cap6-001', 'cap6-002', 'cap6-008'] // Arquitectura, Patrón, SOA
  },
};

// Apply enrichments
let enrichedCount = 0;
Object.entries(enrichments).forEach(([termName, enrichment]) => {
  const term = findTermByName(termName);
  if (term) {
    if (enrichment.descripcionExtendida) {
      term.descripcionExtendida = enrichment.descripcionExtendida;
    }
    if (enrichment.keywords) {
      term.keywords = [...new Set([...term.keywords, ...enrichment.keywords])]; // Merge and dedupe
    }
    if (enrichment.ejemplos) {
      term.ejemplos = enrichment.ejemplos;
    }
    if (enrichment.referencias) {
      term.referencias = enrichment.referencias;
    }
    if (enrichment.relatedTerms) {
      term.relatedTerms = enrichment.relatedTerms;
    }
    enrichedCount++;
    console.log(`✓ Enriched: ${term.nombre} (${term.id})`);
  } else {
    console.log(`✗ Not found: ${termName}`);
  }
});

// Update version and lastUpdated
data.version = '1.1';
data.lastUpdated = new Date().toISOString().split('T')[0];

// Save back
fs.writeFileSync(glossaryPath, JSON.stringify(data, null, 2));

console.log(`\n✅ Enrichment Phase 1 complete!`);
console.log(`   Terms enriched: ${enrichedCount}/${Object.keys(enrichments).length}`);
console.log(`   Total terms: ${data.totalTerms}`);
