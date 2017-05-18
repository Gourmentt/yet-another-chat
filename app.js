const Koa = require('koa');
const app = new Koa();

let session            = require('koa-session-redis'),
    config             = require('./backend/config/' + app.env),
    errorHandler       = require('./backend/setup/errors'),
    views              = require('koa-views'),
    mongoose           = require('mongoose'),
    bodyParser         = require('koa-bodyparser');

global.config = config;
global.app = app;

mongoose.connect(config.mongoDB.uri);
app.keys = ['fadjsbfalirvlvrfajlsdbhfalkshdbg'];

app
    .use(session(config.session, app))
    .use(errorHandler())
    .use(views('backend/views', { extension: 'pug' }))
    .use(require('koa-static')(config.frontendPath))
    .use(bodyParser());

require('./backend/setup/routes')(app);

require('./backend/setup/socketIO')(app);

app.listen(config.appPort);

console.log("Started listening as %s env", app.env);