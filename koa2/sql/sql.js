const mysql = require('mysql');
const connection = mysql.createPool({
    host     : '127.0.0.1',            // 数据库地址
    user     : 'root',                 // 数据库用户
    password : 'hillstone',               // 数据库密码
    database : 'hsdemo'              // 选中数据库
});

let mysqlDao = {
    query : function(sql, values) {
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
                    })
                }
            })
        })
    },

    getData : function(tableName) {
        let sql = 'SELECT * FROM ' + tableName;
        return mysqlDao.query(sql);
    }
};

/* let query = function(sql, values) {
    return new Promise((resolve, reject ) => {
        connection.getConnection(function(error, connection) {
            if (error) {
                reject(error)
            } else {
                connection.query(sql, values, (error, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    connection.release()
                })
            }
        })
    })
} */
  
module.exports = mysqlDao;