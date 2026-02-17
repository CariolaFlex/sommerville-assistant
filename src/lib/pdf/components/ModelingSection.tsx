import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles';
import type { ModelingInfo } from '@/types/recommendation';

interface ModelingSectionProps {
  modeling: ModelingInfo;
}

export function ModelingSection({ modeling }: ModelingSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.h2}>Modelado y Notaciones</Text>

      {/* Chapter reference */}
      <View style={[styles.row, { marginBottom: 8 }]}>
        <Text style={styles.badge}>{modeling.references.chapter}</Text>
      </View>

      {/* Primary Focus */}
      <View style={styles.sectionCardHighlight}>
        <Text style={styles.h4}>Foco Principal</Text>
        <Text style={styles.text}>{modeling.primaryFocus}</Text>
      </View>

      {/* Notations */}
      <Text style={styles.h4}>Notaciones Recomendadas</Text>

      {modeling.notations.map((notation, i) => (
        <View key={i} style={styles.sectionCard} wrap={false}>
          {/* Notation name and description */}
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#1e3a5f', marginBottom: 4 }}>
            {notation.name}
          </Text>
          <Text style={[styles.text, { marginBottom: 6 }]}>{notation.description}</Text>

          {/* Diagrams */}
          {notation.diagrams && notation.diagrams.length > 0 && (
            <View style={{ marginBottom: 6 }}>
              <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#7c3aed', marginBottom: 3 }}>
                Diagramas especificos:
              </Text>
              <View style={[styles.row, { flexWrap: 'wrap' }]}>
                {notation.diagrams.map((diagram, j) => (
                  <Text key={j} style={[styles.badge, styles.badgePurple]}>{diagram}</Text>
                ))}
              </View>
            </View>
          )}

          {/* When to use */}
          <View style={styles.infoBox}>
            <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#1e40af', marginBottom: 2 }}>
              Cuando usar:
            </Text>
            <Text style={{ fontSize: 9, color: '#1e40af' }}>{notation.whenToUse}</Text>
          </View>

          {/* Tools */}
          {notation.tools && notation.tools.length > 0 && (
            <View style={{ marginTop: 4 }}>
              <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#64748b', marginBottom: 3 }}>
                Herramientas recomendadas:
              </Text>
              <View style={[styles.row, { flexWrap: 'wrap' }]}>
                {notation.tools.map((tool, j) => (
                  <Text key={j} style={[styles.badge, styles.badgeGreen]}>{tool}</Text>
                ))}
              </View>
            </View>
          )}
        </View>
      ))}
    </View>
  );
}
