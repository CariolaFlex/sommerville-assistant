import { StyleSheet } from '@react-pdf/renderer';

export const styles = StyleSheet.create({
  // Layout base
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
    color: '#1f2937',
  },

  // Portada
  cover: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  coverTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#1e40af',
  },

  coverSubtitle: {
    fontSize: 20,
    color: '#3b82f6',
    marginBottom: 32,
    textAlign: 'center',
  },

  coverEmoji: {
    fontSize: 48,
    marginBottom: 24,
  },

  coverMeta: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },

  coverFooter: {
    fontSize: 10,
    color: '#9ca3af',
    textAlign: 'center',
    marginTop: 32,
  },

  // Títulos
  h1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1e40af',
  },

  h2: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
    color: '#2563eb',
  },

  h3: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#3b82f6',
  },

  h4: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 6,
    color: '#60a5fa',
  },

  // Texto
  paragraph: {
    marginBottom: 8,
    textAlign: 'justify',
    lineHeight: 1.6,
  },

  text: {
    fontSize: 11,
  },

  textMuted: {
    color: '#6b7280',
    fontSize: 10,
  },

  // Listas
  list: {
    marginLeft: 16,
    marginBottom: 12,
  },

  listItem: {
    flexDirection: 'row',
    marginBottom: 6,
  },

  listBullet: {
    width: 20,
    fontSize: 11,
  },

  listContent: {
    flex: 1,
    fontSize: 11,
  },

  // Tablas
  table: {
    width: '100%',
    marginTop: 12,
    marginBottom: 16,
  },

  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 8,
    minHeight: 30,
  },

  tableHeader: {
    backgroundColor: '#f3f4f6',
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderBottomColor: '#9ca3af',
  },

  tableCell: {
    paddingHorizontal: 8,
    fontSize: 10,
  },

  tableCellHeader: {
    fontWeight: 'bold',
    fontSize: 10,
  },

  // Badges y etiquetas
  badge: {
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 9,
    marginRight: 6,
    marginBottom: 6,
  },

  badgeGreen: {
    backgroundColor: '#d1fae5',
    color: '#065f46',
  },

  badgeOrange: {
    backgroundColor: '#fed7aa',
    color: '#9a3412',
  },

  badgePurple: {
    backgroundColor: '#e9d5ff',
    color: '#6b21a8',
  },

  // Cajas de advertencia
  warningBox: {
    backgroundColor: '#fef3c7',
    borderLeftWidth: 4,
    borderLeftColor: '#f59e0b',
    padding: 12,
    marginVertical: 12,
    borderRadius: 4,
  },

  infoBox: {
    backgroundColor: '#dbeafe',
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    padding: 12,
    marginVertical: 12,
    borderRadius: 4,
  },

  // Header y Footer
  header: {
    fontSize: 9,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },

  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    fontSize: 9,
    color: '#9ca3af',
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 10,
  },

  // Secciones
  section: {
    marginBottom: 24,
  },

  sectionCard: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

  // Utilidades
  row: {
    flexDirection: 'row',
  },

  spaceBetween: {
    justifyContent: 'space-between',
  },

  mt8: {
    marginTop: 8,
  },

  mt16: {
    marginTop: 16,
  },

  mb8: {
    marginBottom: 8,
  },

  mb16: {
    marginBottom: 16,
  },
});
