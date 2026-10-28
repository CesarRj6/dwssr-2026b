// Biblioteca de stream
import fs from 'node:fs';
// Biblioteca de rutas
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Importando debug
import createDebug from 'debug';

// Creacion del objeto debug
const debug = createDebug('dwssr-2026b:server');

// Creando variables de rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const manifestPath = path.join(__dirname, '..', '..', 'dist', '.vite', 'manifest.json');

function viteAssets() {
  // Si no existe el manifest
  if (!fs.existsSync(manifestPath)) {
    debug("Vite manifest not found. Run 'npm run build'");
    return '';
  }

  // Leyendo y parseando a JSON el archivo de manifiesto
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  const mainEntry = manifest['main.js'];

  // Guarda el main.js
  if (!mainEntry) {
    debug('Archivo main.js no está disponible en el manifiesto de Vite');
    return '';
  }

  const tags = `
    <script type="module" src="/${mainEntry.file}"></script>
    <link rel="stylesheet" href="/${mainEntry.css[0]}">
  `;

  return tags;
}

/*
Función registradora del helper de Handlebars 
*/ 
export default function registerViteHelper(hbs) {
  hbs.registerHelper('viteAssets', () => 
     new hbs.SafeString(viteAssets())
  );
}