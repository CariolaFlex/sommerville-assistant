export const APP_CONFIG = {
  name: 'Sommerville Assistant',
  version: '1.0.0',
  description: 'Sistema interactivo de navegación de conceptos de Ingeniería de Software',
  author: 'Sommerville Assistant Team',
};

export const CHAPTERS = {
  1: 'Introducción',
  2: 'Procesos de Software',
  3: 'Desarrollo Ágil',
  4: 'Ingeniería de Requisitos',
  5: 'Modelado de Sistemas',
  6: 'Diseño Arquitectónico',
} as const;

export const CATEGORIES = [
  'Proceso',
  'Metodología',
  'Arquitectura',
  'Modelado',
  'Requisitos',
  'Diseño',
  'Testing',
  'Gestión',
] as const;

export const DIAGRAM_THEMES = {
  default: 'default',
  dark: 'dark',
  forest: 'forest',
  neutral: 'neutral',
} as const;

export const WIZARD_STEPS = {
  SYSTEM_TYPE: 'system-type',
  CHARACTERISTICS: 'characteristics',
  SUMMARY: 'summary',
} as const;

export const ROUTES = {
  HOME: '/',
  WIZARD: '/wizard',
  RESULTS: '/results',
  GLOSSARY: '/glossary',
  TEMPLATES: '/templates',
} as const;
