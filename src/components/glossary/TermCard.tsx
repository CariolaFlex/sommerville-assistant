'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { GlossaryTerm } from '@/types/glossary';

interface TermCardProps {
  term: GlossaryTerm;
  onClick: () => void;
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

  // Simple hash for consistency
  const hash = category.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
}

export function TermCard({ term, onClick }: TermCardProps) {
  return (
    <Card
      className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] h-full flex flex-col"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge className={getCategoryColor(term.categoria)} variant="secondary">
            {term.categoria}
          </Badge>
          <Badge variant="outline" className="text-xs">
            Cap. {term.capitulo}
          </Badge>
        </div>
        <CardTitle className="text-lg leading-tight">{term.nombre}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {term.descripcionBreve}
        </p>
        {term.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {term.keywords.slice(0, 3).map((keyword, idx) => (
              <Badge key={idx} variant="outline" className="text-xs">
                {keyword}
              </Badge>
            ))}
            {term.keywords.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{term.keywords.length - 3}
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
