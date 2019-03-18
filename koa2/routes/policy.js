var router = require('koa-router')();
// var controllerPolicy = require('../controller/policy');
const mysqlObj = require('../sql/sql');

router.prefix('/policy');

router.get('/getObject', async (ctx, next) => {
    // controllerPolicy.getObject(ctx, next);
    let tablename = 'cr_policy';

    await mysqlObj.getData(tablename)
        .then((data) => {
            let policyList = data;
            ctx.body = {
                code: 200,
                list: policyList
            }
        }).catch((error) => {
            ctx.body = {
                data: error
            }
        });
});

module.exports = router;
