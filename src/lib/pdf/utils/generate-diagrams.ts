import mermaid from 'mermaid';
import { generateDecisionTreeDiagram } from '@/utils/diagram-generators/decision-tree-diagram';
import { generateProcessDiagram } from '@/utils/diagram-generators/process-diagram';
import { generateArchitectureDiagram } from '@/utils/diagram-generators/architecture-diagram';
import { generateTimelineDiagram } from '@/utils/diagram-generators/timeline';
import type { Recommendation } from '@/types/recommendation';

export interface DiagramsData {
  decisionTree: string;
  process: string;
  architecture: string;
  timeline: string;
}

/**
 * Genera todos los diagramas Mermaid como imágenes SVG en base64 para incluir en PDF
 */
export async function generateDiagramsForPDF(
  recommendation: Recommendation
): Promise<DiagramsData | null> {
  // Inicializar Mermaid solo en el cliente
  if (typeof window === 'undefined') {
    console.warn('generateDiagramsForPDF: Solo funciona en el cliente (navegador)');
    return null;
  }

  try {
    // Configurar Mermaid para renderizado
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      securityLevel: 'loose',
      fontFamily: 'Arial, sans-serif',
      logLevel: 'error',
    });

    // Generar códigos Mermaid
    const decisionTreeCode = generateDecisionTreeDiagram(
      recommendation.path || [],
      recommendation
    );
    const processCode = generateProcessDiagram(recommendation.process);
    const architectureCode = generateArchitectureDiagram(recommendation.architecture);
    const timelineCode = generateTimelineDiagram(recommendation.timeline);

    console.log('Renderizando diagramas para PDF...');

    // Renderizar a SVG con IDs únicos
    const timestamp = Date.now();
    const { svg: decisionSvg } = await mermaid.render(
      `pdf-decision-${timestamp}`,
      decisionTreeCode
    );
    const { svg: processSvg } = await mermaid.render(
      `pdf-process-${timestamp}`,
      processCode
    );
    const { svg: archSvg } = await mermaid.render(
      `pdf-architecture-${timestamp}`,
      architectureCode
    );
    const { svg: timelineSvg } = await mermaid.render(
      `pdf-timeline-${timestamp}`,
      timelineCode
    );

    console.log('Diagramas renderizados exitosamente');

    // Convertir SVG a base64
    return {
      decisionTree: svgToBase64(decisionSvg),
      process: svgToBase64(processSvg),
      architecture: svgToBase64(archSvg),
      timeline: svgToBase64(timelineSvg),
    };
  } catch (error) {
    console.error('Error generating diagrams for PDF:', error);
    return null;
  }
}

/**
 * Convierte SVG string a data URI en base64
 */
function svgToBase64(svg: string): string {
  // Limpiar el SVG de caracteres problemáticos
  const cleanSvg = svg
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Codificar a base64
  const base64 = btoa(unescape(encodeURIComponent(cleanSvg)));
  return `data:image/svg+xml;base64,${base64}`;
}
