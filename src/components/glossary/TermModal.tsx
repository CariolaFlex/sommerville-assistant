'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { ExternalLink, Tag, Link2 } from 'lucide-react';
import type { GlossaryTerm } from '@/types/glossary';

interface TermModalProps {
  term: GlossaryTerm | null;
  isOpen: boolean;
  onClose: () => void;
  onRelatedTermClick: (termId: string) => void;
  allTerms: GlossaryTerm[];
}

// Function to generate consistent color per category
function getCategoryColor(category: string): string {
  const colors = [
    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    'bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300',
    'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300',
    'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
    'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
  ];

  const hash = category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

export function TermModal({
  term,
  isOpen,
  onClose,
  onRelatedTermClick,
  allTerms,
}: TermModalProps) {
  if (!term) return null;

  // Find related terms objects
  const relatedTermsObjects = term.relatedTerms
    .map((relatedId) => allTerms.find((t) => t.id === relatedId))
    .filter((t): t is GlossaryTerm => t !== undefined);

  const handleRelatedTermClick = (relatedId: string) => {
    onRelatedTermClick(relatedId);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-start gap-2 mb-2">
            <Badge className={getCategoryColor(term.categoria)} variant="secondary">
              {term.categoria}
            </Badge>
            <Badge variant="outline">Capítulo {term.capitulo}</Badge>
          </div>
          <DialogTitle className="text-2xl leading-tight pr-6">{term.nombre}</DialogTitle>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6 py-4">
            {/* Description */}
            <div>
              <h4 className="font-semibold text-sm text-muted-foreground mb-2">
                Descripción
              </h4>
              <p className="text-sm leading-relaxed">{term.descripcionBreve}</p>
            </div>

            <Separator />

            {/* Keywords */}
            {term.keywords.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <h4 className="font-semibold text-sm text-muted-foreground">
                    Palabras clave
                  </h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {term.keywords.map((keyword, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {keyword}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Related Terms */}
            {term.relatedTerms.length > 0 && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Link2 className="h-4 w-4 text-muted-foreground" />
                    <h4 className="font-semibold text-sm text-muted-foreground">
                      Términos relacionados ({relatedTermsObjects.length})
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {relatedTermsObjects.map((relatedTerm) => (
                      <Button
                        key={relatedTerm.id}
                        variant="outline"
                        size="sm"
                        onClick={() => handleRelatedTermClick(relatedTerm.id)}
                        className="w-full justify-between text-left h-auto py-2 px-3"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-sm">{relatedTerm.nombre}</div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            {relatedTerm.descripcionBreve}
                          </div>
                        </div>
                        <ExternalLink className="h-3 w-3 ml-2 flex-shrink-0" />
                      </Button>
                    ))}

                    {/* Show missing related terms */}
                    {term.relatedTerms.length > relatedTermsObjects.length && (
                      <div className="text-xs text-muted-foreground italic">
                        {term.relatedTerms.length - relatedTermsObjects.length} término(s)
                        relacionado(s) no disponible(s)
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Metadata */}
            <Separator />
            <div className="text-xs text-muted-foreground space-y-1">
              <div>
                <strong>ID:</strong> {term.id}
              </div>
              <div>
                <strong>Capítulo:</strong> {term.capitulo}
              </div>
              <div>
                <strong>Categoría:</strong> {term.categoria}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
