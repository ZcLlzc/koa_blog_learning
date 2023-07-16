// controller 中用于提供,路由的处理函数
module.exports = {
  // 测试路由的处理函数
  async apiTest(ctx) {
    // 抛出错误的两种方式
    // 1.原生抛出错误
    //  throw new Error("error")

    // 2.koa封装的抛出错误
    // return ctx.throw({ code: 401, message: "测试抛出错误信息!" });

    // 测试请求参数
    ctx.verifyParams({ username: "string" });

    ctx.body = {
      code: 200,
      message: "/api/test 测试!",
    };
  },
};
