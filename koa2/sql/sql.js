const mysql = require('mysql');
const connection = mysql.createConnection({
    host     : '127.0.0.1',            // 数据库地址
    user     : 'root',                 // 数据库用户
    password : 'admin',               // 数据库密码
    database : 'hsdemo'              // 选中数据库
});

module.exports = {
    async getObject() {
        connection.query('SELECT * FROM cr_policy',  (error, results, fields) => {
            if (error) throw error
            // connected! 
            
            // 结束会话
            connection.release() 
        });
    }
}