//importando el core de winston , http, level
import winston, {format} from 'winston';
//importando biblotecas de node
import path from 'node:path';
import fs from 'node:fs';
//instalando plug-in de winston
import DailyRotateFile from 'winston-daily-rotate-file';    


//destructurar funciones utiles de format
const {combine, timestamp, label, printf, colorize, prettyPrint} = format;

//creando variable del directorio raiz 
const rootdir = path.resolve(process.cwd());

//creando directorio de logs
const logsDir = path.join(rootdir, 'logs');
if(!fs.existsSync(logsDir)){
  fs.mkdirSync(logsDir, {recursive:true})
}

//definiendo esquema de colores
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue'
};

//agregando ese esquema a winston 
winston.addColors(colors);

//creando platillas para los formatos
const myConsoleFormat = combine(
  //colores del formato
  colorize({all:true}),
  //agregando una etiqueta
  label({label: '📣: '}),
  //agregando fecha
  timestamp({format: "DD-MM-YYYY HH:mm:ss"}),
  //funcion de impresion
  printf((info)=>`${info.level} ¬'${info.label} ¬${info.timestamp} ¬${info.message}`)
)

//formato para los archivos JSON
const myFileFormat = combine(
  //retirar colorizacion
  format.uncolorize(),
  //agregar fecha ISO
  timestamp(),
  //salida
  format.json(),
)

//construyendo y configurando los transportes
const options = {
  errorFile: {
    level: 'error',
    filename: path.join(logsDir, 'error.log'),
    maxsize: 5242880, //5m
    maxFiles: 2,
    format: myFileFormat
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: myConsoleFormat
  },
  readableFile: {
    level: 'info',
    filename: path.join(logsDir, 'readable.log'),
    maxsize: 5242880, //5m
    maxFiles: 2,
    format: combine(
      format.uncolorize(),
        timestamp({format: "DD-MM-YYYY HH:mm:ss"}),
        prettyPrint(),
    ),
  },
  dailyRotateFile: {
    level: 'info',
    filename: path.join(logsDir, 'app-%DATE%.log'),
    datePatterns: "YYYY-MM-DD",
    zippedArchive: true,
    maxsize: 5242880, //5m
    maxFiles: 2,
    format: myFileFormat
  }
}

//creando logger
const logger = winston.createLogger({
  transports: [
    new DailyRotateFile(options.dailyRotateFile),
    new winston.transport.File(options.readableFile),
    new winston.transport.File(options.errorFile),
    new winston.transport.Console(options.console),
  ],
  exceptionHandlers: [
    new winston.transport.File({
      filename: path.join(logsDir, "exceptions.log"),
    }),
  ],
  rejectionHandlers: [
    new winston.transport.File({
    filename: path.join(logsDir, "rejections.log"),
  }),
  ],
  exitOnError: false,
})

//exportamos
export default logger;