'use client';

import { Button } from '@/components/ui/button';
import { Download, Loader2, AlertCircle, CheckCircle2, Settings } from 'lucide-react';
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
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ExportButtonProps {
  recommendation: Recommendation;
  templates: Template[];
  checklists: Checklist[];
}

export function ExportButton({
  recommendation,
  templates,
  checklists,
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

  const handleCustomExport = (customization: PDFCustomization) => {
    handleExport(customization);
  };

  // Auto-hide success message after 3 seconds
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

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
                <span>¡PDF Descargado!</span>
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
          <DropdownMenuItem onClick={handleQuickExport}>
            <Download className="h-4 w-4 mr-2" />
            Exportar Rápido
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
