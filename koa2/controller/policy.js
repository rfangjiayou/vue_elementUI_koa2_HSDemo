let policyModel = require('../model/policy');

class controllerPolicy {

    static async getObject (ctx, next) {
        try {
            let query = ctx.query;
            let returnData = await policyModel.getObjectByLimit(query);
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

    static async createObject (ctx, next) {
        try {
            let req = ctx.request.body;
            let returnData = await policyModel.createObject(req);
            ctx.body = returnData;
        } catch (err) {
            ctx.response.status = err.statusCode || err.status || 500;
            ctx.response.body = {
                message: err.message
            };
        }
    }

    static async updateObject (ctx, next) {
        try {
            let req = ctx.request.body;
            if(req.id){
                let returnData = await policyModel.updateObject(req);
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