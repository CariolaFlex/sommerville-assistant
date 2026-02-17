/**
 * RESULTS PREVIEW COMPONENT - FASE 2
 *
 * Preview de la recomendación generada al final del wizard
 */

'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  FileText,
  RotateCcw,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { ExportWizardResultButton } from './ExportWizardResultButton';

interface ResultsPreviewProps {
  recommendationId: string;
  recommendationTitle?: string;
  recommendationDescription?: string;
  answers: Record<string, string | undefined>;
  onReset: () => void;
}

export function ResultsPreview({
  recommendationId,
  recommendationTitle,
  recommendationDescription,
  answers,
  onReset,
}: ResultsPreviewProps) {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/results/${recommendationId}`);
  };

  // Contar respuestas
  const answeredCount = Object.keys(answers).length;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto"
    >
      {/* Success Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-4"
        >
          <CheckCircle className="w-12 h-12 text-green-600" />
        </motion.div>

        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          ¡Recomendación Lista! 🎉
        </h2>
        <p className="text-lg text-gray-600">
          Basado en tus {answeredCount} respuestas, hemos identificado el mejor proceso para tu
          proyecto
        </p>
      </div>

      {/* Recommendation Card */}
      <Card className="p-8 border-2 border-green-500 bg-gradient-to-br from-green-50 to-blue-50 shadow-lg mb-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">
              Recomendación Personalizada
            </p>
            <h3 className="text-2xl font-bold text-gray-900">
              {recommendationTitle || recommendationId}
            </h3>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
            <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Proceso Recomendado</p>
              <p className="text-sm text-gray-600">
                Ver detalles completos sobre proceso, metodología, modelado y arquitectura
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-gray-200">
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900 mb-1">Mejores Prácticas</p>
              <p className="text-sm text-gray-600">
                Accede a templates, checklists y prácticas específicas para tu contexto
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* View Details Button */}
        <Button
          size="lg"
          onClick={handleViewDetails}
          className="bg-blue-600 hover:bg-blue-700 gap-2 md:col-span-2"
        >
          Ver Detalles Completos
          <ArrowRight className="w-5 h-5" />
        </Button>

        {/* Export PDF Button */}
        <ExportWizardResultButton
          recommendationId={recommendationId}
          recommendationTitle={recommendationTitle || recommendationId}
          recommendationDescription={recommendationDescription}
          answers={answers}
          variant="outline"
          size="lg"
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
        />
      </div>

      {/* Reset Button */}
      <div className="mt-6 text-center">
        <Button variant="ghost" onClick={onReset} className="gap-2 text-gray-600">
          <RotateCcw className="w-4 h-4" />
          Empezar de Nuevo
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-blue-600">{answeredCount}</p>
          <p className="text-sm text-gray-600">Preguntas</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-green-600">1</p>
          <p className="text-sm text-gray-600">Recomendación</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-lg">
          <p className="text-2xl font-bold text-purple-600">100%</p>
          <p className="text-sm text-gray-600">Match</p>
        </div>
      </div>
    </motion.div>
  );
}
