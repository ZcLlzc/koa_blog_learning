const { doRegister, gengerateCaptcha, doLogin } = require("../service/auth");

module.exports = {
  /**
   * @description:注册接口
   * @param {*} ctx
   * @return {*}
   */
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

  /**
   * @description: 获取验证码接口
   * @param {*} ctx
   * @return {*}
   */
  async captcha(ctx) {
    // 处理验证码的 service 层逻辑方法
    const result = await gengerateCaptcha(ctx);
    //  返回成功的数据
    ctx.body = {
      code: 200,
      message: "获取验证码成功!",
      data: result,
    };
  },

  async login(ctx) {
    const result = await doLogin(ctx, ctx.request.body);

    ctx.body = {
      code: 200,
      message: "登陆成功!",
      data: result,
    };
  },
};
