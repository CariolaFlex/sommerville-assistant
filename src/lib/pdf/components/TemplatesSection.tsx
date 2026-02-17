import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles';
import type { Template } from '@/types/templates';

interface TemplatesSectionProps {
  templates: Template[];
}

export function TemplatesSection({ templates }: TemplatesSectionProps) {
  if (templates.length === 0) return null;

  return (
    <View style={styles.section} break>
      <Text style={styles.h2}>Plantillas Recomendadas</Text>

      <Text style={styles.paragraph}>
        Las siguientes plantillas de documentacion tecnica te ayudaran a implementar
        esta recomendacion de manera estructurada y profesional.
      </Text>

      {/* Templates list */}
      {templates.slice(0, 8).map((template, i) => (
        <View key={i} style={styles.sectionCard} wrap={false}>
          <Text style={{ fontSize: 11, fontWeight: 'bold', color: '#1e3a5f', marginBottom: 4 }}>
            {template.name}
          </Text>

          {/* Metadata badges */}
          <View style={[styles.row, { marginBottom: 6, flexWrap: 'wrap' }]}>
            <Text style={styles.badge}>{template.category}</Text>
            <Text style={[styles.badge, styles.badgePurple]}>
              {template.difficulty || 'Media'}
            </Text>
            {template.estimatedTime && (
              <Text style={[styles.badge, styles.badgeGreen]}>
                {template.estimatedTime}
              </Text>
            )}
          </View>

          <Text style={[styles.text, { marginBottom: 6 }]}>{template.description}</Text>

          {/* Tags */}
          {template.tags && template.tags.length > 0 && (
            <View style={[styles.row, { flexWrap: 'wrap' }]}>
              {template.tags.slice(0, 5).map((tag, j) => (
                <Text key={j} style={[styles.textMuted, { marginRight: 8, fontSize: 8 }]}>
                  #{tag}
                </Text>
              ))}
            </View>
          )}
        </View>
      ))}

      {templates.length > 8 && (
        <Text style={[styles.textMuted, { marginTop: 6, fontStyle: 'italic' }]}>
          ... y {templates.length - 8} plantilla{templates.length - 8 !== 1 ? 's' : ''}{' '}
          mas disponible{templates.length - 8 !== 1 ? 's' : ''} en la plataforma.
        </Text>
      )}
    </View>
  );
}
