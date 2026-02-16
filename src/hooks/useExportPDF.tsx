'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { PDFDocument } from '@/lib/pdf/PDFDocument';
import { generatePDFFilename } from '@/lib/pdf/utils';
import { generateDiagramsForPDF } from '@/lib/pdf/utils/generate-diagrams';
import type { Recommendation } from '@/types/recommendation';
import type { Template } from '@/types/templates';
import type { Checklist } from '@/types/checklists';
import type { PDFCustomization } from '@/types/pdf-customization';

interface UseExportPDFResult {
  exportToPDF: (
    recommendation: Recommendation,
    templates: Template[],
    checklists: Checklist[],
    customization?: PDFCustomization
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
    checklists: Checklist[],
    customization?: PDFCustomization
  ) => {
    setIsGenerating(true);
    setError(null);

    try {
      // Generar diagramas primero (solo en cliente) - respetando configuración
      const shouldIncludeDiagrams = customization?.includeDiagrams ?? true;
      let diagrams = null;

      if (shouldIncludeDiagrams) {
        console.log('Generando diagramas para PDF...');
        diagrams = await generateDiagramsForPDF(recommendation);

        if (diagrams) {
          console.log('✅ Diagramas generados exitosamente');
        } else {
          console.warn('⚠️ No se pudieron generar los diagramas, el PDF se generará sin ellos');
        }
      }

      // Filtrar plantillas según configuración
      const filteredTemplates =
        customization?.includeTemplates ?? true ? templates : [];

      // Crear documento PDF con diagramas y personalización
      const doc = (
        <PDFDocument
          recommendation={recommendation}
          templates={filteredTemplates}
          checklists={checklists}
          diagrams={diagrams}
          customization={customization}
        />
      );

      // Generar blob del PDF
      console.log('Generando PDF...');
      const blob = await pdf(doc).toBlob();

      // Crear URL temporal y descargar
      console.log('✅ PDF generado exitosamente');
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = generatePDFFilename(recommendation, customization);
      document.body.appendChild(link);
      link.click();

      // Cleanup
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      console.log('📥 Descarga iniciada');
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
