CAPÍTULO 6: DISEÑO ARQUITECTÓNICO
📚 ESENCIA
Arquitectura de software = plano maestro del sistema
La arquitectura define CÓMO se organiza el sistema en componentes que trabajan juntos. Es el puente entre requisitos y código. No es "qué hace" sino "cómo está organizado para hacerlo".
Diferencia clave:
Arquitectura en pequeño: estructura de 1 programa individual
Arquitectura en grande: estructura del sistema completo (múltiples programas)
Por qué importa:
Primera decisión técnica crítica (difícil y costoso cambiar después)
Determina rendimiento, seguridad, mantenibilidad
Facilita comunicación entre stakeholders
Permite distribuir trabajo en equipos

🎯 CONCEPTOS CLAVE
1. Arquitectura vs Diseño Detallado
Analogía: Plano de una casa vs instrucciones para instalar un interruptor
Arquitectura: "Habrá 3 pisos, escalera central, cocina en primer piso"
Diseño detallado: "El interruptor va a 1.20m del suelo, cable calibre 12"
2. Las 9 Decisiones Arquitectónicas Fundamentales
Todo arquitecto debe responder:
#
Pregunta
Ejemplo
1
¿Existe arquitectura genérica reutilizable?
¿Es e-commerce típico o necesita arquitectura custom?
2
¿Cómo se distribuye en procesadores?
¿Monolito o microservicios? ¿Cuántos servidores?
3
¿Qué patrones arquitectónicos usar?
¿MVC? ¿Capas? ¿Cliente-servidor?
4
¿Cómo estructurar componentes?
¿Por capas, por módulos, por funcionalidad?
5
¿Cómo descomponer componentes grandes?
¿Dividir por responsabilidad, por datos, por UI?
6
¿Cómo controlar ejecución?
¿Centralizado o basado en eventos?
7
¿Cómo satisfacer requisitos NO funcionales?
¿Qué compromiso entre velocidad y seguridad?
8
¿Cómo evaluar el diseño?
Comparar contra patrones conocidos
9
¿Cómo documentar?
¿Qué vistas crear?

3. Requisitos No Funcionales Determinan Arquitectura
Requisito Crítico
Decisión Arquitectónica
Rendimiento
Componentes grandes, todo en 1 máquina, minimizar comunicaciones
Seguridad
Arquitectura en capas, activos críticos en capas internas
Protección
Operaciones sensibles en pocos componentes centralizados
Disponibilidad
Redundancia, replicación, sin puntos únicos de falla
Mantenibilidad
Componentes pequeños, bajo acoplamiento, alta cohesión

Ejemplo Real:
Sistema Bancario:
- Seguridad = CRÍTICO → Capas con validación múltiple
- Disponibilidad = CRÍTICO → Servidores replicados
- Rendimiento = IMPORTANTE → Caché agresivo

Videojuego:
- Rendimiento = CRÍTICO → Todo en cliente, mínima latencia
- Seguridad = MODERADO → Validación solo en servidor

🛠️ METODOLOGÍAS DETALLADAS
METODOLOGÍA 1: VISTAS ARQUITECTÓNICAS (Modelo 4+1)
QUÉ: Documentar arquitectura desde 5 perspectivas diferentes
CUÁNDO:
Sistema complejo (>5 desarrolladores)
Necesitas validación con diferentes stakeholders
Sistema crítico que requiere documentación formal
CÓMO - Las 5 Vistas:
1. Vista LÓGICA (para desarrolladores)
Muestra: Clases, objetos, abstracciones clave
Propósito: Relacionar requisitos con entidades
Ejemplo: Diagrama de clases UML

[Usuario]─────>[Carrito]─────>[Pedido]
                   │
                   └─────>[Producto]
2. Vista de PROCESO (para arquitectos)
Muestra: Procesos concurrentes en tiempo de ejecución
Propósito: Evaluar rendimiento, disponibilidad
Ejemplo: Diagramas de secuencia con threads

Thread UI ──┐
            ├──> [Procesar Pago]
Thread BD ──┘
3. Vista de DESARROLLO (para gerentes)
Muestra: Descomposición en módulos/paquetes
Propósito: Organizar equipos, asignar trabajo
Ejemplo: Estructura de carpetas/módulos

/src
  /frontend (Equipo A)
  /backend  (Equipo B)
  /database (Equipo C)
4. Vista FÍSICA (para DevOps)
Muestra: Hardware y distribución de software
Propósito: Planear infraestructura, deployment
Ejemplo: Diagrama de despliegue

[Servidor Web] ←→ [Servidor App] ←→ [Servidor BD]
     AWS            AWS               AWS
5. Vista de CASOS DE USO (+1 que une todo)
Muestra: Escenarios que cruzan todas las vistas
Propósito: Validar que las 4 vistas sean consistentes
Ejemplo: "Procesar compra" usa todas las vistas
PLANTILLA - Cuándo Usar Cada Vista:
Vista
Úsala Cuando...
NO La Uses Cuando...
Lógica
Diseñas clases OO
Sistema no OO (script simple)
Proceso
Hay concurrencia, tiempo real
Sistema secuencial simple
Desarrollo
>3 desarrolladores
Proyecto personal
Física
Sistema distribuido
Todo corre en 1 máquina
Casos Uso
SIEMPRE
Nunca omitir


METODOLOGÍA 2: PATRONES ARQUITECTÓNICOS
QUÉ: Soluciones probadas a problemas arquitectónicos recurrentes
CUÁNDO: Antes de inventar arquitectura custom, revisar patrones conocidos

PATRÓN 1: MODELO-VISTA-CONTROLADOR (MVC)
Descripción: Separa datos (Modelo), presentación (Vista), lógica de interacción (Controlador)
Cuándo Usar:
✅ Múltiples formas de ver/editar los mismos datos
✅ Interfaz puede cambiar frecuentemente
✅ Desarrollo web/móvil moderno
Cuándo NO Usar:
❌ Interacción muy simple (calculadora básica)
❌ Vista única que nunca cambiará
❌ Datos y presentación inseparables
Ejemplo Concreto - Blog:
MODELO (datos):
  - Post {título, contenido, fecha}
  - Usuario {nombre, email}
  
VISTA (presentación):
  - VistaLista: muestra títulos
  - VistaDetalle: muestra post completo
  - VistaEditor: formulario edición
  
CONTROLADOR (lógica):
  - Al hacer clic post → Controller pide Modelo → actualiza Vista
  - Al editar → Controller valida → actualiza Modelo → refresca Vistas
Ventajas:
Cambiar diseño UI sin tocar lógica de negocio
Múltiples interfaces (web + móvil) mismo modelo
Testing más fácil (modelo aislado)
Desventajas:
Complejidad innecesaria para apps simples
Más código boilerplate

PATRÓN 2: ARQUITECTURA EN CAPAS
Descripción: Organizar sistema en capas horizontales, cada capa usa solo la inmediatamente inferior
Estructura Típica (4 capas):
┌─────────────────────────────┐
│ CAPA 4: Interfaz Usuario    │ ← Navegador, app móvil
├─────────────────────────────┤
│ CAPA 3: Lógica Negocio      │ ← Reglas, validaciones
├─────────────────────────────┤
│ CAPA 2: Acceso Datos        │ ← Repositorios, ORMs
├─────────────────────────────┤
│ CAPA 1: Base Datos/SO       │ ← PostgreSQL, filesystem
└─────────────────────────────┘
Regla de Oro: Capa N solo habla con Capa N-1
Cuándo Usar:
✅ Sistema empresarial grande
✅ Múltiples equipos trabajando en paralelo
✅ Seguridad multinivel (datos sensibles en capas profundas)
✅ Portabilidad (cambiar BD sin afectar UI)
Ejemplo Real - Sistema Hospital:
CAPA 4 (UI):
  - Portal web médicos
  - App móvil pacientes
  
CAPA 3 (Negocio):
  - Validar receta médica
  - Calcular dosis por peso/edad
  - Verificar alergias
  
CAPA 2 (Datos):
  - Repository de pacientes
  - Repository de medicamentos
  
CAPA 1 (Infraestructura):
  - Base datos pacientes
  - Servicio externo farmacia
Ventajas:
Sustitución de capas completas
Desarrollo incremental (terminar capa 1 → 2 → 3)
Testing por capas
Desventajas:
Posible impacto en rendimiento (muchas capas = muchas llamadas)
A veces necesitas "saltar" capas (complejidad extra)

PATRÓN 3: REPOSITORIO (Base de Datos Central)
Descripción: Todos los componentes comparten datos mediante un repositorio central
Estructura:
       ┌─────────────────┐
        │   REPOSITORIO   │
        │   (Base Datos)  │
        └────────┬────────┘
         ┌───────┼───────┐
         │       │       │
      [Comp1] [Comp2] [Comp3]
      Editor  Compiler Debugger
Cuándo Usar:
✅ Grandes volúmenes de información compartida
✅ Sistema de información administrativa
✅ IDEs (editor, compilador, debugger comparten código)
✅ Sistemas de gestión documental
Ejemplo - IDE de Programación:
REPOSITORIO:
  - Código fuente
  - Árbol sintaxis abstracto
  - Tabla de símbolos
  - Configuración proyecto

COMPONENTES:
  - Editor: lee/escribe código
  - Compilador: lee código, escribe errores
  - Debugger: lee código + símbolos
  - Refactoring: lee/modifica código
  
Todos acceden al MISMO repositorio → consistencia garantizada
Ventajas:
Componentes independientes (no se conocen entre sí)
Backup centralizado
Datos consistentes
Desventajas:
Repositorio = punto único de falla
Posible cuello de botella
Difícil distribuir geográficamente

PATRÓN 4: CLIENTE-SERVIDOR
Descripción: Servicios centralizados (servidores) atendidos por múltiples clientes
Estructura:
Cliente 1 ──┐
Cliente 2 ──┼──→ [Servidor App] ──→ [Base Datos]
Cliente 3 ──┘
Componentes:
Servidores: Ofrecen servicios (archivos, impresión, email, API)
Clientes: Consumen servicios (navegadores, apps móviles)
Red: Conecta ambos (HTTP, TCP/IP)
Cuándo Usar:
✅ Acceso desde múltiples ubicaciones
✅ Datos centralizados
✅ Carga variable (agregar servidores según demanda)
Ejemplo Multi-tier (3 capas):
┌──────────────┐
│ Cliente Web  │ ← Navegador (HTML/CSS/JS)
└──────┬───────┘
       │ HTTP
┌──────▼───────┐
│ Servidor App │ ← Node.js, Django (Lógica negocio)
└──────┬───────┘
       │ SQL
┌──────▼───────┐
│ Servidor BD  │ ← PostgreSQL (Datos)
└──────────────┘
Ventajas:
Escalabilidad (replicar servidores)
Mantenimiento centralizado
Acceso ubicuo
Desventajas:
Dependencia de red
Servidor = punto de falla
Vulnerable a ataques DoS

PATRÓN 5: TUBERÍA Y FILTRO (Pipeline)
Descripción: Datos fluyen por transformaciones secuenciales
Estructura:
Entrada → [Filtro 1] → [Filtro 2] → [Filtro 3] → Salida
          Transform    Transform    Transform
Cuándo Usar:
✅ Procesamiento batch de datos
✅ Transformaciones secuenciales
✅ Flujos de datos Unix-style
✅ Sistemas de compilación
Ejemplo 1 - Sistema Facturación:
[Leer Pagos] → [Validar] → [Aplicar a Facturas] → [Generar Recibos] → [Emitir Recordatorios]
    CSV          Datos       Actualizar BD          PDF               Email
Ejemplo 2 - Procesamiento Imagen:
[Cargar] → [Redimensionar] → [Aplicar Filtro] → [Comprimir] → [Guardar]
  JPG        800x600          Sepia              JPEG 80%       PNG
Ejemplo 3 - Pipeline Unix:
bash
cat log.txt | grep ERROR | sort | uniq -c | sort -rn > errores.txt
   ↓           ↓          ↓       ↓           ↓         ↓
 Leer      Filtrar    Ordenar  Contar    Ordenar    Escribir
```

**Ventajas:**
- Fácil entender el flujo
- Transformaciones reutilizables
- Fácil paralelizar

**Desventajas:**
- Difícil para sistemas interactivos
- No apto para interfaces gráficas complejas

---

### **METODOLOGÍA 3: ARQUITECTURAS DE APLICACIÓN**

**QUÉ:** Arquitecturas genéricas para tipos específicos de sistemas

---

#### **ARQUITECTURA A: SISTEMAS DE PROCESAMIENTO DE TRANSACCIONES**

**Definición:** Sistemas que procesan peticiones de usuarios modificando una base de datos

**Estructura Genérica:**
```
[Procesamiento I/O] → [Lógica Aplicación] → [Gestor Transacciones] → [Base Datos]
   Usuario Web          Validar/Procesar      ACID Garantizado         Persistencia
```

**Ejemplos Típicos:**
- Cajeros automáticos
- E-commerce
- Reservas (vuelos, hoteles, citas)
- Sistemas bancarios

**Arquitectura Específica - Sistema Bancario ATM:**
```
ENTRADA:
  - Insertar tarjeta
  - Ingresar PIN
  - Seleccionar "Retirar $100"

PROCESO:
  - Validar PIN
  - Consultar saldo
  - Verificar fondos suficientes
  - Actualizar saldo (-$100)
  - Registrar transacción
  
SALIDA:
  - Entregar efectivo
  - Imprimir recibo
  - Devolver tarjeta
```

**Características Clave:**
- **Atomicidad:** Todo o nada (si falla, rollback completo)
- **Consistencia:** BD siempre válida
- **Aislamiento:** Transacciones concurrentes no interfieren
- **Durabilidad:** Una vez completada, permanente

**Arquitectura Web Moderna (4 Capas):**
```
1. Servidor WEB:
   - Maneja HTTP/HTTPS
   - Renderiza páginas
   - Gestiona sesiones

2. Servidor APLICACIÓN:
   - Lógica de negocio
   - Validaciones
   - Procesamiento

3. Gestor TRANSACCIONES:
   - Control ACID
   - Rollback si error

4. Servidor BASE DATOS:
   - Almacenamiento persistente
   - Consultas SQL
```

---

#### **ARQUITECTURA B: SISTEMAS DE PROCESAMIENTO DE LENGUAJE**

**Definición:** Traducen un lenguaje a otro (compiladores, intérpretes, traductores XML)

**Componentes Típicos:**
```
┌──────────────┐
│Código Fuente │
└──────┬───────┘
       │
┌──────▼───────────┐
│Analizador LÉXICO │ → Tokens
└──────┬───────────┘
       │
┌──────▼────────────┐
│Analizador SINTAXIS│ → Árbol Sintaxis
└──────┬────────────┘
       │
┌──────▼────────────┐
│Analizador SEMÁNTICO│ → Validaciones
└──────┬────────────┘
       │
┌──────▼───────────┐
│Generador CÓDIGO  │ → Código Máquina
└──────────────────┘
Ejemplo Concreto - Compilador Python:
python
# Código fuente
def suma(a, b):
    return a + b

↓ LÉXICO: Identifica tokens
[def] [suma] [(] [a] [,] [b] [)] [:] [return] [a] [+] [b]

↓ SINTAXIS: Construye árbol
FunctionDef
  ├─ name: suma
  ├─ args: [a, b]
  └─ body: Return
           └─ BinOp: a + b

↓ SEMÁNTICO: Verifica tipos, símbolos

↓ GENERACIÓN: Bytecode Python
```

**Dos Variantes Arquitectónicas:**

**1. Modelo Tubería (Batch):**
```
Léxico → Sintaxis → Semántico → Optimizador → Generador → Código
(Secuencial, cada fase completa antes de siguiente)
```

**2. Modelo Repositorio (Interactivo - IDE):**
```
         ┌─────────────┐
         │ REPOSITORIO │
         │  - Símbolos │
         │  - AST      │
         │  - Errores  │
         └──────┬──────┘
    ┌───────────┼───────────┐
    │           │           │
[Editor]  [Compilador]  [Debugger]
(Todos comparten datos, updates en tiempo real)
```

---

## ✅ CHECKLIST IMPLEMENTACIÓN

### **Fase 1: Decisiones Iniciales**
- [ ] Identificar requisitos NO funcionales críticos (rendimiento, seguridad, etc.)
- [ ] ¿Existe arquitectura genérica del dominio? (e-commerce, ERP, etc.)
- [ ] ¿Sistema distribuido o monolítico?
- [ ] ¿Qué patrones arquitectónicos considerar?

### **Fase 2: Diseño**
- [ ] Elegir patrón(es) arquitectónico(s) apropiado(s)
- [ ] Definir componentes principales y sus responsabilidades
- [ ] Establecer interfaces entre componentes
- [ ] Documentar decisiones y trade-offs

### **Fase 3: Documentación**
- [ ] Crear vista CONCEPTUAL (diagramas de bloques)
- [ ] Crear vista LÓGICA (si sistema OO)
- [ ] Crear vista FÍSICA (si sistema distribuido)
- [ ] Crear vista PROCESO (si hay concurrencia)
- [ ] Validar con casos de uso críticos

### **Fase 4: Validación**
- [ ] ¿Satisface requisitos funcionales?
- [ ] ¿Satisface requisitos NO funcionales?
- [ ] ¿Es escalable/mantenible?
- [ ] ¿Equipo puede implementarla?

---

## ⚠️ 7 ERRORES COMUNES

**1. SOBRE-INGENIERÍA**
- ❌ "Usaré microservicios, event sourcing, CQRS para mi blog personal"
- ✅ "Blog simple → Monolito MVC con SQLite. Ya."

**2. IGNORAR REQUISITOS NO FUNCIONALES**
- ❌ "Arquitectura bonita pero el sistema es lento/inseguro"
- ✅ "Rendimiento crítico → Menos capas, caché agresivo, CDN"

**3. MEZCLAR PATRONES INCOMPATIBLES**
- ❌ "Usaré capas + repositorio + cliente-servidor todo junto sin plan"
- ✅ "Backend en capas (lógica), con repositorio (datos), expuesto como servidor (API)"

**4. ARQUITECTURA SIN CASOS DE USO**
- ❌ "Hermosa arquitectura que nadie entiende cómo usar"
- ✅ "Validar con: '¿Cómo funciona login?' '¿Cómo se procesa pago?'"

**5. DOCUMENTACIÓN EXCESIVA O NULA**
- ❌ "50 diagramas UML formales que nadie lee"
- ❌ "Código sin ningún diagrama arquitectónico"
- ✅ "1 diagrama conceptual + 1-2 diagramas detallados de partes críticas"

**6. PUNTO ÚNICO DE FALLA NO IDENTIFICADO**
- ❌ "Todo depende de 1 servidor sin backup"
- ✅ "Identificar puntos críticos → Redundancia → Plan B"

**7. ARQUITECTURA INFLEXIBLE**
- ❌ "Cambiar requisito = reescribir sistema completo"
- ✅ "Componentes desacoplados, interfaces claras, fácil sustituir"

---

## 💡 12 REGLAS DE ORO

1. **Arquitectura ANTES de código** - Refactorizar arquitectura es 10x más caro que refactorizar código

2. **Requisitos NO funcionales mandan** - Rendimiento/seguridad/escalabilidad determinan arquitectura

3. **Patrón conocido > invención custom** - No reinventar la rueda, usar patrones probados

4. **Simplicidad por defecto** - Empezar simple, complejizar solo si necesario

5. **Documentar decisiones Y alternativas descartadas** - "Elegimos X porque Y, descartamos Z por..."

6. **Validar con stakeholders** - Vista conceptual debe ser entendible por no-técnicos

7. **Arquitectura = compromiso** - Siempre hay trade-offs (velocidad vs seguridad, etc.)

8. **Separación de responsabilidades** - Cada componente hace UNA cosa bien

9. **Bajo acoplamiento, alta cohesión** - Componentes independientes pero internamente coherentes

10. **Planear para fallos** - ¿Qué pasa si componente X cae? ¿Degradación graceful?

11. **Evolución gradual** - Arquitectura debe permitir cambios incrementales

12. **Consistencia de vistas** - Si dibujas 3 vistas, deben ser del mismo sistema

---

## 📊 TABLA DE DECISIÓN - QUÉ PATRÓN USAR

| Necesitas... | Usa Patrón... | Porque... |
|-------------|---------------|-----------|
| Múltiples UIs para mismos datos | **MVC** | Separación vista-modelo |
| Sistema grande con equipos separados | **Capas** | Desarrollo paralelo |
| Muchos componentes compartiendo datos | **Repositorio** | Centralización datos |
| Acceso remoto multi-ubicación | **Cliente-Servidor** | Distribución geográfica |
| Procesamiento secuencial datos | **Tubería-Filtro** | Transformaciones claras |
| Transacciones BD concurrentes | **Procesamiento Transacciones** | Garantías ACID |
| Compilar/traducir lenguaje | **Procesamiento Lenguaje** | Fases análisis estándar |

---

## 🔗 CONEXIONES CON CAPÍTULOS ANTERIORES

**← Cap 2 (Procesos):**
- Diseño arquitectónico = primera etapa proceso de diseño
- En métodos ágiles: arquitectura inicial antes de iteraciones
- RUP: arquitectura se refina en cada iteración

**← Cap 4 (Requisitos):**
- Requisitos NO funcionales → determinan arquitectura
- Arquitectura conceptual ayuda a organizar especificación de requisitos
- Casos de uso (+1) validan que arquitectura satisfaga requisitos

**← Cap 5 (Modelado):**
- Vistas arquitectónicas usan diagramas UML:
  - Vista lógica → Diagramas de clases
  - Vista proceso → Diagramas de secuencia
  - Vista casos uso → Diagramas de casos de uso
- Modelo 4+1 similar a perspectivas de modelado

**→ Cap 18 (Sistemas Distribuidos):**
- Cliente-servidor se profundiza
- Arquitecturas distribuidas específicas
- Consideraciones de red, latencia, fallos

---

## 🚀 5 ACCIONES INMEDIATAS

### **ACCIÓN 1: Análisis Arquitectónico de Sistema Conocido (30 min)**
Toma una app que uses (Instagram, Gmail, Netflix):
1. Dibuja diagrama de bloques conceptual
2. Identifica qué patrón(es) usa
3. ¿Por qué esa arquitectura y no otra?

**Ejemplo Netflix:**
- Cliente-Servidor (app → servidores)
- Capas (UI, recomendaciones, streaming, BD)
- MVC en frontend
- ¿Por qué? Escalabilidad, múltiples clientes

---

### **ACCIÓN 2: Decisión Arquitectónica Para Tu Proyecto (1 hora)**
Si tienes proyecto actual:
1. Lista 3 requisitos NO funcionales críticos
2. Para cada uno, ¿qué implica arquitectónicamente?
3. Elige 1-2 patrones arquitectónicos
4. Documenta decisión en 1 párrafo

**Template:**
```
SISTEMA: [nombre]
REQUISITOS CRÍTICOS: 
  - Rendimiento: [descripción]
  - Seguridad: [descripción]
  
DECISIÓN ARQUITECTÓNICA:
Usaremos [patrón X] porque [razón].
Descartamos [patrón Y] porque [limitación].

TRADE-OFFS ACEPTADOS:
[Qué sacrificamos y por qué vale la pena]
```

---

### **ACCIÓN 3: Dibuja Vista Conceptual (45 min)**
Para un sistema que conozcas o tu proyecto:
1. Identifica 5-8 componentes principales
2. Dibuja cajas y flechas
3. Etiqueta relaciones (API REST, SQL, eventos, etc.)
4. Valida: "¿Alguien no-técnico lo entiende?"

**Ejemplo E-commerce Simple:**
```
[Navegador] ←HTTP→ [API Server] ←SQL→ [PostgreSQL]
                       ↓
                   [Worker]
                       ↓
                   [Email Service]
```

---

### **ACCIÓN 4: Comparación de Patrones (30 min)**
Diseña MISMO sistema con 2 patrones diferentes:

**Caso:** Sistema de biblioteca (préstamos de libros)

**Opción A - Capas:**
```
UI → Lógica Préstamos → Acceso BD → PostgreSQL
```

**Opción B - Cliente-Servidor:**
```
App Móvil ─┐
Web App   ─┼→ API Server → BD
Kiosko    ─┘
```

Compara: ¿Cuál es mejor para qué escenario?

---

### **ACCIÓN 5: Documenta Arquitectura Existente (2 horas)**
Si heredaste código sin documentación:
1. Identifica componentes principales (carpetas, módulos)
2. Dibuja vista conceptual actual
3. Identifica patrón implícito (aunque esté mal hecho)
4. Propón mejora incremental

**Template:**
```
ARQUITECTURA ACTUAL:
[Diagrama]

PATRÓN IMPLÍCITO: [X mal implementado]

PROBLEMAS:
1. [Problema específico]
2. [Problema específico]

MEJORA PROPUESTA:
[Cambio incremental sin reescribir todo]

🎯 RESUMEN EJECUTIVO
Arquitectura de software = estructura fundamental del sistema
3 Componentes Clave:
Decisiones (9 preguntas críticas)
Vistas (4+1: lógica, proceso, desarrollo, física, casos uso)
Patrones (5 esenciales: MVC, Capas, Repositorio, Cliente-Servidor, Tubería)
Regla Maestra: Requisitos NO funcionales determinan arquitectura
Acción Mínima Viable:
Dibujar 1 diagrama conceptual
Elegir 1 patrón arquitectónico justificado
Validar con 3 casos de uso críticos
✅ Sistema bien arquitectado = fácil de escalar, mantener y evolucionar
