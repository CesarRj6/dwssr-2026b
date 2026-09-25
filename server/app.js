//FUNCION PARA MANEJAR ERRORES
import createError from 'http-errors'
//IMPORTA EL FRAMEWORK EXPRESS
import express from 'express'
//IMPORTA EL MODULO PATH PARA MANEJAR RUTAS
import path from 'node:path'
//IMPORTA EL MODULO PARA MANEJAR COOKIES
import cookieParser from 'cookie-parser'
//IMPORTA EL MODULO PARA MANEJAR LOGS
import logger from 'morgan'
import createDebug from "debug"
const debug = createDebug('dwssr-2026:server:')
//import crear dirname
import {fileURLToPath} from 'node:url'
import {dirname} from 'node:path'
//creando las variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
//IMPORTA EL MODULO PARA MANEJAR RUTAS DE LA APLICACION
 
//var indexRouter = require('./routes/index');
import indexRouter from'./routes/index.js'
//var usersRouter = require('./routes/users');
import usersRouter from'./routes/users.js'
 
//CREA UNA INSTANCIA DE EXPRESS (LA APLICACION)
var app = express();
 
//CONFIGURACION DE MOTOR DE VISTAS (HANDLEBARS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
 
//CRAENDO LA APLICACION EXPRESS
debug("🔨 creando backend")
//CONFIGURACION DE MIDDLEWARES
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//CONFIGURACION DE ARCHIVOS ESTATICOS (PUBLIC)
debug("🔨 creando servidor de archivos estaticos")
app.use(express.static(path.join(__dirname,'..','public')));
//CONFIGURACION DE RUTAS(REGISTRAMOS)
debug("🔨 registrando rutas")
app.use('/', indexRouter);
app.use('/users', usersRouter);
// CAPTURA DE ERRORES 404 Y ENVIO AL MANEJADOR DE ERRORES
app.use(function(req, res, next) {
  next(createError(404));
});
 
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
 
  // RENDERIZA LA PAGINA DE ERROR CON EL ESTATUS DEL ERROR
  res.status(err.status || 500);
  res.render('error');
});
 
//module.exports = app;
export default app;