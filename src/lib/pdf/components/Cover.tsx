import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from '../styles';
import { formatPDFDate } from '../utils';
import type { Recommendation } from '@/types/recommendation';

interface CoverProps {
  recommendation: Recommendation;
}

export function Cover({ recommendation }: CoverProps) {
  return (
    <Page size="A4" style={styles.page}>
      <View style={styles.cover}>
        {/* Emoji/Logo */}
        <Text style={styles.coverEmoji}>🎓</Text>

        {/* Título principal */}
        <Text style={styles.coverTitle}>Sommerville Assistant</Text>

        {/* Subtítulo con recomendación */}
        <Text style={styles.coverSubtitle}>{recommendation.title}</Text>

        {/* Metadata */}
        <View style={{ marginTop: 40 }}>
          <Text style={styles.coverMeta}>
            Fecha de generación: {formatPDFDate()}
          </Text>
          <Text style={styles.coverMeta}>
            ID: {recommendation.id}
          </Text>
          <Text style={styles.coverMeta}>
            Capítulos: {recommendation.chapters.join(', ')}
          </Text>
        </View>

        {/* Footer de portada */}
        <View style={{ marginTop: 'auto', paddingBottom: 40 }}>
          <Text style={styles.coverFooter}>
            Basado en &quot;Ingeniería de Software&quot; de Ian Sommerville
          </Text>
          <Text style={styles.coverFooter}>
            9na edición - Capítulos 1-6
          </Text>
          <Text style={[styles.coverFooter, { marginTop: 16 }]}>
            Generado automáticamente por Sommerville Assistant
          </Text>
        </View>
      </View>
    </Page>
  );
}
