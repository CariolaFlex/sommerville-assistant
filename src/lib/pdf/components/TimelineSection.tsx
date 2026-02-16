import { View, Text } from '@react-pdf/renderer';
import { styles } from '../styles';
import type { TimelineWeek } from '@/types/recommendation';

interface TimelineSectionProps {
  timeline: TimelineWeek[];
}

export function TimelineSection({ timeline }: TimelineSectionProps) {
  return (
    <View style={styles.section}>
      {/* Título de sección */}
      <Text style={styles.h2}>📅 Timeline del Proyecto (12 Semanas)</Text>

      {/* Tabla */}
      <View style={styles.table}>
        {/* Header */}
        <View style={[styles.tableRow, styles.tableHeader]}>
          <Text style={[styles.tableCellHeader, { flex: 0.8 }]}>Semana</Text>
          <Text style={[styles.tableCellHeader, { flex: 1.5 }]}>Fase</Text>
          <Text style={[styles.tableCellHeader, { flex: 3 }]}>Tareas</Text>
        </View>

        {/* Rows */}
        {timeline.map((week, i) => (
          <View key={i} style={styles.tableRow} wrap={false}>
            {/* Semana */}
            <Text style={[styles.tableCell, { flex: 0.8 }]}>{week.week}</Text>

            {/* Fase */}
            <Text style={[styles.tableCell, { flex: 1.5 }]}>{week.phase}</Text>

            {/* Tareas */}
            <View style={[styles.tableCell, { flex: 3 }]}>
              {week.tasks.map((task, j) => (
                <Text key={j} style={{ fontSize: 9, marginBottom: 2 }}>
                  • {task}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>

      {/* Nota informativa */}
      <View style={styles.infoBox}>
        <Text style={{ fontSize: 10, color: '#1e40af' }}>
          💡 Este timeline es una guía inicial. Ajusta las fechas según las necesidades
          específicas de tu proyecto y la disponibilidad del equipo.
        </Text>
      </View>
    </View>
  );
}
