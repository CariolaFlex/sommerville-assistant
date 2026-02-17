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
    <Page size="A4" style={{ ...styles.page, paddingHorizontal: 60 }}>
      <View style={styles.cover}>
        {/* Top accent bar */}
        <View style={styles.coverAccentBar} />

        {/* Application name */}
        <Text style={{ fontSize: 11, color: '#94a3b8', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>
          Sommerville Assistant
        </Text>

        {/* Main title */}
        <Text style={styles.coverTitle}>
          {projectName}
        </Text>

        {/* Recommendation title */}
        <Text style={styles.coverSubtitle}>{recommendation.title}</Text>

        {/* Divider */}
        <View style={styles.coverDivider} />

        {/* Metadata */}
        <View style={{ marginTop: 8, alignItems: 'center' }}>
          {customization?.companyName && (
            <View style={{ flexDirection: 'row', marginBottom: 6 }}>
              <Text style={styles.coverMetaLabel}>Organizacion: </Text>
              <Text style={styles.coverMeta}>{customization.companyName}</Text>
            </View>
          )}
          {customization?.authorName && (
            <View style={{ flexDirection: 'row', marginBottom: 6 }}>
              <Text style={styles.coverMetaLabel}>Autor(es): </Text>
              <Text style={styles.coverMeta}>{customization.authorName}</Text>
            </View>
          )}
          {(customization?.includeTimestamp ?? true) && (
            <View style={{ flexDirection: 'row', marginBottom: 6 }}>
              <Text style={styles.coverMetaLabel}>Fecha: </Text>
              <Text style={styles.coverMeta}>{formatPDFDate()}</Text>
            </View>
          )}
          <View style={{ flexDirection: 'row', marginBottom: 6 }}>
            <Text style={styles.coverMetaLabel}>ID: </Text>
            <Text style={styles.coverMeta}>{recommendation.id}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 6 }}>
            <Text style={styles.coverMetaLabel}>Capitulos: </Text>
            <Text style={styles.coverMeta}>{recommendation.chapters.join(', ')}</Text>
          </View>
        </View>

        {/* Sections included */}
        <View style={{ marginTop: 24, alignItems: 'center' }}>
          <Text style={{ fontSize: 9, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
            Contenido del Documento
          </Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', maxWidth: 350 }}>
            {['Proceso', 'Metodologia', 'Modelado', 'Arquitectura', 'Timeline', 'Diagramas'].map((section) => (
              <Text key={section} style={styles.badge}>{section}</Text>
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={{ marginTop: 'auto', paddingBottom: 20, alignItems: 'center' }}>
          <View style={styles.coverDivider} />
          {customization?.customFooter ? (
            <Text style={styles.coverFooter}>{customization.customFooter}</Text>
          ) : (
            <>
              <Text style={styles.coverFooter}>
                Basado en &quot;Ingenieria de Software&quot; de Ian Sommerville
              </Text>
              <Text style={[styles.coverFooter, { marginTop: 2 }]}>
                9na Edicion - Capitulos 1-6
              </Text>
            </>
          )}
          <Text style={[styles.coverFooter, { marginTop: 12, fontSize: 8, color: '#cbd5e1' }]}>
            Generado automaticamente por Sommerville Assistant
          </Text>
        </View>
      </View>
    </Page>
  );
}
