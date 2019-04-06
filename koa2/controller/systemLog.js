let syslogModel = require('../model/systemLog');

class controllerSyslog {

    static async getObject (ctx, next) {
        try {
            let query = ctx.query;
            let returnData = await syslogModel.getObjectByLimit(query);
            ctx.body = {
                result : returnData.rows,
                total : returnData.count
            };
        } catch (err) {
            ctx.response.status = err.statusCode || err.status || 500;
            ctx.response.body = {
                message: err.message
            };
        }
    }

    static async getAttackType (ctx, next) {
        try {
            let query = ctx.query;
            let returnData = await syslogModel.getAttackType(query);
            ctx.body = {
                result : returnData,
                total : returnData.length
            };
        } catch (err) {
            ctx.response.status = err.statusCode || err.status || 500;
            ctx.response.body = {
                message: err.message
            };
        }
    }

    static async createObject (ctx, next) {
        try {
            let req = ctx.request.body;
            let returnData = await syslogModel.createObject(req);
            ctx.body = returnData;
        } catch (err) {
            ctx.response.status = err.statusCode || err.status || 500;
            ctx.response.body = {
                message: err.message
            };
        }
    }
};

module.exports = controllerSyslog;