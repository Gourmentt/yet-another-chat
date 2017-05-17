const Koa = require('koa');
const app = new Koa();

var session            = require('koa-session'),
    config             = require('./backend/config/main'),
    views              = require('koa-views'),
    util               = require('util'),
    mongoose           = require('mongoose'),
    bodyParser         = require('koa-bodyparser'),
    IO                 = require('koa-socket');
const io = new IO();

mongoose.connect(util.format('mongodb://%s/%s', config.mongoDB.host, config.mongoDB.db));
app.keys = ['fadjsbfalirvlvrfajlsdbhfalkshdbg'];

app
    .use(session(config.session, app))
    .use(views('backend/views', { extension: 'pug' }))
    .use(require('koa-static')(config.assetsPath))
    .use(bodyParser());

require('./backend/routes')(app);

io.attach(app);

app.listen(3000);