# ÁRBOL DE DECISIONES - INGENIERÍA DE SOFTWARE SOMMERVILLE
## Sistema de Navegación Inteligente para Capítulos 1-6

---

## 📖 CÓMO USAR ESTE SISTEMA

### Propósito
Este árbol de decisiones te guía desde el **tipo de sistema** que vas a desarrollar hasta **recomendaciones concretas** sobre:
- ✅ Proceso de software adecuado
- ✅ Metodología (ágil vs tradicional)
- ✅ Prácticas técnicas específicas
- ✅ Técnicas de modelado UML
- ✅ Patrón arquitectónico recomendado
- ✅ Acciones inmediatas para implementar

### Funcionamiento
1. Comienza en el **NODO RAÍZ** respondiendo la pregunta inicial
2. Sigue las ramas según las características de tu proyecto
3. Cada decisión **descarta** automáticamente opciones que NO aplican
4. Llegas a un **nodo final** con una recomendación completa y accionable

### Navegación Rápida
- **Tabla de Decisión Rápida**: Sección 2
- **Todos los Caminos Completos**: Sección 3
- **Árbol Completo**: Sección 4

---

## 1️⃣ TABLA DE DECISIÓN RÁPIDA

Usa esta tabla para encontrar rápidamente tu camino sin navegar todo el árbol:

| Tipo de Sistema | Requerimientos | Criticidad | Tamaño Equipo | Cliente Disponible | → Proceso Recomendado | Metodología | Arquitectura |
|----------------|----------------|------------|---------------|-------------------|----------------------|-------------|--------------|
| **Embebido/Crítico** | Estables | ALTA | Grande (>20) | No continuo | Cascada + RUP | Tradicional | Capas |
| **Embebido/Crítico** | Estables | ALTA | Pequeño (<10) | No continuo | Cascada Adaptado | Tradicional | Capas |
| **Transaccional** | Moderadamente estables | Media-Alta | Grande | Disponible | Incremental + RUP | Híbrido | Capas + Cliente-Servidor |
| **Web/SaaS** | Volátiles | Baja | Pequeño (<10) | Disponible | Incremental | Scrum o XP | MVC o Capas |
| **Web/SaaS** | Volátiles | Baja | Mediano (10-20) | Disponible | Incremental | Scrum | MVC + Microservicios |
| **Personal/Móvil** | Volátiles | Baja | Muy pequeño (<5) | Usuario final accesible | Incremental | XP | MVC |
| **Entretenimiento** | Inciertos/Creativos | Baja | Pequeño-Mediano | No crítico | Incremental + Prototipos | Ágil Adaptado | Según juego |
| **Procesamiento Lotes** | Estables | Media | Mediano | No continuo | Cascada o Incremental | Tradicional | Repositorio |
| **Recolección Datos** | Estables | Alta (confiabilidad) | Pequeño | No disponible | Cascada | Tradicional | Cliente-Servidor |
| **Sistema de Sistemas** | Muy complejos | Alta | Muy grande (>50) | Múltiples stakeholders | RUP + Interfaces definidas | Tradicional | Capas + Interfaces |

---

## 2️⃣ ÍNDICE DE TODOS LOS CAMINOS POSIBLES

### CAMINO 1: Sistema Crítico de Seguridad → Requerimientos Estables → Equipo Grande
- **Tipo**: Embebido/Crítico (aviones, marcapasos, control industrial)
- **Proceso**: Cascada + RUP
- **Metodología**: Tradicional con especificación exhaustiva
- **Modelado**: UML completo (Casos de Uso + Secuencia + Clases + Estado)
- **Arquitectura**: Capas (seguridad multinivel)
- **Resultado**: Ver [NODO-FINAL-01]

### CAMINO 2: Sistema Crítico → Requerimientos Estables → Equipo Pequeño
- **Tipo**: Embebido/Crítico
- **Proceso**: Cascada Adaptado (menos overhead documental)
- **Metodología**: Tradicional simplificada
- **Modelado**: UML esencial (Casos de Uso + Secuencia + Clases)
- **Arquitectura**: Capas
- **Resultado**: Ver [NODO-FINAL-02]

### CAMINO 3: Sistema Crítico → Requerimientos Volátiles (CONFLICTO)
- **Tipo**: Embebido/Crítico
- **ADVERTENCIA**: Combinación crítico + volátil es riesgosa
- **Proceso**: Modelo Espiral (gestión de riesgo)
- **Metodología**: Híbrida (análisis exhaustivo + iteraciones controladas)
- **Modelado**: UML completo + Prototipado
- **Arquitectura**: Capas
- **Resultado**: Ver [NODO-FINAL-03-ESPECIAL]

### CAMINO 4: Sistema Transaccional → Estables → Grande → Cliente Limitado
- **Tipo**: Bancario, E-commerce grande, ERP
- **Proceso**: Incremental + RUP
- **Metodología**: Híbrida (especificación inicial + entregas incrementales)
- **Modelado**: Casos de Uso + Secuencia + Clases detallado
- **Arquitectura**: Capas + Cliente-Servidor
- **Resultado**: Ver [NODO-FINAL-04]

### CAMINO 5: Sistema Transaccional → Volátiles → Mediano → Cliente Disponible
- **Tipo**: E-commerce mediano, CRM en crecimiento
- **Proceso**: Incremental
- **Metodología**: Scrum
- **Modelado**: Casos de Uso ligeros + Clases core
- **Arquitectura**: Capas + MVC
- **Resultado**: Ver [NODO-FINAL-05]

### CAMINO 6: Web/SaaS → Startup → Cliente Disponible → Equipo Pequeño
- **Tipo**: Producto nuevo, startup, innovación
- **Proceso**: Incremental
- **Metodología**: Scrum o XP
- **Prácticas**: TDD, Integración Continua, Historias de Usuario
- **Modelado**: Casos de Uso + Secuencia para flows críticos
- **Arquitectura**: MVC
- **Resultado**: Ver [NODO-FINAL-06]

### CAMINO 7: Web/SaaS → Escalamiento → Equipo Mediano
- **Tipo**: SaaS en crecimiento, necesita escalar
- **Proceso**: Incremental
- **Metodología**: Scrum con equipos múltiples
- **Modelado**: Casos de Uso + Clases + Componentes
- **Arquitectura**: MVC + considerando Microservicios
- **Resultado**: Ver [NODO-FINAL-07]

### CAMINO 8: Personal/Móvil → Funcionalidad Específica → Equipo Muy Pequeño
- **Tipo**: App móvil, herramienta personal
- **Proceso**: Incremental
- **Metodología**: XP o desarrollo rápido
- **Prácticas**: TDD, Refactorización
- **Modelado**: Casos de Uso mínimos + Clases core
- **Arquitectura**: MVC (patrón nativo de plataformas móviles)
- **Resultado**: Ver [NODO-FINAL-08]

### CAMINO 9: Entretenimiento → Creatividad → Prototipos
- **Tipo**: Videojuegos, simuladores
- **Proceso**: Incremental con prototipos desechables
- **Metodología**: Ágil adaptado (creatividad > proceso)
- **Modelado**: Mínimo (Casos de Uso para mecánicas + Estado para gameplay)
- **Arquitectura**: Según engine o plataforma
- **Resultado**: Ver [NODO-FINAL-09]

### CAMINO 10: Procesamiento por Lotes → Volúmenes Grandes → Eficiencia Crítica
- **Tipo**: Nómina, facturación mensual, reportes
- **Proceso**: Cascada o Incremental (según complejidad)
- **Metodología**: Tradicional con planificación
- **Modelado**: Casos de Uso + Actividad (flujos de proceso)
- **Arquitectura**: Repositorio (base de datos central)
- **Resultado**: Ver [NODO-FINAL-10]

### CAMINO 11: Recolección de Datos → Confiabilidad → Condiciones Adversas
- **Tipo**: IoT, estaciones meteorológicas, sensores
- **Proceso**: Cascada (requerimientos estables de hardware)
- **Metodología**: Tradicional
- **Modelado**: Casos de Uso + Estado (ciclos de lectura) + Secuencia
- **Arquitectura**: Cliente-Servidor
- **Resultado**: Ver [NODO-FINAL-11]

### CAMINO 12: Sistema de Sistemas → Múltiples Subsistemas → Integración Compleja
- **Tipo**: Control de tráfico aéreo, sistemas de defensa
- **Proceso**: RUP + definición de interfaces
- **Metodología**: Tradicional con gestión compleja
- **Modelado**: UML completo + especial atención a interfaces
- **Arquitectura**: Capas + Interfaces bien definidas
- **Resultado**: Ver [NODO-FINAL-12]

---

## 3️⃣ ÁRBOL COMPLETO JERÁRQUICO

```
┌─────────────────────────────────────────────────────────────┐
│ NODO RAÍZ: ¿Qué tipo de sistema de software desarrollas?   │
│                                                             │
│ Opciones basadas en Capítulo 1, Tabla de Tipos de Sistemas │
└─────────────────────────────────────────────────────────────┘
                            │
                            ├────────────────────────────────────────────────────┐
                            │                                                    │
┌───────────────────────────▼──────────────┐  ┌────────────────────────────────▼─────────────┐
│ A: SISTEMA CRÍTICO DE SEGURIDAD          │  │ B: SISTEMA WEB / SaaS                        │
│                                          │  │                                              │
│ Características:                         │  │ Características:                             │
│ • Fallas causan daño físico/económico    │  │ • Múltiples plataformas                      │
│ • ROM o hardware especializado           │  │ • Evolución rápida                           │
│ • Difícil/imposible actualizar después   │  │ • Componentes reutilizables                  │
│                                          │  │                                              │
│ Ejemplos:                                │  │ Ejemplos:                                    │
│ • Control de frenos ABS                  │  │ • Redes sociales (Facebook, Twitter)         │
│ • Marcapasos cardíaco                    │  │ • E-commerce (Amazon, MercadoLibre)          │
│ • Sistema de vuelo de avión              │  │ • SaaS (Salesforce, Slack, Notion)           │
│ • Control nuclear                        │  │                                              │
│                                          │  │ Cuándo elegir:                               │
│ Cuándo elegir:                           │  │ • Acceso web/móvil                           │
│ • Vidas humanas dependen del sistema     │  │ • Usuarios remotos                           │
│ • Regulaciones estrictas (FDA, aviación) │  │ • Cambios frecuentes de mercado              │
│ • Hardware embebido                      │  │                                              │
└──────────────┬───────────────────────────┘  └────────────┬─────────────────────────────────┘
               │                                           │
               │                                           │
    ┌──────────▼──────────┐                     ┌──────────▼─────────────┐
    │ A1: Requerimientos  │                     │ B1: Startup /          │
    │     Estables        │                     │     Producto Nuevo     │
    │                     │                     │                        │
    │ Características:    │                     │ Características:       │
    │ • Cliente sabe QUÉ  │                     │ • Incertidumbre alta   │
    │ • Especificación    │                     │ • Pivotear rápido      │
    │   completa posible  │                     │ • Time-to-market       │
    └──────────┬──────────┘                     └──────────┬─────────────┘
               │                                           │
        ┌──────▼─────────┬─────────────┐          ┌───────▼────────┬──────────────┐
        │                │             │          │                │              │
┌───────▼─────┐ ┌────────▼──────┐ ┌───▼─────┐ ┌─▼──────────┐ ┌───▼────────┐ ┌──▼─────────┐
│A1a: Equipo  │ │A1b: Equipo    │ │A2:      │ │B1a: Cliente│ │B1b: Cliente│ │B2:         │
│Grande       │ │Pequeño        │ │Volátiles│ │Disponible  │ │No          │ │Escalando   │
│Distribuido  │ │Co-localizado  │ │(RIESGO) │ │            │ │Disponible  │ │            │
│             │ │               │ │         │ │            │ │            │ │            │
│>20 personas │ │<10 personas   │ │⚠️ Crítico│ │Interviene  │ │Solo inicio │ │Crecimiento │
│             │ │               │ │+ Cambio │ │activamente │ │y final     │ │producto    │
└─────────────┘ └───────────────┘ └─────────┘ └────────────┘ └────────────┘ └────────────┘
       │                │              │             │              │              │
       │                │              │             │              │              │
   [→ PROCESO RECOMENDADO basado en Cap. 2]
       │                │              │             │              │              │
       ▼                ▼              ▼             ▼              ▼              ▼
       
[NODO-FINAL-01] [NODO-FINAL-02] [NODO-FINAL-03] [NODO-FINAL-06] [NODO-FINAL-13] [NODO-FINAL-07]

│
├─────────────────────────────────────────────────────────────────────────┐
│                                                                         │
┌──────────────────▼────────────┐  ┌─────────────────▼──────────────────┐
│ C: SISTEMA TRANSACCIONAL      │  │ D: APLICACIÓN PERSONAL / MÓVIL     │
│                               │  │                                    │
│ Características:              │  │ Características:                   │
│ • Base de datos central       │  │ • Un usuario                       │
│ • Muchos usuarios concurrentes│  │ • Funcionalidad específica         │
│ • Integridad de datos crítica │  │ • Interfaz simple                  │
│                               │  │                                    │
│ Ejemplos:                     │  │ Ejemplos:                          │
│ • Sistema bancario            │  │ • App de notas                     │
│ • Sistema de reservaciones    │  │ • Calculadora científica           │
│ • E-commerce grande           │  │ • Editor de fotos personal         │
│                               │  │ • App de fitness tracker           │
│ Cuándo elegir:                │  │                                    │
│ • Transacciones ACID          │  │ Cuándo elegir:                     │
│ • Concurrencia                │  │ • Uso individual                   │
│ • Datos críticos de negocio   │  │ • Sin backend complejo             │
└───────────┬───────────────────┘  └────────────┬───────────────────────┘
            │                                   │
     ┌──────▼──────┬───────────┐         ┌─────▼──────┬──────────┐
     │             │           │         │            │          │
┌────▼──────┐ ┌────▼─────┐ ┌──▼────┐ ┌──▼──────┐ ┌───▼────┐ ┌──▼─────┐
│C1: Grande │ │C2:Mediano│ │C3:    │ │D1: Muy  │ │D2: Con │ │D3:     │
│Corporativo│ │Creciendo │ │Startup│ │Pequeño  │ │Backend │ │Juego   │
│           │ │          │ │       │ │         │ │        │ │        │
│Estable    │ │Volátil   │ │Nuevo  │ │1-2 dev  │ │API/DB  │ │Gráficos│
└───────────┘ └──────────┘ └───────┘ └─────────┘ └────────┘ └────────┘
     │             │           │           │           │          │
     ▼             ▼           ▼           ▼           ▼          ▼
     
[NODO-FINAL-04] [NODO-FINAL-05] [NODO-FINAL-06] [NODO-FINAL-08] [...]  [NODO-FINAL-09]


│
├──────────────────────────────────────────────────────────────────┐
│                                                                  │
┌─────────────▼──────────────┐  ┌──────────────▼─────────────────┐
│ E: ENTRETENIMIENTO         │  │ F: PROCESAMIENTO POR LOTES     │
│                            │  │                                │
│ Características:           │  │ Características:               │
│ • Gráficos intensivos      │  │ • Grandes volúmenes            │
│ • Interacción tiempo real  │  │ • Sin interacción usuario      │
│ • Creatividad > estructura │  │ • Eficiencia crítica           │
│                            │  │                                │
│ Ejemplos:                  │  │ Ejemplos:                      │
│ • Videojuegos              │  │ • Nómina mensual               │
│ • Simuladores VR           │  │ • Facturación masiva           │
│ • Apps creativas           │  │ • Reportes ejecutivos          │
│                            │  │ • Procesamiento de cheques     │
│ Cuándo elegir:             │  │                                │
│ • Experiencia usuario      │  │ Cuándo elegir:                 │
│ • Rendimiento visual       │  │ • Periodicidad (diario/mensual)│
│ • Exploración creativa     │  │ • Sin tiempo real              │
└────────────┬───────────────┘  └────────────┬───────────────────┘
             │                               │
      ┌──────▼──────┐                 ┌──────▼──────┐
      │ E1: Juego   │                 │ F1: Simple  │
      │ Complejo    │                 │ Establecido │
      └─────────────┘                 └─────────────┘
             │                               │
             ▼                               ▼
             
   [NODO-FINAL-09]                  [NODO-FINAL-10]


│
├─────────────────────────────────────────────────────────────────┐
│                                                                 │
┌──────────────▼──────────────┐  ┌────────────▼──────────────────┐
│ G: RECOLECCIÓN DE DATOS     │  │ H: SISTEMA DE SISTEMAS        │
│                             │  │                               │
│ Características:            │  │ Características:              │
│ • Sensores ambientales      │  │ • Múltiples sistemas          │
│ • Confiabilidad 24/7        │  │ • Integración compleja        │
│ • Condiciones adversas      │  │ • Interfaces críticas         │
│                             │  │                               │
│ Ejemplos:                   │  │ Ejemplos:                     │
│ • Estación meteorológica    │  │ • Control tráfico aéreo       │
│ • Sensores IoT industriales │  │ • Sistema de defensa          │
│ • Monitoreo ambiental       │  │ • Smart city                  │
│                             │  │                               │
│ Cuándo elegir:              │  │ Cuándo elegir:                │
│ • Datos de sensores         │  │ • Integración de muchos       │
│ • Entorno hostil            │  │   sistemas independientes     │
│ • Autonomía                 │  │ • Gestión de complejidad      │
└─────────────┬───────────────┘  └─────────────┬─────────────────┘
              │                                │
       ┌──────▼──────┐                  ┌──────▼──────┐
       │ G1: IoT     │                  │ H1: Grande  │
       │ Distribuido │                  │ Equipos     │
       └─────────────┘                  │ Múltiples   │
              │                         └─────────────┘
              ▼                                │
                                              ▼
   [NODO-FINAL-11]                    [NODO-FINAL-12]
```

---

## 4️⃣ NODOS FINALES DETALLADOS

### [NODO-FINAL-01] Sistema Crítico → Estables → Equipo Grande

```
🎯 RUTA COMPLETA:
[Crítico Seguridad] → [Requerimientos Estables] → [Equipo Grande >20] 
→ [Cascada + RUP] → [Tradicional Exhaustivo] → [UML Completo] → [Arquitectura en Capas]

✅ RECOMENDACIÓN FINAL:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 PROCESO: Modelo Cascada + RUP (Rational Unified Process)
   Referencia: Capítulo 2, Sección "Modelo Cascada" y "Proceso Unificado"
   
   Por qué:
   • Requerimientos estables permiten especificación completa
   • Criticidad requiere documentación exhaustiva y trazabilidad
   • Equipo grande necesita proceso disciplinado
   • Regulaciones (FDA, aviación) exigen cumplimiento formal

📐 METODOLOGÍA: Tradicional con Especificación Exhaustiva
   
   Fases obligatorias (Cascada):
   1. Análisis y Definición de Requerimientos → Documento de Especificación
   2. Diseño del Sistema y Software → Arquitectura + Diseño Detallado
   3. Implementación y Prueba de Unidad → Código + Verificación
   4. Integración y Prueba de Sistema → Sistema Completo Probado
   5. Operación y Mantenimiento → Instalación + Soporte
   
   Disciplinas RUP aplicables:
   • Modelado de negocio: Entender contexto organizacional
   • Requisitos: Casos de uso detallados
   • Análisis y diseño: Arquitectura formal
   • Implementación: Código con estándares estrictos
   • Pruebas: Validación exhaustiva
   • Gestión de configuración: Control de versiones estricto

🔧 PRÁCTICAS TÉCNICAS CLAVE (Del Capítulo 2 y 4):
   1. Especificación Formal de Requerimientos
      • Documento de requerimientos IEEE 830
      • Revisión formal con todos los stakeholders
      • Validación contra estándares regulatorios
      
   2. Revisiones de Diseño Formales
      • Revisión de arquitectura
      • Revisión de diseño detallado
      • Walk-through de código crítico
      
   3. Verificación y Validación Exhaustivas
      • Pruebas de unidad: 100% cobertura de código crítico
      • Pruebas de integración: Todos los interfaces
      • Pruebas de sistema: Todos los requisitos
      • Pruebas de aceptación: Con regulador presente
      
   4. Gestión de Configuración Estricta
      • Control de versiones de todos los artefactos
      • Trazabilidad requisito → diseño → código → prueba
      • Auditorías de calidad regulares
      
   5. Análisis de Seguridad y Confiabilidad
      • FMEA (Failure Mode and Effects Analysis)
      • Análisis de árbol de fallas
      • Pruebas de estrés

📊 TÉCNICAS DE MODELADO (Capítulo 5):
   Nivel de rigor: COMPLETO Y FORMAL (para generación de código y documentación)
   
   Diagramas UML obligatorios:
   
   1. Casos de Uso (Cap. 5, "Diagramas de Casos de Uso")
      • Para: Documentar todos los requisitos funcionales
      • Detalle: Plantilla completa por cada caso de uso
      • Actores: Usuarios, sistemas externos, sensores
      
   2. Diagramas de Secuencia (Cap. 5, "Diagramas de Secuencia")
      • Para: Detallar TODAS las interacciones críticas
      • Incluir: Timeouts, condiciones de error, protocolos
      • Especialmente: Secuencias de seguridad y falla
      
   3. Diagramas de Clases (Cap. 5, "Diagramas de Clases")
      • Para: Arquitectura completa orientada a objetos
      • Incluir: Todos los atributos y operaciones
      • Multiplicidades exactas
      • Invariantes de clase documentadas
      
   4. Diagramas de Estado (Cap. 5, "Diagramas de Estado")
      • Para: Componentes reactivos (CRÍTICO en sistemas embebidos)
      • Máquinas de estado completas
      • Todas las transiciones documentadas
      • Estados de error y recuperación
      
   5. Diagramas de Actividad
      • Para: Flujos de control complejos
      • Paralelismo y sincronización
      • Puntos de decisión

🏗️ ARQUITECTURA: Arquitectura en Capas (Capítulo 6, "Patrón en Capas")
   
   Por qué Capas:
   • Seguridad multinivel (capas internas protegidas)
   • Separación de responsabilidades clara
   • Testing por capas
   • Portabilidad (cambiar hardware sin afectar lógica)
   
   Estructura típica (4-5 capas):
   
   ┌─────────────────────────────────────┐
   │ CAPA 5: Interfaz Usuario/HMI        │ ← Mínima en embebidos
   ├─────────────────────────────────────┤
   │ CAPA 4: Lógica de Control           │ ← Algoritmos críticos
   ├─────────────────────────────────────┤
   │ CAPA 3: Servicios de Sistema        │ ← Gestión de recursos
   ├─────────────────────────────────────┤
   │ CAPA 2: Abstracción de Hardware     │ ← HAL (Hardware Abstraction Layer)
   ├─────────────────────────────────────┤
   │ CAPA 1: Hardware/Firmware           │ ← Drivers, RTOS
   └─────────────────────────────────────┘
   
   Consideraciones adicionales:
   • Componentes redundantes para disponibilidad
   • Watchdog timers en capa de hardware
   • Monitoreo de salud del sistema
   • Mecanismos de fail-safe

📋 ACCIONES INMEDIATAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ANÁLISIS DE FACTIBILIDAD (Capítulo 2, Actividad 1)
   [ ] Estudio de viabilidad técnica
   [ ] Análisis de riesgos de seguridad
   [ ] Evaluación de cumplimiento regulatorio
   [ ] Estimación de costos y tiempo
   [ ] Decisión Go/No-Go formal
   
2. FORMACIÓN DEL EQUIPO Y ROLES
   [ ] Identificar ingenieros senior con experiencia en sistemas críticos
   [ ] Asignar roles RUP: Arquitecto, Analista, Diseñador, Implementador, Tester
   [ ] Establecer equipo de QA independiente
   [ ] Designar oficial de cumplimiento regulatorio
   
3. ESTABLECER PROCESO Y ESTÁNDARES (Capítulo 2)
   [ ] Definir ciclo de vida según Cascada
   [ ] Establecer gates de revisión entre fases
   [ ] Definir estándares de codificación (MISRA C para embebidos)
   [ ] Configurar herramientas de gestión de requisitos (DOORS, Jama)
   [ ] Establecer repositorio de configuración
   
4. INGENIERÍA DE REQUISITOS EXHAUSTIVA (Capítulo 4)
   [ ] Identificar TODOS los stakeholders (usuarios, reguladores, mantenedores)
   [ ] Realizar análisis de contexto (Capítulo 5, "Modelos de Contexto")
   [ ] Obtener requisitos funcionales (Capítulo 4)
   [ ] Obtener requisitos no funcionales CUANTIFICADOS
       Ejemplos:
       • Tiempo de respuesta < 100ms
       • Disponibilidad > 99.999%
       • MTBF > 10,000 horas
   [ ] Crear matriz de trazabilidad requisitos
   [ ] Validar requisitos con revisión formal
   
5. MODELADO DEL SISTEMA (Capítulo 5)
   [ ] Crear modelo de contexto del sistema
   [ ] Desarrollar casos de uso completos con plantillas formales
   [ ] Diseñar diagramas de secuencia para interacciones críticas
   [ ] Modelar diagramas de estado para componentes reactivos
   [ ] Documentar arquitectura en capas
   
6. DISEÑO ARQUITECTÓNICO (Capítulo 6)
   [ ] Definir arquitectura en capas
   [ ] Diseñar interfaces entre capas formalmente
   [ ] Planear redundancia y fail-safe
   [ ] Diseño para testabilidad
   [ ] Revisión de arquitectura formal
   
7. PLAN DE PRUEBAS (Capítulo 2, Modelo V)
   [ ] Plan de pruebas de unidad
   [ ] Plan de pruebas de integración
   [ ] Plan de pruebas de sistema
   [ ] Plan de pruebas de aceptación
   [ ] Definir criterios de aceptación cuantificables

⚠️ LO QUE DEBES EVITAR (Descartado):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Metodologías Ágiles (XP, Scrum)
   Por qué NO:
   • Requieren cliente disponible continuamente (no aplicable)
   • Documentación mínima insuficiente para cumplimiento regulatorio
   • Cambios frecuentes incompatibles con criticidad de seguridad
   • Difícil mantener trazabilidad requisito-código
   
❌ Desarrollo Incremental sin planificación completa
   Por qué NO:
   • Criticidad requiere análisis completo ANTES de implementar
   • No se pueden "descubrir" requisitos de seguridad iterando
   • Reguladores requieren especificación completa anticipadamente
   
❌ Prototipado Evolutivo (donde el prototipo se convierte en producto)
   Por qué NO:
   • Calidad de código de prototipo insuficiente para sistemas críticos
   • Estructura puede degradarse
   • Falta de documentación formal
   
❌ Arquitectura Monolítica sin Capas
   Por qué NO:
   • Difícil aislar fallas
   • Testing más complejo
   • No permite seguridad multinivel
   
❌ Modelado Informal o "Just Enough"
   Por qué NO:
   • Ambigüedades pueden causar fallas críticas
   • Reguladores requieren documentación completa
   • Testing exhaustivo requiere especificación completa

⚙️ ERRORES COMUNES EN ESTE TIPO DE PROYECTO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Subestimar tiempo de certificación
   → Solución: Incluir ciclos de revisión regulatoria en cronograma
   
2. Cambios de requisitos tarde en el ciclo
   → Solución: Congelar requisitos después de fase de análisis
   
3. Testing inadecuado de casos edge
   → Solución: Análisis exhaustivo de casos límite y falla
   
4. No diseñar para fail-safe desde el inicio
   → Solución: Considerar modos de falla en diseño arquitectónico
   
5. Documentación desactualizada
   → Solución: Actualizar documentos como parte del proceso, no después

📚 CAPÍTULOS RELEVANTES PARA PROFUNDIZAR:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Capítulo 2: Modelo Cascada, Modelo V, RUP
• Capítulo 4: Ingeniería de Requisitos, Validación de Requisitos
• Capítulo 5: Modelado UML Completo (todos los diagramas)
• Capítulo 6: Arquitectura en Capas, Requisitos No Funcionales

🔗 PLANTILLAS APLICABLES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Del Capítulo 2:
- Plantilla de Documento de Especificación de Requisitos
- Checklist de Validación de Requisitos
- Plantilla de Plan de Proyecto

Del Capítulo 4:
- Plantilla de Caso de Uso Detallado
- Matriz de Trazabilidad

Del Capítulo 5:
- Plantillas UML para todos los diagramas
- Guía de Documentación de Modelos

Del Capítulo 6:
- Plantilla de Documento de Arquitectura de Software
- Checklist de Revisión de Arquitectura
```

---

### [NODO-FINAL-06] Web/SaaS → Startup → Cliente Disponible → Equipo Pequeño

```
🎯 RUTA COMPLETA:
[Web/SaaS] → [Startup/Producto Nuevo] → [Cliente Disponible] → [Equipo Pequeño <10] 
→ [Desarrollo Incremental] → [Scrum o XP] → [Casos de Uso Ligeros] → [MVC]

✅ RECOMENDACIÓN FINAL:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 PROCESO: Desarrollo Incremental (Capítulo 2, "Desarrollo Incremental")
   
   Por qué:
   • Requisitos volátiles en producto nuevo
   • Necesidad de feedback rápido del mercado
   • Time-to-market crítico
   • Cliente (product owner o early adopters) disponible para retroalimentación
   
   Características:
   • Especificación, desarrollo y validación entrelazadas
   • Sistema desarrollado en incrementos cada 1-2 semanas
   • Cada incremento agrega funcionalidad utilizable
   • Retroalimentación continua

📐 METODOLOGÍA: Scrum o XP (Capítulo 3, "Desarrollo Ágil")
   
   OPCIÓN A: SCRUM (Recomendado si equipo es 5-10 personas)
   
   Razón: Gestión de producto, sprints estructurados
   
   Roles Scrum:
   • Product Owner: Define prioridades, acepta incrementos
   • Scrum Master: Facilita proceso, elimina impedimentos
   • Equipo de Desarrollo: Auto-organizado, cross-functional
   
   Ceremonias (Capítulo 3, sección Scrum):
   1. Sprint Planning (inicio de sprint): Qué construir
   2. Daily Standup (15 min diarios): Sincronización
   3. Sprint Review (fin de sprint): Demo a stakeholders
   4. Sprint Retrospective: Mejora continua del proceso
   
   Artefactos:
   • Product Backlog: Lista priorizada de features
   • Sprint Backlog: Trabajo comprometido para sprint actual
   • Incremento: Software funcionando al final de sprint
   
   Duración de Sprint: 2 semanas (recomendado para startups)
   
   ---
   
   OPCIÓN B: XP (Extreme Programming) (Recomendado si equipo es 2-5 personas técnicas)
   
   Razón: Énfasis en excelencia técnica, equipo pequeño co-localizado
   
   Las 12 Prácticas XP (Capítulo 3):
   
   ✅ Prácticas ESENCIALES para tu contexto:
   1. Historias de Usuario
      • Requisitos en tarjetas
      • Formato: "Como [rol], quiero [acción], para [beneficio]"
      • Estimación en puntos
      
   2. Liberaciones Pequeñas
      • Deploy cada 1-2 semanas mínimo
      • Conjunto mínimo útil primero (MVP)
      
   3. Diseño Simple
      • YAGNI (You Aren't Gonna Need It)
      • No sobre-ingeniería
      
   4. Desarrollo de Primera Prueba (TDD)
      • Escribir prueba ANTES del código
      • Red → Green → Refactor
      
   5. Refactorización
      • Mejorar código continuamente sin cambiar comportamiento
      • Evitar degradación de estructura
      
   6. Integración Continua
      • Integrar al completar tarea
      • Todas las pruebas pasan
      • Pipeline automatizado
   
   ✅ Prácticas RECOMENDADAS (si es posible):
   7. Programación en Pares
      • Dos programadores, una estación
      • Alternar roles: conductor/navegador
      • Especialmente útil para código complejo o aprender stack
      
   8. Propiedad Colectiva
      • Cualquiera puede cambiar cualquier código
      • Evita silos de conocimiento
      
   9. Estándares de Código
      • Linter configurado (ESLint para JS, Pylint para Python)
      • Formatter automático (Prettier, Black)
   
   ⚠️ Prácticas OPCIONALES (evaluar):
   10. Cliente en Sitio
       • Ideal: Product owner tiempo completo
       • Realista: Disponibilidad para daily standup + demo
       
   11. Ritmo Sustentable
       • Evitar crunch constante
       • 40 horas/semana es más productivo largo plazo
       
   12. Metáfora del Sistema
       • Historia compartida del sistema
       • En startups: Mission statement o visión del producto

🔧 PRÁCTICAS TÉCNICAS CLAVE:
   
   1. TDD (Test-Driven Development) - Capítulo 3
      Workflow:
      ```
      1. Escribir prueba que falle
      2. Escribir código mínimo para que pase
      3. Refactorizar
      4. Repetir
      ```
      
      Herramientas:
      • JavaScript: Jest, Mocha, Cypress
      • Python: pytest, unittest
      • Ruby: RSpec
      
   2. Integración Continua (CI)
      Pipeline típico:
      ```
      Git Push → GitHub Actions/GitLab CI
         ↓
      Run Tests
         ↓
      Build
         ↓
      Deploy to Staging
         ↓
      (Si es viernes) Deploy to Production
      ```
      
      Herramientas:
      • GitHub Actions (recomendado para startups)
      • GitLab CI
      • CircleCI
      
   3. Versionado Semántico
      • MAJOR.MINOR.PATCH
      • Git Flow o GitHub Flow
      
   4. Revisiones de Código (Pull Requests)
      • Aunque sea equipo pequeño
      • Al menos 1 aprobación antes de merge
      • Automatizar checks (tests, linting)

📊 TÉCNICAS DE MODELADO (Capítulo 5):
   Nivel de rigor: LIGERO Y PRAGMÁTICO (para discusión y documentación mínima)
   
   1. Casos de Uso Simplificados (Capítulo 5)
      • Solo para flows principales (5-10 casos críticos)
      • No necesitas plantilla formal completa
      • Enfócate en el escenario principal
      
      Ejemplo:
      ```
      Historia: Login de Usuario
      Actor: Usuario
      Flujo:
      1. Usuario ingresa email y password
      2. Sistema valida credenciales
      3. Sistema genera token JWT
      4. Usuario redirigido a dashboard
      
      Excepciones:
      - Credenciales inválidas: mostrar error
      ```
      
   2. Diagramas de Secuencia (solo para interacciones complejas)
      • Usa SOLO cuando el flujo no es obvio
      • Ejemplo: Proceso de checkout con múltiples pasos
      • Ejemplo: Integración con API de pago
      
   3. Diagrama de Clases del Core del Dominio (Capítulo 5)
      • Solo 5-8 entidades principales
      • Sin getters/setters
      • Relaciones principales
      
      Ejemplo para e-commerce:
      ```
      Usuario ──1──* Pedido ──1──* ItemPedido ──*──1 Producto
      ```
      
   4. Diagramas de Estado (solo si hay workflows complejos)
      • Ejemplo: Estados de un pedido
      ```
      Carrito → Procesando → Pagado → Enviado → Entregado
                     ↓
                  Cancelado
      ```
   
   ⚠️ NO necesitas:
   • Diagramas de componentes
   • Diagramas de despliegue (usa arquitectura como código)
   • Diagramas de actividad
   • Documentación exhaustiva de cada diagrama

🏗️ ARQUITECTURA: MVC (Modelo-Vista-Controlador) (Capítulo 6, "Patrón MVC")
   
   Por qué MVC:
   • Patrón estándar en frameworks web modernos
   • Separación clara: datos, presentación, lógica
   • Testing más fácil
   • Múltiples interfaces (web + móvil) con mismo backend
   
   Implementación según Stack:
   
   OPCIÓN A: JavaScript Full-Stack
   ```
   Frontend (Vista):
   • React/Vue/Svelte + Tailwind CSS
   • Estado global: Redux/Zustand/Pinia
   
   Backend (Controlador + Modelo):
   • Node.js + Express
   • Prisma ORM (Modelo)
   • PostgreSQL (Datos)
   
   Arquitectura:
   React (Vista) ←→ API REST (Controlador) ←→ Prisma (Modelo) ←→ PostgreSQL
   ```
   
   OPCIÓN B: Python
   ```
   Frontend: React
   Backend: FastAPI/Django
   ORM: SQLAlchemy/Django ORM
   DB: PostgreSQL
   ```
   
   OPCIÓN C: Ruby
   ```
   Framework: Ruby on Rails (MVC nativo)
   Frontend: Hotwire/React
   DB: PostgreSQL
   ```
   
   Consideraciones adicionales:
   • CDN para assets estáticos (Cloudflare, Vercel)
   • Caché: Redis para sesiones y datos frecuentes
   • File storage: AWS S3 o Cloudinary para uploads
   
   Arquitectura de Deploy (simple):
   ```
   [Frontend estático] ← Vercel/Netlify
   [Backend API] ← Heroku/Railway/Render
   [Base de Datos] ← PostgreSQL en Render/Heroku
   ```

📋 ACCIONES INMEDIATAS (Primera Semana):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DÍA 1: Setup y Visión
[ ] Definir MVP (Producto Mínimo Viable)
    • ¿Cuál es el ÚNICO problema que resuelves?
    • ¿Qué features son absolutamente esenciales?
[ ] Identificar early adopters o usuarios beta
[ ] Setup de repositorio Git
[ ] Configurar CI/CD básico

DÍA 2: Arquitectura y Stack
[ ] Decidir stack tecnológico (basado en experiencia del equipo)
[ ] Bosquejar arquitectura MVC
[ ] Setup de proyecto:
    • Frontend boilerplate
    • Backend boilerplate
    • Conexión a DB
[ ] Configurar linter y formatter

DÍA 3: Product Backlog Inicial
[ ] Listar historias de usuario (15-20 para MVP)
[ ] Priorizar: MoSCoW (Must have, Should have, Could have, Won't have)
[ ] Estimar en Story Points (Fibonacci: 1, 2, 3, 5, 8, 13)
[ ] Identificar riesgos técnicos

DÍA 4: Sprint 0 - Setup Técnico
[ ] Configurar pipeline CI/CD
[ ] Setup de testing framework
[ ] Crear primer test (aunque sea trivial)
[ ] Deploy "Hello World" a staging
[ ] Configurar monitoring básico (Sentry para errors)

DÍA 5: Sprint Planning del Sprint 1
[ ] Seleccionar historias para Sprint 1 (1-2 semanas)
[ ] Desglosar en tareas técnicas
[ ] Definir Definition of Done
[ ] Comenzar desarrollo

SEMANA 2-3: Desarrollo del MVP
[ ] Daily standup cada día (15 min máximo)
[ ] TDD para features principales
[ ] Integración continua
[ ] Demo interna al final de cada sprint
[ ] Retrospectiva: ¿Qué mejorar?

SEMANA 4: Primera Liberación
[ ] Sprint review con early adopters
[ ] Recolectar feedback
[ ] Priorizar siguiente sprint basado en feedback
[ ] Celebrar primera liberación 🎉

⚠️ LO QUE DEBES EVITAR (Descartado):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Modelo Cascada
   Por qué NO:
   • Requisitos cambian constantemente en startups
   • Cliente ve producto funcionando solo al final
   • Demasiado lento para mercado
   • Documentación exhaustiva innecesaria en esta etapa
   
❌ Sobre-ingeniería de Arquitectura
   Por qué NO:
   • No necesitas microservicios en el día 1
   • YAGNI: You Aren't Gonna Need It
   • Monolito bien estructurado (MVC) es suficiente para MVP
   • Optimización prematura es raíz de todo mal
   
❌ Documentación Exhaustiva
   Por qué NO:
   • Código debe ser auto-documentado
   • Tiempo mejor invertido en construir producto
   • README.md y comentarios en código crítico es suficiente
   
❌ Todos los Diagramas UML
   Por qué NO:
   • Modelado ágil: "Just Enough"
   • Diagramas que nadie mantiene se vuelven obsoletos
   • Pizarrón + fotos > herramienta UML formal
   
❌ Testing Manual Extensivo
   Por qué NO:
   • Automatiza desde el día 1
   • Tests automatizados = regresión gratis
   • Libera tiempo para desarrollo
   
❌ Perfeccionismo en Primer Incremento
   Por qué NO:
   • "Done is better than perfect"
   • MVP puede ser feo (código limpio ≠ UI perfecta)
   • Itera basado en feedback real

⚙️ ERRORES COMUNES EN STARTUPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. Construir features que nadie pidió
   → Solución: Validar con usuarios ANTES de construir
   
2. No hacer deploy temprano
   → Solución: Deploy en semana 1, aunque sea "Hello World"
   
3. Código sin tests porque "es más rápido"
   → Solución: TDD no es más lento a largo plazo, evita bugs costosos
   
4. No recolectar feedback cuantitativo
   → Solución: Analytics desde día 1 (Google Analytics, Mixpanel)
   
5. Escalar prematuramente
   → Solución: Arquitectura simple, escalar cuando sea NECESARIO (no anticipado)
   
6. No definir "Done"
   → Solución: Definition of Done en Sprint Planning

📚 CAPÍTULOS RELEVANTES PARA PROFUNDIZAR:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Capítulo 2: Desarrollo Incremental, Entrega Incremental
• Capítulo 3: TODO (Scrum, XP, Historias de Usuario, TDD)
• Capítulo 5: Casos de Uso (simplificados), Diagramas esenciales
• Capítulo 6: MVC, Arquitectura Web

🔗 RECURSOS ADICIONALES RECOMENDADOS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Stack Específico:
• React: create-react-app o Vite
• Node.js: Express.js starter
• Python: FastAPI tutorial oficial
• Database: PostgreSQL (gratis en Render.com)

Deployment:
• Frontend: Vercel (gratis, CI/CD incluido)
• Backend: Railway.app o Render.com
• Full-stack: Heroku (más caro pero simple)

Testing:
• Frontend: Jest + React Testing Library
• Backend: pytest (Python) o Jest (Node.js)
• E2E: Playwright o Cypress

📊 MÉTRICAS DE ÉXITO PARA ESTE CAMINO:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Técnicas:
• Deploy frequency: 1-2 veces por semana
• Test coverage: >70% en código crítico
• Build time: <5 minutos
• Bug escape rate: <5% de features tienen bugs en producción

Producto:
• Time to first value: <2 semanas (usuario puede usar algo útil)
• User feedback cycle: <1 semana (de idea a validación)
• Feature completion: 80% de sprint backlog completado

Equipo:
• Team velocity: Estable después de 3 sprints
• Sprint retrospective: 100% de acciones de mejora implementadas
• Code review time: <24 horas
```

---

### [NODO-FINAL-04] Sistema Transaccional Grande → Corporativo

```
🎯 RUTA COMPLETA:
[Transaccional] → [Grande Corporativo] → [Requerimientos Estables] → [Equipo Grande] 
→ [Incremental + RUP] → [Híbrido] → [UML Detallado] → [Capas + Cliente-Servidor]

✅ RECOMENDACIÓN FINAL:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 PROCESO: Desarrollo Incremental + RUP
   Referencia: Capítulo 2, "Desarrollo Incremental" y "RUP"
   
   Por qué HÍBRIDO:
   • Requisitos relativamente estables (core del negocio)
   • Pero necesidad de entregas incrementales (valor temprano)
   • Equipo grande necesita disciplina RUP
   • Stakeholders necesitan ver progreso (incremental)
   
   Estrategia:
   FASE 1 (Inicio): Especificación Arquitectura Global (RUP)
   • 2-4 semanas
   • Definir arquitectura común a todos los incrementos
   • Identificar componentes compartidos
   • Establecer estándares
   
   FASE 2-N (Elaboración e Iteraciones): Entregas Incrementales
   • Incrementos de 4-6 semanas
   • Cada incremento = módulo funcional completo
   • Integración continua al trunk principal
   
   Disciplinas RUP activas:
   • Requisitos: Casos de uso detallados por módulo
   • Análisis y Diseño: Arquitectura y diseño por incremento
   • Implementación: Desarrollo paralelo en equipos
   • Pruebas: Testing de integración continuo
   • Gestión de proyecto: Planificación por incrementos
   • Gestión de configuración: Versionado estricto

📐 METODOLOGÍA: Híbrida (Tradicional + Ágil)
   
   Elementos Tradicionales:
   1. Especificación inicial completa de arquitectura
   2. Documento de requisitos de negocio
   3. Diseño arquitectónico exhaustivo
   4. Contratos y acuerdos formales
   
   Elementos Ágiles:
   1. Entregas incrementales cada 4-6 semanas
   2. Demos con stakeholders
   3. Retrospectivas de equipo
   4. Integración continua
   5. Refactorización controlada

🔧 PRÁCTICAS TÉCNICAS CLAVE:
   
   1. Arquitectura Inicial (Capítulo 6)
      • Definir capas del sistema
      • Establecer componentes compartidos
      • Decisiones tecnológicas (stack, DB, frameworks)
      • Documento de Arquitectura de Software (SAD)
      
   2. Planificación de Incrementos (Capítulo 2)
      • Identificar incrementos lógicos (por módulo de negocio)
      Ejemplo para ERP:
      Incremento 1: Módulo de Inventario
      Incremento 2: Módulo de Ventas
      Incremento 3: Módulo de Compras
      Incremento 4: Módulo de Finanzas
      Incremento 5: Integración y Reportes
      
   3. Integración Continua en Trunk-Based Development
      • Feature branches de corta duración (<3 días)
      • Merge diario al trunk principal
      • Suite de tests de integración automatizada
      • Build nocturno que integra todos los módulos
      
   4. Gestión de Base de Datos
      • Migrations versionadas (Flyway, Liquibase)
      • Rollback plan para cada incremento
      • Respaldos antes de deploy de incremento
      
   5. Testing Multi-Nivel
      • Unit tests: Por desarrollador (>80% cobertura)
      • Integration tests: Entre módulos
      • System tests: Sistema completo end-to-end
      • Performance tests: Carga y concurrencia
      • UAT (User Acceptance Testing): Con usuarios de negocio

📊 TÉCNICAS DE MODELADO:
   Nivel de rigor: COMPLETO PERO PRAGMÁTICO
   
   1. Casos de Uso Detallados (Capítulo 5)
      • Para TODOS los procesos de negocio principales
      • Plantilla completa por caso de uso
      • Actores identificados (roles de negocio)
      
      Ejemplo para Sistema Bancario:
      - Apertura de Cuenta
      - Depósito
      - Retiro
      - Transferencia
      - Consulta de Saldo
      - Generación de Estado de Cuenta
      
   2. Diagramas de Secuencia (Capítulo 5)
      • Para interacciones críticas entre capas
      • Especialmente: Flujos transaccionales (ACID)
      • Manejo de errores y rollback
      
   3. Diagrama de Clases Completo (Capítulo 5)
      • Modelo de dominio completo
      • Todas las entidades de negocio
      • Relaciones y multiplicidades
      
      Ejemplo para ERP:
      Cliente ──1──* Pedido ──1──* ItemPedido ──*──1 Producto
         │
         └──1──* Factura ──1──* Pago
      
   4. Diagramas de Actividad
      • Para procesos de negocio complejos
      • Workflows de aprobación
      • Procesos paralelos y sincronización

🏗️ ARQUITECTURA: Capas + Cliente-Servidor (Capítulo 6)
   
   Por qué esta combinación:
   • Capas: Separación de responsabilidades, seguridad
   • Cliente-Servidor: Múltiples usuarios concurrentes, datos centralizados
   
   Arquitectura de 4 Capas:
   
   ┌──────────────────────────────────────────┐
   │ CAPA 4: Presentación (Cliente)           │
   │ • Web App (React/Angular)                │
   │ • Desktop App (Electron opcional)        │
   │ • Mobile App (React Native opcional)    │
   ├──────────────────────────────────────────┤
   │ CAPA 3: Lógica de Negocio (Servidor App)│
   │ • Reglas de negocio                      │
   │ • Validaciones                           │
   │ • Workflows                              │
   │ • API REST/GraphQL                       │
   ├──────────────────────────────────────────┤
   │ CAPA 2: Acceso a Datos (Servidor App)   │
   │ • ORM (Hibernate, Entity Framework)      │
   │ • Repositorios                           │
   │ • Transacciones ACID                     │
   ├──────────────────────────────────────────┤
   │ CAPA 1: Datos (Servidor BD)             │
   │ • PostgreSQL / Oracle / SQL Server       │
   │ • Stored Procedures (minimizar)          │
   │ • Triggers para integridad               │
   └──────────────────────────────────────────┘
   
   Componentes Transversales:
   • Autenticación: OAuth2 + JWT
   • Autorización: RBAC (Role-Based Access Control)
   • Logging: Centralizado (ELK stack o similar)
   • Caché: Redis para sesiones y consultas frecuentes
   • Message Queue: RabbitMQ para procesos asíncronos
   
   Consideraciones de Escalabilidad:
   • Load Balancer: Nginx o AWS ALB
   • Replicación de BD: Master-Slave para reads
   • Backup: Daily full + incremental
   • DR (Disaster Recovery): Plan de recuperación

📋 ACCIONES INMEDIATAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

SEMANA 1-2: Inicio y Planificación
[ ] Kickoff con stakeholders principales
[ ] Identificar todos los módulos del sistema
[ ] Priorizar módulos (valor de negocio)
[ ] Definir plan de incrementos (roadmap)
[ ] Establecer equipo y roles
[ ] Setup de infraestructura (servidores, repos, CI/CD)

SEMANA 3-4: Arquitectura Base
[ ] Diseñar arquitectura en capas
[ ] Definir stack tecnológico
[ ] Crear "esqueleto" del sistema (todas las capas vacías)
[ ] Establecer estándares de codificación
[ ] Setup de DB y esquema inicial
[ ] Documento de Arquitectura de Software

SEMANA 5-6: Modelado de Primer Incremento
[ ] Casos de uso del módulo 1
[ ] Diagrama de clases del dominio del módulo 1
[ ] Diagramas de secuencia para transacciones críticas
[ ] Diseño de BD para módulo 1

SEMANA 7-12: Desarrollo Incremento 1
[ ] Sprint planning (si usas sprints de 2 semanas)
[ ] TDD para lógica de negocio
[ ] Integración continua
[ ] Code reviews
[ ] Testing de integración
[ ] Performance testing
[ ] Demo con stakeholders
[ ] UAT con usuarios de negocio

SEMANA 13: Retrospectiva y Ajustes
[ ] Retrospectiva del incremento 1
[ ] Ajustar proceso si es necesario
[ ] Refactorizar arquitectura si surgieron problemas
[ ] Planear incremento 2

⚠️ LO QUE DEBES EVITAR:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

❌ Cascada Puro
   Por qué NO:
   • Cliente no ve sistema funcionando hasta el final
   • Riesgo alto de construir algo que no necesitan
   
❌ Scrum Puro
   Por qué NO:
   • Equipo grande (>20) difícil de coordinar en un solo Scrum team
   • Falta de arquitectura inicial causa problemas de integración
   
❌ Big Bang Integration
   Por qué NO:
   • Integrar todos los módulos al final es receta de desastre
   • Solución: Integración continua
   
❌ Sin Arquitectura Compartida
   Por qué NO:
   • Cada equipo construye diferente → pesadilla de mantenimiento
   
❌ Monolito sin Capas
   Por qué NO:
   • Difícil de mantener
   • Difícil de escalar
   • Testing más complejo

📚 CAPÍTULOS RELEVANTES:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

• Capítulo 2: Incremental, RUP, Entrega Incremental
• Capítulo 4: Ingeniería de Requisitos para sistemas grandes
• Capítulo 5: Casos de Uso, Diagramas de Secuencia, Clases
• Capítulo 6: Arquitectura en Capas, Cliente-Servidor

🔗 PLANTILLAS Y HERRAMIENTAS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Gestión de Proyecto:
• Jira para tracking de incrementos
• Confluence para documentación
• Miro para modelado colaborativo

Arquitectura:
• C4 Model para documentar arquitectura
• PlantUML para diagramas como código

CI/CD:
• Jenkins o GitLab CI
• SonarQube para calidad de código
• Nexus o Artifactory para artefactos
```

---

## 5️⃣ GUÍA DE USO DEL SISTEMA

### Paso 1: Identifica tu Tipo de Sistema
Responde: **¿Qué tipo de sistema de software vas a desarrollar?**

Usa la descripción y ejemplos de cada tipo:
- ¿Vidas humanas dependen? → **Crítico**
- ¿Acceso web/móvil multi-usuario? → **Web/SaaS**
- ¿Transacciones bancarias/financieras? → **Transaccional**
- ¿Un solo usuario, funcionalidad simple? → **Personal/Móvil**
- ¿Juego o experiencia creativa? → **Entretenimiento**
- ¿Procesamiento periódico de datos? → **Procesamiento por Lotes**
- ¿Sensores o recolección de datos ambientales? → **Recolección de Datos**
- ¿Integración de múltiples sistemas existentes? → **Sistema de Sistemas**

### Paso 2: Características de tu Proyecto
Para el tipo de sistema elegido, responde:

**Volatilidad de Requisitos:**
- ¿Los requisitos están bien definidos y cambiarán poco? → Estables
- ¿Es startup o mercado cambiante? → Volátiles
- ¿Algo intermedio? → Moderadamente estables

**Criticidad:**
- ¿Fallas pueden causar muerte/daño económico grave? → Alta
- ¿Es software de negocio importante? → Media
- ¿Es herramienta interna o personal? → Baja

**Tamaño de Equipo:**
- 1-5 personas → Muy pequeño
- 5-10 personas → Pequeño
- 10-20 personas → Mediano
- 20+ personas → Grande

**Disponibilidad del Cliente:**
- ¿Cliente puede intervenir diariamente? → Disponible
- ¿Solo al inicio y validación final? → Limitado
- ¿Múltiples stakeholders difíciles de coordinar? → No disponible

### Paso 3: Busca tu Camino
Usa la **Tabla de Decisión Rápida** (Sección 2) para encontrar el camino que coincida con tus respuestas.

### Paso 4: Consulta el Nodo Final
Ve al nodo final correspondiente para obtener:
- ✅ Proceso de software recomendado
- ✅ Metodología específica (ágil vs tradicional)
- ✅ Prácticas técnicas a aplicar
- ✅ Técnicas de modelado UML necesarias
- ✅ Patrón arquitectónico recomendado
- ✅ Acciones inmediatas (paso a paso)
- ⚠️ Qué evitar (métodos descartados con justificación)

### Paso 5: Implementa
Sigue las **ACCIONES INMEDIATAS** del nodo final. Están ordenadas cronológicamente para que puedas empezar mañana mismo.

---

## 6️⃣ CASOS ESPECIALES Y CONFLICTOS

### CASO ESPECIAL 1: Crítico + Requisitos Volátiles

**Problema:** Combinación contradictoria
- Criticidad requiere especificación completa
- Volatilidad requiere flexibilidad

**Solución:** Modelo Espiral (Capítulo 2)
- Énfasis en gestión de riesgos
- Iteraciones con análisis exhaustivo en cada ciclo
- Prototipos para reducir incertidumbre
- Especificación incremental pero rigurosa

**Ejemplo:** Sistema médico innovador donde la tecnología y requisitos regulatorios están evolucionando.

### CASO ESPECIAL 2: Equipo Grande + Metodología Ágil

**Problema:** Scrum diseñado para equipos pequeños
- Un equipo Scrum ideal = 5-9 personas
- Proyectos grandes = 50+ desarrolladores

**Solución:** Scaled Agile Framework (SAFe) o LeSS
- Múltiples equipos Scrum coordinados
- Arquitectura compartida definida inicialmente
- Scrums de scrums para coordinación
- Integración continua crítica

**Ejemplo:** Sistema ERP grande desarrollado con metodologías ágiles

### CASO ESPECIAL 3: Sistema Nuevo en Tecnología Emergente

**Problema:** Incertidumbre técnica alta
- No hay experiencia previa con la tecnología
- Requisitos técnicos desconocidos

**Solución:** Spike técnico + Prototipado
- Invertir 2-4 semanas en spike técnico
- Prototipos desechables para validar factibilidad
- Luego aplicar proceso normal según tipo de sistema

**Ejemplo:** Primer proyecto con blockchain o IA generativa

---

## 7️⃣ RESUMEN EJECUTIVO

### Principios Universales (Aplican a TODOS los caminos)

**Del Capítulo 1:**
1. Las 4 actividades son OBLIGATORIAS: Especificación, Desarrollo, Validación, Evolución
2. Atributos esenciales: Mantenibilidad, Confiabilidad, Eficiencia, Aceptabilidad

**Del Capítulo 2:**
3. No existe proceso perfecto, existe proceso ADECUADO para tu contexto
4. El cambio es inevitable, diseña para gestionarlo

**Del Capítulo 3:**
5. Ágil ≠ Sin disciplina. Es disciplina diferente

**Del Capítulo 5:**
6. Modelos son abstracciones, no copias exactas

**Del Capítulo 6:**
7. Arquitectura determina requisitos no funcionales

### Mapa Mental de Decisión

```
┌─────────────────────────────────────────┐
│ ¿VIDAS HUMANAS DEPENDEN DEL SISTEMA?   │
└─────────────┬───────────────────────────┘
              │
         SÍ ──┴── NO
         │        │
    [CASCADA]    │
    [UML         │
     COMPLETO]   ├── ¿MÚLTIPLES USUARIOS CONCURRENTES?
                 │
                 SÍ ──┴── NO
                 │        │
            [INCREMENTAL] │
            [CAPAS]       │
                          ├── ¿EQUIPO PEQUEÑO (<10)?
                          │
                      SÍ ──┴── NO
                      │        │
                  [SCRUM/XP]  [RUP]
                  [MVC]       [COMPONENTES]
```

### Tabla de Referencia Rápida: Proceso vs Tipo de Sistema

| Si tu sistema es... | Y tus requisitos son... | Entonces usa... |
|---------------------|-------------------------|-----------------|
| Crítico | Estables | Cascada |
| Crítico | Volátiles | Espiral |
| Web/SaaS | Volátiles | Incremental + Scrum/XP |
| Transaccional | Estables | Incremental + RUP |
| Personal | Cualquiera | Incremental rápido |
| Entretenimiento | Creativos | Incremental + Prototipos |

---

## 8️⃣ VALIDACIÓN DEL CAMINO ELEGIDO

Usa este checklist para validar que elegiste el camino correcto:

### Señales de que ELEGISTE BIEN:

✅ El proceso recomendado se alinea con la cultura de tu organización
✅ El equipo tiene (o puede adquirir) las habilidades necesarias
✅ Los stakeholders están de acuerdo con el nivel de documentación
✅ El tiempo estimado es realista para tus restricciones
✅ La metodología encaja con la disponibilidad del cliente
✅ La arquitectura soporta los requisitos no funcionales

### Señales de ALERTA (reconsidera):

⚠️ El proceso requiere cliente disponible, pero no lo tienes
⚠️ El equipo rechaza la metodología (resistencia cultural)
⚠️ La documentación requerida excede capacidad del equipo
⚠️ La criticidad y el proceso no están alineados
⚠️ Los stakeholders esperan entregas que el proceso no permite

---

## 9️⃣ CONTACTO Y FEEDBACK

Este es un documento vivo basado en los Capítulos 1-6 de Sommerville.

Si encuentras:
- Caminos faltantes que deberían estar incluidos
- Contradicciones con el libro original
- Casos especiales no cubiertos
- Errores en las recomendaciones

Por favor documenta y comparte para mejorar este sistema de navegación.

---

## 🔟 REFERENCIAS BIBLIOGRÁFICAS

**Fuente principal:**
- Sommerville, Ian. "Ingeniería de Software", Capítulos 1-6
  - Capítulo 1: Introducción a la Ingeniería de Software
  - Capítulo 2: Procesos de Software
  - Capítulo 3: Desarrollo Ágil de Software
  - Capítulo 4: Ingeniería de Requisitos
  - Capítulo 5: Modelado del Sistema
  - Capítulo 6: Diseño Arquitectónico

**Metodologías referenciadas:**
- Scrum Guide (Schwaber & Sutherland)
- Extreme Programming (Kent Beck)
- Rational Unified Process (Kruchten)
- Manifesto Ágil

---

## 📌 ÚLTIMA ACTUALIZACIÓN
Fecha: Febrero 2026
Versión: 1.0
Basado en: Extracción completa de PDF de Sommerville Capítulos 1-6

---

**FIN DEL DOCUMENTO PRINCIPAL**

*Para nodos finales adicionales (NODO-FINAL-02 hasta NODO-FINAL-12), consulta el documento extendido o aplica la misma estructura detallada de NODO-FINAL-01 y NODO-FINAL-06 adaptando según el camino específico.*
