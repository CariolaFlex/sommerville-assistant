'use client';

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Badge } from '@/components/ui/badge';
import { BookOpen } from 'lucide-react';
import type { GlossaryTerm } from '@/types/glossary';

interface TermTooltipProps {
  term: GlossaryTerm;
  children: React.ReactNode;
  asChild?: boolean;
}

export function TermTooltip({ term, children, asChild = false }: TermTooltipProps) {
  return (
    <HoverCard openDelay={300}>
      <HoverCardTrigger asChild={asChild}>
        {asChild ? (
          children
        ) : (
          <span className="underline decoration-dotted decoration-primary/50 cursor-help hover:decoration-solid">
            {children}
          </span>
        )}
      </HoverCardTrigger>
      <HoverCardContent side="top" className="w-80">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <p className="font-semibold text-sm mb-1">{term.nombre}</p>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs">
                  {term.categoria}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  Cap. {term.capitulo}
                </Badge>
              </div>
            </div>
            <BookOpen className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">
            {term.descripcionBreve}
          </p>
          {term.descripcionExtendida && (
            <p className="text-xs text-muted-foreground/80 pt-2 border-t">
              Ver en glosario para más detalles...
            </p>
          )}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

/**
 * Hook to find glossary terms by name or keyword
 * Usage: const term = useGlossaryTerm('Scrum');
 */
export function useGlossaryTerm(_searchTerm: string): GlossaryTerm | undefined {
  // This would ideally use the useGlossary hook, but for simplicity
  // we'll import the data directly here to avoid circular dependencies
  // In a real app, you might use a context provider
  return undefined; // Placeholder - implement based on your needs
}
