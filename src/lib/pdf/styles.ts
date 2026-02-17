import { StyleSheet } from '@react-pdf/renderer';

// Professional color palette
const colors = {
  primary: '#1e3a5f',
  primaryLight: '#2563eb',
  primaryMuted: '#64748b',
  dark: '#0f172a',
  text: '#1e293b',
  textMuted: '#64748b',
  textLight: '#94a3b8',
  border: '#e2e8f0',
  borderDark: '#cbd5e1',
  bg: '#f8fafc',
  bgCard: '#f1f5f9',
  white: '#ffffff',
  success: '#059669',
  warning: '#d97706',
  danger: '#dc2626',
  info: '#2563eb',
  accent: '#7c3aed',
};

export const styles = StyleSheet.create({
  // ===== PAGE LAYOUT =====
  page: {
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 50,
    fontSize: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.5,
    color: colors.text,
  },

  // ===== COVER PAGE =====
  cover: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  coverAccentBar: {
    width: 80,
    height: 4,
    backgroundColor: colors.primaryLight,
    marginBottom: 24,
    borderRadius: 2,
  },

  coverTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.primary,
    letterSpacing: -0.5,
    marginBottom: 8,
  },

  coverSubtitle: {
    fontSize: 18,
    color: colors.primaryLight,
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 1.4,
  },

  coverEmoji: {
    fontSize: 48,
    marginBottom: 24,
  },

  coverMeta: {
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 6,
    textAlign: 'center',
  },

  coverMetaLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: 'bold',
  },

  coverFooter: {
    fontSize: 9,
    color: colors.textLight,
    textAlign: 'center',
  },

  coverDivider: {
    width: 200,
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 20,
  },

  // ===== TYPOGRAPHY =====
  h1: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryLight,
  },

  h2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 16,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  h3: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.primaryLight,
    marginTop: 12,
    marginBottom: 6,
  },

  h4: {
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.primaryMuted,
    marginTop: 10,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  paragraph: {
    marginBottom: 8,
    textAlign: 'justify',
    lineHeight: 1.6,
    fontSize: 10,
  },

  text: {
    fontSize: 10,
    lineHeight: 1.5,
  },

  textMuted: {
    color: colors.textMuted,
    fontSize: 9,
  },

  textSmall: {
    fontSize: 9,
    color: colors.textMuted,
    lineHeight: 1.4,
  },

  // ===== LISTS =====
  list: {
    marginLeft: 12,
    marginBottom: 10,
  },

  listItem: {
    flexDirection: 'row',
    marginBottom: 4,
    fontSize: 10,
  },

  listBullet: {
    width: 16,
    fontSize: 10,
    color: colors.primaryLight,
  },

  listContent: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.5,
  },

  // ===== TABLES =====
  table: {
    width: '100%',
    marginTop: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
  },

  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 7,
    paddingHorizontal: 4,
    minHeight: 28,
  },

  tableRowAlternate: {
    backgroundColor: colors.bg,
  },

  tableHeader: {
    backgroundColor: colors.primary,
    borderBottomWidth: 0,
  },

  tableCell: {
    paddingHorizontal: 8,
    fontSize: 9,
    lineHeight: 1.4,
  },

  tableCellHeader: {
    fontWeight: 'bold',
    fontSize: 9,
    color: colors.white,
  },

  // ===== BADGES =====
  badge: {
    backgroundColor: colors.bg,
    color: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 3,
    fontSize: 8,
    marginRight: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },

  badgeGreen: {
    backgroundColor: '#ecfdf5',
    color: colors.success,
    borderColor: '#a7f3d0',
  },

  badgeOrange: {
    backgroundColor: '#fffbeb',
    color: colors.warning,
    borderColor: '#fde68a',
  },

  badgePurple: {
    backgroundColor: '#f5f3ff',
    color: colors.accent,
    borderColor: '#ddd6fe',
  },

  badgeBlue: {
    backgroundColor: '#eff6ff',
    color: colors.info,
    borderColor: '#bfdbfe',
  },

  // ===== BOXES / CALLOUTS =====
  warningBox: {
    backgroundColor: '#fffbeb',
    borderLeftWidth: 3,
    borderLeftColor: colors.warning,
    padding: 10,
    marginVertical: 8,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#fde68a',
  },

  infoBox: {
    backgroundColor: '#eff6ff',
    borderLeftWidth: 3,
    borderLeftColor: colors.info,
    padding: 10,
    marginVertical: 8,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },

  successBox: {
    backgroundColor: '#ecfdf5',
    borderLeftWidth: 3,
    borderLeftColor: colors.success,
    padding: 10,
    marginVertical: 8,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },

  // ===== HEADER & FOOTER =====
  header: {
    fontSize: 8,
    color: colors.textLight,
    textAlign: 'right',
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    fontSize: 8,
    color: colors.textLight,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },

  // ===== SECTIONS =====
  section: {
    marginBottom: 14,
  },

  sectionCard: {
    backgroundColor: colors.bg,
    padding: 12,
    borderRadius: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },

  sectionCardHighlight: {
    backgroundColor: '#eff6ff',
    padding: 12,
    borderRadius: 4,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },

  // ===== UTILITIES =====
  row: {
    flexDirection: 'row',
  },

  spaceBetween: {
    justifyContent: 'space-between',
  },

  flexWrap: {
    flexWrap: 'wrap',
  },

  mt4: {
    marginTop: 4,
  },

  mt8: {
    marginTop: 8,
  },

  mt16: {
    marginTop: 16,
  },

  mb4: {
    marginBottom: 4,
  },

  mb8: {
    marginBottom: 8,
  },

  mb16: {
    marginBottom: 16,
  },

  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
});
