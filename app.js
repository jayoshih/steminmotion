
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')

var index = require('./routes/index');
var welcome = require('./routes/welcome');
var lessons = require('./routes/lessons');
var purchase = require('./routes/purchase');
var submit = require('./routes/submit');
var about = require('./routes/about');
var contact = require('./routes/contact');
var programs = require('./routes/programs');
var order = require('./routes/order');
var development = require('./routes/development');
// Example route
// var user = require('./routes/user');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Math in Motion Key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Add routes here
app.get('/', welcome.view);
app.get('/home', index.view);
app.get('/lessons', lessons.view);
app.get('/lessons/:id', lessons.lesson);
app.get('/about', about.view);
app.get('/store', purchase.view);
app.get('/submit', submit.view);
app.get('/contact',contact.view);
app.get('/programs', programs.view);
app.get('/order', order.view);
app.get('/development', development.view);
app.get('/development/lessons', development.lessons);
app.get('/development/lessons/:id', development.lesson);
// app.get('/:id/learn', lessons.lesson);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
