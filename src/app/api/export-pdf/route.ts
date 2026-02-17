import { NextRequest, NextResponse } from 'next/server';

/**
 * PDF Export API Endpoint (Server-Side)
 *
 * NOTE: Currently NOT in use. PDF generation is handled client-side using @react-pdf/renderer
 * in components/pdf/* and hooks/useExportPDF.ts for better user experience and browser compatibility.
 *
 * This endpoint is kept for future server-side PDF generation if needed (e.g., for email attachments).
 */
export async function POST(request: NextRequest) {
  try {
    await request.json();

    // Currently not implemented - PDF generation is done client-side
    return NextResponse.json(
      {
        message: 'PDF export is handled client-side. See components/pdf/* for implementation.',
        status: 'not_implemented'
      },
      { status: 501 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to process PDF export request' },
      { status: 500 }
    );
  }
}
