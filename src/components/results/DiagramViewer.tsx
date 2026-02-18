'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Download, ZoomIn, ZoomOut, AlertCircle, Loader2, RotateCcw, ImageIcon, CheckCircle2 } from 'lucide-react';

interface DiagramViewerProps {
  mermaidCode: string;
  title: string;
  description?: string;
  className?: string;
}

export function DiagramViewer({
  mermaidCode,
  title,
  description,
  className = '',
}: DiagramViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [errorMsg, setErrorMsg] = useState('');
  const [zoom, setZoom] = useState(100);
  const [retryCount, setRetryCount] = useState(0);
  const [downloadingFormat, setDownloadingFormat] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const renderDiagram = useCallback(async () => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    setStatus('loading');
    setErrorMsg('');

    if (!mermaidCode || mermaidCode.trim().length === 0) {
      setErrorMsg('Codigo Mermaid vacio');
      setStatus('error');
      return;
    }

    try {
      const { default: mermaid } = await import('mermaid');

      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
          primaryColor: '#e0e7ff',
          primaryTextColor: '#1e293b',
          primaryBorderColor: '#6366f1',
          lineColor: '#64748b',
          secondaryColor: '#dbeafe',
          tertiaryColor: '#f0fdf4',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '14px',
        },
        securityLevel: 'loose',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        logLevel: 'error',
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

      const uniqueId = `d${Math.random().toString(36).substring(2, 8)}`;

      const oldSvg = document.getElementById(uniqueId);
      if (oldSvg) oldSvg.remove();

      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }

      const { svg } = await mermaid.render(uniqueId, mermaidCode);

      if (containerRef.current) {
        containerRef.current.innerHTML = svg;
        const svgEl = containerRef.current.querySelector('svg');
        if (svgEl) {
          svgEl.style.maxWidth = '100%';
          svgEl.style.height = 'auto';
        }
        setStatus('success');
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Error desconocido al renderizar';
      console.error('Mermaid render error:', msg);
      setErrorMsg(msg);
      setStatus('error');
    }
  }, [mermaidCode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      renderDiagram();
    }, 200);

    return () => clearTimeout(timer);
  }, [renderDiagram, retryCount]);

  const handleRetry = () => setRetryCount((prev) => prev + 1);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(mermaidCode);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getFileBaseName = () => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'diagrama';
  };

  const handleDownloadSVG = () => {
    if (!containerRef.current) return;
    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `diagrama-${getFileBaseName()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadRaster = async (format: 'png' | 'jpg') => {
    if (!containerRef.current) return;
    const svgElement = containerRef.current.querySelector('svg');
    if (!svgElement) return;

    setDownloadingFormat(format);

    try {
      // Get actual SVG dimensions from viewBox or attributes (not CSS-constrained getBoundingClientRect)
      let svgWidth = 0;
      let svgHeight = 0;

      const viewBox = svgElement.getAttribute('viewBox');
      if (viewBox) {
        const parts = viewBox.split(/[\s,]+/).map(Number);
        if (parts.length === 4) {
          svgWidth = parts[2];
          svgHeight = parts[3];
        }
      }

      if (!svgWidth) svgWidth = parseFloat(svgElement.getAttribute('width') || '0');
      if (!svgHeight) svgHeight = parseFloat(svgElement.getAttribute('height') || '0');

      // Fallback to bounding rect only if attributes are missing
      if (!svgWidth || !svgHeight) {
        const rect = svgElement.getBoundingClientRect();
        svgWidth = rect.width;
        svgHeight = rect.height;
      }

      // Target a reasonable export size (max 1920px wide, min 800px)
      const targetWidth = Math.min(Math.max(svgWidth, 800), 1920);
      const aspectRatio = svgHeight / svgWidth;
      const targetHeight = Math.round(targetWidth * aspectRatio);

      const scale = 2; // 2x for retina quality
      const canvasWidth = targetWidth * scale;
      const canvasHeight = targetHeight * scale;

      // Cap to prevent memory issues
      const maxDim = 4096;
      const finalWidth = Math.min(canvasWidth, maxDim);
      const finalHeight = Math.min(canvasHeight, maxDim);

      // Serialize SVG with explicit dimensions
      const svgClone = svgElement.cloneNode(true) as SVGSVGElement;
      svgClone.setAttribute('width', String(targetWidth));
      svgClone.setAttribute('height', String(targetHeight));

      // Ensure xmlns is present
      if (!svgClone.getAttribute('xmlns')) {
        svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
      }

      const svgData = new XMLSerializer().serializeToString(svgClone);

      // Use base64 data URL instead of Blob URL for better compatibility
      const svgBase64 = btoa(unescape(encodeURIComponent(svgData)));
      const dataUrl = `data:image/svg+xml;base64,${svgBase64}`;

      // Create image from SVG
      const img = new Image();
      img.crossOrigin = 'anonymous';

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load SVG as image'));
        img.src = dataUrl;
      });

      // Draw on canvas
      const canvas = document.createElement('canvas');
      canvas.width = finalWidth;
      canvas.height = finalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Cannot get canvas context');

      // Always draw white background (PNG transparency looks bad in most viewers)
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, finalWidth, finalHeight);

      ctx.drawImage(img, 0, 0, finalWidth, finalHeight);

      // Convert to blob and download
      const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
      const quality = format === 'jpg' ? 0.95 : undefined;

      canvas.toBlob((blob) => {
        if (!blob) {
          console.error('Failed to create blob');
          setDownloadingFormat(null);
          return;
        }

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `diagrama-${getFileBaseName()}.${format}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        setDownloadingFormat(null);
      }, mimeType, quality);
    } catch (err) {
      console.error(`Error downloading as ${format}:`, err);
      setDownloadingFormat(null);
    }
  };

  return (
    <div className={className}>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
        <div className="text-sm text-muted-foreground">
          {description && <span>{description}</span>}
        </div>
        <div className="flex gap-1 flex-wrap justify-end">
          {/* Zoom controls */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom((prev) => Math.max(prev - 10, 50))}
            disabled={zoom <= 50 || status !== 'success'}
            title="Reducir zoom"
          >
            <ZoomOut className="h-3 w-3" />
          </Button>
          <span className="text-xs text-muted-foreground self-center min-w-10 text-center">
            {zoom}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setZoom((prev) => Math.min(prev + 10, 200))}
            disabled={zoom >= 200 || status !== 'success'}
            title="Aumentar zoom"
          >
            <ZoomIn className="h-3 w-3" />
          </Button>

          {/* Separator */}
          <div className="w-px h-6 bg-border mx-1 self-center" />

          {/* Copy code */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyCode}
            disabled={status === 'loading'}
            className="gap-1"
            title="Copiar codigo Mermaid"
          >
            {copiedCode ? (
              <CheckCircle2 className="h-3 w-3 text-green-600" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            <span className="hidden sm:inline">{copiedCode ? 'Copiado' : 'Codigo'}</span>
          </Button>

          {/* Download buttons */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadSVG}
            disabled={status !== 'success'}
            className="gap-1"
            title="Descargar como SVG"
          >
            <Download className="h-3 w-3" />
            <span className="hidden sm:inline">SVG</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDownloadRaster('png')}
            disabled={status !== 'success' || downloadingFormat === 'png'}
            className="gap-1"
            title="Descargar como PNG (alta calidad)"
          >
            {downloadingFormat === 'png' ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <ImageIcon className="h-3 w-3" />
            )}
            <span className="hidden sm:inline">PNG</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleDownloadRaster('jpg')}
            disabled={status !== 'success' || downloadingFormat === 'jpg'}
            className="gap-1"
            title="Descargar como JPG"
          >
            {downloadingFormat === 'jpg' ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <ImageIcon className="h-3 w-3" />
            )}
            <span className="hidden sm:inline">JPG</span>
          </Button>
        </div>
      </div>

      {/* Diagram Container */}
      <Card className="overflow-hidden">
        <CardContent className="p-4 min-h-[200px] flex items-center justify-center">
          {status === 'loading' && (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="text-sm text-muted-foreground">Renderizando diagrama...</span>
            </div>
          )}

          {status === 'error' && (
            <div className="w-full">
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-red-700 dark:text-red-300">Error al renderizar</p>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errorMsg}</p>
                  <Button size="sm" variant="outline" onClick={handleRetry} className="gap-2 mt-3">
                    <RotateCcw className="h-3 w-3" />
                    Reintentar
                  </Button>
                  <details className="mt-3">
                    <summary className="text-xs text-red-500 cursor-pointer hover:underline">
                      Ver codigo Mermaid
                    </summary>
                    <pre className="text-xs mt-2 p-2 bg-red-100 dark:bg-red-900/20 rounded overflow-x-auto whitespace-pre-wrap">
                      {mermaidCode}
                    </pre>
                  </details>
                </div>
              </div>
            </div>
          )}

          <div
            className="w-full overflow-auto"
            style={{
              display: status === 'success' ? 'block' : 'none',
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top left',
            }}
          >
            <div ref={containerRef} className="mermaid-container w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
