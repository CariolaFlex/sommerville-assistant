'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, ExternalLink, Clock, Eye } from 'lucide-react';
import { TemplateModal } from './TemplateModal';
import type { Template } from '@/types/templates';

interface TemplatesSectionProps {
  templates: Template[];
}

export function TemplatesSection({ templates }: TemplatesSectionProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewTemplate = (template: Template) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };
  if (templates.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6 text-center text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No hay plantillas específicas para esta recomendación</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div>
        <div className="flex items-center gap-3 mb-6">
          <FileText className="h-6 w-6 text-blue-600" />
          <div>
            <h3 className="text-2xl font-bold">Plantillas Disponibles</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Recursos listos para usar en tu proyecto
            </p>
          </div>
          <Badge variant="outline" className="ml-auto">
            {templates.length} plantilla{templates.length !== 1 ? 's' : ''}
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="hover:shadow-lg transition-all hover:scale-[1.02]"
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-2 mb-2">
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
              </div>
              <CardTitle className="text-lg">{template.name}</CardTitle>
              <CardDescription className="text-sm leading-relaxed">
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{template.estimatedTime}</span>
                </div>

                <div className="flex flex-wrap gap-1">
                  {template.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => handleViewTemplate(template)}
                  >
                    <Eye className="h-4 w-4" />
                    Ver plantilla
                  </Button>
                  <Link href="/templates">
                    <Button variant="outline" size="sm" className="gap-1">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        </div>
      </div>

      <TemplateModal
        template={selectedTemplate}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </>
  );
}
