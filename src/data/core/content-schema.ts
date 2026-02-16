/**
 * SCHEMAS DE VALIDACIÓN - Zod
 *
 * Valida que los archivos JSON de capítulos sigan la estructura correcta
 */

import { z } from 'zod';

/**
 * Schema de Concepto
 */
export const ConceptSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.enum([
    'fundamental-concept',
    'process-model',
    'agile-practice',
    'requirement-type',
    'requirement-technique',
    'modeling-technique',
    'uml-diagram',
    'architectural-pattern',
    'architectural-style',
    'future-chapter'
  ]),
  definition: z.string().min(10),
  whenToUse: z.string().min(10),
  whenNotToUse: z.string().min(10),
  examples: z.array(z.string()).min(1),
  relatedConcepts: z.array(z.string()),
  chapterReference: z.string().regex(/^chapter-\d+$/),
  tags: z.array(z.string()).min(1)
});

/**
 * Schema de Práctica
 */
export const PracticeSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(10),
  steps: z.array(z.string()).min(1),
  benefits: z.array(z.string()).min(1),
  challenges: z.array(z.string()).min(1),
  applicableIn: z.array(z.string()).min(1),
  priority: z.enum(['essential', 'recommended', 'optional']),
  relatedConcepts: z.array(z.string()),
  tools: z.array(z.string()).optional()
});

/**
 * Schema de Ejemplo
 */
export const ExampleSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(10),
  domain: z.string().min(1),
  illustrates: z.array(z.string()).min(1),
  codeSnippet: z.string().optional(),
  diagramId: z.string().optional()
});

/**
 * Schema de Sección (recursivo)
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SectionSchema: z.ZodType<any> = z.lazy(() => z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(10),
  subsections: z.array(SectionSchema).optional(),
  keyPoints: z.array(z.string()).min(1),
  diagrams: z.array(z.string()).optional(),
  pageNumber: z.number().int().positive().optional()
}));

/**
 * Schema de Referencia
 */
export const ReferenceSchema = z.object({
  fromConcept: z.string().min(1),
  toConcept: z.string().min(1),
  relationshipType: z.enum(['extends', 'uses', 'requires', 'alternative', 'complements', 'implements']),
  description: z.string().min(10)
});

/**
 * Schema de Metadata
 */
export const ChapterMetadataSchema = z.object({
  lastUpdated: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // YYYY-MM-DD
  extractedBy: z.string().min(1),
  completeness: z.number().min(0).max(100),
  notes: z.string().optional()
});

/**
 * Schema de Capítulo completo
 */
export const ChapterSchema = z.object({
  id: z.string().regex(/^chapter-\d+$/),
  number: z.number().int().min(1).max(10),
  title: z.string().min(1),
  description: z.string().min(10),
  sections: z.array(SectionSchema).min(1),
  concepts: z.array(ConceptSchema),
  practices: z.array(PracticeSchema),
  examples: z.array(ExampleSchema),
  references: z.array(ReferenceSchema),
  metadata: ChapterMetadataSchema
});

/**
 * Función de validación
 */
export function validateChapter(data: unknown) {
  return ChapterSchema.safeParse(data);
}

/**
 * Función de validación estricta (throw error)
 */
export function validateChapterStrict(data: unknown) {
  return ChapterSchema.parse(data);
}
