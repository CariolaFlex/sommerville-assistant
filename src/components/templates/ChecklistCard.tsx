import { CheckSquare, BarChart3 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Checklist } from '@/lib/types/templates';

interface ChecklistCardProps {
  checklist: Checklist;
  onClick: () => void;
}

const difficultyColors = {
  basic: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
};

export function ChecklistCard({ checklist, onClick }: ChecklistCardProps) {
  const requiredItems = checklist.items.filter((item) => item.required).length;
  const totalItems = checklist.items.length;

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full flex flex-col" onClick={onClick}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CheckSquare className="h-8 w-8 text-green-600 mb-2" />
          <Badge className={difficultyColors[checklist.difficulty]}>
            {checklist.difficulty}
          </Badge>
        </div>
        <CardTitle className="text-lg line-clamp-2">{checklist.name}</CardTitle>
        <CardDescription className="line-clamp-2">{checklist.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <BarChart3 className="h-4 w-4 mr-2" />
            {totalItems} items ({requiredItems} obligatorios)
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Badge variant="secondary" className="text-xs">
              {checklist.methodology.toUpperCase()}
            </Badge>
          </div>
          <div className="flex flex-wrap gap-1">
            {checklist.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {checklist.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{checklist.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
        <Button variant="outline" className="w-full mt-4">
          Ver Checklist
        </Button>
      </CardContent>
    </Card>
  );
}
