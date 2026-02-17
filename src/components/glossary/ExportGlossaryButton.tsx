'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { GlossaryPDFDocument } from '@/lib/pdf/GlossaryPDFDocument';
import type { GlossaryTerm } from '@/types/glossary';

interface ExportGlossaryButtonProps {
  terms: GlossaryTerm[];
  filename?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
}

export function ExportGlossaryButton({
  terms,
  filename = 'glosario-sommerville.pdf',
  variant = 'default',
  size = 'default',
}: ExportGlossaryButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);

      // Generate PDF document
      const doc = <GlossaryPDFDocument terms={terms} />;
      const blob = await pdf(doc).toBlob();

      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting glossary to PDF:', error);
      alert('Error al exportar el glosario. Por favor intenta de nuevo.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting || terms.length === 0}
      variant={variant}
      size={size}
      className="gap-2"
    >
      {isExporting ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generando PDF...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Exportar {terms.length > 0 ? `(${terms.length})` : ''}
        </>
      )}
    </Button>
  );
}
