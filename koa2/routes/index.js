let router = require('koa-router')();
let policy = require('./policy');
let login = require('./login');
let systemLog = require('./systemLog');

router.use('/policy', policy.routes(), policy.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/systemlog', systemLog.routes(), systemLog.allowedMethods());

module.exports = router;