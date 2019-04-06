const Sequelize = require('sequelize');
let db = require('../config/db');
let syslog = db.import('../schema/systemLog');

//自动创建表，加force：true，会先删掉表然后再新建表
// syslog.sync({force : false});

//生成某个范围的随机数
let rnd = (n, m) => {
    let random = Math.floor(Math.random()*(m-n+1)+n);
    return random;
}

let writeSyslog = (total) => {
    let timeRange = 60 * 60 * 24 * 10, //100天数据
        protection_type = [100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 199];
    for(let i = 0; i < total; i++){
        syslog.create({
            time : (new Date()).getTime() - rnd(0, timeRange),
            severity : rnd(0, 3),
            client_ip : '111.112.113.' + rnd(0, 255).toString(),
            hit_count : rnd(0, 10000),
            protection_type : protection_type[rnd(0, 9)]
        });
    }
};

let getInterVal = (interval) => {
    let now = new Date().getTime(),
        intervalData = '';
    switch(interval){
        case 'hour' : 
            intervalData = 60 * 60 * 1000;
            break;
        case 'day' : 
            intervalData = 24 * 60 * 60 * 1000;
            break;
        case 'week' : 
            intervalData = 7 * 24 * 60 * 60 * 1000;
            break;
        case 'month' : 
            intervalData = 30 * 24 * 60 * 60 * 1000;
            break;
        default :
            intervalData = 60 * 60 * 1000;
            break;
    }
    return new Date(now - intervalData);
};

class syslogModel {
    static async getObject () {
        return await syslog.findAll({
            'order': [
                ['time', 'DESC']
            ]
        });
    }

    static async getObjectByLimit (query) {
        let limit = parseInt(query.limit),
            offset = parseInt(query.offset);
        return await syslog.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [
                ['time', 'DESC']
            ]
        });
    }

    static async getAttackType (query) {
        let groupBy = query.groupBy,
            interval = getInterVal(query.interval);
        return await syslog.findAll({
            attributes:[groupBy, [db.fn('SUM', db.col('hit_count')), 'hit_count']],   //返回的字段
            group:groupBy, 
            where: {
                time : {
                    [Sequelize.Op.gte] : interval
                }
            },
            raw:true,
            logging:true
        });
        // return await syslog.aggregate(groupBy, [db.fn('SUM', db.col('hit_count')), 'sum']);
    }

    static async createObject (data) {
        return await writeSyslog(data.total);
    }
}

module.exports = syslogModel;