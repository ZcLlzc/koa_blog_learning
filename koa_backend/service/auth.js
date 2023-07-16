// 密码加密及比较
const { hash, compare } = require("bcrypt");

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

module.exports = {
  doRegister,
};
