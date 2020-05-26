const express       = require('express');
const path          = require('path');
const favicon       = require('serve-favicon');
const morgan        = require('morgan');
const chalk         = require('chalk');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const apns          = require('./routes/apns');
const app           = express();

// HTTP request logger
morgan.token('logDate', function (req, res) { return new Date(); });
morgan.token('body', function (req, res) { return JSON.stringify(req.body); });
app.use(morgan(function(tokens, req, res) {
  if (res.statusCode == 304) return;

  var status = tokens.status(req, res)
  var statusColor = status >= 500
    ? 'red' : status >= 400
    ? 'yellow' : status >= 300
    ? 'blue' : 'green'

  var method = tokens.method(req, res)
  var methodColor = method == 'DELETE'
    ? 'bgRed' : method == 'POST'
    ? 'bgGreen' : method == 'PUT'
    ? 'bgBlue' : 'white'

  return [
    '[' + tokens.logDate(req, res) + ']',
    chalk[methodColor](method),
    chalk.bold(tokens.url(req, res)),
    'HTTP/' + tokens['http-version'](req, res),
    chalk[statusColor](status),
    tokens['response-time'](req, res) + 'ms',
    chalk.bold(tokens['body'](req, res)),
    chalk.gray(tokens['remote-addr'](req, res)),
    chalk.gray(tokens['remote-user'](req, res)),
    chalk.gray(tokens['referrer'](req, res)),
    chalk.gray(tokens['user-agent'](req, res))
  ].join(' ');
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', apns);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var errorMessage = 'Not Found';
  var err = new Error(errorMessage);
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  var contentType = req.headers['content-type'];

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (path.extname(req.path) == '.json' || contentType == 'application/json') {
    // .json error result
    res.json(err.message);
  } else {
    // error page render
    res.render('error');
  }
});

module.exports = app;
