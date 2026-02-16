import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles';

interface AvoidSectionProps {
  avoidItems: string[];
}

export function AvoidSection({ avoidItems }: AvoidSectionProps) {
  if (!avoidItems || avoidItems.length === 0) return null;

  return (
    <View style={styles.section}>
      {/* Título de sección */}
      <Text style={styles.h2}>⚠️ Errores Comunes a Evitar</Text>

      <Text style={styles.paragraph}>
        Estos son errores frecuentes documentados en proyectos similares. Evitarlos
        aumentará significativamente las probabilidades de éxito.
      </Text>

      {/* Lista de items a evitar */}
      <View style={styles.list}>
        {avoidItems.map((item, i) => (
          <View key={i} style={styles.warningBox} wrap={false}>
            <View style={styles.listItem}>
              <Text style={[styles.listBullet, { color: '#f59e0b' }]}>✗ </Text>
              <Text style={[styles.listContent, { color: '#92400e' }]}>{item}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
