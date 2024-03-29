const express = require('express');

const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const getIPAddress = require('./utils/serverUtils').getIPAddress;

const app = express();

require('./controller/webSocket.js');
// api
const router = require('./api/index.js');
const users = require('./api/users.js');


console.log("express server running at http://" + getIPAddress() + ":3006");

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// 不使用HTML
// app.set('view engine', 'ejs');
// 自定义后缀名 改成.html
app.engine('.html', ejs.__express);
app.set('view engine', 'html');


const options = {
  setHeaders: function (res, path, stat) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
};

const cors = function (req, res, next) {
  req.accepts('text/plain');
  req.accepts(['json', 'text']);
  res.setHeader('access-control-allow-origin', '*');
  res.setHeader('access-control-allow-headers', 'content-type,content-disposition,cache-control');
  res.setHeader('access-control-max-age', '1800');
  res.setHeader('access-control-request-method', 'POST,GET');
  res.setHeader('content-type', 'application/json;charset=UTF-8');
  next();
};

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public'), options));
app.use(express.static(path.join(__dirname, 'assets'), options));
app.use(express.static(path.join(__dirname, 'utils'), options));
app.use(express.static(path.join(__dirname, 'views'), options));
app.use(express.static(path.join(__dirname, 'dist'), options));
app.use(express.static(path.join(__dirname, '../express-app'), options));

// ----------------------------------------------------------------
app.use('/api', [cors, router]);

app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
