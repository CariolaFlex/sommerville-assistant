import type { GlossaryTerm } from '@/types';

/**
 * Encuentra términos del glosario en un texto
 */
export function findTermsInText(
  text: string,
  glossary: GlossaryTerm[]
): GlossaryTerm[] {
  const foundTerms: GlossaryTerm[] = [];
  const lowerText = text.toLowerCase();

  for (const term of glossary) {
    if (lowerText.includes(term.nombre.toLowerCase())) {
      foundTerms.push(term);
    }

    // Buscar también en keywords
    if (term.keywords) {
      for (const keyword of term.keywords) {
        if (lowerText.includes(keyword.toLowerCase())) {
          foundTerms.push(term);
          break;
        }
      }
    }
  }

  // Eliminar duplicados
  return Array.from(new Set(foundTerms));
}

export function highlightTerms(text: string, _terms: GlossaryTerm[]): string {
  // TODO: Implementar resaltado de términos basado en terms
  return text;
}
