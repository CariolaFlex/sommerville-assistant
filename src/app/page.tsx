import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Zap, FileText, Search, CheckCircle2, Lightbulb, TrendingUp, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-16 md:py-24 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent" />
        
        <div className="container mx-auto px-4 text-center max-w-5xl relative z-10">
          <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <p className="text-sm font-medium">✨ Basado en Ian Sommerville - 9na Edición</p>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            🎓 Sommerville Assistant
          </h1>
          
          <p className="text-xl md:text-2xl mb-4 text-blue-100 leading-relaxed">
            Descubre el proceso, metodología y arquitectura perfectos para tu proyecto
            de software en minutos
          </p>
          
          <p className="text-base md:text-lg mb-10 text-blue-200">
            Guía interactiva basada en los capítulos 1-6 del libro &quot;Ingeniería de Software&quot;
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/wizard">
              <Button size="lg" className="gap-2 bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all w-full sm:w-auto group">
                <Zap className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                Comenzar Análisis
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <Link href="/glossary">
              <Button size="lg" variant="outline" className="gap-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm w-full sm:w-auto">
                <Search className="h-5 w-5" />
                Explorar Glosario
              </Button>
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-3xl font-bold">13</p>
              <p className="text-sm text-blue-100">Recomendaciones</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-3xl font-bold">2,100</p>
              <p className="text-sm text-blue-100">Términos</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-3xl font-bold">7</p>
              <p className="text-sm text-blue-100">Plantillas</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
              <p className="text-3xl font-bold">6</p>
              <p className="text-sm text-blue-100">Capítulos</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Qué puedes hacer con Sommerville Assistant?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Herramientas profesionales para tomar decisiones informadas en tu proyecto
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/wizard" className="group">
              <Card className="h-full hover:shadow-lg transition-all border-t-4 border-t-blue-500 hover:scale-105 cursor-pointer">
                <CardHeader>
                  <Zap className="h-10 w-10 text-blue-600 mb-3 group-hover:rotate-12 transition-transform" />
                  <CardTitle>Wizard Clásico</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    Árbol de decisión interactivo: responde 4-5 preguntas sobre tu proyecto y obtén recomendación personalizada
                  </CardDescription>
                  <Button variant="link" className="mt-3 p-0 h-auto text-blue-600 group-hover:translate-x-1 transition-transform">
                    Comenzar →
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/wizard-v2" className="group">
              <Card className="h-full hover:shadow-lg transition-all border-t-4 border-t-green-500 hover:scale-105 cursor-pointer">
                <CardHeader>
                  <Sparkles className="h-10 w-10 text-green-600 mb-3 group-hover:rotate-12 transition-transform" />
                  <CardTitle>Wizard Avanzado</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    Cuestionario paso a paso con 10 preguntas: análisis profundo con scoring inteligente y persistencia de respuestas
                  </CardDescription>
                  <Button variant="link" className="mt-3 p-0 h-auto text-green-600 group-hover:translate-x-1 transition-transform">
                    Explorar →
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/templates" className="group">
              <Card className="h-full hover:shadow-lg transition-all border-t-4 border-t-purple-500 hover:scale-105 cursor-pointer">
                <CardHeader>
                  <FileText className="h-10 w-10 text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
                  <CardTitle>Plantillas & Checklists</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    10 templates profesionales + 8 checklists con 88+ items para aplicar inmediatamente en tu proyecto
                  </CardDescription>
                  <Button variant="link" className="mt-3 p-0 h-auto text-purple-600 group-hover:translate-x-1 transition-transform">
                    Ver Templates →
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link href="/glossary" className="group">
              <Card className="h-full hover:shadow-lg transition-all border-t-4 border-t-orange-500 hover:scale-105 cursor-pointer">
                <CardHeader>
                  <Search className="h-10 w-10 text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
                  <CardTitle>Glosario Completo</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    2,100+ términos técnicos con búsqueda avanzada, filtros por capítulo y referencias cruzadas
                  </CardDescription>
                  <Button variant="link" className="mt-3 p-0 h-auto text-orange-600 group-hover:translate-x-1 transition-transform">
                    Explorar →
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Cómo funciona?
            </h2>
            <p className="text-lg text-muted-foreground">
              Tres pasos simples para obtener tu recomendación personalizada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Paso 1 */}
            <div className="relative text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-4 relative z-10">
                <Lightbulb className="h-12 w-12" />
              </div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-0">
                1
              </div>
              <h3 className="text-xl font-bold mb-3 mt-6">Responde el Cuestionario</h3>
              <p className="text-muted-foreground leading-relaxed">
                Describe tu proyecto: tipo de sistema, tamaño de equipo, volatilidad de requisitos y criticidad
              </p>
            </div>

            {/* Paso 2 */}
            <div className="relative text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-600 mb-4 relative z-10">
                <TrendingUp className="h-12 w-12" />
              </div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-0">
                2
              </div>
              <h3 className="text-xl font-bold mb-3 mt-6">Análisis Inteligente</h3>
              <p className="text-muted-foreground leading-relaxed">
                El sistema analiza tus respuestas y navega por el árbol de decisiones basado en Sommerville
              </p>
            </div>

            {/* Paso 3 */}
            <div className="relative text-center">
              <div className="mx-auto w-20 h-20 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mb-4 relative z-10">
                <CheckCircle2 className="h-12 w-12" />
              </div>
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-xl z-0">
                3
              </div>
              <h3 className="text-xl font-bold mb-3 mt-6">Recibe Recomendación</h3>
              <p className="text-muted-foreground leading-relaxed">
                Obtén proceso, metodología, arquitectura, timeline y plantillas específicas para tu caso
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <p className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                13
              </p>
              <p className="text-sm text-muted-foreground font-medium">Caminos de decisión</p>
            </div>
            <div className="space-y-2">
              <p className="text-5xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
                2.1K
              </p>
              <p className="text-sm text-muted-foreground font-medium">Términos técnicos</p>
            </div>
            <div className="space-y-2">
              <p className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                7
              </p>
              <p className="text-sm text-muted-foreground font-medium">Plantillas listas</p>
            </div>
            <div className="space-y-2">
              <p className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                6
              </p>
              <p className="text-sm text-muted-foreground font-medium">Capítulos cubiertos</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
        
        <div className="container mx-auto px-4 text-center max-w-4xl relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para elegir tu proceso de desarrollo?
          </h2>
          <p className="text-xl mb-8 text-blue-100 leading-relaxed">
            En menos de 5 minutos tendrás una recomendación completa con timeline, plantillas y mejores prácticas de la industria
          </p>
          <Link href="/wizard">
            <Button size="lg" className="gap-2 bg-white text-blue-600 hover:bg-blue-50 shadow-xl hover:shadow-2xl transition-all group">
              <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              Empezar Ahora
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          
          <p className="mt-6 text-sm text-blue-200">
            ✨ Gratis • Sin registro • Basado en bibliografía académica
          </p>
        </div>
      </section>
    </div>
  );
}