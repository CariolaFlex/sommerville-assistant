/**
 * SOMMERVILLE ASSISTANT - CONTENT MANAGER
 *
 * Sistema central de gestión de contenido del libro
 *
 * Responsabilidades:
 * - Cargar capítulos desde JSON
 * - Búsqueda de conceptos, prácticas, ejemplos
 * - Navegación entre conceptos relacionados
 * - Validar consistencia de referencias
 *
 * Uso:
 * ```typescript
 * import { contentManager } from '@/lib/content-manager';
 *
 * const chapter2 = contentManager.getChapter('chapter-2');
 * const concept = contentManager.findConcept('scrum');
 * const related = contentManager.getRelatedConcepts('scrum');
 * ```
 */

import type { Chapter, Concept, Practice } from '@/types/content';

// TODO: Descomentar cuando los archivos JSON existan
// import chapter1 from '@/data/core/chapters/chapter-1.json';
// import chapter2 from '@/data/core/chapters/chapter-2.json';
// import chapter3 from '@/data/core/chapters/chapter-3.json';
// import chapter4 from '@/data/core/chapters/chapter-4.json';
// import chapter5 from '@/data/core/chapters/chapter-5.json';
// import chapter6 from '@/data/core/chapters/chapter-6.json';

export class ContentManager {
  private chapters: Map<string, Chapter>;
  private conceptsIndex: Map<string, Concept>;
  private practicesIndex: Map<string, Practice>;

  constructor() {
    this.chapters = new Map();
    this.conceptsIndex = new Map();
    this.practicesIndex = new Map();

    // TODO: Descomentar cuando JSONs existan
    // this.loadChapters();
    // this.buildIndexes();
  }

  /**
   * Cargar todos los capítulos
   */
  private loadChapters(): void {
    // TODO: Implementar cuando JSONs existan
    // const chapters = [
    //   chapter1 as Chapter,
    //   chapter2 as Chapter,
    //   chapter3 as Chapter,
    //   chapter4 as Chapter,
    //   chapter5 as Chapter,
    //   chapter6 as Chapter,
    // ];

    // chapters.forEach(chapter => {
    //   this.chapters.set(chapter.id, chapter);
    // });

    console.log('📚 Content Manager: Chapters cargados (placeholder)');
  }

  /**
   * Construir índices para búsqueda rápida
   */
  private buildIndexes(): void {
    const chapters = Array.from(this.chapters.values());
    chapters.forEach(chapter => {
      // Indexar conceptos
      chapter.concepts.forEach(concept => {
        this.conceptsIndex.set(concept.id, concept);
      });

      // Indexar prácticas
      chapter.practices.forEach(practice => {
        this.practicesIndex.set(practice.id, practice);
      });
    });

    console.log(`📇 Índices construidos: ${this.conceptsIndex.size} conceptos, ${this.practicesIndex.size} prácticas`);
  }

  /**
   * Obtener capítulo por ID
   */
  getChapter(id: string): Chapter | undefined {
    return this.chapters.get(id);
  }

  /**
   * Obtener todos los capítulos
   */
  getAllChapters(): Chapter[] {
    return Array.from(this.chapters.values());
  }

  /**
   * Obtener todos los conceptos de un capítulo
   */
  getConceptsByChapter(chapterId: string): Concept[] {
    const chapter = this.chapters.get(chapterId);
    return chapter?.concepts || [];
  }

  /**
   * Buscar concepto por ID
   */
  findConcept(conceptId: string): Concept | undefined {
    return this.conceptsIndex.get(conceptId);
  }

  /**
   * Buscar conceptos por categoría
   */
  findConceptsByCategory(category: string): Concept[] {
    return Array.from(this.conceptsIndex.values())
      .filter(concept => concept.category === category);
  }

  /**
   * Buscar conceptos por texto (nombre o tags)
   */
  searchConcepts(query: string): Concept[] {
    const lowerQuery = query.toLowerCase();

    return Array.from(this.conceptsIndex.values())
      .filter(concept =>
        concept.name.toLowerCase().includes(lowerQuery) ||
        concept.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
        concept.definition.toLowerCase().includes(lowerQuery)
      );
  }

  /**
   * Obtener conceptos relacionados (para navegación)
   */
  getRelatedConcepts(conceptId: string): Concept[] {
    const concept = this.findConcept(conceptId);
    if (!concept) return [];

    return concept.relatedConcepts
      .map(id => this.findConcept(id))
      .filter(Boolean) as Concept[];
  }

  /**
   * Buscar práctica por ID
   */
  findPractice(practiceId: string): Practice | undefined {
    return this.practicesIndex.get(practiceId);
  }

  /**
   * Buscar prácticas aplicables a un contexto
   */
  getPracticesFor(systemType: string, methodology: string): Practice[] {
    return Array.from(this.practicesIndex.values())
      .filter(practice =>
        practice.applicableIn.includes(systemType) ||
        practice.applicableIn.includes(methodology) ||
        practice.applicableIn.includes('all')
      );
  }

  /**
   * Obtener prácticas esenciales
   */
  getEssentialPractices(): Practice[] {
    return Array.from(this.practicesIndex.values())
      .filter(practice => practice.priority === 'essential');
  }

  /**
   * 🎯 PREPARADO PARA FUTURO: Agregar nuevo capítulo
   *
   * Cuando tengas Cap. 7, 8, 9, 10:
   * 1. Crea el archivo JSON siguiendo el schema
   * 2. Importa en la parte superior
   * 3. Llama addChapter() o agrega al array en loadChapters()
   * 4. Todo el sistema lo reconocerá automáticamente
   */
  addChapter(chapter: Chapter): void {
    this.chapters.set(chapter.id, chapter);

    // Actualizar índices
    chapter.concepts.forEach(concept => {
      this.conceptsIndex.set(concept.id, concept);
    });

    chapter.practices.forEach(practice => {
      this.practicesIndex.set(practice.id, practice);
    });

    console.log(`✅ Capítulo ${chapter.id} agregado al Content Manager`);
  }

  /**
   * Validar integridad de referencias
   */
  validateReferences(): string[] {
    const errors: string[] = [];
    const chapters = Array.from(this.chapters.values());

    chapters.forEach(chapter => {
      chapter.concepts.forEach(concept => {
        // Validar conceptos relacionados existen
        concept.relatedConcepts.forEach(relatedId => {
          if (!this.conceptsIndex.has(relatedId)) {
            errors.push(`❌ ${concept.id} referencia concepto inexistente: ${relatedId}`);
          }
        });
      });

      // Validar referencias cruzadas
      chapter.references.forEach(reference => {
        if (!this.conceptsIndex.has(reference.fromConcept)) {
          errors.push(`❌ Referencia desde concepto inexistente: ${reference.fromConcept}`);
        }
        if (!this.conceptsIndex.has(reference.toConcept)) {
          errors.push(`❌ Referencia a concepto inexistente: ${reference.toConcept}`);
        }
      });
    });

    if (errors.length === 0) {
      console.log('✅ Validación de referencias: OK');
    } else {
      console.warn(`⚠️ Validación encontró ${errors.length} errores`);
    }

    return errors;
  }
}

/**
 * Singleton: Instancia global del Content Manager
 */
export const contentManager = new ContentManager();

/**
 * Helper functions para uso directo
 */
export const getChapter = (id: string) => contentManager.getChapter(id);
export const getConcept = (id: string) => contentManager.findConcept(id);
export const getRelatedConcepts = (id: string) => contentManager.getRelatedConcepts(id);
export const searchConcepts = (query: string) => contentManager.searchConcepts(query);
export const getPracticesFor = (systemType: string, methodology: string) =>
  contentManager.getPracticesFor(systemType, methodology);
