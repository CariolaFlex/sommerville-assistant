import { Document, Page, View, Text } from '@react-pdf/renderer';
import { Cover } from './components/Cover';
import { ProcessSection } from './components/ProcessSection';
import { MethodologySection } from './components/MethodologySection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { TimelineSection } from './components/TimelineSection';
import { TemplatesSection } from './components/TemplatesSection';
import { AvoidSection } from './components/AvoidSection';
import { styles } from './styles';
import type { Recommendation } from '@/types/recommendation';
import type { Template } from '@/types/templates';
import type { Checklist } from '@/types/checklists';

interface PDFDocumentProps {
  recommendation: Recommendation;
  templates: Template[];
  checklists: Checklist[];
}

export function PDFDocument({
  recommendation,
  templates,
  checklists: _checklists,
}: PDFDocumentProps) {
  return (
    <Document
      title={`Sommerville - ${recommendation.title}`}
      author="Sommerville Assistant"
      subject="Recomendación de Ingeniería de Software"
      keywords="software engineering, ingeniería de software, sommerville"
    >
      {/* Portada */}
      <Cover recommendation={recommendation} />

      {/* Página de contenido principal */}
      <Page size="A4" style={styles.page}>
        {/* Header fijo */}
        <Text style={styles.header} fixed>
          Sommerville Assistant - {recommendation.title}
        </Text>

        {/* Secciones principales */}
        <ProcessSection process={recommendation.process} />
        <MethodologySection methodology={recommendation.methodology} />

        {/* Footer con número de página */}
        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages}`
          }
        />
      </Page>

      {/* Página de Arquitectura */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header} fixed>
          Sommerville Assistant - Arquitectura
        </Text>

        <ArchitectureSection architecture={recommendation.architecture} />

        {/* Sección de errores a evitar */}
        {recommendation.avoid && recommendation.avoid.length > 0 && (
          <AvoidSection avoidItems={recommendation.avoid} />
        )}

        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages}`
          }
        />
      </Page>

      {/* Página de Timeline */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header} fixed>
          Sommerville Assistant - Timeline
        </Text>

        <TimelineSection timeline={recommendation.timeline} />

        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages}`
          }
        />
      </Page>

      {/* Página de Plantillas (si hay) */}
      {templates.length > 0 && (
        <Page size="A4" style={styles.page}>
          <Text style={styles.header} fixed>
            Sommerville Assistant - Plantillas
          </Text>

          <TemplatesSection templates={templates} />

          <Text
            style={styles.footer}
            fixed
            render={({ pageNumber, totalPages }) =>
              `Página ${pageNumber} de ${totalPages}`
            }
          />
        </Page>
      )}

      {/* Página final con información adicional */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header} fixed>
          Sommerville Assistant - Información
        </Text>

        <View style={styles.section}>
          <Text style={styles.h2}>ℹ️ Acerca de este Documento</Text>

          <Text style={styles.paragraph}>
            Este documento fue generado automáticamente por Sommerville Assistant, una
            herramienta educativa basada en el libro &quot;Ingeniería de Software&quot; (9na
            edición) de Ian Sommerville.
          </Text>

          <Text style={styles.h4}>Propósito</Text>
          <Text style={styles.paragraph}>
            Las recomendaciones de este documento están diseñadas para ayudar a equipos
            de desarrollo a tomar decisiones informadas sobre procesos, metodologías y
            arquitecturas de software, basándose en las mejores prácticas documentadas
            en la literatura académica.
          </Text>

          <Text style={styles.h4}>Uso Recomendado</Text>
          <View style={styles.list}>
            <View style={styles.listItem}>
              <Text style={styles.listBullet}>• </Text>
              <Text style={styles.listContent}>
                Usa este documento como guía inicial, no como regla absoluta
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listBullet}>• </Text>
              <Text style={styles.listContent}>
                Adapta las recomendaciones al contexto específico de tu proyecto
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listBullet}>• </Text>
              <Text style={styles.listContent}>
                Consulta con expertos antes de tomar decisiones arquitectónicas críticas
              </Text>
            </View>
            <View style={styles.listItem}>
              <Text style={styles.listBullet}>• </Text>
              <Text style={styles.listContent}>
                Revisa regularmente y ajusta según los resultados del proyecto
              </Text>
            </View>
          </View>

          <View style={[styles.infoBox, { marginTop: 24 }]}>
            <Text style={{ fontSize: 10, color: '#1e40af', fontWeight: 'bold' }}>
              📚 Referencia Bibliográfica
            </Text>
            <Text style={{ fontSize: 10, color: '#1e40af', marginTop: 4 }}>
              Sommerville, I. (2011). Software Engineering (9th ed.). Pearson Education.
            </Text>
          </View>
        </View>

        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages}`
          }
        />
      </Page>
    </Document>
  );
}
