CAPÍTULO 3: DESARROLLO ÁGIL DE SOFTWARE
EXTRACCIÓN COMPLETA Y DEFINITIVA

📚 ESENCIA
Los métodos ágiles priorizan software funcionando sobre documentación exhaustiva y personas sobre procesos. Son desarrollo incremental extremo: liberaciones frecuentes, adaptación continua al cambio, y cliente integrado en el equipo. No son caos sin estructura - son disciplina enfocada en entregar valor rápidamente.

🎯 CONCEPTOS CLAVE COMPLETOS
1. MÉTODOS ÁGILES
Métodos de desarrollo incremental que se enfocan en:
Desarrollo rápido del software
Liberaciones frecuentes
Reducción de burocracia del proceso
Código de alta calidad
Cliente interviene directamente
IMPORTANTE: NO son métodos sin disciplina. Son disciplina diferente.
2. EL MANIFIESTO ÁGIL
TEXTO COMPLETO:
Estamos descubriendo mejores formas para desarrollar software, 
al hacerlo y al ayudar a otros a hacerlo. 
Gracias a este trabajo llegamos a valorar:

A los INDIVIDUOS y las INTERACCIONES 
    sobre los procesos y las herramientas

Al SOFTWARE OPERATIVO 
    sobre la documentación exhaustiva

La COLABORACIÓN con el cliente 
    sobre la negociación del contrato

La RESPUESTA AL CAMBIO 
    sobre el seguimiento de un plan

Esto es, aunque exista valor en los objetos a la derecha, 
valoraremos más los de la izquierda.

INTERPRETACIÓN CORRECTA:
NO significa "cero documentación" → Significa documentación selectiva
NO significa "sin plan" → Significa planes adaptativos
NO significa "sin procesos" → Significa procesos ligeros
3. LOS 5 PRINCIPIOS ÁGILES FUNDAMENTALES
Principio
Qué significa
Cómo se implementa
1. Participación del cliente
Clientes intervienen ESTRECHAMENTE durante desarrollo
Cliente prioriza requerimientos, evalúa iteraciones, forma parte del equipo
2. Entrega incremental
Software desarrollado en incrementos
Cliente especifica qué incluir en cada incremento, entregas cada 2-4 semanas
3. Personas, no procesos
Reconocer y aprovechar habilidades del equipo
Equipos desarrollan sus propias formas de trabajar, sin procesos rígidos
4. Adoptar el cambio
ESPERAR que cambien los requerimientos
Diseñar sistema para adaptarse, no resistir el cambio
5. Mantener simplicidad
Enfocarse en simplicidad en software Y proceso
Eliminar activamente la complejidad, rechazar sobre-ingeniería

4. PRINCIPALES MÉTODOS ÁGILES
Métodos populares:
XP (Extreme Programming) - Beck, 2000
Scrum - Schwaber & Beedle, 2001
Crystal - Cockburn
DSDM (Dynamic Systems Development Method)
FDD (Feature-Driven Development)
Modelado Ágil - Ambler
RUP Ágil - Larman
Este capítulo se enfoca en XP y Scrum (los más usados).
5. CUÁNDO USAR MÉTODOS ÁGILES
✅ IDEAL PARA:
Tipo 1: Desarrollo de productos
Compañía de software desarrolla producto pequeño/mediano para venta
Equipo completo dedicado al producto
Ejemplo: Startup desarrollando SaaS
Tipo 2: Sistemas a la medida dentro de organización
Cliente comprometido a intervenir en proceso
No existen muchas regulaciones externas
Ejemplo: Sistema interno de gestión para empresa
❌ NO ADECUADO PARA:
Sistemas críticos de seguridad (requieren análisis exhaustivo)
Sistemas embebidos (dependen de hardware)
Desarrollo distribuido con múltiples equipos grandes
Contextos altamente regulados (FDA, aviación)
Organizaciones con cultura rígida de documentación

🔥 PROGRAMACIÓN EXTREMA (XP)
¿QUÉ ES XP?
Método ágil que lleva prácticas reconocidas a niveles "extremos":
Desarrollo iterativo → Muchas versiones por DÍA
Revisiones de código → Programación en pares CONTINUA
Pruebas → Desarrollo de PRIMERA prueba
Diseño simple → Refactorización CONSTANTE
Nombre: "Extrema" porque extrema las buenas prácticas.
CICLO DE LIBERACIÓN XP
1. PLANEAR LIBERACIÓN
   ↓
2. SELECCIONAR HISTORIA DE USUARIO para esta liberación
   ↓
3. DESGLOSAR historias en TAREAS
   ↓
4. DESARROLLAR / INTEGRAR / PROBAR software
   ↓
5. EVALUAR el sistema (con cliente)
   ↓
6. LIBERAR software (cada ~2 semanas)
   ↓
Repetir

LAS 12 PRÁCTICAS XP
#
Práctica
Descripción
Beneficio clave
1
Planeación incremental
Requerimientos en tarjetas de historia, priorizados por tiempo y valor
Flexibilidad en alcance
2
Liberaciones pequeñas
Conjunto mínimo útil primero, liberaciones frecuentes
Valor temprano al negocio
3
Diseño simple
Diseño suficiente para requerimientos ACTUALES, no futuros
Evita sobre-ingeniería
4
Desarrollo de primera prueba
Escribir pruebas ANTES del código
Interfaz clara, especificación precisa
5
Refactorización
Mejorar código continuamente
Código limpio y mantenible
6
Programación en pares
Dos programadores, una estación
Revisión continua, calidad
7
Propiedad colectiva
Cualquiera puede cambiar cualquier código
Sin cuellos de botella
8
Integración continua
Integrar al completar tarea, todas las pruebas pasan
Detección temprana de problemas
9
Ritmo sustentable
Sin horas extra excesivas
Calidad y productividad sostenible
10
Cliente en sitio
Representante del cliente tiempo completo en equipo
Feedback inmediato
11
Estándares de código
Todos siguen mismos estándares
Código consistente
12
Metáfora del sistema
Historia compartida que describe el sistema
Comprensión común


PRÁCTICA CLAVE: HISTORIAS DE USUARIO
¿Qué son? Requerimientos expresados como escenarios breves escritos en tarjetas.
Formato de tarjeta de historia:
┌─────────────────────────────────────────┐
│ HISTORIA: Prescripción de medicamentos │
├─────────────────────────────────────────┤
│ Como: Médico                            │
│ Quiero: Prescribir medicamentos         │
│ Para: Que pacientes reciban tratamiento│
│                                         │
│ ESCENARIO:                              │
│ Kate despliega archivo del paciente.    │
│ Da clic en campo de medicamento.        │
│ Selecciona "medicamento actual",        │
│ "medicamento nuevo" o "formulario".     │
│                                         │
│ Si "actual": Verifica dosis → Confirma  │
│ Si "nuevo": Busca fármaco → Ingresa     │
│              dosis → Confirma           │
│ Si "formulario": Busca por síntoma →    │
│                  Selecciona → Confirma  │
└─────────────────────────────────────────┘

Características:
Breves (caben en tarjeta index)
En lenguaje del cliente
Enfocadas en valor para usuario
Base para estimación y planeación
De historia a tareas:
HISTORIA: Prescripción de medicamentos

↓ Se descompone en:

TAREA 1: Cambiar dosis del medicamento prescrito
TAREA 2: Selección de formulario  
TAREA 3: Verificación de dosis (prevención de seguridad)
TAREA 4: Búsqueda de medicamento por nombre
TAREA 5: Confirmación de prescripción

Cada tarea = 1-2 días de trabajo

PRÁCTICA CLAVE: DESARROLLO DE PRIMERA PRUEBA (TDD)
¿Qué es? Escribir pruebas ANTES de escribir el código que implementa la funcionalidad.
Proceso:
1. Escribir PRUEBA para nueva funcionalidad
   ↓
2. Ejecutar prueba → FALLA (obvio, no hay código)
   ↓
3. Escribir código MÍNIMO para que prueba pase
   ↓
4. Ejecutar prueba → PASA
   ↓
5. Refactorizar código (mejorar sin cambiar comportamiento)
   ↓
6. Ejecutar TODAS las pruebas → Todas pasan
   ↓
Repetir

Ejemplo de prueba (antes de código):
# TAREA: Verificación de dosis

def test_dosis_dentro_de_limites():
    medicamento = "Aspirina"
    dosis = 500  # mg
    resultado = verificar_dosis(medicamento, dosis)
    assert resultado == "SEGURA"

def test_dosis_excede_limite_superior():
    medicamento = "Aspirina"
    dosis = 5000  # mg - peligrosamente alta
    resultado = verificar_dosis(medicamento, dosis)
    assert resultado == "RIESGO_ALTO"

def test_dosis_bajo_limite_inferior():
    medicamento = "Aspirina"
    dosis = 10  # mg - ineficaz
    resultado = verificar_dosis(medicamento, dosis)
    assert resultado == "DOSIS_BAJA"

DESPUÉS escribes la función verificar_dosis()
BENEFICIOS:
Interfaz clara desde el inicio


Defines cómo se usará el código antes de escribirlo
Especificación ejecutable


Las pruebas documentan QUÉ debe hacer el código
Ambigüedades detectadas temprano


Si no puedes escribir la prueba, no entiendes el requerimiento
Evita "retraso en pruebas"


Implementación NO va adelantada de pruebas
Regresión automática


Cada nueva prueba protege contra futuros cambios
LIMITACIONES:
❌ Problema 1: Programadores toman atajos
Escriben pruebas incompletas
No prueban todas las excepciones
❌ Problema 2: Interfaces complejas difíciles de probar
Ejemplo: Lógica de UI con flujo entre pantallas
Solución: Separar lógica de presentación
❌ Problema 3: Difícil juzgar totalidad
Muchas pruebas ≠ Cobertura completa
Partes críticas pueden quedar sin probar
Frameworks de pruebas automatizadas:
JUnit (Java)
pytest (Python)
RSpec (Ruby)
Jest (JavaScript)

PRÁCTICA CLAVE: PROGRAMACIÓN EN PARES
¿Qué es? Dos programadores trabajan juntos en UNA estación de trabajo para desarrollar software.
Roles dinámicos:
Driver: Escribe el código
Navigator: Revisa, piensa estratégicamente, detecta errores
Roles cambian frecuentemente (cada 15-30 min)
Formación de pares:
Pares NO son fijos
Pares se crean dinámicamente
Todos trabajan con todos durante el proyecto
VENTAJAS:
1. Propiedad colectiva del código
Nadie "posee" una parte del sistema
Programación sin ego (Weinberg, 1971)
Responsabilidad colectiva del equipo
2. Revisión de código informal continua
Al menos dos personas ven cada línea
Detecta errores en tiempo real
Más económico que inspecciones formales
3. Facilita refactorización
Beneficio inmediato para el par
Ambos aprueban mejoras
Reduce resistencia a mejorar código
4. Transferencia de conocimiento
Miembros junior aprenden de seniors
Conocimiento del sistema se distribuye
Reduce "silos de conocimiento"
5. Mejor enfoque
Difícil distraerse con redes sociales
Compromiso mutuo de concentración
DESVENTAJAS:
❌ Problema 1: Costo aparente 2x
Respuesta: Productividad NO es la mitad
Estudios muestran ~15% reducción, NO 50%
Calidad compensa ampliamente
❌ Problema 2: Personalidades incompatibles
No todos trabajan bien en pares
Algunos programadores son muy introvertidos
Solución: Hacer programación en pares opcional, no obligatoria
❌ Problema 3: Desgaste (pair fatigue)
Programar en par 8 horas es agotador
Solución: Alternar con trabajo individual
CUÁNDO NO USAR:
Tareas triviales (renombrar variables)
Spikes exploratorios iniciales
Trabajo administrativo
Ejemplo cotidiano: Conductor + copiloto en rally - conductor maneja, copiloto lee ruta y detecta peligros. Ambos esenciales.

PRÁCTICA CLAVE: REFACTORIZACIÓN
¿Qué es? Mejorar estructura del código SIN cambiar su comportamiento externo.
PROBLEMA QUE RESUELVE: Desarrollo incremental → Estructura se degrada → Cambios cada vez más difíciles
Tipos de refactorización:
Tipo
Ejemplo
Cuándo
Eliminar duplicación
Extraer código repetido a función
Mismo código en 3+ lugares
Renombrar
calc() → calcular_impuesto()
Nombres no claros
Extraer método
Función de 200 líneas → 5 funciones de 40
Funciones muy largas
Reorganizar jerarquía
Mover métodos entre clases
Responsabilidades mal distribuidas
Simplificar condicionales
Reemplazar if anidados con polimorfismo
Lógica compleja

PROCESO:
1. IDENTIFICAR código que puede mejorarse
   ↓
2. Ejecutar TODAS las pruebas → Todas pasan
   ↓
3. Hacer PEQUEÑO cambio de refactorización
   ↓
4. Ejecutar TODAS las pruebas → Todas pasan
   ↓
5. Si fallan → REVERTIR cambio
   ↓
Repetir

REGLA DE ORO: Si pruebas no pasan después de refactorizar → NO era refactorización, era un cambio de comportamiento.
Herramientas de soporte:
Eclipse: Refactoring automático
IntelliJ IDEA: Refactoring inteligente
Visual Studio: Refactoring integrado
ReSharper: Refactoring para .NET
EN LA PRÁCTICA:
Principio: Refactorizar continuamente Realidad: Presión de desarrollo → Refactorización se demora
Solución:
Programar tiempo específico para refactorización
Regla: "Dejar el campamento más limpio que como lo encontraste"
Refactorización es parte de "Done"
LIMITACIONES:
Cambios arquitectónicos NO son refactorización de código
Requieren reestructuración mayor
Deben planearse como tareas separadas
Ejemplo cotidiano: Reorganizar tu cocina - cambias dónde están las cosas, pero sigues pudiendo cocinar. Mejoras la eficiencia sin cambiar qué cocinas.

PRÁCTICA CLAVE: INTEGRACIÓN CONTINUA
¿Qué es? Integrar código al sistema principal TAN PRONTO como se completa una tarea.
PROCESO:
1. Programador completa tarea
   ↓
2. Ejecuta TODAS las pruebas localmente → Todas pasan
   ↓
3. INTEGRA código al sistema principal
   ↓
4. Sistema automáticamente ejecuta TODAS las pruebas
   ↓
5a. Si pasan → Integración exitosa
5b. Si fallan → REVERTIR inmediatamente
   ↓
Repetir (varias veces al día)

FRECUENCIA EN XP:
Múltiples integraciones POR DÍA
Algunos equipos: 10+ integraciones diarias
BENEFICIOS:
Detecta conflictos inmediatamente


No esperas semanas para descubrir incompatibilidades
Todos trabajan con versión actual


No hay "mi versión" vs "tu versión"
Sistema siempre en estado ejecutable


Puedes demo en cualquier momento
Reduce "infierno de integración"


Integrar al final es caos
Integrar continuamente es incremental
HERRAMIENTAS:
Jenkins
Travis CI
CircleCI
GitLab CI
GitHub Actions
REQUISITO CRÍTICO: Suite completa de pruebas automatizadas que se ejecuta en minutos.

🏃 SCRUM: MARCO DE GESTIÓN ÁGIL
¿QUÉ ES SCRUM?
Método ágil enfocado en ADMINISTRACIÓN iterativa del desarrollo, NO en prácticas técnicas específicas.
Scrum se puede combinar con XP:
Scrum → Cómo gestionar el proyecto
XP → Cómo escribir el código
3 FASES DE SCRUM
FASE 1: PLANEACIÓN DEL BOSQUEJO (Outline Planning)
Establecer objetivos generales del proyecto
Diseñar arquitectura de software de alto nivel
Resultado: Visión del producto, arquitectura inicial
FASE 2: CICLOS SPRINT (Sprint Cycles)
Desarrollo incremental del sistema
Series de sprints de longitud fija
Resultado: Incrementos funcionales
FASE 3: CIERRE DEL PROYECTO (Project Closure)
Completar documentación requerida
Manuales de usuario, marcos de ayuda
Evaluar lecciones aprendidas
Resultado: Proyecto cerrado, documentación completa

EL CORAZÓN DE SCRUM: EL SPRINT
¿Qué es un Sprint? Unidad de planeación de longitud FIJA (2-4 semanas) donde se desarrolla incremento del sistema.
ESTRUCTURA DE UN SPRINT:
INICIO DEL SPRINT
│
├─ VALORACIÓN (Sprint Review/Planning)
│  ├─ Revisar cartera del producto (backlog)
│  ├─ Asignar prioridades y riesgos
│  └─ Cliente introduce nuevos requerimientos
│
├─ SELECCIÓN (Sprint Planning)
│  ├─ Todo el equipo + cliente
│  ├─ Seleccionar funcionalidades para este sprint
│  └─ Acordar alcance del sprint
│
├─ DESARROLLO (Sprint Execution)
│  ├─ Equipo se organiza autónomamente
│  ├─ Reuniones diarias (Daily Scrum)
│  ├─ Maestro de Scrum protege al equipo
│  └─ Desarrollo sin interrupciones externas
│
└─ REVISIÓN (Sprint Review)
   ├─ Presentar trabajo a stakeholders
   ├─ Demo de funcionalidad completa
   └─ Feedback para siguiente sprint
│
FIN DEL SPRINT → INICIO DE SIGUIENTE SPRINT

CARACTERÍSTICAS CLAVE:
1. Longitud fija (timeboxed)
2-4 semanas (más común: 2 semanas)
NO se extienden los sprints
Si no se completa → Mueve a siguiente sprint
2. Cartera del producto (Product Backlog)
Lista priorizada de trabajo por hacer
Cliente introduce nuevos items al inicio de sprint
Se revisa y reprioriza cada sprint
3. Compromiso del sprint (Sprint Commitment)
Equipo se compromete con conjunto de trabajo
NO se agregan tareas durante el sprint
Protección contra cambios constantes
4. Incremento potencialmente entregable
Al final de cada sprint: funcionalidad completa
Probada, integrada, documentada
Lista para producción (aunque no se libere)

ROLES EN SCRUM
ROL 1: PRODUCT OWNER (Dueño del Producto)
Representa al cliente/stakeholders
Define y prioriza backlog
Acepta o rechaza trabajo completado
Maximiza valor del producto
UNA persona, no un comité
ROL 2: SCRUM MASTER (Maestro de Scrum)
NO es gerente tradicional
Es FACILITADOR y PROTECTOR del equipo
Responsabilidades:
Organiza reuniones diarias
Rastrea backlog y progreso
Registra decisiones
Mide progreso contra backlog
PROTEGE equipo de distracciones externas
Remueve impedimentos
NO asigna trabajo - equipo se auto-organiza
ROL 3: EQUIPO DE DESARROLLO (Development Team)
Auto-organizado y multi-funcional
Típicamente 5-9 personas
Todos participan en planeación
Responsabilidad colectiva
Sin títulos ni jerarquías dentro del equipo
DIFERENCIA CLAVE vs gestión tradicional: No hay "dirección descendente". Equipo decide CÓMO hacer el trabajo.

REUNIÓN DIARIA (DAILY SCRUM / STANDUP)
Formato:
Duración: 15 minutos MÁXIMO
Cuándo: Mismo lugar y hora cada día
Quién: Todo el equipo de desarrollo
De pie: Para mantenerla breve
3 PREGUNTAS que cada miembro responde:
¿Qué hice ayer?
¿Qué haré hoy?
¿Qué impedimentos tengo?
PROPÓSITO:
Sincronizar al equipo
Identificar problemas temprano
Replanear trabajo a corto plazo
NO es reporte de status a gerente
LO QUE NO ES: ❌ Resolución de problemas (se hace después) ❌ Discusión técnica profunda (se hace después) ❌ Reporte al jefe (no hay jefe)

ARTEFACTOS DE SCRUM
ARTEFACTO 1: PRODUCT BACKLOG (Cartera del Producto)
┌─────────────────────────────────────────┐
│ PRODUCT BACKLOG - Prioridad descendente│
├─────────────────────────────────────────┤
│ [Alta] Login con 2FA                    │
│ [Alta] Dashboard de métricas            │
│ [Media] Exportar a PDF                  │
│ [Media] Notificaciones email            │
│ [Baja] Tema oscuro                      │
│ [Baja] Integración con Slack            │
└─────────────────────────────────────────┘

ARTEFACTO 2: SPRINT BACKLOG (Tareas del Sprint)
┌─────────────────────────────────────────┐
│ SPRINT BACKLOG - Sprint 5               │
├─────────────────────────────────────────┤
│ Historia: Login con 2FA                 │
│   [x] Diseñar UI                        │
│   [x] Implementar backend               │
│   [ ] Integrar con autenticador         │
│   [ ] Escribir pruebas                  │
│                                         │
│ Historia: Dashboard de métricas         │
│   [x] Diseño mockup                     │
│   [ ] Implementar queries               │
│   [ ] Crear gráficos                    │
└─────────────────────────────────────────┘

ARTEFACTO 3: INCREMENTO Software funcional al final del sprint.

VENTAJAS DE SCRUM (Reportadas)
Producto en piezas manejables


No abruma al equipo
Progreso visible
Requerimientos inestables no retrasan


Se adaptan en cada sprint
Sin replaneación masiva
Comunicación mejorada


Todo el equipo sabe todo
Reuniones diarias mantienen sincronía
Clientes ven entregas a tiempo


Feedback sobre funcionalidad real
No promesas, sino software
Confianza entre clientes y desarrolladores


Cultura positiva
Expectativa de éxito

⚖️ ÁGIL vs PLAN-DRIVEN: CUÁNDO USAR CADA UNO
LA FALSA DICOTOMÍA
MITO: "Debes elegir ágil O plan-driven" REALIDAD: La mayoría de proyectos usan HÍBRIDO
DIFERENCIAS CLAVE
Aspecto
Plan-Driven
Ágil
Especificación
Detallada por adelantado
Evoluciona con desarrollo
Diseño
Arquitectura completa inicial
Diseño emergente
Documentación
Extensa y formal
Mínima y selectiva
Cliente
Inicio y final principalmente
Integrado continuamente
Cambios
Costosos, controlados
Esperados, abrazados
Iteraciones
Grandes (meses)
Pequeñas (semanas)
Equipos
Especializados por fase
Multi-funcionales
Éxito medido por
Conformidad con plan
Software funcionando

10 PREGUNTAS PARA DECIDIR
PREGUNTA 1: ¿Qué tan estables son los requerimientos?
Estables → Plan-Driven
Volátiles → Ágil
PREGUNTA 2: ¿Qué tan grande es el sistema?
Pequeño/mediano → Ágil
Muy grande → Plan-Driven o híbrido
PREGUNTA 3: ¿Qué tipo de sistema?
Crítico de seguridad → Plan-Driven
Web/móvil/comercio → Ágil
Embebido → Plan-Driven
Empresarial interno → Ágil
PREGUNTA 4: ¿Cuál es el tiempo de vida esperado?
Largo (10+ años) → Más documentación
Corto (1-3 años) → Menos documentación
PREGUNTA 5: ¿Qué tecnologías están disponibles?
Buenas herramientas de visualización → Menos documentación
Sin herramientas → Más documentación
PREGUNTA 6: ¿Cómo está organizado el equipo?
Co-localizado → Ágil funciona mejor
Distribuido → Necesita más documentación
Subcontratado → Documentación formal
PREGUNTA 7: ¿Hay problemas culturales?
Cultura tradicional de ingeniería → Resistencia a ágil
Startup/tech → Adopción fácil de ágil
PREGUNTA 8: ¿Qué tan buenos son diseñadores y programadores?
Habilidades altas → Ágil aprovecha talento
Habilidades mixtas → Plan-driven con roles claros
PREGUNTA 9: ¿Sistema está sujeto a regulación externa?
Regulado (FDA, FAA) → Documentación detallada requerida
No regulado → Flexibilidad
PREGUNTA 10: ¿Cliente está disponible?
Disponible tiempo completo → Ágil
Solo ocasionalmente → Plan-driven

📏 ESCALAMIENTO DE MÉTODOS ÁGILES
EL PROBLEMA
Métodos ágiles se desarrollaron para:
Equipos PEQUEÑOS (5-10 personas)
Co-localizados (misma habitación)
Comunicación informal cara-a-cara
¿Qué pasa con sistemas grandes?
100+ desarrolladores
Múltiples equipos
Distribución geográfica
Requieren años de desarrollo
DESAFÍOS DEL ESCALAMIENTO
DESAFÍO 1: Diseño arquitectónico frontal necesario
Problema:
Ágil = diseño emergente
Sistemas grandes requieren arquitectura estable ANTES
Solución:
Fase inicial de diseño arquitectónico
Iteraciones ágiles dentro de arquitectura definida
Arquitecto(s) dedicado(s)

DESAFÍO 2: Integración continua prácticamente imposible
Problema:
10 equipos x 10 desarrolladores = 100 cambios/día
Imposible integrar todo continuamente
Solución:
Integración continua POR EQUIPO
Integración programada ENTRE EQUIPOS
Build nightly de sistema completo

DESAFÍO 3: Equipos tienen diferentes niveles de habilidad
Problema:
Ágil funciona mejor con equipos altamente competentes
Organizaciones grandes tienen rango amplio de habilidades
Solución:
Pares senior-junior
Rotación entre equipos
Capacitación continua
Acepta que algunos equipos serán menos ágiles

DESAFÍO 4: Resistencia cultural
Problema:
Organizaciones grandes con historia de procesos convencionales
Procedimientos burocráticos incompatibles
Ejemplos de conflictos:
Gestión de cambios: Requiere aprobación formal vs refactorización libre
Estándares de pruebas: Equipo externo vs desarrollo de primera prueba
Documentación obligatoria: Para cumplimiento vs documentación mínima
Solución:
Promotores internos del cambio
Piloto con equipos pequeños
Adaptar procedimientos organizacionales
Cambio cultural toma AÑOS

DESAFÍO 5: Mantenimiento a largo plazo
Problema:
Conocimiento implícito en miembros del equipo
Si equipo se separa → conocimiento se pierde
Nuevos miembros difícilmente acumulan misma percepción
Solución:
Documentación selectiva de decisiones arquitectónicas
Rotación gradual de miembros
Sesiones de transferencia de conocimiento
Código auto-documentado

ESTRATEGIAS DE ESCALAMIENTO
ESTRATEGIA 1: Scrum de Scrums
Equipo 1 (Scrum) ─┐
Equipo 2 (Scrum) ─┼─→ Scrum de Scrums (coordinación)
Equipo 3 (Scrum) ─┘

Representante de cada equipo se reúne diariamente
Coordina dependencias entre equipos
Escala a ~50 personas
ESTRATEGIA 2: SAFe (Scaled Agile Framework)
Framework específico para escalar ágil
Múltiples niveles: equipo, programa, portafolio
Más estructura que Scrum puro
ESTRATEGIA 3: Híbrido
Arquitectura y diseño de alto nivel: Plan-driven
Desarrollo de componentes: Ágil
Integración: Programada y formal

✅ CHECKLIST DE IMPLEMENTACIÓN
ANTES DE ADOPTAR ÁGIL:
[ ] ¿Cliente comprometido a participar tiempo completo o casi?
[ ] ¿Equipo co-localizado o puede comunicarse diariamente?
[ ] ¿Requerimientos son volátiles?
[ ] ¿Sistema NO es crítico de seguridad?
[ ] ¿Equipo tiene habilidades adecuadas?
[ ] ¿Organización tolerará menor documentación?
[ ] ¿Sin regulaciones externas que requieran documentación exhaustiva?
SI 5+ respuestas son SÍ → Ágil es apropiado
AL IMPLEMENTAR XP:
Prácticas esenciales (no negociables):
[ ] Liberaciones pequeñas y frecuentes
[ ] Desarrollo de primera prueba
[ ] Integración continua
[ ] Refactorización regular
Prácticas opcionales (adaptar):
[ ] Programación en pares (algunos equipos no la usan)
[ ] Cliente en sitio (pueden ser interacciones remotas frecuentes)
[ ] Historias de usuario en tarjetas (pueden ser digitales)
[ ] Propiedad colectiva (puede tener "expertos" en áreas)
AL IMPLEMENTAR SCRUM:
Setup inicial:
[ ] Product Owner designado (una persona clara)
[ ] Scrum Master entrenado (no gerente tradicional)
[ ] Equipo formado (5-9 personas, multi-funcional)
[ ] Product Backlog inicial creado y priorizado
[ ] Definición de "Done" acordada
Por cada sprint:
[ ] Duración de sprint fija (2-4 semanas)
[ ] Sprint Planning realizado
[ ] Daily Scrums (15 min, misma hora/lugar)
[ ] Sprint Review con stakeholders
[ ] Sprint Retrospective (mejora continua)
Herramientas:
[ ] Herramienta para gestionar backlog (Jira, Trello, etc.)
[ ] Servidor de integración continua
[ ] Framework de pruebas automatizadas
[ ] Sistema de control de versiones

⚠️ ERRORES COMUNES Y CÓMO EVITARLOS
ERROR 1: "Ágil = Sin disciplina"
❌ Mito: Ágil significa hacer lo que quieras sin estructura
✅ Realidad:
Ágil requiere MÁS disciplina que cascada
Pruebas automatizadas son obligatorias
Integración continua requiere riguroso control
Refactorización requiere disciplina constante
Cómo evitar: Establecer prácticas no negociables desde el inicio.

ERROR 2: "No necesitamos documentación"
❌ Mito: Ágil elimina toda documentación
✅ Realidad:
Documentación selectiva, no exhaustiva
Documenta decisiones arquitectónicas importantes
Código debe ser auto-documentado
Mantén documentación de usuario
Cómo evitar: Pregunta: "¿Alguien necesitará esto en 6 meses?" Si sí → documenta.

ERROR 3: "Cliente siempre tiene razón"
❌ Problema: Aceptar TODO lo que cliente pide sin pushback técnico
✅ Solución:
Cliente define QUÉ (prioridades de negocio)
Equipo define CÓMO (solución técnica)
Equipo debe educar a cliente sobre costos técnicos
Negociar alcance basado en valor vs costo

ERROR 4: "Programación en pares todo el tiempo"
❌ Problema: Forzar programación en pares 8 horas/día causa agotamiento
✅ Solución:
Programación en pares para código complejo/crítico
Trabajo individual para tareas simples
Alternar entre pares e individual
Respetar preferencias personales

ERROR 5: "Sin diseño arquitectónico"
❌ Problema: "Diseño emergente" interpretado como "sin diseño inicial"
✅ Solución:
Diseño arquitectónico de alto nivel ANTES de sprints
Identificar componentes principales
Definir interfaces entre componentes
Diseño detallado puede emerger

ERROR 6: "Cambiar alcance del sprint a medio camino"
❌ Problema: Agregar tareas durante el sprint
✅ Solución:
Sprint commitment es sagrado
Nuevos requerimientos → Siguiente sprint
Si emergencia real → Cancelar sprint y replantear
Proteger al equipo de interrupciones

ERROR 7: "Daily Scrum de 1 hora"
❌ Problema: Reunión diaria se vuelve sesión de resolución de problemas
✅ Solución:
Límite estricto de 15 minutos
Solo 3 preguntas por persona
Problemas profundos → Discutir DESPUÉS
De pie para mantener brevedad

ERROR 8: "Scrum Master = Project Manager tradicional"
❌ Problema: Scrum Master asigna tareas y controla
✅ Solución:
Scrum Master es facilitador, NO gerente
Equipo se auto-organiza
Scrum Master PROTEGE, no dirige
Scrum Master remueve impedimentos

ERROR 9: "Ignorar refactorización por presión"
❌ Problema: "No hay tiempo para refactorizar, solo agrega funcionalidades"
✅ Solución:
Refactorización es parte de "Done"
Deuda técnica se paga eventualmente (con intereses)
Incluir tiempo de refactorización en estimaciones
Regla del Boy Scout: Dejar código mejor que lo encontraste

ERROR 10: "Ágil para sistemas críticos de seguridad sin adaptación"
❌ Problema: Aplicar XP puro a software de aviones
✅ Solución:
Sistemas críticos requieren análisis exhaustivo
Usar elementos ágiles (iteraciones, pruebas)
Combinar con análisis formal y documentación obligatoria
Reconocer limitaciones de ágil puro

💡 REGLAS DE ORO DEL CAPÍTULO
1. ÁGIL ≠ CAOS
Es disciplina diferente, no ausencia de disciplina. Requiere rigor en pruebas, integración y calidad.
2. INDIVIDUOS > PROCESOS
Pero eso NO significa sin procesos. Significa procesos al servicio de las personas, no al revés.
3. SOFTWARE FUNCIONANDO > DOCUMENTACIÓN
Pero documenta lo esencial: decisiones arquitectónicas, APIs públicas, guías de usuario.
4. CLIENTE INTEGRADO ES CRÍTICO
Sin cliente accesible y comprometido, ágil NO funcionará. Este es el requerimiento #1.
5. PRUEBAS PRIMERO, CÓDIGO DESPUÉS
TDD no es opcional en XP. Es la práctica que hace posible todo lo demás.
6. REFACTORIZA O MUERE (LENTAMENTE)
Sin refactorización constante, código se degrada hasta colapsar. No es opcional.
7. INTEGRACIÓN CONTINUA = SEGURO CONTRA DESASTRES
Integrar al final es "infierno de integración". Integrar continuamente es incremental y manejable.
8. SPRINTS SON TIMEBOXED (Tiempo fijo)
NO se extienden. Si no terminas, mueves a siguiente sprint. Esto mantiene ritmo sustentable.
9. RETROSPECTIVAS SON TAN IMPORTANTES COMO EL CÓDIGO
Mejora continua del PROCESO es tan vital como mejora del PRODUCTO.
10. ESCALAMIENTO REQUIERE ADAPTACIÓN
No puedes aplicar XP de 5 personas a 100 personas sin cambios. Requiere híbrido con elementos plan-driven.
11. ADOPTAR SELECTIVAMENTE ES VÁLIDO
No tienes que hacer TODAS las 12 prácticas de XP. Adopta las que agregan valor a TU contexto.
12. ÁGIL vs PLAN NO ES BINARIO
La mayoría de proyectos exitosos usan elementos de AMBOS. Busca el balance correcto.

📊 PLANTILLAS Y HERRAMIENTAS
PLANTILLA 1: EVALUACIÓN PARA ÁGIL
PROYECTO: _______________  FECHA: _______________

EVALUACIÓN DE FACTIBILIDAD ÁGIL:

1. ESTABILIDAD DE REQUERIMIENTOS
   □ Muy volátiles (cambian semanalmente)
   □ Moderadamente cambiantes (mensualmente)
   □ Estables (raramente cambian)
   
   Si volátiles → +3 puntos Ágil
   Si estables → +3 puntos Plan-Driven

2. DISPONIBILIDAD DEL CLIENTE
   □ Tiempo completo dedicado
   □ Disponible varias veces por semana
   □ Solo reuniones mensuales
   
   Si tiempo completo → +5 puntos Ágil ★★★
   Si mensual → +5 puntos Plan-Driven

3. TAMAÑO DEL EQUIPO
   □ Pequeño (3-9 personas)
   □ Mediano (10-20 personas)
   □ Grande (20+ personas)
   
   Si pequeño → +3 puntos Ágil
   Si grande → +3 puntos Plan-Driven/Híbrido

4. CRITICIDAD DEL SISTEMA
   □ Crítico de seguridad (vidas en riesgo)
   □ Crítico de negocio (pérdidas mayores)
   □ Importante pero no crítico
   □ No crítico
   
   Si crítico seguridad → +5 puntos Plan-Driven ★★★
   Si no crítico → +3 puntos Ágil

5. DISTRIBUCIÓN DEL EQUIPO
   □ Co-localizado (misma oficina)
   □ Distribuido (misma zona horaria)
   □ Global (zonas horarias diferentes)
   
   Si co-localizado → +3 puntos Ágil
   Si global → +3 puntos Plan-Driven

6. EXPERIENCIA DEL EQUIPO
   □ Muy experimentado
   □ Experiencia mixta
   □ Mayormente junior
   
   Si experimentado → +2 puntos Ágil
   Si junior → +2 puntos Plan-Driven

7. CULTURA ORGANIZACIONAL
   □ Innovadora, acepta cambio
   □ Tradicional, procesos establecidos
   □ Altamente regulada
   
   Si innovadora → +3 puntos Ágil
   Si regulada → +4 puntos Plan-Driven ★★

8. TIEMPO DE VIDA DEL SISTEMA
   □ Corto (1-2 años)
   □ Mediano (3-5 años)
   □ Largo (10+ años)
   
   Si corto → +2 puntos Ágil
   Si largo → +2 puntos Plan-Driven (más documentación)

9. REGULACIÓN EXTERNA
   □ Sin regulación externa
   □ Algunas regulaciones
   □ Altamente regulado (FDA, FAA, etc.)
   
   Si sin regulación → +3 puntos Ágil
   Si altamente regulado → +5 puntos Plan-Driven ★★★

10. COMPLEJIDAD TÉCNICA
    □ Relativamente simple
    □ Compleja
    □ Muy compleja (ej: sistemas distribuidos)
    
    Si simple → +2 puntos Ágil
    Si muy compleja → +2 puntos Híbrido

TOTAL PUNTOS ÁGIL: _____
TOTAL PUNTOS PLAN-DRIVEN: _____

RECOMENDACIÓN:
□ ÁGIL PURO (Ágil > Plan + 10)
□ MAYORMENTE ÁGIL (Ágil > Plan + 5)
□ HÍBRIDO (Diferencia < 5)
□ MAYORMENTE PLAN (Plan > Ágil + 5)
□ PLAN-DRIVEN PURO (Plan > Ágil + 10)


PLANTILLA 2: HISTORIA DE USUARIO
┌─────────────────────────────────────────────────┐
│ HISTORIA #: _____   PRIORIDAD: □ Alta □ Media □ Baja │
├─────────────────────────────────────────────────┤
│ TÍTULO: ___________________________________    │
│                                                 │
│ Como: ________________________________________ │
│ (rol del usuario)                               │
│                                                 │
│ Quiero: ______________________________________ │
│ (funcionalidad deseada)                         │
│                                                 │
│ Para: _________________________________________ │
│ (beneficio/valor)                               │
│                                                 │
│ CRITERIOS DE ACEPTACIÓN:                       │
│ 1. __________________________________________ │
│ 2. __________________________________________ │
│ 3. __________________________________________ │
│                                                 │
│ NOTAS:                                         │
│ _______________________________________________ │
│                                                 │
│ ESTIMACIÓN: _____ puntos/días                  │
│ SPRINT: _____  ASIGNADO A: _________________  │
└─────────────────────────────────────────────────┘

EJEMPLO LLENADO:
┌─────────────────────────────────────────────────┐
│ HISTORIA #: 042   PRIORIDAD: ☑ Alta □ Media □ Baja │
├─────────────────────────────────────────────────┤
│ TÍTULO: Exportar reporte a PDF                 │
│                                                 │
│ Como: Gerente de ventas                        │
│                                                 │
│ Quiero: Exportar el reporte mensual a PDF     │
│                                                 │
│ Para: Compartirlo con ejecutivos que no tienen│
│        acceso al sistema                       │
│                                                 │
│ CRITERIOS DE ACEPTACIÓN:                       │
│ 1. Botón "Exportar PDF" visible en reporte    │
│ 2. PDF incluye todos los datos y gráficos     │
│ 3. PDF descarga en menos de 5 segundos        │
│ 4. Nombre de archivo incluye fecha            │
│                                                 │
│ NOTAS: Usar librería PDFKit. Mantener estilo  │
│         corporativo en PDF.                    │
│                                                 │
│ ESTIMACIÓN: 5 puntos                           │
│ SPRINT: 8      ASIGNADO A: Maria García        │
└─────────────────────────────────────────────────┘


PLANTILLA 3: PLANIFICACIÓN DE SPRINT (SCRUM)
SPRINT #: _____  DURACIÓN: _____ semanas
FECHA INICIO: _________  FECHA FIN: _________

OBJETIVO DEL SPRINT:
___________________________________________________
(Qué valor de negocio entregará este sprint)

HISTORIAS COMPROMETIDAS:

Historia #1: _______________________________________
  Puntos: ___  Prioridad: ___
  Tareas:
    □ ____________________________________________
    □ ____________________________________________
    □ ____________________________________________

Historia #2: _______________________________________
  Puntos: ___  Prioridad: ___
  Tareas:
    □ ____________________________________________
    □ ____________________________________________

Historia #3: _______________________________________
  Puntos: ___  Prioridad: ___
  Tareas:
    □ ____________________________________________
    □ ____________________________________________

CAPACIDAD DEL EQUIPO: _____ puntos
PUNTOS COMPROMETIDOS: _____ puntos

DEFINICIÓN DE "DONE":
□ Código escrito y revisado
□ Pruebas unitarias escritas y pasando
□ Pruebas de integración pasando
□ Documentación actualizada
□ Revisado por al menos un par
□ Integrado al trunk principal
□ Desplegado en ambiente de staging
□ Demostrado al Product Owner
□ Product Owner acepta funcionalidad

RIESGOS IDENTIFICADOS:
1. _______________________________________________
2. _______________________________________________

IMPEDIMENTOS CONOCIDOS:
1. _______________________________________________
2. _______________________________________________


PLANTILLA 4: RETROSPECTIVA DE SPRINT
RETROSPECTIVA SPRINT #: _____  FECHA: _________
FACILITADOR: _______________

¿QUÉ FUNCIONÓ BIEN? (Seguir haciendo)
⭐ ________________________________________________
⭐ ________________________________________________
⭐ ________________________________________________

¿QUÉ NO FUNCIONÓ? (Dejar de hacer)
❌ ________________________________________________
❌ ________________________________________________
❌ ________________________________________________

¿QUÉ PODEMOS MEJORAR? (Empezar a hacer)
💡 ________________________________________________
💡 ________________________________________________
💡 ________________________________________________

ACCIONES PARA SIGUIENTE SPRINT:
Acción #1: ________________________________________
  Responsable: ____________  Fecha límite: _______

Acción #2: ________________________________________
  Responsable: ____________  Fecha límite: _______

Acción #3: ________________________________________
  Responsable: ____________  Fecha límite: _______

MÉTRICA DE MEJORA:
Sprint anterior: ___________________________________
Este sprint: _______________________________________
Meta siguiente sprint: _____________________________


TABLA COMPARATIVA: XP vs SCRUM vs KANBAN
Aspecto
XP
Scrum
Kanban
Enfoque principal
Prácticas técnicas
Gestión de proyecto
Flujo continuo
Iteraciones
1-2 semanas
2-4 semanas
Sin iteraciones fijas
Cambios durante iteración
Posibles
No permitidos
Siempre permitidos
Roles
Cliente, programador, coach
PO, SM, equipo
Flexibles
Prácticas técnicas
Prescriptivas (12 prácticas)
No prescriptivas
No prescriptivas
Estimación
Puntos de historia
Puntos de historia
Opcional
Tablero
Opcional
Sprint board
Tablero Kanban esencial
Límite WIP
No formal
Implícito (sprint)
Explícito por columna
Mejor para
Equipos técnicos pequeños
Gestión de productos
Mantenimiento, soporte
Curva de aprendizaje
Empinada
Moderada
Suave
Énfasis en calidad
Muy alto (TDD, pares)
Depende del equipo
Depende del equipo


🔗 CONEXIONES CON OTROS CAPÍTULOS
← Capítulo 2 (Procesos de Software):
Cap 2 introduce desarrollo incremental → Cap 3 lo lleva al extremo
Cap 2 menciona ágil brevemente → Cap 3 profundiza
Cap 2 habla de enfrentar el cambio → Cap 3 muestra cómo abrazarlo
→ Capítulo 4 (Ingeniería de Requerimientos):
Cap 3 usa historias de usuario → Cap 4 detalla ingeniería de requerimientos formal
Contraste: Requerimientos ágiles vs tradicionales
Cap 4 muestra cuándo se necesita más formalidad
→ Capítulo 8 (Pruebas):
Cap 3 introduce TDD y pruebas automatizadas
Cap 8 profundiza en estrategias de prueba, frameworks, cobertura
TDD es práctica ágil que se detalla técnicamente en Cap 8
→ Capítulos 5-7 (Diseño):
Cap 3 menciona "diseño simple"
Caps 5-7 muestran técnicas de diseño arquitectónico y detallado
Tensión entre diseño emergente (ágil) y diseño frontal (tradicional)
→ Capítulo 22-23 (Gestión de Proyectos):
Cap 3 presenta Scrum como gestión ágil
Caps 22-23 detallan gestión tradicional de proyectos
Contraste entre enfoques de planificación y control
→ Capítulo 25 (Gestión de Configuración):
Cap 3 requiere integración continua
Cap 25 detalla control de versiones, builds, gestión de cambios
Herramientas que hacen posible prácticas ágiles

🚀 PARA IMPLEMENTAR MAÑANA
ACCIÓN INMEDIATA #1: Evalúa si ágil es apropiado
Usa la plantilla de evaluación. Si puntos Ágil > Plan + 5 → Procede.
ACCIÓN INMEDIATA #2: Si adoptas XP, empieza con estas 4 prácticas
✅ Pruebas automatizadas (aunque no TDD todavía)
✅ Integración frecuente (al menos diaria)
✅ Liberaciones cortas (cada 2-4 semanas)
✅ Cliente accesible
NO intentes las 12 prácticas de golpe.
ACCIÓN INMEDIATA #3: Si adoptas Scrum, setup mínimo
Designar Product Owner
Designar Scrum Master
Crear Product Backlog inicial (10-20 historias)
Planear primer sprint (2 semanas)
Programar Daily Scrum (mismo lugar/hora)
ACCIÓN INMEDIATA #4: Primera historia de usuario
Toma un requerimiento y conviértelo a formato:
Como [rol]
Quiero [funcionalidad]
Para [beneficio]

ACCIÓN INMEDIATA #5: Primera prueba antes del código
Escoge una función pequeña. Escribe la prueba PRIMERO. Después el código.

💭 REFLEXIÓN FINAL
Desarrollo ágil NO es:
❌ Caos sin estructura
❌ Excusa para no documentar nada
❌ Programar sin planear
❌ Decir "sí" a todo lo que cliente pide
Desarrollo ágil SÍ es:
✅ Disciplina enfocada en valor
✅ Documentación selectiva e intencional
✅ Planeación adaptativa continua
✅ Colaboración honesta con cliente
Tres verdades sobre ágil:
Requiere MÁS disciplina, no menos


TDD es más difícil que escribir código primero
Refactorización continua requiere esfuerzo constante
Integración continua exige rigor
No es para todos los contextos


Sistemas críticos de seguridad necesitan análisis exhaustivo
Equipos distribuidos necesitan más documentación
Organizaciones altamente reguladas necesitan formalidad
Híbrido es válido y común


Mayoría de proyectos usan elementos de ágil Y plan-driven
Adapta, no adoptes dogmáticamente
Lo que funciona > Pureza metodológica
El objetivo no es "ser ágil" - es ENTREGAR VALOR.
Usa ágil donde acelera la entrega de valor. Usa plan-driven donde reduce riesgo. Usa híbrido donde sea necesario.
La metodología sirve al proyecto, no al revés.

