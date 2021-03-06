let db = require('../config/db');
let policy = db.import('../schema/policy');

//自动创建表，加force：true，会先删掉表然后再新建表
// policy.sync({force : false});

class policyModel {
    static async getObject () {
        return await policy.findAll();
    }

    static async getObjectByLimit (query) {
        let limit = parseInt(query.limit),
            offset = parseInt(query.offset);
        return await policy.findAndCountAll({
            limit: limit,
            offset: offset
        });
    }

    static async createObject (data) {
        return await policy.create({
            name : data.name,
            actionDirection : data.actionDirection,
            match : data.match,
            action : data.action,
            replement : data.replement,
            description : data.description
        });
    }

    static async updateObject (data) {
        return await policy.update({
            name : data.name,
            actionDirection : data.actionDirection,
            match : data.match,
            action : data.action,
            replement : data.replement,
            description : data.description
        }, {
            where : {
                id : data.id
            }
        });
    }

    static async deleteObject (data) {
        return await policy.destroy({
            where : {
                id : data
            }
        });
    }
}

module.exports = policyModel;