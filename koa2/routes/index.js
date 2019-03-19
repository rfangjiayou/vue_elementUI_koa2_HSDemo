var router = require('koa-router')();
var policy = require('./policy');

router.use('/policy', policy.routes(), policy.allowedMethods());

module.exports = router;