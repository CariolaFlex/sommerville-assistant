/**
 * WIZARD RESULT PDF DOCUMENT - FASE 2
 *
 * Componente para exportar resultados del wizard a PDF
 */

'use client';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Registrar fuentes
Font.register({
  family: 'Roboto',
  src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf',
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Roboto',
    fontSize: 11,
    lineHeight: 1.6,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottom: '2 solid #2563eb',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: '1 solid #e5e7eb',
  },
  questionBlock: {
    marginBottom: 12,
    padding: 10,
    backgroundColor: '#f9fafb',
    borderRadius: 4,
  },
  questionText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 4,
  },
  answerText: {
    fontSize: 10,
    color: '#059669',
    marginLeft: 10,
  },
  recommendationBox: {
    padding: 15,
    backgroundColor: '#dbeafe',
    borderRadius: 4,
    marginBottom: 15,
  },
  recommendationTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1e40af',
    marginBottom: 5,
  },
  recommendationDesc: {
    fontSize: 10,
    color: '#1f2937',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 9,
    color: '#9ca3af',
    borderTop: '1 solid #e5e7eb',
    paddingTop: 10,
  },
  infoBox: {
    padding: 12,
    backgroundColor: '#fef3c7',
    borderLeft: '3 solid #f59e0b',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 10,
    color: '#92400e',
  },
});

interface WizardResultPDFProps {
  recommendationId: string;
  recommendationTitle: string;
  recommendationDescription?: string;
  answers: Record<string, string | undefined>;
  questions: Array<{
    id: string;
    text: string;
    options: Array<{ value: string; label: string }>;
  }>;
}

export function WizardResultPDFDocument({
  recommendationId,
  recommendationTitle,
  recommendationDescription,
  answers,
  questions,
}: WizardResultPDFProps) {
  // Helper para obtener label de respuesta
  const getAnswerLabel = (questionId: string, answerValue: string) => {
    const question = questions.find((q) => q.id === questionId);
    const option = question?.options.find((o) => o.value === answerValue);
    return option?.label || answerValue;
  };

  const currentDate = new Date().toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Recomendación de Proceso de Software</Text>
          <Text style={styles.subtitle}>
            Generado el {currentDate} • Sommerville Assistant
          </Text>
        </View>

        {/* Info Box */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            Este documento contiene una recomendación personalizada basada en las características
            de tu proyecto. Utilízalo como guía para seleccionar el proceso, metodología y
            arquitectura más adecuados.
          </Text>
        </View>

        {/* Recommendation Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📋 Recomendación</Text>
          <View style={styles.recommendationBox}>
            <Text style={styles.recommendationTitle}>{recommendationTitle}</Text>
            <Text style={styles.recommendationDesc}>
              ID: {recommendationId}
            </Text>
            {recommendationDescription && (
              <Text style={[styles.recommendationDesc, { marginTop: 5 }]}>
                {recommendationDescription}
              </Text>
            )}
          </View>
        </View>

        {/* Answers Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Tus Respuestas</Text>
          {questions.map((question, index) => {
            const answer = answers[question.id];
            if (!answer) return null;

            return (
              <View key={question.id} style={styles.questionBlock}>
                <Text style={styles.questionText}>
                  {index + 1}. {question.text}
                </Text>
                <Text style={styles.answerText}>
                  ✓ {getAnswerLabel(question.id, answer)}
                </Text>
              </View>
            );
          })}
        </View>

        {/* Next Steps Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🚀 Próximos Pasos</Text>
          <View style={{ marginLeft: 10 }}>
            <Text style={{ fontSize: 10, marginBottom: 5 }}>
              1. Revisa los detalles completos de la recomendación en la aplicación
            </Text>
            <Text style={{ fontSize: 10, marginBottom: 5 }}>
              2. Explora las mejores prácticas específicas para tu contexto
            </Text>
            <Text style={{ fontSize: 10, marginBottom: 5 }}>
              3. Descarga templates y checklists relevantes
            </Text>
            <Text style={{ fontSize: 10, marginBottom: 5 }}>
              4. Consulta el glosario para términos técnicos
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>
            Basado en &quot;Ingeniería de Software&quot; - Ian Sommerville (9na edición, Cap. 1-6)
          </Text>
          <Text>Sommerville Assistant • Dev Hub para Ingeniería de Software</Text>
        </View>
      </Page>
    </Document>
  );
}
