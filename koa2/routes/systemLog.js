let router = require('koa-router')();
let controllerSyslog = require('../controller/systemLog');

// router.prefix('/policy');

router.get('/getObject', controllerSyslog.getObject);
router.get('/getAttackType', controllerSyslog.getAttackType);
router.get('/getSeverity', controllerSyslog.getSeverity);
router.post('/createObject', controllerSyslog.createObject);

module.exports = router;
