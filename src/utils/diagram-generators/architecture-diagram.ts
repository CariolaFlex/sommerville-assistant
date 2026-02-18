import type { ArchitectureInfo } from '@/types/recommendation';
import { sanitizeMermaidText, resetNodeCounter } from './helpers';

/**
 * Genera un diagrama de arquitectura profesional segun el patron
 * Optimizado para PDF (A4) y visualizacion web
 */
export function generateArchitectureDiagram(architecture: ArchitectureInfo): string {
  resetNodeCounter();

  if (!architecture?.style) {
    console.warn('Invalid architecture data provided, using fallback diagram');
    return generateGenericArchitecture({ style: 'Arquitectura Generica' } as ArchitectureInfo);
  }

  const style = architecture.style.toLowerCase();

  if (style.includes('capas') || style.includes('layers') || style.includes('layered')) {
    return generateLayeredArchitecture();
  } else if (style.includes('cliente') || style.includes('servidor') || style.includes('client-server')) {
    return generateClientServerArchitecture();
  } else if (style.includes('microservicio') || style.includes('microservice')) {
    return generateMicroservicesArchitecture();
  } else if (style.includes('monolítico') || style.includes('monolithic') || style.includes('monolito')) {
    return generateMonolithicArchitecture();
  } else if (style.includes('mvc') || style.includes('model-view-controller')) {
    return generateMVCArchitecture();
  } else if (style.includes('repository') || style.includes('repositorio')) {
    return generateRepositoryArchitecture();
  } else if (style.includes('pipe') || style.includes('filter') || style.includes('tuberia') || style.includes('batch')) {
    return generatePipeFilterArchitecture();
  } else if (style.includes('event') || style.includes('evento') || style.includes('distribuido')) {
    return generateEventDrivenArchitecture();
  } else {
    return generateGenericArchitecture(architecture);
  }
}

function generateLayeredArchitecture(): string {
  return `flowchart TB
    subgraph presentation ["CAPA DE PRESENTACION"]
      UI["<b>Interfaz de Usuario</b><br/>Vistas y componentes"]
      API_GW["<b>API Gateway</b><br/>Punto de entrada"]
    end

    subgraph business ["LOGICA DE NEGOCIO"]
      Services["<b>Servicios</b><br/>Reglas de negocio"]
      Validation["<b>Validacion</b><br/>Verificacion de datos"]
    end

    subgraph data ["CAPA DE DATOS"]
      Repository["<b>Repositorios</b><br/>Acceso a datos"]
      Cache["<b>Cache</b><br/>Rendimiento"]
    end

    DB[("<b>Base de Datos</b>")]

    UI --> API_GW
    API_GW --> Services
    Services --> Validation
    Validation --> Repository
    Repository --> Cache
    Repository --> DB

    style presentation fill:#eff6ff,stroke:#2563eb,stroke-width:2px,color:#1e3a5f
    style business fill:#f5f3ff,stroke:#7c3aed,stroke-width:2px,color:#3b0764
    style data fill:#fefce8,stroke:#ca8a04,stroke-width:2px,color:#713f12
    style UI fill:#dbeafe,stroke:#3b82f6,stroke-width:1px,color:#1e40af
    style API_GW fill:#dbeafe,stroke:#3b82f6,stroke-width:1px,color:#1e40af
    style Services fill:#ede9fe,stroke:#8b5cf6,stroke-width:1px,color:#5b21b6
    style Validation fill:#ede9fe,stroke:#8b5cf6,stroke-width:1px,color:#5b21b6
    style Repository fill:#fef9c3,stroke:#eab308,stroke-width:1px,color:#854d0e
    style Cache fill:#fef9c3,stroke:#eab308,stroke-width:1px,color:#854d0e
    style DB fill:#d1fae5,stroke:#059669,stroke-width:2px,color:#064e3b`;
}

function generateClientServerArchitecture(): string {
  return `flowchart LR
    subgraph clients ["CLIENTES"]
      Web["<b>Cliente Web</b><br/>Navegador"]
      Mobile["<b>Cliente Movil</b><br/>iOS / Android"]
      Desktop["<b>Cliente Desktop</b><br/>Aplicacion nativa"]
    end

    subgraph server ["SERVIDOR"]
      API["<b>API REST</b><br/>Endpoints"]
      Auth["<b>Autenticacion</b><br/>Seguridad"]
      Logic["<b>Logica</b><br/>Procesamiento"]
    end

    DB[("<b>Base de Datos</b>")]

    Web <-->|HTTPS| API
    Mobile <-->|HTTPS| API
    Desktop <-->|HTTPS| API
    API --> Auth
    API --> Logic
    Logic --> DB

    style clients fill:#eff6ff,stroke:#2563eb,stroke-width:2px,color:#1e3a5f
    style server fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#78350f
    style Web fill:#dbeafe,stroke:#3b82f6,stroke-width:1px,color:#1e40af
    style Mobile fill:#ede9fe,stroke:#8b5cf6,stroke-width:1px,color:#5b21b6
    style Desktop fill:#c7d2fe,stroke:#4f46e5,stroke-width:1px,color:#312e81
    style API fill:#fef3c7,stroke:#f59e0b,stroke-width:1px,color:#92400e
    style Auth fill:#fee2e2,stroke:#ef4444,stroke-width:1px,color:#991b1b
    style Logic fill:#fef3c7,stroke:#f59e0b,stroke-width:1px,color:#92400e
    style DB fill:#d1fae5,stroke:#059669,stroke-width:2px,color:#064e3b`;
}

function generateMicroservicesArchitecture(): string {
  return `flowchart TB
    LB["<b>Load Balancer</b>"]
    Gateway["<b>API Gateway</b><br/>Enrutamiento y auth"]

    subgraph services ["MICROSERVICIOS"]
      Auth["<b>Auth Service</b><br/>Autenticacion"]
      User["<b>User Service</b><br/>Gestion de usuarios"]
      Product["<b>Product Service</b><br/>Catalogo"]
      Order["<b>Order Service</b><br/>Pedidos"]
    end

    subgraph databases ["BASES DE DATOS"]
      DB1[("<b>Auth DB</b>")]
      DB2[("<b>Users DB</b>")]
      DB3[("<b>Products DB</b>")]
      DB4[("<b>Orders DB</b>")]
    end

    MQ["<b>Message Queue</b><br/>Comunicacion asincrona"]

    LB ==> Gateway
    Gateway --> Auth
    Gateway --> User
    Gateway --> Product
    Gateway --> Order

    Auth --> DB1
    User --> DB2
    Product --> DB3
    Order --> DB4

    Auth -.-> MQ
    User -.-> MQ
    Product -.-> MQ
    Order -.-> MQ

    style LB fill:#e0e7ff,stroke:#4f46e5,stroke-width:2px,color:#312e81
    style Gateway fill:#ede9fe,stroke:#7c3aed,stroke-width:3px,color:#3b0764
    style services fill:#eff6ff,stroke:#2563eb,stroke-width:2px,color:#1e3a5f
    style databases fill:#f0fdf4,stroke:#16a34a,stroke-width:2px,color:#166534
    style Auth fill:#fee2e2,stroke:#ef4444,stroke-width:1px,color:#991b1b
    style User fill:#dbeafe,stroke:#3b82f6,stroke-width:1px,color:#1e40af
    style Product fill:#fef3c7,stroke:#f59e0b,stroke-width:1px,color:#92400e
    style Order fill:#d1fae5,stroke:#10b981,stroke-width:1px,color:#065f46
    style DB1 fill:#fef2f2,stroke:#fca5a5,stroke-width:1px,color:#991b1b
    style DB2 fill:#eff6ff,stroke:#93c5fd,stroke-width:1px,color:#1e40af
    style DB3 fill:#fffbeb,stroke:#fcd34d,stroke-width:1px,color:#92400e
    style DB4 fill:#ecfdf5,stroke:#6ee7b7,stroke-width:1px,color:#065f46
    style MQ fill:#faf5ff,stroke:#c084fc,stroke-width:2px,color:#6b21a8`;
}

function generateMonolithicArchitecture(): string {
  return `flowchart TB
    Client["<b>Clientes</b><br/>Web / Movil / API"]

    subgraph Monolith ["APLICACION MONOLITICA"]
      direction TB
      Auth["<b>Autenticacion</b><br/>Login y permisos"]
      Business["<b>Logica de Negocio</b><br/>Reglas del dominio"]
      Data["<b>Acceso a Datos</b><br/>ORM y queries"]
      Utils["<b>Utilidades</b><br/>Servicios comunes"]
    end

    DB[("<b>Base de Datos Unica</b>")]

    Client ==> Auth
    Auth --> Business
    Business --> Utils
    Business --> Data
    Data ==> DB

    style Client fill:#dbeafe,stroke:#2563eb,stroke-width:2px,color:#1e3a5f
    style Monolith fill:#fef3c7,stroke:#d97706,stroke-width:3px,color:#78350f
    style Auth fill:#fee2e2,stroke:#ef4444,stroke-width:1px,color:#991b1b
    style Business fill:#d1fae5,stroke:#059669,stroke-width:1px,color:#064e3b
    style Data fill:#fef9c3,stroke:#eab308,stroke-width:1px,color:#854d0e
    style Utils fill:#e0e7ff,stroke:#6366f1,stroke-width:1px,color:#312e81
    style DB fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#7f1d1d`;
}

function generateMVCArchitecture(): string {
  return `flowchart TB
    User["<b>Usuario</b><br/>Interaccion"]

    subgraph mvc ["PATRON MVC"]
      View["<b>VISTA</b><br/>Interfaz de usuario<br/>Templates y componentes"]
      Controller["<b>CONTROLADOR</b><br/>Logica de control<br/>Rutas y acciones"]
      Model["<b>MODELO</b><br/>Datos y logica<br/>Entidades del dominio"]
    end

    DB[("<b>Base de Datos</b>")]

    User -->|Request| Controller
    Controller -->|Selecciona| View
    Controller -->|Consulta| Model
    Model -->|Notifica cambios| View
    View -->|Response| User
    Model <--> DB

    style User fill:#e0e7ff,stroke:#4f46e5,stroke-width:2px,color:#312e81
    style mvc fill:#f8fafc,stroke:#94a3b8,stroke-width:2px,color:#334155
    style View fill:#ede9fe,stroke:#7c3aed,stroke-width:2px,color:#3b0764
    style Controller fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#78350f
    style Model fill:#d1fae5,stroke:#059669,stroke-width:2px,color:#064e3b
    style DB fill:#dbeafe,stroke:#2563eb,stroke-width:2px,color:#1e3a5f`;
}

function generateRepositoryArchitecture(): string {
  return `flowchart TB
    subgraph clients ["COMPONENTES"]
      C1["<b>Componente A</b><br/>Modulo principal"]
      C2["<b>Componente B</b><br/>Modulo secundario"]
      C3["<b>Componente C</b><br/>Modulo auxiliar"]
    end

    Repo["<b>REPOSITORIO CENTRAL</b><br/>Coordinacion y acceso unificado"]

    subgraph storage ["ALMACENAMIENTO"]
      DB[("<b>Base de Datos</b><br/>Datos compartidos")]
      Files["<b>File System</b><br/>Archivos y documentos"]
    end

    C1 <--> Repo
    C2 <--> Repo
    C3 <--> Repo
    Repo <--> DB
    Repo <--> Files

    style clients fill:#eff6ff,stroke:#2563eb,stroke-width:2px,color:#1e3a5f
    style storage fill:#f0fdf4,stroke:#16a34a,stroke-width:2px,color:#166534
    style C1 fill:#dbeafe,stroke:#3b82f6,stroke-width:1px,color:#1e40af
    style C2 fill:#ede9fe,stroke:#8b5cf6,stroke-width:1px,color:#5b21b6
    style C3 fill:#fef3c7,stroke:#f59e0b,stroke-width:1px,color:#92400e
    style Repo fill:#fef3c7,stroke:#d97706,stroke-width:3px,color:#78350f
    style DB fill:#d1fae5,stroke:#059669,stroke-width:2px,color:#064e3b
    style Files fill:#ecfdf5,stroke:#10b981,stroke-width:1px,color:#065f46`;
}

function generatePipeFilterArchitecture(): string {
  return `flowchart LR
    Input["<b>ENTRADA</b><br/>Datos sin procesar"]
    F1["<b>FILTRO 1</b><br/>Validacion"]
    F2["<b>FILTRO 2</b><br/>Transformacion"]
    F3["<b>FILTRO 3</b><br/>Procesamiento"]
    F4["<b>FILTRO 4</b><br/>Formato de salida"]
    Output["<b>SALIDA</b><br/>Datos procesados"]

    Input ==>|Pipe| F1
    F1 ==>|Pipe| F2
    F2 ==>|Pipe| F3
    F3 ==>|Pipe| F4
    F4 ==>|Pipe| Output

    style Input fill:#dbeafe,stroke:#2563eb,stroke-width:2px,color:#1e3a5f
    style F1 fill:#ede9fe,stroke:#7c3aed,stroke-width:2px,color:#3b0764
    style F2 fill:#fef3c7,stroke:#d97706,stroke-width:2px,color:#78350f
    style F3 fill:#d1fae5,stroke:#059669,stroke-width:2px,color:#064e3b
    style F4 fill:#fee2e2,stroke:#dc2626,stroke-width:2px,color:#7f1d1d
    style Output fill:#e0e7ff,stroke:#4f46e5,stroke-width:2px,color:#312e81`;
}

function generateEventDrivenArchitecture(): string {
  return `flowchart TB
    subgraph producers ["PRODUCTORES DE EVENTOS"]
      P1["<b>Servicio Web</b><br/>Acciones de usuario"]
      P2["<b>Servicio IoT</b><br/>Sensores y datos"]
      P3["<b>Servicio Batch</b><br/>Procesos programados"]
    end

    EventBus["<b>BUS DE EVENTOS</b><br/>Distribucion y enrutamiento"]

    subgraph consumers ["CONSUMIDORES"]
      C1["<b>Procesador</b><br/>Logica de negocio"]
      C2["<b>Notificador</b><br/>Alertas y emails"]
      C3["<b>Analitycs</b><br/>Metricas y reportes"]
    end

    P1 -->|Publica| EventBus
    P2 -->|Publica| EventBus
    P3 -->|Publica| EventBus
    EventBus -->|Suscribe| C1
    EventBus -->|Suscribe| C2
    EventBus -->|Suscribe| C3

    style producers fill:#eff6ff,stroke:#2563eb,stroke-width:2px,color:#1e3a5f
    style consumers fill:#f0fdf4,stroke:#16a34a,stroke-width:2px,color:#166534
    style P1 fill:#dbeafe,stroke:#3b82f6,stroke-width:1px,color:#1e40af
    style P2 fill:#ede9fe,stroke:#8b5cf6,stroke-width:1px,color:#5b21b6
    style P3 fill:#c7d2fe,stroke:#4f46e5,stroke-width:1px,color:#312e81
    style EventBus fill:#fef3c7,stroke:#d97706,stroke-width:3px,color:#78350f
    style C1 fill:#d1fae5,stroke:#10b981,stroke-width:1px,color:#065f46
    style C2 fill:#fee2e2,stroke:#ef4444,stroke-width:1px,color:#991b1b
    style C3 fill:#fef9c3,stroke:#eab308,stroke-width:1px,color:#854d0e`;
}

function generateGenericArchitecture(architecture: ArchitectureInfo): string {
  const pattern = sanitizeMermaidText(architecture.style);

  return `flowchart TB
    Client["<b>CLIENTE</b><br/>Interfaz de usuario"]
    App["<b>APLICACION</b><br/>${pattern}"]
    Service["<b>SERVICIOS</b><br/>Logica de negocio"]
    DB[("<b>Base de Datos</b>")]

    Client <-->|Request / Response| App
    App --> Service
    Service <--> DB

    style Client fill:#dbeafe,stroke:#2563eb,stroke-width:2px,color:#1e3a5f
    style App fill:#fef3c7,stroke:#d97706,stroke-width:3px,color:#78350f
    style Service fill:#ede9fe,stroke:#7c3aed,stroke-width:2px,color:#3b0764
    style DB fill:#d1fae5,stroke:#059669,stroke-width:2px,color:#064e3b`;
}
