const fs = require('fs');
const path = require('path');

// Read the glossary index
const glossaryPath = path.join(__dirname, 'src/data/glossary/index.json');
const data = JSON.parse(fs.readFileSync(glossaryPath, 'utf8'));

// Helper function to find term by id
function findTermById(id) {
  return data.allTerms.find(t => t.id === id);
}

// Correct enrichments with proper IDs
const correctEnrichments = {
  'cap3-038': { // Refactorización
    descripcionExtendida: 'Proceso de reestructurar código existente sin cambiar su comportamiento externo. Mejora la estructura interna, legibilidad y mantenibilidad del código. Práctica fundamental en XP y desarrollo ágil. Requiere suite de pruebas automatizadas para verificar que el comportamiento no cambia.',
    keywords: ['refactoring', 'refactorización', 'código limpio', 'clean code', 'mejora continua', 'deuda técnica'],
    ejemplos: [
      'Extraer método para eliminar código duplicado',
      'Renombrar variables para mejorar claridad',
      'Dividir clase grande en clases más cohesivas'
    ],
    referencias: { capitulo: 3, secciones: ['3.3.2'] },
    relatedTerms: ['cap3-005', 'cap3-001', 'cap3-008'] // XP, Desarrollo ágil, TDD (cuando lo encontremos)
  },

  'cap3-066': { // Integración continua
    descripcionExtendida: 'Práctica de desarrollo donde los miembros del equipo integran su trabajo frecuentemente (varias veces al día). Cada integración se verifica mediante build automatizado (incluyendo pruebas) para detectar errores de integración lo antes posible. Reduce problemas de integración y permite desarrollo rápido.',
    keywords: ['continuous integration', 'ci', 'integración continua', 'build', 'automatización', 'jenkins', 'pipeline'],
    ejemplos: [
      'Pipeline de CI que ejecuta tests en cada commit a main',
      'Jenkins construyendo y desplegando automáticamente a staging',
      'GitHub Actions ejecutando linter, tests y build en cada PR'
    ],
    referencias: { capitulo: 3, secciones: ['3.3.3'] },
    relatedTerms: ['cap3-005', 'cap3-001', 'cap3-038'] // XP, Ágil, Refactoring
  },

  'cap3-096': { // Sprint
    descripcionExtendida: 'Período de tiempo fijo (típicamente 1-4 semanas) en Scrum durante el cual se crea un incremento de producto "Terminado" usable y potencialmente liberable. Incluye planificación, trabajo de desarrollo, revisión y retrospectiva. No se permiten cambios que pongan en peligro el objetivo del sprint.',
    keywords: ['sprint', 'iteración', 'scrum', 'timebox', 'incremento', 'entrega', 'ciclo'],
    ejemplos: [
      'Sprint de 2 semanas con planning, daily standups, review y retro',
      'Sprint de 1 semana para equipo de producto con releases frecuentes',
      'Sprint de 4 semanas para desarrollo de feature compleja'
    ],
    referencias: { capitulo: 3, secciones: ['3.2.2'] },
    relatedTerms: ['cap1-008', 'cap3-001', 'cap4-036'] // Scrum, Ágil, User stories
  },
};

// Search for TDD
const tddTerms = data.allTerms.filter(t =>
  t.nombre.toLowerCase().includes('pruebas') &&
  t.nombre.toLowerCase().includes('primero') ||
  t.nombre.toLowerCase().includes('desarrollo dirigido por pruebas') ||
  t.nombre.toLowerCase().includes('test-driven') ||
  t.nombre.toLowerCase().includes('test-first')
);

console.log('TDD-related terms:');
tddTerms.forEach(t => console.log(`  ${t.id}: ${t.nombre} (Cap ${t.capitulo})`));

if (tddTerms.length > 0) {
  const tddTerm = tddTerms[0];
  correctEnrichments[tddTerm.id] = {
    descripcionExtendida: 'Práctica de desarrollo donde se escriben las pruebas antes del código de producción. Ciclo: escribir test (falla) → escribir código mínimo para pasar test → refactorizar. Asegura cobertura de pruebas, diseño testeable y especificación ejecutable de requisitos.',
    keywords: ['tdd', 'test-driven', 'desarrollo dirigido por pruebas', 'testing', 'unit tests', 'red-green-refactor', 'test-first'],
    ejemplos: [
      'Escribir test unitario para función de validación antes de implementarla',
      'Desarrollar API REST con tests de integración primero',
      'Construir lógica de negocio con ciclo TDD estricto'
    ],
    referencias: { capitulo: 3, secciones: ['3.3.4'] },
    relatedTerms: ['cap3-005', 'cap3-001', 'cap3-066', 'cap3-038'] // XP, Ágil, CI, Refactoring
  };
}

// Search for Plan-driven processes
const planDrivenTerms = data.allTerms.filter(t =>
  (t.nombre.toLowerCase().includes('plan') && t.nombre.toLowerCase().includes('dirigido')) ||
  t.nombre.toLowerCase().includes('procesos dirigidos por un plan')
);

console.log('\nPlan-driven terms:');
planDrivenTerms.forEach(t => console.log(`  ${t.id}: ${t.nombre} (Cap ${t.capitulo})`));

if (planDrivenTerms.length > 0) {
  const planTerm = planDrivenTerms.find(t => t.capitulo === 2) || planDrivenTerms[0];
  correctEnrichments[planTerm.id] = {
    descripcionExtendida: 'Procesos de software donde todas las actividades del proceso se planean por anticipado y el progreso se mide contra este plan. Requieren especificación completa de requisitos antes del desarrollo. Apropiados para sistemas con requisitos bien comprendidos y estables.',
    keywords: ['plan-driven', 'dirigidos por plan', 'planificación', 'predictivo', 'waterfall', 'tradicional', 'cascada'],
    ejemplos: [
      'Proyecto de infraestructura crítica con contrato de precio fijo',
      'Sistema regulado médico con aprobaciones en cada fase',
      'Software de defensa con requisitos contractuales rígidos'
    ],
    referencias: { capitulo: 2, secciones: ['2.1'] },
    relatedTerms: ['cap2-020', 'cap3-001', 'cap2-001'] // Cascada, Desarrollo ágil, Modelo de proceso
  };
}

// Apply enrichments
let enrichedCount = 0;
Object.entries(correctEnrichments).forEach(([termId, enrichment]) => {
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
    console.log(`\n✓ Fully enriched: ${term.nombre} (${term.id})`);
  } else {
    console.log(`\n✗ Not found: ${termId}`);
  }
});

// Update version and lastUpdated
data.version = '1.4';
data.lastUpdated = new Date().toISOString().split('T')[0];

// Save back
fs.writeFileSync(glossaryPath, JSON.stringify(data, null, 2));

console.log(`\n✅ Enrichment Phase 4 complete!`);
console.log(`   Terms enriched: ${enrichedCount}`);
console.log(`   Total terms in glossary: ${data.totalTerms}`);

// Final stats
const fullyEnriched = data.allTerms.filter(t =>
  t.descripcionExtendida || t.ejemplos || (t.relatedTerms && t.relatedTerms.length > 0)
).length;
const withDescripcion = data.allTerms.filter(t => t.descripcionExtendida).length;
const withEjemplos = data.allTerms.filter(t => t.ejemplos && t.ejemplos.length > 0).length;
const withRelations = data.allTerms.filter(t => t.relatedTerms && t.relatedTerms.length > 0).length;

console.log(`\n📊 Enrichment Statistics:`);
console.log(`   Terms with any enrichment: ${fullyEnriched} (${((fullyEnriched / data.totalTerms) * 100).toFixed(1)}%)`);
console.log(`   Terms with extended description: ${withDescripcion}`);
console.log(`   Terms with examples: ${withEjemplos}`);
console.log(`   Terms with relations: ${withRelations}`);
