const fs = require('fs');
const path = require('path');

// Leer el JSON completo
const jsonPath = path.join(__dirname, 'src', 'data', 'recommendations.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// rec-001: Sistema Crítico → Estables → Grande
// Metodología: Tradicional con Especificación Exhaustiva (Waterfall para sistemas críticos)
const rec001Methodology = {
  name: "Waterfall for Critical Systems (Plan-Driven with Safety Focus)",
  description: "Variante del modelo Waterfall tradicional específicamente adaptada para sistemas críticos de alta seguridad (safety-critical, mission-critical) con requisitos estables y bien definidos. Énfasis en especificación formal exhaustiva mediante estándares como IEEE 830, análisis de seguridad y confiabilidad (FMEA - Failure Mode and Effects Analysis, FTA - Fault Tree Analysis), verificación y validación formal independiente (V&V), y gestión de configuración estricta con auditorías regulatorias. Cada fase incluye revisiones formales obligatorias con stakeholders y autoridades regulatorias (FDA, FAA, DoD dependiendo del dominio). Apropiado para proyectos donde fallas pueden resultar en pérdida de vidas, daño ambiental catastrófico o pérdidas económicas masivas (ej: control de reactores nucleares, sistemas de vuelo, dispositivos médicos implantables, sistemas financieros críticos).",
  origin: {
    creator: "Adaptación de Waterfall tradicional (Royce, 1970) con estándares de seguridad de industrias reguladas",
    year: 1980,
    context: "Evolucionó en industrias de alta seguridad (nuclear, aviación, defensa, medicina) en los años 1980s cuando reguladores (NRC, FAA, FDA) comenzaron a exigir documentación formal exhaustiva y trazabilidad completa para certificación de sistemas críticos. Estándares como DO-178B (aviación software, 1982), IEC 61508 (seguridad funcional, 1998), ISO 26262 (automotriz, 2011) formalizaron procesos de desarrollo rigurosos basados en Waterfall con énfasis en análisis de riesgos, hazard analysis y verificación independiente."
  },
  principles: [
    "Especificación Formal de Requisitos exhaustiva usando estándares (IEEE 830, ISO/IEC 29148) con validación de stakeholders y revisión regulatoria",
    "Análisis de seguridad y confiabilidad obligatorio: FMEA (Failure Mode and Effects Analysis), FTA (Fault Tree Analysis), HAZOP (Hazard and Operability Study)",
    "Verificación y Validación (V&V) independiente: equipo separado del development team realiza testing formal sin conflicto de interés",
    "Gestión de Configuración estricta: control de cambios formal con CCB (Change Control Board), baseline management, traceability matrix completa",
    "Revisiones de diseño formales en cada fase: PDR (Preliminary Design Review), CDR (Critical Design Review) con aprobación de stakeholders/reguladores",
    "Certificación regulatoria: cumplimiento con estándares de seguridad (DO-178C, IEC 61508, ISO 26262) y auditorías de autoridades regulatorias (FAA, FDA, NRC)"
  ],
  differentiators: [
    "vs Waterfall estándar: Mayor énfasis en análisis de seguridad (FMEA, FTA), V&V independiente obligatoria y certificación regulatoria formal",
    "vs Ágil: Cambios están altamente restringidos después de aprobación de requisitos (change control estricto) para mantener integridad de análisis de seguridad",
    "vs Híbrido Regulado (rec-013): Puramente secuencial sin iteraciones en implementación, mientras rec-013 permite desarrollo incremental controlado"
  ],
  references: {
    chapter: "chapter-2, chapter-24",
    sections: ["2.1 Plan-driven and agile development", "2.2 The waterfall model", "24.3 Safety and dependability requirements", "24.4 Safety engineering"],
    externalResources: [
      "IEEE 830-1998: IEEE Recommended Practice for Software Requirements Specifications",
      "DO-178C: Software Considerations in Airborne Systems and Equipment Certification",
      "IEC 61508: Functional Safety of Electrical/Electronic/Programmable Electronic Safety-related Systems",
      "ISO 26262: Road vehicles - Functional safety",
      "Leveson, N. G. (2011). Engineering a Safer World: Systems Thinking Applied to Safety. MIT Press"
    ]
  }
};

// Actualizar rec-001
data.recommendations['rec-001'].methodology = rec001Methodology;

// Guardar JSON actualizado
fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');

console.log('✅ rec-001 methodology enriquecido exitosamente');
console.log('   - Name: Waterfall for Critical Systems');
console.log('   - Origin: Adaptación de Waterfall (1980s) con estándares de seguridad');
console.log('   - Principles:', rec001Methodology.principles.length);
console.log('   - Differentiators:', rec001Methodology.differentiators.length);
console.log('   - References: DO-178C, IEC 61508, ISO 26262');
