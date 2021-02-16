const express       = require('express');
const path          = require('path');
const favicon       = require('serve-favicon');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');

const server        = require('./Modules/Server');
const requestLog    = require('./Modules/RequestLog');
const errorHandler  = require('./Modules/ErrorHandler');

const apns          = require('./Routers/apns');

const app           = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app use
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(requestLog);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', apns);

app.use(errorHandler.errorNotFound);
app.use(errorHandler.errorHandler);

module.exports = server.createHTTP(app);
