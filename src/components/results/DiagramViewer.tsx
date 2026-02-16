'use client';

import { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Download, ZoomIn, ZoomOut, AlertCircle, Loader2 } from 'lucide-react';

interface DiagramViewerProps {
  mermaidCode: string;
  title: string;
  description?: string;
  className?: string;
}

// Configurar Mermaid globalmente
let mermaidInitialized = false;

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
  const [diagramId] = useState(`diagram-${Date.now()}-${Math.random()}`);

  useEffect(() => {
    // Inicializar Mermaid solo una vez
    if (!mermaidInitialized) {
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
      mermaidInitialized = true;
    }

    // Renderizar diagrama
    const renderDiagram = async () => {
      if (!containerRef.current) return;

      setIsLoading(true);
      setError(null);

      try {
        // Limpiar contenedor
        containerRef.current.innerHTML = '';

        // Renderizar con Mermaid
        const { svg } = await mermaid.render(diagramId, mermaidCode);

        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
          setIsLoading(false);
        }
      } catch (err) {
        console.error('Error rendering Mermaid diagram:', err);
        setError(err instanceof Error ? err.message : 'Error al renderizar diagrama');
        setIsLoading(false);
      }
    };

    renderDiagram();
  }, [mermaidCode, diagramId]);

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(mermaidCode);
      // Could add toast notification here
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
              <div>
                <p className="font-semibold text-red-700 dark:text-red-300">
                  Error al renderizar
                </p>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">{error}</p>
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
