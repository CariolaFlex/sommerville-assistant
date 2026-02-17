import { FileText, Clock, BarChart3 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Template } from '@/lib/types/templates';

interface TemplateCardProps {
  template: Template;
  onClick: () => void;
}

const difficultyColors = {
  basic: 'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced: 'bg-red-100 text-red-800',
};

const categoryIcons = {
  requirements: FileText,
  architecture: BarChart3,
  testing: FileText,
  methodology: FileText,
  management: FileText,
};

export function TemplateCard({ template, onClick }: TemplateCardProps) {
  const Icon = categoryIcons[template.category];

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full flex flex-col" onClick={onClick}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <Icon className="h-8 w-8 text-blue-600 mb-2" />
          <Badge className={difficultyColors[template.difficulty]}>
            {template.difficulty}
          </Badge>
        </div>
        <CardTitle className="text-lg line-clamp-2">{template.name}</CardTitle>
        <CardDescription className="line-clamp-2">{template.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-between">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-2" />
            {template.estimatedTime}
          </div>
          <div className="flex flex-wrap gap-1">
            {template.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {template.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{template.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
        <Button variant="outline" className="w-full mt-4">
          Ver Preview
        </Button>
      </CardContent>
    </Card>
  );
}
