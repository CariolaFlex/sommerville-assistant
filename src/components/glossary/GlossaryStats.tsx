'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Layers, Tags, TrendingUp } from 'lucide-react';

interface GlossaryStatsProps {
  totalTerms: number;
  chaptersCount: number;
  categoriesCount: number;
  mostReferencedTerm?: { name: string; count: number; id: string };
}

export function GlossaryStats({
  totalTerms,
  chaptersCount,
  categoriesCount,
  mostReferencedTerm,
}: GlossaryStatsProps) {
  const stats = [
    {
      title: 'Total de Términos',
      value: totalTerms.toLocaleString(),
      icon: BookOpen,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      description: 'Términos técnicos indexados',
    },
    {
      title: 'Capítulos Cubiertos',
      value: chaptersCount,
      icon: Layers,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      description: 'Del libro de Sommerville',
    },
    {
      title: 'Categorías Únicas',
      value: categoriesCount,
      icon: Tags,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      description: 'Clasificaciones diferentes',
    },
    {
      title: 'Término Más Referenciado',
      value: mostReferencedTerm?.name || 'N/A',
      subtitle: mostReferencedTerm
        ? `${mostReferencedTerm.count} referencias`
        : 'Sin referencias',
      icon: TrendingUp,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      description: 'Más conectado con otros términos',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <Card key={idx} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold truncate" title={stat.value.toString()}>
                {stat.value}
              </div>
              {stat.subtitle && (
                <p className="text-xs text-muted-foreground mt-1">{stat.subtitle}</p>
              )}
              <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
