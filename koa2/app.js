let koa = require('koa'), 
	logger = require('koa-logger'), 
	json = require('koa-json'), 
	onerror = require('koa-onerror'), 
	cors = require('koa-cors');

let app = new koa();
let index = require('./routes/index');
let response = require('./middleware/response');

//=========================================================================
//中间件，贼jier重要，既是入口也是出口
app.use(response);
//=========================================================================

// error handler
onerror(app);

app.use(require('koa-bodyparser')({
	enableTypes:['json', 'form', 'text']
}));
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
