/**
 * Types for Templates and Checklists
 * Based on templates.json structure
 */

export type TemplateCategory =
  | 'requirements'
  | 'architecture'
  | 'testing'
  | 'methodology'
  | 'management';

export type Methodology = 'all' | 'scrum' | 'xp' | 'agile' | 'waterfall' | 'rup' | string;

export type TemplateFormat = 'markdown' | 'pdf' | 'docx';

export type Difficulty = 'basic' | 'intermediate' | 'advanced';

export interface TemplateSection {
  title: string;
  subsections?: string[];
  content: string;
  instructions: string;
}

export interface Template {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  methodology: Methodology[];
  format: TemplateFormat;
  difficulty: Difficulty;
  estimatedTime: string;
  sections: TemplateSection[];
  tags: string[];
  references: {
    sommerville: string[];
    standards?: string[];
  };
  relatedTemplates: string[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  category: string;
  required: boolean;
  helpText: string;
  examples?: string[];
}

export interface Checklist {
  id: string;
  name: string;
  category: string;
  methodology: string;
  description: string;
  difficulty: Difficulty;
  items: ChecklistItem[];
  tags: string[];
  references: {
    sommerville: string[];
  };
}

export interface TemplatesData {
  version: string;
  lastUpdated: string;
  templates: Template[];
  checklists: Checklist[];
  categories: Record<TemplateCategory, string>;
}

// Filter types
export interface TemplateFilters {
  category?: TemplateCategory | 'all';
  methodology?: string | 'all';
  difficulty?: Difficulty | 'all';
  searchQuery?: string;
}

// Export type for template with checked items (for checklist viewer)
export interface ChecklistItemWithState extends ChecklistItem {
  checked: boolean;
}

export interface ChecklistWithState extends Omit<Checklist, 'items'> {
  items: ChecklistItemWithState[];
}
