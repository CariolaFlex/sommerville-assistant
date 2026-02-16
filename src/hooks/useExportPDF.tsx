'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { PDFDocument } from '@/lib/pdf/PDFDocument';
import { generatePDFFilename } from '@/lib/pdf/utils';
import type { Recommendation } from '@/types/recommendation';
import type { Template } from '@/types/templates';
import type { Checklist } from '@/types/checklists';

interface UseExportPDFResult {
  exportToPDF: (
    recommendation: Recommendation,
    templates: Template[],
    checklists: Checklist[]
  ) => Promise<void>;
  isGenerating: boolean;
  error: string | null;
}

export function useExportPDF(): UseExportPDFResult {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportToPDF = async (
    recommendation: Recommendation,
    templates: Template[],
    checklists: Checklist[]
  ) => {
    setIsGenerating(true);
    setError(null);

    try {
      // Crear documento PDF
      const doc = (
        <PDFDocument
          recommendation={recommendation}
          templates={templates}
          checklists={checklists}
        />
      );

      // Generar blob del PDF
      const blob = await pdf(doc).toBlob();

      // Crear URL temporal y descargar
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = generatePDFFilename(recommendation);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError(
        err instanceof Error
          ? `Error al generar PDF: ${err.message}`
          : 'Error desconocido al generar PDF'
      );
    } finally {
      setIsGenerating(false);
    }
  };

  return { exportToPDF, isGenerating, error };
}
