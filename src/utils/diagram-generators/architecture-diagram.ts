import type { ArchitectureInfo } from '@/types/recommendation';
import { sanitizeMermaidText, resetNodeCounter } from './helpers';

/**
 * Genera un diagrama de arquitectura según el patrón
 */
export function generateArchitectureDiagram(architecture: ArchitectureInfo): string {
  resetNodeCounter();

  const pattern = architecture.pattern.toLowerCase();

  if (pattern.includes('capas') || pattern.includes('layers') || pattern.includes('layered')) {
    return generateLayeredArchitecture(architecture);
  } else if (pattern.includes('cliente') || pattern.includes('servidor') || pattern.includes('client-server')) {
    return generateClientServerArchitecture();
  } else if (pattern.includes('microservicio') || pattern.includes('microservice')) {
    return generateMicroservicesArchitecture();
  } else if (pattern.includes('monolítico') || pattern.includes('monolithic')) {
    return generateMonolithicArchitecture();
  } else if (pattern.includes('mvc') || pattern.includes('model-view-controller')) {
    return generateMVCArchitecture();
  } else if (pattern.includes('repository') || pattern.includes('repositorio')) {
    return generateRepositoryArchitecture();
  } else if (pattern.includes('pipe') || pattern.includes('filter') || pattern.includes('tubería')) {
    return generatePipeFilterArchitecture();
  } else if (pattern.includes('event') || pattern.includes('evento')) {
    return generateEventDrivenArchitecture();
  } else {
    return generateGenericArchitecture(architecture);
  }
}

function generateLayeredArchitecture(architecture: ArchitectureInfo): string {
  const layers = architecture.layers || [
    'Presentación',
    'Lógica de Negocio',
    'Datos',
  ];

  let diagram = 'flowchart TB\n';

  // Generar nodos para cada capa
  layers.forEach((layer, index) => {
    const emoji = index === 0 ? '🖥️' : index === 1 ? '⚙️' : index === 2 ? '💾' : '📦';
    const nodeId = `Layer${index}`;
    diagram += `    ${nodeId}["${emoji} ${sanitizeMermaidText(layer)}"]\n`;
  });

  // Base de datos al final
  diagram += '    DB[("🗄️ Base de Datos")]\n\n';

  // Conectar capas
  for (let i = 0; i < layers.length - 1; i++) {
    diagram += `    Layer${i} --> Layer${i + 1}\n`;
  }
  diagram += `    Layer${layers.length - 1} --> DB\n\n`;

  // Estilos
  diagram += '    style Layer0 fill:#ddd6fe,stroke:#8b5cf6,stroke-width:2px\n';
  diagram += '    style Layer1 fill:#bfdbfe,stroke:#3b82f6,stroke-width:2px\n';
  diagram += '    style Layer2 fill:#fed7aa,stroke:#f97316,stroke-width:2px\n';
  diagram += '    style DB fill:#86efac,stroke:#22c55e,stroke-width:2px\n';

  return diagram;
}

function generateClientServerArchitecture(): string {
  return `flowchart LR
    Client1["💻 Cliente Web"]
    Client2["📱 Cliente Móvil"]
    Server["⚙️ Servidor de Aplicación"]
    DB[("🗄️ Base de Datos")]

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
    Gateway["🚪 API Gateway"]
    Auth["🔐 Servicio de Autenticación"]
    User["👤 Servicio de Usuarios"]
    Product["📦 Servicio de Productos"]
    Order["🛒 Servicio de Pedidos"]
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
    UI["🖥️ Interfaz de Usuario"]
    subgraph Monolith["🏢 Aplicación Monolítica"]
      Auth["🔐 Módulo de Autenticación"]
      Business["⚙️ Lógica de Negocio"]
      Data["💾 Acceso a Datos"]
    end
    DB[("🗄️ Base de Datos Única")]

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
    User["👤 Usuario"]
    View["🖥️ Vista (View)"]
    Controller["🎮 Controlador (Controller)"]
    Model["📊 Modelo (Model)"]
    DB[("🗄️ Base de Datos")]

    User -->|"Interacción"| View
    View -->|"Evento"| Controller
    Controller -->|"Actualiza"| Model
    Model -->|"Notifica"| View
    Controller -->|"Manipula"| View
    Model <--> DB

    style User fill:#e0e7ff,stroke:#6366f1,stroke-width:2px
    style View fill:#ddd6fe,stroke:#8b5cf6,stroke-width:2px
    style Controller fill:#fed7aa,stroke:#f97316,stroke-width:2px
    style Model fill:#86efac,stroke:#22c55e,stroke-width:2px
    style DB fill:#bfdbfe,stroke:#3b82f6,stroke-width:2px`;
}

function generateRepositoryArchitecture(): string {
  return `flowchart TB
    Client1["💻 Cliente 1"]
    Client2["📱 Cliente 2"]
    Client3["🖥️ Cliente 3"]
    Repo["📚 Repositorio Central"]
    DB[("🗄️ Base de Datos Compartida")]

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
    Input["📥 Entrada"]
    Filter1["🔧 Filtro 1: Validación"]
    Filter2["⚙️ Filtro 2: Procesamiento"]
    Filter3["🎨 Filtro 3: Transformación"]
    Output["📤 Salida"]

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
    Producer1["📤 Productor 1"]
    Producer2["📤 Productor 2"]
    EventBus["🚌 Bus de Eventos"]
    Consumer1["📥 Consumidor 1"]
    Consumer2["📥 Consumidor 2"]
    Consumer3["📥 Consumidor 3"]

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
  const pattern = sanitizeMermaidText(architecture.pattern);

  return `flowchart TB
    Client["💻 Cliente"]
    App["⚙️ Aplicación: ${pattern}"]
    DB[("🗄️ Base de Datos")]

    Client <--> App
    App <--> DB

    style Client fill:#bfdbfe,stroke:#3b82f6,stroke-width:2px
    style App fill:#fed7aa,stroke:#f97316,stroke-width:3px
    style DB fill:#86efac,stroke:#22c55e,stroke-width:2px`;
}
