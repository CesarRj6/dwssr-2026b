//FUNCION PARA MANEJAR ERRORES
var createError = require('http-errors');
//IMPORTA EL FRAMEWORK EXPRESS
var express = require('express');
//IMPORTA EL MODULO PATH PARA MANEJAR RUTAS
var path = require('path');
//IMPORTA EL MODULO PARA MANEJAR COOKIES
var cookieParser = require('cookie-parser');
//IMPORTA EL MODULO PARA MANEJAR LOGS
var logger = require('morgan');
//IMPORTA EL MODULO PARA MANEJAR RUTAS DE LA APLICACION
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//CREA UNA INSTANCIA DE EXPRESS (LA APLICACION)
var app = express();
 
//CONFIGURACION DE MOTOR DE VISTAS (HANDLEBARS)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
 
//CONFIGURACION DE MIDDLEWARES
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//CONFIGURACION DE ARCHIVOS ESTATICOS (PUBLIC)
app.use(express.static(path.join(__dirname,'..','public')));
//CONFIGURACION DE RUTAS(REGISTRAMOS)
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
 
module.exports = app;