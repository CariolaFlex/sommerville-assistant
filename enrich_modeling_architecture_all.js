const fs = require('fs');
const path = require('path');

// Leer el JSON completo
const jsonPath = path.join(__dirname, 'src', 'data', 'recommendations.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

console.log('🚀 Iniciando enriquecimiento de modeling y architecture para 13 recomendaciones...\n');

// ============================================================================
// HELPER: Layered Architecture Pattern (reusable)
// ============================================================================
const layeredPattern = {
  name: "Layered (N-Tier)",
  description: "Arquitectura en capas (Presentation, Business Logic, Data Access) con separación clara de responsabilidades.",
  advantages: [
    "Separación de concerns (UI, lógica de negocio, datos)",
    "Facilita testing de cada capa independientemente",
    "Reusabilidad de lógica de negocio entre diferentes interfaces",
    "Facilita mantenimiento (cambios en UI no afectan datos)"
  ],
  disadvantages: [
    "Performance overhead (múltiples capas añaden latencia)",
    "Over-engineering para sistemas simples",
    "Acoplamiento entre capas puede generar rigidez"
  ],
  whenToUse: "Sistemas transaccionales con lógica de negocio compleja y múltiples interfaces (web, móvil, API)",
  tradeoffs: "Mantenibilidad y separación de concerns vs Performance (latencia de múltiples capas)"
};

const mvcPattern = {
  name: "MVC (Model-View-Controller)",
  description: "Patrón que separa datos (Model), presentación (View) y lógica de control (Controller).",
  advantages: [
    "Separación clara entre datos y presentación",
    "Facilita testing de lógica de negocio (Model)",
    "Múltiples vistas pueden usar mismo modelo",
    "Evolución independiente de UI y lógica de negocio"
  ],
  disadvantages: [
    "Controllers pueden volverse muy grandes (fat controllers)",
    "Curva de aprendizaje para desarrolladores nuevos",
    "Overhead de coordinación entre componentes"
  ],
  whenToUse: "Aplicaciones web transaccionales con múltiples vistas sobre los mismos datos",
  tradeoffs: "Separación de concerns vs Complejidad de coordinación entre componentes"
};

const microservicesPattern = {
  name: "Microservices",
  description: "Arquitectura de servicios pequeños independientes, cada uno con su propia base de datos y deployment.",
  advantages: [
    "Escalamiento independiente por servicio (horizontal scaling granular)",
    "Tecnologías heterogéneas (Python para ML, Go para telemetry, Java para transacciones)",
    "Deployment independiente (actualizar un servicio sin afectar otros)",
    "Resiliencia (fallo de un servicio no tumba todo el sistema)"
  ],
  disadvantages: [
    "Complejidad operacional (múltiples deployments, monitoring distribuido)",
    "Network latency (servicios se comunican por red, no memoria compartida)",
    "Distributed transactions difíciles (eventual consistency, sagas)",
    "Debugging complejo (tracing distribuido necesario)"
  ],
  whenToUse: "Sistemas grandes con múltiples equipos, funcionalidades independientes y necesidad de escalamiento diferenciado",
  tradeoffs: "Escalabilidad independiente y deployment ágil vs Complejidad operacional"
};

