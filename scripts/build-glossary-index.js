const fs = require('fs');
const path = require('path');

// Títulos de capítulos
const chapterTitles = {
  1: "Introducción a la Ingeniería de Software",
  2: "Procesos de Software",
  3: "Desarrollo Ágil de Software",
  4: "Ingeniería de Requerimientos",
  5: "Modelado de Sistemas",
  6: "Arquitectura de Software"
};

// Función para generar keywords
function generateKeywords(nombre) {
  return nombre
    .toLowerCase()
    .split(/[\s\-\/()]+/)
    .filter(word => word.length > 2)
    .slice(0, 5);
}

// Función para normalizar términos
function normalizeTerms(terms, chapterNum) {
  return terms.map((term, index) => ({
    id: `cap${chapterNum}-${String(index + 1).padStart(3, '0')}`,
    nombre: term.Nombre || term.nombre,
    categoria: term.Categoría || term.categoria || term.Categoria,
    descripcionBreve: term['Descripción breve'] || term.descripcionBreve || term['Descripcion breve'],
    capitulo: chapterNum,
    keywords: generateKeywords(term.Nombre || term.nombre),
    relatedTerms: []
  }));
}

// Leer y procesar archivos
const glossaryDir = path.join(__dirname, '../src/data/glossary');
const chapters = [];
let allTerms = [];
const categoriesSet = new Set();

console.log('📚 Procesando archivos del glosario...\n');

for (let i = 1; i <= 6; i++) {
  const filePath = path.join(glossaryDir, `chapter-${i}.json`);

  try {
    const rawData = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(rawData);

    // Verificar si el archivo tiene la estructura esperada
    const terms = Array.isArray(data) ? data : (data.terms || []);

    if (terms.length === 0) {
      console.log(`⚠️  Capítulo ${i}: Sin términos encontrados`);
      chapters.push({
        chapter: i,
        title: chapterTitles[i],
        termCount: 0,
        terms: []
      });
      continue;
    }

    const normalizedTerms = normalizeTerms(terms, i);

    // Recopilar categorías
    normalizedTerms.forEach(term => {
      if (term.categoria) {
        categoriesSet.add(term.categoria);
      }
    });

    chapters.push({
      chapter: i,
      title: chapterTitles[i],
      termCount: normalizedTerms.length,
      terms: normalizedTerms
    });

    allTerms = allTerms.concat(normalizedTerms);

    console.log(`✅ Capítulo ${i} (${chapterTitles[i]}): ${normalizedTerms.length} términos`);
  } catch (error) {
    console.error(`❌ Error procesando capítulo ${i}:`, error.message);
  }
}

// Crear índice consolidado
const index = {
  version: "1.0",
  lastUpdated: new Date().toISOString().split('T')[0],
  totalTerms: allTerms.length,
  chapters: chapters,
  categories: Array.from(categoriesSet).sort(),
  allTerms: allTerms
};

// Guardar archivo
const outputPath = path.join(glossaryDir, 'index.json');
fs.writeFileSync(outputPath, JSON.stringify(index, null, 2), 'utf8');

console.log('\n' + '='.repeat(60));
console.log('✅ index.json creado exitosamente!');
console.log('='.repeat(60));
console.log(`📊 Total de términos: ${allTerms.length}`);
console.log(`📚 Capítulos procesados: ${chapters.length}`);
console.log(`🏷️  Categorías únicas: ${categoriesSet.size}`);
console.log(`📁 Archivo guardado en: ${outputPath}`);
console.log('='.repeat(60));

if (categoriesSet.size > 0) {
  console.log('\n📋 Categorías encontradas:');
  Array.from(categoriesSet).sort().forEach((cat, idx) => {
    console.log(`   ${idx + 1}. ${cat}`);
  });
}
