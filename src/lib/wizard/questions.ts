/**
 * WIZARD QUESTIONS - FASE 2
 *
 * Preguntas estratégicas para mapear necesidades del usuario a recommendations
 * Basado en project_characteristics de recommendations.json
 */

export interface QuestionOption {
  value: string;
  label: string;
  description: string;
  icon: string; // Lucide icon name
}

export interface Question {
  id: string;
  text: string;
  type: 'single-choice' | 'multi-choice';
  category: string;
  helpText: string;
  options: QuestionOption[];
}

export const wizardQuestions: Question[] = [
  // Q1: Tipo de Sistema
  {
    id: 'q1',
    text: '¿Qué tipo de sistema vas a desarrollar?',
    type: 'single-choice',
    category: 'project-type',
    helpText: 'El tipo de sistema determina consideraciones arquitectónicas y tecnológicas específicas.',
    options: [
      {
        value: 'web',
        label: 'Aplicación Web',
        description: 'Sistema accesible vía navegador (SPA, SSR, PWA)',
        icon: 'Globe',
      },
      {
        value: 'mobile',
        label: 'Aplicación Móvil',
        description: 'App nativa o híbrida para iOS/Android',
        icon: 'Smartphone',
      },
      {
        value: 'embedded',
        label: 'Sistema Embebido',
        description: 'Software para hardware con restricciones (IoT, dispositivos)',
        icon: 'Cpu',
      },
      {
        value: 'desktop',
        label: 'Aplicación de Escritorio',
        description: 'Software nativo para Windows, macOS o Linux',
        icon: 'Monitor',
      },
      {
        value: 'backend',
        label: 'Sistema Backend/API',
        description: 'Servicios, APIs, microservicios, procesamiento de datos',
        icon: 'Server',
      },
    ],
  },

  // Q2: Criticidad del Sistema
  {
    id: 'q2',
    text: '¿Cuál es el nivel de criticidad de tu sistema?',
    type: 'single-choice',
    category: 'criticality',
    helpText: 'Los sistemas críticos requieren procesos más rigurosos y documentación exhaustiva.',
    options: [
      {
        value: 'critical',
        label: 'Sistema Crítico',
        description: 'Fallos pueden causar pérdidas de vidas o económicas significativas (médico, aéreo, financiero)',
        icon: 'AlertTriangle',
      },
      {
        value: 'high',
        label: 'Alta Importancia',
        description: 'Fallos impactan operaciones importantes pero no catastróficos (e-commerce, CRM)',
        icon: 'AlertCircle',
      },
      {
        value: 'medium',
        label: 'Importancia Media',
        description: 'Fallos causan inconvenientes pero son manejables (herramientas internas, dashboards)',
        icon: 'Info',
      },
      {
        value: 'low',
        label: 'Baja Criticidad',
        description: 'MVP, prototipos, proyectos experimentales o de aprendizaje',
        icon: 'Lightbulb',
      },
    ],
  },

  // Q3: Tamaño del Proyecto
  {
    id: 'q3',
    text: '¿Qué tamaño aproximado tendrá tu proyecto?',
    type: 'single-choice',
    category: 'project-size',
    helpText: 'El tamaño afecta la complejidad de procesos, herramientas y nivel de documentación necesario.',
    options: [
      {
        value: 'small',
        label: 'Pequeño',
        description: 'Menos de 10,000 líneas de código, funcionalidad limitada',
        icon: 'Package',
      },
      {
        value: 'medium',
        label: 'Mediano',
        description: '10,000 - 50,000 líneas de código, múltiples módulos',
        icon: 'Boxes',
      },
      {
        value: 'large',
        label: 'Grande',
        description: 'Más de 50,000 líneas de código, sistema complejo con múltiples subsistemas',
        icon: 'Building',
      },
    ],
  },

  // Q4: Tamaño del Equipo
  {
    id: 'q4',
    text: '¿Cuántas personas trabajarán en el desarrollo?',
    type: 'single-choice',
    category: 'team-size',
    helpText: 'Equipos pequeños se benefician de procesos ligeros; equipos grandes necesitan más coordinación.',
    options: [
      {
        value: 'solo',
        label: '1 persona (Solo)',
        description: 'Desarrollador individual',
        icon: 'User',
      },
      {
        value: 'small',
        label: '2-5 personas',
        description: 'Equipo pequeño, comunicación directa',
        icon: 'Users',
      },
      {
        value: 'medium',
        label: '6-15 personas',
        description: 'Equipo mediano, necesita coordinación',
        icon: 'Users',
      },
      {
        value: 'large',
        label: 'Más de 15 personas',
        description: 'Equipo grande, requiere procesos formales',
        icon: 'Users',
      },
    ],
  },

  // Q5: Timeline del Proyecto
  {
    id: 'q5',
    text: '¿En cuánto tiempo necesitas tener una primera versión funcional?',
    type: 'single-choice',
    category: 'timeline',
    helpText: 'Plazos cortos favorecen metodologías ágiles; plazos largos permiten planificación más detallada.',
    options: [
      {
        value: 'very-short',
        label: 'Menos de 1 mes',
        description: 'Urgente, time-to-market crítico',
        icon: 'Zap',
      },
      {
        value: 'short',
        label: '1-3 meses',
        description: 'Plazo corto, necesitas entregar rápido',
        icon: 'Clock',
      },
      {
        value: 'medium',
        label: '3-12 meses',
        description: 'Plazo moderado, tiempo para planificación',
        icon: 'Calendar',
      },
      {
        value: 'long',
        label: 'Más de 12 meses',
        description: 'Proyecto largo, planificación exhaustiva posible',
        icon: 'CalendarRange',
      },
    ],
  },

  // Q6: Estabilidad de Requerimientos
  {
    id: 'q6',
    text: '¿Qué tan claros y estables son los requerimientos del proyecto?',
    type: 'single-choice',
    category: 'requirements-stability',
    helpText: 'Requerimientos cambiantes requieren procesos flexibles; requerimientos estables permiten planificación upfront.',
    options: [
      {
        value: 'very-stable',
        label: 'Muy Estables',
        description: 'Requerimientos completamente definidos, cambios mínimos esperados (sistemas regulados)',
        icon: 'Lock',
      },
      {
        value: 'stable',
        label: 'Estables',
        description: 'Requerimientos claros pero pueden haber ajustes menores',
        icon: 'CheckCircle',
      },
      {
        value: 'moderate',
        label: 'Moderadamente Volátiles',
        description: 'Requerimientos conocidos pero se esperan cambios durante desarrollo',
        icon: 'RefreshCw',
      },
      {
        value: 'volatile',
        label: 'Muy Volátiles',
        description: 'Requerimientos inciertos, exploración continua necesaria (startup, MVP)',
        icon: 'Shuffle',
      },
    ],
  },

  // Q7: Tolerancia al Riesgo
  {
    id: 'q7',
    text: '¿Cuál es la tolerancia al riesgo del proyecto?',
    type: 'single-choice',
    category: 'risk-tolerance',
    helpText: 'Baja tolerancia al riesgo requiere verificación exhaustiva; alta tolerancia permite experimentación rápida.',
    options: [
      {
        value: 'very-low',
        label: 'Muy Baja',
        description: 'Fallos inaceptables, certificación requerida (sistemas críticos)',
        icon: 'ShieldAlert',
      },
      {
        value: 'low',
        label: 'Baja',
        description: 'Necesitas alta confiabilidad, testing exhaustivo',
        icon: 'Shield',
      },
      {
        value: 'medium',
        label: 'Media',
        description: 'Balance entre velocidad y calidad',
        icon: 'ShieldCheck',
      },
      {
        value: 'high',
        label: 'Alta',
        description: 'Puedes tolerar fallos, priorizas velocidad (MVPs, prototipos)',
        icon: 'TrendingUp',
      },
    ],
  },

  // Q8: Cumplimiento Regulatorio
  {
    id: 'q8',
    text: '¿Requieres cumplir con regulaciones o certificaciones?',
    type: 'single-choice',
    category: 'regulatory-compliance',
    helpText: 'Sistemas regulados necesitan documentación formal y procesos de auditoría rigurosos.',
    options: [
      {
        value: 'strict',
        label: 'Cumplimiento Estricto',
        description: 'Certificaciones obligatorias (ISO, FDA, aviación, salud)',
        icon: 'FileCheck',
      },
      {
        value: 'moderate',
        label: 'Cumplimiento Moderado',
        description: 'Estándares de industria recomendados (GDPR, SOC2, PCI-DSS)',
        icon: 'FileText',
      },
      {
        value: 'minimal',
        label: 'Cumplimiento Mínimo',
        description: 'Buenas prácticas generales, sin regulación específica',
        icon: 'File',
      },
      {
        value: 'none',
        label: 'Sin Regulación',
        description: 'No hay requerimientos regulatorios',
        icon: 'FileX',
      },
    ],
  },

  // Q9: Experiencia del Equipo
  {
    id: 'q9',
    text: '¿Cuál es el nivel de experiencia técnica del equipo?',
    type: 'single-choice',
    category: 'team-experience',
    helpText: 'Equipos experimentados pueden manejar procesos complejos; equipos junior necesitan guía más estructurada.',
    options: [
      {
        value: 'senior',
        label: 'Senior/Experto',
        description: 'Equipo con 5+ años de experiencia, autónomos',
        icon: 'Award',
      },
      {
        value: 'mixed',
        label: 'Mixto',
        description: 'Combinación de seniors y juniors',
        icon: 'Users',
      },
      {
        value: 'junior',
        label: 'Junior/Intermedio',
        description: 'Equipo con 0-3 años de experiencia, necesita guía',
        icon: 'GraduationCap',
      },
    ],
  },

  // Q10: Presupuesto del Proyecto
  {
    id: 'q10',
    text: '¿Cuál es el presupuesto aproximado del proyecto?',
    type: 'single-choice',
    category: 'budget',
    helpText: 'El presupuesto afecta la inversión en herramientas, recursos y nivel de planificación.',
    options: [
      {
        value: 'low',
        label: 'Presupuesto Bajo',
        description: 'Proyecto personal, startup temprana, recursos limitados',
        icon: 'DollarSign',
      },
      {
        value: 'medium',
        label: 'Presupuesto Medio',
        description: 'Proyecto profesional, presupuesto moderado',
        icon: 'DollarSign',
      },
      {
        value: 'high',
        label: 'Presupuesto Alto',
        description: 'Proyecto corporativo o crítico, recursos abundantes',
        icon: 'Banknote',
      },
    ],
  },
];

/**
 * Mapeo de valores de respuestas a valores usados en recommendations.json
 */
export const answerMapping = {
  // Q3: project-size
  projectSize: {
    small: 'Pequeño (< 10,000 LOC)',
    medium: 'Mediano (10,000-50,000 LOC)',
    large: 'Grande (50,000+ LOC)',
  },

  // Q4: team-size
  teamSize: {
    solo: '1-3 personas',
    small: '4-10 personas',
    medium: '10-30 personas',
    large: '30+ personas',
  },

  // Q5: timeline
  timeline: {
    'very-short': 'Semanas',
    short: '1-3 meses',
    medium: '3-12 meses',
    long: '12-36 meses',
  },

  // Q6: requirements-stability
  requirementsStability: {
    'very-stable': 'Muy estable',
    stable: 'Estable',
    moderate: 'Moderadamente volátil',
    volatile: 'Muy volátil',
  },

  // Q7: risk-tolerance
  riskTolerance: {
    'very-low': 'Muy bajo',
    low: 'Bajo',
    medium: 'Medio',
    high: 'Alto',
  },

  // Q8: regulatory-compliance
  regulatoryCompliance: {
    strict: 'Estricto',
    moderate: 'Moderado',
    minimal: 'Mínimo',
    none: 'Ninguno',
  },

  // Q9: budget
  budget: {
    low: 'Bajo',
    medium: 'Medio',
    high: 'Alto',
  },
};
