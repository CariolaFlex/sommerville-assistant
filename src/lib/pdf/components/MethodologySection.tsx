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
        <Text style={styles.badge}>{methodology.references.chapter}</Text>
      </View>

      {/* Descripción */}
      {methodology.description && (
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.text}>{methodology.description}</Text>
        </View>
      )}

      {/* Origen */}
      {methodology.origin && (
        <View style={{ marginBottom: 16 }}>
          <Text style={styles.h4}>📜 Origen</Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Creador: </Text>
            {methodology.origin.creator} ({methodology.origin.year})
          </Text>
          <Text style={[styles.text, { marginTop: 4 }]}>{methodology.origin.context}</Text>
        </View>
      )}

      {/* Principios Fundamentales */}
      {methodology.principles && methodology.principles.length > 0 && (
        <>
          <Text style={styles.h4}>Principios Fundamentales</Text>
          <View style={styles.list}>
            {methodology.principles.map((principle, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.listBullet}>✓ </Text>
                <Text style={styles.listContent}>{principle}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* Diferenciadores */}
      {methodology.differentiators && methodology.differentiators.length > 0 && (
        <View style={{ marginTop: 12 }}>
          <Text style={styles.h4}>🎯 Diferenciadores Clave</Text>
          <View style={styles.list}>
            {methodology.differentiators.map((diff, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.listBullet}>• </Text>
                <Text style={styles.listContent}>{diff}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
