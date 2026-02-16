import type { Recommendation } from '@/types/recommendation';
import type { PDFCustomization } from '@/types/pdf-customization';

/**
 * Convierte SVG element a base64 data URL
 */
export async function svgToBase64(svgElement: SVGElement): Promise<string> {
  const svgString = new XMLSerializer().serializeToString(svgElement);
  const base64 = btoa(unescape(encodeURIComponent(svgString)));
  return `data:image/svg+xml;base64,${base64}`;
}

/**
 * Formatea fecha para el PDF
 */
export function formatPDFDate(date: Date = new Date()): string {
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Genera nombre de archivo para el PDF
 */
export function generatePDFFilename(
  recommendation: Recommendation,
  customization?: PDFCustomization
): string {
  const baseName =
    customization?.projectName?.toLowerCase() || recommendation.title.toLowerCase();

  const sanitized = baseName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

  const date = new Date().toISOString().split('T')[0];
  return `sommerville-${sanitized}-${date}.pdf`;
}

/**
 * Sanitiza texto para PDF (solo ASCII seguro)
 */
export function sanitizePDFText(text: string): string {
  // Mantener caracteres latinos y españoles
  return text
    .replace(/'/g, "'")
    .replace(/"/g, '"')
    .replace(/"/g, '"')
    .replace(/–/g, '-')
    .replace(/—/g, '-');
}

/**
 * Trunca texto a longitud máxima
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}
