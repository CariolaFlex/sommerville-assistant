import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles';
import type { ProcessInfo } from '@/types/recommendation';

interface ProcessSectionProps {
  process: ProcessInfo;
}

export function ProcessSection({ process }: ProcessSectionProps) {
  return (
    <View style={styles.section}>
      {/* Título de sección */}
      <Text style={styles.h2}>📘 Proceso de Desarrollo</Text>

      {/* Nombre del proceso */}
      <Text style={styles.h3}>{process.name}</Text>

      {/* Badge de capítulo */}
      <View style={[styles.row, { marginBottom: 16 }]}>
        <Text style={styles.badge}>Capítulo {process.chapter}</Text>
      </View>

      {/* ¿Por qué? */}
      <Text style={styles.h4}>¿Por qué este proceso?</Text>
      <View style={styles.list}>
        {process.why.map((reason, i) => (
          <View key={i} style={styles.listItem}>
            <Text style={styles.listBullet}>• </Text>
            <Text style={styles.listContent}>{reason}</Text>
          </View>
        ))}
      </View>

      {/* ¿Cómo? */}
      <Text style={styles.h4}>¿Cómo implementarlo?</Text>
      <View style={styles.list}>
        {process.how.map((step, i) => (
          <View key={i} style={styles.listItem}>
            <Text style={styles.listBullet}>{i + 1}. </Text>
            <Text style={styles.listContent}>{step}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
