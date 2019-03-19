const response = async (ctx, next) => {
    await next();
}

module.exports = response;