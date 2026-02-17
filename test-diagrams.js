/**
 * AUTOMATED DIAGRAM TESTING SCRIPT
 *
 * Tests all 13 recommendations to verify diagrams generate correctly
 */

const fs = require('fs');
const path = require('path');

// Import diagram generators (CommonJS style for Node)
const { generateProcessDiagram } = require('./src/utils/diagram-generators/process-diagram.ts');
const { generateArchitectureDiagram } = require('./src/utils/diagram-generators/architecture-diagram.ts');
const { generateTimelineDiagram } = require('./src/utils/diagram-generators/timeline.ts');
const { generateDecisionTreeDiagram } = require('./src/utils/diagram-generators/decision-tree-diagram.ts');

// Load recommendations.json
const recommendationsPath = path.join(__dirname, 'src/data/recommendations.json');
const recommendationsData = JSON.parse(fs.readFileSync(recommendationsPath, 'utf8'));

const recommendations = [
  'rec-001', 'rec-002', 'rec-003', 'rec-004', 'rec-005',
  'rec-006', 'rec-007', 'rec-008', 'rec-009', 'rec-010',
  'rec-011', 'rec-012', 'rec-013'
];

console.log('🔍 STARTING DIAGRAM TESTING...\n');
console.log('=' .repeat(80));

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const errors = [];

recommendations.forEach((recId) => {
  console.log(`\n📊 Testing ${recId}...`);

  const rec = recommendationsData.recommendations[recId];

  if (!rec) {
    console.error(`❌ Recommendation ${recId} not found in JSON`);
    failedTests += 4;
    totalTests += 4;
    errors.push({ rec: recId, type: 'all', error: 'Recommendation not found' });
    return;
  }

  // Test 1: Decision Tree Diagram
  totalTests++;
  try {
    const decisionTree = generateDecisionTreeDiagram(rec.path, rec);
    if (decisionTree && decisionTree.length > 50) {
      console.log(`  ✅ Decision Tree: ${decisionTree.length} chars`);
      passedTests++;
    } else {
      console.log(`  ⚠️  Decision Tree: Too short (${decisionTree.length} chars)`);
      failedTests++;
      errors.push({ rec: recId, type: 'decisionTree', error: 'Output too short' });
    }
  } catch (error) {
    console.error(`  ❌ Decision Tree: ${error.message}`);
    failedTests++;
    errors.push({ rec: recId, type: 'decisionTree', error: error.message });
  }

  // Test 2: Process Diagram
  totalTests++;
  try {
    const process = generateProcessDiagram(rec.process);
    if (process && process.length > 50) {
      console.log(`  ✅ Process Flow: ${process.length} chars`);
      passedTests++;
    } else {
      console.log(`  ⚠️  Process Flow: Too short (${process.length} chars)`);
      failedTests++;
      errors.push({ rec: recId, type: 'process', error: 'Output too short' });
    }
  } catch (error) {
    console.error(`  ❌ Process Flow: ${error.message}`);
    failedTests++;
    errors.push({ rec: recId, type: 'process', error: error.message });
  }

  // Test 3: Architecture Diagram
  totalTests++;
  try {
    const architecture = generateArchitectureDiagram(rec.architecture);
    if (architecture && architecture.length > 50) {
      console.log(`  ✅ Architecture: ${architecture.length} chars`);
      passedTests++;
    } else {
      console.log(`  ⚠️  Architecture: Too short (${architecture.length} chars)`);
      failedTests++;
      errors.push({ rec: recId, type: 'architecture', error: 'Output too short' });
    }
  } catch (error) {
    console.error(`  ❌ Architecture: ${error.message}`);
    failedTests++;
    errors.push({ rec: recId, type: 'architecture', error: error.message });
  }

  // Test 4: Timeline Diagram
  totalTests++;
  try {
    const timeline = generateTimelineDiagram(rec.timeline);
    if (timeline && timeline.length > 50) {
      console.log(`  ✅ Timeline: ${timeline.length} chars`);
      passedTests++;
    } else {
      console.log(`  ⚠️  Timeline: Too short (${timeline.length} chars)`);
      failedTests++;
      errors.push({ rec: recId, type: 'timeline', error: 'Output too short' });
    }
  } catch (error) {
    console.error(`  ❌ Timeline: ${error.message}`);
    failedTests++;
    errors.push({ rec: recId, type: 'timeline', error: error.message });
  }
});

console.log('\n' + '='.repeat(80));
console.log('\n📊 TEST RESULTS SUMMARY\n');
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ✅ ${passedTests} (${Math.round((passedTests / totalTests) * 100)}%)`);
console.log(`Failed: ❌ ${failedTests} (${Math.round((failedTests / totalTests) * 100)}%)`);

if (errors.length > 0) {
  console.log('\n⚠️  ERRORS FOUND:\n');
  errors.forEach((err, idx) => {
    console.log(`${idx + 1}. ${err.rec} - ${err.type}: ${err.error}`);
  });
}

console.log('\n✅ Testing Complete!');

process.exit(failedTests > 0 ? 1 : 0);
