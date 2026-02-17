const fs = require('fs');
const path = require('path');

// Read the glossary index
const glossaryPath = path.join(__dirname, 'src/data/glossary/index.json');
const data = JSON.parse(fs.readFileSync(glossaryPath, 'utf8'));

// Helper function to find term by id
function findTermById(id) {
  return data.allTerms.find(t => t.id === id);
}

// Additional fundamental terms to enrich
const additionalEnrichments = {
  'cap2-021': { // Desarrollo incremental - already enriched in phase 1, but let's add relations
    relatedTerms: ['cap3-001', 'cap2-001', 'cap3-003', 'cap2-020'] // Desarrollo ágil, Scrum, Cascada
  },

  'cap4-077': { // Modelo en espiral - already enriched, add more relations
    relatedTerms: ['cap2-001', 'cap2-021', 'cap2-020'] // Modelo de proceso, Incremental, Cascada
  },

  'cap1-008': { // Scrum - already enriched, complete relations
    relatedTerms: ['cap3-001', 'cap3-005', 'cap1-003', 'cap4-036', 'cap2-021'] // Ágil, XP, Métodos ágiles, User stories, Incremental
  },

  'cap2-097': { // Requerimientos funcionales - add more relations
    relatedTerms: ['cap2-098', 'cap4-101', 'cap4-036'] // No funcionales, Casos de uso, User stories
  },

  'cap2-098': { // Requerimientos no funcionales - add more relations
    relatedTerms: ['cap2-097', 'cap6-001'] // Funcionales, Arquitectura
  },

  'cap4-036': { // Historias de usuario - complete relations
    relatedTerms: ['cap3-003', 'cap2-097', 'cap3-001'] // Scrum, Req funcionales, Ágil
  },

  'cap1-010': { // UML - complete relations
    relatedTerms: ['cap5-022', 'cap5-021', 'cap4-101', 'cap2-062'] // Diagrama clases, secuencia, casos de uso
  },

  'cap5-021': { // Diagrama de secuencia - complete relations
    relatedTerms: ['cap5-001', 'cap5-022', 'cap4-101'] // UML, Clases, Casos de uso
  },

  'cap3-094': { // Arquitectura de software - complete relations
    relatedTerms: ['cap6-045', 'cap6-069', 'cap6-064', 'cap2-098'] // Patrón, Capas, MVC, NFR
  },

  'cap6-045': { // Patrón arquitectónico - complete relations
    relatedTerms: ['cap6-001', 'cap6-069', 'cap6-064'] // Arquitectura, Capas, MVC
  },

  'cap6-069': { // Arquitectura en capas - complete relations
    relatedTerms: ['cap6-001', 'cap6-045', 'cap6-064'] // Arquitectura, Patrón, MVC
  },
};

// Additional important terms from each chapter to enrich
const moreTerms = {
  // RUP
  'cap2-001': {
    descripcionExtendida: 'Representación abstracta de un proceso de software que presenta una vista de ese proceso. Los modelos de proceso pueden incluir actividades, artefactos, roles y restricciones. Ejemplos: modelo en cascada, desarrollo incremental, modelo en espiral, RUP, Scrum.',
    keywords: ['modelo', 'proceso', 'software', 'sdlc', 'metodología', 'framework'],
    ejemplos: [
      'Modelo en cascada para proyecto con requisitos estables',
      'Modelo iterativo para sistema con cambios frecuentes',
      'Modelo ágil Scrum para desarrollo de producto'
    ],
    referencias: { capitulo: 2, secciones: ['2.1'] },
    relatedTerms: ['cap2-020', 'cap2-021', 'cap4-077', 'cap1-008', 'cap3-005'] // Cascada, Incremental, Espiral, Scrum, XP
  },

  // Procesos dirigidos por plan
  'cap2-011': {
    descripcionExtendida: 'Procesos de software donde todas las actividades del proceso se planean por anticipado y el progreso se mide contra este plan. Requieren especificación completa de requisitos antes del desarrollo. Apropiados para sistemas con requisitos bien comprendidos y estables.',
    keywords: ['plan-driven', 'dirigidos por plan', 'planificación', 'predictivo', 'waterfall', 'tradicional'],
    ejemplos: [
      'Proyecto de infraestructura crítica con contrato de precio fijo',
      'Sistema regulado médico con aprobaciones en cada fase',
      'Software de defensa con requisitos contractuales rígidos'
    ],
    referencias: { capitulo: 2, secciones: ['2.1'] },
    relatedTerms: ['cap2-020', 'cap3-001', 'cap2-001'] // Cascada, Desarrollo ágil, Modelo de proceso
  },

  // Desarrollo ágil
  'cap3-001': {
    descripcionExtendida: 'Enfoque de desarrollo de software basado en desarrollo iterativo e incremental donde los requisitos y soluciones evolucionan mediante colaboración entre equipos auto-organizados y multifuncionales. Prioriza individuos e interacciones, software funcionando, colaboración con cliente, y respuesta al cambio.',
    keywords: ['ágil', 'agile', 'iterativo', 'incremental', 'scrum', 'xp', 'kanban', 'adaptativo'],
    ejemplos: [
      'Equipo Scrum entregando incremento cada 2 semanas',
      'Startup usando Kanban para flujo continuo',
      'Equipo de producto usando XP con TDD y pair programming'
    ],
    referencias: { capitulo: 3, secciones: ['3.1', '3.2'] },
    relatedTerms: ['cap1-008', 'cap3-005', 'cap2-021', 'cap2-011', 'cap4-036'] // Scrum, XP, Incremental, Plan-driven, User stories
  },

  // Refactorización
  'cap3-006': {
    descripcionExtendida: 'Proceso de reestructurar código existente sin cambiar su comportamiento externo. Mejora la estructura interna, legibilidad y mantenibilidad del código. Práctica fundamental en XP y desarrollo ágil. Requiere suite de pruebas automatizadas para verificar que el comportamiento no cambia.',
    keywords: ['refactoring', 'refactorización', 'código limpio', 'clean code', 'mejora continua', 'deuda técnica'],
    ejemplos: [
      'Extraer método para eliminar código duplicado',
      'Renombrar variables para mejorar claridad',
      'Dividir clase grande en clases más cohesivas'
    ],
    referencias: { capitulo: 3, secciones: ['3.3.2'] },
    relatedTerms: ['cap3-005', 'cap3-001'] // XP, Desarrollo ágil
  },

  // Integración continua
  'cap3-007': {
    descripcionExtendida: 'Práctica de desarrollo donde los miembros del equipo integran su trabajo frecuentemente (varias veces al día). Cada integración se verifica mediante build automatizado (incluyendo pruebas) para detectar errores de integración lo antes posible. Reduce problemas de integración y permite desarrollo rápido.',
    keywords: ['continuous integration', 'ci', 'integración continua', 'build', 'automatización', 'jenkins', 'pipeline'],
    ejemplos: [
      'Pipeline de CI que ejecuta tests en cada commit a main',
      'Jenkins construyendo y desplegando automáticamente a staging',
      'GitHub Actions ejecutando linter, tests y build en cada PR'
    ],
    referencias: { capitulo: 3, secciones: ['3.3.3'] },
    relatedTerms: ['cap3-005', 'cap3-001', 'cap3-006'] // XP, Ágil, Refactoring
  },

  // Test-driven development
  'cap3-008': {
    descripcionExtendida: 'Práctica de desarrollo donde se escriben las pruebas antes del código de producción. Ciclo: escribir test (falla) → escribir código mínimo para pasar test → refactorizar. Asegura cobertura de pruebas, diseño testeable y especificación ejecutable de requisitos.',
    keywords: ['tdd', 'test-driven', 'desarrollo dirigido por pruebas', 'testing', 'unit tests', 'red-green-refactor'],
    ejemplos: [
      'Escribir test unitario para función de validación antes de implementarla',
      'Desarrollar API REST con tests de integración primero',
      'Construir lógica de negocio con ciclo TDD estricto'
    ],
    referencias: { capitulo: 3, secciones: ['3.3.4'] },
    relatedTerms: ['cap3-005', 'cap3-001', 'cap3-007'] // XP, Ágil, CI
  },

  // Sprint
  'cap3-004': {
    descripcionExtendida: 'Período de tiempo fijo (típicamente 1-4 semanas) en Scrum durante el cual se crea un incremento de producto "Terminado" usable y potencialmente liberable. Incluye planificación, trabajo de desarrollo, revisión y retrospectiva. No se permiten cambios que pongan en peligro el objetivo del sprint.',
    keywords: ['sprint', 'iteración', 'scrum', 'timebox', 'incremento', 'entrega'],
    ejemplos: [
      'Sprint de 2 semanas con planning, daily standups, review y retro',
      'Sprint de 1 semana para equipo de producto con releases frecuentes',
      'Sprint de 4 semanas para desarrollo de feature compleja'
    ],
    referencias: { capitulo: 3, secciones: ['3.2.2'] },
    relatedTerms: ['cap1-008', 'cap3-001', 'cap4-036'] // Scrum, Ágil, User stories
  },
};

// Apply enrichments
let enrichedCount = 0;

// First apply additional enrichments (just relations)
Object.entries(additionalEnrichments).forEach(([termId, enrichment]) => {
  const term = findTermById(termId);
  if (term && enrichment.relatedTerms) {
    term.relatedTerms = [...new Set([...term.relatedTerms, ...enrichment.relatedTerms])];
    enrichedCount++;
    console.log(`✓ Added relations: ${term.nombre} (${term.id}) - now has ${term.relatedTerms.length} relations`);
  }
});

// Then apply full enrichments for new terms
Object.entries(moreTerms).forEach(([termId, enrichment]) => {
  const term = findTermById(termId);
  if (term) {
    if (enrichment.descripcionExtendida) {
      term.descripcionExtendida = enrichment.descripcionExtendida;
    }
    if (enrichment.keywords) {
      term.keywords = [...new Set([...term.keywords, ...enrichment.keywords])];
    }
    if (enrichment.ejemplos) {
      term.ejemplos = enrichment.ejemplos;
    }
    if (enrichment.referencias) {
      term.referencias = enrichment.referencias;
    }
    if (enrichment.relatedTerms) {
      term.relatedTerms = [...new Set([...term.relatedTerms, ...enrichment.relatedTerms])];
    }
    enrichedCount++;
    console.log(`✓ Fully enriched: ${term.nombre} (${term.id})`);
  } else {
    console.log(`✗ Not found: ${termId}`);
  }
});

// Update version and lastUpdated
data.version = '1.3';
data.lastUpdated = new Date().toISOString().split('T')[0];

// Save back
fs.writeFileSync(glossaryPath, JSON.stringify(data, null, 2));

console.log(`\n✅ Enrichment Phase 3 complete!`);
console.log(`   Terms enriched/updated: ${enrichedCount}`);
console.log(`   Total terms in glossary: ${data.totalTerms}`);

// Count enriched terms
const fullyEnriched = data.allTerms.filter(t =>
  t.descripcionExtendida || t.ejemplos || (t.relatedTerms && t.relatedTerms.length > 0)
).length;
console.log(`   Terms with enrichments: ${fullyEnriched} (${((fullyEnriched / data.totalTerms) * 100).toFixed(1)}%)`);

// Count terms with relations
const withRelations = data.allTerms.filter(t => t.relatedTerms && t.relatedTerms.length > 0).length;
console.log(`   Terms with relations: ${withRelations} (${((withRelations / data.totalTerms) * 100).toFixed(1)}%)`);
