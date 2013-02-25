
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , middleware = require('./middleware')
  ;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  
  app.use(express.cookieParser());
  //app.use(express.session({secret: 'top secret', store: (process.env.NEO4J_URL || 'http://localhost:7474'), cookie: {maxAge: 3600000 }}));

  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

app.helpers({
    title: 'ClangWire: Web Robots'
});

// Routes

app.get('/', routes.site.index);

app.get('/users', routes.users.list);
app.post('/users', routes.users.create);
app.get('/users/:id', routes.users.show);
app.post('/users/:id', routes.users.edit);
app.del('/users/:id', routes.users.del);
app.post('/users/:id/follow', routes.users.follow);
app.post('/users/:id/unfollow', routes.users.unfollow);

app.get('/livestream', routes.livestream.watch);

app.get('/robotphoto', routes.robot.photo);
app.get('/robotgraph', routes.robot.graph);

app.post('/program', routes.program.create);
app.get('/program/xml/:id', routes.program.xmlout);
app.get('/program/:id', routes.program.show);

app.get('/code-env', routes.robot.code);

app.get('/auth', middleware.require_auth_browser, routes.index);

app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);