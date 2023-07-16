const { doRegister } = require("../service/auth");

module.exports = {
  async register(ctx) {
    // 必传参数及类型
    ctx.verifyParams({
      username: "string",
      nickname: "string",
      password: "string",
    });
    // 封装一个 service 方法,处理注册逻辑
    await doRegister(ctx, ctx.request.body);
    ctx.body = {
      code: 200,
      message: "ok",
    };
  },
};
