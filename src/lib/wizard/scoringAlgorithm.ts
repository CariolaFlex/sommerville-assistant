/**
 * SCORING ALGORITHM - FASE 2
 *
 * Algoritmo para calcular el mejor match entre respuestas del wizard
 * y las 13 recommendations disponibles
 */

// import { answerMapping } from './questions'; // Reserved for future use

// Tipo para las respuestas del wizard
export interface WizardAnswers {
  q1?: string; // project-type
  q2?: string; // criticality
  q3?: string; // project-size
  q4?: string; // team-size
  q5?: string; // timeline
  q6?: string; // requirements-stability
  q7?: string; // risk-tolerance
  q8?: string; // regulatory-compliance
  q9?: string; // team-experience
  q10?: string; // budget
}

// Tipo simplificado de Recommendation para scoring
export interface RecommendationMetadata {
  id: string;
  title: string;
  path: string[];
  pathDescription: string;
  process: {
    name: string;
  };
  methodology?: {
    name: string;
  };
}

/**
 * Calcula el score de match entre las respuestas del usuario y una recommendation
 *
 * @param answers - Respuestas del wizard del usuario
 * @param recommendation - Recommendation a evaluar
 * @returns Score de 0-100 indicando qué tan bien matchea
 */
export function calculateRecommendationScore(
  answers: WizardAnswers,
  recommendation: RecommendationMetadata
): number {
  let score = 0;
  const maxScore = 100;

  // Normalizar datos de recommendation para comparación
  const recTitle = recommendation.title.toLowerCase();
  const recPath = recommendation.path.map((p) => p.toLowerCase());
  const recDesc = recommendation.pathDescription.toLowerCase();
  const recProcessName = recommendation.process.name.toLowerCase();

  // ========================================
  // Q2: CRITICALITY (Peso: 25 puntos)
  // ========================================
  if (answers.q2) {
    if (answers.q2 === 'critical') {
      // Sistema crítico debe matchear "crítico" o "seguridad"
      if (recTitle.includes('crítico') || recDesc.includes('crítico') || recDesc.includes('seguridad')) {
        score += 25;
      } else if (recProcessName.includes('cascada') || recProcessName.includes('rup')) {
        score += 15; // Proceso formal es bueno pero no perfecto
      }
    } else if (answers.q2 === 'high') {
      // Alta importancia: transaccional, web/saas establecido
      if (recTitle.includes('transaccional') || recTitle.includes('escalando')) {
        score += 25;
      } else if (!recTitle.includes('crítico')) {
        score += 15; // Cualquier no-crítico es aceptable
      }
    } else if (answers.q2 === 'medium') {
      // Media importancia: web, saas, personal
      if (recTitle.includes('web') || recTitle.includes('saas') || recTitle.includes('personal')) {
        score += 25;
      } else if (!recTitle.includes('crítico')) {
        score += 15;
      }
    } else if (answers.q2 === 'low') {
      // Baja criticidad: startup, personal, móvil, experimental
      if (recTitle.includes('startup') || recTitle.includes('personal') || recTitle.includes('móvil')) {
        score += 25;
      } else if (recTitle.includes('web') || recTitle.includes('saas')) {
        score += 15;
      }
    }
  }

  // ========================================
  // Q6: REQUIREMENTS STABILITY (Peso: 20 puntos)
  // ========================================
  if (answers.q6) {
    if (answers.q6 === 'very-stable' || answers.q6 === 'stable') {
      // Requerimientos estables → procesos plan-driven
      if (recPath.some((p) => p.includes('estables'))) {
        score += 20;
      } else if (recProcessName.includes('cascada') || recProcessName.includes('rup')) {
        score += 15;
      } else if (recProcessName.includes('incremental')) {
        score += 10; // Aceptable
      }
    } else if (answers.q6 === 'moderate') {
      // Moderadamente volátil → procesos incrementales, scrum
      if (recProcessName.includes('incremental') || recProcessName.includes('scrum')) {
        score += 20;
      } else if (recProcessName.includes('xp') || recProcessName.includes('ágil')) {
        score += 15;
      }
    } else if (answers.q6 === 'volatile') {
      // Muy volátil → procesos ágiles (XP, Scrum, Startup)
      if (recPath.some((p) => p.includes('volátiles'))) {
        score += 20;
      } else if (recProcessName.includes('xp') || recTitle.includes('startup')) {
        score += 18;
      } else if (recProcessName.includes('scrum') || recProcessName.includes('ágil')) {
        score += 15;
      }
    }
  }

  // ========================================
  // Q4: TEAM SIZE (Peso: 15 puntos)
  // ========================================
  if (answers.q4) {
    if (answers.q4 === 'solo' || answers.q4 === 'small') {
      // Equipos pequeños (1-5) → Personal, Startup, Pequeño
      if (recPath.some((p) => p.includes('pequeño')) || recTitle.includes('personal') || recTitle.includes('individual')) {
        score += 15;
      } else if (recTitle.includes('startup')) {
        score += 12;
      } else if (recPath.some((p) => p.includes('mediano'))) {
        score += 8; // Mediano aún aceptable
      }
    } else if (answers.q4 === 'medium') {
      // Equipos medianos (6-15) → Mediano, Scrum
      if (recPath.some((p) => p.includes('mediano'))) {
        score += 15;
      } else if (recProcessName.includes('scrum')) {
        score += 12;
      } else if (!recPath.some((p) => p.includes('grande'))) {
        score += 8;
      }
    } else if (answers.q4 === 'large') {
      // Equipos grandes (15+) → Grande, Escalando
      if (recPath.some((p) => p.includes('grande')) || recTitle.includes('escalando')) {
        score += 15;
      } else if (recProcessName.includes('rup') || recProcessName.includes('cascada')) {
        score += 10;
      }
    }
  }

  // ========================================
  // Q1: PROJECT TYPE (Peso: 15 puntos)
  // ========================================
  if (answers.q1) {
    if (answers.q1 === 'web') {
      if (recTitle.includes('web') || recTitle.includes('saas')) {
        score += 15;
      } else if (recTitle.includes('transaccional')) {
        score += 10; // Transaccional suele ser web
      }
    } else if (answers.q1 === 'mobile') {
      if (recTitle.includes('móvil') || recTitle.includes('personal')) {
        score += 15;
      } else if (recTitle.includes('web')) {
        score += 8; // Web puede servir móvil también
      }
    } else if (answers.q1 === 'embedded') {
      if (recTitle.includes('embebido') || recDesc.includes('hardware')) {
        score += 15;
      } else if (recTitle.includes('crítico')) {
        score += 10; // Críticos a menudo son embebidos
      }
    } else if (answers.q1 === 'desktop') {
      if (recTitle.includes('escritorio') || recTitle.includes('personal')) {
        score += 15;
      } else if (recTitle.includes('procesamiento')) {
        score += 10; // Batch processing a menudo es desktop
      }
    } else if (answers.q1 === 'backend') {
      if (recTitle.includes('procesamiento') || recTitle.includes('transaccional')) {
        score += 15;
      } else if (recTitle.includes('web') || recTitle.includes('saas')) {
        score += 10;
      }
    }
  }

  // ========================================
  // Q5: TIMELINE (Peso: 10 puntos)
  // ========================================
  if (answers.q5) {
    if (answers.q5 === 'very-short' || answers.q5 === 'short') {
      // Timeline corto → Startup, XP, Scrum
      if (recTitle.includes('startup') || recProcessName.includes('xp')) {
        score += 10;
      } else if (recProcessName.includes('scrum') || recProcessName.includes('ágil')) {
        score += 8;
      } else if (recProcessName.includes('cascada')) {
        score -= 5; // Penalización por proceso lento
      }
    } else if (answers.q5 === 'medium') {
      // Timeline medio → Scrum, Incremental, RUP
      if (recProcessName.includes('scrum') || recProcessName.includes('incremental')) {
        score += 10;
      } else if (recProcessName.includes('rup')) {
        score += 8;
      }
    } else if (answers.q5 === 'long') {
      // Timeline largo → Cascada, RUP
      if (recProcessName.includes('cascada') || recProcessName.includes('rup')) {
        score += 10;
      } else if (recProcessName.includes('incremental')) {
        score += 8;
      }
    }
  }

  // ========================================
  // Q7: RISK TOLERANCE (Peso: 8 puntos)
  // ========================================
  if (answers.q7) {
    if (answers.q7 === 'very-low' || answers.q7 === 'low') {
      // Baja tolerancia → Cascada, RUP, Crítico
      if (recTitle.includes('crítico') || recProcessName.includes('cascada')) {
        score += 8;
      } else if (recProcessName.includes('rup')) {
        score += 6;
      }
    } else if (answers.q7 === 'high') {
      // Alta tolerancia → Startup, XP
      if (recTitle.includes('startup') || recProcessName.includes('xp')) {
        score += 8;
      } else if (recProcessName.includes('ágil')) {
        score += 6;
      }
    }
  }

  // ========================================
  // Q8: REGULATORY COMPLIANCE (Peso: 5 puntos)
  // ========================================
  if (answers.q8) {
    if (answers.q8 === 'strict') {
      // Cumplimiento estricto → Crítico, Cascada
      if (recTitle.includes('crítico') || recProcessName.includes('cascada')) {
        score += 5;
      }
    } else if (answers.q8 === 'none') {
      // Sin regulación → Startup, Personal
      if (recTitle.includes('startup') || recTitle.includes('personal')) {
        score += 5;
      }
    }
  }

  // ========================================
  // Q10: BUDGET (Peso: 2 puntos)
  // ========================================
  if (answers.q10) {
    if (answers.q10 === 'low') {
      // Presupuesto bajo → Startup, Personal, XP
      if (recTitle.includes('startup') || recTitle.includes('personal')) {
        score += 2;
      }
    } else if (answers.q10 === 'high') {
      // Presupuesto alto → Crítico, Grande, Cascada
      if (recTitle.includes('crítico') || recPath.some((p) => p.includes('grande'))) {
        score += 2;
      }
    }
  }

  // Normalizar score a 0-100
  return Math.min(Math.max(score, 0), maxScore);
}

/**
 * Encuentra la mejor recommendation basada en las respuestas del usuario
 *
 * @param answers - Respuestas del wizard del usuario
 * @param recommendations - Array de todas las recommendations disponibles
 * @returns ID de la recommendation con mayor score
 */
export function getBestRecommendation(
  answers: WizardAnswers,
  recommendations: RecommendationMetadata[]
): string {
  let bestScore = -1;
  let bestRecId = 'rec-006'; // Default: Startup (rec-006) como fallback

  recommendations.forEach((rec) => {
    const score = calculateRecommendationScore(answers, rec);

    if (score > bestScore) {
      bestScore = score;
      bestRecId = rec.id;
    }
  });

  // Si el mejor score es muy bajo (<30), usar fallback inteligente
  if (bestScore < 30) {
    // Fallback basado en criticidad
    if (answers.q2 === 'critical') {
      return 'rec-001'; // Sistema Crítico → Grande
    } else if (answers.q2 === 'low') {
      return 'rec-006'; // Startup
    } else if (answers.q4 === 'large') {
      return 'rec-004'; // Transaccional → Grande
    } else {
      return 'rec-005'; // Scrum Mediano (default más versátil)
    }
  }

  return bestRecId;
}

/**
 * Obtiene todas las recommendations ordenadas por score (para debugging)
 *
 * @param answers - Respuestas del wizard
 * @param recommendations - Array de recommendations
 * @returns Array de { id, score } ordenado por score descendente
 */
export function getAllRecommendationScores(
  answers: WizardAnswers,
  recommendations: RecommendationMetadata[]
): Array<{ id: string; title: string; score: number }> {
  const scores = recommendations.map((rec) => ({
    id: rec.id,
    title: rec.title,
    score: calculateRecommendationScore(answers, rec),
  }));

  return scores.sort((a, b) => b.score - a.score);
}
