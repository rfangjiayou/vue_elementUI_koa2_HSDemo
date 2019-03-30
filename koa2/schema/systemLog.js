module.exports = (sequelize, dataTypes) => {
    return sequelize.define('system_log', {      //表名
        id : {
            type : dataTypes.INTEGER,           //类型
            primaryKey : true,                  //主键
            allowNull : false,                  //是否可以为null
            autoIncrement : true                //是否自增
        },
        time : {
            type : dataTypes.TIME,
            allowNull : true,
            field : 'time'
        },
        severity : {
            type : dataTypes.INTEGER,
            allowNull : true,
            field : 'severity'
        },
        client_ip : {
            type : dataTypes.STRING,
            allowNull : true,
            field : 'client_ip'
        },
        hit_count : {
            type : dataTypes.INTEGER,
            allowNull : true,
            field : 'hit_count'
        },
        protection_type : {
            type : dataTypes.INTEGER,
            allowNull : true,
            field : 'protection_type'
        }
    }, {
        freezeTableName : true,      //默认情况下自动将所有传递的模型名称（第一个参数）转换为复数，如果不想这样，这个属性置为true
        timestamps: false //禁用时间戳模型，否则返回的数据中会带有createdAt和updateAt
    });
}