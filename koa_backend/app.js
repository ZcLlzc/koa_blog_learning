const Koa = require("koa");
// 处理 post 请求体参数 (koa-body 版本 6.0 以上要这样导入: https://github.com/koajs/koa-body/issues/215)
const { koaBody } = require("koa-body");
// 导入路由实例
const router = require("./router");
// 导入中间件工厂函数
const mongoMiddleware = require("./middleware/mongodb");
// 导入处理静态资源的中间件 - 托管中间件
const koaStatic = require("koa-static");
// 导入处理跨域的中间件
const koaCros = require("@koa/cors");
// 导入错误处理中间件
const koaError = require("koa-json-error");
// 导入参数校验中间件
const koaParameter = require("koa-parameter");
// 创建 koa 实例
const app = new Koa();

// 中间件:请求参数校验,加工过后,ctx 会多一个 verifyParams 方法
koaParameter(app);

// 处理跨域
app.use(koaCros());

// 中间件：静态资源服务
app.use(koaStatic("./static"));

// 中间件：请求体参数处理
app.use(
  koaBody({
    // 支持文件上传
    multipart: true,
    // 文件上传配置
    formidable: {
      // 上传文件保存目录
      uploadDir: "./static/uploads",
      // 保留上传文件后缀（默认的关闭）
      keepExtensions: true,
    },
  })
);

// 中间件：统一错误处理和错误信息输出
app.use(
  koaError({
    // 自定义出错时，接口返回数据的格式
    format: (err, obj) => {
      if (obj.code === "INVALID_PARAM") {
        return { code: 402, message: "参数不合法!" };
      }
      return {
        code: obj.code || 500,
        message: obj.message || err.message,
      };
    },
  })
);

// 中间件:mongoDB 数据库操作辅助 (将 mongoClient 挂到 ctx上)
app.use(mongoMiddleware());

// 中间件:路由相关
app.use(router.routes());
// 请求错误的时候,会有比较友好的提示
app.use(router.allowedMethods());

app.listen(3002, () => console.log("启动成功,http://localhost:3002"));
