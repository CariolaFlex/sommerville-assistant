import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles';

interface AvoidSectionProps {
  avoidItems: string[];
}

export function AvoidSection({ avoidItems }: AvoidSectionProps) {
  if (!avoidItems || avoidItems.length === 0) return null;

  return (
    <View style={styles.section}>
      <Text style={styles.h2}>Errores Comunes a Evitar</Text>

      <Text style={styles.paragraph}>
        Estos son errores frecuentes documentados en proyectos similares. Evitarlos
        aumentara significativamente las probabilidades de exito del proyecto.
      </Text>

      <View style={styles.list}>
        {avoidItems.map((item, i) => (
          <View key={i} style={styles.warningBox} wrap={false}>
            <View style={styles.listItem}>
              <Text style={[styles.listBullet, { color: '#dc2626', fontWeight: 'bold' }]}>{'\u2717'} </Text>
              <Text style={[styles.listContent, { color: '#92400e' }]}>{item}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
