import { Document, Page, View, Text } from '@react-pdf/renderer';
import { Cover } from './components/Cover';
import { ProcessSection } from './components/ProcessSection';
import { MethodologySection } from './components/MethodologySection';
import { ModelingSection } from './components/ModelingSection';
import { ArchitectureSection } from './components/ArchitectureSection';
import { TimelineSection } from './components/TimelineSection';
import { TemplatesSection } from './components/TemplatesSection';
import { AvoidSection } from './components/AvoidSection';
import { DiagramsSection } from './components/DiagramsSection';
import { styles } from './styles';
import type { Recommendation } from '@/types/recommendation';
import type { Template } from '@/types/templates';
import type { Checklist } from '@/types/checklists';
import type { DiagramsData } from './utils/generate-diagrams';
import type { PDFCustomization } from '@/types/pdf-customization';

interface PDFDocumentProps {
  recommendation: Recommendation;
  templates: Template[];
  checklists: Checklist[];
  diagrams?: DiagramsData | null;
  customization?: PDFCustomization;
}

export function PDFDocument({
  recommendation,
  templates,
  checklists: _checklists,
  diagrams,
  customization,
}: PDFDocumentProps) {
  const docTitle = customization?.projectName || recommendation.title;
  const headerText = docTitle.toUpperCase();

  return (
    <Document
      title={`Sommerville - ${docTitle}`}
      author={customization?.authorName || 'Sommerville Assistant'}
      subject="Recomendacion de Ingenieria de Software"
      keywords="software engineering, ingenieria de software, sommerville"
    >
      {/* Portada */}
      <Cover recommendation={recommendation} customization={customization} />

      {/* Pagina 2: Proceso + Metodologia */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header} fixed>
          {headerText}
        </Text>

        <ProcessSection process={recommendation.process} />
        <MethodologySection methodology={recommendation.methodology} />

        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            `Pagina ${pageNumber} de ${totalPages}  |  Sommerville Assistant`
          }
        />
      </Page>

      {/* Pagina 3: Modelado */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header} fixed>
          {headerText} - Modelado
        </Text>

        <ModelingSection modeling={recommendation.modeling} />

        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            `Pagina ${pageNumber} de ${totalPages}  |  Sommerville Assistant`
          }
        />
      </Page>

      {/* Pagina 4: Arquitectura + Errores */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.header} fixed>
          {headerText} - Arquitectura
        </Text>

        <ArchitectureSection architecture={recommendation.architecture} />

        {recommendation.avoid && recommendation.avoid.length > 0 && (
          <AvoidSection avoidItems={recommendation.avoid} />
        )}

        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            `Pagina ${pageNumber} de ${totalPages}  |  Sommerville Assistant`
          }
        />
      </Page>

      {/* Pagina 5: Timeline */}
      <Page size="A4" style={styles.page} break>
        <Text style={styles.header} fixed>
          {headerText} - Timeline
        </Text>

        <TimelineSection timeline={recommendation.timeline} />

        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            `Pagina ${pageNumber} de ${totalPages}  |  Sommerville Assistant`
          }
        />
      </Page>

      {/* Paginas 6-9: Diagramas */}
      {diagrams && <DiagramsSection diagrams={diagrams} />}

      {/* Plantillas */}
      {templates.length > 0 && (
        <Page size="A4" style={styles.page} break>
          <Text style={styles.header} fixed>
            {headerText} - Plantillas
          </Text>

          <TemplatesSection templates={templates} />

          <Text
            style={styles.footer}
            fixed
            render={({ pageNumber, totalPages }) =>
              `Pagina ${pageNumber} de ${totalPages}  |  Sommerville Assistant`
            }
          />
        </Page>
      )}

      {/* Pagina final */}
      <Page size="A4" style={styles.page} break>
        <Text style={styles.header} fixed>
          Acerca de este Documento
        </Text>

        <View style={styles.section}>
          <Text style={styles.h2}>Acerca de este Documento</Text>

          <Text style={styles.paragraph}>
            Este documento fue generado automaticamente por Sommerville Assistant, una
            herramienta educativa basada en el libro &quot;Ingenieria de Software&quot; (9na
            edicion) de Ian Sommerville. Contiene recomendaciones para proceso de desarrollo,
            metodologia, modelado, arquitectura, timeline y diagramas especificos para su proyecto.
          </Text>

          <Text style={styles.h4}>Proposito</Text>
          <Text style={styles.paragraph}>
            Las recomendaciones estan disenadas para ayudar a equipos de desarrollo
            a tomar decisiones informadas basandose en las mejores practicas documentadas
            en la literatura academica de ingenieria de software.
          </Text>

          <Text style={styles.h4}>Uso Recomendado</Text>
          <View style={styles.list}>
            {[
              'Usa este documento como guia inicial, no como regla absoluta',
              'Adapta las recomendaciones al contexto especifico de tu proyecto',
              'Consulta con expertos antes de tomar decisiones arquitectonicas criticas',
              'Revisa regularmente y ajusta segun los resultados del proyecto',
            ].map((item, i) => (
              <View key={i} style={styles.listItem}>
                <Text style={styles.listBullet}>{'\u2022'} </Text>
                <Text style={styles.listContent}>{item}</Text>
              </View>
            ))}
          </View>

          <View style={[styles.infoBox, { marginTop: 16 }]}>
            <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#1e40af', marginBottom: 4 }}>
              Referencia Bibliografica
            </Text>
            <Text style={{ fontSize: 9, color: '#1e40af' }}>
              Sommerville, I. (2011). Software Engineering (9th ed.). Pearson Education.
            </Text>
          </View>

          <View style={[styles.sectionCard, { marginTop: 16 }]}>
            <Text style={{ fontSize: 9, color: '#64748b', textAlign: 'center' }}>
              Documento generado el {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Text>
            <Text style={{ fontSize: 8, color: '#94a3b8', textAlign: 'center', marginTop: 4 }}>
              Sommerville Assistant - Plataforma de Ingenieria de Software
            </Text>
          </View>
        </View>

        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            `Pagina ${pageNumber} de ${totalPages}  |  Sommerville Assistant`
          }
        />
      </Page>
    </Document>
  );
}
