const morgan = require('morgan');
// const chalk  = require('chalk');
const Logger = require('./Logger')

morgan.token('body', function (req, res) { return JSON.stringify(req.body); });

module.exports = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    'HTTP/' + tokens['http-version'](req, res),
    tokens.status(req, res),
    tokens['response-time'](req, res) + 'ms',
    tokens['body'](req, res),
    tokens['remote-addr'](req, res),
    tokens['remote-user'](req, res),
    tokens['referrer'](req, res),
    tokens['user-agent'](req, res)
  ].join(' ');
}, {stream: Logger.stream});

// module.exports = morgan('combined', {stream: Logger.stream});
