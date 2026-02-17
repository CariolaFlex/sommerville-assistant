/**
 * PROGRESS BAR COMPONENT - FASE 2
 *
 * Barra de progreso visual para el wizard
 */

'use client';

import { CheckCircle, Circle } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  answeredSteps: Set<number>;
  onStepClick?: (step: number) => void;
}

export function ProgressBar({
  currentStep,
  totalSteps,
  answeredSteps,
  onStepClick,
}: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-4">
        <div
          className="absolute top-0 left-0 h-full bg-blue-600 transition-all duration-300 ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Indicators */}
      <div className="flex items-center justify-between">
        {Array.from({ length: totalSteps }, (_, index) => {
          const isAnswered = answeredSteps.has(index);
          const isCurrent = index === currentStep;
          const isPast = index < currentStep;

          return (
            <button
              key={index}
              onClick={() => onStepClick?.(index)}
              disabled={!onStepClick}
              className={`
                flex flex-col items-center gap-1 transition-all
                ${onStepClick ? 'cursor-pointer hover:scale-110' : 'cursor-default'}
              `}
              title={`Pregunta ${index + 1}`}
            >
              {/* Circle Icon */}
              <div
                className={`
                  w-8 h-8 rounded-full flex items-center justify-center transition-all
                  ${
                    isCurrent
                      ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                      : isPast || isAnswered
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }
                `}
              >
                {isPast || isAnswered ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Circle className="w-5 h-5" />
                )}
              </div>

              {/* Step Number */}
              <span
                className={`
                  text-xs font-medium transition-all
                  ${
                    isCurrent
                      ? 'text-blue-600 font-bold'
                      : isPast || isAnswered
                      ? 'text-green-600'
                      : 'text-gray-500'
                  }
                `}
              >
                {index + 1}
              </span>
            </button>
          );
        })}
      </div>

      {/* Progress Text */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-600">
          Pregunta <span className="font-bold text-blue-600">{currentStep + 1}</span> de{' '}
          <span className="font-bold">{totalSteps}</span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {Math.round(progress)}% completado
        </p>
      </div>
    </div>
  );
}
