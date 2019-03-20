/*

原始方法，暂时不使用

*/

const mysql = require('mysql');
const connection = mysql.createPool({
    host     : '127.0.0.1',            // 数据库地址
    user     : 'root',                 // 数据库用户
    password : 'admin',               // 数据库密码
    database : 'hsdemo'              // 选中数据库
});

let query = function(sql, values) {
    return new Promise((resolve, reject) => {
        connection.getConnection(function(error, connection) {
            if (error) {
                reject(error);
            } else {
                connection.query(sql, values, (error, rows) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(rows);
                    }
                    connection.release();
                });
            }
        })
    })
};

let mysqlDao = {
    getData : function(tableName) {
        let sql = 'SELECT * FROM ' + tableName;
        return query(sql);
    }
};

module.exports = mysqlDao;