import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles';
import type { ProcessInfo } from '@/types/recommendation';

interface ProcessSectionProps {
  process: ProcessInfo;
}

export function ProcessSection({ process }: ProcessSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.h2}>Proceso de Desarrollo</Text>

      {/* Process name card */}
      <View style={styles.sectionCardHighlight}>
        <Text style={styles.h3}>{process.name}</Text>
        <View style={[styles.row, { marginTop: 4 }]}>
          <Text style={styles.badge}>Capitulo {process.chapter}</Text>
        </View>
      </View>

      {/* Why this process */}
      <Text style={styles.h4}>Justificacion</Text>
      <Text style={[styles.textSmall, { marginBottom: 4 }]}>
        Razones fundamentales por las que este proceso es el mas adecuado:
      </Text>
      <View style={styles.list}>
        {process.why.map((reason, i) => (
          <View key={i} style={styles.listItem}>
            <Text style={styles.listBullet}>{'\u2022'} </Text>
            <Text style={styles.listContent}>{reason}</Text>
          </View>
        ))}
      </View>

      {/* How to implement */}
      <Text style={styles.h4}>Implementacion</Text>
      <Text style={[styles.textSmall, { marginBottom: 4 }]}>
        Pasos recomendados para la implementacion del proceso:
      </Text>
      <View style={styles.list}>
        {process.how.map((step, i) => (
          <View key={i} style={styles.listItem}>
            <Text style={[styles.listBullet, { fontWeight: 'bold', color: '#1e3a5f' }]}>{i + 1}. </Text>
            <Text style={styles.listContent}>{step}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
