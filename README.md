# 🎓 Sommerville Assistant

Aplicación web interactiva para navegación de conceptos de Ingeniería de Software basada en Sommerville (Cap. 1-6).

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Abrir [http://localhost:3000](http://localhost:3000)

## 📦 Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS** + shadcn/ui
- **Mermaid.js** - Diagramas dinámicos
- **React-PDF** - Exportación PDF
- **Framer Motion** - Animaciones

## 📁 Estructura

```
src/
├── app/              # Pages y routing (Next.js App Router)
├── components/       # Componentes React reutilizables
├── data/            # JSON estáticos (árbol de decisiones, glosario)
├── utils/           # Utilidades y generadores
├── types/           # TypeScript types
├── hooks/           # Custom React hooks
└── lib/             # Configuración y constantes
```

## 🛠️ Desarrollo

```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run lint     # Linter
npm run start    # Servidor de producción
```

## 📚 Características

- ✅ Wizard interactivo de decisiones
- ✅ Recomendaciones personalizadas de proceso/metodología/arquitectura
- ✅ Timeline de 12 semanas con acciones concretas
- ✅ Diagramas generados dinámicamente (Mermaid.js)
- ✅ Glosario técnico contextual (150+ términos)
- ✅ Exportación a PDF profesional
- ✅ Plantillas y checklists descargables

## 📖 Capítulos Cubiertos

1. Introducción a la Ingeniería de Software
2. Procesos de Software
3. Desarrollo Ágil de Software
4. Ingeniería de Requisitos
5. Modelado de Sistemas
6. Diseño Arquitectónico

## 🎯 Próximos Pasos

1. Completar árbol de decisiones en `src/data/decision-tree.json`
2. Agregar 12+ nodos de recomendaciones finales
3. Poblar glosario con términos de capítulos 1-6
4. Implementar componentes del wizard
5. Crear generadores de diagramas Mermaid
6. Implementar exportación PDF

## 📝 License

MIT
