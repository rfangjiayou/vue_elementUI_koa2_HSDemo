let db = require('../config/db');
let login = db.import('../schema/login');

//自动创建表，加force：true，会先删掉表然后再新建表
// login.sync({force : false});

class loginModel {
    static async getObject () {
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
        }, {
            where : {
                id : data.id
            }
        });
    }

    static async deleteObject (data) {
        return await login.destroy({
            where : {
                id : data
            }
        });
    }
}

module.exports = loginModel;