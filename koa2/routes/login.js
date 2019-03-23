let router = require('koa-router')();
let controllerLogin = require('../controller/login');

// router.prefix('/login');

router.get('/login', controllerLogin.getObject);
router.post('/login', controllerLogin.getSimpleObject);

module.exports = router;
