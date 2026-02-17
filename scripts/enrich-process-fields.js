/**
 * Script to enrich the PROCESS field for all 13 recommendations
 * Based on knowledge extracted from Chapters 2-6
 *
 * Target: Increase depth from 28% to 80%+
 */

const fs = require('fs');
const path = require('path');

const RECOMMENDATIONS_PATH = path.join(__dirname, '../src/data/recommendations.json');

// Read current recommendations
const data = JSON.parse(fs.readFileSync(RECOMMENDATIONS_PATH, 'utf8'));

/**
 * Enrich process field for rec-001: Sistema Crítico → Estables → Grande
 * Process: Cascada + RUP
 */
function enrichRec001(rec) {
  rec.process = {
    ...rec.process,
    phases: [
      {
        name: "Análisis y Definición de Requerimientos",
        duration: "3-6 semanas",
        activities: [
          "Estudio de factibilidad técnica y económica",
          "Identificación de stakeholders y usuarios finales",
          "Obtención de requerimientos (entrevistas, observación, análisis de sistemas existentes)",
          "Análisis de requerimientos funcionales y no funcionales",
          "Especificación formal según IEEE 830 o estándar regulatorio aplicable",
          "Modelado de casos de uso completos",
          "Análisis de riesgos preliminar",
          "Definición de criterios de aceptación medibles"
        ],
        inputs: [
          "Solicitud del proyecto con justificación de negocio",
          "Documentación de sistemas legados (si aplica)",
          "Estándares regulatorios aplicables (FDA 21 CFR Part 11, DO-178C aviación, ISO 26262 automotriz)",
          "Restricciones de hardware conocidas"
        ],
        outputs: [
          "Documento de Especificación de Requerimientos de Software (SRS) según IEEE 830",
          "Matriz de trazabilidad de requerimientos",
          "Casos de uso formales documentados",
          "Informe de factibilidad aprobado",
          "Plan de gestión de requerimientos",
          "Registro de riesgos inicial"
        ],
        gate: {
          name: "Requirements Review Gate",
          criteria: [
            "SRS completo y aprobado por stakeholders",
            "Todos los requerimientos tienen criterios de aceptación medibles",
            "Trazabilidad completa establecida",
            "Cumplimiento regulatorio verificado",
            "Presupuesto y cronograma aprobados"
          ],
          approvers: ["Cliente/Sponsor", "Arquitecto Principal", "Gerente de Proyecto", "Equipo de Calidad", "Compliance Officer (si aplica)"]
        }
      },
      {
        name: "Diseño del Sistema y Software",
        duration: "4-8 semanas",
        activities: [
          "Diseño arquitectónico de alto nivel (estructura en capas)",
          "Diseño de interfaces entre componentes",
          "Diseño de componentes individuales (clases, módulos)",
          "Diseño de base de datos (si aplica)",
          "Diseño de seguridad y mecanismos de protección",
          "Análisis de modos de fallo (FMEA - Failure Mode and Effects Analysis)",
          "Diseño de algoritmos críticos",
          "Especificación de protocolos de comunicación",
          "Definición de estándares de codificación",
          "Planificación de pruebas (estrategia de verificación y validación)"
        ],
        inputs: [
          "SRS aprobado",
          "Matriz de trazabilidad de requerimientos",
          "Restricciones de arquitectura (hardware, rendimiento, seguridad)",
          "Estándares de diseño organizacionales"
        ],
        outputs: [
          "Documento de Diseño Arquitectónico (ADD - Architecture Design Document)",
          "Diagramas UML: Clases, Componentes, Despliegue, Secuencia",
          "Especificación de interfaces (APIs, protocolos)",
          "Documento de Diseño Detallado (DDD)",
          "Análisis FMEA completo",
          "Plan de Verificación y Validación (V&V Plan)",
          "Matriz de trazabilidad actualizada (requerimiento → diseño)"
        ],
        gate: {
          name: "Design Review Gate (Critical Design Review - CDR)",
          criteria: [
            "Arquitectura satisface todos los requerimientos no funcionales",
            "Diseño pasa peer review formal",
            "FMEA identifica y mitiga riesgos críticos",
            "Interfaces bien definidas y documentadas",
            "Compliance con estándares de diseño verificado",
            "Trazabilidad completa de requerimiento a diseño"
          ],
          approvers: ["Arquitecto Principal", "Equipo de Diseño", "Equipo de Calidad", "Gerente de Proyecto", "Cliente (si contrato lo requiere)"]
        }
      },
      {
        name: "Implementación y Prueba de Unidad",
        duration: "14-20 semanas",
        activities: [
          "Codificación siguiendo estándares definidos (MISRA C para embebidos, etc.)",
          "Desarrollo capa por capa (bottom-up o por criticidad)",
          "Pruebas unitarias exhaustivas (cobertura >95% en código crítico)",
          "Code reviews formales (inspecciones)",
          "Análisis estático de código (herramientas SAST)",
          "Gestión de configuración estricta (control de versiones)",
          "Documentación inline (comentarios, doxygen)",
          "Depuración (debugging) continua",
          "Integración continua en ambiente de desarrollo"
        ],
        inputs: [
          "Documento de Diseño Detallado aprobado",
          "Estándares de codificación",
          "Ambiente de desarrollo configurado",
          "Plan de pruebas unitarias",
          "Herramientas de análisis estático"
        ],
        outputs: [
          "Código fuente versionado y documentado",
          "Pruebas unitarias automatizadas",
          "Reportes de code reviews",
          "Reportes de análisis estático",
          "Métricas de cobertura de código",
          "Matriz de trazabilidad actualizada (diseño → código → prueba unitaria)"
        ],
        gate: {
          name: "Code Complete Gate",
          criteria: [
            "100% del código implementado según diseño",
            "Cobertura de pruebas unitarias >95% en código crítico, >80% en no crítico",
            "Cero defectos críticos abiertos",
            "Code reviews completados para 100% del código",
            "Análisis estático sin violaciones críticas",
            "Documentación inline completa"
          ],
          approvers: ["Líder Técnico", "Equipo de Calidad", "Gerente de Proyecto"]
        }
      },
      {
        name: "Integración y Prueba de Sistema",
        duration: "6-10 semanas",
        activities: [
          "Integración incremental de componentes (no Big Bang)",
          "Pruebas de integración entre componentes",
          "Pruebas de sistema completo (funcionales y no funcionales)",
          "Pruebas de regresión automatizadas",
          "Pruebas de rendimiento y stress",
          "Pruebas de seguridad y penetración",
          "Pruebas de confiabilidad (MTBF - Mean Time Between Failures)",
          "Pruebas de aceptación con cliente/usuarios",
          "Corrección de defectos encontrados",
          "Preparación de documentación de usuario"
        ],
        inputs: [
          "Código completo e integrado",
          "Plan de V&V",
          "Casos de prueba derivados de requerimientos",
          "Ambiente de pruebas (que simula producción)"
        ],
        outputs: [
          "Sistema completamente integrado y probado",
          "Reportes de pruebas (integración, sistema, aceptación)",
          "Defectos corregidos y cerrados",
          "Manual de usuario",
          "Manual de instalación y deployment",
          "Manual de mantenimiento",
          "Matriz de trazabilidad final (requerimiento → diseño → código → prueba)",
          "Certificación regulatoria (si aplica)"
        ],
        gate: {
          name: "System Acceptance Gate",
          criteria: [
            "Todas las pruebas de sistema pasan",
            "Criterios de aceptación de requerimientos satisfechos",
            "Cero defectos críticos, <5 defectos menores",
            "Rendimiento y confiabilidad dentro de especificación",
            "Compliance regulatorio verificado",
            "Cliente/Sponsor aprueba sistema",
            "Documentación completa y revisada"
          ],
          approvers: ["Cliente/Sponsor", "Equipo de Calidad", "Gerente de Proyecto", "Regulador (si aplica)"]
        }
      },
      {
        name: "Operación y Mantenimiento",
        duration: "Continuo (vida útil del sistema)",
        activities: [
          "Instalación en ambiente de producción",
          "Capacitación de usuarios y operadores",
          "Monitoreo de sistema en producción",
          "Soporte técnico 24/7 (si criticidad lo requiere)",
          "Mantenimiento correctivo (bug fixes)",
          "Mantenimiento adaptativo (cambios de entorno)",
          "Mantenimiento perfectivo (mejoras)",
          "Mantenimiento preventivo",
          "Actualizaciones de seguridad",
          "Auditorías periódicas de cumplimiento"
        ],
        inputs: [
          "Sistema aprobado y documentado",
          "Manuales de usuario y mantenimiento",
          "Plan de soporte y mantenimiento",
          "Equipo de soporte capacitado"
        ],
        outputs: [
          "Sistema operando en producción",
          "Logs de operación y monitoreo",
          "Reportes de incidentes y resoluciones",
          "Actualizaciones y parches",
          "Reportes de auditoría",
          "Lecciones aprendidas documentadas"
        ],
        gate: {
          name: "Go-Live Gate",
          criteria: [
            "Sistema instalado y configurado correctamente",
            "Usuarios capacitados",
            "Soporte disponible",
            "Plan de rollback preparado",
            "Monitoreo en tiempo real funcionando",
            "Compliance verificado en producción"
          ],
          approvers: ["Cliente/Sponsor", "Gerente de Operaciones", "Equipo de Soporte"]
        }
      }
    ],
    whenToUse: {
      systemType: [
        "Sistemas críticos de seguridad (vidas humanas en riesgo)",
        "Sistemas médicos (dispositivos implantables, equipos de diagnóstico)",
        "Sistemas aviónicos (control de vuelo, navegación)",
        "Sistemas automotrices de seguridad (frenos ABS, airbags, ADAS)",
        "Sistemas de control industrial (plantas nucleares, químicas)",
        "Sistemas ferroviarios (señalización, control de trenes)"
      ],
      requirements: [
        "Requerimientos estables y bien entendidos desde el inicio",
        "Requerimientos sujetos a regulación externa estricta",
        "Necesidad de especificación completa anticipada (contratos formales)",
        "Alta trazabilidad requerida (regulaciones)",
        "Requerimientos con poca probabilidad de cambio durante desarrollo"
      ],
      team: [
        "Equipo grande (>20 personas) que requiere coordinación formal",
        "Equipos distribuidos geográficamente",
        "Múltiples stakeholders que requieren documentación formal",
        "Organización madura con procesos establecidos"
      ],
      constraints: [
        "Desarrollo conjunto de hardware y software (co-design)",
        "Dependencias de hardware fijas",
        "Contratos de precio fijo que requieren especificación completa",
        "Necesidad de cumplimiento regulatorio estricto (FDA, FAA, ISO)"
      ]
    },
    whenNotToUse: {
      avoid: [
        "Requerimientos volátiles o mal entendidos",
        "Startups o innovación rápida (time-to-market crítico)",
        "Interfaces de usuario que necesitan experimentación",
        "Proyectos exploratorios o de investigación",
        "Sistemas donde la interfaz de usuario es el diferenciador clave",
        "Equipos pequeños ágiles (overhead excesivo)",
        "Proyectos de corta duración (<6 meses)",
        "Sistemas web/móviles con feedback de usuario continuo"
      ],
      alternatives: [
        "Si requerimientos volátiles → Modelo Espiral o Incremental",
        "Si startup/MVP → Scrum o XP",
        "Si UI crítica → Desarrollo Incremental con prototipos",
        "Si equipo pequeño → Cascada Adaptado (menos overhead)"
      ]
    },
    advantages: [
      "Documentación exhaustiva facilita mantenimiento a largo plazo (sistemas con vida útil de 10-20 años)",
      "Progreso medible y visible a través de documentos aprobados (ideal para contratos)",
      "Apropiado para equipos distribuidos (documentación compensa falta de comunicación directa)",
      "Cumplimiento regulatorio incorporado en cada fase",
      "Trazabilidad completa desde requerimiento hasta código y prueba",
      "Revisiones formales detectan errores temprano",
      "Adecuado para certificación (DO-178C, IEC 62304, ISO 26262)",
      "Reducción de riesgos en sistemas críticos (análisis exhaustivo antes de implementar)"
    ],
    disadvantages: [
      "Difícil acomodar cambios una vez iniciada una fase (cambios son costosos)",
      "Iteraciones entre fases requieren rehacer documentos (overhead significativo)",
      "Cliente ve sistema funcionando solo al final (feedback tardío)",
      "Riesgo de 'congelamiento prematuro' de especificación → sistema puede no satisfacer necesidades reales",
      "Problemas de diseño pueden descubrirse tarde (en implementación o integración)",
      "No apto para sistemas donde la experimentación es necesaria",
      "Proceso pesado para equipos pequeños o proyectos cortos",
      "Dificultad para innovar o pivotar durante el desarrollo"
    ],
    changeManagement: {
      process: "Change Control Board (CCB) Formal",
      description: "Todos los cambios a requerimientos, diseño o código después de baseline deben pasar por CCB",
      steps: [
        "1. Solicitud de Cambio (CR - Change Request) formal con justificación",
        "2. Análisis de impacto (costo, tiempo, riesgo, trazabilidad)",
        "3. Evaluación por CCB (comité multidisciplinario)",
        "4. Aprobación/rechazo formal con justificación escrita",
        "5. Si aprobado: actualizar documentos (SRS, diseño, plan de pruebas)",
        "6. Implementar cambio siguiendo proceso estándar",
        "7. Verificar que el cambio satisface la solicitud",
        "8. Actualizar matriz de trazabilidad",
        "9. Comunicar a todos los afectados"
      ],
      ccbComposition: [
        "Gerente de Proyecto (chair)",
        "Arquitecto Principal",
        "Líder de Calidad",
        "Representante del Cliente",
        "Compliance Officer (en proyectos regulados)"
      ],
      frequency: "Reuniones semanales o según demanda (cambios críticos)",
      tools: ["Jira con workflow de aprobación", "Azure DevOps Work Items", "IBM DOORS (trazabilidad)", "Sistema de gestión de configuración (Git con ramas protegidas)"]
    },
    tooling: {
      requirements: ["IBM DOORS", "Jama Connect", "Polarion Requirements", "Azure DevOps"],
      design: ["Enterprise Architect", "Visual Paradigm", "IBM Rational Software Architect", "Sparx Systems"],
      development: ["Git (control de versiones)", "Jenkins/GitLab CI (integración continua)", "SonarQube (análisis estático)", "MISRA Checker (si C/C++)"],
      testing: ["VectorCAST (pruebas embebidas)", "LDRA (cobertura de código)", "Cantata (pruebas unitarias)", "Selenium (si tiene UI web)"],
      projectManagement: ["Microsoft Project", "Jira", "Azure DevOps", "Primavera P6"],
      documentation: ["Confluence", "SharePoint", "Doxygen (código)", "LaTeX/Word (documentos formales)"]
    },
    references: {
      book: "Sommerville, Capítulo 2: Procesos de Software (Modelo en Cascada, sección 2.1.1)",
      standards: [
        "IEEE 830-1998: Especificación de Requerimientos de Software",
        "DO-178C: Software Considerations in Airborne Systems (aviación)",
        "IEC 62304: Medical Device Software Lifecycle (dispositivos médicos)",
        "ISO 26262: Road Vehicles Functional Safety (automotriz)",
        "FDA 21 CFR Part 11: Electronic Records (farmacéutica)"
      ]
    }
  };
}

// Apply enrichments
enrichRec001(data.recommendations['rec-001']);

// Update metadata
data.lastUpdated = new Date().toISOString().split('T')[0];
data.version = "2.0";

// Write enriched data
fs.writeFileSync(RECOMMENDATIONS_PATH, JSON.stringify(data, null, 2), 'utf8');

console.log('✅ Successfully enriched process field for rec-001');
console.log(`📊 Updated version to ${data.version}`);
console.log(`📅 Updated lastUpdated to ${data.lastUpdated}`);
