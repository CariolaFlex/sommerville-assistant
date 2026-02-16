import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    await request.json();

    // TODO: Implementar generación de PDF con @react-pdf/renderer

    return NextResponse.json(
      { message: 'PDF export endpoint - To be implemented' },
      { status: 501 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
}
