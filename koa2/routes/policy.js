var router = require('koa-router')();
var controllerPolicy = require('../controller/policy');

router.prefix('/policy');

router.get('/', function (next) {
    this.body = 'this is a users response!';
});

router.get('/getObject', controllerPolicy.getObject);

module.exports = router;
