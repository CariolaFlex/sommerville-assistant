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

      {/* Estilo arquitectónico */}
      <Text style={styles.h3}>Estilo: {architecture.style}</Text>

      {/* Patrones */}
      {architecture.patterns && architecture.patterns.length > 0 && (
        <>
          <Text style={styles.h4}>Patrones Arquitectónicos</Text>
          {architecture.patterns.map((pattern, i) => (
            <View key={i} style={{ marginBottom: 12 }}>
              <Text style={styles.text}><Text style={{ fontWeight: 'bold' }}>{pattern.name}: </Text>{pattern.description}</Text>

              {pattern.advantages && pattern.advantages.length > 0 && (
                <View style={{ marginTop: 4 }}>
                  <Text style={[styles.text, { fontSize: 9, fontWeight: 'bold' }]}>Ventajas:</Text>
                  <View style={styles.list}>
                    {pattern.advantages.slice(0, 3).map((adv, j) => (
                      <View key={j} style={styles.listItem}>
                        <Text style={styles.listBullet}>+ </Text>
                        <Text style={styles.listContent}>{adv}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}
        </>
      )}

      {/* Atributos de Calidad */}
      {architecture.qualityAttributes && (
        <>
          <Text style={styles.h4}>Atributos de Calidad</Text>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.listBullet}>📈 </Text>
              <Text style={styles.listContent}><Text style={{ fontWeight: 'bold' }}>Escalabilidad: </Text>{architecture.qualityAttributes.scalability}</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listBullet}>🔧 </Text>
              <Text style={styles.listContent}><Text style={{ fontWeight: 'bold' }}>Mantenibilidad: </Text>{architecture.qualityAttributes.maintainability}</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listBullet}>⚡ </Text>
              <Text style={styles.listContent}><Text style={{ fontWeight: 'bold' }}>Performance: </Text>{architecture.qualityAttributes.performance}</Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listBullet}>🔒 </Text>
              <Text style={styles.listContent}><Text style={{ fontWeight: 'bold' }}>Seguridad: </Text>{architecture.qualityAttributes.security}</Text>
            </View>
          </View>
        </>
      )}
    </View>
  );
}
