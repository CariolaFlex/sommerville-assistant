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
 * Cada diagrama se genera SECUENCIALMENTE para evitar conflictos de Mermaid.
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

    // Configure Mermaid for PDF rendering - professional theme
    mermaid.initialize({
      startOnLoad: false,
      theme: 'base',
      securityLevel: 'loose',
      fontFamily: 'Arial, Helvetica, sans-serif',
      logLevel: 'error',
      themeVariables: {
        primaryColor: '#e0e7ff',
        primaryTextColor: '#1e293b',
        primaryBorderColor: '#6366f1',
        lineColor: '#64748b',
        secondaryColor: '#dbeafe',
        tertiaryColor: '#f0fdf4',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '14px',
      },
      flowchart: {
        curve: 'basis',
        padding: 20,
        htmlLabels: true,
        nodeSpacing: 40,
        rankSpacing: 50,
      },
      gantt: {
        titleTopMargin: 25,
        barHeight: 28,
        barGap: 6,
        topPadding: 60,
        leftPadding: 100,
        rightPadding: 40,
        gridLineStartPadding: 20,
        fontSize: 13,
        numberSectionStyles: 4,
        axisFormat: '%d/%m',
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

    // Create a hidden container for mermaid rendering
    const hiddenContainer = document.createElement('div');
    hiddenContainer.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:1200px;height:900px;visibility:hidden;';
    document.body.appendChild(hiddenContainer);

    const timestamp = Date.now();
    const rand = Math.random().toString(36).substring(2, 6);

    /**
     * Renders a single Mermaid diagram and converts it to a PNG data URI.
     * Renders SEQUENTIALLY to avoid Mermaid conflicts.
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
        const pngDataUri = await svgToPngDataUri(svgString, id);

        // Clean up the mermaid-created element
        const mermaidEl = document.getElementById(uniqueId);
        if (mermaidEl) mermaidEl.remove();

        return pngDataUri;
      } catch (err) {
        console.warn(`Error rendering diagram ${id}:`, err);
        return '';
      }
    };

    // Render SEQUENTIALLY to avoid mermaid race conditions
    const decisionTree = await renderOne('decision', decisionTreeCode);
    const process = await renderOne('process', processCode);
    const architecture = await renderOne('arch', architectureCode);
    const timeline = await renderOne('timeline', timelineCode);

    // Clean up hidden container
    document.body.removeChild(hiddenContainer);

    // Check if at least one diagram was generated
    const anySuccess = decisionTree || process || architecture || timeline;
    if (!anySuccess) {
      console.error('No se pudo generar ningun diagrama para el PDF');
      return null;
    }

    console.log('Diagramas renderizados exitosamente como PNG', {
      decisionTree: decisionTree ? `${(decisionTree.length / 1024).toFixed(0)}KB` : 'FAIL',
      process: process ? `${(process.length / 1024).toFixed(0)}KB` : 'FAIL',
      architecture: architecture ? `${(architecture.length / 1024).toFixed(0)}KB` : 'FAIL',
      timeline: timeline ? `${(timeline.length / 1024).toFixed(0)}KB` : 'FAIL',
    });

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
 * Key improvements:
 * - Forces explicit SVG dimensions with xmlns
 * - Uses proper scaling for A4 PDF page width (~480pt usable)
 * - Adds white background for PDF compatibility
 * - Handles viewBox-only SVGs correctly
 */
async function svgToPngDataUri(svgString: string, diagramType: string): Promise<string> {
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

      // Check for parse errors
      const parseError = svgDoc.querySelector('parsererror');
      if (parseError) {
        console.warn(`SVG parse error for ${diagramType}`);
        resolve('');
        return;
      }

      // Get dimensions from SVG attributes or viewBox
      let width = parseFloat(svgEl.getAttribute('width') || '0');
      let height = parseFloat(svgEl.getAttribute('height') || '0');

      const viewBox = svgEl.getAttribute('viewBox');
      if (viewBox) {
        const parts = viewBox.split(/[\s,]+/).map(Number);
        if (parts.length === 4) {
          if (!width || width <= 0) width = parts[2];
          if (!height || height <= 0) height = parts[3];
        }
      }

      // Fallback dimensions
      if (!width || width <= 0) width = 800;
      if (!height || height <= 0) height = 600;

      // Target width for A4 PDF (usable area ~480pt = ~640px at 96dpi)
      // Scale to fit within PDF page while maintaining aspect ratio
      const targetWidth = 960; // Render at higher res for quality
      const aspectRatio = height / width;
      const scaledWidth = Math.min(width, targetWidth);
      const scaledHeight = scaledWidth * aspectRatio;

      // Ensure SVG has explicit width/height for consistent rendering
      // Replace or add width/height attributes
      cleanSvg = cleanSvg.replace(
        /(<svg[^>]*?)(\s+width="[^"]*")?(\s+height="[^"]*")?/,
        `$1 width="${scaledWidth}" height="${scaledHeight}"`
      );

      // Scale factor for crisp PDF rendering (2x)
      const scale = 2;
      const canvasWidth = Math.ceil(scaledWidth * scale);
      const canvasHeight = Math.ceil(scaledHeight * scale);

      // Cap max dimensions to avoid memory issues
      const maxDim = 4096;
      const finalWidth = Math.min(canvasWidth, maxDim);
      const finalHeight = Math.min(canvasHeight, maxDim);

      // Create SVG blob and load as image
      // Use base64 encoding instead of Blob URL for better cross-browser reliability
      const svgBase64 = btoa(unescape(encodeURIComponent(cleanSvg)));
      const dataUrl = `data:image/svg+xml;base64,${svgBase64}`;

      const img = new Image();
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = finalWidth;
          canvas.height = finalHeight;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            console.warn('Cannot get canvas 2d context');
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

          console.log(`✅ Diagram ${diagramType}: ${finalWidth}x${finalHeight}px PNG generated`);
          resolve(pngDataUri);
        } catch (canvasErr) {
          console.warn('Canvas rendering error:', canvasErr);
          resolve('');
        }
      };

      img.onerror = (err) => {
        console.warn(`Image loading error for SVG (${diagramType}):`, err);
        resolve('');
      };

      // Set crossOrigin before src
      img.crossOrigin = 'anonymous';
      img.src = dataUrl;
    } catch (err) {
      console.warn('svgToPngDataUri error:', err);
      resolve('');
    }
  });
}
