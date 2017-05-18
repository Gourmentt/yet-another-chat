const Koa = require('koa');
const app = new Koa();

let session            = require('koa-session-redis'),
    config             = require('./backend/config/main'),
    views              = require('koa-views'),
    util               = require('util'),
    mongoose           = require('mongoose'),
    bodyParser         = require('koa-bodyparser'),
    OnlineUsersList    = require('./backend/models/OnlineUsersList');

mongoose.connect(util.format('mongodb://%s/%s', config.mongoDB.host, config.mongoDB.db));
app.keys = ['fadjsbfalirvlvrfajlsdbhfalkshdbg'];

app
    .use(session(config.session, app))
    .use(views('backend/views', { extension: 'pug' }))
    .use(require('koa-static')(config.assetsPath))
    .use(bodyParser());

require('./backend/routes')(app);

require('./backend/setup/socketIO')(app);

app.listen(3000);