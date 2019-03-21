let policyModel = require('../model/policy');

class controllerPolicy {

    static async getObject (ctx, next) {
        try {
            let returnData = await policyModel.getObject();
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
            req.match = JSON.stringify(req.match);
            let returnData = await policyModel.createObject(req);
            ctx.body = returnData;
        } catch (err) {
            ctx.response.status = err.statusCode || err.status || 500;
            ctx.response.body = {
                message: err.message
            };
        }
    }

    static async deleteObject (ctx, next) {
        try {
            let req = ctx.request.body;
            let params = [];
            req.forEach(element => {
                params.push(element.id);
            });
            if(params.length > 0){
                let returnData = await policyModel.deleteObject(params);
                ctx.body = returnData;
            }else{
                ctx.throw(500);
            }
        } catch (err) {
            ctx.response.status = err.statusCode || err.status || 500;
            ctx.response.body = {
                message: err.message
            };
        }
    }
};

module.exports = controllerPolicy;