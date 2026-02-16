import { Page, View, Text, Image } from '@react-pdf/renderer';
import { styles } from '../styles';
import type { DiagramsData } from '../utils/generate-diagrams';

interface DiagramsSectionProps {
  diagrams: DiagramsData | null;
}

/**
 * Componente que renderiza las páginas de diagramas en el PDF
 * Cada diagrama ocupa una página completa para máxima visibilidad
 */
export function DiagramsSection({ diagrams }: DiagramsSectionProps) {
  // Si no se pudieron generar los diagramas, mostrar mensaje
  if (!diagrams) {
    return (
      <Page size="A4" style={styles.page} break>
        <Text style={styles.header} fixed>
          Diagramas
        </Text>

        <View style={styles.section}>
          <Text style={styles.h2}>📊 Diagramas</Text>
          <Text style={styles.paragraph}>
            Los diagramas no pudieron generarse automáticamente. Por favor, revísalos en la
            versión web de la aplicación.
          </Text>

          <View style={styles.infoBox}>
            <Text style={{ fontSize: 10, color: '#1e40af' }}>
              Los diagramas incluyen:
            </Text>
            <Text style={{ fontSize: 10, color: '#1e40af', marginTop: 4 }}>
              • Camino de decisión tomado en el asistente
            </Text>
            <Text style={{ fontSize: 10, color: '#1e40af' }}>
              • Proceso de desarrollo recomendado
            </Text>
            <Text style={{ fontSize: 10, color: '#1e40af' }}>
              • Arquitectura del sistema
            </Text>
            <Text style={{ fontSize: 10, color: '#1e40af' }}>
              • Timeline Gantt del proyecto
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
    );
  }

  return (
    <>
      {/* Página 5: Camino de Decisión */}
      <Page size="A4" style={styles.page} break>
        <Text style={styles.header} fixed>
          Diagramas - Camino de Decisión
        </Text>

        <View style={styles.section}>
          <Text style={styles.h2}>📊 Camino de Decisión</Text>
          <Text style={styles.paragraph}>
            Visualización del camino tomado durante el proceso de recomendación del asistente
          </Text>
        </View>

        <View style={{ marginTop: 12, alignItems: 'center' }}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            src={diagrams.decisionTree}
            style={{ maxWidth: '100%', maxHeight: 500 }}
          />
        </View>

        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages}`
          }
        />
      </Page>

      {/* Página 6: Proceso de Desarrollo */}
      <Page size="A4" style={styles.page} break>
        <Text style={styles.header} fixed>
          Diagramas - Proceso de Desarrollo
        </Text>

        <View style={styles.section}>
          <Text style={styles.h2}>⚙️ Proceso de Desarrollo</Text>
          <Text style={styles.paragraph}>
            Diagrama del flujo del proceso de desarrollo recomendado
          </Text>
        </View>

        <View style={{ marginTop: 12, alignItems: 'center' }}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={diagrams.process} style={{ maxWidth: '100%', maxHeight: 500 }} />
        </View>

        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages}`
          }
        />
      </Page>

      {/* Página 7: Arquitectura */}
      <Page size="A4" style={styles.page} break>
        <Text style={styles.header} fixed>
          Diagramas - Arquitectura
        </Text>

        <View style={styles.section}>
          <Text style={styles.h2}>🏗️ Arquitectura del Sistema</Text>
          <Text style={styles.paragraph}>
            Diagrama de la arquitectura de software recomendada
          </Text>
        </View>

        <View style={{ marginTop: 12, alignItems: 'center' }}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image
            src={diagrams.architecture}
            style={{ maxWidth: '100%', maxHeight: 500 }}
          />
        </View>

        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages}`
          }
        />
      </Page>

      {/* Página 8: Timeline Gantt */}
      <Page size="A4" style={styles.page} break>
        <Text style={styles.header} fixed>
          Diagramas - Timeline
        </Text>

        <View style={styles.section}>
          <Text style={styles.h2}>📅 Timeline Gantt</Text>
          <Text style={styles.paragraph}>
            Cronograma visual del proyecto en formato Gantt
          </Text>
        </View>

        <View style={{ marginTop: 12, alignItems: 'center' }}>
          {/* eslint-disable-next-line jsx-a11y/alt-text */}
          <Image src={diagrams.timeline} style={{ maxWidth: '100%', maxHeight: 500 }} />
        </View>

        <Text
          style={styles.footer}
          fixed
          render={({ pageNumber, totalPages }) =>
            `Página ${pageNumber} de ${totalPages}`
          }
        />
      </Page>
    </>
  );
}
