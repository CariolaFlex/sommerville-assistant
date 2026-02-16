/**
 * Resuelve rutas del árbol de decisiones
 */
export function resolvePath(_answers: Record<string, string | string[]>): string {
  // TODO: Implementar lógica de resolución de rutas basada en answers
  return '/results/default';
}

export function pathToString(path: string[]): string {
  return path.join(' > ');
}

export function getRecommendationId(path: string[]): string {
  return path.join('-').toLowerCase();
}
