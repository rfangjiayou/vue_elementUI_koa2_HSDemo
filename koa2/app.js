var koa = require('koa')
  , logger = require('koa-logger')
  , json = require('koa-json')
  , views = require('koa-views')
  , onerror = require('koa-onerror')
  , cors = require('koa-cors');

var app = new koa();
var index = require('./routes/index');

//=========================================================================
//贼jier重要，既是入口也是出口
app.use(async (ctx, next) => {
	await next();
	// ctx.body = ctx.request.body;
})
//=========================================================================

// error handler
onerror(app);

// global middlewares
/* app.use(views('views', {
	root: __dirname + '/views',
	default: 'jade'
})); */
app.use(require('koa-bodyparser')());
app.use(json());
app.use(logger());

//允许跨域
app.use(cors());

app.use(require('koa-static')(__dirname + '/public'));

// routes definition
app.use(index.routes(), index.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app;
