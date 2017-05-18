const Koa = require('koa');
const app = new Koa();

let session            = require('koa-session-redis'),
    config             = require('./backend/config/' + app.env),
    views              = require('koa-views'),
    mongoose           = require('mongoose'),
    bodyParser         = require('koa-bodyparser');

global.config = config;

mongoose.connect(config.mongoDB.uri);
app.keys = ['fadjsbfalirvlvrfajlsdbhfalkshdbg'];

require('./backend/setup/errors')(app);

app
    .use(session(config.session, app))
    .use(views('backend/views', { extension: 'pug' }))
    .use(require('koa-static')(config.frontendPath))
    .use(bodyParser());

require('./backend/setup/routes')(app);

require('./backend/setup/socketIO')(app);

app.listen(config.appPort);