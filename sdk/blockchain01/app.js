
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , register = require('./routes/register')
  , login = require('./routes/login')
  , registerRes = require('./routes/registerRes')
  , loginRes = require('./routes/loginRes')
  , addRole = require('./routes/addRole')
  , addUser = require('./routes/addUser')
  , http = require('http')
  , path = require('path');
var fs = require('fs');
var util = require('util');


var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));




app.get('/', routes.index);
app.get('/register', register.register);
app.get('/login', login.login);
app.get('/registerRes', registerRes.registerRes);
app.all('/loginRes', loginRes.loginRes);
app.get('/addRole', addRole.addRole);
app.get('/addUser', addUser.addUser);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

