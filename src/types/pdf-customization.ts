export interface PDFCustomization {
  projectName?: string;
  companyName?: string;
  authorName?: string;
  logo?: string; // URL o base64 del logo
  primaryColor?: string;
  includeTimestamp?: boolean;
  includeDiagrams?: boolean;
  includeTemplates?: boolean;
  customFooter?: string;
}
