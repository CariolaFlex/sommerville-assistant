CAPÍTULO 2: PROCESOS DE SOFTWARE
EXTRACCIÓN COMPLETA Y DEFINITIVA---
📚 ESENCIA
Los procesos de software son el conjunto coherente de actividades para producir software de calidad. No existe un proceso único perfecto - cada proyecto necesita adaptar su proceso según el tipo de sistema, equipo y contexto. El cambio es inevitable, por lo que los procesos deben diseñarse para gestionarlo, no evitarlo.

🎯 CONCEPTOS CLAVE COMPLETOS
1. PROCESO DE SOFTWARE
Serie de actividades relacionadas que conducen a la elaboración de un producto de software. Incluye:
Actividades: Especificación, diseño, validación, evolución
Productos: Resultados de cada actividad (documentos, código, modelos)
Roles: Responsabilidades de las personas (gerente, programador, probador)
Precondiciones y postcondiciones: Estados válidos antes/después de cada actividad
2. MODELO DE PROCESO
Representación abstracta y simplificada de un proceso. NO es una descripción definitiva, sino un marco (framework) que se adapta.
3. LAS 4 ACTIVIDADES FUNDAMENTALES UNIVERSALES
Presentes en TODOS los procesos:
1. ESPECIFICACIÓN DEL SOFTWARE
Definir funcionalidad y restricciones
Comprender QUÉ necesita el cliente
Resultado: Documento de requerimientos
2. DISEÑO E IMPLEMENTACIÓN
Convertir especificación en sistema ejecutable
CÓMO se construirá el software
Resultado: Código + arquitectura
3. VALIDACIÓN
Verificar que cumple especificación
Asegurar que satisface necesidades reales
Resultado: Sistema probado
4. EVOLUCIÓN
Modificar para nuevos requerimientos
Mantener durante operación
Resultado: Sistema actualizado
4. TIPOS DE PROCESOS
DIRIGIDOS POR UN PLAN (Plan-Driven):
Todas las actividades se planean anticipadamente
Progreso medido contra plan
Mejor para: sistemas críticos, grandes equipos, contratos formales
ÁGILES:
Planeación incremental
Fácil modificar el proceso
Mejor para: requerimientos cambiantes, equipos pequeños
HÍBRIDOS:
Combinan elementos de ambos
Equilibrio entre disciplina y flexibilidad
5. ELEMENTOS DE DESCRIPCIONES DE PROCESOS
Productos: Resultados (modelo de arquitectura, código)
Roles: Responsabilidades (gerente, programador)
Precondiciones: Válidas ANTES de actividad
Postcondiciones: Válidas DESPUÉS de actividad

🏗️ LOS 3 MODELOS DE PROCESO GENÉRICOS
MODELO 1: CASCADA (WATERFALL)
¿Qué es? Proceso secuencial donde cada fase debe completarse antes de iniciar la siguiente. Actividades representadas como fases separadas con documentos autorizados.
Fases en orden:
Análisis y definición de requerimientos → Especificación del sistema
Diseño del sistema y software → Arquitectura y diseño detallado
Implementación y prueba de unidad → Código + verificación de unidades
Integración y prueba de sistema → Sistema completo probado
Operación y mantenimiento → Instalación + corrección de errores
¿Cuándo usarlo?
Usar Cascada cuando...
NO usar Cascada cuando...
Requerimientos bien entendidos y estables
Requerimientos cambian frecuentemente
Sistemas críticos de seguridad
Sistemas con incertidumbre en requerimientos
Hardware y software desarrollados juntos
Interfaz de usuario necesita experimentación
Contratos formales requieren especificación completa
Startup o innovación rápida
Sistema de reemplazo bien definido
Proyecto exploratorio

Ventajas: ✅ Documentación completa en cada fase ✅ Progreso medible y visible ✅ Apropiado para desarrollo distribuido (equipos remotos) ✅ Bueno para cumplimiento regulatorio
Desventajas: ❌ Difícil acomodar cambios después de iniciar ❌ Iteraciones son costosas (rehacer documentos) ❌ Cliente ve sistema funcionando solo al final ❌ Freno prematuro de especificación → sistema no hace lo que usuario quiere ❌ Problemas de diseño pueden evadirse con "trucos" en implementación
Ejemplo cotidiano: Construir un puente - necesitas planos completos ANTES de comprar materiales. No puedes cambiar la ubicación de pilares a mitad de construcción.

MODELO 2: DESARROLLO INCREMENTAL
¿Qué es? Especificación, desarrollo y validación están entrelazadas. El sistema se desarrolla como serie de versiones (incrementos), cada una agrega funcionalidad.
Características clave:
Actividades concurrentes (no secuenciales)
Retroalimentación rápida entre actividades
Versión inicial → Versiones intermedias → Versión final
Cada incremento es ejecutable y utilizable
¿Cuándo usarlo?
✅ IDEAL PARA:
Sistemas empresariales (e-commerce, SaaS)
Sistemas personales (apps móviles)
Proyectos con requerimientos cambiantes
Cuando cliente necesita valor rápido
Desarrollo web
❌ NO ADECUADO PARA:
Sistemas embebidos (dependen de hardware)
Sistemas críticos (todos los requerimientos deben analizarse para seguridad)
Sistemas muy grandes con equipos distribuidos
Contratos gubernamentales (requieren especificación completa)
BENEFICIOS IMPORTANTES:
1. Costo reducido de cambios
Solo el incremento actual necesita reelaborarse
Menos documentación que rehacer
2. Retroalimentación temprana del cliente
Clientes ven demostraciones ejecutables
Más fácil juzgar avance que con documentos
Comentarios informan siguiente incremento
3. Entrega rápida de valor
Cliente usa funcionalidad crítica desde el primer incremento
No espera sistema completo para obtener beneficio
PROBLEMAS DEL DESARROLLO INCREMENTAL:
Problema 1: Visibilidad del proceso
Gerentes necesitan entregas para medir avance
Poco efectivo producir documentos para cada versión
Solución: Métricas ágiles, demos frecuentes
Problema 2: Degradación de estructura
Cambios regulares corrompen arquitectura
Incorporar cambios se vuelve más difícil/costoso
Solución: Refactorización constante, inversión en calidad de código
Entrega incremental vs Desarrollo incremental:
Desarrollo incremental: Desarrollo interno iterativo
Entrega incremental: Cliente RECIBE y USA incrementos en producción
Problemas de ENTREGA incremental:
Recursos comunes difíciles de identificar


Requerimientos no están completos al inicio
Difícil planear arquitectura compartida
Sistemas de reemplazo complicados


Usuarios quieren toda funcionalidad del sistema viejo
No quieren experimentar con sistema incompleto
Conflicto con modelos de adquisición


Contratos requieren especificación completa
No hay especificación completa hasta incremento final
Ejemplo cotidiano: Renovar tu casa - primero cocina (más urgente), luego baño, luego habitaciones. Vives en la casa mientras se renueva, no esperas al final.

MODELO 3: INGENIERÍA DE SOFTWARE ORIENTADA A REUTILIZACIÓN
¿Qué es? El sistema se ensambla integrando componentes existentes en lugar de desarrollar desde cero.
3 Tipos de componentes reutilizables:
Servicios Web → Invocación remota de servicios estándares
Colecciones de objetos → Paquetes para frameworks (.NET, J2EE)
Sistemas independientes (COTS) → Configurables para entorno específico
Fases:
Especificación de requerimientos → Qué necesita el sistema
Análisis de componentes → Buscar componentes que cumplan requerimientos
Modificación de requerimientos → Ajustar requerimientos a componentes disponibles
Diseño del sistema con reutilización → Arquitectura considerando componentes
Desarrollo e integración → Desarrollar lo que falta + integrar componentes
Ventajas: ✅ Reduce software a desarrollar ✅ Disminuye costos y riesgos ✅ Entrega más rápida
Desventajas: ❌ Compromisos de requerimientos inevitables ❌ Sistema puede no cubrir necesidades reales ❌ Pérdida de control sobre evolución (depende de proveedor de componentes)
Ejemplo cotidiano: Construir PC gaming - compras tarjeta gráfica, procesador, motherboard (componentes existentes), solo ensamblas. No fabricas cada pieza.

🛠️ LAS 4 ACTIVIDADES DEL PROCESO (DETALLADAS)
ACTIVIDAD 1: ESPECIFICACIÓN DEL SOFTWARE (Ingeniería de Requerimientos)
¿Qué es? Comprender y definir qué servicios requiere el sistema e identificar restricciones.
4 Subactividades:
1. Estudio de factibilidad
¿Es técnicamente posible?
¿Es económicamente viable?
Resultado: Informe de factibilidad (continuar o cancelar)
2. Obtención y análisis de requerimientos
Observar sistemas existentes
Discutir con usuarios
Desarrollar modelos del sistema
Resultado: Modelos del sistema
3. Especificación de requerimientos
Transcribir información a documento formal
Requerimientos del usuario: Abstractos, para cliente
Requerimientos del sistema: Detallados, para desarrolladores
Resultado: Documento de requerimientos
4. Validación de requerimientos
Verificar: realistas, coherentes, completos
Detectar errores antes de desarrollo
Resultado: Requerimientos validados
CRÍTICO: Actividades NO son secuenciales estrictas - se entrelazan y retroalimentan.

ACTIVIDAD 2: DISEÑO E IMPLEMENTACIÓN
¿Qué es? Convertir especificación en sistema ejecutable.
Diseño de software: Descripción de estructura, modelos de datos, interfaces entre componentes, algoritmos.
Proceso de diseño (iterativo): Los diseñadores NO llegan inmediatamente a diseño final - agregan detalle iterativamente con backtracking constante.
Subactividades del diseño:
Diseño arquitectónico → Estructura general del sistema
Diseño de interfaz → Interfaces entre componentes
Diseño de componentes → Componentes individuales
Diseño de base de datos → Estructuras de datos
Implementación:
Programar el diseño
Prueba de unidad (cada componente individualmente)
Depuración (debugging) - localizar y corregir defectos
NOTA: Programadores realizan pruebas de su código. Esto revela defectos que deben corregirse (depuración ≠ prueba).

ACTIVIDAD 3: VALIDACIÓN DEL SOFTWARE
¿Qué es? Mostrar que el sistema cumple especificación Y expectativas del cliente.
Técnica principal: PRUEBAS El sistema se ejecuta con datos de prueba para verificar comportamiento.
3 ETAPAS DE PRUEBAS:
1. Prueba de desarrollo (componentes)
Desarrolladores prueban componentes individualmente
Sin otros componentes del sistema
Componentes: funciones, clases, subsistemas
Herramientas: JUnit y similares
2. Prueba de sistema (integración)
Componentes se integran para formar sistema completo
Descubre: errores de interacción, problemas de interfaz
Verifica: requerimientos funcionales y no funcionales
Prueba propiedades emergentes del sistema
3. Prueba de aceptación (cliente)
Sistema probado con datos REALES del cliente
Última etapa antes de uso operacional
Revela: errores/omisiones en definición de requerimientos
Descubre si sistema NO cumple necesidades reales
Tipos de pruebas de aceptación:
Prueba alfa: Cliente y desarrollador prueban juntos
Prueba beta: Sistema entregado a clientes potenciales; reportan problemas
PROCESO DE PRUEBAS ES ITERATIVO: Defectos encontrados → Depuración → Repetir etapas anteriores
Modelo V (Plan-Driven):
Especificación requerimientos ↔ Plan prueba aceptación
Especificación sistema ↔ Plan prueba sistema  
Diseño sistema ↔ Plan prueba integración sistema
Diseño detallado ↔ Plan prueba subsistemas
Código + prueba unidad


ACTIVIDAD 4: EVOLUCIÓN DEL SOFTWARE
¿Qué es? El software cambia continuamente durante y después del desarrollo.
VERDAD FUNDAMENTAL: Distinción tradicional entre "desarrollo" y "mantenimiento" es obsoleta. Es un continuo evolutivo.
¿Por qué evolucionar?
Software es flexible (hardware no)
Cambios son más baratos que en hardware
Requerimientos cambian durante desarrollo
Nuevas necesidades emergen en operación
Costos de evolución:
Frecuentemente SUPERAN costos de desarrollo inicial
Diseñar para mantenibilidad desde día 1 es crítico
Proceso evolutivo:
Sistema existente
    ↓
Propuestas de cambio
    ↓
Análisis de impacto
    ↓
Liberación de planeación
    ↓
Implementación de cambios
    ↓
Liberación de sistema

Ejemplo cotidiano: Tu casa - después de construirla, la mantienes por 30 años: pintura, techo, plomería, remodelaciones. El costo de mantenimiento > costo de construcción inicial.

🔄 CÓMO ENFRENTAR EL CAMBIO
VERDAD INEVITABLE: El cambio es inevitable en todos los proyectos grandes.
Causas del cambio:
Requerimientos varían conforme negocio evoluciona
Nuevas tecnologías disponibles
Prioridades administrativas cambian
Presiones externas (competencia, regulación)
2 ESTRATEGIAS PRINCIPALES:
ESTRATEGIA 1: EVITAR EL CAMBIO
Anticipar cambios antes de que requieran retrabajo significativo.
Técnica: CREACIÓN DE PROTOTIPOS
¿Qué es? Versión inicial del sistema para demostrar conceptos, probar opciones de diseño, entender problemas.
Desarrollo iterativo rápido esencial para controlar costos.
2 Usos principales:
USO 1: Ingeniería de requerimientos
Ayuda a seleccionar y validar requerimientos
Usuarios ven cómo sistema apoya su trabajo
Descubren errores/omisiones en requerimientos
USO 2: Diseño de sistemas
Explorar soluciones de software específicas
Diseñar interfaces de usuario
Comprobar factibilidad de diseños (ej: rendimiento de BD)
Proceso de creación de prototipos:
Establecer objetivos → Qué se quiere lograr con prototipo
Definir funcionalidad → Qué incluir/excluir
Desarrollar prototipo → Construcción rápida
Evaluar prototipo → Usuarios prueban y dan feedback
Qué dejar FUERA del prototipo:
Funcionalidad no crítica
Requerimientos no funcionales (tiempo de respuesta)
Manejo robusto de errores
Estándares completos de calidad
IMPORTANTE: Prototipos NO deben usarse como sistemas de producción
¿Por qué NO usar prototipos en producción?
❌ Razón 1: Imposible cumplir requerimientos no funcionales ignorados (rendimiento, seguridad, robustez)
❌ Razón 2: Sin documentación adecuada (solo código del prototipo)
❌ Razón 3: Estructura degradada por cambios rápidos (difícil/costoso mantener)
❌ Razón 4: Estándares de calidad flexibilizados durante desarrollo
Tipos de prototipos:
Ejecutables: Código funcional
Papel: Mockups de interfaz (muy económicos, útiles)
Mago de Oz: Solo interfaz; persona simula backend
Ejemplo cotidiano: Probar pintura en pared pequeña antes de pintar toda la casa. O mockup de app en papel antes de programar.

ESTRATEGIA 2: TOLERAR EL CAMBIO
Diseñar proceso para que cambios se acomoden sin disrumpir sistema completo.
Técnica 1: ENTREGA INCREMENTAL
Ya cubierto en modelos de proceso - Ver sección de Desarrollo Incremental arriba.
Resumen:
Entregar e implementar incrementos en entorno operacional
Cliente usa funcionalidad parcial mientras se desarrolla más
Incrementos basados en prioridad del cliente
Servicios más importantes probados más exhaustivamente

Técnica 2: MODELO EN ESPIRAL DE BOEHM
¿Qué es? Marco de proceso dirigido por el RIESGO. El proceso se representa como espiral (no secuencia).
Estructura: Cada ciclo en la espiral = una fase del proceso de software
Ciclo más interno: Factibilidad Siguiente ciclo: Definición de requerimientos
 Siguiente: Diseño del sistema Y así sucesivamente...
4 SECTORES en cada ciclo:
SECTOR 1: Establecimiento de objetivos
Definir objetivos específicos para la fase
Identificar restricciones
Trazar plan de gestión
Identificar riesgos
Planear estrategias alternativas
SECTOR 2: Valoración y reducción del riesgo
Análisis detallado de cada riesgo
Acciones para reducir riesgo
Ejemplo: Si riesgo = requerimientos inadecuados → Desarrollar prototipo
SECTOR 3: Desarrollo y validación
Elegir modelo de desarrollo según riesgos:
Riesgo en UI → Prototipos desechables
Riesgo de seguridad → Transformaciones formales
Riesgo de integración → Modelo en cascada
SECTOR 4: Planeación
Revisión del proyecto
Decisión: ¿Continuar con otro ciclo?
Trazar planes para siguiente fase
DIFERENCIA CLAVE vs otros modelos: Reconocimiento EXPLÍCITO del riesgo
Definición informal de riesgo: Algo que podría salir mal.
Ejemplos de riesgos:
Compiladores no confiables
Nuevo lenguaje sin experiencia
Requerimientos incompletos
Integraciones complejas
¿Por qué NO se usa ampliamente?
Demasiado complejo para proyectos pequeños
Requiere experiencia en gestión de riesgos
Difícil medir progreso en espiral
Equipos prefieren procesos más simples
Ejemplo cotidiano: Planear viaje internacional - cada fase evalúas riesgos (visas, vuelos, hospedaje) y ajustas plan. Si riesgo alto, tomas acciones (seguro de viaje, planes B).

🎯 PROCESO UNIFICADO RACIONAL (RUP)
¿Qué es? Modelo de proceso moderno e híbrido que combina elementos de TODOS los modelos genéricos.
Características:
Derivado de UML
Soporta prototipos y entrega incremental
Buena práctica en especificación y diseño
Enfoque adaptable
3 PERSPECTIVAS DEL RUP:
PERSPECTIVA 1: DINÁMICA (Fases a través del tiempo)
4 FASES DISCRETAS:
FASE 1: CONCEPCIÓN (Inception)
Meta: Establecer caso empresarial para el sistema
Actividades:
Identificar entidades externas (usuarios, sistemas)
Definir interacciones
Valorar aportación del sistema al negocio
Resultado: Si aportación es menor → Proyecto puede cancelarse
Decisión: Continuar o no
FASE 2: ELABORACIÓN (Elaboration)
Metas:
Desarrollar comprensión del dominio del problema
Establecer marco arquitectónico
Diseñar plan del proyecto
Identificar riesgos clave
Resultado:
Modelo de requerimientos (casos de uso UML)
Descripción arquitectónica
Plan de desarrollo
FASE 3: CONSTRUCCIÓN (Construction)
Actividades:
Diseño del sistema
Programación
Pruebas
Desarrollo en paralelo
Integración progresiva
Resultado:
Sistema funcionando
Documentación relacionada
Listo para entregar
FASE 4: TRANSICIÓN (Transition)
Meta: Cambio del sistema de desarrollo a usuarios
Actividades:
Implementación en ambiente real
Capacitación de usuarios
Soporte inicial
Resultado: Sistema documentado funcionando correctamente en entorno operacional
IMPORTANTE: Actividad ignorada en mayoría de modelos pero es costosa
Iteración en RUP:
Cada fase puede presentarse iterativamente
Todo el conjunto de fases puede repetirse incrementalmente
Flecha curva: Transición → Concepción (nuevo ciclo)

PERSPECTIVA 2: ESTÁTICA (Flujos de trabajo - actividades)
6 Flujos de trabajo centrales:
Flujo de trabajo
Descripción
Modelos UML usados
Modelado del negocio
Modelar procesos de negocios usando casos de uso empresariales
Casos de uso
Requerimientos
Identificar actores, desarrollar casos de uso
Casos de uso, modelos de interacción
Análisis y diseño
Crear modelo de diseño documentado
Arquitectónicos, componentes, objetos, secuencia
Implementación
Implementar y estructurar componentes en subsistemas
Componentes, despliegue
Pruebas
Proceso iterativo con implementación, luego pruebas de sistema
Casos de prueba
Despliegue
Crear liberación, distribuir a usuarios, instalar
Despliegue

3 Flujos de trabajo de apoyo:
Administración de configuración y cambio
Administración del proyecto
Entorno (herramientas de software para equipo)
INNOVACIÓN CLAVE: Fases NO están asociadas con flujos de trabajo específicos. Todos los flujos pueden estar activos en todas las fases.
Distribución de esfuerzo:
Fases iniciales: Mayor esfuerzo en modelado de negocio y requerimientos
Fases posteriores: Mayor esfuerzo en pruebas y despliegue

PERSPECTIVA 3: PRÁCTICA (Buenas prácticas recomendadas)
LAS 6 MEJORES PRÁCTICAS FUNDAMENTALES:
1. Desarrollo iterativo
Planear sistema basado en prioridades del cliente
Desarrollar características de mayor prioridad primero
2. Gestión de requerimientos
Documentar explícitamente requerimientos
Rastrear cambios a requerimientos
Analizar impacto ANTES de aceptar cambios
3. Arquitecturas basadas en componentes
Estructurar sistema en componentes reutilizables
4. Modelado visual (UML)
Usar modelos gráficos para representaciones estáticas/dinámicas
5. Verificar calidad
Garantizar cumplimiento con estándares organizacionales
6. Controlar cambios
Gestionar con sistema de administración de cambios
Procedimientos y herramientas de configuración
Limitaciones del RUP: ❌ NO adecuado para desarrollo embebido ❌ Puede ser demasiado pesado para proyectos pequeños ✅ Excelente para sistemas empresariales grandes
Ejemplo cotidiano: Producción de película - Concepción (idea/guion), Elaboración (storyboards/presupuesto), Construcción (filmación), Transición (distribución/marketing).

✅ CHECKLIST DE IMPLEMENTACIÓN
ANTES DE ELEGIR PROCESO:
[ ] ¿Qué tipo de sistema desarrollas? (crítico, web, embebido, empresarial)
[ ] ¿Cómo de estables son los requerimientos? (fijos vs volátiles)
[ ] ¿Qué tamaño tiene el equipo? (2 personas vs 200)
[ ] ¿Equipo distribuido o local?
[ ] ¿Existe contrato formal con especificación completa?
[ ] ¿Cliente participará activamente en desarrollo?
AL USAR MODELO CASCADA:
[ ] Especificación completa y aprobada antes de diseñar
[ ] Documentos firmados entre fases
[ ] Plan detallado de todo el proyecto
[ ] Estrategia para gestionar retroalimentación entre fases
[ ] Presupuesto para iteraciones (costosas)
AL USAR DESARROLLO INCREMENTAL:
[ ] Identificados incrementos con prioridades claras
[ ] Primeros incrementos cubren funcionalidad más crítica
[ ] Plan de refactorización para evitar degradación
[ ] Mecanismo para obtener feedback de cliente
[ ] Estrategia de documentación (no todo documentado al 100%)
AL USAR REUTILIZACIÓN:
[ ] Identificados componentes reutilizables disponibles
[ ] Evaluada calidad/confiabilidad de componentes
[ ] Comprendidas limitaciones de componentes
[ ] Plan para lo que NO existe como componente
[ ] Estrategia de integración
PARA ESPECIFICACIÓN:
[ ] Estudio de factibilidad completado
[ ] Usuarios/clientes identificados y accesibles
[ ] Técnicas de obtención definidas (entrevistas, observación)
[ ] Formato de documento de requerimientos acordado
[ ] Plan de validación de requerimientos
PARA DISEÑO E IMPLEMENTACIÓN:
[ ] Especificación de requerimientos disponible
[ ] Decisiones arquitectónicas documentadas
[ ] Estándares de codificación definidos
[ ] Herramientas de desarrollo seleccionadas
[ ] Estrategia de prueba de unidad
PARA VALIDACIÓN:
[ ] Datos de prueba preparados
[ ] Ambiente de pruebas configurado
[ ] Casos de prueba derivados de requerimientos
[ ] Equipo de pruebas (si separado de desarrollo)
[ ] Criterios de aceptación acordados con cliente
PARA EVOLUCIÓN:
[ ] Código documentado y mantenible
[ ] Arquitectura flexible para cambios
[ ] Sistema de control de versiones
[ ] Proceso de gestión de cambios
[ ] Presupuesto para mantenimiento
PARA ENFRENTAR CAMBIOS:
[ ] Estrategia definida (evitar vs tolerar)
[ ] Si prototipos: objetivos claros, plan de evaluación
[ ] Si incremental: plan de entregas, gestión de expectativas
[ ] Análisis de riesgos realizado
[ ] Flexibilidad incorporada en contratos
AL IMPLEMENTAR RUP:
[ ] Equipo capacitado en UML
[ ] Herramientas de modelado disponibles
[ ] Procesos de gestión de configuración establecidos
[ ] Compromiso con desarrollo iterativo
[ ] Recursos para todas las fases

⚠️ ERRORES COMUNES Y CÓMO EVITARLOS
ERROR 1: "Un proceso sirve para todo"
❌ Problema: Usar Cascada para startup, o Ágil para sistema crítico de avión
✅ Solución:
Sistema crítico de seguridad → Cascada (especificación completa)
E-commerce con cambios rápidos → Incremental
Sistema con componentes COTS → Reutilización
Proyecto con incertidumbre alta → Prototipado inicial

Tabla de decisión:
Característica del proyecto
Proceso recomendado
Requerimientos estables, sistema crítico
Cascada
Requerimientos cambiantes, time-to-market crítico
Incremental
Componentes disponibles en mercado
Reutilización
Alta incertidumbre, riesgos significativos
Espiral
Sistema empresarial grande
RUP


ERROR 2: "Las fases de Cascada nunca se traslapan"
❌ Problema: Esperar completar 100% de diseño antes de escribir una línea de código
✅ Solución:
Fases SE TRASLAPAN en práctica
Retroalimentación de implementación a diseño es normal
Permitir iteraciones limitadas entre fases
Pero: cada iteración es costosa, planearlas

ERROR 3: "Desarrollo incremental sin refactorización"
❌ Problema: Agregar incremento tras incremento sin limpiar código → Colapso estructural
✅ Solución:
Invertir en refactorización en cada incremento
Revisar arquitectura regularmente
Pagar "deuda técnica" continuamente
Estándares de código no negociables
Señales de alarma:
Cada cambio toma más tiempo que el anterior
Bugs en áreas no relacionadas
Código "frágil" que rompe fácilmente

ERROR 4: "Entregar prototipos como sistemas finales"
❌ Problema: Gerencia presiona para liberar prototipo porque "ya funciona"
✅ Solución:
Establecer DESDE EL INICIO: prototipos son desechables
Documentar qué SE OMITIÓ del prototipo:
Manejo de errores
Rendimiento
Seguridad
Escalabilidad
Educar a stakeholders sobre riesgos
Si presión es inevitable:
Crear lista de riesgos explícita
Obtener aprobación escrita de stakeholders
Plan de migración a sistema real

ERROR 5: "Ignorar la actividad de evolución"
❌ Problema: Solo planear desarrollo inicial, sin presupuesto para mantenimiento
✅ Solución: RECORDAR: Costos de evolución > costos de desarrollo inicial
Presupuesto para mantenimiento desde el inicio
Diseñar para mantenibilidad (código limpio, documentado)
Arquitectura flexible para cambios
Plan de transferencia de conocimiento
Regla 60/40:
60% costos = desarrollo inicial + pruebas
40% costos = evolución/mantenimiento post-entrega
PERO evolución frecuentemente supera desarrollo

ERROR 6: "Proceso rígido sin adaptación"
❌ Problema: Seguir proceso al pie de la letra sin considerar contexto
✅ Solución:
Procesos son MARCOS, no leyes absolutas
Adaptar según:
Tamaño de proyecto
Criticidad del sistema
Experiencia del equipo
Cultura organizacional
Equilibrio entre disciplina y flexibilidad (Boehm & Turner, 2003)

ERROR 7: "No gestionar cambios de requerimientos"
❌ Problema: Aceptar todos los cambios sin análisis → Caos
✅ Solución:
Sistema de gestión de cambios formal
Para cada cambio propuesto:
Documentar cambio
Analizar impacto (costo, tiempo, riesgo)
Aprobar o rechazar con justificación
Rastrear cambios aprobados
Comunicar a todos los afectados

ERROR 8: "Entrega incremental sin arquitectura global"
❌ Problema: Cada incremento diseñado independientemente → Incompatibilidad
✅ Solución:
Definir arquitectura del sistema completo ANTES del primer incremento
Identificar componentes compartidos
Estándares de interfaz entre componentes
Cada incremento se integra con arquitectura global

ERROR 9: "Pruebas solo al final"
❌ Problema: Probar todo el sistema al final del desarrollo → Errores costosos
✅ Solución:
Pruebas continuas desde el principio
Prueba de unidad: cada componente
Prueba de integración: conforme se integran
Prueba de sistema: sistema completo
Prueba de aceptación: con cliente

ERROR 10: "Ignorar el riesgo"
❌ Problema: No identificar/gestionar riesgos → Sorpresas desagradables
✅ Solución:
Identificar riesgos temprano y continuamente
Priorizar por impacto y probabilidad
Plan de mitigación para riesgos altos
Revisar riesgos regularmente
Ejemplos de riesgos comunes:
Requerimientos incompletos → Prototipo
Tecnología nueva → Spike técnico
Dependencia de terceros → Plan B
Equipo inexperto → Capacitación/mentoría

💡 REGLAS DE ORO DEL CAPÍTULO
1. NO EXISTE PROCESO PERFECTO UNIVERSAL
Diferente sistemas → Diferentes procesos. Adapta según contexto.
2. LAS 4 ACTIVIDADES SON UNIVERSALES
Especificación + Diseño/Implementación + Validación + Evolución Están en TODOS los procesos, solo cambia la organización.
3. EL CAMBIO ES INEVITABLE - DISEÑA PARA ÉL
No trates de evitar TODO cambio. Acepta que sucederá y prepárate.
4. CASCADA ≠ MALO, ÁGIL ≠ BUENO
Ambos son herramientas. Usa la correcta para el trabajo correcto.
5. PROTOTIPOS SON DESECHABLES
NO los conviertas en sistemas de producción. Explora, aprende, descarta.
6. ENTREGA VALOR TEMPRANO
Desarrollo incremental entrega funcionalidad útil rápido. Cliente gana valor antes.
7. EVOLUCIÓN > DESARROLLO
Costos de mantenimiento frecuentemente superan desarrollo inicial. Diseña para mantenibilidad.
8. DOCUMENTACIÓN PROPORCIONAL
Cascada: Mucha documentación. Incremental: Documentación selectiva. Encuentra balance.
9. EL RIESGO GUÍA EL PROCESO
Identifica riesgos → Elige técnicas que los mitiguen → Valora resultados → Ajusta.
10. PROCESO = PERSONAS + ACTIVIDADES + PRODUCTOS
No solo son pasos. Incluye roles, responsabilidades, precondiciones, postcondiciones.
11. EQUILIBRA PLAN vs AGILIDAD
Proceso 100% planificado = rígido. Proceso 100% ágil = caótico. Encuentra balance (Boehm & Turner).
12. REFACTORIZA O MUERE
Desarrollo incremental sin refactorización → Degradación estructural → Colapso eventual.

📊 PLANTILLAS Y HERRAMIENTAS
PLANTILLA 1: SELECTOR DE MODELO DE PROCESO
PROYECTO: _______________  EVALUADOR: _______________

CARACTERÍSTICAS DEL PROYECTO:

Requerimientos:
□ Estables y bien entendidos
□ Moderadamente cambiantes
□ Muy volátiles

Criticidad:
□ Crítico de seguridad (vida/muerte)
□ Crítico de negocio
□ No crítico

Tamaño de equipo:
□ Pequeño (2-10 personas)
□ Mediano (10-50 personas)
□ Grande (50+ personas)

Distribución:
□ Equipo co-localizado
□ Equipo distribuido (misma zona horaria)
□ Equipo global

Cliente:
□ Disponible para colaboración continua
□ Disponible para revisiones periódicas
□ Solo disponible al inicio/final

Contrato:
□ Requiere especificación completa
□ Permite desarrollo iterativo
□ Sin contrato formal

Experiencia del equipo:
□ Muy experimentado en dominio
□ Experiencia moderada
□ Equipo nuevo/junior

→ MODELO RECOMENDADO:

SI (Estables + Crítico + Contrato formal) → CASCADA
SI (Volátiles + No crítico + Cliente disponible) → INCREMENTAL
SI (Componentes disponibles + Tiempo limitado) → REUTILIZACIÓN
SI (Alta incertidumbre + Riesgos significativos) → ESPIRAL
SI (Grande + Distribuido + Empresarial) → RUP


PLANTILLA 2: PLANIFICACIÓN DE INCREMENTOS
PROYECTO: _______________  FECHA: _______________

INCREMENTO 1 (Mayor prioridad - Entregar primero):
Funcionalidades:
1. ______________________
2. ______________________
3. ______________________
Justificación: ¿Por qué es crítico? ______________________
Fecha estimada de entrega: _______________

INCREMENTO 2:
Funcionalidades:
1. ______________________
2. ______________________
Justificación: ______________________
Fecha estimada: _______________

INCREMENTO 3:
Funcionalidades:
1. ______________________
2. ______________________
Justificación: ______________________
Fecha estimada: _______________

COMPONENTES COMUNES A IDENTIFICAR:
- Base de datos: ______________________
- Autenticación: ______________________
- Interfaz base: ______________________

ARQUITECTURA GLOBAL:
[Diagrama simple de componentes principales]

PLAN DE REFACTORIZACIÓN:
□ Revisión de código cada incremento
□ Limpieza de deuda técnica
□ Actualización de documentación


PLANTILLA 3: EVALUACIÓN DE PROTOTIPO
PROTOTIPO: _______________

OBJETIVOS DEL PROTOTIPO:
□ Validar requerimientos
□ Explorar diseño de interfaz
□ Probar factibilidad técnica
□ Otro: ______________________

QUÉ INCLUYE:
1. ______________________
2. ______________________
3. ______________________

QUÉ NO INCLUYE (Omitido deliberadamente):
□ Manejo robusto de errores
□ Optimización de rendimiento
□ Seguridad completa
□ Escalabilidad
□ Documentación técnica
□ Otro: ______________________

PLAN DE EVALUACIÓN:
Evaluadores: ______________________
Escenarios de prueba:
1. ______________________
2. ______________________
Métricas de éxito: ______________________
Fecha de evaluación: _______________

DESPUÉS DE LA EVALUACIÓN:
□ Desechar prototipo (recomendado)
□ Usar como base (solo si justificado)

SI SE DESECHA:
Lecciones aprendidas: ______________________
Cambios a requerimientos: ______________________

SI SE USA COMO BASE:
Trabajo necesario antes de producción:
1. Agregar ______________________
2. Mejorar ______________________
3. Documentar ______________________


PLANTILLA 4: ANÁLISIS DE RIESGOS (Modelo Espiral)
PROYECTO: _______________  FASE: _______________

RIESGOS IDENTIFICADOS:

RIESGO 1: ______________________
Probabilidad: □ Alta  □ Media  □ Baja
Impacto: □ Alto  □ Medio  □ Bajo
Estrategia de mitigación:
□ Prototipo
□ Análisis adicional
□ Capacitación
□ Plan B
□ Otro: ______________________

RIESGO 2: ______________________
Probabilidad: □ Alta  □ Media  □ Baja
Impacto: □ Alto  □ Medio  □ Bajo
Estrategia: ______________________

RIESGO 3: ______________________
Probabilidad: □ Alta  □ Media  □ Baja
Impacto: □ Alto  □ Medio  □ Bajo
Estrategia: ______________________

MODELO DE DESARROLLO PARA SIGUIENTE CICLO:
Basado en riesgos, usar:
□ Prototipado (riesgo en UI/requerimientos)
□ Transformaciones formales (riesgo de seguridad)
□ Cascada (riesgo de integración)
□ Incremental (riesgo de cambios)

DECISIÓN PARA PRÓXIMA FASE:
□ Continuar con siguiente ciclo
□ Cancelar proyecto
□ Replantear objetivos


TABLA COMPARATIVA DE MODELOS
Aspecto
Cascada
Incremental
Reutilización
Espiral
RUP
Cuándo cambiar req.
Difícil, costoso
Fácil, esperado
Moderado
Esperado
Esperado
Visibilidad
Alta (docs)
Media (demos)
Media
Variable
Alta
Cliente involucrado
Inicio y final
Continuo
Moderado
Continuo
Fases clave
Entrega de valor
Solo al final
Temprana y continua
Temprana
Por ciclos
Por fases
Documentación
Extensa
Selectiva
Moderada
Variable
Extensa
Mejor para
Crítico, estable
Cambiante, web
Tiempo limitado
Alto riesgo
Grande, empresarial
Peor para
Innovación
Crítico, embebido
Sin componentes
Proyecto simple
Proyecto pequeño
Costo de cambio
Alto
Bajo
Medio
Depende del ciclo
Medio
Riesgo
Al final
Distribuido
Dependencia externa
Gestionado explícitamente
Gestionado


🔗 CONEXIONES CON OTROS CAPÍTULOS
← Capítulo 1 (Introducción):
Presentó las 4 actividades fundamentales → Cap 2 las detalla
Mencionó que diferentes sistemas necesitan diferentes técnicas → Cap 2 muestra los modelos
Introdujo concepto de proceso → Cap 2 lo explora profundamente
→ Capítulo 3 (Desarrollo Ágil):
Cap 2 menciona procesos ágiles brevemente
Cap 3 profundiza en Scrum, XP, principios ágiles
Muestra cómo implementar desarrollo incremental en práctica
→ Capítulo 4 (Ingeniería de Requerimientos):
Cap 2 introduce especificación como actividad
Cap 4 detalla TODO el proceso de requerimientos
Profundiza en obtención, análisis, validación, gestión
→ Capítulos 5-6 (Modelado y Diseño):
Cap 2 introduce diseño como actividad
Caps 5-6 muestran técnicas específicas (UML, patrones, arquitecturas)
→ Capítulos 7-8 (Pruebas y Validación):
Cap 2 introduce validación como actividad
Caps 7-8 profundizan en técnicas de prueba, estrategias, automatización
→ Capítulos 9 (Evolución):
Cap 2 introduce evolución como actividad
Cap 9 trata mantenimiento, reingeniería, sistemas legados
→ Capítulos 16-19 (Reutilización y Componentes):
Cap 2 introduce modelo de proceso orientado a reutilización
Caps 16-19 detallan COTS, frameworks, servicios, líneas de producto
→ Capítulos 22-23 (Gestión de Proyectos):
Cap 2 menciona roles y gestión
Caps 22-23 profundizan en planificación, riesgos, equipos
→ Capítulo 26 (Mejora de Procesos):
Cap 2 introduce procesos de software
Cap 26 muestra cómo mejorarlos, estandarizarlos, madurarlos

🚀 PARA IMPLEMENTAR MAÑANA
ACCIÓN INMEDIATA #1: Clasifica tu proyecto
MI PROYECTO ES:
- Tipo de sistema: _______________
- Volatilidad de requerimientos: □ Alta □ Media □ Baja
- Criticidad: □ Alta □ Media □ Baja
- Tamaño de equipo: _______________
→ MODELO APROPIADO: _______________

ACCIÓN INMEDIATA #2: Verifica las 4 actividades
¿Mi proceso cubre?
□ Especificación (¿Cómo sabré QUÉ construir?)
□ Diseño/Implementación (¿Cómo lo CONSTRUIRÉ?)
□ Validación (¿Cómo VERIFICARÉ que funciona?)
□ Evolución (¿Cómo lo MANTENDRÉ?)

Si falta alguna → Agregarla al proceso

ACCIÓN INMEDIATA #3: Identifica tu estrategia de cambio
¿Cómo enfrentaré el cambio inevitable?
□ Prototipos (para reducir incertidumbre)
□ Entrega incremental (para tolerar cambios)
□ Gestión de riesgos (modelo espiral)
□ Combinación de técnicas

Plan para mañana: _______________

ACCIÓN INMEDIATA #4: Si desarrollo incremental, planea incrementos
INCREMENTO 1 (más urgente):
- Funcionalidades: _______________
- Fecha: _______________

INCREMENTO 2:
- Funcionalidades: _______________
- Fecha: _______________

ARQUITECTURA COMÚN:
- Componentes compartidos: _______________

ACCIÓN INMEDIATA #5: Si tienes incertidumbre, crea prototipo
OBJETIVO DEL PROTOTIPO: _______________
QUÉ PROBAR: _______________
QUÉ OMITIR: _______________
EVALUADORES: _______________
FECHA EVALUACIÓN: _______________

¡IMPORTANTE! Este prototipo será DESECHABLE


💭 REFLEXIÓN FINAL
Los procesos de software NO son recetas mágicas.
Son herramientas que debes adaptar inteligentemente según:
Tu contexto específico
Tu equipo particular
Tu proyecto concreto
Tus restricciones reales
No existe el "mejor proceso":
Cascada NO es obsoleto
Ágil NO es la respuesta a todo
RUP NO es demasiado pesado siempre
Espiral NO es demasiado complejo necesariamente
Existe el proceso ADECUADO para TU situación.
Tres verdades universales:
Las 4 actividades son obligatorias (aunque las organices diferente)
El cambio es inevitable (prepárate para él)
La evolución cuesta más que el desarrollo (diseña para mantenibilidad)
Domina los fundamentos, luego adapta con inteligencia.

