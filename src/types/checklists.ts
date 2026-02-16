export interface ChecklistsData {
  version: string;
  lastUpdated: string;
  totalChecklists: number;
  checklists: Record<string, Checklist>;
}

export interface Checklist {
  id: string;
  name: string;
  category: string;
  description: string;
  chapter: number;
  applicableFor: string[];
  estimatedTime: string;
  sections: ChecklistSection[];
  totalItems: number;
  criticalItems: number;
  relatedRecommendations: string[];
  tags: string[];
}

export interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

export interface ChecklistItem {
  id: string;
  text: string;
  critical: boolean;
  help?: string;
  examples?: string[];
}
