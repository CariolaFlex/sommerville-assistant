import type { Recommendation } from '@/types/recommendation';

export interface DiagramsData {
  decisionTree: string;
  process: string;
  architecture: string;
  timeline: string;
}

/**
 * Genera todos los diagramas Mermaid como imagenes PNG en base64 para incluir en PDF.
 *
 * IMPORTANTE: @react-pdf/renderer NO puede renderizar SVGs complejos (con CSS, markers,
 * foreignObject, etc.) generados por Mermaid. Por eso convertimos SVG -> Canvas -> PNG.
 *
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

    /**
     * Renders a single Mermaid diagram and converts it to a PNG data URI.
     *
     * Pipeline: Mermaid code -> SVG string -> DOM SVG element -> Canvas -> PNG base64
     *
     * This is necessary because @react-pdf/renderer's Image component cannot handle
     * complex SVG content (CSS styles, markers, foreignObject, etc.). By rasterizing
     * to PNG via the browser's native Canvas API, we get a pixel-perfect image that
     * react-pdf can embed without issues.
     */
    const renderOne = async (id: string, code: string): Promise<string> => {
      try {
        const uniqueId = `pdf-${id}-${timestamp}-${rand}`;

        // Clean up any previous elements with same ID
        const oldEl = document.getElementById(uniqueId);
        if (oldEl) oldEl.remove();

        // Step 1: Render Mermaid code to SVG string
        const { svg: svgString } = await mermaid.render(uniqueId, code);

        if (!svgString) {
          console.warn(`Empty SVG for diagram ${id}`);
          return '';
        }

        // Step 2: Convert SVG string to PNG via Canvas
        const pngDataUri = await svgToPngDataUri(svgString);

        // Clean up the mermaid-created element
        const mermaidEl = document.getElementById(uniqueId);
        if (mermaidEl) mermaidEl.remove();

        return pngDataUri;
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

    console.log('Diagramas renderizados exitosamente como PNG');

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
 * Converts an SVG string to a PNG data URI using the browser's Canvas API.
 *
 * This is the key function that solves the @react-pdf/renderer SVG incompatibility.
 * The browser's native SVG renderer handles all complex SVG features (CSS, markers,
 * gradients, foreignObject, etc.) that react-pdf cannot.
 *
 * Pipeline:
 * 1. Parse SVG string into a temporary DOM element to get dimensions
 * 2. Create a Blob URL from the SVG
 * 3. Load it as an Image
 * 4. Draw the Image onto a Canvas (2x scale for crisp PDF rendering)
 * 5. Export the Canvas as PNG data URI
 */
async function svgToPngDataUri(svgString: string): Promise<string> {
  if (!svgString) return '';

  return new Promise((resolve) => {
    try {
      // Clean SVG and ensure proper namespace
      let cleanSvg = svgString.trim();
      if (!cleanSvg.includes('xmlns="http://www.w3.org/2000/svg"')) {
        cleanSvg = cleanSvg.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
      }

      // Parse SVG to get dimensions
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(cleanSvg, 'image/svg+xml');
      const svgEl = svgDoc.documentElement;

      // Get dimensions from SVG attributes or viewBox
      let width = parseFloat(svgEl.getAttribute('width') || '0');
      let height = parseFloat(svgEl.getAttribute('height') || '0');

      const viewBox = svgEl.getAttribute('viewBox');
      if ((!width || !height) && viewBox) {
        const parts = viewBox.split(/[\s,]+/).map(Number);
        if (parts.length === 4) {
          width = width || parts[2];
          height = height || parts[3];
        }
      }

      // Fallback dimensions
      if (!width || width <= 0) width = 800;
      if (!height || height <= 0) height = 600;

      // Ensure SVG has explicit width/height for consistent rendering
      if (!svgEl.getAttribute('width')) {
        cleanSvg = cleanSvg.replace('<svg', `<svg width="${width}"`);
      }
      if (!svgEl.getAttribute('height')) {
        cleanSvg = cleanSvg.replace('<svg', `<svg height="${height}"`);
      }

      // Scale factor for crisp PDF rendering (2x)
      const scale = 2;
      const canvasWidth = Math.ceil(width * scale);
      const canvasHeight = Math.ceil(height * scale);

      // Cap max dimensions to avoid memory issues
      const maxDim = 4096;
      const finalWidth = Math.min(canvasWidth, maxDim);
      const finalHeight = Math.min(canvasHeight, maxDim);

      // Create SVG blob and load as image
      const svgBlob = new Blob([cleanSvg], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);

      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = finalWidth;
          canvas.height = finalHeight;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            console.warn('Cannot get canvas 2d context');
            URL.revokeObjectURL(url);
            resolve('');
            return;
          }

          // White background (important for PDF - no transparency)
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, finalWidth, finalHeight);

          // Draw the SVG image scaled to fit
          ctx.drawImage(img, 0, 0, finalWidth, finalHeight);

          // Export as PNG data URI
          const pngDataUri = canvas.toDataURL('image/png', 1.0);

          URL.revokeObjectURL(url);
          resolve(pngDataUri);
        } catch (canvasErr) {
          console.warn('Canvas rendering error:', canvasErr);
          URL.revokeObjectURL(url);
          resolve('');
        }
      };

      img.onerror = (err) => {
        console.warn('Image loading error for SVG:', err);
        URL.revokeObjectURL(url);
        resolve('');
      };

      img.src = url;
    } catch (err) {
      console.warn('svgToPngDataUri error:', err);
      resolve('');
    }
  });
}
