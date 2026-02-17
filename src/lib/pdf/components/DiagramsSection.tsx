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
          Diagramas
        </Text>

        <View style={styles.section}>
          <Text style={styles.h2}>Diagramas</Text>
          <Text style={styles.paragraph}>
            Los diagramas no pudieron generarse automaticamente. Por favor, revisalos en la
            version web de la aplicacion.
          </Text>

          <View style={styles.infoBox}>
            <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#1e40af', marginBottom: 4 }}>
              Diagramas disponibles en la plataforma web:
            </Text>
            {['Camino de decision del asistente', 'Proceso de desarrollo recomendado',
              'Arquitectura del sistema', 'Timeline Gantt del proyecto'].map((item, i) => (
              <Text key={i} style={{ fontSize: 9, color: '#1e40af', marginLeft: 8 }}>
                {'\u2022'} {item}
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

  const diagramPages = [
    {
      title: 'Camino de Decision',
      header: 'Diagramas - Camino de Decision',
      description: 'Visualizacion del camino tomado durante el proceso de recomendacion del asistente.',
      src: diagrams.decisionTree,
    },
    {
      title: 'Proceso de Desarrollo',
      header: 'Diagramas - Proceso de Desarrollo',
      description: 'Diagrama del flujo del proceso de desarrollo recomendado para el proyecto.',
      src: diagrams.process,
    },
    {
      title: 'Arquitectura del Sistema',
      header: 'Diagramas - Arquitectura',
      description: 'Diagrama de la arquitectura de software recomendada para el sistema.',
      src: diagrams.architecture,
    },
    {
      title: 'Timeline Gantt',
      header: 'Diagramas - Timeline',
      description: 'Cronograma visual del proyecto en formato Gantt con fases y actividades.',
      src: diagrams.timeline,
    },
  ];

  return (
    <>
      {diagramPages.map((diagram, index) => (
        <Page key={index} size="A4" style={styles.page} break>
          <Text style={styles.header} fixed>
            {diagram.header}
          </Text>

          <View style={styles.section}>
            <Text style={styles.h2}>{diagram.title}</Text>
            <Text style={styles.paragraph}>{diagram.description}</Text>
          </View>

          <View style={{ marginTop: 8, alignItems: 'center', flex: 1 }}>
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <Image
              src={diagram.src}
              style={{ maxWidth: '100%', maxHeight: 480 }}
            />
          </View>

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
