const express = require('express');

const path = require('path');
const fs = require('fs')
const favicon = require('serve-favicon');
// 日志相关
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session')
const expressSession = require('express-session')
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
app.set('view engine', 'ejs');
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

// console.log(process.env)
app.set('env', process.env.NODE_ENV)

switch(app.get('env')) {
  case 'development':
    // 紧凑的、彩色的开发日志
    app.use(logger('dev'));
    // app.use(logger('combined'));
    break;
  case 'production':
    var accessLogStream = fs.createWriteStream(path.join(__dirname, '/var/log/access.log'), { flags: 'a' })
    app.use(logger('combined', { stream: accessLogStream }));
    break;
}

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2'],
  // **httpOnly: true（安全推荐）**
  // 浏览器 JS 拿不到这个 Cookie，避免网站被注入脚本偷走登录会话
  httpOnly: true,

  // Cookie Options
  maxAge: 1 * 60 * 60 * 1000 // 1 hours
}))

// 具体用法看官网问AI都可以 问AI 通俗易懂
/* app.use(expressSession({
  secret: 'abc', // 必填！签名cookie，防止sessionId被篡改
  resave: false, // 推荐false：没有修改session时，不强制重新保存
  saveUninitialized: false, // 推荐false：空会话不自动创建cookie（节省资源）
  name: 'sid', // cookie名称，默认connect.sid，建议自定义
  cookie: { // 配置发给浏览器的cookie
    maxAge: 1 * 60 * 60 * 1000, // 会话有效期 1天（毫秒）
    httpOnly: true, // 前端js无法读取cookie，防XSS（安全必开）
    secure: false, // 开发false；线上https改为true，只在https传输cookie
    sameSite: 'lax' // 防御CSRF攻击
  }
})); */

app.use('/static', express.static(path.join(__dirname, 'public'), options));
app.use('/static', express.static(path.join(__dirname, 'assets'), options));
app.use('/static', express.static(path.join(__dirname, 'utils'), options));
app.use('/static', express.static(path.join(__dirname, 'views'), options));
app.use('/static', express.static(path.join(__dirname, 'dist'), options));
app.use('/static', express.static(path.join(__dirname, '../express-app'), options));

// ----------------------------------------------------------------
app.use('/api', [cors, router]);

app.use('/users', users);

app.get('/about', function(req, res) {

  res.type('text/html')
  res.send('<h1>about</h1>')
})

app.get('/b', function(req, res) {
  console.log('/b : 抛出错误 ' );
  throw new Error('b 失败 ');
})
app.use('/b', function(err, req, res, next){
  console.log('/b 检测到错误并传递 ');
  // 500
  next(err);
  // 404
  // next();
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  // next(err);
  res.send('Not Found')
});

// error handlers
// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    // res.send('500')
    res.render('error development', {
      message: err.message,
      error: err
    });
  });
}
if (app.get('env') !== 'development') {
  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    // res.send('500 - 服务器错误 ');
    res.render('error production', {
      message: err.message,
      error: {}
    });
  });
}


module.exports = app;
