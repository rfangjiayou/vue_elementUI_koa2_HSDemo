let router = require('koa-router')();
let controllerPolicy = require('../controller/policy');

// router.prefix('/policy');

router.get('/getObject', controllerPolicy.getObject);
router.post('/createObject', controllerPolicy.createObject);
router.put('/updateObject', controllerPolicy.updateObject);
router.delete('/deleteObject', controllerPolicy.deleteObject);

module.exports = router;
