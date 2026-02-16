'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useGlossary } from '@/hooks/useGlossary';
import { GlossaryStats } from '@/components/glossary/GlossaryStats';
import { GlossaryFilters } from '@/components/glossary/GlossaryFilters';
import { TermsGrid } from '@/components/glossary/TermsGrid';
import { TermModal } from '@/components/glossary/TermModal';
import type { GlossaryTerm } from '@/types/glossary';

export default function GlossaryPage() {
  const router = useRouter();
  const {
    terms,
    filteredTerms,
    searchQuery,
    setSearchQuery,
    selectedChapter,
    setSelectedChapter,
    selectedCategory,
    setSelectedCategory,
    categories,
    stats,
  } = useGlossary();

  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTermClick = (term: GlossaryTerm) => {
    setSelectedTerm(term);
    setIsModalOpen(true);
  };

  const handleRelatedTermClick = (termId: string) => {
    const relatedTerm = terms.find((t) => t.id === termId);
    if (relatedTerm) {
      setSelectedTerm(relatedTerm);
      // Modal stays open, just updates content
    }
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedChapter(null);
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="border-b bg-card/95 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Title Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Glosario Técnico
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {stats.totalTerms.toLocaleString()} términos de Ingeniería de Software de los
            capítulos 1-6 del libro de Ian Sommerville
          </p>
        </div>

        {/* Statistics */}
        <div className="mb-8">
          <GlossaryStats
            totalTerms={stats.totalTerms}
            chaptersCount={stats.chaptersCount}
            categoriesCount={stats.categoriesCount}
            mostReferencedTerm={stats.mostReferencedTerm}
          />
        </div>

        {/* Filters */}
        <div className="mb-8">
          <GlossaryFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedChapter={selectedChapter}
            onChapterChange={setSelectedChapter}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
            resultsCount={filteredTerms.length}
            onClearFilters={handleClearFilters}
          />
        </div>

        {/* Terms Grid */}
        <div className="mb-16">
          <TermsGrid terms={filteredTerms} onTermClick={handleTermClick} />
        </div>

        {/* Term Modal */}
        <TermModal
          term={selectedTerm}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onRelatedTermClick={handleRelatedTermClick}
          allTerms={terms}
        />
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-muted/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Glosario consolidado de <strong>Ingeniería de Software</strong> de Ian
            Sommerville
          </p>
          <p className="mt-2">
            {stats.totalTerms.toLocaleString()} términos • {stats.chaptersCount} capítulos •{' '}
            {stats.categoriesCount} categorías
          </p>
        </div>
      </footer>
    </div>
  );
}
