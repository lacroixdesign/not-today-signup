var cluster = require('cluster');

if ( cluster.isMaster ) {
  for ( var i=0; i<2; ++i )
    cluster.fork();
} else {

  // new relic
  if(process.env.NEW_RELIC_LICENSE_KEY) {
    require('newrelic');
  }

  var express  = require('express')
    , http     = require('http')
    , path     = require('path');

  var app = module.exports = express();

  // assets
  app.use(express.compress());
  require('./config/assets')(app);

  // all environments
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.cookieSession({ secret: '_not_today_signup_16825abd2de10e49a0b3e33396920e3b' }));
  app.use(express.csrf());

  // csrf
  app.use(function(req, res, next){
    res.locals.token = req.csrfToken();
    res.cookie('XSRF-TOKEN', req.csrfToken());
    next();
  });

  // config
  require('./config/env')(app, express);

  // static files
  app.use(express.static(path.join(__dirname, 'public')));

  // mongoose
  // app.db = mongoose;
  // app.db.connect(app.get('mongodb-uri'));

  // models
  // require('./config/models')(app, mongoose);

  // services
  // app.set('Service', require('./lib/services/service'));

  // global helpers
  require('./lib/helpers')(app);
  app.locals.errors  = {};
  app.locals.message = {};

  // include any custom middleware before this app.router
  app.use(app.router);
  require('./config/routes')(app);

  // start server
  if (!module.parent) {
    http.createServer(app).listen(app.get('port'), function() {
      console.log('Server listening on port ' + app.get('port'));
    });
  }

}
