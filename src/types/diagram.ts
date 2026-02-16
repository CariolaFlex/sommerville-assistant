export type DiagramType =
  | 'decision-tree'
  | 'architecture'
  | 'timeline'
  | 'use-case'
  | 'sequence'
  | 'class'
  | 'component';

export interface DiagramConfig {
  type: DiagramType;
  theme?: 'default' | 'dark' | 'forest' | 'neutral';
  width?: string;
  height?: string;
}

export interface MermaidDiagram {
  id: string;
  type: DiagramType;
  syntax: string;
  config?: DiagramConfig;
}

export interface DiagramExportOptions {
  format: 'svg' | 'png' | 'pdf';
  filename?: string;
  scale?: number;
}
