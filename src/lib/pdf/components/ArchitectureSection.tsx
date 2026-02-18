import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles';
import type { ArchitectureInfo } from '@/types/recommendation';

interface ArchitectureSectionProps {
  architecture: ArchitectureInfo;
}

export function ArchitectureSection({ architecture }: ArchitectureSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.h2}>4. Arquitectura del Sistema</Text>

      {/* Architecture style */}
      <View style={styles.sectionCardHighlight}>
        <Text style={styles.h3}>Estilo: {architecture.style}</Text>
      </View>

      {/* Patterns */}
      {architecture.patterns && architecture.patterns.length > 0 && (
        <View style={{ marginTop: 6 }}>
          <Text style={styles.h4}>Patrones Arquitectonicos</Text>
          {architecture.patterns.map((pattern, i) => (
            <View key={i} style={[styles.sectionCard, { marginBottom: 10 }]} wrap={false}>
              <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#1e3a5f', marginBottom: 6 }}>
                {pattern.name}
              </Text>
              <Text style={[styles.text, { marginBottom: 8 }]}>{pattern.description}</Text>

              {pattern.advantages && pattern.advantages.length > 0 && (
                <View style={{ marginTop: 6 }}>
                  <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#059669', marginBottom: 4 }}>Ventajas:</Text>
                  <View style={styles.list}>
                    {pattern.advantages.slice(0, 4).map((adv, j) => (
                      <View key={j} style={styles.listItem}>
                        <Text style={[styles.listBullet, { color: '#059669' }]}>+</Text>
                        <Text style={styles.listContent}>{adv}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}

              {pattern.disadvantages && pattern.disadvantages.length > 0 && (
                <View style={{ marginTop: 6 }}>
                  <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#dc2626', marginBottom: 4 }}>Desventajas:</Text>
                  <View style={styles.list}>
                    {pattern.disadvantages.slice(0, 3).map((dis, j) => (
                      <View key={j} style={styles.listItem}>
                        <Text style={[styles.listBullet, { color: '#dc2626' }]}>-</Text>
                        <Text style={styles.listContent}>{dis}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Quality Attributes */}
      {architecture.qualityAttributes && (
        <View style={{ marginTop: 6 }}>
          <Text style={styles.h4}>Atributos de Calidad</Text>
          <View style={styles.table}>
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={[styles.tableCellHeader, { flex: 1.2 }]}>Atributo</Text>
              <Text style={[styles.tableCellHeader, { flex: 3 }]}>Descripcion</Text>
            </View>
            {[
              { name: 'Escalabilidad', value: architecture.qualityAttributes.scalability },
              { name: 'Mantenibilidad', value: architecture.qualityAttributes.maintainability },
              { name: 'Performance', value: architecture.qualityAttributes.performance },
              { name: 'Seguridad', value: architecture.qualityAttributes.security },
            ].map((attr, i) => (
              <View key={i} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlternate : {}]} wrap={false}>
                <Text style={[styles.tableCell, { flex: 1.2, fontWeight: 'bold' }]}>{attr.name}</Text>
                <Text style={[styles.tableCell, { flex: 3 }]}>{attr.value}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
