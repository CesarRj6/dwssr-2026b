// Funcion para manejar errores en la aplicacion
import createError from 'http-errors';
// Importar el framework express
import express from 'express';
// Importa modulos para manejar rutas
import path, { dirname } from 'node:path';
// Importa modulos para manejar cookies
import cookieParser from 'cookie-parser';
// Importa modulos para manejar logs
import morgan from 'morgan';
// Imports para crear Dirname
import { fileURLToPath } from 'node:url';
// Importando la funcion de configuracion de Hbs

// Importar las rutas de la aplicacion
// eslint-disable-next-line import-x/no-rename-default
import router from '#routes/index.js';
// eslint-disable-next-line import-x/no-rename-default
import usersRouter from '#routes/users.js';
import configureHandlebars from './lib/handlebars.js';

// Importando la configuracion de winston logger
import logger from './lib/winston.js';

// Creando la variables de rutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Crear la aplicacion express
logger.info('🛠️ Creando backend');
const app = express();

// Configurar Handlebars usando el módulo de configuración
configureHandlebars(app);

// Configurar middlewares de la aplicacion
app.use(
  morgan('dev', {
    stream: {
      write: (msg) => logger.info(msg.trim()),
    },
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Archivos estaticos para produccion
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
}

// Configurar la carpeta de archivos estaticos
logger.info('🛠️ Creando servidor de Archivos Estáticos');
app.use(express.static(path.join(__dirname, '../public')));

// Registramos las rutas de la aplicacion
logger.info('🗺️ Registrando rutas');
app.use('/', router);
app.use('/users', usersRouter);

// Capturamos errores 404 y los enviamos al manejador de errores
app.use((req, res, next) => {
  next(createError(404));
});

// Manejador de errores
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;