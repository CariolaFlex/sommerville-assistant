import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles';
import type { TimelineWeek } from '@/types/recommendation';

interface TimelineSectionProps {
  timeline: TimelineWeek[];
}

export function TimelineSection({ timeline }: TimelineSectionProps) {
  return (
    <View style={styles.section}>
      <Text style={styles.h2}>Timeline del Proyecto (12 Semanas)</Text>

      <Text style={[styles.paragraph, { marginBottom: 10 }]}>
        Cronograma sugerido para la implementacion del proyecto, organizado en fases
        y tareas semanales. Ajusta segun las necesidades especificas de tu equipo.
      </Text>

      {/* Table */}
      <View style={styles.table}>
        {/* Header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCellHeader, { flex: 0.8 }]}>Semana</Text>
          <Text style={[styles.tableCellHeader, { flex: 1.5 }]}>Fase</Text>
          <Text style={[styles.tableCellHeader, { flex: 3 }]}>Tareas</Text>
        </View>

        {/* Rows */}
        {timeline.map((week, i) => (
          <View key={i} style={[styles.tableRow, i % 2 === 1 ? styles.tableRowAlternate : {}]} wrap={false}>
            <Text style={[styles.tableCell, { flex: 0.8, fontWeight: 'bold', color: '#1e3a5f' }]}>
              {week.week}
            </Text>
            <Text style={[styles.tableCell, { flex: 1.5, color: '#2563eb' }]}>
              {week.phase}
            </Text>
            <View style={[styles.tableCell, { flex: 3 }]}>
              {week.tasks.map((task, j) => (
                <Text key={j} style={{ fontSize: 9, marginBottom: 2, lineHeight: 1.4 }}>
                  {'\u2022'} {task}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Info note */}
      <View style={styles.infoBox}>
        <Text style={{ fontSize: 9, fontWeight: 'bold', color: '#1e40af', marginBottom: 2 }}>
          Nota Importante
        </Text>
        <Text style={{ fontSize: 9, color: '#1e40af' }}>
          Este timeline es una guia inicial basada en proyectos similares. Ajusta las fechas
          segun las necesidades especificas de tu proyecto y la disponibilidad del equipo.
        </Text>
      </View>
    </View>
  );
}
