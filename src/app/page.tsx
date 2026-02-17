'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ArrowRight,
  Zap,
  FileText,
  Search,
  CheckCircle2,
  Sparkles,
  BookOpen,
  BarChart3,
  Download,
  Layers,
  GitBranch,
  Target,
  Shield,
  Clock,
  Users,
  GraduationCap,
  ChevronRight,
} from 'lucide-react';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-indigo-600/15 via-transparent to-transparent" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        {/* Floating orbs */}
        <div className="absolute top-20 right-[20%] w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-[10%] w-96 h-96 bg-indigo-500/8 rounded-full blur-3xl" />

        <div className="relative z-10 container mx-auto px-4 pt-16 pb-24 md:pt-24 md:pb-32 max-w-6xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center"
          >
            {/* Top badge */}
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-white/[0.07] backdrop-blur-md rounded-full border border-white/[0.12] text-sm text-blue-200">
              <GraduationCap className="h-4 w-4 text-blue-400" />
              <span>Basado en Ian Sommerville - 9na Edicion</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </motion.div>

            {/* Main heading */}
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6">
              <span className="block">Sommerville</span>
              <span className="block bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-300 bg-clip-text text-transparent">
                Assistant
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-4 leading-relaxed">
              Plataforma inteligente de Ingenieria de Software que analiza tu proyecto
              y recomienda el proceso, metodologia y arquitectura ideales
            </motion.p>

            <motion.p variants={fadeInUp} className="text-sm text-slate-400 mb-10">
              Analisis completo en menos de 5 minutos &middot; Sin registro &middot; 100% academico
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/wizard">
                <Button size="lg" className="gap-3 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40 transition-all px-8 py-6 text-base rounded-xl group">
                  <Zap className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Wizard Clasico
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/wizard-v2">
                <Button size="lg" className="gap-3 bg-white/[0.08] hover:bg-white/[0.15] text-white border border-white/[0.15] backdrop-blur-sm shadow-lg transition-all px-8 py-6 text-base rounded-xl group">
                  <Sparkles className="h-5 w-5 text-emerald-400 group-hover:rotate-12 transition-transform" />
                  Wizard Avanzado
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            {/* Stats Row */}
            <motion.div variants={fadeInUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 max-w-3xl mx-auto">
              {[
                { value: '13', label: 'Recomendaciones', icon: Target },
                { value: '2,100+', label: 'Terminos Tecnicos', icon: BookOpen },
                { value: '10', label: 'Plantillas Pro', icon: FileText },
                { value: '6', label: 'Capitulos', icon: Layers },
              ].map((stat) => (
                <div key={stat.label} className="text-center group">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-white/[0.06] border border-white/[0.08] mb-3 group-hover:bg-white/[0.1] transition-colors">
                    <stat.icon className="h-5 w-5 text-blue-400" />
                  </div>
                  <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom curve separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" className="w-full">
            <path d="M0,80 L0,40 Q360,0 720,40 Q1080,80 1440,40 L1440,80 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ===== PRIMARY FEATURES - Wizards ===== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="outline" className="mb-4 text-blue-600 border-blue-200 bg-blue-50 px-4 py-1.5 text-sm">
                Funcionalidad Principal
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Analiza tu proyecto en minutos
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-500 max-w-2xl mx-auto">
              Dos modos de analisis adaptados a tus necesidades. Responde preguntas clave
              y obtendras una recomendacion completa y personalizada.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Wizard Clasico */}
            <motion.div variants={scaleIn}>
              <Link href="/wizard" className="group block">
                <Card className="h-full border-0 shadow-lg shadow-slate-200/80 hover:shadow-xl hover:shadow-blue-100/80 transition-all duration-300 overflow-hidden bg-gradient-to-br from-white to-blue-50/30">
                  <CardContent className="p-8 md:p-10">
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-600/25">
                        <Zap className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-slate-900">Wizard Clasico</h3>
                          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 text-xs">Rapido</Badge>
                        </div>
                        <p className="text-slate-500 leading-relaxed mb-6">
                          Arbol de decision interactivo. Responde 4-5 preguntas sobre tu proyecto
                          y recibe una recomendacion personalizada instantanea con proceso,
                          metodologia, arquitectura y timeline.
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {['4-5 preguntas', 'Resultado inmediato', 'Arbol de decision', 'PDF exportable'].map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                              <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                          <span>Comenzar analisis</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>

            {/* Wizard Avanzado */}
            <motion.div variants={scaleIn}>
              <Link href="/wizard-v2" className="group block">
                <Card className="h-full border-0 shadow-lg shadow-slate-200/80 hover:shadow-xl hover:shadow-emerald-100/80 transition-all duration-300 overflow-hidden bg-gradient-to-br from-white to-emerald-50/30">
                  <CardContent className="p-8 md:p-10">
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-emerald-700 flex items-center justify-center shadow-lg shadow-emerald-600/25">
                        <Sparkles className="h-7 w-7 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold text-slate-900">Wizard Avanzado</h3>
                          <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 text-xs">Profundo</Badge>
                        </div>
                        <p className="text-slate-500 leading-relaxed mb-6">
                          Cuestionario paso a paso con 10 preguntas detalladas. Analisis profundo
                          con scoring inteligente, persistencia de respuestas y recomendaciones
                          mas precisas y contextualizadas.
                        </p>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                          {['10 preguntas', 'Scoring inteligente', 'Analisis profundo', 'Persistencia datos'].map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-slate-600">
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm group-hover:gap-3 transition-all">
                          <span>Explorar wizard avanzado</span>
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== WHAT YOU GET - 6 Panels ===== */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="outline" className="mb-4 text-indigo-600 border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm">
                Resultado Completo
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              6 dimensiones de analisis
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-500 max-w-2xl mx-auto">
              Cada recomendacion incluye un analisis integral de tu proyecto cubriendo
              todos los aspectos fundamentales de la ingenieria de software
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: GitBranch,
                title: 'Proceso de Desarrollo',
                description: 'Waterfall, iterativo, espiral o prototipado. El proceso ideal segun la naturaleza de tu proyecto.',
                color: 'blue',
                gradient: 'from-blue-600 to-blue-700',
                bg: 'bg-blue-50',
                text: 'text-blue-600',
              },
              {
                icon: Zap,
                title: 'Metodologia',
                description: 'Scrum, XP, Kanban o metodologias plan-driven. Con principios, diferenciadores y practicas clave.',
                color: 'emerald',
                gradient: 'from-emerald-600 to-emerald-700',
                bg: 'bg-emerald-50',
                text: 'text-emerald-600',
              },
              {
                icon: Layers,
                title: 'Modelado UML',
                description: 'Notaciones, diagramas especificos, herramientas recomendadas y cuando usar cada tipo de diagrama.',
                color: 'purple',
                gradient: 'from-purple-600 to-purple-700',
                bg: 'bg-purple-50',
                text: 'text-purple-600',
              },
              {
                icon: Shield,
                title: 'Arquitectura',
                description: 'Patrones arquitectonicos, atributos de calidad, ventajas y trade-offs de cada estilo.',
                color: 'amber',
                gradient: 'from-amber-600 to-amber-700',
                bg: 'bg-amber-50',
                text: 'text-amber-600',
              },
              {
                icon: Clock,
                title: 'Timeline',
                description: 'Plan de 12 semanas detallado con fases, tareas y entregables clave para tu proyecto.',
                color: 'rose',
                gradient: 'from-rose-600 to-rose-700',
                bg: 'bg-rose-50',
                text: 'text-rose-600',
              },
              {
                icon: BarChart3,
                title: 'Diagramas',
                description: '4 diagramas Mermaid generados automaticamente: decision, proceso, arquitectura y Gantt.',
                color: 'cyan',
                gradient: 'from-cyan-600 to-cyan-700',
                bg: 'bg-cyan-50',
                text: 'text-cyan-600',
              },
            ].map((panel) => (
              <motion.div key={panel.title} variants={fadeInUp}>
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all duration-300 group bg-white">
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${panel.gradient} mb-4 shadow-sm`}>
                      <panel.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{panel.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{panel.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Export highlight */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full shadow-md border border-slate-100">
              <Download className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">
                Exporta todo como PDF profesional con un solo clic
              </span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SECONDARY FEATURES ===== */}
      <section className="py-20 md:py-28 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="outline" className="mb-4 text-purple-600 border-purple-200 bg-purple-50 px-4 py-1.5 text-sm">
                Herramientas Complementarias
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Todo lo que necesitas
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-500 max-w-2xl mx-auto">
              Ademas del analisis, la plataforma incluye recursos profesionales
              listos para usar en tu proyecto
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {/* Templates & Checklists */}
            <motion.div variants={scaleIn}>
              <Link href="/templates" className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 border border-purple-100/60 p-8 md:p-10 hover:shadow-lg transition-all duration-300">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-200/30 to-transparent rounded-full blur-2xl -translate-y-10 translate-x-10" />

                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-600/20 mb-6">
                      <FileText className="h-7 w-7 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Plantillas & Checklists</h3>
                    <p className="text-slate-500 leading-relaxed mb-6">
                      10 templates profesionales de documentacion tecnica y 8 checklists interactivos
                      con mas de 88 items. Listos para descargar y personalizar.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {['SRS', 'Arquitectura', 'Testing', 'Scrum', 'XP'].map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-white/80 text-purple-700 border-purple-200 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-purple-600 font-semibold text-sm group-hover:gap-3 transition-all">
                      <span>Explorar recursos</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Glossary */}
            <motion.div variants={scaleIn}>
              <Link href="/glossary" className="group block">
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100/60 p-8 md:p-10 hover:shadow-lg transition-all duration-300">
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-amber-200/30 to-transparent rounded-full blur-2xl -translate-y-10 translate-x-10" />

                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-600 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-600/20 mb-6">
                      <Search className="h-7 w-7 text-white" />
                    </div>

                    <h3 className="text-2xl font-bold text-slate-900 mb-3">Glosario Completo</h3>
                    <p className="text-slate-500 leading-relaxed mb-6">
                      Mas de 2,100 terminos tecnicos de ingenieria de software con busqueda avanzada,
                      filtros por capitulo, referencias cruzadas y exportacion a PDF.
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {['Busqueda', 'Filtros', 'Cap. 1-6', 'Export PDF'].map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-white/80 text-amber-700 border-amber-200 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-amber-600 font-semibold text-sm group-hover:gap-3 transition-all">
                      <span>Explorar glosario</span>
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-20 md:py-28 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={stagger}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="outline" className="mb-4 text-slate-600 border-slate-200 bg-white px-4 py-1.5 text-sm">
                Simple y Rapido
              </Badge>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              3 pasos, 5 minutos
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
          >
            {[
              {
                step: '01',
                title: 'Describe tu Proyecto',
                description: 'Responde preguntas sobre tipo de sistema, tamano de equipo, requisitos y nivel de criticidad',
                icon: Users,
                color: 'blue',
              },
              {
                step: '02',
                title: 'Analisis Inteligente',
                description: 'El sistema navega el arbol de decisiones de Sommerville y calcula la recomendacion optima',
                icon: Target,
                color: 'emerald',
              },
              {
                step: '03',
                title: 'Resultado Completo',
                description: 'Recibe proceso, metodologia, arquitectura, timeline, diagramas y plantillas en un PDF profesional',
                icon: Download,
                color: 'purple',
              },
            ].map((item, idx) => (
              <motion.div key={item.step} variants={fadeInUp} className="relative text-center">
                {idx < 2 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] border-t-2 border-dashed border-slate-200" />
                )}
                <div className="relative z-10 inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-white shadow-lg border border-slate-100 mb-6">
                  <item.icon className={`h-10 w-10 text-${item.color}-600`} />
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-600/15 via-transparent to-transparent" />

        <div className="relative z-10 container mx-auto px-4 text-center max-w-3xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Comienza tu analisis ahora
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-300 mb-10 leading-relaxed">
              Obtendras recomendaciones basadas en la mejor literatura academica de ingenieria de software.
              Sin costo, sin registro, resultados inmediatos.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/wizard">
                <Button size="lg" className="gap-3 bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 px-8 py-6 text-base rounded-xl group">
                  <Zap className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Wizard Clasico
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/wizard-v2">
                <Button size="lg" className="gap-3 bg-white/10 hover:bg-white/15 text-white border border-white/15 px-8 py-6 text-base rounded-xl group">
                  <Sparkles className="h-5 w-5 text-emerald-400" />
                  Wizard Avanzado
                </Button>
              </Link>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
              {[
                { icon: CheckCircle2, text: 'Gratuito' },
                { icon: Shield, text: 'Sin registro' },
                { icon: GraduationCap, text: 'Base academica' },
                { icon: Download, text: 'Export PDF' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-slate-500" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-slate-400">
            Basado en <span className="font-medium text-slate-500">Ingenieria de Software</span> de Ian Sommerville (9na Edicion, Capitulos 1-6)
          </p>
          <p className="text-xs text-slate-300 mt-2">
            Herramienta educativa &middot; Adapta las recomendaciones a tu contexto especifico
          </p>
        </div>
      </footer>
    </div>
  );
}
