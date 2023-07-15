// 导入 koa Router 库
const Router = require("@koa/router");

// 创建路由实例
const router = new Router();

// 导入 controller 控制器
const { apiTest } = require("../controller/home");

// 配置测试路由
router.get("/api/test", apiTest);

module.exports = router;
