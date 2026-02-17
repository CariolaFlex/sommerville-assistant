'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Download, ZoomIn, ZoomOut, AlertCircle, Loader2, RotateCcw } from 'lucide-react';

interface DiagramViewerProps {
  mermaidCode: string;
  title: string;
  description?: string;
  className?: string;
}

// Singleton para evitar re-inicializar Mermaid múltiples veces
let mermaidInstance: typeof import('mermaid').default | null = null;
let mermaidInitialized = false;

async function getMermaid() {
  if (!mermaidInstance) {
    const mod = await import('mermaid');
    mermaidInstance = mod.default;
  }
  if (!mermaidInitialized) {
    mermaidInstance.initialize({
      startOnLoad: false,
      theme: 'neutral',
      themeVariables: {
        primaryColor: '#3b82f6',
        primaryTextColor: '#1f2937',
        primaryBorderColor: '#60a5fa',
        lineColor: '#94a3b8',
        secondaryColor: '#86efac',
        tertiaryColor: '#fbbf24',
      },
      securityLevel: 'loose',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      logLevel: 'error',
      flowchart: {
        curve: 'basis',
        padding: 20,
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
    mermaidInitialized = true;
  }
  return mermaidInstance;
}

export function DiagramViewer({
  mermaidCode,
  title,
  description,
  className = '',
}: DiagramViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [retryCount, setRetryCount] = useState(0);
  const [diagramId] = useState(
    `diagram-${Math.random().toString(36).substring(2, 9)}`
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let isMounted = true;
    let safetyTimeoutId: ReturnType<typeof setTimeout>;

    const renderDiagram = async () => {
      if (!containerRef.current || !isMounted) return;

      setIsLoading(true);
      setError(null);

      // Validar código Mermaid básico
      if (!mermaidCode || mermaidCode.trim().length === 0) {
        if (isMounted) {
          setError('Código Mermaid vacío');
          setIsLoading(false);
        }
        return;
      }

      // Timeout de seguridad ampliado a 30 segundos
      safetyTimeoutId = setTimeout(() => {
        if (isMounted && isLoading) {
          setError('El diagrama tardó demasiado en renderizarse. Intenta recargar.');
          setIsLoading(false);
        }
      }, 30000);

      try {
        const mermaid = await getMermaid();

        // Limpiar contenedor anterior
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }

        // Usar ID único por intento para evitar conflictos de caché
        const uniqueId = `${diagramId}-r${retryCount}`;

        const { svg } = await mermaid.render(uniqueId, mermaidCode);

        clearTimeout(safetyTimeoutId);

        if (containerRef.current && isMounted) {
          containerRef.current.innerHTML = svg;
          // Hacer el SVG responsive
          const svgEl = containerRef.current.querySelector('svg');
          if (svgEl) {
            svgEl.style.maxWidth = '100%';
            svgEl.style.height = 'auto';
          }
          setIsLoading(false);
          setError(null);
        }
      } catch (err) {
        clearTimeout(safetyTimeoutId);
        if (isMounted) {
          const msg = err instanceof Error ? err.message : 'Error desconocido al renderizar';
          console.error('❌ Mermaid render error:', msg);
          setError(msg);
          setIsLoading(false);
        }
      }
    };

    // Pequeño delay para asegurar que el DOM esté listo
    const initTimeout = setTimeout(() => {
      renderDiagram();
    }, 150);

    return () => {
      isMounted = false;
      clearTimeout(initTimeout);
      clearTimeout(safetyTimeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mermaidCode, diagramId, retryCount]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(mermaidCode);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
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
    link.download = `${title.replace(/\s+/g, '-').toLowerCase()}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 10, 200));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 10, 50));

  return (
    <div className={className}>
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-muted-foreground">
          {description && <span>{description}</span>}
        </div>
        <div className="flex gap-1 flex-wrap justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoom <= 50 || isLoading || !!error}
          >
            <ZoomOut className="h-3 w-3" />
          </Button>
          <span className="text-xs text-muted-foreground self-center min-w-10 text-center">
            {zoom}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoom >= 200 || isLoading || !!error}
          >
            <ZoomIn className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyCode}
            disabled={isLoading}
            className="gap-1"
          >
            <Copy className="h-3 w-3" />
            <span className="hidden sm:inline">Copiar</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadSVG}
            disabled={isLoading || !!error}
            className="gap-1"
          >
            <Download className="h-3 w-3" />
            <span className="hidden sm:inline">SVG</span>
          </Button>
        </div>
      </div>

      {/* Diagram Container */}
      <Card className="overflow-hidden">
        <CardContent className="p-4 min-h-[200px] flex items-center justify-center">
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="text-sm text-muted-foreground">Renderizando diagrama...</span>
            </div>
          )}

          {error && !isLoading && (
            <div className="w-full">
              <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="font-semibold text-red-700 dark:text-red-300">
                    Error al renderizar
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
                  <div className="flex items-center gap-2 mt-3">
                    <Button size="sm" variant="outline" onClick={handleRetry} className="gap-2">
                      <RotateCcw className="h-3 w-3" />
                      Reintentar
                    </Button>
                  </div>
                  <details className="mt-3">
                    <summary className="text-xs text-red-500 cursor-pointer hover:underline">
                      Ver código Mermaid
                    </summary>
                    <pre className="text-xs mt-2 p-2 bg-red-100 dark:bg-red-900/20 rounded overflow-x-auto whitespace-pre-wrap">
                      {mermaidCode}
                    </pre>
                  </details>
                </div>
              </div>
            </div>
          )}

          {!isLoading && !error && (
            <div
              className="w-full overflow-auto"
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top left',
                minHeight: zoom !== 100 ? `${zoom * 2}px` : undefined,
              }}
            >
              <div ref={containerRef} className="mermaid-container w-full" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
