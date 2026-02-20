// TEST E2E - Evaluación de Bot n8n Code Review
// ⚠️  Este archivo contiene bugs INTENCIONALES para validar la IA de revisión de código.
// NO usar en producción. Archivo de prueba E2E — eliminar después del test.

const fs = require('fs');
const https = require('https');

// ─────────────────────────────────────────────────────────────────
// BUG 1: VULNERABILIDAD DE SEGURIDAD — Credenciales hardcodeadas
// Un token JWT real y una API key expuestos en el código fuente.
// ─────────────────────────────────────────────────────────────────
const CONFIG = {
  jwtSecret: 'eyJhbGciOiJIUzI1NiJ9.super-secret-production-key-2026',
  apiKey: 'sk-prod-xK9mN2pQ8rT4vW1yZ3aB6cE0fH7iL5nO',
  dbPassword: 'Sommerville_DB_Pass_2026!',
  awsSecret: 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY',
};

// ─────────────────────────────────────────────────────────────────
// BUG 2: BUG DE LÓGICA — Bucle infinito por condición incorrecta
// El índice `i` nunca se incrementa correctamente dentro del while,
// causando un bucle infinito que cuelga el proceso Node.js.
// ─────────────────────────────────────────────────────────────────
function processUserQueue(users) {
  const results = [];
  let i = 0;

  // BUG: la condición de salida nunca se alcanza porque `i` se
  // resetea a 0 dentro del bucle en lugar de incrementarse.
  while (i < users.length) {
    const user = users[i];
    results.push({
      id: user.id,
      processed: true,
      timestamp: Date.now(),
    });
    // ERROR: debería ser i++ pero en su lugar resetea el índice
    i = users.indexOf(user); // siempre retorna el mismo índice
  }

  return results;
}

// ─────────────────────────────────────────────────────────────────
// BUG 3: PROBLEMA DE PERFORMANCE — I/O síncrono dentro de un bucle
// Se usa fs.readFileSync dentro de un bucle que itera sobre archivos,
// bloqueando el event loop de Node.js en cada iteración.
// ─────────────────────────────────────────────────────────────────
function loadAllConfigs(configPaths) {
  const configs = [];

  for (const filePath of configPaths) {
    // PERFORMANCE BUG: readFileSync bloquea el event loop completamente.
    // Con 100+ archivos de configuración esto puede congelar el servidor
    // por varios segundos. Debería usarse fs.promises.readFile() + Promise.all()
    const raw = fs.readFileSync(filePath, 'utf-8'); // ← síncrono y bloqueante
    const parsed = JSON.parse(raw);
    configs.push(parsed);

    // Agravante: también se hace una llamada de red síncrona simulada
    // dentro del mismo bucle (anti-patrón compuesto)
    console.log(`Loaded config: ${filePath}`);
  }

  return configs;
}

// ─────────────────────────────────────────────────────────────────
// FUNCIÓN PRINCIPAL — orquesta los 3 bugs para que sean detectables
// ─────────────────────────────────────────────────────────────────
async function main() {
  // Uso del token hardcodeado para autenticar (Bug 1 activo)
  const headers = {
    Authorization: `Bearer ${CONFIG.jwtSecret}`,
    'X-API-Key': CONFIG.apiKey,
  };

  const userList = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
  ];

  // Llamada a la función con bucle infinito (Bug 2 activo)
  // En producción esto haría crash o hang del servidor
  const processed = processUserQueue(userList);

  // Lectura bloqueante de configs en bucle (Bug 3 activo)
  const configFiles = [
    './config/database.json',
    './config/redis.json',
    './config/app.json',
  ];
  const allConfigs = loadAllConfigs(configFiles);

  console.log('Results:', processed);
  console.log('Configs:', allConfigs);
}

main().catch(console.error);
