const winston      = require('winston')
const winstonDaily = require('winston-daily-rotate-file')

const { combine, timestamp, label, printf, prettyPrint } = winston.format;
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${level.toUpperCase()}] ${message}`;
});

const options = {
  infoFile: {
    name: 'infoFile',
    level: 'info',
    dirname: 'logs/info',
    filename: `%DATE%.log`,
    datePattern: 'YYYY-MM-DD',
    handleExceptions: true,
    json: false,
    showLevel: true,
    colorize: false,
    maxsize: '5m',
    maxFiles: '7d',
    // zippedArchive: true,
    format: combine(
      label({ label: 'Production' }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS ZZ' }),
      prettyPrint()
    ),
  },
  httpFile: {
    name: 'httpFile',
    level: 'http',
    dirname: 'logs/access',
    filename: `%DATE%_access.log`,
    handleExceptions: true,
    json: false,
    showLevel: true,
    colorize: false,
    maxsize: '5m',
    maxFiles: '7d',
    // zippedArchive: true,
    format: combine(
      label({ label: 'Production' }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS ZZ' }),
      prettyPrint()
    ),
  },
  errorFile: {
    name: 'errorFile',
    level: 'error',
    dirname: 'logs/error',
    filename: `%DATE%_error.log`,
    handleExceptions: true,
    json: false,
    showLevel: true,
    colorize: false,
    maxsize: '5m',
    maxFiles: '7d',
    // zippedArchive: true,
    format: combine(
      label({ label: 'Production' }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS ZZ' }),
      prettyPrint()
    ),
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    format: combine(
      label({ label: 'Development' }),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS ZZ' }),
      myFormat
    )
  }
}

let logger = new winston.createLogger({
  transports: [
    // new winstonDaily(options.errorFile),
    // new winstonDaily(options.infoFile),
    new winstonDaily(options.httpFile),
    // new winston.transports.File(options.errorFile)
  ],
  exitOnError: false,
});

if(process.env.NODE_ENV !== 'production'){
  logger.add(new winston.transports.Console(options.console))
}

logger.stream = {
  write: function(message, encoding) {
    logger.http(message);
  },
};

module.exports = logger;
