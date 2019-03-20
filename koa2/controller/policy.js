const policyModel = require('../model/policy');

class policy{

    static async getObject (ctx, next) {
        try {
            let returnData = await policyModel.getObject();
            ctx.body = returnData;
        } catch (e) {
            ctx.body = {
                code: 500,
                msg: e
            }
        }
    }

    static async createObject (ctx, next) {
        try {
            let data = ctx.body.data;
            let returnData = await mysqlObj.createObject(data);
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