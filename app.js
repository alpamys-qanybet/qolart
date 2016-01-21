var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');
var config = require('./config/oauth');


var sessions = require('express-session');
//routes paths
var routes = require('./routes/index');
var users = require('./routes/users');
var items=require('./routes/items');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
// app.use(sessions({
//   cookieName: 'session',
//   secret: 'uybuyw767weyew78tdhs78wb78e6duy',
//   duration: 30*60*1000,
//   activeDuration: 5*60*1000
// }))

require('./config/passport')(passport);
app.use(sessions({
    secret: '67686868htycytvtytbdcstdc87uwdywed98n9n8dpqmm',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// app.use(function(req, res, next){
//   var err = req.session.error,
//       msg = req.session.notice,
//       success = req.session.success;

//   delete req.session.error;
//   delete req.session.success;
//   delete req.session.notice;

//   if (err) res.locals.error = err;
//   if (msg) res.locals.notice = msg;
//   if (success) res.locals.success = success;

//   next();
// });


app.use('/', routes);
app.use('/users', users);
app.use('/items', items);


//mongoose connection
var configDB = require('./config/database.js');
mongoose.connect(configDB.url); 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('database connected');
});

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



//Load models
var fs = require("fs");
fs.readdirSync(__dirname+'/models').forEach(function(filename){
  if (~filename.indexOf('.js')) require(__dirname+'/models/'+filename);
});

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
