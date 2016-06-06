var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var port = 3000;
var hostname = 'ec2-52-40-1-108.us-west-2.compute.amazonaws.com';

var config = require('./config');
mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open',function(){
    console.log('Connected to server');
  });

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var payUMoney = require('./routes/payUMoney');
var success = require('./routes/success');
var transactionHistory = require('./routes/transactionHistory');
var forgotPassword = require('./routes/forgotPassword');
var reset = require('./routes/reset');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var server = http.createServer(app);
server.listen(port, hostname, function(){
    console.log("Server running at http://${hostname}:${port}/");
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//passport config
var User = require('./models/user');
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/payUMoney', payUMoney);
app.use('/success', success);
app.use('/transactionHistory', transactionHistory);
app.use('/forgotPassword', forgotPassword);
app.use('/reset', reset);
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
    res.json({
                message: err.message,
                error: err
            });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
            message: err.message,
            error: {}
            });
});


module.exports = app;
