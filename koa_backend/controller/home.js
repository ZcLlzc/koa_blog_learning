// controller 中用于提供,路由的处理函数
module.exports = {
  // 测试路由的处理函数
  async apiTest(ctx) {
    ctx.body = {
      code: 200,
      message: "/api/test 测试!",
    };
  },
};
