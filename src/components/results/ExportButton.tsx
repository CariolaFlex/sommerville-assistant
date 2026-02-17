'use client';

import { Button } from '@/components/ui/button';
import { Download, Loader2, AlertCircle, CheckCircle2, Settings, FileDown } from 'lucide-react';
import { useExportPDF } from '@/hooks/useExportPDF';
import { PDFCustomizationForm } from './PDFCustomizationForm';
import type { Recommendation } from '@/types/recommendation';
import type { Template } from '@/types/templates';
import type { Checklist } from '@/types/checklists';
import type { PDFCustomization } from '@/types/pdf-customization';
import { useState, useEffect } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ExportButtonProps {
  recommendation: Recommendation;
  templates: Template[];
  checklists: Checklist[];
  variant?: 'default' | 'full-project';
}

export function ExportButton({
  recommendation,
  templates,
  checklists,
  variant = 'default',
}: ExportButtonProps) {
  const { exportToPDF, isGenerating, error } = useExportPDF();
  const [showSuccess, setShowSuccess] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);

  const handleExport = async (customization?: PDFCustomization) => {
    setShowSuccess(false);
    await exportToPDF(recommendation, templates, checklists, customization);
    if (!error) {
      setShowSuccess(true);
    }
  };

  const handleQuickExport = () => {
    handleExport();
  };

  const handleFullProjectExport = () => {
    handleExport({
      includeDiagrams: true,
      includeTemplates: true,
      includeTimestamp: true,
    });
  };

  const handleCustomExport = (customization: PDFCustomization) => {
    handleExport(customization);
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  // Full project variant - prominent button
  if (variant === 'full-project') {
    return (
      <div className="flex flex-col items-center gap-3">
        <Button
          onClick={handleFullProjectExport}
          disabled={isGenerating}
          size="lg"
          className="gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white shadow-lg shadow-blue-600/25 px-8 py-6 text-base rounded-xl"
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Generando proyecto completo...</span>
            </>
          ) : showSuccess ? (
            <>
              <CheckCircle2 className="h-5 w-5" />
              <span>Proyecto PDF descargado!</span>
            </>
          ) : (
            <>
              <FileDown className="h-5 w-5" />
              <span>Exportar Proyecto Completo (PDF)</span>
            </>
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center max-w-md">
          Incluye: Proceso, Metodologia, Modelado, Arquitectura, Timeline, Diagramas y Plantillas
        </p>

        {error && (
          <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md max-w-md">
            <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
          </div>
        )}

        {isGenerating && (
          <p className="text-xs text-muted-foreground animate-pulse">
            Generando diagramas y secciones, esto puede tardar 15-30 segundos...
          </p>
        )}
      </div>
    );
  }

  // Default dropdown variant
  return (
    <div className="flex flex-col items-start gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={isGenerating}
            variant={showSuccess ? 'default' : 'outline'}
            className="gap-2"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Generando PDF...</span>
              </>
            ) : showSuccess ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>PDF Descargado!</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4" />
                <span>Exportar PDF</span>
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={handleFullProjectExport}>
            <FileDown className="h-4 w-4 mr-2" />
            Proyecto Completo (6 paneles)
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleQuickExport}>
            <Download className="h-4 w-4 mr-2" />
            Exportar Rapido
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setShowCustomization(true)}>
            <Settings className="h-4 w-4 mr-2" />
            Personalizar y Exportar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <PDFCustomizationForm
        open={showCustomization}
        onOpenChange={setShowCustomization}
        onSubmit={handleCustomExport}
      />

      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md max-w-md">
          <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
        </div>
      )}

      {isGenerating && (
        <p className="text-xs text-muted-foreground">
          Esto puede tardar 10-20 segundos...
        </p>
      )}
    </div>
  );
}
