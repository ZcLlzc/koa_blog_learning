const Koa = require("koa");
// 处理 post 请求体参数 (koa-body 版本 6.0 以上要这样导入: https://github.com/koajs/koa-body/issues/215)
const { koaBody } = require("koa-body");
// 导入路由实例
const router = require("./router");
const app = new Koa();

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


// 中间件:路由相关
app.use(router.routes());
// 请求错误的时候,会有比较友好的提示
app.use(router.allowedMethods());

app.listen(3002, () => console.log("启动成功,http://localhost:3002"));
