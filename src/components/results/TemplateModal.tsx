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
import { Clock, Copy, Download, Check } from 'lucide-react';
import type { Template } from '@/types/templates';

interface TemplateModalProps {
  template: Template | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TemplateModal({ template, open, onOpenChange }: TemplateModalProps) {
  const [copied, setCopied] = useState(false);

  if (!template) return null;

  const handleCopy = async () => {
    if (template.content) {
      await navigator.clipboard.writeText(template.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!template.content) return;

    const blob = new Blob([template.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${template.name.toLowerCase().replace(/\s+/g, '-')}.${
      template.format || 'txt'
    }`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
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
            <Badge
              variant="outline"
              className={
                template.difficulty === 'facil'
                  ? 'border-green-500 text-green-700'
                  : template.difficulty === 'media'
                  ? 'border-yellow-500 text-yellow-700'
                  : 'border-red-500 text-red-700'
              }
            >
              {template.difficulty === 'facil'
                ? 'Fácil'
                : template.difficulty === 'media'
                ? 'Media'
                : 'Difícil'}
            </Badge>
            <Badge variant="outline" className="gap-1">
              <Clock className="h-3 w-3" />
              {template.estimatedTime}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-1 mt-2">
            {template.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>

        {template.content ? (
          <div className="flex-1 min-h-0 flex flex-col gap-3">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
                className="gap-2"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" />
                    Copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" />
                    Copiar
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDownload}
                className="gap-2"
              >
                <Download className="h-4 w-4" />
                Descargar
              </Button>
            </div>

            <ScrollArea className="flex-1 border rounded-md">
              <pre className="p-4 text-sm font-mono whitespace-pre-wrap break-words">
                {template.content}
              </pre>
            </ScrollArea>
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground">
            <p>El contenido de esta plantilla no está disponible.</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
