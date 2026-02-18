import { Page, View, Text, Image } from '@react-pdf/renderer';
import { styles } from '../styles';
import type { DiagramsData } from '../utils/generate-diagrams';

interface DiagramsSectionProps {
  diagrams: DiagramsData | null;
}

export function DiagramsSection({ diagrams }: DiagramsSectionProps) {
  if (!diagrams) {
    return (
      <Page size="A4" style={styles.page} break>
        <Text style={styles.header} fixed>
          DIAGRAMAS
        </Text>

        <View style={styles.section}>
          <Text style={styles.h2}>6. Diagramas</Text>
          <Text style={styles.paragraph}>
            Los diagramas no pudieron generarse automaticamente para este documento PDF.
            Por favor, reviselos en la version web de la aplicacion.
          </Text>

          <View style={styles.diagramPlaceholder}>
            <Text style={{ fontSize: 10, color: '#64748b', textAlign: 'center', marginBottom: 10 }}>
              Diagrama no disponible en esta exportacion
            </Text>
            <Text style={{ fontSize: 9, color: '#94a3b8', textAlign: 'center' }}>
              Los diagramas estan disponibles en la plataforma web.
            </Text>
          </View>

          <View style={[styles.infoBox, { marginTop: 12 }]}>
            <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#1e40af', marginBottom: 4 }}>
              Diagramas disponibles en la plataforma web:
            </Text>
            {['Camino de decision del asistente', 'Proceso de desarrollo recomendado',
              'Arquitectura del sistema', 'Timeline Gantt del proyecto'].map((item, i) => (
              <Text key={i} style={{ fontSize: 9, color: '#1e40af', marginLeft: 10, marginTop: 2 }}>
                - {item}
              </Text>
            ))}
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
    );
  }

  // Build array of diagram pages, filtering out any that failed
  const diagramEntries = [
    {
      title: 'Camino de Decision',
      header: 'DIAGRAMAS - CAMINO DE DECISION',
      description: 'Visualizacion del camino tomado durante el proceso de recomendacion del asistente.',
      src: diagrams.decisionTree,
    },
    {
      title: 'Proceso de Desarrollo',
      header: 'DIAGRAMAS - PROCESO DE DESARROLLO',
      description: 'Diagrama del flujo del proceso de desarrollo recomendado para el proyecto.',
      src: diagrams.process,
    },
    {
      title: 'Arquitectura del Sistema',
      header: 'DIAGRAMAS - ARQUITECTURA',
      description: 'Diagrama de la arquitectura de software recomendada para el sistema.',
      src: diagrams.architecture,
    },
    {
      title: 'Timeline Gantt',
      header: 'DIAGRAMAS - TIMELINE',
      description: 'Cronograma visual del proyecto en formato Gantt con fases y actividades.',
      src: diagrams.timeline,
    },
  ];

  return (
    <>
      {diagramEntries.map((diagram, index) => (
        <Page key={index} size="A4" style={styles.page} break>
          <Text style={styles.header} fixed>
            {diagram.header}
          </Text>

          <View style={{ marginBottom: 12 }}>
            <Text style={styles.h2}>
              {index === 0 ? '6.' : '  '} {diagram.title}
            </Text>
            <Text style={styles.paragraph}>{diagram.description}</Text>
          </View>

          {diagram.src ? (
            <View style={styles.diagramContainer}>
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <Image
                src={diagram.src}
                style={styles.diagramImage}
              />
            </View>
          ) : (
            <View style={styles.diagramPlaceholder}>
              <Text style={{ fontSize: 10, color: '#64748b', textAlign: 'center' }}>
                Diagrama no disponible en esta exportacion
              </Text>
            </View>
          )}

          <Text
            style={styles.footer}
            fixed
            render={({ pageNumber, totalPages }) =>
              `Pagina ${pageNumber} de ${totalPages}  |  Sommerville Assistant`
            }
          />
        </Page>
      ))}
    </>
  );
}
