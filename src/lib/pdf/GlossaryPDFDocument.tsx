import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import type { GlossaryTerm } from '@/types/glossary';
import { formatPDFDate } from './utils';

interface GlossaryPDFDocumentProps {
  terms: GlossaryTerm[];
}

// PDF-specific styles
const pdfStyles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: 'Helvetica',
  },
  coverPage: {
    padding: 60,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  coverSubtitle: {
    fontSize: 16,
    marginBottom: 40,
    textAlign: 'center',
    color: '#666',
  },
  coverMeta: {
    fontSize: 11,
    marginBottom: 8,
    textAlign: 'center',
    color: '#888',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1a1a1a',
    borderBottom: '2pt solid #3b82f6',
    paddingBottom: 8,
  },
  chapterHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
    color: '#3b82f6',
  },
  termContainer: {
    marginBottom: 16,
    paddingBottom: 12,
    borderBottom: '1pt solid #e5e7eb',
  },
  termName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1a1a1a',
  },
  termCategory: {
    fontSize: 9,
    marginBottom: 6,
    color: '#3b82f6',
    fontStyle: 'italic',
  },
  termDescription: {
    fontSize: 10,
    lineHeight: 1.5,
    marginBottom: 8,
    color: '#374151',
  },
  termExtendedDescription: {
    fontSize: 9,
    lineHeight: 1.5,
    marginBottom: 8,
    color: '#4b5563',
    backgroundColor: '#f9fafb',
    padding: 8,
    borderRadius: 4,
  },
  sectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
    color: '#6b7280',
  },
  exampleItem: {
    fontSize: 9,
    lineHeight: 1.4,
    marginBottom: 4,
    paddingLeft: 12,
    color: '#4b5563',
  },
  keywordBadge: {
    fontSize: 8,
    padding: '4 8',
    marginRight: 6,
    marginBottom: 4,
    backgroundColor: '#dbeafe',
    color: '#1e40af',
    borderRadius: 4,
  },
  keywordsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 6,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    fontSize: 8,
    color: '#9ca3af',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 30,
    right: 40,
    fontSize: 9,
    color: '#6b7280',
  },
});

export function GlossaryPDFDocument({ terms }: GlossaryPDFDocumentProps) {
  // Group terms by chapter
  const termsByChapter = terms.reduce(
    (acc, term) => {
      if (!acc[term.capitulo]) {
        acc[term.capitulo] = [];
      }
      acc[term.capitulo].push(term);
      return acc;
    },
    {} as Record<number, GlossaryTerm[]>
  );

  const chapters = Object.keys(termsByChapter)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <Document>
      {/* Cover Page */}
      <Page size="A4" style={pdfStyles.coverPage}>
        <Text style={pdfStyles.coverTitle}>📚 Glosario Técnico</Text>
        <Text style={pdfStyles.coverSubtitle}>
          Ingeniería de Software - Ian Sommerville
        </Text>
        <Text style={pdfStyles.coverMeta}>
          {terms.length.toLocaleString()} términos exportados
        </Text>
        <Text style={pdfStyles.coverMeta}>Capítulos 1-6</Text>
        <Text style={pdfStyles.coverMeta}>Generado: {formatPDFDate()}</Text>
        <View style={{ marginTop: 60 }}>
          <Text style={{ fontSize: 9, color: '#9ca3af', textAlign: 'center' }}>
            Sommerville Assistant
          </Text>
          <Text style={{ fontSize: 8, color: '#9ca3af', textAlign: 'center', marginTop: 4 }}>
            Software Engineering - Capítulos 1-6
          </Text>
        </View>
      </Page>

      {/* Terms by Chapter */}
      {chapters.map((chapter) => {
        const chapterTerms = termsByChapter[chapter];
        const chunks: GlossaryTerm[][] = [];

        // Split terms into chunks to avoid page overflow
        const chunkSize = 15; // Terms per page
        for (let i = 0; i < chapterTerms.length; i += chunkSize) {
          chunks.push(chapterTerms.slice(i, i + chunkSize));
        }

        return chunks.map((chunk, chunkIndex) => (
          <Page
            key={`chapter-${chapter}-chunk-${chunkIndex}`}
            size="A4"
            style={pdfStyles.page}
          >
            {chunkIndex === 0 && (
              <Text style={pdfStyles.header}>Capítulo {chapter}</Text>
            )}

            {chunk.map((term) => (
              <View key={term.id} style={pdfStyles.termContainer}>
                <Text style={pdfStyles.termName}>{term.nombre}</Text>
                <Text style={pdfStyles.termCategory}>{term.categoria}</Text>

                <Text style={pdfStyles.termDescription}>{term.descripcionBreve}</Text>

                {term.descripcionExtendida && (
                  <Text style={pdfStyles.termExtendedDescription}>
                    {term.descripcionExtendida}
                  </Text>
                )}

                {term.ejemplos && term.ejemplos.length > 0 && (
                  <View>
                    <Text style={pdfStyles.sectionTitle}>Ejemplos:</Text>
                    {term.ejemplos.map((ejemplo, eIdx) => (
                      <Text key={eIdx} style={pdfStyles.exampleItem}>
                        • {ejemplo}
                      </Text>
                    ))}
                  </View>
                )}

                {term.keywords.length > 0 && (
                  <View style={pdfStyles.keywordsContainer}>
                    {term.keywords.slice(0, 8).map((keyword, kIdx) => (
                      <Text key={kIdx} style={pdfStyles.keywordBadge}>
                        {keyword}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            ))}

            <Text style={pdfStyles.footer}>
              Sommerville Assistant - Glosario Técnico
            </Text>
            <Text
              style={pdfStyles.pageNumber}
              render={({ pageNumber, totalPages }) =>
                `${pageNumber} / ${totalPages}`
              }
              fixed
            />
          </Page>
        ));
      })}
    </Document>
  );
}
