import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { create as createHbsEngine } from 'express-handlebars';
import registerViteHelper from './vite.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Exportar la funcion de configuracion
export default function configureHandlebars(app) {
  // Estableciendo la extencion de las vistas en .hbs
  const exphbs = createHbsEngine({
    extname: '.hbs',
    layoutsDir: path.join(__dirname, '../views'), // 👈 Aquí le indicamos dónde está el layout
    defaultLayout: 'layout',                     // 👈 Aquí le decimos que se llama layout.hbs
  });

  // Registrando el Helper de Vite
  registerViteHelper(exphbs.handlebars);

  // Registrando Handlebars en la APP de Express
  app.engine('hbs', exphbs.engine);
  app.set('view engine', 'hbs');
  app.set('views', path.join(__dirname, '..', 'views'));
}