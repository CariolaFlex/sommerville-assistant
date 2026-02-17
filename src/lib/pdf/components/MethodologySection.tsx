import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles';
import type { MethodologyInfo } from '@/types/recommendation';

interface MethodologySectionProps {
  methodology: MethodologyInfo;
}

export function MethodologySection({ methodology }: MethodologySectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.h2}>Metodologia Recomendada</Text>

      {/* Name and chapter */}
      <View style={styles.sectionCardHighlight}>
        <Text style={styles.h3}>{methodology.name}</Text>
        <View style={[styles.row, { marginTop: 4 }]}>
          <Text style={styles.badge}>{methodology.references.chapter}</Text>
        </View>
      </View>

      {/* Description */}
      {methodology.description && (
        <Text style={[styles.paragraph, { marginTop: 4 }]}>{methodology.description}</Text>
      )}

      {/* Origin */}
      {methodology.origin && (
        <View style={[styles.sectionCard, { marginTop: 8 }]}>
          <Text style={styles.h4}>Origen</Text>
          <Text style={styles.text}>
            <Text style={{ fontWeight: 'bold' }}>Creador: </Text>
            {methodology.origin.creator} ({methodology.origin.year})
          </Text>
          <Text style={[styles.text, { marginTop: 4 }]}>{methodology.origin.context}</Text>
        </View>
      )}

      {/* Fundamental Principles */}
      {methodology.principles && methodology.principles.length > 0 && (
        <>
          <Text style={styles.h4}>Principios Fundamentales</Text>
          <View style={styles.list}>
            {methodology.principles.map((principle, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={[styles.listBullet, { color: '#059669' }]}>{'\u2713'} </Text>
                <Text style={styles.listContent}>{principle}</Text>
              </View>
            ))}
          </View>
        </>
      )}

      {/* Differentiators */}
      {methodology.differentiators && methodology.differentiators.length > 0 && (
        <>
          <Text style={styles.h4}>Diferenciadores Clave</Text>
          <View style={styles.list}>
            {methodology.differentiators.map((diff, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.listBullet}>{'\u2022'} </Text>
                <Text style={styles.listContent}>{diff}</Text>
              </View>
            ))}
          </View>
        </>
      )}
    </View>
  );
}
