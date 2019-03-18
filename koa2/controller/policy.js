const mysqlObj = require('../sql/sql');

let policy = {
    getObject : async function (ctx, next) {
        try {
            let tablename = 'cr_policy';

            await mysqlObj.getData(tablename)
                .then((data) => {
                    let policyList = data;
                    ctx.body = {
                        code: 200,
                        list: policyList
                    }
                })
                .catch((error) => {
                    ctx.body = {
                        data: error
                    }
                });
        } catch (e) {
            console.log(e);
            ctx.body = {
                code: 500,
                msg: e
            }
        }
    }
};

module.exports = policy;