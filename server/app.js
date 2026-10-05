//funcion para manejar errores
import createError from 'http-errors'
//importa el framework express
import express from 'express'
//imporeta modulos para importar rutas
import path from 'node:path'
//importa modulos para manejar cookies
import cookieParser from 'cookie-parser';
//importa modulos para manejar logs
import logger from 'morgan'
//importando debug
import importdebug from 'debug'
//imports para crear Dirname
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

//ejecutando importdebug
const debug = importdebug('dwssr-2026b:server')
debug("🔨 creando backend")


//creando las variables 
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

//importa las rutas de la aplicacion
import indexRouter from '#routes/index.js'
import usersRouter from '#routes/users.js'

//crea la aplicacion de express
const app = express();



// view engine setup, configura el motor de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//configurar middelwares de la aplicacion
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


debug("🔨 creando servidor de archivos eataticos")
//configura la ruta de archivos estaticos
app.use(express.static(path.join(__dirname, '..','public')));

debug("🛤️  registrando rutas")
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;