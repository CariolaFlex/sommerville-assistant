/**
 * WIZARD STEP COMPONENT - FASE 2
 *
 * Componente wrapper para cada paso del wizard
 */

'use client';

import { Question } from '@/lib/types/wizard';
import { QuestionCard } from './QuestionCard';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface WizardStepProps {
  question: Question;
  selectedValue?: string;
  onSelect: (value: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  currentStep: number;
  totalSteps: number;
}

export function WizardStep({
  question,
  selectedValue,
  onSelect,
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  currentStep,
  totalSteps,
}: WizardStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      {/* Question Card */}
      <QuestionCard question={question} selectedValue={selectedValue} onSelect={onSelect} />

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8 max-w-3xl mx-auto">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="lg"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Anterior
        </Button>

        {/* Next Button */}
        <Button
          size="lg"
          onClick={onNext}
          disabled={!canGoNext}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
        >
          {currentStep === totalSteps - 1 ? 'Finalizar' : 'Siguiente'}
          <ArrowRight className="w-5 h-5" />
        </Button>
      </div>

      {/* Additional Info */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-500">
          {!selectedValue && 'Selecciona una opción para continuar'}
          {selectedValue && canGoNext && (
            <span className="text-green-600 font-medium">
              ✓ Puedes continuar a la siguiente pregunta
            </span>
          )}
        </p>
      </div>
    </motion.div>
  );
}
