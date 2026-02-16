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
      {/* Título de sección */}
      <Text style={styles.h2}>📄 Plantillas Recomendadas</Text>

      <Text style={styles.paragraph}>
        Las siguientes plantillas te ayudarán a implementar esta recomendación de manera
        estructurada y profesional.
      </Text>

      {/* Lista de templates */}
      {templates.slice(0, 8).map((template, i) => (
        <View key={i} style={styles.sectionCard} wrap={false}>
          {/* Nombre */}
          <Text style={styles.h4}>{template.name}</Text>

          {/* Metadata */}
          <View style={[styles.row, { marginBottom: 8 }]}>
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

          {/* Descripción */}
          <Text style={[styles.text, { marginBottom: 8 }]}>{template.description}</Text>

          {/* Tags */}
          {template.tags && template.tags.length > 0 && (
            <View style={[styles.row, { flexWrap: 'wrap' }]}>
              {template.tags.slice(0, 5).map((tag, j) => (
                <Text key={j} style={[styles.textMuted, { marginRight: 8 }]}>
                  #{tag}
                </Text>
              ))}
            </View>
          )}
        </View>
      ))}

      {templates.length > 8 && (
        <Text style={[styles.textMuted, { marginTop: 8, fontStyle: 'italic' }]}>
          ... y {templates.length - 8} plantilla{templates.length - 8 !== 1 ? 's' : ''}{' '}
          más disponible{templates.length - 8 !== 1 ? 's' : ''} en la plataforma.
        </Text>
      )}
    </View>
  );
}
