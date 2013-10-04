var cluster = require('cluster')
  , cores   = process.env.CPU_CORES || 4
  ;

if (cluster.isMaster && !module.parent) {
  for (var i = 0; i < cores; i++)
    cluster.fork();
} else {

  // new relic
  if (process.env.NEW_RELIC_LICENSE_KEY) {
    require('newrelic');
  }

  var express  = require('express')
    , http     = require('http')
    , path     = require('path')
    ;

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

  // csrf - unless testing
  if ('test' !== app.get('env')) {
    app.use(express.csrf());
    app.use(function (req, res, next) {
      res.locals.token = req.csrfToken();
      res.cookie('XSRF-TOKEN', req.csrfToken());
      next();
    });
  }

  // set hostname (used for Facebook image URL)
  app.use(function (req, res, next) {
    var host = process.env.HOST_NAME || req.headers.host || 'www.ntc.io';
    res.locals.host = 'http://' + host;
    next();
  });

  // config
  require('./config/env')(app, express);

  // include any custom middleware before this app.router
  app.use(app.router);
  // static files
  app.use(express.static(path.join(__dirname, 'public')));

  // global helpers
  require('./lib/helpers')(app);
  app.locals.errors  = {};
  app.locals.message = {};

  // basic routes
  require('./config/routes')(app);
  // features
  app.use(require('./lib/signup'));
  app.use(require('./lib/donate'));
  app.use(require('./lib/share'));

  // start server
  if (!module.parent) {
    http.createServer(app).listen(app.get('port'), function () {
      console.log('Server listening on port ' + app.get('port'));
    });
  }

}
