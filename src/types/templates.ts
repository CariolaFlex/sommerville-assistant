export interface TemplatesData {
  version: string;
  lastUpdated: string;
  totalTemplates: number;
  templates: Record<string, Template>;
}

export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  chapter: number;
  format: string;
  applicableFor: string[];
  difficulty: string;
  estimatedTime: string;
  content: string;
  sections: string[];
  relatedRecommendations: string[];
  tags: string[];
}
