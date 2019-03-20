let router = require('koa-router')();
let controllerPolicy = require('../controller/policy');

// router.prefix('/policy');

router.get('/getObject', controllerPolicy.getObject);
router.get('/createObject', controllerPolicy.createObject);

module.exports = router;
