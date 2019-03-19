let router = require('koa-router')();
let controllerPolicy = require('../controller/policy');

// router.prefix('/policy');

router.get('/getObject', controllerPolicy.getObject);

module.exports = router;
