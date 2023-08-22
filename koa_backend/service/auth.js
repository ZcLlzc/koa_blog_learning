// 密码加密及比较
const { hash, compare } = require("bcrypt");
// 获取 svg 验证码
const svgCaptcha = require("svg-captcha");
// 将 svg 转换成 base64 格式
const { Base64 } = require("js-base64");
// 生成 token
const jwtoken = require("jsonwebtoken");
// 获取生成 token 的配置
const { jwt } = require("../config/config.default");
// https://jira.mongodb.org/browse/NODE-5080
const { ObjectId } = require("mongodb");

/**
 * @description: 进行注册操作
 * @param {*} ctx (ctx.mongoClient)
 * @param {*} userInfo({username,nickname,password})
 * @return {*}
 */
async function doRegister(ctx, userInfo) {
  const { username, nickname, password } = userInfo;
  // 判断注册用户名是否存在
  const isExit = await checkUsernameExist(ctx, username);
  if (isExit) {
    return ctx.throw({ code: 200, message: "用户名已存在!" });
  }
  // 加密密码,将密码明文,使用 bcrypt 进行10个轮次的 hash 加密
  const passwordHash = await hash(password, 10);
  // 往数据库中插入一条数据
  const userColl = ctx.mongoClient.db().collection("user");
  const result = await userColl.insertOne({
    username,
    nickname,
    password: passwordHash,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return !!result.insertedId;
}

/**
 * @description: 校验用户名是否存在
 * @param {*} ctx (ctx.mongoClient)
 * @param {*} username 用户名
 * @return {*} Boolean
 */
async function checkUsernameExist(ctx, username) {
  // 查询 数据库中 user 集合
  const userColl = ctx.mongoClient.db().collection("user");
  const user = await userColl.findOne({ username });
  return !!user; // !! 运算符,它的作用是将一个任意的值转换为对应的布尔值
}

/**
 * @description: 生成验证码
 * @param {*} ctx
 * @return {*}
 */
async function gengerateCaptcha(ctx) {
  // tex:结果 ; data: svg 图片
  const { text, data } = svgCaptcha.createMathExpr({ noise: 2, color: true });
  // 存入缓存验证码的表(captcha)
  const coll = ctx.mongoClient.db().collection("captcha");
  const { insertedId } = await coll.insertOne({
    number: text,
    createdAt: new Date(),
  }); //必须设置日期,用于验证码的过期处理
  const base64Svg = Base64.encode(data);
  return { id: insertedId, svg: `data:image/svg+xml;base64,${base64Svg}` };
}

/**
 * @description: 登录
 * @param {*} ctx
 * @param {*} userInfo
 * @return {*} token
 */
async function doLogin(ctx, userInfo) {
  const { username, password, captchaKey, captchaCode } = userInfo;
  // 1.校验验证码
  const captColl = ctx.mongoClient.db().collection("captcha");
  const captcha = await captColl.findOne({ _id: ObjectId(captchaKey) });
  if (!captcha) {
    ctx.throw({ code: 200, message: "验证码已过期,请重新获取验证码!" });
  }
  // 从数据库中清除本次的验证码
  await captColl.deleteOne({ _id: ObjectId(captchaKey) });
  if (captcha.number !== captchaCode) {
    ctx.throw({ code: 200, message: "验证码不正确,请重新获取验证码!" });
  }
  // 2.校验用户名和密码
  const userColl = ctx.mongoClient.db().collection("user");
  const userInDB = await userColl.findOne({ username });
  if (!userInDB) {
    ctx.throw({ code: 200, message: "用户名不正确!" });
  }
  // 比对密码
  const isValid = await compare(password, userInDB.password);
  if (!isValid) {
    ctx.throw({ code: 200, message: "密码不正确!" });
  }
  // 通过校验后生成 token
  const secretKey = jwt.secret;
  const payload = { username, userId: userInDB._id.toString() };
  const options = { expiresIn: "10h" };
  const token = jwtoken.sign(payload, secretKey, options);
  return token;
}

async function doLogout(ctx,userInfo){
  

}
module.exports = {
  doRegister,
  gengerateCaptcha,
  doLogin,
  doLogout
};
