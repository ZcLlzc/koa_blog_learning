// 导入 koa Router 库
const Router = require("@koa/router");

// 创建路由实例
const router = new Router();

// 导入 controller 控制器
const { apiTest } = require("../controller/home");
const { register, captcha, login } = require("../controller/auth");

// 配置测试路由
// 测试接口
router.get("/api/test", apiTest);
// 注册接口
router.post("/api/register", register);
// 获取验证码接口
router.get("/api/captcha", captcha);
// 登录接口
router.post("/api/login", login);
module.exports = router;
