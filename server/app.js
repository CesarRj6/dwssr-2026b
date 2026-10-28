// FUNCION PARA MANEJAR ERRORES
import createError from 'http-errors';
// IMPORTA EL FRAMEWORK EXPRESS
import express from 'express';
// IMPORTA EL MODULO PATH Y UTILIDADES DE URL
import path, { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// IMPORTA EL MODULO PARA MANEJAR COOKIES
import cookieParser from 'cookie-parser';
// IMPORTA EL MODULO PARA MANEJAR LOGS
import logger from 'morgan';

// importando hbs
import hbs from 'hbs';

// Importa usando el nombre sugerido por el linter
import router from '#routes/index.js';
// eslint-disable-next-line import-x/no-rename-default
import usersRouter from '#routes/users.js';

// importando el registrador helper
import registerViteHelper from '#server/lib/vite.js';

// creando las variables de directorio
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// CREA UNA INSTANCIA DE EXPRESS (LA APLICACION)
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// REGISTRA EL HELPER DE VITE
registerViteHelper(hbs);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../dist')));

app.use('/', router);
app.use('/users', usersRouter);


// CAPTURA DE ERRORES 404 Y ENVIO AL MANEJADOR DE ERRORES
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, _next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // RENDERIZA LA PAGINA DE ERROR CON EL ESTATUS DEL ERROR
  res.status(err.status || 500);
  res.render('error');
});

export default app;