/**
 * EXPORT WIZARD RESULT BUTTON - FASE 2
 *
 * Botón para exportar resultados del wizard a PDF
 */

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { WizardResultPDFDocument } from '@/components/pdf/WizardResultPDFDocument';
import { wizardQuestions } from '@/lib/wizard/questions';

interface ExportWizardResultButtonProps {
  recommendationId: string;
  recommendationTitle: string;
  recommendationDescription?: string;
  answers: Record<string, string | undefined>;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  className?: string;
}

export function ExportWizardResultButton({
  recommendationId,
  recommendationTitle,
  recommendationDescription,
  answers,
  variant = 'outline',
  size = 'default',
  className = '',
}: ExportWizardResultButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);

      // Preparar datos para el PDF
      const questionsData = wizardQuestions.map((q) => ({
        id: q.id,
        text: q.text,
        options: q.options.map((opt) => ({
          value: opt.value,
          label: opt.label,
        })),
      }));

      // Generar PDF
      const blob = await pdf(
        <WizardResultPDFDocument
          recommendationId={recommendationId}
          recommendationTitle={recommendationTitle}
          recommendationDescription={recommendationDescription}
          answers={answers}
          questions={questionsData}
        />
      ).toBlob();

      // Descargar PDF
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `recomendacion-${recommendationId}-${Date.now()}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Error al exportar PDF. Por favor intenta de nuevo.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleExport}
      disabled={isExporting}
      className={className}
    >
      {isExporting ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Exportando...
        </>
      ) : (
        <>
          <Download className="w-4 h-4 mr-2" />
          Exportar PDF
        </>
      )}
    </Button>
  );
}
