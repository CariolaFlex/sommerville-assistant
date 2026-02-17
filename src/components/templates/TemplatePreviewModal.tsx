'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Clock, Copy, Download, Check, ChevronDown, ChevronUp, FileText } from 'lucide-react';
import type { Template } from '@/lib/types/templates';

interface TemplatePreviewModalProps {
  template: Template | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const difficultyLabels: Record<string, { label: string; color: string }> = {
  basic: { label: 'Basico', color: 'border-green-500 text-green-700' },
  intermediate: { label: 'Intermedio', color: 'border-yellow-500 text-yellow-700' },
  advanced: { label: 'Avanzado', color: 'border-red-500 text-red-700' },
};

export function TemplatePreviewModal({ template, open, onOpenChange }: TemplatePreviewModalProps) {
  const [copied, setCopied] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<number, boolean>>({});

  if (!template) return null;

  // Combinar todo el contenido de las secciones
  const fullContent = template.sections
    .map((s) => s.content)
    .join('\n\n---\n\n');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(fullContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([fullContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const toggleSection = (index: number) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const difficulty = difficultyLabels[template.difficulty] || {
    label: template.difficulty,
    color: '',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{template.name}</DialogTitle>
              <DialogDescription className="text-base leading-relaxed">
                {template.description}
              </DialogDescription>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary">{template.category}</Badge>
            <Badge variant="outline" className={difficulty.color}>
              {difficulty.label}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" />
              {template.estimatedTime}
            </Badge>
            <Badge variant="outline">{template.format.toUpperCase()}</Badge>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {template.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        {/* Toolbar */}
        <div className="flex gap-2 py-2 border-b">
          <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2">
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copiar todo
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload} className="gap-2">
            <Download className="h-4 w-4" />
            Descargar .md
          </Button>
        </div>

        {/* Secciones */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="space-y-3 py-4 pr-4">
            {template.sections.map((section, index) => {
              const isExpanded = expandedSections[index] !== false; // expandido por defecto

              return (
                <div key={index} className="border rounded-lg overflow-hidden">
                  {/* Header de seccion */}
                  <button
                    className="w-full flex items-center justify-between p-4 hover:bg-muted/40 transition-colors text-left"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600 flex-shrink-0" />
                      <span className="font-semibold text-sm">{section.title}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="border-t">
                      {/* Instrucciones */}
                      {section.instructions && (
                        <div className="px-4 py-3 bg-blue-50 dark:bg-blue-900/10 border-b">
                          <p className="text-xs text-blue-700 dark:text-blue-300">
                            <strong>Instrucciones:</strong> {section.instructions}
                          </p>
                        </div>
                      )}

                      {/* Subsecciones */}
                      {section.subsections && section.subsections.length > 0 && (
                        <div className="px-4 py-2 bg-gray-50 dark:bg-gray-900/10 border-b">
                          <p className="text-xs text-muted-foreground font-medium mb-1">
                            Subsecciones:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {section.subsections.map((sub, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {sub}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Contenido */}
                      <div className="p-4 max-h-[400px] overflow-y-auto">
                        <pre className="text-sm font-mono whitespace-pre-wrap break-words leading-relaxed">
                          {section.content}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
