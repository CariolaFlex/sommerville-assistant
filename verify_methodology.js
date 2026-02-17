const data = require('./src/data/recommendations.json');

console.log('📊 Verificación de campo methodology en 13 recomendaciones:\n');

let count = 0;
const ids = ['rec-001', 'rec-002', 'rec-003', 'rec-004', 'rec-005', 'rec-006', 'rec-007', 'rec-008', 'rec-009', 'rec-010', 'rec-011', 'rec-012', 'rec-013'];

ids.forEach(id => {
  const rec = data.recommendations[id];
  if (rec && rec.methodology) {
    const m = rec.methodology;
    const hasAllFields = m.name && m.description && m.origin && m.principles && m.differentiators && m.references;
    
    console.log(`✅ ${id}: ${m.name}`);
    console.log(`   - Description: ${m.description.substring(0, 60)}...`);
    console.log(`   - Origin: ${m.origin.creator} (${m.origin.year})`);
    console.log(`   - Principles: ${m.principles.length}`);
    console.log(`   - Differentiators: ${m.differentiators.length}`);
    console.log(`   - References: ${m.references.chapter}, ${m.references.externalResources.length} external`);
    
    if (hasAllFields) count++;
  } else {
    console.log(`❌ ${id}: NO METHODOLOGY`);
  }
  console.log('');
});

console.log(`\n📈 Total enriquecido: ${count}/13 (${Math.round(count/13*100)}%)`);
