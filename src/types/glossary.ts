export interface GlossaryIndex {
  version: string;
  lastUpdated: string;
  totalTerms: number;
  chapters: GlossaryChapter[];
  categories: string[];
  allTerms: GlossaryTerm[];
}

export interface GlossaryChapter {
  chapter: number;
  title: string;
  termCount: number;
  terms: GlossaryTerm[];
}

export interface GlossaryTerm {
  id: string;
  nombre: string;
  categoria: string;
  descripcionBreve: string;
  capitulo: number;
  keywords: string[];
  relatedTerms: string[];
}
