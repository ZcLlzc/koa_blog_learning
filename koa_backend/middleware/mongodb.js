// 自定义中间件,将 mongodb 客户端实例,挂载到 ctx 对象上
const mongoClient = require("../database/mongodb");

/**
 * @description: 中间件工厂函数!
 * 作用:调用该工厂函数,得到一个中间件,可以在任何拿到 ctx 地方,直接获取 mongoClint ,可以操作数据库
 * @return {function}
 */
module.exports = () => {
  // 返回真正的中间件函数
  return async (ctx, next) => {
    ctx.mongoClient = mongoClient;
    await next();
  };
};
