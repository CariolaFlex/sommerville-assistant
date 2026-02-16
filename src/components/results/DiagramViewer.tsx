'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Download, ZoomIn, ZoomOut, AlertCircle, Loader2 } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState(100);
  const [diagramId] = useState(`diagram-${Date.now()}-${Math.random().toString(36).substring(7)}`);

  useEffect(() => {
    // Solo ejecutar en el cliente
    if (typeof window === 'undefined') return;

    let isMounted = true;

    // Renderizar diagrama con import dinámico
    const renderDiagram = async () => {
      if (!containerRef.current || !isMounted) return;

      setIsLoading(true);
      setError(null);

      try {
        // Validar código Mermaid básico
        if (!mermaidCode || mermaidCode.trim().length === 0) {
          throw new Error('Código Mermaid vacío');
        }

        console.log('🔄 Importing Mermaid dynamically...');

        // ✅ Import dinámico de Mermaid (solo en cliente)
        const { default: mermaid } = await import('mermaid');

        console.log('✅ Mermaid imported successfully');

        // Inicializar Mermaid
        mermaid.initialize({
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
          },
          gantt: {
            titleTopMargin: 25,
            barHeight: 20,
            barGap: 4,
            topPadding: 50,
            leftPadding: 75,
          },
        });

        console.log('🎨 Mermaid initialized');
        console.log('📝 Rendering diagram:', diagramId);
        console.log('📄 Code preview:', mermaidCode.substring(0, 150) + '...');

        // Limpiar contenedor
        if (containerRef.current) {
          containerRef.current.innerHTML = '';
        }

        // Renderizar con Mermaid
        const { svg } = await mermaid.render(diagramId, mermaidCode);

        console.log('✅ Diagram rendered successfully, SVG length:', svg.length);

        if (containerRef.current && isMounted) {
          containerRef.current.innerHTML = svg;
          setIsLoading(false);
          setError(null);
          console.log('✅ Diagram inserted into DOM');
        }
      } catch (err) {
        console.error('❌ Error rendering Mermaid diagram:', err);
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
          setError(`Error: ${errorMessage}`);
          setIsLoading(false);
        }
      }
    };

    // Timeout de seguridad (15 segundos)
    const safetyTimeoutId = setTimeout(() => {
      if (isMounted) {
        console.error('⏱️ Timeout: El diagrama tardó más de 15 segundos');
        setError('Timeout: El diagrama tardó demasiado en renderizarse');
        setIsLoading(false);
      }
    }, 15000);

    // Pequeño delay para asegurar que el DOM esté listo
    const timeoutId = setTimeout(() => {
      renderDiagram();
    }, 100);

    // Cleanup
    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
      clearTimeout(safetyTimeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mermaidCode, diagramId]);

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

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 50));
  };

  return (
    <div className={className}>
      {/* Action Buttons */}
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-muted-foreground">
          {description && <span>{description}</span>}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomOut}
            disabled={zoom <= 50 || isLoading || !!error}
            className="gap-1"
          >
            <ZoomOut className="h-3 w-3" />
          </Button>
          <span className="text-xs text-muted-foreground self-center min-w-12 text-center">
            {zoom}%
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleZoomIn}
            disabled={zoom >= 200 || isLoading || !!error}
            className="gap-1"
          >
            <ZoomIn className="h-3 w-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyCode}
            disabled={isLoading || !!error}
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
        <CardContent className="p-6">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              <span className="ml-3 text-muted-foreground">Renderizando diagrama...</span>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-lg">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-semibold text-red-700 dark:text-red-300">
                  Error al renderizar
                </p>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
                <details className="mt-2">
                  <summary className="text-xs text-red-500 cursor-pointer">
                    Ver código Mermaid
                  </summary>
                  <pre className="text-xs mt-2 p-2 bg-red-100 dark:bg-red-900/20 rounded overflow-x-auto">
                    {mermaidCode}
                  </pre>
                </details>
              </div>
            </div>
          )}

          {!isLoading && !error && (
            <div
              className="overflow-auto transition-transform"
              style={{
                transform: `scale(${zoom / 100})`,
                transformOrigin: 'top left',
              }}
            >
              <div ref={containerRef} className="mermaid-container" />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
