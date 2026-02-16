import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles';
import type { MethodologyInfo } from '@/types/recommendation';

interface MethodologySectionProps {
  methodology: MethodologyInfo;
}

export function MethodologySection({ methodology }: MethodologySectionProps) {
  return (
    <View style={styles.section}>
      {/* Título de sección */}
      <Text style={styles.h2}>⚡ Metodología Recomendada</Text>

      {/* Nombre de metodología */}
      <Text style={styles.h3}>{methodology.name}</Text>

      {/* Badge de capítulo */}
      <View style={[styles.row, { marginBottom: 16 }]}>
        <Text style={styles.badge}>Capítulo {methodology.chapter}</Text>
      </View>

      {/* Prácticas recomendadas */}
      {methodology.practices && methodology.practices.length > 0 && (
        <>
          <Text style={styles.h4}>Prácticas Recomendadas</Text>
          <View style={styles.list}>
            {methodology.practices.map((practice, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.listBullet}>✓ </Text>
                <Text style={styles.listContent}>{practice}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
}
