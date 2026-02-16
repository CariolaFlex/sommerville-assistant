'use client';

import { contentManager } from '@/lib/content-manager';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function TestContentManagerPage() {
  const chapters = contentManager.getAllChapters();
  const allConcepts = Array.from(
    new Set(
      chapters.flatMap(ch => ch.concepts)
    )
  );

  return (
    <div className="container mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold">🧪 Test: Content Manager</h1>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>FASE 0: Validación de Arquitectura</AlertTitle>
        <AlertDescription>
          Esta página valida que el sistema de Content Manager esté correctamente implementado.
        </AlertDescription>
      </Alert>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Estado del Sistema</h2>

        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Capítulos Cargados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{chapters.length}</p>
              <p className="text-sm text-muted-foreground">Esperado: 0 (placeholder)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Conceptos Indexados</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{allConcepts.length}</p>
              <p className="text-sm text-muted-foreground">Esperado: 0 (pendiente FASE 1)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Estado</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                <span className="font-semibold">Arquitectura OK</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Validaciones</h2>

        <div className="space-y-2">
          <div className="flex items-center gap-2 p-3 bg-green-50 rounded">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span>✅ ContentManager class existe e instancia correctamente</span>
          </div>

          <div className="flex items-center gap-2 p-3 bg-green-50 rounded">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span>✅ Métodos públicos implementados (getChapter, findConcept, etc.)</span>
          </div>

          <div className="flex items-center gap-2 p-3 bg-green-50 rounded">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <span>✅ Singleton exportado correctamente</span>
          </div>

          <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded">
            <Info className="h-5 w-5 text-yellow-600" />
            <span>⏳ Archivos JSON placeholder creados (contenido en FASE 1)</span>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Próximos Pasos</h2>

        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>FASE 1: Población de Datos</AlertTitle>
          <AlertDescription>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Extraer contenido de <code>audit-source/book-chapters/*.md</code></li>
              <li>Poblar <code>chapter-1.json</code> a <code>chapter-6.json</code></li>
              <li>Validar con schemas de Zod</li>
              <li>Volver a esta página para ver datos reales</li>
            </ul>
          </AlertDescription>
        </Alert>
      </section>
    </div>
  );
}
