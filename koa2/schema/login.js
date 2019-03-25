module.exports = (sequelize, dataTypes) => {
    return sequelize.define('admin', {      //表名
        username : {
            type : dataTypes.STRING,            //类型
            primaryKey : true,                  //主键
            allowNull : false,                  //是否可以为null
            autoIncrement : false,                //是否自增
            field : 'username'
        },
        password : {
            type : dataTypes.STRING,
            allowNull : false,
            field : 'password'
        },
        role : {
            type : dataTypes.INTEGER,
            allowNull : false,
            field : 'role'
        }
    }, {
        freezeTableName : true,      //默认情况下自动将所有传递的模型名称（第一个参数）转换为复数，如果不想这样，这个属性置为true
        timestamps: false //禁用时间戳模型，否则返回的数据中会带有createdAt和updateAt
    });
}