// 引入 mongodb 驱动包
const { MongoClient } = require("mongodb");

// 引入配置文件
const {
  mongodb: { uri, options },
} = require("../config/config.default");

// 创建 MongoDB 客户端实例,相关配置信息,从 config 中读取
const client = new MongoClient(uri, options);

// 开始连接
client.connect();

// 将客户端实例导出
module.exports = client;