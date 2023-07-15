// 数据相关配置;Token 认证
const config = {
  // MongoDB 相关配置
  mongodb: {
    uri: "mongodb://root:123456@localhost:27017/blog",
    // 开启权限控制
    options: {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      authSource: "admin",
    },
  },
  // token 相关配置 JSON Web Token
  jwt: {
    secret: "blog-item",
  },
};
module.exports = config;
