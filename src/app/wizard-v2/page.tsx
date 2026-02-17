/**
 * WIZARD V2 PAGE - FASE 2
 *
 * Página principal del wizard interactivo paso a paso
 */

'use client';

import { useEffect, useState } from 'react';
import { useWizardState } from '@/hooks/useWizardState';
import { ProgressBar } from '@/components/wizard/ProgressBar';
import { WizardStep } from '@/components/wizard/WizardStep';
import { ResultsPreview } from '@/components/wizard/ResultsPreview';
import { getBestRecommendation } from '@/lib/wizard/scoringAlgorithm';
import { wizardQuestions } from '@/lib/wizard/questions';
import recommendationsData from '@/data/recommendations.json';
import { AnimatePresence } from 'framer-motion';
import { Home } from 'lucide-react';
import Link from 'next/link';

export default function WizardV2Page() {
  const {
    currentStep,
    totalSteps,
    answers,
    recommendationId,
    isComplete,
    nextStep,
    previousStep,
    goToStep,
    setAnswer,
    setRecommendation,
    completeWizard,
    resetWizard,
    canGoNext,
    canGoPrevious,
    getCurrentQuestion,
    getProgress,
  } = useWizardState();

  interface RecommendationData {
    id: string;
    title: string;
    pathDescription?: string;
  }

  const [currentRecommendation, setCurrentRecommendation] = useState<RecommendationData | null>(null);

  const currentQuestion = getCurrentQuestion();

  // Calcular recomendación cuando se responde la última pregunta
  useEffect(() => {
    const answeredCount = Object.keys(answers).length;

    if (answeredCount === totalSteps && !isComplete) {
      interface RecDataType {
        id: string;
        title: string;
        path: string[];
        pathDescription: string;
        process: { name: string };
        methodology?: { name: string };
      }

      // Todas las preguntas respondidas, calcular recomendación
      const recommendations = Object.values(recommendationsData.recommendations).map((rec) => {
        const typedRec = rec as RecDataType;
        return {
          id: typedRec.id,
          title: typedRec.title,
          path: typedRec.path,
          pathDescription: typedRec.pathDescription,
          process: typedRec.process,
          methodology: typedRec.methodology,
        };
      });

      const bestRecId = getBestRecommendation(answers, recommendations);
      setRecommendation(bestRecId);
      completeWizard();

      // Guardar recomendación actual para preview
      const recData = (recommendationsData.recommendations as Record<string, RecDataType>)[bestRecId];
      setCurrentRecommendation(recData);
    }
  }, [answers, totalSteps, isComplete, setRecommendation, completeWizard]);

  // Handler para seleccionar respuesta
  const handleSelectAnswer = (value: string) => {
    setAnswer(currentQuestion.id, value);
  };

  // Handler para siguiente paso
  const handleNext = () => {
    if (currentStep === totalSteps - 1 && canGoNext()) {
      // Última pregunta, ir a resultados
      completeWizard();
    } else if (canGoNext()) {
      nextStep();
    }
  };

  // Handler para reset
  const handleReset = () => {
    if (confirm('¿Seguro que quieres empezar de nuevo? Perderás todas tus respuestas.')) {
      resetWizard();
      setCurrentRecommendation(null);
    }
  };

  // Get answered steps set
  const answeredStepsSet = new Set(
    wizardQuestions
      .map((q, idx) => (answers[q.id] ? idx : null))
      .filter((idx) => idx !== null) as number[]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Wizard de Recomendaciones
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Encuentra el proceso ideal para tu proyecto
              </p>
            </div>
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <Home className="w-5 h-5" />
              <span className="hidden sm:inline">Inicio</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {!isComplete ? (
          <>
            {/* Progress Bar */}
            <ProgressBar
              currentStep={currentStep}
              totalSteps={totalSteps}
              answeredSteps={answeredStepsSet}
              onStepClick={goToStep}
            />

            {/* Wizard Step */}
            <AnimatePresence mode="wait">
              <WizardStep
                key={currentStep}
                question={currentQuestion}
                selectedValue={answers[currentQuestion.id]}
                onSelect={handleSelectAnswer}
                onNext={handleNext}
                onPrevious={previousStep}
                canGoNext={canGoNext()}
                canGoPrevious={canGoPrevious()}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            </AnimatePresence>
          </>
        ) : (
          /* Results Preview */
          <ResultsPreview
            recommendationId={recommendationId || 'rec-006'}
            recommendationTitle={currentRecommendation?.title}
            recommendationDescription={currentRecommendation?.pathDescription}
            answers={answers}
            onReset={handleReset}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-6 text-center text-sm text-gray-500 border-t border-gray-200">
        <p>
          Basado en &quot;Ingeniería de Software&quot; - Ian Sommerville (Cap. 1-6) •{' '}
          <span className="font-medium">{getProgress()}% completado</span>
        </p>
      </footer>
    </div>
  );
}
