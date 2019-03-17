var sql = require('../sql/sql');

module.exports = {
    async getObject(ctx, next) {
        try {
            let policyList = sql.getObject();
            ctx.body = {
                code: 200,
                list: policyList
            }
        } catch (e) {
            console.log(e);
            ctx.body = {
                code: 500,
                msg: e
            }
        }
    }
}