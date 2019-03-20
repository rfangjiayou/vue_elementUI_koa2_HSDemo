const db = require('../config/db');
const policy = db.import('../schema/policy');

//自动创建表，加force：true，会先删掉表然后再新建表
// policy.sync({force : false});

class policyModel {
    static getObject () {
        return policy.findAll();
    }

    static createObject (data) {
        return policy.create({
            name : data.name,
            actionDirection : data.actionDirection,
            match : data.match,
            action : data.action,
            replement : data.replement,
            description : data.description
        });
    }
}

module.exports = policyModel;