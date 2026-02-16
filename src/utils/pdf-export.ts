import type { Recommendation } from '@/types';

/**
 * Genera y descarga PDF de recomendación
 */
export async function exportRecommendationToPDF(
  recommendation: Recommendation
): Promise<void> {
  // TODO: Implementar exportación a PDF con @react-pdf/renderer
  console.log('Exporting recommendation to PDF:', recommendation.id);
}

export function generatePDFFilename(recommendation: Recommendation): string {
  const date = new Date().toISOString().split('T')[0];
  return `sommerville-recommendation-${recommendation.id}-${date}.pdf`;
}
