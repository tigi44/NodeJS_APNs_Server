const http  = require('http');
const Logger = require('./Logger')
// const https = require('https');

//const options     = {
//  key:  fs.readFileSync('./keys/private.pem'),
//  cert: fs.readFileSync('./keys/public.pem')
//};

const port = normalizePort(process.env.PORT || '3000');
// const httpsPort = 443;

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

module.exports = {
  createHTTP: function (app) {
    return http.createServer(app).listen(port, function() {
      Logger.info("HTTP server listening on port " + port);
    });
  },
  // createHTTPS: function (app) {
  //   return https.createServer(options, app).listen(httpsPort, function() {
  //     Logger.info("HTTPS server listening on port " + httpsPort);
  //   });
  // }
}
