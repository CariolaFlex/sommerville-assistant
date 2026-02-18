import type { Recommendation } from '@/types/recommendation';

export interface DiagramsData {
  decisionTree: string;
  process: string;
  architecture: string;
  timeline: string;
}

/**
 * Genera todos los diagramas Mermaid como imagenes SVG en base64 para incluir en PDF.
 * Cada diagrama se genera individualmente para que un fallo en uno no afecte a los demas.
 */
export async function generateDiagramsForPDF(
  recommendation: Recommendation
): Promise<DiagramsData | null> {
  if (typeof window === 'undefined') {
    console.warn('generateDiagramsForPDF: Solo funciona en el cliente (navegador)');
    return null;
  }

  try {
    // Dynamic import to avoid SSR issues
    const mermaidModule = await import('mermaid');
    const mermaid = mermaidModule.default;

    // Import diagram generators
    const { generateDecisionTreeDiagram } = await import('@/utils/diagram-generators/decision-tree-diagram');
    const { generateProcessDiagram } = await import('@/utils/diagram-generators/process-diagram');
    const { generateArchitectureDiagram } = await import('@/utils/diagram-generators/architecture-diagram');
    const { generateTimelineDiagram } = await import('@/utils/diagram-generators/timeline');

    // Configure Mermaid for PDF rendering - simpler theme, no fancy fonts
    mermaid.initialize({
      startOnLoad: false,
      theme: 'neutral',
      securityLevel: 'loose',
      fontFamily: 'Arial, Helvetica, sans-serif',
      logLevel: 'error',
      flowchart: {
        curve: 'basis',
        padding: 15,
        htmlLabels: false,
      },
      gantt: {
        titleTopMargin: 25,
        barHeight: 20,
        barGap: 4,
        topPadding: 50,
        leftPadding: 75,
      },
    });

    // Generate Mermaid code for each diagram
    const decisionTreeCode = generateDecisionTreeDiagram(
      recommendation.path || [],
      recommendation
    );
    const processCode = generateProcessDiagram(recommendation.process);
    const architectureCode = generateArchitectureDiagram(recommendation.architecture);
    const timelineCode = generateTimelineDiagram(recommendation.timeline);

    console.log('Renderizando diagramas para PDF...');

    const timestamp = Date.now();
    const rand = Math.random().toString(36).substring(2, 6);

    // Render each diagram individually - if one fails, others still work
    const renderOne = async (id: string, code: string): Promise<string> => {
      try {
        // Create a temporary container for rendering
        const tempDiv = document.createElement('div');
        tempDiv.style.position = 'absolute';
        tempDiv.style.left = '-9999px';
        tempDiv.style.top = '-9999px';
        tempDiv.style.width = '800px';
        document.body.appendChild(tempDiv);

        const uniqueId = `pdf-${id}-${timestamp}-${rand}`;

        // Clean up any previous elements with same ID
        const oldEl = document.getElementById(uniqueId);
        if (oldEl) oldEl.remove();

        const { svg } = await mermaid.render(uniqueId, code);

        // Clean up temp container
        document.body.removeChild(tempDiv);

        return svgToDataUri(svg);
      } catch (err) {
        console.warn(`Error rendering diagram ${id}:`, err);
        return '';
      }
    };

    const [decisionTree, process, architecture, timeline] = await Promise.all([
      renderOne('decision', decisionTreeCode),
      renderOne('process', processCode),
      renderOne('arch', architectureCode),
      renderOne('timeline', timelineCode),
    ]);

    // Check if at least one diagram was generated
    const anySuccess = decisionTree || process || architecture || timeline;
    if (!anySuccess) {
      console.error('No se pudo generar ningun diagrama para el PDF');
      return null;
    }

    console.log('Diagramas renderizados exitosamente');

    return {
      decisionTree,
      process,
      architecture,
      timeline,
    };
  } catch (error) {
    console.error('Error generating diagrams for PDF:', error);
    return null;
  }
}

/**
 * Converts SVG string to a data URI for embedding in @react-pdf/renderer Image.
 * Uses proper encoding to handle all characters safely.
 */
function svgToDataUri(svgString: string): string {
  if (!svgString) return '';

  // Clean SVG: remove potential issues
  let cleanSvg = svgString
    .replace(/\n/g, ' ')
    .replace(/\t/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();

  // Ensure SVG has proper XML namespace
  if (!cleanSvg.includes('xmlns="http://www.w3.org/2000/svg"')) {
    cleanSvg = cleanSvg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }

  // Remove any script tags for security
  cleanSvg = cleanSvg.replace(/<script[\s\S]*?<\/script>/gi, '');

  // Encode to base64 properly handling unicode
  try {
    const encoded = btoa(unescape(encodeURIComponent(cleanSvg)));
    return `data:image/svg+xml;base64,${encoded}`;
  } catch {
    // Fallback: use encodeURIComponent for problematic SVGs
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(cleanSvg)}`;
  }
}
