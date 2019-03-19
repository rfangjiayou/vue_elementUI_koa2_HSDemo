var router = require('koa-router')();
// var controllerPolicy = require('../controller/policy');
const mysqlObj = require('../sql/sql');

// router.prefix('/policy');

router.get('/getObject', async (ctx, next) => {
    let tablename = 'cr_policy';

    // let returnData = await mysqlObj.getData(tablename);
    // ctx.body = returnData;
    await mysqlObj.getData(tablename)
        .then((data) => {
            ctx.body = {
                status: 200,
                data: data
            }
        }).catch((error) => {
            ctx.body = {
                data: error
            }
        });

    console.log(ctx);
});

module.exports = router;
