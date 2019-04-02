let db = require('../config/db');
let login = db.import('../schema/login');

//自动创建表，加force：true，会先删掉表然后再新建表
// login.sync({force : false});

class loginModel {
    static async getObject (query) {
        let limit = parseInt(query.limit),
            offset = parseInt(query.offset);
        return await login.findAndCountAll({
            limit: limit,
            offset: offset
        });
    }

    static async getAllObject () {
        return await login.findAll();
    }

    static async getSimpleObject (data) {
        return await login.findOne({
            where : {
                username : data.username,
                password : data.password
            }
        });
    }

    static async createObject (data) {
        return await login.create({
            username : data.username,
            password : data.password,
            role : data.role
        });
    }

    static async updateObject (data) {
        return await login.update({
            username : data.username,
            password : data.password,
            role : data.role
        }, {
            where : {
                username : data.username
            }
        });
    }

    static async deleteObject (data) {
        return await login.destroy({
            where : {
                username : data
            }
        });
    }
}

module.exports = loginModel;