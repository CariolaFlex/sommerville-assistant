const fs = require('fs');
const path = require('path');

// Read the recommendations file
const filePath = path.join(__dirname, 'src', 'data', 'recommendations.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// IDs to fix
const idsToFix = ['rec-004', 'rec-005', 'rec-006', 'rec-007', 'rec-008', 'rec-009', 'rec-012', 'rec-013'];

let fixedCount = 0;

idsToFix.forEach(id => {
  if (data.recommendations[id]) {
    const rec = data.recommendations[id];
    
    // COMPLETELY REPLACE modeling field with correct structure
    rec.modeling = {
      notations: [],
      primaryFocus: rec.modeling?.primaryFocus || "",
      references: {
        chapter: rec.modeling?.references?.chapter || 0,
        sections: rec.modeling?.references?.sections || []
      }
    };

    // COMPLETELY REPLACE architecture field with correct structure
    rec.architecture = {
      patterns: [],
      style: rec.architecture?.style || "",
      qualityAttributes: {
        scalability: rec.architecture?.qualityAttributes?.scalability || "",
        maintainability: rec.architecture?.qualityAttributes?.maintainability || "",
        performance: rec.architecture?.qualityAttributes?.performance || "",
        security: rec.architecture?.qualityAttributes?.security || ""
      },
      references: {
        chapter: rec.architecture?.references?.chapter || 0,
        sections: rec.architecture?.references?.sections || []
      }
    };

    fixedCount++;
    console.log(`Fixed ${id}: ${rec.title}`);
  } else {
    console.log(`Warning: ${id} not found`);
  }
});

// Save the corrected JSON back
fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

console.log(`\nCompleted! Fixed ${fixedCount} recommendations.`);
console.log('File saved to:', filePath);
