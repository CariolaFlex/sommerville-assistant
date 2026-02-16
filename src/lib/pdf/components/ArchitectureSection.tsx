import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles';
import type { ArchitectureInfo } from '@/types/recommendation';

interface ArchitectureSectionProps {
  architecture: ArchitectureInfo;
}

export function ArchitectureSection({ architecture }: ArchitectureSectionProps) {
  return (
    <View style={styles.section} break>
      {/* Título de sección */}
      <Text style={styles.h2}>🏗️ Arquitectura del Sistema</Text>

      {/* Patrón arquitectónico */}
      <Text style={styles.h3}>Patrón: {architecture.pattern}</Text>

      {/* Justificación (why) */}
      {architecture.why && (
        <>
          <Text style={styles.h4}>Justificación</Text>
          <Text style={styles.paragraph}>{architecture.why}</Text>
        </>
      )}

      {/* Capas */}
      {architecture.layers && architecture.layers.length > 0 && (
        <>
          <Text style={styles.h4}>Capas del Sistema</Text>
          <View style={styles.list}>
            {architecture.layers.map((layer, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.listBullet}>{i + 1}. </Text>
                <Text style={styles.listContent}>{layer}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* Consideraciones */}
      {architecture.considerations && architecture.considerations.length > 0 && (
        <>
          <Text style={styles.h4}>Consideraciones Especiales</Text>
          <View style={styles.list}>
            {architecture.considerations.map((consideration, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.listBullet}>! </Text>
                <Text style={styles.listContent}>{consideration}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
}
