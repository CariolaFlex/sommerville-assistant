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

    // Configure Mermaid for PDF rendering
    // CRITICAL: htmlLabels must be FALSE for PDF pipeline because foreignObject
    // elements cause cross-origin tainting when drawn to canvas
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
        htmlLabels: false, // MUST be false for canvas rendering (no foreignObject)
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
    // Strip HTML tags for PDF (htmlLabels: false mode)
    // <br/> becomes " - " separator since \n doesn't work in Mermaid node text
    const stripHtml = (code: string): string =>
      code.replace(/<b>/g, '').replace(/<\/b>/g, '').replace(/<br\s*\/?>/g, ' - ');

    const decisionTreeCode = stripHtml(
      generateDecisionTreeDiagram(recommendation.path || [], recommendation)
    );
    const processCode = stripHtml(generateProcessDiagram(recommendation.process));
    const architectureCode = stripHtml(generateArchitectureDiagram(recommendation.architecture));
    const timelineCode = generateTimelineDiagram(recommendation.timeline); // Gantt doesn't use HTML

    console.log('Renderizando diagramas para PDF...');
    console.log('Timeline code:', timelineCode);

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

        console.log(`[PDF] Rendering diagram: ${id}`);

        // Step 1: Render Mermaid code to SVG string
        const { svg: svgString } = await mermaid.render(uniqueId, code);

        if (!svgString) {
          console.warn(`[PDF] Empty SVG for diagram ${id}`);
          return '';
        }

        console.log(`[PDF] SVG generated for ${id}: ${svgString.length} chars`);

        // Step 2: Convert SVG string to PNG via Canvas
        const pngDataUri = await svgToPngDataUri(svgString, id);

        // Clean up the mermaid-created element
        const mermaidEl = document.getElementById(uniqueId);
        if (mermaidEl) mermaidEl.remove();

        if (pngDataUri) {
          console.log(`[PDF] PNG generated for ${id}: ${(pngDataUri.length / 1024).toFixed(0)}KB`);
        } else {
          console.warn(`[PDF] FAILED to generate PNG for ${id}`);
        }

        return pngDataUri;
      } catch (err) {
        console.error(`[PDF] Error rendering diagram ${id}:`, err);
        return '';
      }
    };

    // Render SEQUENTIALLY to avoid mermaid race conditions
    const decisionTree = await renderOne('decision', decisionTreeCode);
    const process = await renderOne('process', processCode);
    const architecture = await renderOne('arch', architectureCode);
    const timeline = await renderOne('timeline', timelineCode);

    // Check if at least one diagram was generated
    const anySuccess = decisionTree || process || architecture || timeline;
    if (!anySuccess) {
      console.error('[PDF] No se pudo generar ningun diagrama para el PDF');
      return null;
    }

    console.log('[PDF] Resumen de diagramas:', {
      decisionTree: decisionTree ? 'OK' : 'FAIL',
      process: process ? 'OK' : 'FAIL',
      architecture: architecture ? 'OK' : 'FAIL',
      timeline: timeline ? 'OK' : 'FAIL',
    });

    return { decisionTree, process, architecture, timeline };
  } catch (error) {
    console.error('[PDF] Error generating diagrams:', error);
    return null;
  }
}

/**
 * Converts an SVG string to a PNG data URI using the browser's Canvas API.
 *
 * Pipeline:
 * 1. Parse SVG to extract viewBox/width/height dimensions
 * 2. Create a self-contained SVG with explicit dimensions and xmlns
 * 3. Encode as base64 data URL (NOT Blob URL - more reliable)
 * 4. Load as Image, draw to Canvas with white background
 * 5. Export Canvas as PNG data URI
 */
async function svgToPngDataUri(svgString: string, diagramType: string): Promise<string> {
  if (!svgString) return '';

  return new Promise((resolve) => {
    try {
      // Step 1: Parse SVG to get dimensions
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgString, 'image/svg+xml');

      // Check for parse errors
      const parseError = doc.querySelector('parsererror');
      if (parseError) {
        console.warn(`[SVG2PNG] Parse error for ${diagramType}:`, parseError.textContent);
        resolve('');
        return;
      }

      const svgEl = doc.documentElement;

      // Extract dimensions
      let width = 0;
      let height = 0;

      // Try viewBox first (most reliable)
      const viewBox = svgEl.getAttribute('viewBox');
      if (viewBox) {
        const parts = viewBox.split(/[\s,]+/).map(Number);
        if (parts.length === 4 && !isNaN(parts[2]) && !isNaN(parts[3])) {
          width = parts[2];
          height = parts[3];
        }
      }

      // Try explicit width/height attributes
      if (!width) {
        const w = svgEl.getAttribute('width');
        if (w) width = parseFloat(w) || 0;
      }
      if (!height) {
        const h = svgEl.getAttribute('height');
        if (h) height = parseFloat(h) || 0;
      }

      // Fallback
      if (!width || width <= 0) width = 800;
      if (!height || height <= 0) height = 600;

      console.log(`[SVG2PNG] ${diagramType} dimensions: ${width}x${height}`);

      // Step 2: Set explicit dimensions on SVG element
      svgEl.setAttribute('width', String(width));
      svgEl.setAttribute('height', String(height));
      if (!svgEl.getAttribute('xmlns')) {
        svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      }

      // Remove any foreignObject elements (they break canvas cross-origin)
      const foreignObjects = svgEl.querySelectorAll('foreignObject');
      foreignObjects.forEach((fo) => {
        // Replace foreignObject with a simple text element
        const text = fo.textContent || '';
        if (text.trim()) {
          const textEl = doc.createElementNS('http://www.w3.org/2000/svg', 'text');
          textEl.textContent = text.trim().substring(0, 60);
          textEl.setAttribute('font-size', '12');
          textEl.setAttribute('fill', '#1e293b');
          const parent = fo.parentNode;
          if (parent) {
            parent.replaceChild(textEl, fo);
          }
        } else {
          fo.remove();
        }
      });

      // Serialize the cleaned SVG
      const cleanSvg = new XMLSerializer().serializeToString(svgEl);

      // Step 3: Scale for quality
      // Target: fit within A4 page usable width (~480pt) at good resolution
      const scale = 2;
      const canvasWidth = Math.min(Math.ceil(width * scale), 4096);
      const canvasHeight = Math.min(Math.ceil(height * scale), 4096);

      // Step 4: Convert to base64 data URL
      const encoded = encodeURIComponent(cleanSvg);
      const unescaped = unescape(encoded);

      let base64: string;
      try {
        base64 = btoa(unescaped);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (_err) {
        // If btoa fails (non-latin1 chars), use manual UTF-8 encoding
        console.warn(`[SVG2PNG] btoa failed for ${diagramType}, using TextEncoder fallback`);
        const encoder = new TextEncoder();
        const bytes = encoder.encode(cleanSvg);
        let binary = '';
        for (let i = 0; i < bytes.length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        base64 = btoa(binary);
      }

      const dataUrl = `data:image/svg+xml;base64,${base64}`;

      // Step 5: Load image and draw to canvas
      const img = new Image();

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = canvasWidth;
          canvas.height = canvasHeight;

          const ctx = canvas.getContext('2d');
          if (!ctx) {
            console.warn(`[SVG2PNG] Cannot get canvas 2d context for ${diagramType}`);
            resolve('');
            return;
          }

          // White background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvasWidth, canvasHeight);

          // Draw SVG image
          ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);

          // Export as PNG
          const pngDataUri = canvas.toDataURL('image/png', 1.0);

          // Verify we got a real PNG (not just a blank canvas header)
          if (pngDataUri.length < 500) {
            console.warn(`[SVG2PNG] Suspiciously small PNG for ${diagramType}: ${pngDataUri.length} chars`);
          }

          resolve(pngDataUri);
        } catch (canvasErr) {
          console.error(`[SVG2PNG] Canvas error for ${diagramType}:`, canvasErr);
          resolve('');
        }
      };

      img.onerror = (err) => {
        console.error(`[SVG2PNG] Image load error for ${diagramType}:`, err);
        resolve('');
      };

      img.crossOrigin = 'anonymous';
      img.src = dataUrl;
    } catch (err) {
      console.error(`[SVG2PNG] Error for ${diagramType}:`, err);
      resolve('');
    }
  });
}
