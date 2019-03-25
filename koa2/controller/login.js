let loginModel = require('../model/login');
let jwt = require('jsonwebtoken');

class controllerLogin {

    static async getObject (ctx, next) {
        try {
            let returnData = await loginModel.getObject();
            ctx.body = returnData;
        } catch (err) {
            ctx.response.status = err.statusCode || err.status || 500;
            ctx.response.body = {
                message: err.message
            };
        }
    }

    static async getSimpleObject (ctx, next) {
        try {
            let req = ctx.request.body;
            let returnData = await loginModel.getSimpleObject(req);
            if(returnData){
                let token = jwt.sign({
                    username: returnData.username,
                    password: returnData.password
                }, 'rfang', { expiresIn: '1h' });
                ctx.body = {
                    data : returnData,
                    token : token
                };
            }else{
                ctx.status = 204;
            }
        } catch (err) {
            ctx.response.status = err.statusCode || err.status || 500;
            ctx.response._body = {
                message: err.message
            };
        }
    }

    static async createObject (ctx, next) {
        try {
            let req = ctx.request.body;
            let returnData = await loginModel.createObject(req);
            ctx.body = returnData;
        } catch (err) {
            ctx.response.status = err.statusCode || err.status || 500;
            ctx.response._body = {
                message: err.message
            };
        }
    }

    static async updateObject (ctx, next) {
        try {
            let req = ctx.request.body;
            if(req.id){
                let returnData = await loginModel.updateObject(req);
                ctx.body = returnData;
            }else{
                ctx.throw(500);
            }
        } catch (err) {
            ctx.response.status = err.statusCode || err.status || 500;
            ctx.response._body = {
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
                let returnData = await loginModel.deleteObject(params);
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

    static async registerObject (ctx, next) {
        try {
            let returnData = await loginModel.getObject();
            let req = ctx.request.body;
            let flag = true;
            returnData.forEach(element => {
                if(element.username == req.username){
                    flag = false;
                }
            })
            if(flag){
                returnData = await loginModel.createObject(req);
                ctx.body = returnData;
            }else{
                ctx.throw(500);
            }
        } catch (err) {
            ctx.response.status = err.statusCode || err.status || 500;
            ctx.response.body = {
                message: 'The username is already existed!'
            };
        }
    }
};

module.exports = controllerLogin;