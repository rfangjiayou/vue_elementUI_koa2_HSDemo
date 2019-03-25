const response = async (ctx, next) => {
    await next().catch((error) => {           //token 错误提示
        if(error.status === 401){
            ctx.status = 401;
            ctx.body = 'Protected resource, use Authorization header to get access\n';
        }else{
            throw error;
        }
    });
}

module.exports = response;