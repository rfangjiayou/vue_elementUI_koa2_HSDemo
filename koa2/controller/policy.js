const mysqlObj = require('../sql/sql');

class policy{

    static async getObject (ctx, next) {
        try {
            let tablename = 'cr_policy';

            let returnData = await mysqlObj.getData(tablename);
            ctx.body = returnData;
        } catch (e) {
            ctx.body = {
                code: 500,
                msg: e
            }
        }
    }
};

module.exports = policy;