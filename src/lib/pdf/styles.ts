import { StyleSheet } from '@react-pdf/renderer';

// Professional color palette - using only PDF-safe colors
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
    paddingTop: 65,
    paddingBottom: 65,
    paddingHorizontal: 55,
    fontSize: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.6,
    color: colors.text,
  },

  // ===== COVER PAGE =====
  coverPage: {
    paddingTop: 80,
    paddingBottom: 60,
    paddingHorizontal: 70,
    fontSize: 10,
    fontFamily: 'Helvetica',
    lineHeight: 1.6,
    color: colors.text,
  },

  cover: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },

  coverAccentBar: {
    width: 60,
    height: 3,
    backgroundColor: colors.primaryLight,
    marginBottom: 30,
  },

  coverAppName: {
    fontSize: 11,
    color: colors.textLight,
    letterSpacing: 3,
    textTransform: 'uppercase',
    marginBottom: 28,
    fontFamily: 'Helvetica',
  },

  coverTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.primary,
    marginBottom: 14,
    maxWidth: 400,
    lineHeight: 1.3,
  },

  coverSubtitle: {
    fontSize: 16,
    color: colors.primaryLight,
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 1.4,
    maxWidth: 380,
  },

  coverDivider: {
    width: 180,
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 24,
  },

  coverMetaBlock: {
    marginTop: 12,
    alignItems: 'center',
  },

  coverMetaRow: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
  },

  coverMetaLabel: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: 'bold',
    width: 90,
    textAlign: 'right',
    marginRight: 8,
  },

  coverMetaValue: {
    fontSize: 10,
    color: colors.textMuted,
  },

  coverFooterBlock: {
    marginTop: 'auto',
    paddingBottom: 10,
    alignItems: 'center',
  },

  coverFooter: {
    fontSize: 9,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 1.5,
  },

  coverBadgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: 320,
  },

  // ===== TYPOGRAPHY =====
  h1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 14,
    paddingBottom: 6,
    borderBottomWidth: 2,
    borderBottomColor: colors.primaryLight,
  },

  h2: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  h3: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.primaryLight,
    marginTop: 14,
    marginBottom: 8,
  },

  h4: {
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.primaryMuted,
    marginTop: 14,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  paragraph: {
    marginBottom: 10,
    textAlign: 'justify',
    lineHeight: 1.7,
    fontSize: 10,
  },

  text: {
    fontSize: 10,
    lineHeight: 1.6,
  },

  textMuted: {
    color: colors.textMuted,
    fontSize: 9,
  },

  textSmall: {
    fontSize: 9,
    color: colors.textMuted,
    lineHeight: 1.5,
    marginBottom: 4,
  },

  // ===== LISTS =====
  list: {
    marginLeft: 8,
    marginBottom: 12,
    marginTop: 4,
  },

  listItem: {
    flexDirection: 'row',
    marginBottom: 5,
    fontSize: 10,
    paddingRight: 8,
  },

  listBullet: {
    width: 18,
    fontSize: 10,
    color: colors.primaryLight,
    textAlign: 'center',
  },

  listContent: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.6,
  },

  // ===== TABLES =====
  table: {
    width: '100%',
    marginTop: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },

  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: 6,
    minHeight: 30,
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
    lineHeight: 1.5,
  },

  tableCellHeader: {
    fontWeight: 'bold',
    fontSize: 9,
    color: colors.white,
    paddingHorizontal: 8,
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
    marginVertical: 6,
    borderRadius: 2,
  },

  infoBox: {
    backgroundColor: '#eff6ff',
    borderLeftWidth: 3,
    borderLeftColor: colors.info,
    padding: 10,
    marginVertical: 8,
    borderRadius: 2,
  },

  successBox: {
    backgroundColor: '#ecfdf5',
    borderLeftWidth: 3,
    borderLeftColor: colors.success,
    padding: 10,
    marginVertical: 8,
    borderRadius: 2,
  },

  // ===== HEADER & FOOTER =====
  header: {
    fontSize: 8,
    color: colors.textLight,
    textAlign: 'right',
    marginBottom: 18,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'Helvetica',
  },

  footer: {
    position: 'absolute',
    bottom: 30,
    left: 55,
    right: 55,
    fontSize: 8,
    color: colors.textLight,
    textAlign: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
    fontFamily: 'Helvetica',
  },

  // ===== SECTIONS =====
  section: {
    marginBottom: 18,
  },

  sectionCard: {
    backgroundColor: colors.bg,
    padding: 12,
    borderRadius: 4,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },

  sectionCardHighlight: {
    backgroundColor: '#eff6ff',
    padding: 12,
    borderRadius: 4,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },

  // ===== DIAGRAM PAGE =====
  diagramContainer: {
    marginTop: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },

  diagramImage: {
    maxWidth: '100%',
    maxHeight: 460,
    objectFit: 'contain',
  },

  diagramPlaceholder: {
    padding: 24,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
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
    marginVertical: 14,
  },
});
