'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TermCard } from './TermCard';
import { ChevronLeft, ChevronRight, Search } from 'lucide-react';
import type { GlossaryTerm } from '@/types/glossary';

interface TermsGridProps {
  terms: GlossaryTerm[];
  onTermClick: (term: GlossaryTerm) => void;
  isLoading?: boolean;
}

const ITEMS_PER_PAGE = 30;

export function TermsGrid({ terms, onTermClick, isLoading = false }: TermsGridProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to page 1 when terms change
  useEffect(() => {
    setCurrentPage(1);
  }, [terms]);

  const totalPages = Math.ceil(terms.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTerms = terms.slice(startIndex, endIndex);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Card key={idx} className="h-48 animate-pulse">
            <CardContent className="pt-6">
              <div className="h-4 bg-muted rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-muted rounded w-full mb-2"></div>
              <div className="h-3 bg-muted rounded w-5/6"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  // Empty state
  if (terms.length === 0) {
    return (
      <Card className="py-16">
        <CardContent className="text-center">
          <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-xl font-semibold mb-2">No se encontraron términos</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Intenta ajustar los filtros o modificar tu búsqueda para encontrar más resultados.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {currentTerms.map((term) => (
          <TermCard key={term.id} term={term} onClick={() => onTermClick(term)} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t">
          <div className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1} - {Math.min(endIndex, terms.length)} de {terms.length}{' '}
            términos
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
              className="gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>

            <div className="flex items-center gap-1">
              {/* Show page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Smart pagination: show first, last, current, and neighbors
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => {
                      setCurrentPage(pageNum);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="w-10 h-10"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="gap-2"
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
