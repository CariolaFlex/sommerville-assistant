'use client';

import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ArrowLeft,
  BookOpen,
  Zap,
  Box,
  Building2,
  Calendar,
  BarChart3,
  Share2,
  AlertCircle,
} from 'lucide-react';
import { useRecommendation } from '@/hooks/useRecommendation';
import { ProcessTab } from '@/components/results/ProcessTab';
import { MethodologyTab } from '@/components/results/MethodologyTab';
import { ModelingTab } from '@/components/results/ModelingTab';
import { ArchitectureTab } from '@/components/results/ArchitectureTab';
import { TimelineTab } from '@/components/results/TimelineTab';
import { DiagramsTab } from '@/components/results/DiagramsTab';
import { TemplatesSection } from '@/components/results/TemplatesSection';
import { ChecklistsSection } from '@/components/results/ChecklistsSection';
import { AvoidSection } from '@/components/results/AvoidSection';
import { ExportButton } from '@/components/results/ExportButton';

export default function ResultsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { recommendation, applicableTemplates, applicableChecklists, isLoading, error } =
    useRecommendation(id);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando recomendación...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !recommendation) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="max-w-md w-full border-red-200 dark:border-red-800">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Recomendación no encontrada</h2>
            <p className="text-muted-foreground mb-6">
              {error || 'No se pudo cargar la recomendación solicitada.'}
            </p>
            <Button onClick={() => router.push('/wizard')} className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Volver al asistente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-40 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push('/wizard')}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al asistente
            </Button>

            <div className="flex gap-2">
              <ExportButton
                recommendation={recommendation}
                templates={applicableTemplates}
                checklists={applicableChecklists}
              />
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="h-4 w-4" />
                Compartir
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Title Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline" className="text-sm">
              ID: {recommendation.id}
            </Badge>
            <Badge variant="secondary">
              Capítulo {recommendation.process.chapter}
            </Badge>
          </div>
          <h1 className="text-4xl font-bold mb-4">{recommendation.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {recommendation.pathDescription}
          </p>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="process" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-grid">
            <TabsTrigger value="process" className="gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Proceso</span>
            </TabsTrigger>
            <TabsTrigger value="methodology" className="gap-2">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Metodología</span>
            </TabsTrigger>
            <TabsTrigger value="modeling" className="gap-2">
              <Box className="h-4 w-4" />
              <span className="hidden sm:inline">Modelado</span>
            </TabsTrigger>
            <TabsTrigger value="architecture" className="gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Arquitectura</span>
            </TabsTrigger>
            <TabsTrigger value="timeline" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Timeline</span>
            </TabsTrigger>
            <TabsTrigger value="diagrams" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Diagramas</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="process" className="space-y-6">
            <ProcessTab process={recommendation.process} />
          </TabsContent>

          <TabsContent value="methodology" className="space-y-6">
            <MethodologyTab methodology={recommendation.methodology} />
          </TabsContent>

          <TabsContent value="modeling" className="space-y-6">
            <ModelingTab modeling={recommendation.modeling} />
          </TabsContent>

          <TabsContent value="architecture" className="space-y-6">
            <ArchitectureTab architecture={recommendation.architecture} />
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <TimelineTab timeline={recommendation.timeline} />
          </TabsContent>

          <TabsContent value="diagrams" className="space-y-6">
            <DiagramsTab recommendation={recommendation} />
          </TabsContent>
        </Tabs>

        {/* Templates Section */}
        {applicableTemplates.length > 0 && (
          <div className="mt-12">
            <TemplatesSection templates={applicableTemplates} />
          </div>
        )}

        {/* Checklists Section */}
        {applicableChecklists.length > 0 && (
          <div className="mt-12">
            <ChecklistsSection checklists={applicableChecklists} />
          </div>
        )}

        {/* Avoid Section */}
        {recommendation.avoid && recommendation.avoid.length > 0 && (
          <div className="mt-12">
            <AvoidSection avoidItems={recommendation.avoid} />
          </div>
        )}

        {/* Footer Navigation */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <Button
              variant="outline"
              onClick={() => router.push('/wizard')}
              className="gap-2 w-full sm:w-auto"
            >
              <ArrowLeft className="h-4 w-4" />
              Nueva consulta
            </Button>

            <div className="flex gap-2 w-full sm:w-auto">
              <ExportButton
                recommendation={recommendation}
                templates={applicableTemplates}
                checklists={applicableChecklists}
              />
              <Button className="gap-2 flex-1 sm:flex-none">
                <Share2 className="h-4 w-4" />
                Compartir resultados
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16 py-8 bg-muted/50">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            Basado en <strong>Ingeniería de Software</strong> de Ian Sommerville (Capítulos
            1-6)
          </p>
          <p className="mt-2">
            Esta herramienta es solo una guía. Adapta las recomendaciones a tu contexto
            específico.
          </p>
        </div>
      </footer>
    </div>
  );
}
