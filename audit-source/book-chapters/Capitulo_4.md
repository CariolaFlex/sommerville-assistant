CAPÍTULO 4: INGENIERÍA DE REQUERIMIENTOS
EXTRACCIÓN COMPLETA Y DEFINITIVA

📚 ESENCIA
Los requerimientos son la base de TODO sistema de software - definen QUÉ debe hacer el sistema, NO cómo lo hace. Los errores en requerimientos son los MÁS COSTOSOS de corregir porque se propagan a diseño, implementación y pruebas. La ingeniería de requerimientos NO es escribir una lista de deseos - es descubrir, negociar, documentar y validar necesidades reales en un mundo donde los stakeholders no saben lo que quieren hasta que lo ven.

🎯 CONCEPTOS CLAVE COMPLETOS
1. REQUERIMIENTO
Definición: Descripción de lo que el sistema debe hacer, los servicios que ofrece y las restricciones en su operación.
IMPORTANTE: El término "requerimiento" tiene diferentes niveles de abstracción:
Nivel alto: Enunciado abstracto ("el sistema debe ser fácil de usar")
Nivel detallado: Definición matemática formal de una función
Analogía: Como planos de una casa:
Requerimientos de usuario = Boceto para el cliente ("casa de 3 habitaciones")
Requerimientos de sistema = Planos detallados para constructores ("pared de 3.5m con viga de acero tipo X")

2. DOS NIVELES DE REQUERIMIENTOS
REQUERIMIENTOS DEL USUARIO
Qué son: Enunciados en lenguaje natural + diagramas sobre servicios que el sistema debe proveer y restricciones operacionales.
Para quién:
Clientes que pagan el sistema
Usuarios finales
Gerentes de cliente
Gerentes de contratistas
Características:
Lenguaje NO técnico
Comprensibles sin conocimiento de software
Describen comportamiento externo
Abstractos y generales
Ejemplo:
REQUERIMIENTO DE USUARIO:
"El MHC-PMS elaborará mensualmente informes administrativos 
que revelen el costo de los medicamentos prescritos por cada 
clínica durante ese mes."

REQUERIMIENTOS DEL SISTEMA
Qué son: Descripciones DETALLADAS de funciones, servicios y restricciones operacionales. También llamados "especificación funcional".
Para quién:
Ingenieros de software
Arquitectos del sistema
Desarrolladores
Testers
Características:
Nivel de detalle técnico
Base para diseño del sistema
Pueden ser parte del contrato
Especificación completa
Ejemplo (del mismo requerimiento de usuario anterior):
REQUERIMIENTOS DEL SISTEMA:

1.1 En el último día laboral de cada mes se redactará un 
    resumen de los medicamentos prescritos, su costo y las 
    clínicas que los prescriben.

1.2 El sistema elaborará automáticamente el informe que se 
    imprimirá después de las 17:30 del último día laboral 
    del mes.

1.3 Se realizará un reporte para cada clínica junto con los 
    nombres de cada medicamento, el número de prescripciones, 
    las dosis prescritas y el costo total.

1.4 Si los medicamentos están disponibles en diferentes 
    unidades de dosis, se harán informes por separado para 
    cada unidad de dosis.

1.5 El acceso a los informes de costos se restringirá a 
    usuarios autorizados en la lista de control de acceso 
    administrativo.
RELACIÓN: 1 requerimiento de usuario → VARIOS requerimientos de sistema

3. REQUERIMIENTOS FUNCIONALES
Definición: Enunciados sobre servicios que el sistema DEBE proveer, cómo debe reaccionar a entradas, y cómo debe comportarse en situaciones específicas.
Esencia: Describen QUÉ hace el sistema.
Características:
Dependen del tipo de software
Pueden ser generales o muy específicos
Deben ser completos (cubrir TODAS las funciones)
Deben ser consistentes (sin contradicciones)
Ejemplos universales:
EJEMPLO 1 (General):
"Un usuario podrá buscar en todas las clínicas las listas 
de citas."

EJEMPLO 2 (Específico):
"Cada miembro del personal que usa el sistema debe 
identificarse de manera individual con su número de 
ocho dígitos."

EJEMPLO 3 (Detallado):
"El sistema elaborará diariamente, para cada clínica, 
una lista de pacientes que se espera que asistan a cita 
ese día."
PROBLEMA COMÚN: IMPRECISIÓN
❌ AMBIGUO:
"Un usuario podrá buscar las listas de citas."

PREGUNTAS SIN RESPUESTA:
- ¿Buscar en qué clínicas? ¿Una o todas?
- ¿Cómo se ingresa la búsqueda?
- ¿Qué resultados se muestran?

✅ PRECISO:
"Un usuario podrá buscar en TODAS las clínicas las listas 
de citas ingresando el nombre del paciente. El sistema 
mostrará todas las citas que coincidan con ese nombre en 
cualquier clínica del sistema."
IDEAL (casi imposible):
Completos: Definen TODOS los servicios requeridos
Consistentes: Sin definiciones contradictorias
REALIDAD: Para sistemas grandes es IMPOSIBLE lograr completitud y consistencia al 100% porque:
Múltiples stakeholders con necesidades diferentes
Omisiones inevitables
Ambigüedades en lenguaje natural
Inconsistencias solo aparecen tras análisis profundo

4. REQUERIMIENTOS NO FUNCIONALES
Definición: Restricciones sobre servicios o funciones del sistema. NO se relacionan directamente con servicios específicos.
Esencia: Describen CÓMO debe comportarse el sistema o restricciones sobre el desarrollo.
IMPORTANCIA CRÍTICA:
Los requerimientos no funcionales son a menudo MÁS CRÍTICOS que los funcionales. Los usuarios pueden trabajar alrededor de funciones faltantes, pero si el sistema no cumple requerimientos de rendimiento o confiabilidad, puede ser completamente INÚTIL.
Ejemplo real: Si un sistema de aeronave no cumple requerimientos de confiabilidad → NO se certifica como seguro → Toda la funcionalidad es irrelevante.

3 TIPOS DE REQUERIMIENTOS NO FUNCIONALES
TIPO 1: REQUERIMIENTOS DEL PRODUCTO Especifican o restringen el COMPORTAMIENTO del software.
Subtipos:
Subtipo
Qué especifica
Ejemplo
Rendimiento
Rapidez, throughput
"El sistema procesará 100 transacciones/segundo"
Espacio
Memoria, almacenamiento
"La aplicación no excederá 50 MB de RAM"
Usabilidad
Facilidad de uso
"Después de 4 horas de capacitación, los usuarios no cometerán más de 2 errores/hora"
Confiabilidad
Tasa de fallos
"Tiempo medio entre fallos: 500 horas"
Seguridad
Protección de datos
"Datos encriptados con AES-256"
Portabilidad
Plataformas soportadas
"Ejecutable en Windows, Linux y macOS"

Ejemplo completo:
REQUERIMIENTO DEL PRODUCTO (Disponibilidad):
"El MHC-PMS estará disponible en todas las clínicas durante 
las horas de trabajo normales (lunes a viernes, de 8:30 a 
17:30). El tiempo de inactividad durante ese período no debe 
exceder 5 minutos por día."

TIPO 2: REQUERIMIENTOS DE LA ORGANIZACIÓN Derivan de políticas y procedimientos de la organización del cliente o desarrollador.
Subtipos:
Subtipo
Qué especifica
Ejemplo
Operacionales
Cómo se usará el sistema
"El sistema debe integrar con SAP existente"
Desarrollo
Lenguaje, proceso, estándares
"El código debe escribirse en Java 17, siguiendo Google Style Guide"
Ambientales
Entorno de operación
"El sistema operará en centros de datos con temperatura 18-25°C"

Ejemplo completo:
REQUERIMIENTO DE LA ORGANIZACIÓN (Autenticación):
"Los usuarios serán autenticados usando sus tarjetas de 
identidad hospitalarias emitidas por la organización. 
Cada estación de trabajo debe estar equipada con un lector 
de tarjetas compatible con el estándar ISO/IEC 14443."

TIPO 3: REQUERIMIENTOS EXTERNOS Derivan de factores externos al sistema y su proceso de desarrollo.
Subtipos:
Subtipo
Qué especifica
Ejemplo
Regulatorios
Qué debe hacer para ser aprobado
"Debe cumplir FDA 21 CFR Part 11 para registros electrónicos"
Legislativos
Cumplir con la ley
"Debe cumplir GDPR para protección de datos"
Éticos
Aceptabilidad social
"El sistema no debe discriminar por edad, género o raza"

Ejemplo completo:
REQUERIMIENTO EXTERNO (Privacidad):
"El sistema debe implementarse de acuerdo con los requisitos 
de privacidad de datos de salud HStan-03-2006-priv, garantizando 
que solo personal autorizado acceda a información confidencial 
del paciente."

METAS vs REQUERIMIENTOS NO FUNCIONALES VERIFICABLES
PROBLEMA: Stakeholders expresan requerimientos no funcionales como METAS vagas.
❌ META (No verificable):
"El sistema debe ser fácil de usar y minimizar los errores 
del usuario."

PROBLEMAS:
- "Fácil de usar" es subjetivo
- "Minimizar" no es cuantificable
- Imposible de probar objetivamente
- Espacio para disputas después de entrega

✅ REQUERIMIENTO VERIFICABLE:
"Después de 4 horas de capacitación, el personal médico usará 
todas las funciones del sistema. Los usuarios experimentados 
no superarán el promedio de 2 errores por hora de uso del 
sistema."

VERIFICABLE PORQUE:
- Métrica clara: 2 errores/hora
- Condición específica: 4 horas de capacitación
- Medible con instrumentación de software

MÉTRICAS PARA REQUERIMIENTOS NO FUNCIONALES
Propiedad
Medida
Rapidez
Transacciones/segundo procesadas
Tiempo de respuesta usuario/evento
Tiempo de regeneración de pantalla
Tamaño
Mbytes
Número de chips ROM
Facilidad de uso
Tiempo de capacitación
Número de cuadros de ayuda
Errores por hora de uso
Confiabilidad
Tiempo medio para falla (MTTF)
Probabilidad de indisponibilidad
Tasa de ocurrencia de falla
Disponibilidad
Tiempo de operación exitosa como % del tiempo total
Tiempo máximo de inactividad permitido
Robustez
Tiempo de reinicio después de falla
Porcentaje de eventos que causan falla
Probabilidad de corrupción de datos en falla
Portabilidad
Porcentaje de enunciados dependientes de objetivo
Número de sistemas objetivo soportados

REALIDAD:
Para algunas metas (mantenibilidad) NO existen métricas directas
Clientes a menudo NO entienden qué significan los números
Verificación objetiva puede ser COSTOSA
Clientes pueden considerar que no justifica el costo

5. REQUERIMIENTOS DE DOMINIO
Definición: Requerimientos que provienen del DOMINIO DE APLICACIÓN, no de necesidades específicas de usuarios.
Características:
Pueden ser nuevos requerimientos funcionales
Pueden ser restricciones sobre requerimientos existentes
Reflejan características fundamentales del dominio
A menudo usan terminología especializada del dominio
PROBLEMA: Stakeholders asumen que conocimiento del dominio es obvio, no lo mencionan explícitamente.
Ejemplo:
DOMINIO: Sistema bibliotecario

REQUERIMIENTO DE DOMINIO (implícito, no mencionado):
"Todas las adquisiciones deben catalogarse ANTES de agregarlas 
al acervo."

POR QUÉ ES OBVIO PARA BIBLIOTECARIO:
- Proceso fundamental de bibliotecología
- Imposible buscar o prestar sin catalogación

POR QUÉ NO ES OBVIO PARA INGENIERO:
- Sin experiencia en bibliotecas
- Podría asumir que se agregan directamente al acervo

📄 EL DOCUMENTO DE REQUERIMIENTOS DE SOFTWARE
¿QUÉ ES?
Enunciado oficial y ACORDADO de requerimientos del sistema. Debe especificar qué debe hacer el sistema, NO cómo.
PROPÓSITO DUAL:
Para clientes: Base para licitación/contrato del sistema
Para desarrolladores: Base para diseñar e implementar el sistema
DIVERSIDAD DE USUARIOS
El documento de requerimientos tiene lectores DIFERENTES con necesidades DIFERENTES:
Tipo de Usuario
Cómo usa el documento
Gerentes del cliente
Planear proceso de licitación del sistema y presupuesto
Usuarios finales
Ver si el sistema cubrirá sus necesidades; participar en validación
Ingenieros del cliente
Entender qué sistema se desarrollará; apoyar adquisición
Gerentes de contratistas
Planear propuesta para contrato del sistema y proceso de desarrollo
Arquitectos del sistema
Entender sistema a implementar y diseñar arquitectura
Desarrolladores
Entender sistema que deben implementar; base para diseño
Testers
Desarrollar pruebas de validación; verificar que sistema cumple requerimientos
Personal de mantenimiento
Entender sistema y relaciones entre sus partes; base para evolución

IMPLICACIÓN: El documento debe ser comprensible para audiencias técnicas Y no técnicas.

ESTRUCTURA DEL DOCUMENTO
┌──────────────────────────────────────────────────┐
│ DOCUMENTO DE REQUERIMIENTOS DE SOFTWARE         │
├──────────────────────────────────────────────────┤
│                                                  │
│ 1. PREFACIO                                      │
│    - Número esperado de lectores                 │
│    - Historia de versiones                       │
│    - Resumen de cambios en cada versión          │
│                                                  │
│ 2. INTRODUCCIÓN                                  │
│    - Necesidad del sistema                       │
│    - Funciones del sistema (breve)               │
│    - Cómo trabaja con otros sistemas             │
│    - Cómo se ajusta a objetivos empresariales    │
│                                                  │
│ 3. GLOSARIO                                      │
│    - Definiciones de términos técnicos           │
│    - NO asumir experiencia del lector            │
│                                                  │
│ 4. DEFINICIÓN DE REQUERIMIENTOS DEL USUARIO      │
│    - Servicios ofrecidos al usuario              │
│    - Requerimientos no funcionales del sistema   │
│    - Lenguaje natural, diagramas, notaciones     │
│      comprensibles para clientes                 │
│    - Estándares de producto y proceso a seguir   │
│                                                  │
│ 5. ARQUITECTURA DEL SISTEMA                      │
│    - Panorama de alto nivel de arquitectura      │
│    - Distribución de funciones en módulos        │
│    - Componentes arquitectónicos de reutilización│
│                                                  │
│ 6. ESPECIFICACIÓN DE REQUERIMIENTOS DEL SISTEMA  │
│    - Requerimientos funcionales detallados       │
│    - Requerimientos no funcionales detallados    │
│    - Interfaces a otros sistemas                 │
│                                                  │
│ 7. MODELOS DEL SISTEMA                           │
│    - Modelos gráficos: relaciones entre          │
│      componentes, sistema y entorno              │
│    - Ejemplos: modelos de objeto, flujo de       │
│      datos, datos semánticos, casos de uso       │
│                                                  │
│ 8. EVOLUCIÓN DEL SISTEMA                         │
│    - Supuestos fundamentales sobre el sistema    │
│    - Cambios anticipados (hardware, usuarios)    │
│    - Ayuda a diseñadores a evitar decisiones     │
│      que restrinjan cambios futuros              │
│                                                  │
│ 9. APÉNDICES                                     │
│    - Información específica del dominio          │
│    - Detalles de hardware/base de datos          │
│                                                  │
│ 10. ÍNDICE                                       │
│     - Varios índices (alfabético, funciones,     │
│       requerimientos no funcionales)             │
│                                                  │
└──────────────────────────────────────────────────┘
VARIABILIDAD:
Sistemas pequeños/ágiles → Documento más corto, enfoque en requerimientos de usuario
Sistemas grandes → Todos los capítulos, muy extenso
Sistemas embebidos en hardware → Más capítulos sobre interacción hardware-software

ESPECIFICACIÓN DE REQUERIMIENTOS - DESAFÍOS
IDEAL:
Claros, sin ambigüedades
Fáciles de entender
Completos
Consistentes
REALIDAD: Difícil de lograr porque:
Participantes interpretan requerimientos de formas diferentes
Conflictos e inconsistencias inherentes
Lenguaje natural es inherentemente ambiguo

PROBLEMAS CON LENGUAJE NATURAL
Problema
Descripción
Ejemplo
Falta de claridad
Difícil ser preciso sin hacer documento difícil de leer
"El usuario puede buscar..." (¿buscar qué? ¿cómo?)
Confusión de requerimientos
Requerimientos funcionales y no funcionales tienden a mezclarse
Autenticación (no funcional) genera requerimientos de login (funcional)
Amalgamación de requerimientos
Varios requerimientos diferentes se expresan juntos
Un párrafo describe 3 funciones diferentes sin separarlas

SOLUCIÓN PARCIAL: Formato estándar
PLANTILLA DE REQUERIMIENTO:

Definición: [Requerimiento expresado en 1-2 líneas]

Explicación: [Interpretación más detallada]

Ejemplo: [Escenario o caso de uso que ilustra]

Referencias: [Documentos, regulaciones, estándares relacionados]

Criterios: [Cómo puede probarse]

Prioridad: [Alta/Media/Baja]
EJEMPLO REAL:
REQ-42: Búsqueda de pacientes en múltiples clínicas

Definición:
El sistema permitirá buscar citas de un paciente a través 
de todas las clínicas del sistema hospitalario.

Explicación:
Cuando un usuario ingresa el nombre de un paciente, el 
sistema buscará coincidencias en las listas de citas de 
TODAS las clínicas (no solo una). El sistema mostrará 
todas las citas encontradas, indicando clínica, fecha y hora.

Ejemplo:
Paciente "Juan Pérez" tiene cita en Clínica A el 15/03.
Paciente llega por error a Clínica B.
Recepcionista busca "Juan Pérez".
Sistema muestra cita en Clínica A.
Recepcionista redirige al paciente.

Criterios:
1. Búsqueda completa en <2 segundos con <10,000 citas
2. Resultados muestran al menos: nombre, clínica, fecha, hora
3. Si múltiples coincidencias, se permite filtrar por fecha de nacimiento

Prioridad: Alta

CUÁNDO SE NECESITA CADA NIVEL DE REQUERIMIENTOS
Solo requerimientos de USUARIO:
Desarrollo ágil
Sistemas pequeños
Equipo de desarrollo tendrá criterio para decidir implementación
Requerimientos de USUARIO + SISTEMA:
Proyectos grandes con interacción hardware-software
Múltiples equipos de desarrollo
Subcontratación de partes del sistema
Contratos formales que requieren especificación completa

🔄 PROCESOS DE INGENIERÍA DE REQUERIMIENTOS
MODELO EN ESPIRAL
La ingeniería de requerimientos NO es lineal - es ITERATIVA.
       INICIO (Centro de espiral)
              ↓
     ┌────────────────────────┐
     │  ESTUDIO FACTIBILIDAD  │ ← Anillo más interno
     │  ¿Sistema es viable?   │
     └────────────────────────┘
              ↓
     ┌────────────────────────────────┐
     │  ADQUISICIÓN REQUERIMIENTOS    │
     │  DEL USUARIO                   │ ← Segundo anillo
     │  (Alto nivel, requerimientos   │
     │   empresariales y no funcionales)│
     └────────────────────────────────┘
              ↓
     ┌────────────────────────────────┐
     │  ADQUISICIÓN REQUERIMIENTOS    │
     │  DEL SISTEMA                   │ ← Tercer anillo
     │  (Detallados, específicos)     │
     └────────────────────────────────┘
              ↓
     ┌────────────────────────────────┐
     │  ESPECIFICACIÓN Y MODELADO     │ ← Cuarto anillo
     │  (Documentación formal)        │
     └────────────────────────────────┘
              ↓
        DOCUMENTO FINAL
      (Exterior de espiral)
En cada vuelta de la espiral:
Especificación de requerimientos
Validación de requerimientos
Adquisición de requerimientos
Salida: Documento de requerimientos del sistema
Tiempo/esfuerzo por actividad:
Inicio del proceso → Más esfuerzo en requerimientos empresariales de alto nivel
Anillos exteriores → Más esfuerzo en requerimientos detallados del sistema

4 ACTIVIDADES PRINCIPALES
ACTIVIDAD 1: ESTUDIO DE FACTIBILIDAD
Cuándo: ANTES de comenzar ingeniería de requerimientos completa
Objetivo: Breve estudio para responder 3 preguntas críticas:
PREGUNTA 1:
¿El sistema contribuye con los objetivos globales de la 
organización?

EVALUACIÓN:
- Alineación estratégica
- Retorno de inversión esperado
- Alternativas disponibles

PREGUNTA 2:
¿El sistema puede implementarse dentro de la fecha y el 
presupuesto usando la tecnología actual?

EVALUACIÓN:
- Viabilidad técnica
- Recursos disponibles
- Restricciones de tiempo
- Riesgos tecnológicos

PREGUNTA 3:
¿El sistema puede integrarse con otros sistemas que se 
utilizan?

EVALUACIÓN:
- Compatibilidad con sistemas existentes
- APIs disponibles
- Costos de integración
- Migración de datos
Salida: Informe de factibilidad (recomendación: proceder o no proceder)

ACTIVIDAD 2: ADQUISICIÓN Y ANÁLISIS DE REQUERIMIENTOS
Objetivo: Trabajar con clientes y usuarios finales para descubrir:
Dominio de aplicación
Servicios que debe proporcionar el sistema
Desempeño requerido
Restricciones de hardware
Otros requerimientos del sistema

PROCESO DE ADQUISICIÓN (4 SUB-ACTIVIDADES ITERATIVAS):
   ┌──────────────────────────┐
    │1. DESCUBRIMIENTO         │
    │   DE REQUERIMIENTOS      │
    │   (Interacción con       │
    │    stakeholders)         │
    └──────────────────────────┘
              ↓
    ┌──────────────────────────┐
    │2. CLASIFICACIÓN Y        │
    │   ORGANIZACIÓN           │
    │   (Agrupar por           │
    │    subsistemas)          │
    └──────────────────────────┘
              ↓
    ┌──────────────────────────┐
    │3. PRIORIZACIÓN Y         │
    │   NEGOCIACIÓN            │
    │   (Resolver conflictos)  │
    └──────────────────────────┘
              ↓
    ┌──────────────────────────┐
    │4. ESPECIFICACIÓN         │
    │   (Documentar)           │
    └──────────────────────────┘
              ↓
         (Retroalimentación - proceso iterativo)

POR QUÉ ES DIFÍCIL:
RAZÓN 1: Participantes no saben lo que quieren
Solo conocen necesidades en términos muy generales
Difícil articular qué quieren que haga el sistema
Hacen peticiones inalcanzables (no saben qué es factible)
Ejemplo:
Cliente: "Quiero que el sistema sea muy rápido."

Ingeniero: "¿Qué tan rápido? ¿1 segundo, 0.1 segundos?"

Cliente: "No sé... solo rápido."

PROBLEMA: "Rápido" es subjetivo e imposible de implementar

RAZÓN 2: Jerga y conocimiento implícito del dominio
Participantes usan terminología especializada
Conocimiento del dominio es "segunda naturaleza" para ellos
No mencionan lo que consideran "obvio"
Ejemplo:
Bibliotecario: "El sistema debe manejar las adquisiciones."

Ingeniero: "¿Qué significa 'manejar'?"

Bibliotecario: "Bueno, catalogarlas obviamente."

PROBLEMA: Para bibliotecario es obvio que hay que catalogar.
          Para ingeniero NO lo es.

RAZÓN 3: Participantes diferentes, necesidades diferentes
Múltiples stakeholders
Necesidades pueden estar en conflicto
Cada uno expresa requerimientos de forma diferente
Ejemplo:
Doctor: "Necesito acceso rápido al historial completo del paciente."

Administrador TI: "Necesito que el sistema use mínima memoria."

CONFLICTO: Historial completo en RAM = acceso rápido = mucha memoria

RAZÓN 4: Factores políticos
Gerentes piden requerimientos que aumenten su influencia
Departamentos compiten por recursos
Requerimientos como herramientas de poder organizacional

RAZÓN 5: Ambiente dinámico
Ambiente económico y empresarial cambia durante análisis
Importancia de requerimientos cambia
Nuevos participantes aparecen
Prioridades se ajustan
Ejemplo:
INICIO DEL PROYECTO (Enero):
Prioridad #1: Reportes financieros

CAMBIO DE MERCADO (Marzo):
Nuevo competidor lanza app móvil

NUEVA PRIORIDAD #1: App móvil
Reportes financieros → Prioridad #3

TÉCNICAS DE DESCUBRIMIENTO DE REQUERIMIENTOS
TÉCNICA 1: ENTREVISTAS
Tipos:
1. Entrevistas CERRADAS
Conjunto predefinido de preguntas
Respuestas específicas esperadas
Útil para recopilar datos cuantitativos
2. Entrevistas ABIERTAS
Sin agenda predefinida
Exploración libre de temas
Mejor comprensión de necesidades
REALIDAD: La mayoría son HÍBRIDAS (combinación de ambas)

CÓMO HACER BUENAS ENTREVISTAS:
✅ ENTREVISTADOR EFECTIVO:
Mente abierta
Evitar ideas preconcebidas sobre requerimientos
Escuchar activamente a participantes
Disposición para cambiar de mentalidad
Aceptar requerimientos sorprendentes
Usa trampolines
Preguntar "Dime qué quieres" → NO funciona
Usar contexto definido para iniciar conversación
Mostrar prototipos para generar discusión
Proponer requerimientos para obtener feedback
Ejemplo de trampolín:
❌ MAL:
"¿Qué requerimientos tienes para el sistema?"

✅ BIEN:
"Mira este prototipo de la pantalla de búsqueda.
¿Te ayudaría si pudieras filtrar por fecha?
¿Qué otros filtros necesitarías?"

❌ LIMITACIONES DE ENTREVISTAS:
LIMITACIÓN 1: Jerga del dominio
Especialista: "Necesitamos mapeo de impedancias en el bus."

Ingeniero: (¿Qué es mapeo de impedancias?)

PROBLEMA: Difícil pedir clarificación sin parecer ignorante
LIMITACIÓN 2: Conocimiento implícito
Usuario: "El sistema debe procesar las transacciones."

Ingeniero: "¿Cómo?"

Usuario: "Como siempre, obvio."

PROBLEMA: "Como siempre" no está documentado
LIMITACIÓN 3: Estructuras organizacionales
Organigrama oficial: Gerente → Supervisor → Empleado

Realidad: Decisiones se toman informalmente en café

PROBLEMA: Entrevistados describen estructura teórica,
          no real. Políticas internas no se revelan.
SOLUCIÓN: Complementar entrevistas con otras técnicas (observación, escenarios, etnografía)

TÉCNICA 2: ESCENARIOS
Qué son: Ejemplos de sesiones de interacción. Descripciones de cómo se usará el sistema en situaciones específicas.
Por qué funcionan: Las personas entienden mejor EJEMPLOS concretos que descripciones abstractas.

ESTRUCTURA DE UN ESCENARIO COMPLETO:
┌─────────────────────────────────────────────────┐
│ ESCENARIO: [Título descriptivo]                 │
├─────────────────────────────────────────────────┤
│                                                 │
│ SUPOSICIÓN INICIAL:                             │
│ [Estado del sistema antes de iniciar]           │
│                                                 │
│ NORMAL:                                         │
│ [Flujo normal de eventos paso a paso]           │
│                                                 │
│ QUÉ PUEDE SALIR MAL:                            │
│ [Excepciones y cómo manejarlas]                 │
│                                                 │
│ OTRAS ACTIVIDADES:                              │
│ [Actividades concurrentes]                      │
│                                                 │
│ ESTADO AL COMPLETAR:                            │
│ [Estado del sistema al terminar exitosamente]  │
│                                                 │
└─────────────────────────────────────────────────┘

EJEMPLO COMPLETO:
ESCENARIO: Ingreso de historia médica de nuevo paciente

SUPOSICIÓN INICIAL:
El paciente observa a un auxiliar médico que elabora un 
registro en el sistema y recaba información personal 
(nombre, dirección, edad, etc.). Una enfermera ingresa 
al sistema y obtiene la historia médica.

NORMAL:
1. La enfermera busca al paciente por su nombre completo.
2. Si hay más de un paciente con el mismo apellido, se usa 
   el nombre completo y fecha de nacimiento para identificarlo.
3. La enfermera elige la opción de menú "Añadir historia médica".
4. El sistema muestra una serie de indicadores (prompts):
   a. Consultas en otras instituciones (texto libre)
   b. Problemas de salud mental (texto libre)
   c. Condiciones médicas existentes (selección de menú)
   d. Medicamentos actualmente administrados (selección de menú)
   e. Alergias (texto libre)
   f. Información de vida familiar (formulario estructurado)
5. La enfermera completa cada campo.
6. El sistema guarda la información.

QUÉ PUEDE SALIR MAL:
- El registro del paciente no existe o no puede encontrarse
  → La enfermera debe crear nuevo registro e ingresar 
    información personal primero

- Las condiciones o medicamentos del paciente no están 
  en el menú
  → La enfermera debe elegir "otro" e ingresar descripción 
    en texto libre

- El paciente no puede/no quiere proporcionar información 
  sobre su historia médica
  → La enfermera ingresa en texto libre que registra la 
    incapacidad/renuencia
  → El sistema imprime formulario de exclusión estándar 
    mencionando que falta de información podría limitar 
    o demorar tratamiento
  → El paciente debe firmar el formulario

OTRAS ACTIVIDADES:
Mientras se ingresa la información, otros miembros del 
personal pueden CONSULTAR los registros, pero NO editarlos.

ESTADO AL COMPLETAR:
- Registro del paciente (incluyendo historia médica) 
  integrado en la base de datos
- Entrada agregada a bitácora del sistema indicando:
  - Tiempo de inicio y terminación de sesión
  - Enfermera a cargo
- Usuario cerró sesión exitosamente

TÉCNICA 3: CASOS DE USO
Qué son: Técnica para identificar interacciones entre sistema y actores externos. Ahora parte fundamental de UML.
Relación con escenarios:
Algunos: 1 caso de uso = 1 escenario
Otros: 1 caso de uso = CONJUNTO de escenarios (escenario normal + excepciones)

DIAGRAMA DE CASOS DE USO:
       [👤 Médico]
            |
            | (interactúa con)
            |
    ┌───────┴───────┐
    |               |
[Ver registro]  [Editar registro]
    |               |
    └───────┬───────┘
            |
    [Establece consulta] ← [👤 Médico 2]
            |
    ┌───────┴───────────┬──────────────┐
    |                   |              |
[👤 Enfermera]    [👤 Auxiliar]  [👤 Administrador]
    |                   |              |
[Ver inf. personal] [Registro   [Genera reporte]
                     paciente]   [Exporta estadísticas]
Elementos:
Actores: Figuras humanas (o sistemas externos)
Casos de uso: Elipses con etiqueta
Relaciones: Líneas que conectan actores con casos de uso
Flechas opcionales: Indican quién inicia la interacción

DOCUMENTACIÓN DE CASO DE USO:
CASO DE USO: Establece la consulta

ACTORES:
- Médico iniciador (primario)
- Médico(s) invitado(s) (secundario)

DESCRIPCIÓN:
Permite que dos o más médicos, que trabajan en diferentes 
consultorios, vean el mismo registro simultáneamente.

FLUJO PRINCIPAL:
1. Médico inicia consulta eligiendo a médico(s) involucrado(s) 
   de menú desplegable de médicos en línea.
2. Sistema despliega registro del paciente en pantallas de 
   todos los médicos participantes.
3. Solo el médico que inicia puede editar el registro.
4. Sistema crea ventana de chat de texto para coordinación.
5. [NOTA: Por separado se establece conferencia telefónica 
   para comunicación por voz]

FLUJO ALTERNATIVO:
- Si médico invitado no está en línea → Sistema muestra 
  mensaje de error y permite seleccionar otro médico

PRECONDICIONES:
- Al menos un médico debe estar en línea además del iniciador
- Registro del paciente debe existir y estar accesible

POSTCONDICIONES:
- Todos los médicos participantes tienen acceso al mismo registro
- Historial de consulta queda registrado en bitácora
- Canal de comunicación se cierra al terminar consulta

TÉCNICA 4: ETNOGRAFÍA
Qué es: Técnica de OBSERVACIÓN del trabajo real de las personas en su entorno natural.
Origen: Antropología social
Cómo funciona:
Analista se adentra en el ambiente laboral
Observa el trabajo diario
Toma notas sobre tareas reales
NO interfiere con el trabajo

VALOR DE LA ETNOGRAFÍA:
Descubre requerimientos IMPLÍCITOS que reflejan:
Cómo trabaja la gente REALMENTE
NO cómo dicen que trabajan
NO cómo los procesos formales dicen que deberían trabajar
Ejemplo real - Control de tráfico aéreo:
PROCESO FORMAL:
"Los controladores DEBEN usar el sistema de alerta de 
conflicto en todo momento."

REALIDAD OBSERVADA:
Los controladores DESACTIVAN deliberadamente el sistema 
de alerta cuando permiten que dos aeronaves crucen rutas 
brevemente.

RAZÓN:
Su estrategia de control garantiza que las aeronaves se 
desvíen antes de que haya problemas reales. La alarma 
los distrae de su trabajo.

REQUERIMIENTO DESCUBIERTO:
El sistema de alerta debe tener umbrales configurables 
y permitir silencio temporal por controlador experimentado.

POR QUÉ FUNCIONA:
1. Las personas no pueden articular lo que hacen Es "segunda naturaleza" - lo hacen automáticamente sin pensarlo.
2. Factores sociales y organizacionales invisibles Solo se vuelven claros a observador sin prejuicios.
Ejemplo:
GRUPO DE TRABAJO OBSERVADO:
Miembros se cubren mutuamente durante ausencias sin 
que se lo pidan explícitamente.

ENTREVISTA PREVIA:
Nadie mencionó esto porque no lo ven como parte integral 
de su función - es "lo que se hace".

REQUERIMIENTO DESCUBIERTO:
El sistema debe permitir que cualquier miembro del grupo 
pueda ver y actualizar tareas de otros miembros del mismo 
grupo.

2 TIPOS DE REQUERIMIENTOS QUE ETNOGRAFÍA DESCUBRE:
TIPO 1: Cómo trabaja la gente REALMENTE vs cómo los procesos dicen
TIPO 2: Cooperación y conocimiento de actividades de otros
Ejemplo:
DOMINIO: Control de tráfico aéreo

OBSERVACIÓN:
Controladores usan conocimiento del trabajo de controladores 
en sectores adyacentes para predecir número de aeronaves 
que entrarán a su sector.

ACCIÓN:
Modifican sus estrategias de control dependiendo de la 
carga de trabajo prevista.

REQUERIMIENTO DESCUBIERTO:
Sistema ATC automatizado debe permitir a controladores 
tener visibilidad del trabajo en sectores adyacentes.

LIMITACIONES:
❌ No descubre requerimientos organizacionales Enfoque en usuario final, no en políticas corporativas.
❌ No identifica nuevas características Descubre cómo se hace el trabajo ACTUAL, no cómo podría mejorarse.
❌ No descubre requerimientos de dominio Se enfoca en trabajo cotidiano, no en reglas del dominio.
SOLUCIÓN: Combinar etnografía con otras técnicas (especialmente casos de uso).

ETNOGRAFÍA + PROTOTIPADO:
   ┌─────────────────┐
    │  ANÁLISIS       │
    │  ETNOGRÁFICO    │
    └────────┬────────┘
             ↓
    ┌─────────────────┐
    │  DESARROLLO DEL │
    │  PROTOTIPO      │
    │  GENÉRICO       │
    └────────┬────────┘
             ↓
    ┌─────────────────┐
    │  ETNOGRAFÍA     │
    │  ENFOCADA       │
    │  (con preguntas)│
    └────────┬────────┘
             ↓
    ┌─────────────────┐
    │  EVALUACIÓN     │
    │  DE PROTOTIPOS  │
    └────────┬────────┘
             ↓
    ┌─────────────────┐
    │  DESARROLLO     │
    │  DEL SISTEMA    │
    │  (iterativo)    │
    └─────────────────┘
SINERGIA:
Etnografía informa desarrollo del prototipo → Menos ciclos de refinamiento
Prototipo enfoca etnografía → Identifica problemas y preguntas específicas
Etnógrafo busca respuestas durante siguiente fase de estudio

ACTIVIDAD 3: ESPECIFICACIÓN DE REQUERIMIENTOS
Objetivo: Escribir los requerimientos en un documento formal.
IDEAL:
Claros, sin ambigüedades
Fáciles de entender
Completos
Consistentes
REALIDAD: Difícil de lograr en la práctica.

REQUERIMIENTOS DEL USUARIO:
Audiencia:
Usuarios sin conocimiento técnico detallado
Gerentes
Características:
Lenguaje natural
Tablas y formas sencillas
Diagramas intuitivos
SIN jerga de software
SIN notaciones estructuradas o formales
Contenido:
Comportamiento externo del sistema
Requerimientos no funcionales
NO detalles de arquitectura o diseño

REQUERIMIENTOS DEL SISTEMA:
Audiencia:
Ingenieros de software
Arquitectos del sistema
Características:
Versiones EXTENDIDAS de requerimientos de usuario
Detallan cómo sistema debe proporcionar requerimientos de usuario
Pueden ser parte del CONTRATO de implementación
Especificación completa y detallada de TODO el sistema
Contenido:
Comportamiento externo detallado
Restricciones operacionales
Interfaces entre componentes
A veces, información de diseño inevitable

POR QUÉ A VECES SE INCLUYE DISEÑO:
RAZÓN 1: Arquitectura inicial necesaria para estructurar especificación
RAZÓN 2: Sistemas con arquitectura establecida
Familia de productos con arquitectura común
Requerimientos deben ajustarse a esa arquitectura
RAZÓN 3: Requerimientos de dominio específicos pueden restringir diseño
REALIDAD: Imposible separar completamente requerimientos de diseño en sistemas complejos.

ACTIVIDAD 4: VALIDACIÓN DE REQUERIMIENTOS
Objetivo: Verificar que los requerimientos definan REALMENTE el sistema que quiere el cliente.
IMPORTANCIA CRÍTICA:
Errores en documento de requerimientos → Costos MASIVOS de re-trabajo cuando se descubren durante desarrollo o en servicio.
Costo de arreglar problemas:
Error en requerimientos → Se propaga a:
- Diseño (debe cambiarse)
- Implementación (debe reescribirse)
- Pruebas (deben repetirse)

RESULTADO: Costo 10x-100x mayor que arreglar error de código

5 TIPOS DE COMPROBACIONES:
1. COMPROBACIONES DE VALIDEZ
PREGUNTA:
¿Los usuarios REALMENTE necesitan estas funciones?

PROBLEMA:
Usuario cree que necesita función X.
Con análisis se identifica que en realidad necesita función Y.

EJEMPLO:
Usuario: "Necesito exportar a PDF."
Análisis: Usuario realmente necesita compartir reportes.
Solución real: Compartir vía link, no exportar PDF.

COMPROBACIÓN:
Análisis cuidadoso de necesidades REALES vs percibidas.

2. COMPROBACIONES DE CONSISTENCIA
PREGUNTA:
¿Hay requerimientos en conflicto?

PROBLEMA:
Requerimientos contradictorios o diferentes descripciones 
de la misma función.

EJEMPLO:
REQ-1: "El sistema debe procesar transacciones en <1 segundo."
REQ-2: "El sistema debe ejecutar validación completa de datos 
        que toma 2-3 segundos."

CONFLICTO: Imposible validar completamente en <1 segundo

COMPROBACIÓN:
Revisión cruzada de todos los requerimientos buscando conflictos.

3. COMPROBACIONES DE TOTALIDAD
PREGUNTA:
¿Se definieron TODAS las funciones y restricciones?

PROBLEMA:
Funciones omitidas, casos de uso incompletos, excepciones 
no consideradas.

EJEMPLO:
Sistema de ventas define:
✓ Crear pedido
✓ Procesar pago
✗ Cancelar pedido (FALTA)
✗ Reembolsar pago (FALTA)

COMPROBACIÓN:
Matriz de trazabilidad: cada caso de uso → requerimientos

4. COMPROBACIONES DE REALISMO
PREGUNTA:
¿Los requerimientos pueden implementarse con tecnología, 
presupuesto y tiempo disponibles?

PROBLEMA:
Requerimientos técnicamente imposibles o económicamente 
inviables.

EJEMPLO:
REQ: "El sistema debe procesar 1 millón de transacciones/segundo."

ANÁLISIS:
- Hardware disponible: máx 100,000 transacciones/segundo
- Presupuesto: $50,000
- Tiempo: 3 meses

REALISMO: IMPOSIBLE con restricciones actuales

COMPROBACIÓN:
Verificar con expertos técnicos, hacer prototipos de riesgo.

5. COMPROBACIONES DE VERIFICABILIDAD
PREGUNTA:
¿Puedes escribir pruebas que demuestren que el sistema 
cumple cada requerimiento?

PROBLEMA:
Requerimientos vagos que no pueden probarse objetivamente.

EJEMPLO:
❌ NO VERIFICABLE:
"El sistema debe ser fácil de usar."

PREGUNTA: ¿Cómo pruebas "fácil de usar"?

✅ VERIFICABLE:
"Después de 4 horas de capacitación, el 90% de los usuarios 
completará la tarea X en menos de 2 minutos."

PRUEBA: Cronometrar 10 usuarios capacitados haciendo tarea X.

COMPROBACIÓN:
Intentar escribir casos de prueba para cada requerimiento.

3 TÉCNICAS DE VALIDACIÓN:
TÉCNICA DE VALIDACIÓN 1: REVISIONES DE REQUERIMIENTOS
Qué es: Grupo de personas del cliente y desarrollador leen detalladamente el documento buscando errores, anomalías e inconsistencias.
Participantes:
Clientes del sistema
Desarrolladores del sistema
Usuarios finales (representantes)
Gerentes de proyecto
Expertos de dominio

PROCESO:
PREPARACIÓN (Antes de revisión):
1. Distribuir documento de requerimientos
2. Asignar secciones a revisores
3. Revisores leen y anotan problemas

REUNIÓN DE REVISIÓN:
1. Presentación de cada sección
2. Discusión de problemas encontrados
3. Registro de problemas
4. NO resolver problemas en la reunión (toma mucho tiempo)

DESPUÉS DE REVISIÓN:
1. Cliente y desarrollador negocian cómo resolver problemas
2. Se actualizan requerimientos
3. Nueva revisión si cambios son significativos

QUÉ BUSCAR EN REVISIÓN:
Tipo de error
Qué buscar
Ejemplo
Verificabilidad
Requerimientos que no pueden probarse
"El sistema debe ser rápido"
Comprensibilidad
Requerimientos que los stakeholders no entienden
Jerga técnica excesiva
Trazabilidad
Origen del requerimiento no claro
¿De dónde vino este requerimiento?
Adaptabilidad
Requerimientos que será difícil modificar
Diseño muy específico embebido
Conflictos
Requerimientos contradictorios
Velocidad vs precisión
Omisiones
Funciones faltantes
Olvidaron función de cancelación
Inconsistencias
Mismo concepto descrito diferente
"Usuario" vs "Operador"
Ambigüedades
Múltiples interpretaciones posibles
"Buscar todas las clínicas"


TÉCNICA DE VALIDACIÓN 2: PROTOTIPADO
Qué es: Modelo ejecutable del sistema que usuarios pueden experimentar.
Objetivo: Usuarios experimentan con prototipo para verificar que cubre necesidades REALES.
Por qué funciona: Usuarios entienden mejor software funcionando que documentos abstractos.

USO EN VALIDACIÓN:
ANTES DEL PROTOTIPO:
Requerimiento: "El sistema debe permitir búsqueda avanzada."

Usuario lee: "Sí, eso es lo que necesito." ✓

DESPUÉS DE USAR PROTOTIPO:
Usuario: "Ah, pensé que podría filtrar por múltiples 
         criterios simultáneamente. Esto solo permite 
         un filtro a la vez."

PROBLEMA DESCUBIERTO: Requerimiento ambiguo

PROCESO DE VALIDACIÓN CON PROTOTIPOS:
1. DESARROLLAR PROTOTIPO
   - Enfocado en áreas de riesgo/incertidumbre
   - Desarrollo rápido (días, no meses)

2. DEMOSTRAR A USUARIOS
   - Capacitación mínima
   - Usar datos reales
   - Ambiente realista

3. USUARIOS EXPERIMENTAN
   - Ejecutar tareas reales
   - Explorar funcionalidad
   - Probar casos extremos

4. RECOPILAR FEEDBACK
   - ¿Qué funciona bien?
   - ¿Qué falta?
   - ¿Qué es confuso?
   - ¿Qué es incorrecto?

5. REFINAR REQUERIMIENTOS
   - Actualizar documento
   - Resolver ambigüedades
   - Agregar funciones faltantes
   - Eliminar funciones innecesarias

6. ITERAR SI NECESARIO

ADVERTENCIA:
El prototipo debe usarse en forma REALISTA:
Usuarios representativos (no solo gerentes)
Tiempo suficiente de capacitación
Tareas reales (no demostraciones guiadas)
Si prototipo es lento, usuarios ajustan su comportamiento → validación incorrecta

TÉCNICA DE VALIDACIÓN 3: GENERACIÓN DE CASOS DE PRUEBA
Qué es: Diseñar pruebas para requerimientos ANTES de implementar.
Por qué funciona:
Si prueba es difícil de diseñar → Requerimiento es difícil de implementar
Si prueba es imposible de diseñar → Requerimiento no es verificable
BENEFICIOS:
Revela problemas temprano
Aclara requerimientos ambiguos
Identifica requerimientos imposibles
Pruebas listas para usar después

PROCESO:
Para cada requerimiento:

1. IDENTIFICAR CONDICIONES DE PRUEBA
   ¿Qué debe verificarse?

2. DISEÑAR DATOS DE ENTRADA
   ¿Qué inputs se usarán?

3. DEFINIR SALIDAS ESPERADAS
   ¿Qué debe producir el sistema?

4. ESPECIFICAR PRECONDICIONES
   ¿Qué debe ser cierto antes de la prueba?

5. ESPECIFICAR POSTCONDICIONES
   ¿Qué debe ser cierto después?

SI DIFÍCIL DE HACER → Requerimiento problemático

EJEMPLO:
REQUERIMIENTO:
"Después de 4 horas de capacitación, los usuarios 
experimentados no superarán 2 errores/hora de uso."

CASOS DE PRUEBA:

PRUEBA 1: Verificar conteo de errores
- Seleccionar 10 usuarios representativos
- Proporcionar 4 horas de capacitación estándar
- Usuarios usan sistema durante 1 hora
- Sistema registra cada error cometido
- CRITERIO ÉXITO: Cada usuario ≤ 2 errores

PRUEBA 2: Verificar instrumentación
- Inyectar errores conocidos durante uso
- CRITERIO ÉXITO: Sistema detecta y registra todos 
  los errores inyectados

DISEÑAR ESTAS PRUEBAS ES FÁCIL → Requerimiento 
es verificable ✓
Contraste con:
REQUERIMIENTO:
"El sistema debe ser fácil de usar."

INTENTAR DISEÑAR CASO DE PRUEBA:
- ¿Qué mido?
- ¿Qué es "fácil"?
- ¿Para quién?
- ¿Cómo se pasa/falla la prueba?

DISEÑAR PRUEBA ES IMPOSIBLE → Requerimiento no 
es verificable ✗

ACCIÓN: Reescribir requerimiento

INTEGRACIÓN CON XP:
En Programación Extrema (Capítulo 3):
Desarrollo de PRIMERA prueba
Pruebas se escriben ANTES del código
Misma idea aplicada a nivel de requerimientos

REALIDAD DE LA VALIDACIÓN
VERDAD INCÓMODA:
Es difícil demostrar que un conjunto de requerimientos cubre completamente las necesidades de los usuarios.
POR QUÉ:
Usuarios necesitan imagen del sistema en operación
Difícil visualizar solo con documentos
Necesitan experiencia con sistema funcionando
Difícil hacer análisis abstracto
Incluso profesionales experimentados tienen dificultad
Usuarios finales casi imposible
Problemas solo aparecen en contexto real
Algunos requerimientos solo tienen sentido cuando sistema está en uso
Interacciones entre requerimientos son complejas
RESULTADO INEVITABLE:
SIEMPRE habrá cambios en requerimientos después de acordar el documento, para corregir omisiones y malas interpretaciones.
IMPLICACIÓN:
Planear para cambios desde el inicio
Tener proceso de gestión de cambios
No penalizar cambios razonables
Documento de requerimientos NO es final inmutable

🔧 ADMINISTRACIÓN DE REQUERIMIENTOS
POR QUÉ CAMBIAN LOS REQUERIMIENTOS
VERDAD FUNDAMENTAL:
Los requerimientos para sistemas grandes SIEMPRE cambian.
RAZÓN PRINCIPAL: Problemas "horrorosos"
Problemas que NO pueden definirse completamente
Comprensión del problema cambia durante desarrollo
Requerimientos evolucionan para reflejar comprensión cambiante
   INICIO DEL PROYECTO
          ↓
    Comprensión inicial del problema
          ↓
    Requerimientos iniciales
          ↓
    [DURANTE DESARROLLO]
          ↓
    Cambio en comprensión del problema
          ↓
    Cambio en requerimientos
          ↓
    [CONTINÚA EVOLUCIONANDO]

OTRAS RAZONES PARA CAMBIOS:
1. Cambios empresariales
Empresa fusiona con competidor
→ Necesidad de integrar con sus sistemas
→ Nuevos requerimientos de integración
2. Cambios organizacionales
Reestructuración de departamentos
→ Cambios en flujos de trabajo
→ Nuevos requerimientos de proceso
3. Cambios técnicos
Nueva tecnología disponible
→ Oportunidad de mejorar sistema
→ Requerimientos adicionales de funcionalidad
4. Cambios de hardware
Migración a cloud
→ Diferentes restricciones de hardware
→ Nuevos requerimientos no funcionales
5. Cambios regulatorios
Nueva ley de privacidad
→ Cumplimiento obligatorio
→ Nuevos requerimientos de seguridad
6. Cambios en prioridades de gerencia
Nuevo CEO con visión diferente
→ Cambio en objetivos estratégicos
→ Requerimientos repriorizados
7. Mejora en comprensión
Usuarios usan sistema
→ Descubren que necesitan algo diferente
→ Modificación de requerimientos existentes

ADMINISTRACIÓN DE REQUERIMIENTOS
Qué es: Proceso de gestionar y controlar cambios en requerimientos.
CUANDO APLICAR:
Después de APROBAR el documento de requerimientos.
Antes de aprobación → Cambios son normales (parte de adquisición) Después de aprobación → Cambios deben administrarse formalmente

4 FUNDAMENTOS DE ADMINISTRACIÓN:
FUNDAMENTO 1: IDENTIFICACIÓN DE REQUERIMIENTOS
Objetivo: Cada requerimiento debe tener identificador ÚNICO.
Formato común:
[SISTEMA]-[TIPO]-[NÚMERO]

Ejemplos:
MHC-FR-042  (MHC, Funcional, #42)
MHC-NFR-015 (MHC, No Funcional, #15)
MHC-UI-023  (MHC, Interfaz Usuario, #23)
PROPÓSITO:
Referencias cruzadas entre requerimientos
Trazabilidad con diseño e implementación
Seguimiento de cambios
Comunicación clara entre stakeholders

FUNDAMENTO 2: PROCESO DE ADMINISTRACIÓN DEL CAMBIO
Objetivo: Evaluar efecto y costo de cambios ANTES de implementarlos.
PROCESO (3 ETAPAS):
ETAPA 1: ANÁLISIS DEL PROBLEMA Y ESPECIFICACIÓN DEL CAMBIO

Input: Identificación de problema o propuesta de cambio

Actividades:
1. Analizar si el problema/propuesta es válida
2. Verificar que es realmente necesario
3. Determinar alcance del problema
4. Especificar cambio propuesto con precisión

Output: Especificación detallada del cambio propuesto
        O decisión de retirar la petición

        ↓

ETAPA 2: ANÁLISIS DEL CAMBIO Y ESTIMACIÓN DEL COSTO

Input: Especificación del cambio propuesto

Actividades:
1. Evaluar efecto usando información de trazabilidad
2. Identificar qué otros requerimientos se afectan
3. Identificar qué partes del diseño se afectan
4. Identificar qué código debe cambiarse
5. Estimar costo de realizar el cambio:
   - Modificación del documento de requerimientos
   - Modificación del diseño
   - Modificación de la implementación
   - Re-testing
6. Estimar tiempo necesario

Output: Análisis de impacto y estimación de costo

        ↓

DECISIÓN:
¿Los beneficios justifican los costos?

SI → Proceder a Etapa 3
NO → Rechazar cambio

        ↓

ETAPA 3: IMPLEMENTACIÓN DEL CAMBIO

Input: Cambio aprobado

Actividades:
1. Modificar documento de requerimientos
2. Modificar diseño del sistema (si necesario)
3. Modificar implementación (si necesario)
4. Actualizar casos de prueba
5. Ejecutar pruebas de regresión
6. Documentar cambios realizados

Output: Sistema actualizado con cambio implementado
        Documento de requerimientos actualizado

EJEMPLO DE CAMBIO:
ETAPA 1: ANÁLISIS DEL PROBLEMA

Problema identificado:
"Usuarios no pueden exportar reportes a Excel."

Análisis:
- ¿Es válido? Sí, múltiples usuarios lo solicitaron
- ¿Es necesario? Sí, actualmente copian datos manualmente
- Alcance: Aplica a todos los reportes del sistema

Cambio propuesto:
"Agregar botón 'Exportar a Excel' en todos los reportes 
que genere datos tabulares en formato .xlsx compatible 
con Excel 2016+."

        ↓

ETAPA 2: ANÁLISIS Y COSTO

Impacto:
- Documento requerimientos: Agregar REQ-NFR-087
- Diseño: Modificar módulo de reportes (2 clases)
- Implementación: 
  - Agregar librería Apache POI
  - Implementar exportador Excel (nueva clase)
  - Modificar UI de reportes (8 pantallas)
- Pruebas: 
  - Nuevos casos de prueba (20 casos)
  - Regresión de reportes (50 casos existentes)

Estimación:
- Análisis y diseño: 8 horas
- Implementación: 40 horas
- Pruebas: 24 horas
- Documentación: 4 horas
TOTAL: 76 horas = ~10 días

Costo: $7,600 (@ $100/hora)

Beneficio:
- Ahorro de 2 horas/semana para 20 usuarios
- = 40 horas/semana × $50/hora = $2,000/semana ahorro
- ROI: 3.8 semanas

DECISIÓN: APROBAR (beneficio justifica costo)

        ↓

ETAPA 3: IMPLEMENTACIÓN

[Cambios realizados según plan]

Resultado:
✓ REQ-NFR-087 agregado a documento
✓ Módulo exportador implementado
✓ UI actualizada
✓ Pruebas pasadas
✓ Documentación actualizada
✓ Cambio desplegado en producción

VENTAJA DE PROCESO FORMAL:
Todos los cambios tratados consistentemente
Cambios al documento en forma controlada
Evita cambios impulsivos
Justificación documentada de decisiones

FUNDAMENTO 3: POLÍTICAS DE TRAZABILIDAD
Qué es: Define RELACIONES entre requerimientos y entre requerimientos y diseño.
TIPOS DE TRAZABILIDAD:
1. Trazabilidad horizontal (entre requerimientos):
REQ-USER-001 "Usuario puede buscar paciente"
    ↓ se descompone en
REQ-SYS-015 "Sistema permite búsqueda por nombre"
REQ-SYS-016 "Sistema permite búsqueda por ID"
REQ-SYS-017 "Sistema permite búsqueda por fecha nacimiento"
2. Trazabilidad vertical (requerimientos → diseño):
REQ-SYS-015 "Sistema permite búsqueda por nombre"
    ↓ implementado por
MÓDULO: SearchEngine
CLASE: PatientNameSearcher
MÉTODO: searchByName(String name)
3. Trazabilidad hacia atrás (requerimiento → fuente):
REQ-NFR-042 "Cumplir GDPR"
    ↓ proviene de
REGULACIÓN: General Data Protection Regulation (EU)
STAKEHOLDER: Oficial de Privacidad
DOCUMENTO: Análisis legal #2023-45
4. Trazabilidad hacia adelante (requerimiento → pruebas):
REQ-SYS-015 "Sistema permite búsqueda por nombre"
    ↓ verificado por
TEST-001: "Búsqueda nombre exacto"
TEST-002: "Búsqueda nombre parcial"
TEST-003: "Búsqueda sin resultados"
TEST-004: "Búsqueda con múltiples resultados"

MATRIZ DE TRAZABILIDAD (Ejemplo):
Req Usuario
Req Sistema
Módulo
Casos Prueba
USER-001
SYS-015, SYS-016, SYS-017
SearchEngine
TEST-001 a TEST-009
USER-002
SYS-018, SYS-019
ReportGenerator
TEST-010 a TEST-015


BENEFICIOS:
Análisis de impacto:
CAMBIO PROPUESTO: Modificar REQ-SYS-015

VÍA TRAZABILIDAD SE DESCUBRE:
- Afecta USER-001 (requerimiento de usuario)
- Afecta módulo SearchEngine
- Requiere modificar 4 casos de prueba
- Impacta otros 3 requerimientos relacionados

ESTIMACIÓN MÁS PRECISA DE COSTO
Verificación de completitud:
PREGUNTA: ¿Todos los requerimientos están implementados?

RESPUESTA VÍA MATRIZ:
✓ USER-001 → Implementado en SearchEngine
✗ USER-003 → SIN MÓDULO ASIGNADO ← PROBLEMA

DESCUBRE REQUERIMIENTO NO IMPLEMENTADO
Mantenimiento:
PREGUNTA: ¿Por qué existe esta clase?

RESPUESTA VÍA TRAZABILIDAD:
Clase: PatientNameSearcher
    ← Implementa REQ-SYS-015
    ← Que proviene de USER-001
    ← Solicitado por Departamento Admisiones
    ← Para reducir errores de identificación

CONTEXTO COMPLETO DISPONIBLE

FUNDAMENTO 4: HERRAMIENTAS DE APOYO
Por qué necesarias:
Gran cantidad de información sobre requerimientos
Múltiples relaciones entre requerimientos
Cambios frecuentes
Múltiples stakeholders
FUNCIONES QUE DEBEN SOPORTAR:
1. Almacenamiento de requerimientos
Características:
- Base de datos centralizada
- Acceso controlado por roles
- Versionamiento automático
- Backup y recuperación
- Búsqueda y filtrado
- Exportación a documentos
2. Administración del cambio
Características:
- Flujo de trabajo de cambios
- Registro de propuestas
- Análisis de impacto automatizado
- Aprobaciones/rechazos
- Notificaciones a stakeholders
- Historial de cambios
3. Administración de trazabilidad
Características:
- Creación de vínculos entre requerimientos
- Visualización de dependencias
- Análisis de impacto
- Detección de requerimientos huérfanos
- Matrices de trazabilidad
- Reportes de cobertura

OPCIONES DE HERRAMIENTAS:
Para sistemas PEQUEÑOS:
Procesadores de texto (Word con plantillas)
Hojas de cálculo (Excel con macros)
Bases de datos simples (Access)
Control de versiones (Git con Markdown)
Para sistemas MEDIANOS:
Jira + Confluence
Azure DevOps
Trello con power-ups
Notion
Para sistemas GRANDES:
IBM Rational DOORS
Jama Software
Polarion
Enterprise Architect
Codebeamer

CAMBIOS DE EMERGENCIA
PROBLEMA: A veces hay que modificar software ANTES de aprobar cambios a requerimientos (emergencias).
RIESGO: Requerimientos y código se salen de sincronía.

PROCESO PARA CAMBIOS DE EMERGENCIA:
1. EMERGENCIA IDENTIFICADA
   ↓
2. ANÁLISIS RÁPIDO DE IMPACTO
   - ¿Qué requerimientos afecta?
   - ¿Qué código debe cambiarse?
   - ¿Qué riesgos hay?
   ↓
3. APROBACIÓN DE EMERGENCIA
   - Gerente técnico
   - Cliente (si afecta funcionalidad)
   - Solo cambios mínimos necesarios
   ↓
4. IMPLEMENTACIÓN URGENTE
   - Hacer cambios en código
   - DOCUMENTAR cambios detalladamente
   - Desplegar a producción
   ↓
5. ACTUALIZACIÓN RETROSPECTIVA DE REQUERIMIENTOS
   - Crear propuesta formal de cambio
   - Pasar por proceso normal de cambio
   - Actualizar documento de requerimientos
   - Verificar consistencia código-requerimientos
   ↓
6. REVISIÓN POST-EMERGENCIA
   - ¿Se pudo haber evitado?
   - ¿Proceso funcionó bien?
   - Lecciones aprendidas
REGLA CRÍTICA:
SIEMPRE actualizar documento de requerimientos RETROSPECTIVAMENTE, incluso si cambio ya está en producción.
Evitar:
❌ "Ya está en producción, olvidemos los requerimientos"
❌ "Es solo un cambio pequeño, no vale la pena documentar"
❌ "Actualizaremos requerimientos después" (nunca pasa)

💡 REGLAS DE ORO DEL CAPÍTULO
1. REQUERIMIENTOS ≠ DISEÑO
Requerimientos dicen QUÉ, diseño dice CÓMO. Mantener separación es crítico.
2. AMBIGÜEDAD ES EL ENEMIGO #1
Lenguaje natural es inherentemente ambiguo. Formato estándar + ejemplos + criterios de aceptación.
3. NO FUNCIONALES SON TAN IMPORTANTES COMO FUNCIONALES
A menudo MÁS importantes. Sistema sin funcionalidad puede compensarse, sistema lento/no confiable es inútil.
4. STAKEHOLDERS NO SABEN LO QUE QUIEREN
Hasta que lo ven. Prototipos y escenarios son esenciales.
5. VALIDACIÓN ≠ VERIFICACIÓN
Validación = ¿Construimos el sistema CORRECTO? Verificación = ¿Construimos el sistema CORRECTAMENTE?
6. CAMBIOS SON INEVITABLES
No luches contra cambios - administra los. Sistema de gestión de cambios desde día 1.
7. TRAZABILIDAD NO ES OPCIONAL
Para sistemas grandes, trazabilidad es la ÚNICA forma de administrar complejidad.
8. DOCUMENTAR NO ES SUFICIENTE
Documentos no se leen. Complementar con prototipos, casos de uso, escenarios, demos.
9. MÚLTIPLES PERSPECTIVAS SON ESENCIALES
Entrevistas + Observación + Escenarios + Casos de uso + Etnografía. Una técnica sola NO es suficiente.
10. COSTO DE ARREGLAR ERRORES CRECE EXPONENCIALMENTE
Error en requerimientos descubierto después de deployment = 100x más costoso que durante adquisición.
11. VERIFICABILIDAD ES NO NEGOCIABLE
Si no puedes escribir caso de prueba para un requerimiento, el requerimiento está mal.
12. METAS ≠ REQUERIMIENTOS
Convierte metas vagas ("fácil de usar") en requerimientos medibles ("2 errores/hora después de 4h capacitación").

⚠️ ERRORES COMUNES Y CÓMO EVITARLOS
ERROR 1: Confundir requerimientos con soluciones
❌ MAL (solución):
"El sistema usará base de datos MySQL para almacenar datos."

✅ BIEN (requerimiento):
"El sistema debe almacenar datos de pacientes de forma 
persistente y permitir consultas concurrentes."

RAZÓN: MySQL es decisión de diseño, no requerimiento.

ERROR 2: Requerimientos ambiguos
❌ MAL:
"El sistema debe ser rápido."

✅ BIEN:
"El sistema debe responder a consultas de búsqueda en 
menos de 2 segundos para el 95% de las consultas con 
hasta 10,000 registros."

ERROR 3: Mezclar funcionales con no funcionales
❌ MAL:
"El sistema debe autenticar usuarios y hacerlo en menos 
de 1 segundo."

✅ BIEN:
FUNCIONAL: "El sistema debe autenticar usuarios mediante 
            usuario y contraseña."
NO FUNCIONAL: "La autenticación debe completarse en menos 
               de 1 segundo."

ERROR 4: No involucrar usuarios reales
❌ MAL:
Solo entrevistar a gerentes que no usan el sistema.

✅ BIEN:
Entrevistar Y observar a usuarios finales que usarán 
el sistema diariamente.

ERROR 5: Documento de requerimientos como contrato inmutable
❌ MAL:
"El documento está firmado. NO se permiten cambios."

✅ BIEN:
"El documento refleja nuestra mejor comprensión actual.
Los cambios se administrarán formalmente pero son esperados."

ERROR 6: Ignorar requerimientos no funcionales
❌ MAL:
Enfocarse solo en funcionalidad, ignorar rendimiento, 
seguridad, usabilidad.

✅ BIEN:
Definir requerimientos no funcionales ANTES de diseñar.
Son restricciones arquitectónicas críticas.

ERROR 7: No priorizar requerimientos
❌ MAL:
Todos los requerimientos son "críticos" y "alta prioridad".

✅ BIEN:
MoSCoW: Must have, Should have, Could have, Won't have
O: Alta (30%), Media (50%), Baja (20%)

ERROR 8: Requerimientos sin criterios de aceptación
❌ MAL:
"El sistema debe generar reportes."

✅ BIEN:
"El sistema debe generar reportes.
CRITERIO: Reporte contiene todos los campos especificados,
          datos son precisos (verificado contra DB),
          formato cumple plantilla corporativa."

ERROR 9: No usar escenarios
❌ MAL:
Solo lista de requerimientos sin contexto.

✅ BIEN:
Requerimiento + Escenario que muestra cómo se usa 
en situación real.

ERROR 10: Cambios sin análisis de impacto
❌ MAL:
"Cambio pequeño, solo hazlo."

✅ BIEN:
1. Analizar qué requerimientos afecta
2. Analizar qué diseño/código afecta
3. Estimar costo
4. Aprobar/rechazar basado en análisis
5. Implementar si aprobado
6. Actualizar trazabilidad

✅ CHECKLIST DE IMPLEMENTACIÓN
FASE 1: PREPARACIÓN
Antes de comenzar ingeniería de requerimientos:
¿Estudio de factibilidad completado?
¿Sistema alineado con objetivos organizacionales?
¿Presupuesto y tiempo realistas?
¿Tecnología actual puede soportar el sistema?
¿Stakeholders identificados?
¿Herramientas de gestión de requerimientos seleccionadas?

FASE 2: ADQUISICIÓN
Descubrimiento de requerimientos:
¿Entrevistas programadas con stakeholders clave?
¿Usuarios finales identificados y accesibles?
¿Observación etnográfica planificada (si apropiado)?
¿Escenarios de usuario documentados?
¿Casos de uso identificados?
¿Prototipos planificados para áreas de riesgo?
Clasificación y organización:
¿Requerimientos agrupados por subsistema?
¿Arquitectura preliminar definida?
¿Requerimientos categorizados (funcional/no funcional)?
Priorización y negociación:
¿Conflictos entre stakeholders identificados?
¿Requerimientos priorizados (MoSCoW o similar)?
¿Negociaciones documentadas?
¿Compromisos acordados?

FASE 3: ESPECIFICACIÓN
Documento de requerimientos:
¿Estructura de documento definida?
¿Glosario de términos creado?
¿Requerimientos de usuario en lenguaje natural?
¿Requerimientos de sistema detallados?
¿Cada requerimiento tiene ID único?
¿Criterios de aceptación definidos para cada requerimiento?
¿Modelos del sistema (casos de uso, diagramas) incluidos?
¿Requerimientos no funcionales cuantificados?
¿Suposiciones documentadas?
Calidad de requerimientos:
¿Cada requerimiento es claro y sin ambigüedades?
¿Cada requerimiento es completo?
¿Requerimientos son consistentes entre sí?
¿Cada requerimiento es verificable (testeable)?
¿Requerimientos trazables a su fuente?

FASE 4: VALIDACIÓN
Revisiones:
¿Revisión de requerimientos programada?
¿Participantes apropiados identificados?
¿Material de revisión distribuido con anticipación?
¿Problemas encontrados documentados?
¿Plan de resolución de problemas creado?
Prototipado:
¿Prototipos desarrollados para áreas de incertidumbre?
¿Usuarios experimentan con prototipos?
¿Feedback recopilado y analizado?
¿Requerimientos actualizados basados en feedback?
Casos de prueba:
¿Casos de prueba diseñados para requerimientos críticos?
¿Requerimientos no verificables identificados?
¿Requerimientos no verificables reescritos?

FASE 5: GESTIÓN DE CAMBIOS
Sistema de gestión:
¿Proceso de gestión de cambios definido?
¿Plantilla de propuesta de cambio creada?
¿Responsables de aprobación identificados?
¿Herramienta de gestión de cambios configurada?
Trazabilidad:
¿Matriz de trazabilidad creada?
¿Vínculos requerimientos-diseño documentados?
¿Vínculos requerimientos-pruebas documentados?
¿Sistema de actualización de trazabilidad establecido?

📊 PLANTILLAS Y HERRAMIENTAS
PLANTILLA 1: REQUERIMIENTO ESTÁNDAR
┌──────────────────────────────────────────────────┐
│ REQ-[TIPO]-[NÚMERO]: [Título breve]             │
├──────────────────────────────────────────────────┤
│                                                  │
│ CATEGORÍA: □ Funcional □ No Funcional           │
│            □ Del producto □ De la organización  │
│            □ Externo                             │
│                                                  │
│ PRIORIDAD: □ Alta □ Media □ Baja                │
│            □ Must □ Should □ Could □ Won't      │
│                                                  │
│ DEFINICIÓN:                                      │
│ [Enunciado claro en 1-2 líneas de lo que el     │
│  sistema debe hacer o restricción que debe      │
│  cumplir]                                        │
│                                                  │
│ EXPLICACIÓN DETALLADA:                           │
│ [Interpretación más completa del requerimiento. │
│  Incluir contexto, detalles técnicos si          │
│  necesario, excepciones]                         │
│                                                  │
│ EJEMPLO/ESCENARIO:                               │
│ [Situación concreta que ilustra el              │
│  requerimiento en uso]                           │
│                                                  │
│ CRITERIOS DE ACEPTACIÓN:                         │
│ 1. [Criterio verificable #1]                     │
│ 2. [Criterio verificable #2]                     │
│ 3. [Criterio verificable #3]                     │
│                                                  │
│ MÉTRICAS (si aplicable):                         │
│ - [Métrica cuantificable con valor objetivo]    │
│                                                  │
│ REFERENCIAS:                                     │
│ - Fuente: [Stakeholder, documento, regulación]  │
│ - Relacionado con: [IDs de requerimientos]      │
│ - Derivado de: [ID requerimiento de usuario]    │
│                                                  │
│ TRAZABILIDAD:                                    │
│ - Implementado en: [Módulo/Componente]          │
│ - Verificado por: [IDs de casos de prueba]      │
│                                                  │
│ NOTAS:                                           │
│ [Información adicional, supuestos, limitaciones]│
│                                                  │
│ HISTORIAL DE CAMBIOS:                            │
│ v1.0 - 2024-01-15 - Creación inicial            │
│ v1.1 - 2024-02-10 - Aclaración de criterios     │
│                                                  │
└──────────────────────────────────────────────────┘

PLANTILLA 2: ESCENARIO DE USO
┌──────────────────────────────────────────────────┐
│ ESCENARIO #[NÚM]: [Título descriptivo]          │
├──────────────────────────────────────────────────┤
│                                                  │
│ ACTORES:                                         │
│ - Principal: [Actor que inicia escenario]        │
│ - Secundarios: [Otros actores involucrados]      │
│                                                  │
│ OBJETIVO:                                        │
│ [Qué trata de lograr el actor principal]        │
│                                                  │
│ PRECONDICIONES:                                  │
│ 1. [Estado requerido antes de iniciar]          │
│ 2. [Datos que deben existir]                    │
│ 3. [Permisos necesarios]                         │
│                                                  │
│ FLUJO NORMAL:                                    │
│ 1. Actor [acción]                                │
│ 2. Sistema [respuesta]                           │
│ 3. Actor [acción]                                │
│ 4. Sistema [respuesta]                           │
│ 5. ...                                           │
│                                                  │
│ FLUJOS ALTERNATIVOS:                             │
│ A1. [En paso X, si condición]                    │
│     1. Sistema [acción alternativa]              │
│     2. Continúa en paso Y                        │
│                                                  │
│ A2. [En paso Z, si otra condición]               │
│     1. Sistema [otra acción]                     │
│     2. Termina escenario                         │
│                                                  │
│ QUÉ PUEDE SALIR MAL:                             │
│ E1. [Excepción 1]                                │
│     - Cómo se maneja                             │
│     - Resultado                                  │
│                                                  │
│ E2. [Excepción 2]                                │
│     - Cómo se maneja                             │
│     - Resultado                                  │
│                                                  │
│ POSTCONDICIONES:                                 │
│ - Éxito: [Estado del sistema si todo funciona]  │
│ - Fallo: [Estado del sistema si falla]          │
│                                                  │
│ REQUERIMIENTOS RELACIONADOS:                     │
│ [Lista de IDs de requerimientos que este         │
│  escenario ayuda a validar]                      │
│                                                  │
│ NOTAS:                                           │
│ [Información adicional, supuestos especiales]    │
│                                                  │
└──────────────────────────────────────────────────┘

PLANTILLA 3: PROPUESTA DE CAMBIO DE REQUERIMIENTO
┌──────────────────────────────────────────────────┐
│ PROPUESTA DE CAMBIO #[NÚM]                      │
│ Fecha: [YYYY-MM-DD]                              │
│ Solicitante: [Nombre, Rol]                       │
├──────────────────────────────────────────────────┤
│                                                  │
│ TIPO DE CAMBIO:                                  │
│ □ Nuevo requerimiento                            │
│ □ Modificación de requerimiento existente        │
│ □ Eliminación de requerimiento                   │
│ □ Aclaración/Corrección                          │
│                                                  │
│ PRIORIDAD SOLICITADA:                            │
│ □ Crítica (bloqueante)                           │
│ □ Alta                                           │
│ □ Media                                          │
│ □ Baja                                           │
│                                                  │
│ DESCRIPCIÓN DEL PROBLEMA:                        │
│ [¿Por qué se necesita este cambio? ¿Qué          │
│  problema resuelve?]                             │
│                                                  │
│ CAMBIO PROPUESTO:                                │
│ [Descripción detallada del cambio solicitado]   │
│                                                  │
│ REQUERIMIENTOS AFECTADOS:                        │
│ - [REQ-XXX]: [Cómo se afecta]                    │
│ - [REQ-YYY]: [Cómo se afecta]                    │
│                                                  │
│ ========== ANÁLISIS (Llenado por equipo) ======= │
│                                                  │
│ IMPACTO EN DISEÑO:                               │
│ [Qué componentes/módulos se afectan]             │
│                                                  │
│ IMPACTO EN IMPLEMENTACIÓN:                       │
│ [Qué código debe modificarse]                    │
│                                                  │
│ IMPACTO EN PRUEBAS:                              │
│ [Qué pruebas deben modificarse/agregarse]        │
│                                                  │
│ ESTIMACIÓN DE ESFUERZO:                          │
│ - Análisis: [X horas]                            │
│ - Diseño: [Y horas]                              │
│ - Implementación: [Z horas]                      │
│ - Pruebas: [W horas]                             │
│ - Documentación: [V horas]                       │
│ TOTAL: [XX horas] = [YY días]                    │
│                                                  │
│ COSTO ESTIMADO: $[XXXXX]                         │
│                                                  │
│ BENEFICIO ESPERADO:                              │
│ [Cuantificación del beneficio]                   │
│                                                  │
│ ROI: [Tiempo de retorno de inversión]            │
│                                                  │
│ RIESGOS:                                         │
│ 1. [Riesgo 1]                                    │
│ 2. [Riesgo 2]                                    │
│                                                  │
│ ALTERNATIVAS CONSIDERADAS:                       │
│ 1. [Alternativa 1 - pros/cons]                   │
│ 2. [Alternativa 2 - pros/cons]                   │
│                                                  │
│ RECOMENDACIÓN:                                   │
│ □ Aprobar                                        │
│ □ Rechazar                                       │
│ □ Diferir                                        │
│ □ Requiere más información                       │
│                                                  │
│ Justificación:                                   │
│ [Explicación de recomendación]                   │
│                                                  │
│ ========== DECISIÓN ============================  │
│                                                  │
│ DECISIÓN FINAL:                                  │
│ □ Aprobado                                       │
│ □ Rechazado                                      │
│ □ Diferido hasta [fecha]                         │
│                                                  │
│ Autorizado por: [Nombre, Firma, Fecha]           │
│                                                  │
│ Condiciones/Notas:                               │
│ [Cualquier condición para implementación]        │
│                                                  │
└──────────────────────────────────────────────────┘

MATRIZ DE TRAZABILIDAD
┌─────────────────────────────────────────────────────────┐
│ MATRIZ DE TRAZABILIDAD - PROYECTO [NOMBRE]             │
│ Fecha: [YYYY-MM-DD]                                     │
├─────────────────────────────────────────────────────────┤

| Req Usuario | Req Sistema | Módulo/Componente | Casos Prueba | Estado |
|-------------|-------------|-------------------|--------------|--------|
| USER-001    | SYS-015     | SearchEngine      | TEST-001     | ✓ Impl |
|             | SYS-016     | SearchEngine      | TEST-002     | ✓ Impl |
|             | SYS-017     | SearchEngine      | TEST-003     | ✓ Impl |
|-------------|-------------|-------------------|--------------|--------|
| USER-002    | SYS-018     | ReportGen         | TEST-010     | ✓ Impl |
|             | SYS-019     | ReportGen         | TEST-011     | ✓ Impl |
|             |             |                   | TEST-012     | ✓ Impl |
|-------------|-------------|-------------------|--------------|--------|
| USER-003    | SYS-020     | [PENDIENTE]       | [PENDIENTE]  | ✗ Pend |
|-------------|-------------|-------------------|--------------|--------|

LEYENDA:
✓ Impl    = Implementado y probado
⚠ Parcial = Parcialmente implementado
✗ Pend    = Pendiente
❌ Bloq   = Bloqueado

RESUMEN:
Total requerimientos usuario: 15
Implementados completamente: 12 (80%)
Parcialmente implementados: 2 (13%)
Pendientes: 1 (7%)
Bloqueados: 0 (0%)

REQUERIMIENTOS SIN TRAZABILIDAD:
- USER-003: Sin módulo asignado ← REQUIERE ATENCIÓN

CASOS DE PRUEBA HUÉRFANOS:
- TEST-099: No vinculado a requerimiento ← REVISAR

🔗 CONEXIONES CON OTROS CAPÍTULOS
← Capítulo 2 (Procesos de Software):
Cap 2 introduce "especificación" como actividad → Cap 4 la detalla completamente
Cap 2 menciona prototipos → Cap 4 muestra cómo usarlos para validar requerimientos
Cap 2 presenta modelo en espiral → Cap 4 aplica espiral a ingeniería de requerimientos
← Capítulo 3 (Desarrollo Ágil):
Cap 3 usa historias de usuario → Cap 4 muestra la ingeniería de requerimientos formal
Contraste: Requerimientos mínimos (ágil) vs documentación extensa (tradicional)
Cap 3 menciona cliente en sitio → Cap 4 detalla técnicas para trabajar con stakeholders
→ Capítulo 5 (Modelado del Sistema):
Cap 4 introduce casos de uso → Cap 5 profundiza en UML y modelado
Requerimientos generan modelos del sistema
Modelos ayudan a clarificar requerimientos (retroalimentación)
→ Capítulo 8 (Pruebas):
Cap 4 introduce generación de casos de prueba para validación
Cap 8 profundiza en pruebas basadas en requerimientos
Trazabilidad requerimientos-pruebas es crítica
→ Capítulo 9 (Evolución):
Requerimientos cambian → Evolución del sistema
Gestión de cambios de requerimientos es base de evolución
Mantenibilidad es requerimiento no funcional clave
→ Capítulos 22-23 (Gestión de Proyectos):
Requerimientos son base para estimación de costos y tiempo
Gestión de cambios de requerimientos afecta planificación de proyecto
Riesgos en requerimientos son riesgos de proyecto

🚀 PARA IMPLEMENTAR MAÑANA
ACCIÓN #1: Clasificar sistema
¿Es grande/complejo o pequeño/ágil? → Determina nivel de documentación necesario
ACCIÓN #2: Identificar stakeholders
Lista TODOS los que se afectan por el sistema:
Usuarios directos
Usuarios indirectos
Gerentes
Personal de TI
Reguladores
Clientes finales
ACCIÓN #3: Primera entrevista
Programa entrevista con stakeholder clave. Prepara preguntas abiertas. Usa prototipos o ejemplos como trampolines.
ACCIÓN #4: Primer escenario
Toma un flujo de trabajo principal. Documéntalo como escenario completo. Valídalo con usuario real.
ACCIÓN #5: Establecer sistema de identificación
Define esquema de IDs para requerimientos:
[PROYECTO]-[TIPO]-[NÚMERO]
Ejemplo: MHC-FR-001
ACCIÓN #6: Plantilla de requerimiento
Crea plantilla estándar para documentar requerimientos. Incluye: ID, Descripción, Criterios aceptación, Trazabilidad.
ACCIÓN #7: Primer requerimiento no funcional cuantificado
Toma una meta vaga ("el sistema debe ser rápido"). Conviértela en requerimiento medible ("respuesta <2s en 95% de consultas").

💭 REFLEXIÓN FINAL
Ingeniería de requerimientos NO es:
❌ Hacer lista de deseos del cliente
❌ Escribir documento que nadie leerá
❌ Actividad que se hace una vez al inicio
❌ Responsabilidad solo de analistas de negocio
Ingeniería de requerimientos SÍ es:
✅ Descubrir lo que stakeholders REALMENTE necesitan (a menudo diferente de lo que dicen que quieren)
✅ Negociar entre necesidades conflictivas de múltiples stakeholders
✅ Documentar de forma que equipos técnicos Y no técnicos entiendan
✅ Validar continuamente que vamos en dirección correcta
✅ Administrar cambios inevitables de forma controlada
Tres verdades sobre requerimientos:
1. Stakeholders no saben lo que quieren Hasta que ven opciones concretas. Por eso prototipos y escenarios son tan valiosos.
2. Los cambios son inevitables No luches contra ellos. Acéptalos y adminístral os formalmente.
3. El costo de errores crece exponencialmente Error en requerimientos que se descubre en producción = desastre. Error que se descubre durante adquisición = fácil de arreglar.
La mejor inversión: Tiempo dedicado a ENTENDER y VALIDAR requerimientos antes de escribir código.
El peor error: Asumir que entendiste los requerimientos sin validar con stakeholders.


