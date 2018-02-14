var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);

var userApiController = require('./users/UserApiController');
var userController = require('./users/UserController');
var kompilesApiController = require('./kompiles/KompileApiController');

var database = require('./Database');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser("kompiles"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: "kompiles",
    store: new RedisStore()
}));

app.use('/', userController);
app.use('/api/users', userApiController);
app.use('/api/kompiles', kompilesApiController);

app.use(function(req, res, next) {
  if (!req.session.redir) {
    req.session.redir = '/';
  }

  if (!req.path.match(/\/login|\/logout|\/user/)) {
    req.session.redir = req.path;
  }

  res.locals.session = req.session;
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

database.connect().catch(err => console.log(err));
module.exports = app;
