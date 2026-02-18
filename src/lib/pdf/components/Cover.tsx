import { Page, View, Text } from '@react-pdf/renderer';
import { styles } from '../styles';
import { formatPDFDate } from '../utils';
import type { Recommendation } from '@/types/recommendation';
import type { PDFCustomization } from '@/types/pdf-customization';

interface CoverProps {
  recommendation: Recommendation;
  customization?: PDFCustomization;
}

export function Cover({ recommendation, customization }: CoverProps) {
  const projectName = customization?.projectName || 'Recomendacion de Ingenieria de Software';

  return (
    <Page size="A4" style={styles.coverPage}>
      <View style={styles.cover}>
        {/* Top spacer to push content down from very top */}
        <View style={{ height: 40 }} />

        {/* Accent bar */}
        <View style={styles.coverAccentBar} />

        {/* Application name */}
        <Text style={styles.coverAppName}>
          Sommerville Assistant
        </Text>

        {/* Main title */}
        <Text style={styles.coverTitle}>
          {projectName}
        </Text>

        {/* Recommendation subtitle */}
        <Text style={styles.coverSubtitle}>
          {recommendation.title}
        </Text>

        {/* Divider line */}
        <View style={styles.coverDivider} />

        {/* Metadata block */}
        <View style={styles.coverMetaBlock}>
          {customization?.companyName && (
            <View style={styles.coverMetaRow}>
              <Text style={styles.coverMetaLabel}>Organizacion:</Text>
              <Text style={styles.coverMetaValue}>{customization.companyName}</Text>
            </View>
          )}
          {customization?.authorName && (
            <View style={styles.coverMetaRow}>
              <Text style={styles.coverMetaLabel}>Autor(es):</Text>
              <Text style={styles.coverMetaValue}>{customization.authorName}</Text>
            </View>
          )}
          {(customization?.includeTimestamp ?? true) && (
            <View style={styles.coverMetaRow}>
              <Text style={styles.coverMetaLabel}>Fecha:</Text>
              <Text style={styles.coverMetaValue}>{formatPDFDate()}</Text>
            </View>
          )}
          <View style={styles.coverMetaRow}>
            <Text style={styles.coverMetaLabel}>Referencia:</Text>
            <Text style={styles.coverMetaValue}>{recommendation.id}</Text>
          </View>
          <View style={styles.coverMetaRow}>
            <Text style={styles.coverMetaLabel}>Capitulos:</Text>
            <Text style={styles.coverMetaValue}>{recommendation.chapters.join(', ')}</Text>
          </View>
        </View>

        {/* Content badges */}
        <View style={{ marginTop: 28, alignItems: 'center' }}>
          <Text style={{ fontSize: 8, color: '#94a3b8', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1.5 }}>
            Contenido del documento
          </Text>
          <View style={styles.coverBadgesRow}>
            {['Proceso', 'Metodologia', 'Modelado', 'Arquitectura', 'Timeline', 'Diagramas'].map((section) => (
              <Text key={section} style={styles.badge}>{section}</Text>
            ))}
          </View>
        </View>

        {/* Footer block - pushed to bottom */}
        <View style={styles.coverFooterBlock}>
          <View style={styles.coverDivider} />
          {customization?.customFooter ? (
            <Text style={styles.coverFooter}>{customization.customFooter}</Text>
          ) : (
            <View>
              <Text style={styles.coverFooter}>
                Basado en &quot;Ingenieria de Software&quot; de Ian Sommerville
              </Text>
              <Text style={[styles.coverFooter, { marginTop: 3 }]}>
                9na Edicion  -  Capitulos 1 al 6
              </Text>
            </View>
          )}
          <Text style={[styles.coverFooter, { marginTop: 14, fontSize: 7, color: '#cbd5e1' }]}>
            Generado automaticamente por Sommerville Assistant
          </Text>
        </View>
      </View>
    </Page>
  );
}
