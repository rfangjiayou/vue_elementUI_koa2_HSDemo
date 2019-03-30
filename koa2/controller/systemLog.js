let syslogModel = require('../model/systemLog');

class controllerSyslog {

    static async getObject (ctx, next) {
        try {
            let returnData = await syslogModel.getObject();
            ctx.body = returnData;
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