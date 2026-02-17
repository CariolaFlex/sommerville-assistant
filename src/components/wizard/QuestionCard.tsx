/**
 * QUESTION CARD COMPONENT - FASE 2
 *
 * Componente para mostrar una pregunta con sus opciones
 */

'use client';

import { Question } from '@/lib/types/wizard';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Info } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  selectedValue?: string;
  onSelect: (value: string) => void;
}

export function QuestionCard({ question, selectedValue, onSelect }: QuestionCardProps) {
  // Helper para obtener el icono de Lucide
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>)[iconName];
    return Icon ? <Icon className="w-6 h-6" /> : null;
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Question Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">{question.text}</h2>

        {/* Help Text */}
        <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">{question.helpText}</p>
        </div>
      </div>

      {/* Options */}
      <RadioGroup value={selectedValue} onValueChange={onSelect}>
        <div className="space-y-3">
          {question.options.map((option) => (
            <Card
              key={option.value}
              className={`
                relative cursor-pointer transition-all duration-200 hover:shadow-md
                ${
                  selectedValue === option.value
                    ? 'border-2 border-blue-500 bg-blue-50 shadow-md'
                    : 'border border-gray-200 hover:border-blue-300'
                }
              `}
              onClick={() => onSelect(option.value)}
            >
              <div className="flex items-start gap-4 p-4">
                {/* Radio Button */}
                <RadioGroupItem
                  value={option.value}
                  id={option.value}
                  className="mt-1 flex-shrink-0"
                />

                {/* Icon */}
                <div
                  className={`
                    flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center
                    ${
                      selectedValue === option.value
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-600'
                    }
                  `}
                >
                  {getIcon(option.icon)}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <Label
                    htmlFor={option.value}
                    className={`
                      block text-base font-semibold cursor-pointer mb-1
                      ${selectedValue === option.value ? 'text-blue-900' : 'text-gray-900'}
                    `}
                  >
                    {option.label}
                  </Label>
                  <p
                    className={`
                      text-sm
                      ${selectedValue === option.value ? 'text-blue-700' : 'text-gray-600'}
                    `}
                  >
                    {option.description}
                  </p>
                </div>

                {/* Checkmark indicator */}
                {selectedValue === option.value && (
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
}
