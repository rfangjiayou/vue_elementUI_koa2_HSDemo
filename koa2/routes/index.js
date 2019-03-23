let router = require('koa-router')();
let policy = require('./policy');
let login = require('./login');

router.use('/policy', policy.routes(), policy.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());

module.exports = router;