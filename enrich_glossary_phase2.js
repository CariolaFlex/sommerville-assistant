const fs = require('fs');
const path = require('path');

// Read the glossary index
const glossaryPath = path.join(__dirname, 'src/data/glossary/index.json');
const data = JSON.parse(fs.readFileSync(glossaryPath, 'utf8'));

// Helper function to find term by id
function findTermById(id) {
  return data.allTerms.find(t => t.id === id);
}

// Enrichment data for terms that were not found in phase 1
const enrichments = {
  'cap2-020': { // Modelo en cascada (waterfall)
    descripcionExtendida: 'Modelo secuencial de proceso de software donde las fases fluyen hacia abajo como cascada: especificación → diseño → implementación → prueba → mantenimiento. Cada fase debe completarse antes de iniciar la siguiente. Apropiado para sistemas con requisitos bien comprendidos y estables.',
    keywords: ['cascada', 'waterfall', 'secuencial', 'plan-driven', 'fases', 'lineal', 'predictivo'],
    ejemplos: [
      'Desarrollo de sistema de control de tráfico aéreo',
      'Sistema de facturación para gobierno con requisitos fijos',
      'Software embebido para dispositivo médico regulado'
    ],
    referencias: { capitulo: 2, secciones: ['2.1.1'] },
    relatedTerms: ['cap2-011', 'cap2-001', 'cap2-021'] // Procesos dirigidos por plan, Modelo de proceso, Desarrollo incremental
  },

  'cap3-005': { // Programación extrema
    descripcionExtendida: 'Metodología ágil que lleva las prácticas de ingeniería al extremo: pair programming, TDD, integración continua diaria, releases frecuentes, diseño simple, refactorización constante. Enfatiza excelencia técnica y adaptación continua a requisitos cambiantes. Requiere cliente on-site.',
    keywords: ['xp', 'extreme programming', 'pair programming', 'tdd', 'refactoring', 'continuous integration', 'test-driven'],
    ejemplos: [
      'Startup tech con deploys diarios y TDD',
      'Equipo de 4 devs con pair programming rotativo',
      'Proyecto con cliente embebido en el equipo'
    ],
    referencias: { capitulo: 3, secciones: ['3.3'] },
    relatedTerms: ['cap3-001', 'cap3-003', 'cap1-003'] // Desarrollo ágil, Scrum, Métodos ágiles
  },

  'cap4-101': { // Casos de uso
    descripcionExtendida: 'Descripción de interacciones entre usuarios (actores) y el sistema para lograr un objetivo específico. Documentan requisitos funcionales desde la perspectiva del usuario. Incluyen: nombre, actores, precondiciones, flujo normal, flujos alternativos, postcondiciones. Base para diagramas de casos de uso UML.',
    keywords: ['casos de uso', 'use cases', 'actores', 'requisitos', 'funcionalidad', 'escenarios', 'interacciones', 'uml'],
    ejemplos: [
      'Caso de uso "Realizar compra": Cliente selecciona productos, ingresa datos de pago, sistema procesa transacción',
      'Caso de uso "Retirar efectivo": Cliente ingresa tarjeta, PIN, monto; cajero entrega efectivo',
      'Caso de uso "Registrar paciente": Recepcionista ingresa datos personales, sistema genera ID único'
    ],
    referencias: { capitulo: 4, secciones: ['4.2.3'] },
    relatedTerms: ['cap4-001', 'cap5-001', 'cap2-062'] // Requerimientos funcionales, UML
  },

  'cap5-022': { // Diagrama de clase
    descripcionExtendida: 'Diagrama UML estructural que muestra clases del sistema, sus atributos, métodos y relaciones (asociación, agregación, composición, herencia). Representa la estructura estática del sistema orientado a objetos. Base para implementación en lenguajes OOP.',
    keywords: ['clases', 'class diagram', 'uml', 'objetos', 'herencia', 'asociación', 'atributos', 'métodos', 'oop'],
    ejemplos: [
      'Modelo de dominio: Clase Pedido con relación a Cliente y LineaPedido',
      'Jerarquía de clases: Vehículo (padre) con Auto, Moto, Camión (hijos)',
      'Patrón Repository: Interfaces y clases concretas para acceso a datos'
    ],
    referencias: { capitulo: 5, secciones: ['5.3'] },
    relatedTerms: ['cap5-001', 'cap5-021'] // UML, Diagrama de secuencia
  },

  'cap6-064': { // Patrón MVC
    descripcionExtendida: 'Patrón arquitectónico que separa aplicación en tres componentes interconectados: Modelo (datos y lógica de negocio), Vista (presentación al usuario), Controlador (maneja input del usuario y actualiza modelo/vista). Facilita desarrollo paralelo, mantenibilidad y testing.',
    keywords: ['mvc', 'modelo', 'vista', 'controlador', 'model', 'view', 'controller', 'separación', 'ui'],
    ejemplos: [
      'Aplicación web Spring MVC: JSP (Vista), Controllers, Services (Modelo)',
      'App móvil iOS: UIViewController (Controlador), Models, Views',
      'Framework Ruby on Rails con arquitectura MVC estándar'
    ],
    referencias: { capitulo: 6, secciones: ['6.3.2'] },
    relatedTerms: ['cap6-001', 'cap6-002', 'cap6-069'] // Arquitectura, Patrón arquitectónico, Capas
  },

  // Bonus: enrich Modelo, Vista, Controlador
  'cap6-065': { // Modelo (MVC)
    keywords: ['modelo', 'model', 'mvc', 'datos', 'lógica de negocio', 'domain'],
    relatedTerms: ['cap6-064', 'cap6-066', 'cap6-067'] // MVC, Vista, Controlador
  },

  'cap6-066': { // Vista (MVC)
    keywords: ['vista', 'view', 'mvc', 'ui', 'presentación', 'interfaz'],
    relatedTerms: ['cap6-064', 'cap6-065', 'cap6-067'] // MVC, Modelo, Controlador
  },

  'cap6-067': { // Controlador (MVC)
    keywords: ['controlador', 'controller', 'mvc', 'input', 'navegación', 'routing'],
    relatedTerms: ['cap6-064', 'cap6-065', 'cap6-066'] // MVC, Modelo, Vista
  },
};

// Search for microservices term
const microserviceTerm = data.allTerms.find(t =>
  t.nombre.toLowerCase().includes('microservicio')
);

if (microserviceTerm) {
  enrichments[microserviceTerm.id] = {
    descripcionExtendida: 'Estilo arquitectónico donde la aplicación se estructura como colección de servicios pequeños, autónomos y desplegables independientemente. Cada microservicio implementa una capacidad de negocio específica, tiene su propia base de datos, y se comunica vía APIs (HTTP/REST, messaging). Favorece escalabilidad y despliegues independientes.',
    keywords: ['microservicios', 'microservices', 'servicios', 'distribuidos', 'api', 'rest', 'scalability', 'docker', 'containers'],
    ejemplos: [
      'E-commerce: servicios separados para Users, Products, Orders, Payments, Notifications',
      'Netflix: cientos de microservicios para streaming, recommendations, billing',
      'Uber: servicios para Riders, Drivers, Trips, Payments, Maps'
    ],
    referencias: { capitulo: 6, secciones: ['6.3.3'] },
    relatedTerms: ['cap6-001', 'cap6-002'] // Arquitectura, Patrón arquitectónico
  };
  console.log(`Found microservices term: ${microserviceTerm.id} - ${microserviceTerm.nombre}`);
}

// Apply enrichments
let enrichedCount = 0;
Object.entries(enrichments).forEach(([termId, enrichment]) => {
  const term = findTermById(termId);
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
      term.relatedTerms = [...new Set([...term.relatedTerms, ...enrichment.relatedTerms])]; // Merge and dedupe
    }
    enrichedCount++;
    console.log(`✓ Enriched: ${term.nombre} (${term.id})`);
  } else {
    console.log(`✗ Not found: ${termId}`);
  }
});

// Update version and lastUpdated
data.version = '1.2';
data.lastUpdated = new Date().toISOString().split('T')[0];

// Save back
fs.writeFileSync(glossaryPath, JSON.stringify(data, null, 2));

console.log(`\n✅ Enrichment Phase 2 complete!`);
console.log(`   Terms enriched: ${enrichedCount}/${Object.keys(enrichments).length}`);
console.log(`   Total terms: ${data.totalTerms}`);
