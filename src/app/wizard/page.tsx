'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useWizard } from '@/hooks/useWizard';
import { OptionCard } from '@/components/wizard/OptionCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Home, RotateCcw } from 'lucide-react';

export default function WizardPage() {
  const router = useRouter();
  const {
    currentStep,
    selectedPath,
    selectOption,
    goBack,
    reset,
    canGoBack,
    progress,
    stepNumber,
  } = useWizard();

  const handleOptionSelect = useCallback((optionId: string) => {
    const result = selectOption(optionId);

    if (result?.finished && result.recommendationId) {
      // Navegar a la página de resultados
      router.push(`/results/${result.recommendationId}`);
    }
  }, [selectOption, router]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                Wizard de Decisiones
              </h1>
              <p className="text-muted-foreground mt-2">
                Responde las preguntas para obtener una recomendación personalizada
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push('/')}
              >
                <Home className="h-4 w-4 mr-2" />
                Inicio
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={reset}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Reiniciar
              </Button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                Paso {stepNumber}
              </span>
              <span className="font-semibold text-primary">
                {progress}% completado
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Breadcrumb */}
          {selectedPath.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedPath.map((pathItem, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {currentStep.options.find(opt => opt.id === pathItem)?.label || pathItem}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Current Step */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-900 rounded-lg p-6 shadow-md border mb-6">
            <div className="flex items-start gap-3 mb-2">
              <Badge variant="outline" className="mt-1">
                Cap. {currentStep.chapter}
              </Badge>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {currentStep.question}
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {currentStep.description}
                </p>
              </div>
            </div>
          </div>

          {/* Options Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {currentStep.options.map((option) => {
              const handleSelect = () => handleOptionSelect(option.id);
              return (
                <OptionCard
                  key={option.id}
                  option={option}
                  onSelect={handleSelect}
                />
              );
            })}
          </div>
        </div>

        {/* Navigation */}
        {canGoBack && (
          <div className="flex justify-center">
            <Button
              variant="outline"
              onClick={goBack}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al paso anterior
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
