const Koa = require('koa')
const fs = require('fs')
const app = new Koa()

app.use(async(ctx,next) => {
        console.log("ctx.method",ctx.method);
        console.log("ctx.path:",ctx.path);
        next();
});

// 装载所有子路由
const Router = require('koa-router')
let router = new Router()
router.get('/api', async ( ctx )=>{
  console.log("API");
  let html = `
    <ul>
      <li><a href="/api/helloworld">/page/helloworld</a></li>
      <li><a href="/api/404">/page/404</a></li>
    </ul>
  `
  ctx.body = html
})
router.get('/api/404', async ( ctx )=>{
  ctx.body = '404 page!'
})
router.get('/api/helloworld', async ( ctx )=>{
  ctx.body = 'helloworld page test2!'
})

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods())

app.listen(3000, () => {
  console.log('[demo] route-use-middleware is starting at port 3000')
})