
CAPÍTULO 5: MODELADO DEL SISTEMA
📚 ESENCIA
Problema que resuelve: Los sistemas de software son complejos y necesitan comunicarse visualmente antes de construirlos. Es como necesitar un plano antes de construir una casa.
Por qué importa: Los modelos son abstracciones que permiten discutir, diseñar y documentar sistemas sin ahogarse en detalles. Cada modelo muestra una perspectiva diferente del mismo sistema, ayudando a entenderlo completamente antes de invertir en su construcción.

🎯 CONCEPTOS CLAVE
1. MODELO vs REPRESENTACIÓN
Qué es: Un modelo es una abstracción que omite detalles deliberadamente, no una copia exacta.
Modelo: Como el resumen de este libro en un periódico (extrae lo esencial)
Representación: Como traducir el libro al italiano (mantiene TODO)
Analogía:
Un mapa del metro (modelo) vs una foto satelital de la ciudad (representación)
El mapa omite calles, edificios, árboles - solo muestra lo esencial para viajar
2. UML (Lenguaje de Modelado Unificado)
Qué es: El "idioma universal" para dibujar software. 13 tipos de diagramas, pero 5 cubren el 80% de necesidades.
Los 5 Diagramas Esenciales:
Casos de Uso → Interacciones usuario-sistema
Secuencia → Orden temporal de interacciones
Clases → Estructura estática (como organigrama)
Estado → Comportamiento ante eventos
Actividad → Flujo de procesos
3. LAS 4 PERSPECTIVAS DEL MODELADO
┌─────────────────────────────────────────────┐
│  PERSPECTIVA EXTERNA (Contexto)             │
│  → ¿Qué está AFUERA del sistema?            │
│  → Límites y fronteras                      │
├─────────────────────────────────────────────┤
│  PERSPECTIVA DE INTERACCIÓN                 │
│  → ¿Cómo se COMUNICAN las partes?           │
│  → Usuario↔Sistema, Sistema↔Sistema          │
├─────────────────────────────────────────────┤
│  PERSPECTIVA ESTRUCTURAL                    │
│  → ¿Cómo se ORGANIZA internamente?          │
│  → Arquitectura y componentes               │
├─────────────────────────────────────────────┤
│  PERSPECTIVA DE COMPORTAMIENTO              │
│  → ¿Cómo REACCIONA dinámicamente?           │
│  → Respuestas a datos y eventos             │
└─────────────────────────────────────────────┘

4. 3 NIVELES DE RIGOR EN MODELOS
Uso del Modelo
Nivel de Detalle
Ejemplo
Discusión (informal)
Incompleto, flexible
Pizarrón en reunión de diseño
Documentación
Correcto, puede ser parcial
Manual técnico del sistema
Generación de código
Completo, preciso, formal
MDA/MDE


🛠️ METODOLOGÍAS Y FRAMEWORKS
METODOLOGÍA 1: MODELOS DE CONTEXTO
¿Qué es? Diagrama que muestra el sistema y todo lo que lo rodea (otros sistemas, bases de datos, usuarios).
¿Cuándo usarlo?
Primera reunión de requerimientos
Para decidir QUÉ hace el sistema y QUÉ hace su entorno
Cuando hay confusión sobre las fronteras del proyecto
¿Cómo implementarlo?
Dibuja tu sistema en el centro
Identifica todos los sistemas externos con los que interactúa
Conecta con líneas (sin flechas en contexto simple)
Añade etiqueta "«sistema»" a cada caja
Ejemplo práctico: Sistema de Reservas de Hotel:
   [Sistema de Pago]
           |
    [SISTEMA RESERVAS]---[Base Datos Clientes]
           |                    |
    [Sistema Email]      [Sistema ERP]

Plantilla reutilizable:
"«sistema»"
[Nombre Sistema Principal]
        |
[Sistema Externo 1]
[Sistema Externo 2]
[Sistema Externo N]


METODOLOGÍA 2: DIAGRAMAS DE CASOS DE USO
¿Qué es? Representación visual de "quién hace qué" con el sistema.
¿Cuándo usarlo?
Levantamiento inicial de requerimientos
Validación con stakeholders (es muy intuitivo)
Planificación de sprints/iteraciones
¿Cómo implementarlo?
Identifica actores (usuarios, sistemas externos)
Identifica casos de uso (tareas discretas)
Dibuja: Figura humana (actor) → Elipse (caso de uso)
Documenta cada caso en tabla
Ejemplo práctico: E-commerce
    Cliente
        |
    [Buscar Producto]
        |
    [Añadir al Carrito]
        |
    [Pagar]
        |
    Sistema de Pago (otro actor)

Plantilla de Documentación:
┌────────────────────────────────────────┐
│ Nombre del Caso de Uso: [Nombre]       │
├────────────────────────────────────────┤
│ Actores: [Lista de participantes]      │
├────────────────────────────────────────┤
│ Descripción: [Qué hace]                │
├────────────────────────────────────────┤
│ Datos: [Información intercambiada]     │
├────────────────────────────────────────┤
│ Estímulo: [Qué inicia la acción]       │
├────────────────────────────────────────┤
│ Respuesta: [Resultado esperado]        │
├────────────────────────────────────────┤
│ Comentarios: [Restricciones, notas]    │
└────────────────────────────────────────┘


METODOLOGÍA 3: DIAGRAMAS DE SECUENCIA
¿Qué es? Muestra el ORDEN TEMPORAL de mensajes entre objetos, como una conversación cronológica.
¿Cuándo usarlo?
Detalle técnico de un caso de uso
Diseño de APIs y protocolos
Debugging de problemas de comunicación
Documentación de flujos complejos
¿Cómo implementarlo?
Dibuja participantes en la parte superior
Líneas punteadas verticales = "línea de vida"
Flechas horizontales = mensajes (de arriba → abajo = tiempo)
Rectángulos sobre líneas = objeto activo
Usa "alt" para condicionales
Ejemplo práctico: Login
Usuario    →   Sistema    →   BD
  |              |             |
  Login()------->|             |
  |         ValidarUsuario()--->|
  |              |<------OK/ERROR
  |         [OK]                |
  |<-------Token |              |
  |         [ERROR]             |
  |<-------Mensaje Error        |

Elementos del Diagrama:
Mensaje: flecha con nombre de método
Retorno: flecha punteada de regreso
Condicional: caja "alt" con [condición]
Parámetros: nombreMétodo(param1, param2)

METODOLOGÍA 4: DIAGRAMAS DE CLASES
¿Qué es? El "plano arquitectónico" de la estructura del código. Muestra clases, atributos, métodos y relaciones.
¿Cuándo usarlo?
Diseño de arquitectura orientada a objetos
Modelado de base de datos (similar a ER)
Documentación de código legacy
Refactoring y evolución del sistema
¿Cómo implementarlo?
Identifica clases (sustantivos del dominio)
Define atributos (datos que guarda cada clase)
Define operaciones/métodos (acciones de la clase)
Establece asociaciones con multiplicidad
Estructura de una Clase:
┌─────────────────┐
│  NombreClase    │ ← Nombre
├─────────────────┤
│ -atributo1      │ ← Atributos (- privado, + público)
│ -atributo2      │
├─────────────────┤
│ +método1()      │ ← Operaciones/Métodos
│ +método2()      │
└─────────────────┘

Ejemplo práctico: Sistema de Biblioteca
┌─────────────┐         ┌─────────────┐
│   Libro     │         │   Usuario   │
├─────────────┤         ├─────────────┤
│ -ISBN       │  1..*   │ -ID         │
│ -título     │◆───────○│ -nombre     │
│ -autor      │         │ -email      │
├─────────────┤   lee   ├─────────────┤
│ +prestar()  │         │ +registrar()│
│ +devolver() │         │ +baja()     │
└─────────────┘         └─────────────┘

Multiplicidades:
1 = exactamente uno
0..1 = cero o uno (opcional)
1..* = uno o más
* = cero o más
0..* = cero o más (igual que *)
m..n = entre m y n
Tipos de Relaciones:
Asociación simple: línea (—)
Agregación: rombo hueco (◇—) = "tiene un" (débil)
Composición: rombo lleno (◆—) = "contiene" (fuerte, ciclo de vida)
Generalización: flecha hueca (△—) = herencia

METODOLOGÍA 5: DIAGRAMAS DE ESTADO
¿Qué es? Máquina de estados finitos. Muestra CÓMO cambia el comportamiento del sistema según eventos.
¿Cuándo usarlo?
Sistemas reactivos (IoT, control industrial)
Workflows complejos con estados claros
Protocolos de comunicación
UI con múltiples modos
¿Cómo implementarlo?
Identifica todos los estados posibles
Identifica eventos que causan transiciones
Dibuja: círculo negro (inicio), círculo doble (fin)
Rectángulos redondeados = estados
Flechas etiquetadas = transiciones
Ejemplo práctico: Cajero Automático
   ●
    |
    v
[Esperando Tarjeta]
    | insertar tarjeta
    v
[Validando PIN]
    |
alt |--- PIN correcto → [Menú Principal]
    |                         |
    |                    seleccionar
    |                         |
    |                    [Retirando Dinero]
    |                         |
    |                    entrega
    |                         |
    |                    [Expulsando Tarjeta]
    |                         |
    |                         v
    |--- PIN incorrecto → [Bloqueado] → ◉

Notación:
do: Acción → Qué hace EN ese estado
entry: Acción → Al entrar al estado
exit: Acción → Al salir del estado
Plantilla de Documentación de Estados:
┌──────────────────────────────────────┐
│ Estado: [Nombre]                     │
├──────────────────────────────────────┤
│ Descripción: [Qué representa]        │
├──────────────────────────────────────┤
│ Acción: [Qué hace mientras está aquí]│
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ Evento: [Nombre]                     │
├──────────────────────────────────────┤
│ Descripción: [Qué lo dispara]        │
└──────────────────────────────────────┘


METODOLOGÍA 6: DIAGRAMAS DE ACTIVIDAD
¿Qué es? Flowchart mejorado. Muestra el FLUJO DE TRABAJO o procesamiento de datos paso a paso.
¿Cuándo usarlo?
Modelar procesos de negocio
Flujos de datos (alternativa a DFD)
Algoritmos complejos
Procesos con paralelismo
¿Cómo implementarlo?
Identifica actividades (pasos del proceso)
Determina el flujo y decisiones
Identifica paralelismo si existe
Dibuja de arriba → abajo
Símbolos:
● = Inicio
◉ = Fin
[  ] = Actividad (rectángulo redondeado)
◊  = Decisión (rombo)
▂  = Barra de sincronización (paralelismo)

Ejemplo práctico: Procesar Pedido
   ●
    |
    v
[Recibir Pedido]
    |
    v
[Validar Stock]
    |
   / \  ¿Hay stock?
  /   \
 Sí    No
 |      |
 |   [Notificar Cliente]
 |      |
 |      v
 |      ◉
 v
[Procesar Pago]
    |
    v
▂▂▂▂▂▂▂▂ (fork - paralelismo)
    |  |
    |  v
    | [Generar Factura]
    v
[Preparar Envío]
    |
    v
▂▂▂▂▂▂▂▂ (join - sincronización)
    |
    v
[Notificar Envío]
    |
    v
    ◉

Diferencia clave con Diagramas de Flujo:
Actividad puede mostrar objetos (datos que fluyen)
Soporta paralelismo nativamente
Enfocado en procesos, no en decisiones

METODOLOGÍA 7: INGENIERÍA DIRIGIDA POR MODELOS (MDA/MDE)
¿Qué es? Filosofía donde los modelos SON el código fuente. Se generan programas automáticamente desde modelos UML.
¿Cuándo usarla?
Sistemas grandes de larga duración (10+ años)
Necesidad de múltiples plataformas (Java, .NET, etc.)
Dominio bien entendido y estable
Equipos con alta madurez en modelado
¿Cómo implementarla?
Los 3 Niveles de Abstracción (MDA):
1. CIM (Computation Independent Model)
   ↓ (transformación manual + guías)
2. PIM (Platform Independent Model)
   ↓ (transformación automática)
3. PSM (Platform Specific Model)
   ↓ (generación automática)
4. CÓDIGO EJECUTABLE

Explicación de cada nivel:
CIM - Modelo Independiente de Computación


Abstracciones del dominio (conceptos del negocio)
Ejemplo: "Paciente", "Consulta", "Tratamiento"
NO tiene detalles técnicos
PIM - Modelo Independiente de Plataforma


Operación del sistema SIN tecnología específica
Usa diagramas UML (clases, estado, secuencia)
Define QUÉ hace, no CÓMO se implementa
PSM - Modelo Específico de Plataforma


Adaptación a tecnología concreta (Java, .NET, etc.)
Puede haber varios PSM del mismo PIM
Incluye detalles de frameworks, bases de datos
Ejemplo práctico:
CIM: "Un paciente tiene consultas médicas"
     ↓
PIM: Clase Paciente {
       -nombre: String
       -consultas: List<Consulta>
     }
     ↓
PSM Java: public class Paciente {
            private String nombre;
            @OneToMany
            private List<Consulta> consultas;
          }
     ↓
CÓDIGO: [Archivo Paciente.java generado]

Ventajas:
Abstracción alta (piensas en el problema, no en Java)
Portabilidad entre plataformas
Modelos reutilizables
Desventajas:
Herramientas costosas e inmaduras
Curva de aprendizaje pronunciada
No resuelve los problemas MÁS difíciles (requerimientos, testing)

✅ CHECKLIST DE IMPLEMENTACIÓN
Para Iniciar un Proyecto:
[ ] Definir fronteras del sistema (Modelo de Contexto)
[ ] Identificar todos los actores (humanos y sistemas)
[ ] Listar casos de uso principales
[ ] Documentar cada caso de uso con tabla
[ ] Validar casos de uso con stakeholders
Para Diseñar el Sistema:
[ ] Crear diagrama de clases con las entidades principales
[ ] Definir atributos y métodos de cada clase
[ ] Establecer multiplicidades en asociaciones
[ ] Detallar 3-5 casos de uso críticos con diagramas de secuencia
[ ] Modelar workflows con diagramas de actividad
Para Sistemas Reactivos:
[ ] Identificar todos los estados posibles
[ ] Documentar cada estado con su tabla
[ ] Identificar todos los eventos/estímulos
[ ] Documentar transiciones entre estados
[ ] Validar que no haya estados "huérfanos"
Para Cada Diagrama:
[ ] Tiene título descriptivo
[ ] Usa notación UML correcta
[ ] Es legible (no más de 10-12 elementos)
[ ] Está versionado
[ ] Tiene fecha de última actualización

⚠️ ERRORES COMUNES
1. SOBRE-MODELAR
❌ MAL (antipatrón):
Crear 50 diagramas UML completos antes
de escribir una línea de código.
Pasar 3 meses "diseñando perfectamente"
sin validar con usuarios.

✅ BIEN (patrón correcto):
Modelo de contexto → Casos de uso →
Diagramas de secuencia de lo crítico →
CÓDIGO → Iterar

RAZÓN: Los modelos son herramientas de comunicación, no un fin en sí mismos. En métodos ágiles, modelo + código evolucionan juntos.

2. CONFUNDIR CASO DE USO CON FUNCIÓN
❌ MAL (antipatrón):
Caso de Uso: "Validar Email"
Caso de Uso: "Conectar a Base de Datos"

✅ BIEN (patrón correcto):
Caso de Uso: "Registrar Usuario"
  (que INCLUYE validar email)

RAZÓN: Un caso de uso es una tarea completa desde la perspectiva del usuario, no un paso técnico interno.

3. MEZCLAR NIVELES DE ABSTRACCIÓN
❌ MAL (antipatrón):
En diagrama de clases:
- Clase "Usuario"
- Clase "ConexiónHTTP"
- Clase "ConfiguraciónJSON"

✅ BIEN (patrón correcto):
Modelo de dominio:
- Usuario, Producto, Pedido

Modelo de infraestructura (separado):
- HTTPClient, JSONParser

RAZÓN: Los modelos de negocio deben ser independientes de detalles técnicos de implementación.

4. FLECHAS INCORRECTAS EN SECUENCIA
❌ MAL (antipatrón):
Usuario ← Sistema (respuesta con flecha continua)

✅ BIEN (patrón correcto):
Usuario ← Sistema (respuesta con flecha punteada)

RAZÓN:
Flecha continua = llamada/mensaje
Flecha punteada = retorno/respuesta

5. IGNORAR MULTIPLICIDAD EN CLASES
❌ MAL (antipatrón):
Cliente ─── Pedido
(sin números)

✅ BIEN (patrón correcto):
Cliente 1───1..* Pedido

RAZÓN: La multiplicidad es CRÍTICA para entender el modelo de datos. Sin ella, el diagrama es ambiguo.

💡 REGLAS DE ORO
Un modelo, un propósito: No mezcles contexto con estructura con comportamiento en el mismo diagrama


KISS en modelos: Si tiene más de 10-12 elementos, subdivide. Nadie entiende diagramas gigantes


Modelos vivos, no cementerios: Un modelo desactualizado es peor que no tener modelo. Actualiza o elimina


La notación es secundaria: Mejor un diagrama "incorrecto" que comunica que uno "perfecto" que nadie entiende


Valida con no-técnicos: Si un stakeholder no entiende tu diagrama de casos de uso, fallaste


Consistencia sobre perfección: Mejor modelos "buenos suficientes" coherentes entre sí que un modelo perfecto aislado


Contexto primero: Siempre empieza por el modelo de contexto. Define fronteras ANTES de diseñar internamente


Estados finitos para reactive: Si tu sistema reacciona a eventos (botones, sensores, mensajes), usa diagramas de estado


Actividades para batch: Si procesa datos en pipeline, usa diagramas de actividad


Clases para estructura: Úsalas cuando diseñes arquitectura OO, pero no antes de entender el dominio


Secuencia para debugging: Cuando algo falla en comunicación, dibuja el diagrama de secuencia REAL vs ESPERADO


MDA solo si es rentable: No uses ingeniería dirigida por modelos en proyectos de 6 meses. Es para sistemas de 10+ años



📊 PLANTILLAS Y HERRAMIENTAS
Plantilla de Decisión: ¿Qué Diagrama Usar?
┌─────────────────────────────────────────────┐
│ ¿Necesitas mostrar...?                      │
├─────────────────────────────────────────────┤
│ → Límites del sistema?                      │
│   Usa: Modelo de Contexto                   │
├─────────────────────────────────────────────┤
│ → Qué hacen los usuarios?                   │
│   Usa: Casos de Uso                         │
├─────────────────────────────────────────────┤
│ → Orden temporal de mensajes?               │
│   Usa: Diagrama de Secuencia                │
├─────────────────────────────────────────────┤
│ → Estructura de datos/clases?               │
│   Usa: Diagrama de Clases                   │
├─────────────────────────────────────────────┤
│ → Cómo reacciona a eventos?                 │
│   Usa: Diagrama de Estado                   │
├─────────────────────────────────────────────┤
│ → Flujo de un proceso?                      │
│   Usa: Diagrama de Actividad                │
└─────────────────────────────────────────────┘

Tabla Comparativa de Diagramas
Diagrama
Cuándo
Para qué NO
Contexto
Definir fronteras
NO para mostrar arquitectura interna
Casos de Uso
Requisitos funcionales
NO para lógica de negocio detallada
Secuencia
Protocolos, APIs
NO para flujos de datos complejos
Clases
Arquitectura OO
NO para mostrar comportamiento
Estado
Sistemas reactivos
NO para procesamiento por lotes
Actividad
Workflows, procesos
NO para mostrar estructura de clases

Herramientas Recomendadas
Gratuitas:
PlantUML (texto → diagrama, ideal para versionado)
Draw.io / diagrams.net (navegador, sencillo)
Mermaid (markdown → diagrama)
Comerciales:
Enterprise Architect (completo, MDA)
Visual Paradigm (UML robusto)
Lucidchart (colaborativo)
Para Code → Diagram:
IntelliJ IDEA (diagramas desde código Java)
Visual Studio (generación automática)
Doxygen (para C/C++)

🔗 CONEXIONES CON CAPÍTULOS ANTERIORES
Con Capítulo 1 (Introducción):
Los modelos son la abstracción clave en ingeniería de software
Ayudan con complejidad, uno de los problemas esenciales del software
Con Capítulo 2 (Procesos):
En el RUP, los modelos son centrales en cada flujo de trabajo
En desarrollo iterativo, modelos evolucionan gradualmente
Los modelos apoyan la documentación del sistema
Con Capítulo 3 (Métodos Ágiles):
Modelado ágil: modelos ligeros, solo lo necesario
Preferencia por "código que funciona" sobre documentación exhaustiva
Modelos como herramienta de comunicación, no burocracia
Con Capítulo 4 (Requerimientos):
Casos de uso son técnica central para elicitación de requisitos
Los modelos ayudan a validar requisitos con stakeholders
Transición natural: Requisitos → Modelos → Diseño
Con Capítulos Posteriores:
Capítulo 6 (Arquitectura): Los modelos estructurales se vuelven arquitectura
Capítulo 18-19 (Diseño OO): Diagramas de clases son el puente

🚀 PARA IMPLEMENTAR MAÑANA
Acción 1: DIBUJA EL CONTEXTO
En 15 minutos:
Toma tu proyecto actual
Dibuja una caja con el nombre de tu sistema
Alrededor, dibuja TODOS los sistemas/actores externos
Conecta con líneas
Ya tienes visibilidad de integraciones
Acción 2: LISTA 5 CASOS DE USO CRÍTICOS
En 30 minutos:
¿Qué 5 cosas DEBE poder hacer un usuario?
Escríbelas en elipses con actores
Valídalo con un colega o usuario
Ya tienes scope claro
Acción 3: DIAGRAMA DE SECUENCIA DE LO MÁS COMPLEJO
En 1 hora:
Identifica el flujo más complejo de tu sistema
Dibuja el diagrama de secuencia con objetos y mensajes
Encontrarás bugs o puntos de falla que no habías visto
Acción 4: CLASES DEL CORE DEL DOMINIO
En 45 minutos:
Identifica las 5-8 entidades centrales de tu negocio
Dibuja diagrama de clases con atributos y asociaciones
NO incluyas getters/setters, solo lo esencial
Base para arquitectura
Acción 5: COMPARTE Y VALIDA
En 1 día:
Programa 30 min con stakeholders
Muestra modelos de contexto y casos de uso
Pregunta: "¿Falta algo? ¿Algo sobra?"
Feedback temprano = ahorro futuro

