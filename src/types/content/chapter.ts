/**
 * SOMMERVILLE ASSISTANT - CONTENT TYPES
 *
 * Sistema de tipos para estructurar contenido de capítulos del libro
 * "Ingeniería de Software" de Ian Sommerville (9na edición)
 *
 * Propósito:
 * - Estructurar conocimiento de capítulos 1-6 (actual)
 * - Preparado para capítulos 7-10 (futuro)
 * - Facilitar búsqueda y relación de conceptos
 * - Validar consistencia de contenido
 */

/**
 * Capítulo completo del libro
 */
export interface Chapter {
  /** ID único del capítulo (ej: "chapter-1", "chapter-2") */
  id: string;

  /** Número del capítulo (1-10) */
  number: number;

  /** Título del capítulo */
  title: string;

  /** Descripción breve del capítulo */
  description: string;

  /** Secciones principales del capítulo */
  sections: Section[];

  /** Conceptos clave extraídos del capítulo */
  concepts: Concept[];

  /** Prácticas aplicables del capítulo */
  practices: Practice[];

  /** Ejemplos del libro */
  examples: Example[];

  /** Referencias cruzadas a otros capítulos/conceptos */
  references: Reference[];

  /** Metadata del capítulo */
  metadata: ChapterMetadata;
}

/**
 * Sección de un capítulo
 */
export interface Section {
  /** ID único de la sección */
  id: string;

  /** Título de la sección */
  title: string;

  /** Contenido resumido (markdown) */
  content: string;

  /** Sub-secciones (estructura recursiva) */
  subsections?: Section[];

  /** Puntos clave de la sección (bullets) */
  keyPoints: string[];

  /** IDs de diagramas relacionados */
  diagrams?: string[];

  /** Número de página en el libro (opcional) */
  pageNumber?: number;
}

/**
 * Concepto individual del libro
 */
export interface Concept {
  /** ID único del concepto */
  id: string;

  /** Nombre del concepto */
  name: string;

  /** Categoría del concepto */
  category: ConceptCategory;

  /** Definición completa */
  definition: string;

  /** Cuándo usar este concepto */
  whenToUse: string;

  /** Cuándo NO usar este concepto */
  whenNotToUse: string;

  /** Ejemplos concretos */
  examples: string[];

  /** IDs de conceptos relacionados */
  relatedConcepts: string[];

  /** Referencia al capítulo de origen */
  chapterReference: string;

  /** Tags para búsqueda */
  tags: string[];
}

/**
 * Categorías de conceptos
 */
export type ConceptCategory =
  | 'fundamental-concept'        // Conceptos base (Cap. 1)
  | 'process-model'              // Modelos de proceso (Cap. 2)
  | 'agile-practice'             // Prácticas ágiles (Cap. 3)
  | 'requirement-type'           // Tipos de requisitos (Cap. 4)
  | 'requirement-technique'      // Técnicas de requisitos (Cap. 4)
  | 'modeling-technique'         // Técnicas de modelado (Cap. 5)
  | 'uml-diagram'                // Diagramas UML (Cap. 5)
  | 'architectural-pattern'      // Patrones arquitectónicos (Cap. 6)
  | 'architectural-style'        // Estilos arquitectónicos (Cap. 6)
  | 'future-chapter';            // Para capítulos 7-10

/**
 * Práctica aplicable (ej: TDD, Pair Programming, etc.)
 */
export interface Practice {
  /** ID único de la práctica */
  id: string;

  /** Nombre de la práctica */
  name: string;

  /** Descripción completa */
  description: string;

  /** Pasos para implementar */
  steps: string[];

  /** Beneficios de aplicar la práctica */
  benefits: string[];

  /** Desafíos o dificultades */
  challenges: string[];

  /** Tipos de proyectos donde aplica */
  applicableIn: string[];

  /** Nivel de prioridad */
  priority: 'essential' | 'recommended' | 'optional';

  /** IDs de conceptos relacionados */
  relatedConcepts: string[];

  /** Herramientas sugeridas */
  tools?: string[];
}

/**
 * Ejemplo del libro
 */
export interface Example {
  /** ID único del ejemplo */
  id: string;

  /** Nombre del ejemplo */
  name: string;

  /** Descripción del ejemplo */
  description: string;

  /** Dominio del ejemplo (healthcare, embedded, etc.) */
  domain: string;

  /** IDs de conceptos que ilustra este ejemplo */
  illustrates: string[];

  /** Código de ejemplo (opcional) */
  codeSnippet?: string;

  /** ID de diagrama asociado (opcional) */
  diagramId?: string;
}

/**
 * Referencia cruzada entre conceptos
 */
export interface Reference {
  /** ID del concepto de origen */
  fromConcept: string;

  /** ID del concepto destino */
  toConcept: string;

  /** Tipo de relación */
  relationshipType: RelationshipType;

  /** Descripción de la relación */
  description: string;
}

/**
 * Tipos de relaciones entre conceptos
 */
export type RelationshipType =
  | 'extends'           // B extiende A (ej: Scrum extiende Agile)
  | 'uses'              // B usa A (ej: XP usa TDD)
  | 'requires'          // B requiere A (ej: CI requiere Tests Automatizados)
  | 'alternative'       // B es alternativa a A (ej: Scrum vs Kanban)
  | 'complements'       // B complementa A (ej: Scrum + XP)
  | 'implements';       // B implementa A (ej: Sprint Planning implementa Planning)

/**
 * Metadata del capítulo
 */
export interface ChapterMetadata {
  /** Fecha de última actualización */
  lastUpdated: string;

  /** Autor de la extracción */
  extractedBy: string;

  /** Completitud del capítulo (0-100%) */
  completeness: number;

  /** Notas sobre el contenido */
  notes?: string;
}
