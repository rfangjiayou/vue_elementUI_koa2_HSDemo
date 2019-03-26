let jwt = require('jsonwebtoken');
let serect = 'rfang';  //密钥，不能丢

module.exports = (returnData) => {
    let token = jwt.sign({
        username: returnData.username,
        password: returnData.password
    }, serect, { expiresIn: 15 * 60 }); //超时时间单位：秒
    return token;
}