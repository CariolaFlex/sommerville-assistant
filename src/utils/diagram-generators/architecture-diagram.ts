import type { ArchitectureInfo } from '@/types/recommendation';
import { sanitizeMermaidText, resetNodeCounter } from './helpers';

/**
 * Genera un diagrama de arquitectura según el patrón
 * NOTA: Sin emojis - Mermaid 11.x tiene timeout con caracteres Unicode complejos
 */
export function generateArchitectureDiagram(architecture: ArchitectureInfo): string {
  resetNodeCounter();

  if (!architecture?.style) {
    console.warn('⚠️ Invalid architecture data provided, using fallback diagram');
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
    Layer0["Capa de Presentacion"]
    Layer1["Logica de Negocio"]
    Layer2["Acceso a Datos"]
    DB[("Base de Datos")]

    Layer0 --> Layer1
    Layer1 --> Layer2
    Layer2 --> DB

    style Layer0 fill:#ddd6fe,stroke:#8b5cf6,stroke-width:2px
    style Layer1 fill:#bfdbfe,stroke:#3b82f6,stroke-width:2px
    style Layer2 fill:#fed7aa,stroke:#f97316,stroke-width:2px
    style DB fill:#86efac,stroke:#22c55e,stroke-width:2px`;
}

function generateClientServerArchitecture(): string {
  return `flowchart LR
    Client1["Cliente Web"]
    Client2["Cliente Movil"]
    Server["Servidor de Aplicacion"]
    DB[("Base de Datos")]

    Client1 <-->|HTTP/REST| Server
    Client2 <-->|HTTP/REST| Server
    Server <--> DB

    style Client1 fill:#bfdbfe,stroke:#3b82f6,stroke-width:2px
    style Client2 fill:#ddd6fe,stroke:#8b5cf6,stroke-width:2px
    style Server fill:#fed7aa,stroke:#f97316,stroke-width:3px
    style DB fill:#86efac,stroke:#22c55e,stroke-width:2px`;
}

function generateMicroservicesArchitecture(): string {
  return `flowchart TB
    Gateway["API Gateway"]
    Auth["Servicio Auth"]
    User["Servicio Usuarios"]
    Product["Servicio Productos"]
    Order["Servicio Pedidos"]
    DB1[("DB Auth")]
    DB2[("DB Users")]
    DB3[("DB Products")]
    DB4[("DB Orders")]

    Gateway --> Auth
    Gateway --> User
    Gateway --> Product
    Gateway --> Order

    Auth --> DB1
    User --> DB2
    Product --> DB3
    Order --> DB4

    style Gateway fill:#ddd6fe,stroke:#8b5cf6,stroke-width:3px
    style Auth fill:#fca5a5,stroke:#ef4444,stroke-width:2px
    style User fill:#bfdbfe,stroke:#3b82f6,stroke-width:2px
    style Product fill:#fed7aa,stroke:#f97316,stroke-width:2px
    style Order fill:#86efac,stroke:#22c55e,stroke-width:2px
    style DB1 fill:#e0e7ff,stroke:#6366f1,stroke-width:1px
    style DB2 fill:#e0e7ff,stroke:#6366f1,stroke-width:1px
    style DB3 fill:#e0e7ff,stroke:#6366f1,stroke-width:1px
    style DB4 fill:#e0e7ff,stroke:#6366f1,stroke-width:1px`;
}

function generateMonolithicArchitecture(): string {
  return `flowchart TB
    UI["Interfaz de Usuario"]
    subgraph Monolith["Aplicacion Monolitica"]
      Auth["Modulo de Autenticacion"]
      Business["Logica de Negocio"]
      Data["Acceso a Datos"]
    end
    DB[("Base de Datos Unica")]

    UI --> Auth
    UI --> Business
    Auth --> Business
    Business --> Data
    Data --> DB

    style UI fill:#ddd6fe,stroke:#8b5cf6,stroke-width:2px
    style Monolith fill:#fed7aa,stroke:#f97316,stroke-width:3px
    style Auth fill:#bfdbfe,stroke:#3b82f6,stroke-width:1px
    style Business fill:#86efac,stroke:#22c55e,stroke-width:1px
    style Data fill:#fde68a,stroke:#eab308,stroke-width:1px
    style DB fill:#fca5a5,stroke:#ef4444,stroke-width:2px`;
}

function generateMVCArchitecture(): string {
  return `flowchart TB
    User["Usuario"]
    View["Vista - View"]
    Controller["Controlador - Controller"]
    Model["Modelo - Model"]
    DB[("Base de Datos")]

    User -->|Interaccion| View
    View -->|Evento| Controller
    Controller -->|Actualiza| Model
    Model -->|Notifica| View
    Controller -->|Manipula| View
    Model <--> DB

    style User fill:#e0e7ff,stroke:#6366f1,stroke-width:2px
    style View fill:#ddd6fe,stroke:#8b5cf6,stroke-width:2px
    style Controller fill:#fed7aa,stroke:#f97316,stroke-width:2px
    style Model fill:#86efac,stroke:#22c55e,stroke-width:2px
    style DB fill:#bfdbfe,stroke:#3b82f6,stroke-width:2px`;
}

function generateRepositoryArchitecture(): string {
  return `flowchart TB
    Client1["Cliente 1"]
    Client2["Cliente 2"]
    Client3["Cliente 3"]
    Repo["Repositorio Central"]
    DB[("Base de Datos Compartida")]

    Client1 <--> Repo
    Client2 <--> Repo
    Client3 <--> Repo
    Repo <--> DB

    style Client1 fill:#bfdbfe,stroke:#3b82f6,stroke-width:2px
    style Client2 fill:#ddd6fe,stroke:#8b5cf6,stroke-width:2px
    style Client3 fill:#fed7aa,stroke:#f97316,stroke-width:2px
    style Repo fill:#86efac,stroke:#22c55e,stroke-width:3px
    style DB fill:#fca5a5,stroke:#ef4444,stroke-width:2px`;
}

function generatePipeFilterArchitecture(): string {
  return `flowchart LR
    Input["Entrada"]
    Filter1["Filtro 1: Validacion"]
    Filter2["Filtro 2: Procesamiento"]
    Filter3["Filtro 3: Transformacion"]
    Output["Salida"]

    Input -->|Pipe| Filter1
    Filter1 -->|Pipe| Filter2
    Filter2 -->|Pipe| Filter3
    Filter3 -->|Pipe| Output

    style Input fill:#bfdbfe,stroke:#3b82f6,stroke-width:2px
    style Filter1 fill:#ddd6fe,stroke:#8b5cf6,stroke-width:2px
    style Filter2 fill:#fed7aa,stroke:#f97316,stroke-width:2px
    style Filter3 fill:#86efac,stroke:#22c55e,stroke-width:2px
    style Output fill:#fca5a5,stroke:#ef4444,stroke-width:2px`;
}

function generateEventDrivenArchitecture(): string {
  return `flowchart TB
    Producer1["Productor 1"]
    Producer2["Productor 2"]
    EventBus["Bus de Eventos"]
    Consumer1["Consumidor 1"]
    Consumer2["Consumidor 2"]
    Consumer3["Consumidor 3"]

    Producer1 -->|Publica| EventBus
    Producer2 -->|Publica| EventBus
    EventBus -->|Suscribe| Consumer1
    EventBus -->|Suscribe| Consumer2
    EventBus -->|Suscribe| Consumer3

    style Producer1 fill:#bfdbfe,stroke:#3b82f6,stroke-width:2px
    style Producer2 fill:#ddd6fe,stroke:#8b5cf6,stroke-width:2px
    style EventBus fill:#fed7aa,stroke:#f97316,stroke-width:3px
    style Consumer1 fill:#86efac,stroke:#22c55e,stroke-width:2px
    style Consumer2 fill:#fca5a5,stroke:#ef4444,stroke-width:2px
    style Consumer3 fill:#fde68a,stroke:#eab308,stroke-width:2px`;
}

function generateGenericArchitecture(architecture: ArchitectureInfo): string {
  const pattern = sanitizeMermaidText(architecture.style);

  return `flowchart TB
    Client["Cliente"]
    App["Aplicacion: ${pattern}"]
    DB[("Base de Datos")]

    Client <--> App
    App <--> DB

    style Client fill:#bfdbfe,stroke:#3b82f6,stroke-width:2px
    style App fill:#fed7aa,stroke:#f97316,stroke-width:3px
    style DB fill:#86efac,stroke:#22c55e,stroke-width:2px`;
}
