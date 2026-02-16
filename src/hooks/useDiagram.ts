import { useState } from 'react';
import type { MermaidDiagram, DiagramExportOptions } from '@/types';

export function useDiagram() {
  const [diagrams, setDiagrams] = useState<MermaidDiagram[]>([]);

  const addDiagram = (diagram: MermaidDiagram) => {
    setDiagrams((prev) => [...prev, diagram]);
  };

  const exportDiagram = async (
    diagramId: string,
    options: DiagramExportOptions
  ) => {
    // TODO: Implementar exportación de diagramas
    console.log('Exporting diagram:', diagramId, options);
  };

  return {
    diagrams,
    addDiagram,
    exportDiagram,
  };
}
